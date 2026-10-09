import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signInAnonymously, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { collection, doc, getDoc, getDocs, getFirestore, onSnapshot, query, runTransaction, serverTimestamp, setDoc, updateDoc, where, writeBatch } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
	apiKey: "AIzaSyC94y_LddvlLhxoTjPx6J3RrUtxUFc6jZY",
	authDomain: "english-75770.firebaseapp.com",
	projectId: "english-75770",
	appId: "1:487246052012:web:4629e114b4cd16e6ad3d09",
	measurementId: "G-BM267XW57R"
};
const teacherUid = "o4cLZuDfECSAeMbqK3FrrxJOskk2";
const courseDataKeys = [
	"itqan-lesson-tools-v1",
	"itqan-lesson-books-v1",
	"itqan-homework-assignments-v1",
	"itqan-quiz-settings-v1",
	"itqan-custom-quizzes-v1",
	"itqan-lesson-quizzes-cleared-v1",
	"itqan-lesson-access-v1",
	"itqan-library-books-v1",
	"itqan-students-v1",
	"itqan-teacher-notifications-v1",
	"itqan-attendance-v1",
	"itqan-study-groups-v1",
	"itqan-theme-settings-v1"
];
const studentDataKeys = [
	"itqan-student-reports-v1",
	"itqan-lesson-quiz-attempts-v1",
	"itqan-question-analytics-v1",
	"itqan-homework-achievements-v1",
	"itqan-game-achievements-v1",
	"itqan-reminders-v1",
	"itqan-flashcard-progress-v1",
	"itqan-learning-days-v1",
	"itqan-notification-read-state-v1",
	"itqan-assignment-reminder-state-v1",
	"itqan-late-submission-requests-v1",
	"itqan-audit-log-v1",
	"itqan-lesson-question-answers-v1",
	"itqan-lesson-understanding-v1",
	"itqan-lesson-notes-v1"
];

let auth;
let database;
let currentUser = null;
let initialAuthCheckComplete = false;
let courseDataSyncPromise = Promise.resolve();
const unsubscribeByKey = new Map();

function publishStatus(kind, message) {
	window.dispatchEvent(new CustomEvent("itqan-cloud-status", { detail: { kind, message } }));
}

function stopCourseDataListeners() {
	unsubscribeByKey.forEach((unsubscribe) => unsubscribe());
	unsubscribeByKey.clear();
}

function applyCourseData(key, serialized) {
	if (!courseDataKeys.includes(key) || typeof serialized !== "string") return false;
	if (key === "itqan-lesson-quizzes-cleared-v1") {
		try {
			const marker = JSON.parse(serialized);
			if (typeof marker !== "string" || !marker) throw new Error("علامة حذف الاختبارات غير صالحة.");
			if (localStorage.getItem(key) === serialized) return false;
			clearQuizDataLocally(serialized);
			return true;
		} catch (error) {
			console.error("تعذر تطبيق حذف بيانات الاختبارات:", error);
			return false;
		}
	}
	if (key === "itqan-students-v1") {
		try {
			const roster = JSON.parse(serialized);
			if (!Array.isArray(roster)) throw new Error("قائمة الطلاب ليست مصفوفة.");
			serialized = JSON.stringify(roster
				.filter((student) => student && typeof student.id === "string" && typeof student.name === "string")
				.map(({ id, name, nameEn }) => ({ id, name, nameEn: typeof nameEn === "string" ? nameEn : "" })));
		} catch (error) {
			console.error("قائمة الطلاب المشتركة غير صالحة:", error);
			return false;
		}
	}
	try {
		JSON.parse(serialized);
	} catch (error) {
		console.error(`بيانات Firebase غير صالحة للمفتاح ${key}:`, error);
		return false;
	}
	if (localStorage.getItem(key) === serialized) return false;
	localStorage.setItem(key, serialized);
	return true;
}

function clearQuizDataLocally(marker) {
	localStorage.setItem("itqan-quiz-settings-v1", "{}");
	localStorage.setItem("itqan-custom-quizzes-v1", "{}");
	localStorage.setItem("itqan-quiz-results-v1", "[]");
	localStorage.setItem("itqan-lesson-quiz-attempts-v1", "{}");
	localStorage.setItem("itqan-lesson-quizzes-cleared-v1", marker);
	try {
		const reports = JSON.parse(localStorage.getItem("itqan-student-reports-v1") || "{}");
		if (reports && typeof reports === "object" && !Array.isArray(reports)) {
			Object.values(reports).forEach((report) => {
				if (report && typeof report === "object") report.quizzes = [];
			});
			localStorage.setItem("itqan-student-reports-v1", JSON.stringify(reports));
		}
	} catch (error) {
		console.error("تعذر حذف نتائج الاختبارات من التقارير المحلية:", error);
	}
	window.dispatchEvent(new Event("itqan-quiz-data-cleared"));
}

function studentRecordId(studentId, key) {
	return `${studentId}__${key}`;
}

async function hashStudentCode(code) {
	const bytes = new TextEncoder().encode(code);
	const digest = await crypto.subtle.digest("SHA-256", bytes);
	return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function getAuthenticatedStudentId() {
	if (!currentUser || currentUser.uid === teacherUid) return "";
	const session = await getDoc(doc(database, "studentSessions", currentUser.uid));
	return session.exists() && session.data().uid === currentUser.uid && typeof session.data().studentId === "string"
		? session.data().studentId
		: "";
}

function studentsRosterContains(studentId) {
	try {
		const roster = JSON.parse(localStorage.getItem("itqan-students-v1") || "[]");
		return Array.isArray(roster) && roster.some((student) => student.id === studentId);
	} catch (error) {
		console.error("تعذرت قراءة قائمة الطلاب للتحقق من رمز الدخول:", error);
		return false;
	}
}

function applyStudentRecord(record, teacherView = false) {
	if (!record || !studentDataKeys.includes(record.key) || typeof record.value !== "string") return;
	let studentValue;
	try {
		studentValue = JSON.parse(record.value);
	} catch (error) {
		console.error(`بيانات الطالب غير صالحة للمفتاح ${record.key}:`, error);
		return;
	}
	let stored;
	try {
		stored = JSON.parse(localStorage.getItem(record.key)) || {};
	} catch (error) {
		console.error(`تعذر دمج بيانات الطالب ${record.studentId}:`, error);
		stored = {};
	}
	if (record.key === "itqan-reminders-v1" && !teacherView) {
		if (JSON.stringify(stored) === JSON.stringify(studentValue)) return;
		localStorage.setItem(record.key, JSON.stringify(studentValue));
	} else {
		if (!stored || typeof stored !== "object" || Array.isArray(stored)) stored = {};
		if (JSON.stringify(stored[record.studentId]) === JSON.stringify(studentValue)) return;
		stored[record.studentId] = studentValue;
		localStorage.setItem(record.key, JSON.stringify(stored));
	}
	window.dispatchEvent(new CustomEvent("itqan-student-data-changed", {
		detail: { studentId: record.studentId, key: record.key }
	}));
}

async function saveCourseData(key, serialized) {
	if (!courseDataKeys.includes(key)) throw new Error("هذا النوع من البيانات غير مخصص للمزامنة.");
	if (currentUser?.uid !== teacherUid) throw new Error("سجّل الدخول بحساب Firebase الخاص بالمعلم لمزامنة التعديلات.");
	await setDoc(doc(database, "courseData", key), {
		value: serialized,
		updatedAt: serverTimestamp()
	});
	publishStatus("success", "تمت مزامنة إعدادات الدروس مع الطلاب.");
}

function watchCourseData(user) {
	stopCourseDataListeners();
	const synchronizedKeys = new Set();
	const requiredSyncKeys = new Set(user.uid === teacherUid ? courseDataKeys : ["itqan-students-v1"]);
	let finishSync;
	let failSync;
	let syncSettled = false;
	const timeout = window.setTimeout(() => {
		if (syncSettled) return;
		syncSettled = true;
		const message = user.uid === teacherUid
			? "انتهت مهلة تحميل إعدادات المنصة من Firestore."
			: "انتهت مهلة تحميل قائمة الطلاب من Firestore. تحقق من اتصال الإنترنت وقواعد قراءة قائمة الطلاب.";
		failSync(new Error(message));
	}, 20000);
	courseDataSyncPromise = new Promise((resolve, reject) => {
		finishSync = resolve;
		failSync = reject;
	});
	courseDataSyncPromise.catch(() => {});
	courseDataKeys.forEach((key) => {
		const unsubscribe = onSnapshot(doc(database, "courseData", key), async (snapshot) => {
			if (currentUser?.uid !== user.uid) return;
			if (requiredSyncKeys.has(key) && !snapshot.metadata.fromCache && !synchronizedKeys.has(key)) {
				synchronizedKeys.add(key);
				if (synchronizedKeys.size === requiredSyncKeys.size && !syncSettled) {
					syncSettled = true;
					window.clearTimeout(timeout);
					finishSync();
				}
			}
			if (snapshot.exists()) {
				const changed = applyCourseData(key, snapshot.data().value);
				if (changed) {
					window.dispatchEvent(new CustomEvent("itqan-cloud-data-changed", { detail: { key } }));
					if (key === "itqan-teacher-notifications-v1") window.dispatchEvent(new Event("itqan-notifications-changed"));
				}
				return;
			}
			if (snapshot.metadata.fromCache || user.uid !== teacherUid) return;
			if (key === "itqan-students-v1" || key === "itqan-student-roster-seeded-v1") return;
			const localValue = localStorage.getItem(key);
			if (!localValue) return;
			try {
				JSON.parse(localValue);
				await saveCourseData(key, localValue);
			} catch (error) {
				console.error(`تعذرت مزامنة البيانات المحلية ${key}:`, error);
				publishStatus("error", `تعذرت مزامنة بعض الإعدادات (${key}): ${error.message}`);
			}
		}, (error) => {
			console.error(`تعذرت قراءة بيانات الدرس ${key} من Firebase:`, error);
			publishStatus("error", `تعذرت قراءة بيانات المنصة من Firebase: ${error.message}`);
			if (!syncSettled && requiredSyncKeys.has(key)) {
				syncSettled = true;
				window.clearTimeout(timeout);
				failSync(error);
			}
		});
		unsubscribeByKey.set(key, unsubscribe);
	});
	if (user.uid === teacherUid) {
		const unsubscribe = onSnapshot(collection(database, "homeworkSubmissions"), (snapshot) => {
			if (currentUser?.uid !== user.uid) return;
			try {
				const cloudSubmissions = snapshot.docs.map((item) => item.data());
				const cloudIds = new Set(cloudSubmissions.map((item) => item.id));
				const localSubmissions = JSON.parse(localStorage.getItem("itqan-homework-submissions-v1")) || [];
				const mergedSubmissions = [
					...cloudSubmissions,
					...localSubmissions.filter((item) => !cloudIds.has(item.id))
				];
				const serialized = JSON.stringify(mergedSubmissions);
				if (localStorage.getItem("itqan-homework-submissions-v1") === serialized) return;
				localStorage.setItem("itqan-homework-submissions-v1", serialized);
				window.dispatchEvent(new Event("itqan-homework-submissions-changed"));
			} catch (error) {
				console.error("تعذر تحديث تسليمات الواجبات من Firebase:", error);
				publishStatus("error", `تعذر تحميل تسليمات الطلاب: ${error.message}`);
			}
		}, (error) => {
			console.error("تعذرت قراءة تسليمات الواجبات من Firebase:", error);
			publishStatus("error", `تعذرت قراءة تسليمات الطلاب: ${error.message}`);
		});
		unsubscribeByKey.set("homeworkSubmissions", unsubscribe);
		const unsubscribeQuizResults = onSnapshot(collection(database, "quizResults"), (snapshot) => {
			if (currentUser?.uid !== user.uid) return;
			try {
				const results = snapshot.docs.map((item) => item.data());
				const serialized = JSON.stringify(results);
				if (localStorage.getItem("itqan-quiz-results-v1") === serialized) return;
				localStorage.setItem("itqan-quiz-results-v1", serialized);
				window.dispatchEvent(new Event("itqan-quiz-results-changed"));
			} catch (error) {
				console.error("تعذر تحديث نتائج الاختبارات من Firebase:", error);
				publishStatus("error", `تعذر تحميل نتائج الاختبارات: ${error.message}`);
			}
		}, (error) => {
			console.error("تعذرت قراءة نتائج الاختبارات من Firebase:", error);
			publishStatus("error", `تعذرت قراءة نتائج الاختبارات: ${error.message}`);
		});
		unsubscribeByKey.set("quizResults", unsubscribeQuizResults);
		const unsubscribeStudentData = onSnapshot(collection(database, "studentData"), (snapshot) => {
			if (currentUser?.uid !== user.uid) return;
			snapshot.docs.forEach((item) => applyStudentRecord(item.data(), true));
		}, (error) => {
			console.error("تعذرت قراءة بيانات الطلاب من Firebase:", error);
			publishStatus("error", `تعذرت قراءة بيانات الطلاب: ${error.message}`);
		});
		unsubscribeByKey.set("studentData", unsubscribeStudentData);
	}
	publishStatus("info", user.uid === teacherUid ? "تم الاتصال بحساب المعلم؛ جارٍ مزامنة إعدادات الدروس." : "تم الاتصال؛ جارٍ جلب إعدادات الدروس المشتركة.");
}

const app = initializeApp(firebaseConfig);
auth = getAuth(app);
database = getFirestore(app);

const ready = new Promise((resolve, reject) => {
	onAuthStateChanged(auth, (user) => {
		currentUser = user;
		if (user) {
			initialAuthCheckComplete = true;
			watchCourseData(user);
			window.dispatchEvent(new CustomEvent("itqan-cloud-auth-changed", { detail: { isTeacher: user.uid === teacherUid } }));
			resolve(user);
			return;
		}
		if (!initialAuthCheckComplete) {
			initialAuthCheckComplete = true;
			window.dispatchEvent(new CustomEvent("itqan-cloud-auth-changed", { detail: { isTeacher: false } }));
			signInAnonymously(auth).catch((error) => {
				console.error("تعذر بدء جلسة المنصة في Firebase:", error);
				publishStatus("error", `تعذر الاتصال بـ Firebase: ${error.message}`);
				resolve(null);
			});
			return;
		}
		if (initialAuthCheckComplete) {
			stopCourseDataListeners();
			window.dispatchEvent(new CustomEvent("itqan-cloud-auth-changed", { detail: { isTeacher: false } }));
			publishStatus("info", "تم تسجيل الخروج من Firebase.");
		}
	}, (error) => {
		console.error("تعذرت تهيئة جلسة Firebase:", error);
		publishStatus("error", `تعذرت تهيئة Firebase: ${error.message}`);
		reject(error);
	});
});
ready.catch(() => {});

window.itqanCloud = {
	ready,
	get isTeacher() {
		return currentUser?.uid === teacherUid;
	},
	async getAuthenticatedStudentId() {
		await ready;
		return getAuthenticatedStudentId();
	},
	async signInTeacher(email, password) {
		await ready;
		const credential = await signInWithEmailAndPassword(auth, email, password);
		if (credential.user.uid !== teacherUid) {
			const signedInUid = credential.user.uid;
			await signOut(auth);
			throw new Error(`تم تسجيل الدخول، لكن UID الحساب (${signedInUid}) لا يطابق UID المعلم المسجل في الموقع. تأكد من تحديث نسخة GitHub وبيانات حساب Firebase.`);
		}
		return credential.user;
	},
	async clearStudentRosterOnce() {
		await ready;
		if (auth.currentUser?.uid !== teacherUid) throw new Error("صلاحية المعلم مطلوبة لإفراغ قائمة الطلاب.");
		const rosterRef = doc(database, "courseData", "itqan-students-v1");
		const migrationRef = doc(database, "courseData", "itqan-student-roster-cleared-v1");
		return runTransaction(database, async (transaction) => {
			const migrationSnapshot = await transaction.get(migrationRef);
			if (migrationSnapshot.exists()) return false;
			transaction.set(rosterRef, { value: "[]", updatedAt: serverTimestamp() });
			transaction.set(migrationRef, { value: "true", updatedAt: serverTimestamp() });
			return true;
		});
	},
	async seedStudentsOnce(students) {
		await ready;
		if (auth.currentUser?.uid !== teacherUid) throw new Error("صلاحية المعلم مطلوبة لإضافة الطلاب.");
		if (!Array.isArray(students) || students.some((student) =>
			!student || typeof student.id !== "string" || typeof student.name !== "string" || typeof student.nameEn !== "string")) {
			throw new Error("قائمة الطلاب المراد إضافتها غير صالحة.");
		}
		const rosterRef = doc(database, "courseData", "itqan-students-v1");
		const migrationRef = doc(database, "courseData", "itqan-student-roster-seeded-v1");
		return runTransaction(database, async (transaction) => {
			const [migrationSnapshot, rosterSnapshot] = await Promise.all([
				transaction.get(migrationRef),
				transaction.get(rosterRef)
			]);
			const existingRoster = rosterSnapshot.exists() ? JSON.parse(rosterSnapshot.data().value) : [];
			if (!Array.isArray(existingRoster)) throw new Error("قائمة الطلاب الموجودة في Firebase غير صالحة.");
			const mergedRoster = new Map(existingRoster
				.filter((student) => student && typeof student.id === "string" && typeof student.name === "string")
				.map((student) => [student.id, student]));
			if (!migrationSnapshot.exists()) {
				students.forEach((student) => mergedRoster.set(student.id, {
					...mergedRoster.get(student.id),
					id: student.id,
					name: student.name,
					nameEn: student.nameEn
				}));
				const seededRoster = Array.from(mergedRoster.values())
					.sort((left, right) => String(left.name).localeCompare(String(right.name), "ar"));
				transaction.set(rosterRef, {
					value: JSON.stringify(seededRoster),
					updatedAt: serverTimestamp()
				});
				transaction.set(migrationRef, { value: "true", updatedAt: serverTimestamp() });
			}
			return Array.from(mergedRoster.values())
				.sort((left, right) => String(left.name).localeCompare(String(right.name), "ar"));
		});
	},
	async clearLessonQuizzesOnce() {
		await ready;
		if (auth.currentUser?.uid !== teacherUid) throw new Error("صلاحية المعلم مطلوبة لحذف الاختبارات.");
		const migrationRef = doc(database, "courseData", "itqan-lesson-quizzes-cleared-v1");
		const existingMigration = await getDoc(migrationRef);
		if (existingMigration.exists()) {
			const marker = existingMigration.data().value;
			if (typeof marker !== "string" || typeof JSON.parse(marker) !== "string") {
				throw new Error("سجل حذف الاختبارات في Firestore غير صالح.");
			}
			applyCourseData("itqan-lesson-quizzes-cleared-v1", marker);
			if (localStorage.getItem("itqan-lesson-quizzes-cleared-v1") !== marker) {
				throw new Error("تعذر تطبيق حذف بيانات الاختبارات على هذا الجهاز.");
			}
			return false;
		}

		const [quizResults, quizAttempts, studentReports] = await Promise.all([
			getDocs(collection(database, "quizResults")),
			getDocs(query(collection(database, "studentData"), where("key", "==", "itqan-lesson-quiz-attempts-v1"))),
			getDocs(query(collection(database, "studentData"), where("key", "==", "itqan-student-reports-v1")))
		]);
		const writes = [
			...quizResults.docs.map((snapshot) => ({ ref: snapshot.ref, delete: true })),
			...quizAttempts.docs.map((snapshot) => ({ ref: snapshot.ref, delete: true })),
			...studentReports.docs.map((snapshot) => {
				const record = snapshot.data();
				if (typeof record.value !== "string") throw new Error(`بيانات تقرير الطالب غير صالحة: ${snapshot.id}`);
				const report = JSON.parse(record.value);
				if (!report || typeof report !== "object" || Array.isArray(report)) {
					throw new Error(`محتوى تقرير الطالب غير صالح: ${snapshot.id}`);
				}
				return { ref: snapshot.ref, data: { ...record, value: JSON.stringify({ ...report, quizzes: [] }), updatedAt: serverTimestamp() } };
			})
		];
		for (let offset = 0; offset < writes.length; offset += 450) {
			const batch = writeBatch(database);
			writes.slice(offset, offset + 450).forEach((write) => {
				if (write.delete) batch.delete(write.ref);
				else batch.set(write.ref, write.data);
			});
			await batch.commit();
		}

		const marker = JSON.stringify(new Date().toISOString());
		const cleared = await runTransaction(database, async (transaction) => {
			const migrationSnapshot = await transaction.get(migrationRef);
			if (migrationSnapshot.exists()) return false;
			transaction.set(doc(database, "courseData", "itqan-quiz-settings-v1"), {
				value: "{}",
				updatedAt: serverTimestamp()
			});
			transaction.set(doc(database, "courseData", "itqan-custom-quizzes-v1"), {
				value: "{}",
				updatedAt: serverTimestamp()
			});
			transaction.set(migrationRef, { value: marker, updatedAt: serverTimestamp() });
			return true;
		});
		if (cleared) clearQuizDataLocally(marker);
		return cleared;
	},
	async signInStudent(code) {
		await ready;
		const normalizedCode = String(code || "").trim().toUpperCase();
		if (!/^[A-Z0-9]{7,32}$/.test(normalizedCode)) throw new Error("أدخل رمز الطالب المكوّن من 7 إلى 32 حرفاً أو رقماً.");
		if (currentUser?.uid === teacherUid || !currentUser) {
			if (currentUser?.uid === teacherUid) await signOut(auth);
			currentUser = (await signInAnonymously(auth)).user;
		}
		const codeHash = await hashStudentCode(normalizedCode);
		let codeSnapshot;
		try {
			codeSnapshot = await getDoc(doc(database, "studentLoginCodes", codeHash));
		} catch (error) {
			if (error.code === "permission-denied" || error.code === "unauthenticated") {
				throw new Error("رفضت قواعد Firestore التحقق من رمز الطالب. انشر القواعد المحدّثة من ملف firestore.rules وتأكد من تفعيل تسجيل الدخول Anonymous.");
			}
			throw error;
		}
		if (!codeSnapshot.exists() || codeSnapshot.data().active !== true) {
			throw new Error("الرمز غير صحيح أو غير مفعّل. اطلب من المعلم إصدار رمز جديد.");
		}
		const { studentId, codeVersion } = codeSnapshot.data();
		if (typeof studentId !== "string" || !Number.isInteger(codeVersion)) {
			throw new Error("بيانات رمز الطالب غير صالحة.");
		}

		try {
			let currentSession = await getDoc(doc(database, "studentSessions", currentUser.uid));
			if (currentSession.exists()
				&& (currentSession.data().studentId !== studentId
					|| currentSession.data().codeVersion !== codeVersion
					|| currentSession.data().codeHash !== codeHash)) {
				await signOut(auth);
				currentUser = (await signInAnonymously(auth)).user;
				currentSession = await getDoc(doc(database, "studentSessions", currentUser.uid));
			}
			if (!currentSession.exists()) {
				await setDoc(doc(database, "studentSessions", currentUser.uid), {
					uid: currentUser.uid,
					studentId,
					codeHash,
					codeVersion,
					createdAt: serverTimestamp()
				});
			}
		} catch (error) {
			if (error.code === "permission-denied" || error.code === "unauthenticated") {
				throw new Error("تعذر تفعيل جلسة الطالب. انشر قواعد Firestore الحالية وفعّل تسجيل الدخول Anonymous في Firebase Authentication.");
			}
			throw error;
		}
		return studentId;
	},
	async createStudentLoginCode(studentId, requestedCode = "") {
		await ready;
		if (currentUser?.uid !== teacherUid) throw new Error("صلاحية المعلم مطلوبة لإنشاء رمز الطالب.");
		if (!studentsRosterContains(studentId)) throw new Error("الطالب غير موجود في القائمة المشتركة.");
		const code = requestedCode
			? String(requestedCode).trim().toUpperCase()
			: Array.from(crypto.getRandomValues(new Uint8Array(14)), (value) => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[value % 32]).join("");
		if (!/^[A-Z0-9]{7,32}$/.test(code)) throw new Error("يجب أن يتكون الرمز من 7 إلى 32 حرفاً أو رقماً دون مسافات أو رموز.");
		const codeHash = await hashStudentCode(code);
		const stateRef = doc(database, "studentAuth", studentId);
		const codeRef = doc(database, "studentLoginCodes", codeHash);
		await runTransaction(database, async (transaction) => {
			const stateSnapshot = await transaction.get(stateRef);
			const newCodeSnapshot = await transaction.get(codeRef);
			if (newCodeSnapshot.exists() && newCodeSnapshot.data().studentId !== studentId && newCodeSnapshot.data().active === true) {
				throw new Error("هذا الرمز مرتبط بطالب آخر. اختر رمزاً مختلفاً.");
			}
			const previousHash = stateSnapshot.data()?.codeHash;
			const codeVersion = (stateSnapshot.data()?.codeVersion || 0) + 1;
			if (previousHash) {
				const previousCodeRef = doc(database, "studentLoginCodes", previousHash);
				const previousCode = await transaction.get(previousCodeRef);
				if (previousCode.exists()) transaction.set(previousCodeRef, { ...previousCode.data(), active: false, updatedAt: serverTimestamp() });
			}
			transaction.set(codeRef, {
				studentId,
				codeVersion,
				active: true,
				createdAt: serverTimestamp()
			});
			transaction.set(stateRef, {
				studentId,
				codeHash,
				codeVersion,
				active: true,
				updatedAt: serverTimestamp()
			});
		});
		return code;
	},
	async revokeStudentLoginCode(studentId) {
		await ready;
		if (currentUser?.uid !== teacherUid) throw new Error("صلاحية المعلم مطلوبة لإبطال رمز الطالب.");
		const stateRef = doc(database, "studentAuth", studentId);
		await runTransaction(database, async (transaction) => {
			const stateSnapshot = await transaction.get(stateRef);
			const state = stateSnapshot.data();
			if (state?.codeHash) {
				const previousCodeRef = doc(database, "studentLoginCodes", state.codeHash);
				const previousCode = await transaction.get(previousCodeRef);
				if (previousCode.exists()) transaction.set(previousCodeRef, { ...previousCode.data(), active: false, updatedAt: serverTimestamp() });
			}
			transaction.set(stateRef, {
				studentId,
				codeHash: "",
				codeVersion: (state?.codeVersion || 0) + 1,
				active: false,
				updatedAt: serverTimestamp()
			});
		});
	},
	get syncReady() {
		return courseDataSyncPromise;
	},
	async ensureStudentSession() {
		await ready;
		if (currentUser?.uid === teacherUid) await signOut(auth);
		if (!auth.currentUser) {
			const credential = await signInAnonymously(auth);
			currentUser = credential.user;
		}
		return auth.currentUser;
	},
	async activateStudent(studentId) {
		await ready;
		const authenticatedStudentId = await getAuthenticatedStudentId();
		if (authenticatedStudentId !== studentId) throw new Error("رمز الدخول لا يطابق سجل الطالب.");
		unsubscribeByKey.forEach((unsubscribe, key) => {
			if (key.startsWith("student:")) {
				unsubscribe();
				unsubscribeByKey.delete(key);
			}
		});
		studentDataKeys.forEach((key) => {
			const unsubscribe = onSnapshot(doc(database, "studentData", studentRecordId(studentId, key)), (snapshot) => {
				if (currentUser?.uid === teacherUid || !snapshot.exists()) return;
				applyStudentRecord(snapshot.data());
			}, (error) => {
				console.error(`تعذرت مزامنة بيانات الطالب ${studentId} (${key}):`, error);
				publishStatus("error", `تعذرت مزامنة بيانات الطالب: ${error.message}`);
			});
			unsubscribeByKey.set(`student:${studentId}:${key}`, unsubscribe);
		});
		for (const key of studentDataKeys) {
			const stored = localStorage.getItem(key);
			if (!stored) continue;
			let parsed;
			try {
				parsed = JSON.parse(stored);
			} catch (error) {
				console.error(`تعذر تجهيز بيانات الطالب ${key} للمزامنة:`, error);
				continue;
			}
			const value = key === "itqan-reminders-v1" ? parsed : parsed?.[studentId];
			if (value === undefined) continue;
			let existing;
			try {
				existing = await getDoc(doc(database, "studentData", studentRecordId(studentId, key)));
			} catch (error) {
				if (error.code !== "permission-denied") throw error;
			}
			if (!existing?.exists()) {
				await window.itqanCloud.publishStudentData(studentId, key, value);
			}
		}
	},
	async publishStudentData(studentId, key, value) {
		await ready;
		if (!currentUser || !studentDataKeys.includes(key)) throw new Error("بيانات الطالب غير مهيأة للمزامنة.");
		if (currentUser.uid !== teacherUid) {
			const authenticatedStudentId = await getAuthenticatedStudentId();
			if (authenticatedStudentId !== studentId) throw new Error("رمز الدخول لا يطابق سجل الطالب المطلوب.");
		}
		const serialized = JSON.stringify(value);
		if (serialized.length >= 800000) throw new Error("تجاوزت البيانات حد المزامنة المسموح.");
		const record = {
			studentId,
			key,
			value: serialized,
			updatedAt: serverTimestamp()
		};
		await setDoc(doc(database, "studentData", studentRecordId(studentId, key)), record);
	},
	async signOut() {
		await signOut(auth);
		currentUser = null;
	},
	async submitHomeworkSubmission(submission) {
		await ready;
		if (await getAuthenticatedStudentId() !== submission.studentId) throw new Error("رمز الدخول لا يطابق سجل الطالب.");
		await setDoc(doc(database, "homeworkSubmissions", submission.id), submission);
	},
	async uploadHomeworkFile(file, kind, itemId, studentId = "") {
		await ready;
		if (!currentUser) throw new Error("يلزم الاتصال بحساب Firebase لرفع الملف.");
		if (!(file instanceof File) || file.size === 0) {
			throw new Error("اختر ملفاً صالحاً لإرفاقه.");
		}
		if (file.size > 600 * 1024 && file.type.startsWith("image/")) {
			file = await compressHomeworkImage(file);
		}
		if (file.size > 600 * 1024) {
			throw new Error("يجب ألا يتجاوز حجم الملف 600 كيلوبايت.");
		}
		if (!(file.type.startsWith("image/") || file.type === "application/pdf" || kind === "submission" && file.type.startsWith("audio/"))) {
			throw new Error("نوع الملف غير مدعوم؛ ارفع صورة أو ملف PDF أو تسجيلاً صوتياً للحل.");
		}
		if (!itemId || !["assignment", "submission"].includes(kind)) throw new Error("طلب رفع الملف غير صالح.");
		if (kind === "assignment" && currentUser.uid !== teacherUid) throw new Error("صلاحية المعلم مطلوبة لرفع ملف الواجب.");
		const authenticatedStudentId = kind === "submission" ? await getAuthenticatedStudentId() : "";
		if (kind === "submission" && (!authenticatedStudentId || authenticatedStudentId !== studentId)) {
			throw new Error("يلزم تسجيل الدخول برمز الطالب لإرفاق الحل.");
		}
		const fileData = await new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onerror = () => reject(new Error("تعذر قراءة الملف المحدد."));
			reader.onload = () => resolve(reader.result);
			reader.readAsDataURL(file);
		});
		if (typeof fileData !== "string" || fileData.length > 850000) throw new Error("الملف أكبر من الحد المسموح لتخزين Firestore.");
		const fileId = `${kind}_${crypto.randomUUID()}`;
		await setDoc(doc(database, "homeworkFiles", fileId), {
			fileId,
			kind,
			studentId: authenticatedStudentId,
			itemId,
			fileName: file.name,
			contentType: file.type,
			fileData,
			createdAt: serverTimestamp()
		});
		return { fileId, name: file.name, type: file.type };
	},
	async getHomeworkFileData(fileId) {
		await ready;
		if (typeof fileId !== "string" || !/^(assignment|submission)_[\w-]{20,}$/.test(fileId)) throw new Error("معرّف الملف غير صالح.");
		const fileSnapshot = await getDoc(doc(database, "homeworkFiles", fileId));
		if (!fileSnapshot.exists()) throw new Error("الملف غير موجود أو لم يعد متاحاً.");
		const fileData = fileSnapshot.data();
		if (typeof fileData.fileData !== "string") throw new Error("بيانات الملف المخزنة غير صالحة.");
		return fileData.fileData;
	},
	async updateHomeworkSubmission(submissionId, review) {
		await ready;
		if (currentUser?.uid !== teacherUid) throw new Error("صلاحية المعلم مطلوبة لمراجعة التسليم.");
		const submissionRef = doc(database, "homeworkSubmissions", submissionId);
		const submissionSnapshot = await getDoc(submissionRef);
		if (!submissionSnapshot.exists()) return false;
		await updateDoc(submissionRef, review);
		return true;
	},
	async submitQuizResult(result) {
		await ready;
		if (await getAuthenticatedStudentId() !== result.studentId) throw new Error("رمز الدخول لا يطابق سجل الطالب.");
		const { studentEmail, ...studentResult } = result;
		await setDoc(doc(database, "quizResults", result.id), studentResult);
	},
	publish(key, serialized) {
		return saveCourseData(key, serialized).then(() => true).catch((error) => {
			console.error(`تعذرت مزامنة بيانات المنصة ${key}:`, error);
			publishStatus("error", `تم الحفظ على هذا الجهاز، لكن تعذرت المزامنة: ${error.message}`);
			return false;
		});
	}
};

async function compressHomeworkImage(file) {
	if (!("createImageBitmap" in window) || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
		throw new Error("تعذر ضغط هذا النوع من الصور تلقائياً؛ اختر صورة JPEG أو PNG أو WebP أصغر من 600 كيلوبايت.");
	}
	const bitmap = await createImageBitmap(file);
	try {
		const canvas = document.createElement("canvas");
		const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
		canvas.width = Math.max(1, Math.round(bitmap.width * scale));
		canvas.height = Math.max(1, Math.round(bitmap.height * scale));
		const context = canvas.getContext("2d", { alpha: false });
		if (!context) throw new Error("المتصفح لا يدعم ضغط الصور.");
		context.fillStyle = "#ffffff";
		context.fillRect(0, 0, canvas.width, canvas.height);
		context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
		for (let attempt = 0; attempt < 6; attempt += 1) {
			const quality = Math.max(0.42, 0.82 - attempt * 0.08);
			const blob = await new Promise((resolve, reject) => canvas.toBlob(
				(result) => result ? resolve(result) : reject(new Error("تعذر إنشاء نسخة مضغوطة من الصورة.")),
				"image/jpeg",
				quality
			));
			if (blob.size <= 600 * 1024) {
				const baseName = file.name.replace(/\.[^.]+$/, "") || "image";
				return new File([blob], `${baseName}-compressed.jpg`, { type: "image/jpeg", lastModified: Date.now() });
			}
			canvas.width = Math.max(1, Math.round(canvas.width * 0.78));
			canvas.height = Math.max(1, Math.round(canvas.height * 0.78));
			context.fillStyle = "#ffffff";
			context.fillRect(0, 0, canvas.width, canvas.height);
			context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
		}
		throw new Error("تعذر ضغط الصورة إلى أقل من 600 كيلوبايت. اختر صورة أصغر.");
	} finally {
		bitmap.close();
	}
}
