const curriculumData = [
	{ name: "المرحلة التمهيدية", semesters: ["الفصل الدراسي الأول", "الفصل الدراسي الثاني"] },
	{ name: "المرحلة الابتدائية", semesters: ["الفصل الدراسي الأول", "الفصل الدراسي الثاني"] },
	{ name: "المرحلة المتوسطة", semesters: ["الفصل الدراسي الأول", "الفصل الدراسي الثاني"] },
	{ name: "المرحلة الثانوية", semesters: ["الفصل الدراسي الأول", "الفصل الدراسي الثاني"] },
	{ name: "المرحلة الجامعية", semesters: ["الفصل الدراسي الأول", "الفصل الدراسي الثاني"] }
];

const stageLessonCounts = [50, 60, 70, 80, 100];
const stageLessonMaxScores = [20, 25, 30, 40, 50];
const stageLessonPassScores = [15, 20, 25, 35, 45];
const stagePointTotals = [1000, 1500, 2100, 3200, 5000];
const stageLessonComponents = [
	{ homework: 2, recitation: 10, participation: 3, quizzes: 5, activityBook: 0 },
	{ homework: 2, recitation: 10, participation: 3, quizzes: 5, activityBook: 5 },
	{ homework: 4, recitation: 10, participation: 5, quizzes: 5, activityBook: 6 },
	{ homework: 4, recitation: 10, participation: 10, quizzes: 10, activityBook: 6 },
	{ homework: 10, recitation: 10, participation: 10, quizzes: 10, activityBook: 10 }
];
const stagePageNames = ["Pre-Stage", "Primary-Stage", "Middle-Stage", "Secondary-Stage", "University-Stage"];
const lessonNames = ["الدرس الأول", "الدرس الثاني", "الدرس الثالث"];
function getLessonNames(level, semester) {
	const total = stageLessonCounts[level] || lessonNames.length;
	const count = semester === 0 ? Math.ceil(total / 2) : Math.floor(total / 2);
	const offset = semester === 0 ? 0 : Math.ceil(total / 2);
	return Array.from({ length: count }, (_, index) => {
		const lessonNumber = offset + index + 1;
		return lessonNames[lessonNumber - 1] || `الدرس ${lessonNumber}`;
	});
}

function absoluteLessonNumber(level, semester, lesson) {
	return (semester === 0 ? 0 : Math.ceil((stageLessonCounts[level] || 1) / 2)) + lesson + 1;
}

function lessonPageHref(level, semester, lesson) {
	const stageName = stagePageNames[level] || stagePageNames[0];
	return `${stageName}-Lesson${String(absoluteLessonNumber(level, semester, lesson)).padStart(2, "0")}.js`;
}

function initialLessonFromUrl() {
	const query = new URLSearchParams(window.location.search);
	const routeMatch = window.location.hash.match(/^#lesson-(\d+)-(\d+)-(\d+)$/);
	const level = routeMatch ? Number(routeMatch[1]) : Number(query.get("stage"));
	const semester = routeMatch ? Number(routeMatch[2]) : 0;
	const lessonNumber = routeMatch ? Number(routeMatch[3]) + 1 : Number(query.get("lesson"));
	if (!Number.isInteger(level) || level < 0 || level >= stageLessonCounts.length || !Number.isInteger(lessonNumber) || lessonNumber < 1 || lessonNumber > stageLessonCounts[level]) {
		return { level: 0, semester: 0, lesson: 0 };
	}
	if (routeMatch) {
		const lesson = Number(routeMatch[3]);
		if (!Number.isInteger(semester) || semester < 0 || semester > 1 || lesson >= getLessonNames(level, semester).length) {
			return { level: 0, semester: 0, lesson: 0 };
		}
		return { level, semester, lesson };
	}
	const firstSemesterCount = Math.ceil(stageLessonCounts[level] / 2);
	return lessonNumber <= firstSemesterCount
		? { level, semester: 0, lesson: lessonNumber - 1 }
		: { level, semester: 1, lesson: lessonNumber - firstSemesterCount - 1 };
}

function currentLessonName() {
	return getLessonNames(activeLesson.level, activeLesson.semester)[activeLesson.lesson];
}
const defaultStudents = [
	{ id: "student-8", name: "أحمد نور", nameEn: "Ahmed Noor" },
	{ id: "student-4", name: "أنس يونس", nameEn: "Anas Younes" },
	{ id: "student-3", name: "أصيل يونس", nameEn: "Aseel Younes" },
	{ id: "student-6", name: "ريحانه فيصل", nameEn: "Rayhaneh Faisal" },
	{ id: "student-9", name: "سامي عبدالله", nameEn: "Sami Abdullah" },
	{ id: "student-5", name: "عمرو فيصل", nameEn: "Amr Faisal" },
	{ id: "student-7", name: "مبشر ولي", nameEn: "Bushori Wali" },
	{ id: "student-1", name: "محمود محمد", nameEn: "Mahmoud Mohammad" },
	{ id: "student-2", name: "مروة محمد", nameEn: "Marwa Mohammad" }
];
const studentNamesStorageKey = "itqan-student-full-names-v1";
const studentListStorageKey = "itqan-students-v1";
const arabicStudentNameCollator = new Intl.Collator("ar");
function sortStudentsByArabicName(roster) {
	return roster.sort((left, right) => arabicStudentNameCollator.compare(left.fullName || left.name, right.fullName || right.name));
}
function loadStudents() {
	try {
		const savedNames = JSON.parse(localStorage.getItem(studentNamesStorageKey)) || {};
		const storedStudents = JSON.parse(localStorage.getItem(studentListStorageKey));
		const roster = Array.isArray(storedStudents) ? storedStudents : defaultStudents;
		return sortStudentsByArabicName(roster
			.filter((student) => student && typeof student.id === "string" && typeof student.name === "string")
			.map((student) => ({
				id: student.id,
				name: student.name,
				nameEn: typeof student.nameEn === "string" ? student.nameEn : "",
				fullName: savedNames[student.id] || student.fullName || student.name
			})));
	} catch (error) {
		console.error("تعذرت قراءة قائمة الطلاب المحفوظة:", error);
		return sortStudentsByArabicName(defaultStudents.map((student) => ({ ...student, fullName: student.name })));
	}
}

let students = loadStudents();
try {
	if (localStorage.getItem(studentListStorageKey) === null) localStorage.setItem(studentListStorageKey, JSON.stringify(students.map(({ id, name, nameEn }) => ({ id, name, nameEn }))));
} catch (error) { console.error("تعذر حفظ قائمة الطلاب المحلية:", error); }
const reportCategories = [
	{ id: "homework", label: "الواجبات" },
	{ id: "participation", label: "المشاركات" },
	{ id: "recitation", label: "تسميع الكلمات" },
	{ id: "activityBook", label: "كتاب النشاط" },
	{ id: "quizzes", label: "الاختبارات" },
	{ id: "success", label: "إشعار النجاح" }
];
const quizAttemptsKey = "itqan-lesson-quiz-attempts-v1";
const quizSettingsKey = "itqan-quiz-settings-v1";
const quizResultsKey = "itqan-quiz-results-v1";
const homeworkAssignmentsKey = "itqan-homework-assignments-v1";
const lessonToolsStorageKey = "itqan-lesson-tools-v1";
const lessonBooksStorageKey = "itqan-lesson-books-v1";
const libraryBooksStorageKey = "itqan-library-books-v1";
const lessonAccessStorageKey = "itqan-lesson-access-v1";
const homeworkTelegramUrl = "https://t.me/+PT3CQQVLJacxNWM0";
const firstLessonAssetFiles = {
	lesson: "المرحلة التمهيدية/الفصل الدراسي الاول/الدرس الاول/lesson01.pdf",
	dictionary: "قاموس الدرس الاول.pdf",
	activityBook: "كتاب النشاط الدرس الاول.pdf",
	audioOne: "صوتية الدرس الاول 2.ogg",
	audioTwo: "صوتية الدرس الاول 2.mp4"
};
const lessonOrdinals = ["الاول", "الثاني", "الثالث"];
const defaultHomeworkAssignments = [{
	id: "letter-a-practice",
	title: "تدريب على كتابة حرف A",
	details: "تدرّب على كتابة الحرف في دفترك، ثم صوّر الحل وأرسله للمعلم.",
	image: "ورقة تدريب حرف A.svg",
	active: true
}, {
	id: "letter-a-review",
	title: "مراجعة حرف A",
	details: "اكتب حرف A خمس مرات، ثم أرسل صورة الحل للمعلم.",
	active: true
}];
const defaultLibraryBooks = [
	{ id: "book-1", title: "الإنجليزية للمبتدئين", category: "اللغة الإنجليزية", description: "مفردات ومحادثات يومية بخطوات بسيطة.", colors: ["#315f59", "#d8b56d"] },
	{ id: "book-2", title: "رحلة إلى الفضاء", category: "العلوم", description: "اكتشف الكواكب والنجوم وأسرار الكون.", colors: ["#263d53", "#d87355"] },
	{ id: "book-3", title: "الرياضيات الممتعة", category: "الرياضيات", description: "تمارين وأفكار تجعل الأرقام أقرب إليك.", colors: ["#d1e0cb", "#3f7866"] },
	{ id: "book-4", title: "حكايات عربية قصيرة", category: "اللغة العربية", description: "قصص ممتعة لتنمية القراءة والخيال.", colors: ["#ad5d47", "#f0cc7c"] },
	{ id: "book-5", title: "عالم الحيوانات", category: "الطبيعة", description: "تعرّف على حيوانات البيئات المختلفة.", colors: ["#69865d", "#e7be69"] },
	{ id: "book-6", title: "مبادئ البرمجة", category: "التقنية", description: "مدخل مبسّط إلى التفكير الحاسوبي.", colors: ["#354f66", "#79b6a3"] },
	{ id: "book-7", title: "أطلس العالم المصوّر", category: "الجغرافيا", description: "قارات ومعالم وخرائط من حول العالم.", colors: ["#548594", "#e7b75c"] },
	{ id: "book-8", title: "الرسم خطوة بخطوة", category: "الفنون", description: "تمارين إبداعية للرسم والتلوين.", colors: ["#b86f61", "#eed2a2"] },
	{ id: "book-9", title: "تجارب علمية آمنة", category: "العلوم", description: "أنشطة عملية لفهم الظواهر العلمية.", colors: ["#54765b", "#e7d17c"] },
	{ id: "book-10", title: "قصص قبل النوم", category: "القراءة", description: "حكايات خفيفة للصغار واليافعين.", colors: ["#665773", "#e69b73"] }
];

const curriculum = document.querySelector("#curriculum");
const lessonHeading = document.querySelector("#lesson-heading");
const lessonContext = document.querySelector("#lesson-context");
const lessonNumber = document.querySelector("#lesson-number");
const breadcrumbs = document.querySelector("#breadcrumbs");
const bookFrame = document.querySelector("#lesson-book");
const openBook = document.querySelector("#open-book");
const activityPanel = document.querySelector("#activity-panel");
const audio = document.querySelector("#lesson-audio");
const sidebar = document.querySelector("#sidebar");
const menuToggle = document.querySelector("#menu-toggle");
const sidebarScrim = document.querySelector("#sidebar-scrim");
const welcomeStrip = document.querySelector(".welcome-strip");
const lessonSection = document.querySelector(".lesson-section");
const lessonToolsList = document.querySelector("#lesson-tool-list");
const lessonManagerToggle = document.querySelector("#lesson-manager-toggle");
const lessonManagerPanel = document.querySelector("#lesson-manager-panel");
const lessonBookForm = document.querySelector("#lesson-book-form");
const lessonToolForm = document.querySelector("#lesson-tool-form");
const lessonToolsManagerList = document.querySelector("#lesson-tools-manager-list");
const projectAssetsFolder = document.querySelector("#project-assets-folder");
const projectAssetList = document.querySelector("#project-asset-list");
const projectAssetsStatus = document.querySelector("#project-assets-status");
const githubAssetsForm = document.querySelector("#github-assets-form");
const githubAssetsRepository = document.querySelector("#github-assets-repository");
const githubAssetsBranch = document.querySelector("#github-assets-branch");
const refreshGithubAssets = document.querySelector("#refresh-github-assets");
const libraryPage = document.querySelector("#library-page");
const libraryNav = document.querySelector("#library-nav");
const englishGamePage = document.querySelector("#english-game-page");
const englishGameNav = document.querySelector("#english-game-nav");
const quizzesPage = document.querySelector("#quizzes-page");
const quizzesNav = document.querySelector("#quizzes-nav");
const quizOverview = document.querySelector("#quiz-overview");
const quizLibraryFilters = document.querySelector("#quiz-library-filters");
const quizLibraryStatus = document.querySelector("#quiz-library-status");
const quizLibraryGrid = document.querySelector("#quiz-library-grid");
const quizManagementPanel = document.querySelector("#quiz-management-panel");
const quizRoleLabel = document.querySelector("#quizzes-role-label");
const quizScheduleSection = document.querySelector("#quiz-schedule-section");
const quizScheduleBody = document.querySelector("#quiz-schedule-body");
const quizCreateLessonWrap = document.querySelector("#quiz-create-lesson-wrap");
const quizCreateLesson = document.querySelector("#quiz-create-lesson");
const createQuizButton = document.querySelector("#create-quiz-button");
const quizResultsSection = document.querySelector("#quiz-results-section");
const quizResultsCount = document.querySelector("#quiz-results-count");
const quizResultsList = document.querySelector("#quiz-results-list");
const featuresPage = document.querySelector("#features-page");
const featuresNav = document.querySelector("#features-nav");
const lessonCodePage = document.querySelector("#lesson-code-page");
const lessonCodeTitle = document.querySelector("#lesson-code-title");
const lessonCodeContext = document.querySelector("#lesson-code-context");
const lessonCodeContent = document.querySelector("#lesson-code-content");
lessonCodePage.append(lessonSection);
const homeDashboard = document.querySelector("#home-dashboard");
const portalPages = Object.fromEntries([
	"homework", "recitation", "activity-book", "calendar", "contact", "achievements", "profile", "settings"
].map((page) => [page, document.querySelector(`#${page}-page`)]));
const portalNavigation = [...document.querySelectorAll("[data-portal-page]")];
const initialPortalPage = window.location.hash.slice(1);
const initialLessonCodeRoute = /^lesson-(\d+)-(\d+)-(\d+)$/.test(initialPortalPage);
const globalSearch = document.querySelector("#global-search");
const libraryGrid = document.querySelector("#library-grid");
const librarySearch = document.querySelector("#library-search");
const libraryCount = document.querySelector("#library-count");
const libraryHint = document.querySelector("#library-hint");
const libraryManagement = document.querySelector("#library-management");
const libraryBookForm = document.querySelector("#library-book-form");
const libraryManagementList = document.querySelector("#library-management-list");
const reportsPage = document.querySelector("#reports-page");
const studentReportsPage = document.querySelector("#student-reports-page");
const reportsNav = document.querySelector("#reports-nav");
const studentReportsNav = document.querySelector("#student-reports-nav");
const studentsHeading = document.querySelector("#students-heading");
const studentsNav = document.querySelector("#students-nav");
const studentRoster = document.querySelector("#student-roster");
const studentReportPanel = document.querySelector("#student-report-panel");
const reportOverview = document.querySelector("#report-overview");
const studentReportOverview = document.querySelector("#student-report-overview");
const studentProfile = document.querySelector("#student-profile");
const studentReportTabs = document.querySelector("#student-report-tabs");
const studentPublicRecords = document.querySelector("#student-public-records");
const studentSearch = document.querySelector("#student-search");
const studentAccountForm = document.querySelector("#student-account-form");
const studentAccountList = document.querySelector("#student-account-list");
const studentAccountStatus = document.querySelector("#student-account-status");
const roleToggle = document.querySelector("#role-toggle");
const roleLabel = document.querySelector("#role-label");
const roleAvatar = document.querySelector("#role-avatar");
const teacherDialog = document.querySelector("#teacher-dialog");
const teacherLoginForm = document.querySelector("#teacher-login-form");
const teacherEmailInput = document.querySelector("#teacher-email");
const teacherPasswordInput = document.querySelector("#teacher-password");
const studentCodeInput = document.querySelector("#student-code");
const loginRoleInput = document.querySelector("#login-role");
const teacherLoginError = document.querySelector("#teacher-login-error");
const loginEmailLabel = document.querySelector("#login-email-label");
const loginPasswordLabel = document.querySelector("#login-password-label");
const loginCodeLabel = document.querySelector("#login-code-label");
const cloudSyncStatus = document.querySelector("#cloud-sync-status");
const storageKey = "itqan-student-reports-v1";

let activeLesson = initialLessonFromUrl();
let isLessonCodePageOpen = false;
let lessonCodeLoadId = 0;
let quizState = null;
let homeworkRecorder = null;
let homeworkRecordingChunks = [];
let homeworkVoiceUrl = "";
let quizTimerInterval = 0;
let quizAvailabilityTimeout = 0;
let managedQuizKey = "";
let managedQuestionType = "multiple";
let translationObjectUrl = "";
let audioObjectUrl = "";
let activityRequestId = 0;
let lessonToolsByLesson = loadLessonTools();
let lessonBookOverrides = loadLessonBooks();
let projectAssets = [];
let projectAssetsSource = "";
let projectAssetsRequestId = 0;
let githubAssetsAutoLoadKey = "";
try {
	const savedGithubAssets = JSON.parse(localStorage.getItem("itqan-github-project-assets-v1") || "null");
	githubAssetsRepository.value = savedGithubAssets?.repository || detectGithubPagesRepository();
	githubAssetsBranch.value = savedGithubAssets?.branch || "";
} catch (error) {
	console.error("تعذر استعادة إعدادات مستودع الملفات:", error);
	githubAssetsRepository.value = detectGithubPagesRepository();
}
let libraryBooks = loadLibraryBooks();
let activeReportStudentId = students[0].id;
let activeStudentId = "";
let activeReportCategory = "homework";
let activePublicReportCategory = "homework";
let reportNotice = "";
let studentReports = loadStudentReports();
let quizAttempts = loadQuizAttempts();
let quizResults = loadQuizResults();
let quizSettingsByLesson = loadQuizSettings();
let homeworkAssignmentsByLesson = loadHomeworkAssignments();
let lessonAccess = loadLessonAccess();
let homeworkAssignments = getLessonHomeworkAssignments(currentLessonKey());
let lessonTools = getLessonTools(currentLessonKey());
let isTeacher = false;
let isGuest = false;

function persistCourseData(key, value) {
	const serialized = JSON.stringify(value);
	localStorage.setItem(key, serialized);
	if (isTeacher) window.itqanCloud?.publish(key, serialized);
}

function saveStudents() {
	students = sortStudentsByArabicName(students);
	const roster = students.map((student) => ({
		id: student.id,
		name: student.fullName || student.name,
		nameEn: student.nameEn || ""
	}));
	students.forEach((student) => { student.name = student.fullName || student.name; });
	persistCourseData(studentListStorageKey, roster);
	localStorage.setItem(studentListStorageKey, JSON.stringify(roster));
	localStorage.setItem(studentNamesStorageKey, JSON.stringify(Object.fromEntries(students.map((student) => [student.id, student.fullName || student.name]))));
}

function loadStudentReports() {
	try {
		return JSON.parse(localStorage.getItem(storageKey)) || {};
	} catch {
		return {};
	}
}

function saveStudentReports(allowStudentAssessment = false) {
	if (!isTeacher && !(allowStudentAssessment && activeStudentId)) return;
	localStorage.setItem(storageKey, JSON.stringify(studentReports));
	if (isTeacher) {
		students.forEach((student) => {
			if (studentReports[student.id]) window.itqanCloud?.publishStudentData(student.id, storageKey, studentReports[student.id]).catch((error) => {
				console.error(`تعذرت مزامنة تقرير الطالب ${student.id}:`, error);
			});
		});
	} else if (activeStudentId && studentReports[activeStudentId]) {
		window.itqanCloud?.publishStudentData(activeStudentId, storageKey, studentReports[activeStudentId]).catch((error) => {
			console.error("تعذرت مزامنة تقرير الطالب:", error);
		});
	}
}

function loadQuizAttempts() {
	try {
		return JSON.parse(localStorage.getItem(quizAttemptsKey)) || {};
	} catch {
		return {};
	}
}

function loadQuizResults() {
	try {
		const results = JSON.parse(localStorage.getItem(quizResultsKey));
		return Array.isArray(results) ? results : [];
	} catch (error) {
		console.error("تعذرت قراءة نتائج الاختبارات المحفوظة:", error);
		return [];
	}
}

function loadQuizSettings() {
	try {
		return JSON.parse(localStorage.getItem(quizSettingsKey)) || {};
	} catch (error) {
		console.error("تعذر قراءة إعدادات الاختبارات:", error);
		return {};
	}
}

function getQuizSettings(lessonKey, questionCount = 0) {
	return quizSettingsByLesson[lessonKey] || {
		title: "",
		mode: "internal",
		url: "",
		questionLimit: questionCount || 1,
		durationMinutes: "",
		startsAt: "",
		allowRetry: true,
		active: false
	};
}

function isExternalQuiz(mode) {
	return mode === "external" || mode === "forms" || mode === "telegram";
}

function quizModeLabel(mode) {
	return mode === "forms" ? "Microsoft Forms"
		: mode === "telegram" ? "Telegram"
			: isExternalQuiz(mode) ? "خارجي"
				: "داخل المنصة";
}

function saveQuizSettings() {
	persistCourseData(quizSettingsKey, quizSettingsByLesson);
}

function saveQuizAttempts() {
	localStorage.setItem(quizAttemptsKey, JSON.stringify(quizAttempts));
	if (activeStudentId && quizAttempts[activeStudentId]) {
		window.itqanCloud?.publishStudentData(activeStudentId, quizAttemptsKey, quizAttempts[activeStudentId]).catch((error) => {
			console.error("تعذرت مزامنة محاولات الاختبار:", error);
		});
	}
}

function loadHomeworkAssignments() {
	try {
		const stored = JSON.parse(localStorage.getItem(homeworkAssignmentsKey));
		const assignmentsByLesson = Array.isArray(stored) ? { "0-0-0": stored } : stored || { "0-0-0": defaultHomeworkAssignments };
		Object.values(assignmentsByLesson).forEach((assignments) => {
			if (Array.isArray(assignments)) assignments.forEach((assignment) => {
				if (typeof assignment.active !== "boolean") assignment.active = true;
			});
		});
		return assignmentsByLesson;
	} catch {
		return { "0-0-0": defaultHomeworkAssignments };
	}
}

function loadLessonAccess() {
	try {
		return JSON.parse(localStorage.getItem(lessonAccessStorageKey)) || { "0-0-0": true };
	} catch {
		return { "0-0-0": true };
	}
}

function saveLessonAccess() {
	persistCourseData(lessonAccessStorageKey, lessonAccess);
}

function saveHomeworkAssignments() {
	homeworkAssignmentsByLesson[currentLessonKey()] = homeworkAssignments;
	persistCourseData(homeworkAssignmentsKey, homeworkAssignmentsByLesson);
}

function currentLessonKey() {
	return `${activeLesson.level}-${activeLesson.semester}-${activeLesson.lesson}`;
}

function defaultLessonTools() {
	return [
		{ id: "dictionary", title: "القاموس", description: "افتح قاموس الدرس داخل المنصة", action: "dictionary", active: true, grade: "", icon: "ع" },
		{ id: "activity-book", title: "كتاب النشاط", description: "افتح صفحات الأنشطة", action: "activity-book", active: true, grade: "", icon: "▤" },
		{ id: "audio", title: "الصوتية", description: "استمع إلى الدرس", action: "audio", active: true, grade: "", icon: "♫" },
		{ id: "homework", title: "الواجبات", description: "أرسل تدريبك للمعلم", action: "homework", active: true, grade: "", icon: "✓" },
		{ id: "quiz", title: "تقويم الدرس", description: "أجب عن أسئلة التقويم", action: "quiz", active: true, grade: "", icon: "?" }
	];
}

function loadLessonTools() {
	try {
		const stored = JSON.parse(localStorage.getItem(lessonToolsStorageKey)) || {};
		Object.values(stored).forEach((tools) => tools.forEach((tool) => {
			if (typeof tool.active !== "boolean") tool.active = true;
			if (tool.grade === undefined) tool.grade = "";
		}));
		return stored;
	} catch {
		return {};
	}
}

function getLessonTools(lessonKey = currentLessonKey()) {
	return lessonToolsByLesson[lessonKey] || defaultLessonTools();
}

function saveLessonTools() {
	lessonToolsByLesson[currentLessonKey()] = lessonTools;
	persistCourseData(lessonToolsStorageKey, lessonToolsByLesson);
}

function loadLessonBooks() {
	try {
		const books = JSON.parse(localStorage.getItem(lessonBooksStorageKey)) || {};
		if (books["0-0-0"] === "الدرس الاول.pdf") {
			books["0-0-0"] = firstLessonAssetFiles.lesson;
		}
		return books;
	} catch {
		return {};
	}
}

function saveLessonBooks() {
	persistCourseData(lessonBooksStorageKey, lessonBookOverrides);
}

function loadLibraryBooks() {
	try {
		const stored = localStorage.getItem(libraryBooksStorageKey);
		const books = stored === null ? defaultLibraryBooks.map((book) => ({ ...book })) : JSON.parse(stored);
		return books.map((book, index) => ({
			...book,
			id: book.id || `book-${crypto.randomUUID()}`,
			colors: book.colors || defaultLibraryBooks[index % defaultLibraryBooks.length].colors,
			coverUrl: book.coverUrl || "",
			downloadUrl: book.downloadUrl || ""
		}));
	} catch {
		return defaultLibraryBooks.map((book) => ({ ...book }));
	}
}

function saveLibraryBooks() {
	persistCourseData(libraryBooksStorageKey, libraryBooks);
}

function getLessonHomeworkAssignments(lessonKey) {
	if (!homeworkAssignmentsByLesson[lessonKey] && lessonKey === "0-0-0") homeworkAssignmentsByLesson[lessonKey] = defaultHomeworkAssignments;
	return homeworkAssignmentsByLesson[lessonKey] || [];
}

function loadLessonQuizFile(lessonKey) {
	try {
		const savedQuestions = JSON.parse(localStorage.getItem("itqan-custom-quizzes-v1")) || {};
		if (Array.isArray(savedQuestions[lessonKey]) && savedQuestions[lessonKey].length) {
			const builtInQuestions = window.lessonQuizData?.[lessonKey] || [];
			return Promise.resolve([...builtInQuestions, ...savedQuestions[lessonKey]]);
		}
	} catch (error) {
		throw new Error(`تعذر قراءة الاختبار المحفوظ: ${error.message}`);
	}
	if (window.lessonQuizData?.[lessonKey]) return Promise.resolve(window.lessonQuizData[lessonKey]);
	const [level, semester, lesson] = lessonKey.split("-").map(Number);
	const filename = `quiz-level-${level + 1}-semester-${semester + 1}-lesson-${lesson + 1}.js`;
	return new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = encodeURIComponent(filename);
		script.onload = () => window.lessonQuizData?.[lessonKey]?.length ? resolve(window.lessonQuizData[lessonKey]) : reject(new Error("أسئلة هذا الدرس غير موجودة."));
		script.onerror = () => reject(new Error("أسئلة هذا الدرس غير متاحة بعد."));
		document.head.append(script);
	});
}

function getLessonAssetPaths() {
	const ordinal = lessonOrdinals[activeLesson.lesson] || String(activeLesson.lesson + 1);
	const isFirstLesson = currentLessonKey() === "0-0-0";
	const filenames = isFirstLesson ? firstLessonAssetFiles : {
		lesson: `الدرس ${ordinal}.pdf`,
		dictionary: `قاموس الدرس ${ordinal}.pdf`,
		activityBook: `كتاب النشاط الدرس ${ordinal}.pdf`,
		audioOne: `صوتية الدرس ${ordinal} 1.ogg`,
		audioTwo: `صوتية الدرس ${ordinal} 2.ogg`
	};
	const paths = Object.fromEntries(Object.entries(filenames).map(([key, filename]) => [key, normalizeResourcePath(filename)]));
	if (Object.hasOwn(lessonBookOverrides, currentLessonKey())) paths.lesson = normalizeResourcePath(lessonBookOverrides[currentLessonKey()]);
	return paths;
}

function normalizeResourcePath(path) {
	if (!path) return "";
	return /^(https?:|data:|blob:)/i.test(path) ? path : encodeURI(path).replace(/#/g, "%23");
}

function getProjectAssetCategory(filename) {
	const extension = filename.split(".").pop().toLocaleLowerCase();
	if (extension === "pdf") return "PDF";
	if (["avif", "gif", "jpeg", "jpg", "png", "svg", "webp"].includes(extension)) return "صورة";
	if (["aac", "m4a", "mp3", "ogg", "opus", "wav", "webm", "mp4"].includes(extension)) return "صوت";
	return "ملف";
}

function detectGithubPagesRepository() {
	const hostname = window.location.hostname.toLocaleLowerCase();
	if (!hostname.endsWith(".github.io")) return "";
	const owner = hostname.slice(0, -".github.io".length);
	const pageSegments = window.location.pathname.split("/").filter(Boolean);
	const repository = pageSegments[0] || `${owner}.github.io`;
	return `https://github.com/${owner}/${repository}`;
}

function parseGithubRepository(value) {
	const input = value.trim();
	const match = input.match(/^(?:https?:\/\/)?(?:www\.)?github\.com\/([^/?#]+)\/([^/?#]+)\/?$/i)
		|| input.match(/^([^/?#\s]+)\/([^/?#\s]+)$/);
	if (!match) throw new Error("أدخل رابط المستودع مثل https://github.com/owner/repository.");
	const owner = decodeURIComponent(match[1]);
	const repository = decodeURIComponent(match[2]).replace(/\.git$/i, "");
	if (!owner || !repository) throw new Error("تعذر تحديد اسم مالك المستودع أو اسمه.");
	return { owner, repository };
}

async function fetchGithubJson(url) {
	const response = await fetch(url, { credentials: "omit", headers: { Accept: "application/vnd.github+json" } });
	if (!response.ok) {
		if (response.status === 404) throw new Error("المستودع أو الفرع غير موجود، أو أن المستودع خاص ولا يمكن قراءته من موقع عام.");
		if (response.status === 401) throw new Error("لا يمكن الوصول إلى هذا المستودع دون تسجيل دخول؛ استخدم مستودعاً عاماً.");
		if (response.status === 403 || response.status === 429) throw new Error("تجاوز GitHub حد الطلبات المؤقت. انتظر قليلاً ثم حدّث قائمة الملفات.");
		throw new Error(`تعذر جلب ملفات GitHub (HTTP ${response.status}).`);
	}
	return response.json();
}

async function loadGithubProjectAssets(repositoryValue, branchValue = "") {
	if (!isTeacher) return;
	const requestId = ++projectAssetsRequestId;
	const requestedBranch = branchValue.trim();
	projectAssetsStatus.textContent = "جارٍ الاتصال بـ GitHub وقراءة ملفات المستودع...";
	projectAssetsStatus.setAttribute("role", "status");
	refreshGithubAssets.hidden = true;
	try {
		const { owner, repository } = parseGithubRepository(repositoryValue);
		const repo = await fetchGithubJson(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}`);
		const branch = requestedBranch || repo.default_branch;
		if (!branch) throw new Error("لم يتمكن GitHub من تحديد الفرع الافتراضي. أدخل اسم الفرع يدوياً.");
		const tree = await fetchGithubJson(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repository)}/git/trees/${encodeURIComponent(branch)}?recursive=1`);
		if (requestId !== projectAssetsRequestId) return;
		if (tree.truncated) throw new Error("المستودع كبير جداً لعرض كل ملفاته دفعة واحدة؛ استخدم اختيار مجلد المشروع من جهازك.");
		const files = Array.isArray(tree.tree) ? tree.tree.filter((item) => item.type === "blob" && typeof item.path === "string") : [];
		const hasRootIndex = files.some((file) => file.path.toLocaleLowerCase() === "index.html");
		const docsRoot = !hasRootIndex && files.some((file) => file.path.toLocaleLowerCase() === "docs/index.html") ? "docs/" : "";
		projectAssets = files
			.filter((file) => !docsRoot || file.path.startsWith(docsRoot))
			.map((file) => {
				const path = docsRoot ? file.path.slice(docsRoot.length) : file.path;
				const name = path.split("/").pop();
				return { name, path, category: getProjectAssetCategory(name) };
			})
			.filter((asset) => asset.path && !asset.path.startsWith(".git/"))
			.sort((left, right) => left.path.localeCompare(right.path, "ar"));
		projectAssetsSource = `GitHub: ${owner}/${repository} · ${branch}`;
		githubAssetsRepository.value = `https://github.com/${owner}/${repository}`;
		githubAssetsBranch.value = requestedBranch;
		refreshGithubAssets.hidden = false;
		projectAssetsStatus.textContent = projectAssets.length
			? `تم جلب ${projectAssets.length} ملفاً من مستودع ${owner}/${repository} (${branch}).`
			: `لم يتم العثور على ملفات في ${owner}/${repository} (${branch}).`;
		projectAssetsStatus.setAttribute("role", "status");
		try {
			localStorage.setItem("itqan-github-project-assets-v1", JSON.stringify({ repository: githubAssetsRepository.value, branch: requestedBranch }));
		} catch (error) {
			console.error("تعذر حفظ إعدادات مستودع الملفات:", error);
			projectAssetsStatus.textContent += " تعذر حفظ إعداد المستودع على هذا الجهاز.";
		}
		renderProjectAssets();
	} catch (error) {
		if (requestId !== projectAssetsRequestId) return;
		projectAssetsStatus.textContent = `تعذر جلب ملفات GitHub: ${error.message}`;
		projectAssetsStatus.setAttribute("role", "alert");
	}
}

function renderProjectAssets() {
	if (!isTeacher) return;
	projectAssetList.innerHTML = projectAssets.map((asset) => `
		<article class="project-asset-item">
			<div class="project-asset-details"><strong>${escapeHtml(asset.name)}</strong><small>${escapeHtml(asset.path)}</small></div>
			<span class="project-asset-type">${escapeHtml(asset.category)}</span>
			<div class="project-asset-actions">
				<button class="text-button" type="button" data-project-asset-book="${escapeHtml(asset.path)}">كتاب الدرس</button>
				<button class="text-button" type="button" data-project-asset-tool="${escapeHtml(asset.path)}" data-asset-name="${escapeHtml(asset.name)}" data-asset-category="${escapeHtml(asset.category)}">إضافة كأداة</button>
			</div>
		</article>
	`).join("") || `<p class="project-assets-empty">${projectAssetsSource ? `لا توجد ملفات في المصدر المحدد: ${escapeHtml(projectAssetsSource)}.` : "اختر مستودعاً عاماً أو مجلداً محلياً لعرض مسارات ملفاته."}</p>`;
}

function renderResourcePathOptions(input) {
	const picker = input.closest("[data-resource-path-picker]");
	const options = picker.querySelector("[data-resource-path-options]");
	const query = input.value.trim().toLocaleLowerCase();
	const matches = projectAssets.filter((asset) => !query || asset.path.toLocaleLowerCase().includes(query) || asset.name.toLocaleLowerCase().includes(query));
	options.innerHTML = matches.length
		? matches.map((asset) => `<button class="resource-path-option" type="button" data-resource-path="${escapeHtml(asset.path)}" data-asset-name="${escapeHtml(asset.name)}" data-asset-category="${escapeHtml(asset.category)}"><strong>${escapeHtml(asset.name)}</strong><small>${escapeHtml(asset.path)}</small></button>`).join("")
		: `<p class="resource-path-empty">${projectAssets.length ? "لا توجد ملفات تطابق البحث." : "اختر مجلد المشروع أولاً لعرض مسارات ملفاته."}</p>`;
	options.hidden = false;
	input.setAttribute("aria-expanded", "true");
}

function hideResourcePathOptions(picker) {
	const input = picker.querySelector("input");
	picker.querySelector("[data-resource-path-options]").hidden = true;
	input.setAttribute("aria-expanded", "false");
}

function getStudentReport(studentId) {
	if (!studentReports[studentId]) {
		studentReports[studentId] = { homework: [], participation: [], recitation: [], quizzes: [], success: [] };
	}
	for (const category of reportCategories) {
		if (!Array.isArray(studentReports[studentId][category.id])) studentReports[studentId][category.id] = [];
	}
	studentReports[studentId].success = studentReports[studentId].success.filter((notice) => Number.isInteger(notice.stageLevel));
	return studentReports[studentId];
}

function getStageGrade(studentId, level) {
	const lessonCount = stageLessonCounts[level] || 0;
	const earned = curriculumData[level]
		? curriculumData[level].semesters.reduce((total, _, semester) =>
			total + getLessonNames(level, semester).reduce((semesterTotal, __, lesson) =>
				semesterTotal + getLessonGrade(studentId, level, semester, lesson).earned, 0), 0)
		: 0;
	const possible = stagePointTotals[level] || lessonCount * (stageLessonMaxScores[level] || 0);
	const boundedEarned = Math.min(possible, earned);
	return { earned: boundedEarned, possible, percentage: possible ? Math.round((boundedEarned / possible) * 100) : 0 };
}

function getLessonGrade(studentId, level, semester, lesson) {
	const report = getStudentReport(studentId);
	const components = stageLessonComponents[level];
	if (!components) return { earned: 0, possible: 0 };
	const recordsFor = (category) => report[category].filter((record) =>
		Number(record.level ?? 0) === level
		&& Number(record.semester ?? 0) === semester
		&& Number(record.lessonIndex ?? 0) === lesson
		&& record.score !== undefined
		&& record.score !== null
		&& record.score !== ""
	);
	const boundedSum = (records, limit, scoreForRecord) => Math.min(limit, records.reduce((total, record) => {
		const score = Number(record.score);
		return Number.isFinite(score) ? total + scoreForRecord(score, record) : total;
	}, 0));
	const homework = boundedSum(recordsFor("homework"), components.homework, (score) => Math.max(0, Math.min(2, score)));
	const recitation = boundedSum(recordsFor("recitation"), components.recitation, (score) => Math.max(0, Math.min(2, score)) * 5);
	const participation = boundedSum(recordsFor("participation"), components.participation, (score) =>
		Math.max(0, Math.min(2, score)) / 2 * components.participation);
	const quizzes = boundedSum(recordsFor("quizzes"), components.quizzes, (score, record) => {
		const maximum = record.examNumber ? 40 : 100;
		return Math.max(0, Math.min(maximum, score)) / maximum * components.quizzes;
	});
	const activityBook = boundedSum(recordsFor("activityBook"), components.activityBook, (score) =>
		Math.max(0, Math.min(components.activityBook, score)));
	return {
		earned: homework + recitation + participation + quizzes + activityBook,
		possible: stageLessonMaxScores[level]
	};
}

function getLessonPassScore(studentId, level, semester, lesson) {
	const grade = getLessonGrade(studentId, level, semester, lesson);
	if (grade.earned >= stageLessonPassScores[level]) return true;
	const records = getStudentReport(studentId).quizzes.filter((record) =>
		Number(record.level ?? 0) === level
		&& Number(record.semester ?? 0) === semester
		&& Number(record.lessonIndex ?? 0) === lesson
		&& record.score !== undefined
		&& record.score !== null
	);
	return records.some((record) => {
		const score = Number(record.score);
		const maximum = record.examNumber ? 40 : 100;
		return Number.isFinite(score) && score / maximum >= 0.2;
	});
}

function isLessonAvailableByProgress(studentId, level, semester, lesson) {
	if (!studentId) return false;
	const requestedNumber = absoluteLessonNumber(level, semester, lesson);
	for (let lessonNumber = 1; lessonNumber < requestedNumber; lessonNumber += 1) {
		const firstSemesterCount = Math.ceil(stageLessonCounts[level] / 2);
		const priorSemester = lessonNumber <= firstSemesterCount ? 0 : 1;
		const priorLesson = priorSemester === 0 ? lessonNumber - 1 : lessonNumber - firstSemesterCount - 1;
		if (!getLessonPassScore(studentId, level, priorSemester, priorLesson)) return false;
	}
	return true;
}

function isStagePassed(studentId, level) {
	const grade = getStageGrade(studentId, level);
	if (level === 0) return grade.earned >= 700;
	return grade.possible > 0 && grade.percentage >= 70;
}

function updateStageSuccess(studentId) {
	const report = getStudentReport(studentId);
	curriculumData.forEach((stage, level) => {
		const grade = getStageGrade(studentId, level);
		const index = report.success.findIndex((notice) => notice.stageLevel === level);
		if (grade.possible && (level === 0 ? grade.earned >= 700 : grade.percentage >= 70)) {
			const notice = { stageLevel: level, date: currentDate(), lesson: stage.name, title: stage.name, score: grade.percentage, studentName: students.find((student) => student.id === studentId)?.fullName || "" };
			if (index >= 0) report.success[index] = { ...report.success[index], ...notice };
			else report.success.push(notice);
		} else if (index >= 0) report.success.splice(index, 1);
	});
}

function getStudentCurrentLevel(studentId) {
	let level = 0;
	while (level < curriculumData.length - 1 && isStagePassed(studentId, level)) level += 1;
	return level;
}

function escapeHtml(value) {
	return String(value).replace(/[&<>"']/g, (character) => ({
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;",
		"'": "&#39;"
	})[character]);
}

function renderStudentNavigation() {
	if (!isTeacher) {
		studentsNav.innerHTML = "";
		return;
	}
	studentsNav.innerHTML = students.map((student) => `
		<button class="student-nav ${student.id === activeReportStudentId && !reportsPage.hidden ? "is-active" : ""}" type="button" data-student-id="${student.id}">
			<span class="student-avatar">${(student.fullName || student.name).slice(0, 1)}</span><span>${escapeHtml(student.fullName || student.name)}${student.nameEn ? `<small lang="en" dir="ltr">${escapeHtml(student.nameEn)}</small>` : ""}</span>
		</button>
	`).join("");
}

function hidePortalPages() {
	Object.values(portalPages).forEach((page) => { page.hidden = true; });
	portalNavigation.forEach((button) => button.classList.remove("is-active"));
	lessonCodePage.hidden = true;
	isLessonCodePageOpen = false;
	lessonCodeLoadId += 1;
}

function openLessonCodePage(level, semester, lesson) {
	hidePortalPages();
	activeLesson = { level, semester, lesson };
	isLessonCodePageOpen = true;
	const stage = curriculumData[level];
	const title = getLessonNames(level, semester)[lesson];
	const file = lessonPageHref(level, semester, lesson);
	const requestId = ++lessonCodeLoadId;
	document.title = `${title} · ${stage.name} | إتقان`;
	lessonCodeTitle.textContent = title;
	lessonCodeContext.textContent = `${stage.name} · ${stage.semesters[semester]} · ${absoluteLessonNumber(level, semester, lesson)} / ${stageLessonCounts[level]}`;
	lessonCodeContent.textContent = "جارٍ فتح ملف الدرس...";
	lessonCodePage.hidden = false;
	lessonSection.hidden = false;
	homeDashboard.hidden = true;
	welcomeStrip.hidden = true;
	reportsPage.hidden = true;
	studentReportsPage.hidden = true;
	libraryPage.hidden = true;
	englishGamePage.hidden = true;
	quizzesPage.hidden = true;
	featuresPage.hidden = true;
	document.querySelectorAll(".reports-nav, .student-reports-nav, .library-nav, .english-game-nav, .quizzes-nav, .features-nav").forEach((button) => button.classList.remove("is-active"));
	breadcrumbs.innerHTML = `${stage.name} <span>/</span> ${title}`;
	setSidebarOpen(false);
	setRouteHash(`lesson-${level}-${semester}-${lesson}`);
	const script = document.createElement("script");
	script.src = file;
	script.onload = () => {
		if (requestId !== lessonCodeLoadId) return;
		const lessonHtml = typeof window.itqanLessonHtml === "string" ? window.itqanLessonHtml : "";
		lessonCodeContent.innerHTML = lessonHtml;
		if (!lessonHtml.trim()) {
			const empty = document.createElement("p");
			empty.className = "lesson-code-empty";
			empty.textContent = `ملف ${file} جاهز لإضافة محتوى الدرس.`;
			lessonCodeContent.append(empty);
		}
		window.itqanLessonHtml = "";
		script.remove();
	};
	script.onerror = () => {
		if (requestId !== lessonCodeLoadId) return;
		lessonCodeContent.textContent = `تعذر فتح ملف الدرس ${file}. تأكد من وجود الملف في مجلد المنصة.`;
		script.remove();
	};
	document.head.append(script);
}

function setRouteHash(route) {
	const url = new URL(window.location.href);
	url.hash = route;
	history.replaceState(null, "", url);
}

function renderHomeDashboard() {
	const stage = curriculumData[activeLesson.level];
	const lessonList = getLessonNames(activeLesson.level, activeLesson.semester);
	const assignments = getLessonHomeworkAssignments(currentLessonKey()).filter((assignment) => assignment.active);
	const activeQuizCount = getQuizCatalog().filter((quiz) => quiz.level === activeLesson.level && quiz.semester === activeLesson.semester && quiz.lesson === activeLesson.lesson && quiz.available).length;
	const stageGrade = activeStudentId ? getStageGrade(activeStudentId, activeLesson.level) : null;
	const currentLessonGrade = activeStudentId ? getLessonGrade(activeStudentId, activeLesson.level, activeLesson.semester, activeLesson.lesson) : null;
	const tips = [
		"اقرأ الكلمات بصوت واضح، ثم حاول تذكر معناها دون النظر.",
		"قسّم وقت التعلّم إلى خطوات قصيرة وخذ استراحة بسيطة بينها.",
		"راجع درس الأمس لدقيقتين قبل البدء بدرس جديد.",
		"اكتب مثالاً من عندك باستخدام كلمة إنجليزية جديدة."
	];
	const dailyTip = tips[Math.floor(Math.random() * tips.length)];
	const currentLesson = lessonList[activeLesson.lesson] || `الدرس ${activeLesson.lesson + 1}`;
	const gradeText = stageGrade
		? `${stageGrade.earned} / ${stagePointTotals[activeLesson.level]} درجة`
		: `من ${stagePointTotals[activeLesson.level]} درجة`;
	homeDashboard.innerHTML = `
		<div class="home-dashboard-heading"><div><span class="eyebrow">ملخص اليوم</span><h2>رحلتك التعليمية</h2></div><span class="dashboard-date">${escapeHtml(currentDate())}</span></div>
		<div class="home-dashboard-grid">
			<article class="home-summary-card"><span class="home-summary-icon">⌂</span><div><small>مرحلتك ودرسك</small><strong>${escapeHtml(stage.name)}</strong><span>${escapeHtml(currentLesson)} · ${escapeHtml(stage.semesters[activeLesson.semester])}</span></div></article>
			<article class="home-summary-card"><span class="home-summary-icon">✓</span><div><small>الواجبات المفعّلة</small><strong>${assignments.length}</strong><span>${assignments.length ? "واجبات للدرس الحالي" : "لا توجد واجبات مفعّلة"}</span></div></article>
			<article class="home-summary-card"><span class="home-summary-icon">؟</span><div><small>الاختبارات المتاحة</small><strong>${activeQuizCount}</strong><span>${activeQuizCount ? "اختبارات جاهزة للبدء" : "تابع موعد الاختبار مع المعلم"}</span></div></article>
			<article class="home-summary-card"><span class="home-summary-icon">◷</span><div><small>اجتياز الدرس</small><strong>${currentLessonGrade ? `${Number(currentLessonGrade.earned.toFixed(1))} من ${stageLessonPassScores[activeLesson.level]}` : `${stageLessonPassScores[activeLesson.level]} من ${stageLessonMaxScores[activeLesson.level]}`}</strong><span>درجة الاجتياز · ${stageGrade ? escapeHtml(gradeText) : escapeHtml(currentDate())}</span></div></article>
			<article class="home-summary-card daily-tip-card"><span class="home-summary-icon">✦</span><div><small>التعلّم اليومي</small><strong>فكرة اليوم</strong><span>${escapeHtml(dailyTip)}</span></div></article>
		</div>
		${!isTeacher && activeStudentId && currentLessonGrade && currentLessonGrade.earned < stageLessonPassScores[activeLesson.level] ? `<button class="text-button home-complete-lesson" type="button" data-open-portal="quizzes">أكمل الدرس · راجع الاختبارات المتاحة للدرس</button>` : ""}
	`;
}

function renderPortalPage(page) {
	const content = document.querySelector(`#${page}-page-content`);
	if (!content) return;
	const lessonName = getLessonNames(activeLesson.level, activeLesson.semester)[activeLesson.lesson] || currentLessonName();
	const assignments = getLessonHomeworkAssignments(currentLessonKey()).filter((assignment) => isTeacher || assignment.active);
	const lessonLink = `<button class="save-report-button" type="button" data-open-current-lesson>الانتقال إلى ${escapeHtml(lessonName)}</button>`;
	const student = students.find((item) => item.id === activeStudentId);
	const report = student ? getStudentReport(student.id) : null;
	const grade = student ? getStageGrade(student.id, activeLesson.level) : null;
	const cards = (items, empty) => items.length ? `<div class="portal-card-grid">${items.join("")}</div>` : `<article class="portal-card portal-empty"><h2>لا توجد عناصر لعرضها</h2><p>${empty}</p>${lessonLink}</article>`;
	const assignmentCards = assignments.map((assignment) => `<article class="portal-card"><span class="eyebrow">${assignment.active ? "واجب مفعّل" : "إدارة المعلم"}</span><h2>${escapeHtml(assignment.title)}</h2><p>${escapeHtml(assignment.details || "راجع تعليمات الواجب في صفحة الدرس.")}</p>${assignment.dueDate ? `<small>آخر موعد: ${escapeHtml(assignment.dueDate)}</small>` : ""}</article>`);
	if (page === "homework") content.innerHTML = `${cards(assignmentCards, "ستظهر هنا واجبات الدرس التي يفعّلها المعلم.")}<button class="save-report-button" type="button" data-open-homework-activity>فتح الواجبات وتسليم الحل</button>${lessonLink}`;
	else if (page === "recitation") {
		const paths = getLessonAssetPaths();
		content.innerHTML = `<article class="portal-card"><span class="eyebrow">الدرس الحالي</span><h2>${escapeHtml(lessonName)}</h2><p>افتح قاموس الدرس لمراجعة المفردات، ثم استخدم أداة التسميع التي يحددها المعلم.</p>${paths.dictionary ? `<a class="save-report-button portal-link-button" href="${escapeHtml(paths.dictionary)}" target="_blank" rel="noopener">فتح قاموس الكلمات ↗</a>` : ""}${lessonLink}</article>`;
	} else if (page === "activity-book") {
		const path = getLessonAssetPaths().activityBook;
		content.innerHTML = `<article class="portal-card"><span class="eyebrow">كتاب النشاط</span><h2>${escapeHtml(lessonName)}</h2><p>تدرّب على محتوى الدرس باستخدام ملف كتاب النشاط.</p>${path ? `<a class="save-report-button portal-link-button" href="${escapeHtml(path)}" target="_blank" rel="noopener">فتح كتاب النشاط ↗</a>` : `<p>لم يضف المعلم ملفاً لهذا الدرس بعد.</p>`}${lessonLink}</article>`;
	} else if (page === "calendar") {
		const upcoming = getQuizCatalog().filter((quiz) => quiz.level === activeLesson.level && quiz.semester === activeLesson.semester && quiz.lesson === activeLesson.lesson && quiz.created)
			.map((quiz) => `<article class="portal-card"><span class="eyebrow">${quiz.available ? "متاح الآن" : "اختبار مجدول"}</span><h2>${escapeHtml(quiz.settings.title || quiz.lessonName)}</h2><p>${escapeHtml(quiz.availabilityMessage)}</p>${quiz.available && !isTeacher ? `<button class="save-report-button" type="button" data-open-current-assessment>بدء تقويم الدرس</button>` : ""}</article>`);
		const dueAssignments = assignments.filter((assignment) => assignment.dueDate).map((assignment) => `<article class="portal-card"><span class="eyebrow">موعد واجب</span><h2>${escapeHtml(assignment.title)}</h2><p>آخر موعد للتسليم: ${escapeHtml(assignment.dueDate)}</p></article>`);
		content.innerHTML = `${cards([...upcoming, ...dueAssignments], "لا توجد مواعيد مسجلة لهذا الدرس حالياً.")}${lessonLink}`;
	} else if (page === "contact") content.innerHTML = `<article class="portal-card"><span class="eyebrow">الدعم والتواصل</span><h2>تواصل مع المعلم</h2><p>استخدم قناة التواصل المخصصة للاستفسار عن الواجبات أو طلب المساعدة في الدروس.</p><a class="save-report-button portal-link-button" href="${homeworkTelegramUrl}" target="_blank" rel="noopener">فتح قناة التواصل ↗</a></article>`;
	else if (page === "achievements") {
		const stageHomeworkCount = student ? report.homework.filter((item) => Number(item.level ?? 0) === activeLesson.level).length : 0;
		const homeworkGoal = [50, 60, 250, 410, 910][activeLesson.level];
		content.innerHTML = `<article class="portal-card"><span class="eyebrow">شارات المراحل</span><h2>إنجازاتك</h2><p>${student ? `أكملت ${stageHomeworkCount} من ${homeworkGoal} واجباً مسجلاً في ${escapeHtml(curriculumData[activeLesson.level].name)}.` : "سجّل الدخول كطالب لمتابعة الشارات المرتبطة بإنجازاتك."}</p><ul class="portal-achievement-list"><li>شارة الدرجة الكاملة (${stagePointTotals[activeLesson.level]} درجة): ${student && grade.earned >= stagePointTotals[activeLesson.level] ? "مكتسبة" : "قيد التقدّم"}</li><li>شارة حل ${homeworkGoal} واجباً: ${student && stageHomeworkCount >= homeworkGoal ? "مكتسبة" : "قيد التقدّم"}</li></ul><button class="text-button" type="button" data-open-feature-tab="dashboard">عرض جميع الشارات</button></article>`;
	}
	else if (page === "profile") content.innerHTML = student ? `<article class="portal-card profile-summary"><span class="profile-avatar">${escapeHtml((student.fullName || student.name).slice(0, 1))}</span><div><span class="eyebrow">ملف الطالب</span><h2>${escapeHtml(student.fullName || student.name)}</h2><p>${escapeHtml(curriculumData[getStudentCurrentLevel(student.id)].name)} · ${grade.percentage}% في ${escapeHtml(curriculumData[activeLesson.level].name)}</p><small>${grade.earned} من ${grade.possible} درجة مسجّلة</small></div></article><button class="text-button" type="button" data-open-student-reports>عرض سجل التقارير</button>` : `<article class="portal-card"><h2>سجّل الدخول لعرض ملفك</h2><p>بعد تسجيل الدخول ستظهر المرحلة الحالية والتقدم الدراسي.</p><button class="save-report-button" type="button" data-open-student-login>تسجيل الدخول</button></article>`;
	else if (page === "settings") content.innerHTML = `<div class="portal-card-grid"><article class="portal-card"><span class="eyebrow">المظهر</span><h2>الوضع الليلي</h2><p>بدّل بين المظهر الفاتح والداكن.</p><button class="text-button" type="button" data-toggle-theme>تبديل الوضع الليلي</button></article><article class="portal-card"><span class="eyebrow">سهولة الوصول</span><h2>إعدادات العرض</h2><p>تحكم بحجم الخط والتباين من لوحة الأدوات.</p><button class="text-button" type="button" data-open-feature-tab="appearance">فتح إعدادات سهولة الوصول</button></article></div>`;
}

function showPortalPage(page) {
	if (!portalPages[page]) return;
	hidePortalPages();
	document.querySelectorAll(".reports-nav, .student-reports-nav, .library-nav, .english-game-nav, .quizzes-nav, .features-nav").forEach((button) => button.classList.remove("is-active"));
	reportsPage.hidden = true;
	studentReportsPage.hidden = true;
	libraryPage.hidden = true;
	englishGamePage.hidden = true;
	quizzesPage.hidden = true;
	featuresPage.hidden = true;
	welcomeStrip.hidden = true;
	homeDashboard.hidden = true;
	lessonSection.hidden = true;
	portalPages[page].hidden = false;
	const navigation = portalNavigation.find((button) => button.dataset.portalPage === page);
	navigation?.classList.add("is-active");
	breadcrumbs.innerHTML = `مساحة الطالب <span>/</span> ${escapeHtml(portalPages[page].querySelector("h1").textContent)}`;
	setSidebarOpen(false);
	renderPortalPage(page);
	if (window.location.hash !== `#${page}`) setRouteHash(page);
}

function showLessons() {
	isLessonCodePageOpen = false;
	lessonCodePage.hidden = true;
	hidePortalPages();
	document.querySelector("#home-nav").classList.add("is-active");
	reportsPage.hidden = true;
	studentReportsPage.hidden = true;
	libraryPage.hidden = true;
	englishGamePage.hidden = true;
	quizzesPage.hidden = true;
	featuresPage.hidden = true;
	welcomeStrip.hidden = false;
	homeDashboard.hidden = false;
	lessonSection.hidden = true;
	libraryNav.classList.remove("is-active");
	reportsNav.classList.remove("is-active");
	studentReportsNav.classList.remove("is-active");
	englishGameNav.classList.remove("is-active");
	quizzesNav.classList.remove("is-active");
	featuresNav.classList.remove("is-active");
	breadcrumbs.innerHTML = `${curriculumData[activeLesson.level].name} <span>/</span> ${curriculumData[activeLesson.level].semesters[activeLesson.semester]}`;
	updateTeacherControls();
	renderStudentNavigation();
	renderCurriculum();
	renderHomeDashboard();
	if (window.location.hash !== "#home") setRouteHash("home");
}

function showReports(studentId = activeReportStudentId) {
	hidePortalPages();
	homeDashboard.hidden = true;
	if (!isTeacher) {
		showLessons();
		return;
	}
	activeReportStudentId = studentId;
	reportsPage.hidden = false;
	studentReportsPage.hidden = true;
	libraryPage.hidden = true;
	englishGamePage.hidden = true;
	quizzesPage.hidden = true;
	featuresPage.hidden = true;
	welcomeStrip.hidden = true;
	lessonSection.hidden = true;
	reportsNav.classList.add("is-active");
	studentReportsNav.classList.remove("is-active");
	libraryNav.classList.remove("is-active");
	englishGameNav.classList.remove("is-active");
	quizzesNav.classList.remove("is-active");
	featuresNav.classList.remove("is-active");
	breadcrumbs.innerHTML = `إدارة الطلاب <span>/</span> تقارير الطلاب`;
	setSidebarOpen(false);
	renderStudentNavigation();
	renderReportsPage();
	setRouteHash("reports");
}

function showStudentReports() {
	if (isTeacher) {
		showReports();
		return;
	}
	hidePortalPages();
	homeDashboard.hidden = true;
	if (!activeStudentId) {
		openTeacherDialog();
		return;
	}
	reportsPage.hidden = true;
	libraryPage.hidden = true;
	englishGamePage.hidden = true;
	quizzesPage.hidden = true;
	featuresPage.hidden = true;
	studentReportsPage.hidden = false;
	welcomeStrip.hidden = true;
	lessonSection.hidden = true;
	studentReportsNav.classList.add("is-active");
	reportsNav.classList.remove("is-active");
	libraryNav.classList.remove("is-active");
	englishGameNav.classList.remove("is-active");
	quizzesNav.classList.remove("is-active");
	featuresNav.classList.remove("is-active");
	breadcrumbs.innerHTML = `مساحة الطالب <span>/</span> التقارير`;
	setSidebarOpen(false);
	renderCurriculum();
	renderPublicReports();
	setRouteHash("reports");
}

function createLibraryCover(book, index) {
	const [background, accent] = book.colors || defaultLibraryBooks[index % defaultLibraryBooks.length].colors;
	const title = escapeHtml(book.title);
	const category = escapeHtml(book.category);
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="620" viewBox="0 0 480 620"><rect width="480" height="620" fill="${background}"/><rect x="22" y="22" width="436" height="576" rx="8" fill="none" stroke="${accent}" stroke-opacity=".75" stroke-width="2"/><path d="M0 430 Q170 355 480 445 V620 H0Z" fill="${accent}" fill-opacity=".88"/><circle cx="360" cy="155" r="84" fill="${accent}" fill-opacity=".86"/><circle cx="360" cy="155" r="55" fill="${background}"/><text x="54" y="70" fill="${accent}" font-family="Tahoma,Arial,sans-serif" font-size="18" font-weight="700">ITQAN LIBRARY</text><text x="240" y="310" fill="#fffefa" font-family="Tahoma,Arial,sans-serif" font-size="38" font-weight="700" text-anchor="middle" direction="rtl">${title}</text><text x="240" y="365" fill="#fffefa" fill-opacity=".86" font-family="Tahoma,Arial,sans-serif" font-size="20" text-anchor="middle" direction="rtl">${category}</text><text x="240" y="545" fill="#fffefa" font-family="Tahoma,Arial,sans-serif" font-size="18" font-weight="700" text-anchor="middle">BOOK ${String(index + 1).padStart(2, "0")}</text></svg>`;
	return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function renderLibrary() {
	const searchTerm = librarySearch.value.trim().toLocaleLowerCase("ar");
	const matchingBooks = libraryBooks.filter((book) => `${book.title} ${book.category} ${book.description}`.toLocaleLowerCase("ar").includes(searchTerm));
	libraryCount.textContent = `${matchingBooks.length} من ${libraryBooks.length} كتب`;
	libraryHint.textContent = isTeacher ? "أضف الكتب وروابطها من قناة تيليجرام عبر لوحة إدارة المكتبة." : libraryBooks.some((book) => !/^https:\/\//i.test(book.downloadUrl || "")) ? "بعض الكتب لا تتوفر لها روابط تحميل بعد." : "اختر تحميل الكتاب لفتحه من مصدره.";
	libraryManagement.hidden = !isTeacher;
	libraryGrid.innerHTML = matchingBooks.map((book) => {
		const index = libraryBooks.indexOf(book);
		const cover = book.coverUrl || createLibraryCover(book, index);
		const download = /^https:\/\//i.test(book.downloadUrl || "")
			? `<a class="library-download-button" href="${escapeHtml(book.downloadUrl)}" target="_blank" rel="noopener"><span aria-hidden="true">↓</span> تحميل الكتاب</a>`
			: `<button class="library-download-button" type="button" disabled title="أضف رابط تحميل للكتاب من إدارة المكتبة"><span aria-hidden="true">↓</span> تحميل الكتاب <small>الرابط غير متوفر</small></button>`;
		return `<article class="library-book"><div class="library-cover-wrap"><img class="library-cover" src="${escapeHtml(cover)}" alt="غلاف كتاب ${escapeHtml(book.title)}" loading="lazy"><span class="library-book-number">${String(index + 1).padStart(2, "0")}</span></div><div class="library-book-info"><span class="library-book-category">${escapeHtml(book.category)}</span><h2>${escapeHtml(book.title)}</h2><p>${escapeHtml(book.description || "")}</p>${download}</div></article>`;
	}).join("") || `<div class="library-empty"><span aria-hidden="true">⌕</span><h2>لا توجد كتب مطابقة</h2><p>جرّب كلمة بحث أخرى.</p></div>`;
	renderLibraryManagementList();
}

function renderLibraryManagementList() {
	if (!isTeacher) return;
	libraryManagementList.innerHTML = libraryBooks.map((book, index) => `
		<article class="managed-book"><span class="managed-book-number">${String(index + 1).padStart(2, "0")}</span><div class="managed-tool-main"><strong>${escapeHtml(book.title)}</strong><small>${escapeHtml(book.category)} · ${book.downloadUrl ? "رابط التحميل مضاف" : "لا يوجد رابط تحميل"}</small></div><button class="save-report-button" type="button" data-edit-library-book="${escapeHtml(book.id)}">تعديل</button><button class="delete-report-button" type="button" data-delete-library-book="${escapeHtml(book.id)}">حذف</button></article>
	`).join("") || `<p class="no-students">لا توجد كتب في المكتبة.</p>`;
}

function showLibrary() {
	hidePortalPages();
	homeDashboard.hidden = true;
	reportsPage.hidden = true;
	studentReportsPage.hidden = true;
	englishGamePage.hidden = true;
	quizzesPage.hidden = true;
	featuresPage.hidden = true;
	libraryPage.hidden = false;
	welcomeStrip.hidden = true;
	lessonSection.hidden = true;
	reportsNav.classList.remove("is-active");
	studentReportsNav.classList.remove("is-active");
	libraryNav.classList.add("is-active");
	englishGameNav.classList.remove("is-active");
	quizzesNav.classList.remove("is-active");
	featuresNav.classList.remove("is-active");
	breadcrumbs.innerHTML = `مصادر التعلّم <span>/</span> المكتبة`;
	setSidebarOpen(false);
	renderStudentNavigation();
	renderLibrary();
	setRouteHash("library");
}

function showEnglishGame() {
	hidePortalPages();
	homeDashboard.hidden = true;
	reportsPage.hidden = true;
	studentReportsPage.hidden = true;
	libraryPage.hidden = true;
	quizzesPage.hidden = true;
	featuresPage.hidden = true;
	englishGamePage.hidden = false;
	welcomeStrip.hidden = true;
	lessonSection.hidden = true;
	reportsNav.classList.remove("is-active");
	studentReportsNav.classList.remove("is-active");
	libraryNav.classList.remove("is-active");
	englishGameNav.classList.add("is-active");
	quizzesNav.classList.remove("is-active");
	featuresNav.classList.remove("is-active");
	breadcrumbs.innerHTML = `التعلّم <span>/</span> لعبة الإنجليزية`;
	setSidebarOpen(false);
	renderStudentNavigation();
	window.initializeEnglishGame();
	setRouteHash("english-game");
}

function showFeatures(tab = "dashboard") {
	hidePortalPages();
	homeDashboard.hidden = true;
	reportsPage.hidden = true;
	studentReportsPage.hidden = true;
	libraryPage.hidden = true;
	englishGamePage.hidden = true;
	quizzesPage.hidden = true;
	featuresPage.hidden = false;
	welcomeStrip.hidden = true;
	lessonSection.hidden = true;
	reportsNav.classList.remove("is-active");
	studentReportsNav.classList.remove("is-active");
	libraryNav.classList.remove("is-active");
	englishGameNav.classList.remove("is-active");
	quizzesNav.classList.remove("is-active");
	featuresNav.classList.add("is-active");
	breadcrumbs.innerHTML = `التعلّم <span>/</span> لوحة التعلّم`;
	setSidebarOpen(false);
	renderStudentNavigation();
	window.studentFeatures.render(tab);
	setRouteHash(`tools-${tab}`);
}

function getQuizCatalog() {
	let customQuestions;
	try {
		customQuestions = JSON.parse(localStorage.getItem("itqan-custom-quizzes-v1")) || {};
	} catch (error) {
		throw new Error(`تعذر قراءة أسئلة الاختبارات المحفوظة: ${error.message}`);
	}
	const catalog = [];
	curriculumData.forEach((stage, level) => {
		stage.semesters.forEach((semesterName, semester) => {
			getLessonNames(level, semester).forEach((lessonName, lesson) => {
				const key = `${level}-${semester}-${lesson}`;
				const questionCount = (window.lessonQuizData?.[key]?.length || 0)
					+ (Array.isArray(customQuestions[key]) ? customQuestions[key].length : 0);
				const settings = getQuizSettings(key, questionCount);
				const created = Object.hasOwn(quizSettingsByLesson, key);
				const studentAttempt = activeStudentId ? quizAttempts[activeStudentId]?.[key] : null;
				const completed = Array.isArray(studentAttempt?.completed) ? studentAttempt.completed : [];
				const externalQuiz = isExternalQuiz(settings.mode);
				const validExternalUrl = /^https:\/\/\S+$/i.test(settings.url || "");
				const startsAt = settings.startsAt ? new Date(settings.startsAt).getTime() : 0;
				const available = created
					&& Number.isFinite(startsAt)
					&& startsAt > 0
					&& startsAt <= Date.now()
					&& (externalQuiz ? validExternalUrl : questionCount > 0);
				const availabilityMessage = !created
					? "لم يُضف اختبار لهذا الدرس بعد"
					: !startsAt || !Number.isFinite(startsAt)
						? "لم يحدد المعلم موعد الاختبار"
							: startsAt > Date.now()
								? `يبدأ في ${new Date(startsAt).toLocaleString("ar")}`
								: externalQuiz && !validExternalUrl
									? "رابط الاختبار غير صالح"
									: !externalQuiz && !questionCount
										? "لا توجد أسئلة بعد"
										: "مفعّل الآن";
				catalog.push({
					level,
					semester,
					lesson,
					key,
					stageName: stage.name,
					semesterName,
					lessonName,
					questionCount,
					settings,
					created,
					available,
					availabilityMessage,
					completed,
					inProgress: Boolean(studentAttempt?.inProgress),
					bestScore: completed.length ? Math.max(...completed.map((attempt) => Number(attempt.score) || 0)) : null,
					attemptsLeft: Math.max(0, (settings.allowRetry === false ? 1 : 2) - completed.length)
				});
			});
		});
	});
	return catalog;
}

function renderQuizQuestionFields(type) {
	return {
		multiple: `<div class="question-builder-options">${[0, 1, 2, 3].map((index) => `<label class="field-label">الخيار ${index + 1}<input name="option${index}" required maxlength="160"></label>`).join("")}</div><label class="field-label">الإجابة الصحيحة<select name="answer">${[0, 1, 2, 3].map((index) => `<option value="${index}">الخيار ${index + 1}</option>`).join("")}</select></label>`,
		trueFalse: `<label class="field-label">الإجابة الصحيحة<select name="answer"><option value="true">صح</option><option value="false">خطأ</option></select></label>`,
		matching: `<div class="quiz-pair-builder">${[0, 1, 2].map((index) => `<label class="field-label">الطرف الأول ${index + 1}<input name="left${index}" required maxlength="120"></label><label class="field-label">المعنى ${index + 1}<input name="right${index}" required maxlength="120"></label>`).join("")}</div><p class="offline-status">تُعرض المعاني بترتيب عشوائي للطالب.</p>`,
		writing: `<label class="field-label">الإجابات المقبولة، افصل بينها بفاصلة<input name="acceptedAnswers" required maxlength="300" placeholder="مثال: كتاب, the book"></label>`,
		imageMatching: `<div class="quiz-pair-builder">${[0, 1, 2].map((index) => `<label class="field-label">رابط الصورة ${index + 1}<input name="image${index}" type="url" required placeholder="https://..."></label><label class="field-label">النص المطابق ${index + 1}<input name="text${index}" required maxlength="120"></label>`).join("")}</div><p class="offline-status">تُعرض النصوص بترتيب عشوائي ويطابق الطالب كل صورة بالنص.</p>`
	}[type] || "";
}

function renderManagedQuiz(quiz) {
	if (!isTeacher || !quiz || quiz.key !== managedQuizKey) {
		quizManagementPanel.hidden = true;
		quizManagementPanel.innerHTML = "";
		return;
	}
	const settings = quiz.settings;
	const questions = window.lessonQuizData?.[quiz.key] || [];
	let customQuestions = {};
	try {
		customQuestions = JSON.parse(localStorage.getItem("itqan-custom-quizzes-v1")) || {};
	} catch (error) {
		throw new Error(`تعذر قراءة أسئلة الاختبار: ${error.message}`);
	}
	const custom = Array.isArray(customQuestions[quiz.key]) ? customQuestions[quiz.key] : [];
	const managerQuestionFields = renderQuizQuestionFields(managedQuestionType);
	quizManagementPanel.hidden = false;
	quizManagementPanel.innerHTML = `
		<div class="quiz-manager-heading"><div><span class="eyebrow">إدارة الاختبار</span><h2>${escapeHtml(settings.title || quiz.lessonName)}</h2><p>${escapeHtml(quiz.stageName)} · ${escapeHtml(quiz.semesterName)} · ${escapeHtml(quiz.lessonName)}</p></div><button class="text-button" type="button" data-close-quiz-manager>إغلاق</button></div>
		<form class="quiz-settings-form" id="quiz-settings-form" data-quiz-settings="${quiz.key}">
			<label class="field-label">اسم الاختبار<input name="title" required maxlength="100" value="${escapeHtml(settings.title || `${quiz.lessonName} · ${quiz.stageName}`)}"></label>
			<label class="field-label">مكان الاختبار<select name="mode"><option value="internal" ${settings.mode === "internal" ? "selected" : ""}>داخل المنصة</option><option value="forms" ${settings.mode === "forms" || settings.mode === "external" ? "selected" : ""}>Microsoft Forms</option><option value="telegram" ${settings.mode === "telegram" ? "selected" : ""}>Telegram</option></select></label>
			<label class="field-label quiz-external-link" ${!isExternalQuiz(settings.mode) ? "hidden" : ""}>رابط الاختبار<input name="url" type="url" value="${escapeHtml(settings.url || "")}" placeholder="https://..." ${isExternalQuiz(settings.mode) ? "required" : ""}></label>
			<label class="field-label">عدد الأسئلة<input name="questionLimit" type="number" min="1" max="160" value="${Number(settings.questionLimit) || Math.max(1, quiz.questionCount)}" required></label>
			<label class="field-label">مدة الاختبار بالدقائق<input name="durationMinutes" type="number" min="1" max="600" value="${escapeHtml(settings.durationMinutes || "")}" placeholder="بدون مؤقت"></label>
			<label class="field-label">موعد بدء الاختبار<input name="startsAt" type="datetime-local" value="${escapeHtml(settings.startsAt || "")}" required></label>
			<label class="assignment-activation-toggle"><input name="allowRetry" type="checkbox" ${settings.allowRetry === false ? "" : "checked"}><span>السماح بمحاولة إعادة واحدة</span></label>
			<button class="save-report-button" type="submit">حفظ إعدادات الاختبار</button>
			<p class="offline-status">${isExternalQuiz(settings.mode) ? "نتائج Microsoft Forms أو Telegram لا تصل تلقائياً إلى المنصة؛ تظهر هنا تلقائياً نتائج الاختبارات الداخلية فقط. يتفعّل الاختبار الخارجي عند حلول الموعد." : `الأسئلة الداخلية المتاحة: ${quiz.questionCount}. ستُختار ${Math.min(Number(settings.questionLimit) || quiz.questionCount, quiz.questionCount)} عشوائياً عند بدء الاختبار. الإجابات والنتيجة تصل للمعلم بعد التسليم. يتفعّل الاختبار تلقائياً عند حلول الموعد.`}</p>
		</form>
		${!isExternalQuiz(settings.mode) ? `<section class="quiz-question-manager"><div class="feature-section-heading"><div><span class="eyebrow">بنك الأسئلة</span><h3>إضافة سؤال</h3></div><span>${quiz.questionCount} سؤال</span></div>
			<form class="quiz-question-form" id="quiz-question-form" data-quiz-question="${quiz.key}">
				<label class="field-label">نص السؤال<input name="prompt" required maxlength="240"></label>
				<label class="field-label">نوع السؤال<select name="type">${[["multiple","اختيار متعدد"],["trueFalse","صح أو خطأ"],["matching","مزاوجة"],["writing","كتابة جواب"],["imageMatching","ربط الصور بالنص"]].map(([value,label]) => `<option value="${value}" ${managedQuestionType === value ? "selected" : ""}>${label}</option>`).join("")}</select></label>
				<div class="quiz-question-type-fields">${managerQuestionFields}</div>
				<label class="field-label">تلميح اختياري<input name="hint" maxlength="200" placeholder="يظهر للطالب أثناء الاختبار"></label>
				<button class="save-report-button" type="submit">إضافة السؤال</button>
			</form>
			<div class="managed-question-list">${[...questions.map((question, index) => ({ question, index, isCustom: false })), ...custom.map((question, index) => ({ question, index, isCustom: true }))].map(({ question, index, isCustom }) => `<article class="managed-tool"><div class="managed-tool-main"><strong>${escapeHtml(question.prompt)}</strong><small>${escapeHtml(({ multiple: "اختيار متعدد", trueFalse: "صح أو خطأ", matching: "مزاوجة", writing: "كتابة جواب", imageMatching: "ربط الصور بالنص" })[question.type] || question.type)}${question.hint ? ` · تلميح: ${escapeHtml(question.hint)}` : ""}</small></div>${isCustom ? `<button class="delete-report-button" type="button" data-delete-managed-question="${index}" data-question-key="${quiz.key}">حذف</button>` : `<span class="quiz-built-in-label">سؤال أساسي</span>`}</article>`).join("") || `<p class="offline-status">لم تُضف أسئلة بعد.</p>`}</div></section>` : ""}
	`;
}

function renderQuizSchedule(catalog) {
	quizCreateLessonWrap.hidden = !isTeacher;
	createQuizButton.hidden = !isTeacher;
	if (!isTeacher) {
		quizScheduleSection.hidden = true;
		return;
	}
	const previousValue = quizCreateLesson.value;
	quizCreateLesson.innerHTML = catalog.map((item) => `<option value="${item.key}">${escapeHtml(item.stageName)} · ${escapeHtml(item.semesterName)} · ${escapeHtml(item.lessonName)}</option>`).join("");
	quizCreateLesson.value = catalog.some((item) => item.key === previousValue) ? previousValue : currentLessonKey();
	const scheduledQuizzes = catalog.filter((item) => item.created)
		.sort((left, right) => String(left.settings.startsAt || "").localeCompare(String(right.settings.startsAt || "")));
	quizScheduleSection.hidden = false;
	quizScheduleBody.innerHTML = scheduledQuizzes.map((item) => `<tr>
		<td><strong>${escapeHtml(item.settings.title || item.lessonName)}</strong></td>
		<td>${escapeHtml(item.stageName)} · ${escapeHtml(item.semesterName)} · ${escapeHtml(item.lessonName)}</td>
		<td>${escapeHtml(quizModeLabel(item.settings.mode))}</td>
		<td>${item.settings.startsAt ? escapeHtml(new Date(item.settings.startsAt).toLocaleString("ar")) : "لم يحدد"}</td>
		<td>${isExternalQuiz(item.settings.mode) ? "—" : Math.min(Number(item.settings.questionLimit) || item.questionCount, item.questionCount)}</td>
		<td>${item.settings.durationMinutes ? `${escapeHtml(item.settings.durationMinutes)} دقيقة` : "بدون مؤقت"}</td>
		<td><div class="quiz-table-actions"><button class="text-button" type="button" data-manage-quiz="${item.key}">تعديل</button><button class="delete-report-button" type="button" data-delete-quiz="${item.key}">حذف</button></div></td>
	</tr>`).join("") || `<tr><td colspan="7">لا توجد اختبارات حاليا. اختر الدرس ثم اضغط «إنشاء اختبار» لإضافة أول اختبار.</td></tr>`;
}

function renderQuizResults() {
	if (!isTeacher) {
		quizResultsSection.hidden = true;
		return;
	}
	quizResultsSection.hidden = false;
	quizResultsCount.textContent = `${quizResults.length} نتيجة`;
	const sortedResults = [...quizResults].sort((left, right) => new Date(right.submittedAt) - new Date(left.submittedAt));
	quizResultsList.innerHTML = sortedResults.map((result) => {
		const student = students.find((item) => item.id === result.studentId);
		const [level, semester, lesson] = String(result.lessonKey || "").split("-").map(Number);
		const lessonLabel = Number.isInteger(lesson) && curriculumData[level]?.semesters[semester]
			? `${curriculumData[level].name} · ${curriculumData[level].semesters[semester]} · ${getLessonNames(level, semester)[lesson] || ""}`
			: "";
		const answers = Array.isArray(result.answers) ? result.answers : [];
		return `<details class="quiz-result-card"><summary><span><strong>${escapeHtml(student?.fullName || student?.name || "طالب")}</strong><small>${escapeHtml(result.quizTitle || "اختبار")} · ${escapeHtml(lessonLabel)} · ${escapeHtml(new Date(result.submittedAt).toLocaleString("ar"))}</small></span><span class="quiz-result-score">${escapeHtml(result.score)}% · المحاولة ${escapeHtml(result.attemptNumber)}</span></summary><div class="quiz-result-answers">${answers.map((answer, index) => `<article class="quiz-result-answer ${answer.correct ? "is-correct" : "is-incorrect"}"><strong>السؤال ${index + 1}: ${escapeHtml(answer.prompt || "")}</strong><p>إجابة الطالب: ${escapeHtml(Array.isArray(answer.response) ? answer.response.join("، ") : answer.response || "لم تُسجل إجابة")}</p>${answer.correct ? `<p>إجابة صحيحة</p>` : `<p>الإجابة الصحيحة: ${escapeHtml(answer.expected || "")}</p>`}</article>`).join("") || `<p>لا توجد تفاصيل للإجابات في هذه المحاولة.</p>`}</div></details>`;
	}).join("") || `<p class="offline-status">لا توجد اختبارات تم حلها حتى الآن. ستظهر النتائج هنا عند إرسال الطلاب لاختبار داخلي.</p>`;
}

function renderQuizLibrary() {
	const filters = new FormData(quizLibraryFilters);
	const selectedLevel = String(filters.get("level") || "all");
	const selectedSemester = String(filters.get("semester") || "all");
	const search = String(filters.get("search") || "").trim().toLocaleLowerCase("ar");
	quizRoleLabel.textContent = isTeacher ? "مساحة المعلم" : "مساحة الطالب";
	try {
		const catalog = getQuizCatalog();
		const visibleCatalog = catalog.filter((item) => item.created);
		renderQuizSchedule(catalog);
		renderQuizResults();
		const available = visibleCatalog.filter((item) => item.available);
		const studentAttempts = activeStudentId
			? Object.values(quizAttempts[activeStudentId] || {}).reduce((total, entry) => total + (Array.isArray(entry?.completed) ? entry.completed.length : 0), 0)
			: 0;
		quizOverview.innerHTML = `
			<div class="quiz-overview-item"><span>اختبارات متاحة</span><strong>${available.length}</strong></div>
			<div class="quiz-overview-item"><span>اختبارات مضافة</span><strong>${visibleCatalog.length}</strong></div>
			<div class="quiz-overview-item"><span>${isTeacher ? "حلول الطلاب المستلمة" : "محاولاتك المكتملة"}</span><strong>${isTeacher ? quizResults.length : studentAttempts}</strong></div>
		`;
		const matchingQuizzes = visibleCatalog.filter((item) => {
			if (selectedLevel !== "all" && item.level !== Number(selectedLevel)) return false;
			if (selectedSemester !== "all" && item.semester !== Number(selectedSemester)) return false;
			return `${item.stageName} ${item.semesterName} ${item.lessonName} ${item.settings.title || ""}`.toLocaleLowerCase("ar").includes(search);
		});
		const availableMatching = matchingQuizzes.filter((item) => item.available).length;
		quizLibraryStatus.textContent = isTeacher
			? `عرض ${matchingQuizzes.length} اختباراً من أصل ${visibleCatalog.length} · ${quizResults.length} حلاً مستلماً`
			: `عرض ${matchingQuizzes.length} اختباراً · ${availableMatching} مفعّل الآن`;
		quizLibraryGrid.innerHTML = matchingQuizzes.map((item) => {
			const internal = !isExternalQuiz(item.settings.mode);
			const status = `<span class="quiz-card-status ${item.available ? "is-available" : "is-unavailable"}">${escapeHtml(item.availabilityMessage)}${internal && item.questionCount ? ` · ${Math.min(Number(item.settings.questionLimit) || item.questionCount, item.questionCount)} أسئلة` : ""}</span>`;
			const result = item.bestScore === null
				? `<span>لم تُسجل نتيجة</span>`
				: `<span>أفضل نتيجة <strong>${item.bestScore}%</strong></span>`;
			const action = isTeacher
				? `<button class="save-report-button" type="button" data-manage-quiz="${item.key}">إدارة الاختبار</button>`
				: item.available
					? isExternalQuiz(item.settings.mode)
						? `<a class="save-report-button quiz-external-button" href="${escapeHtml(item.settings.url)}" target="_blank" rel="noopener">فتح ${escapeHtml(quizModeLabel(item.settings.mode))} ↗</a>`
						: `<button class="save-report-button" type="button" data-start-quiz="${item.key}" ${item.attemptsLeft === 0 && !item.inProgress ? "disabled" : ""}>${item.inProgress ? "استكمال الاختبار" : item.attemptsLeft === 0 ? "اكتملت المحاولات" : item.completed.length ? "إعادة الاختبار" : "بدء الاختبار"}</button>`
					: `<button class="quiz-disabled-button" type="button" disabled>غير متاح</button>`;
			return `<article class="quiz-library-card ${item.available ? "is-available" : "is-unavailable"}"><div class="quiz-card-heading"><span class="quiz-card-icon" aria-hidden="true">؟</span><div><h2>${escapeHtml(item.settings.title || item.lessonName)}</h2><p>${escapeHtml(item.stageName)} · ${escapeHtml(item.semesterName)} · ${escapeHtml(item.lessonName)}</p></div></div>${status}<div class="quiz-card-results"><span>${escapeHtml(quizModeLabel(item.settings.mode))}</span>${result}${!isTeacher && !isExternalQuiz(item.settings.mode) ? `<span>${item.attemptsLeft} محاولات متبقية</span>` : ""}${item.settings.durationMinutes ? `<span>المدة ${escapeHtml(item.settings.durationMinutes)} دقيقة</span>` : ""}</div>${action}</article>`;
		}).join("") || `<div class="quiz-library-empty"><span aria-hidden="true">؟</span><h2>${isTeacher ? "لا توجد اختبارات حاليا" : activeStudentId ? "لا توجد اختبارات أضافها المعلم بعد" : "سجّل الدخول لعرض الاختبارات"}</h2><p>${isTeacher ? "اختر الدرس من الأعلى وأنشئ اختباراً، أو عدّل عوامل التصفية." : activeStudentId ? "ستظهر هنا الاختبارات التي ينشئها المعلم ويحدد موعدها." : "تحتاج إلى تسجيل الدخول كطالب لعرض الاختبارات المنشورة."}</p></div>`;
		renderManagedQuiz(catalog.find((item) => item.key === managedQuizKey));
		if (quizAvailabilityTimeout) window.clearTimeout(quizAvailabilityTimeout);
		const nextStart = visibleCatalog.map((item) => item.settings.startsAt ? new Date(item.settings.startsAt).getTime() : 0)
			.filter((time) => time > Date.now())
			.sort((left, right) => left - right)[0];
		if (nextStart && !isTeacher) {
			quizAvailabilityTimeout = window.setTimeout(() => {
				if (!quizzesPage.hidden) renderQuizLibrary();
			}, Math.min(nextStart - Date.now() + 50, 2147480000));
		}
	} catch (error) {
		quizOverview.innerHTML = "";
		quizLibraryGrid.innerHTML = `<div class="quiz-library-empty" role="alert"><h2>تعذر تحميل الاختبارات</h2><p>${escapeHtml(error.message)}</p></div>`;
		quizLibraryStatus.textContent = "حدث خطأ أثناء قراءة بيانات الاختبارات.";
		quizManagementPanel.hidden = true;
		if (quizAvailabilityTimeout) window.clearTimeout(quizAvailabilityTimeout);
	}
}

function showQuizzes() {
	hidePortalPages();
	homeDashboard.hidden = true;
	reportsPage.hidden = true;
	studentReportsPage.hidden = true;
	libraryPage.hidden = true;
	englishGamePage.hidden = true;
	featuresPage.hidden = true;
	quizzesPage.hidden = false;
	welcomeStrip.hidden = true;
	lessonSection.hidden = true;
	reportsNav.classList.remove("is-active");
	studentReportsNav.classList.remove("is-active");
	libraryNav.classList.remove("is-active");
	englishGameNav.classList.remove("is-active");
	quizzesNav.classList.add("is-active");
	featuresNav.classList.remove("is-active");
	breadcrumbs.innerHTML = `التعلّم <span>/</span> الاختبارات`;
	setSidebarOpen(false);
	renderStudentNavigation();
	renderQuizLibrary();
	setRouteHash("quizzes");
}

function renderPublicReports() {
	const student = students.find((item) => item.id === activeStudentId);
	if (!student) return;
	const report = getStudentReport(student.id);
	const currentLevel = getStudentCurrentLevel(student.id);
	const stageGrade = getStageGrade(student.id, currentLevel);
	studentProfile.innerHTML = `<div class="student-profile-identity"><span class="eyebrow">الملف الشخصي</span><h2>${escapeHtml(student.fullName || student.name)}</h2></div><div class="student-profile-stage"><span>المرحلة الحالية</span><strong>${escapeHtml(curriculumData[currentLevel].name)}</strong></div><div class="student-profile-grade"><span>النسبة الموزونة</span><strong>${stageGrade.percentage}%</strong><small>${stageGrade.earned} من ${stageGrade.possible} درجة${stageGrade.possible ? "" : " · بانتظار التقييم"}</small></div>`;
	const totals = reportCategories.map((category) => ({
		...category,
		count: report[category.id].length
	}));
	studentReportOverview.innerHTML = totals.map((item) => `
		<div class="overview-item"><span class="overview-label">${item.label}</span><strong>${item.count}</strong><span class="overview-caption">سجل</span></div>
	`).join("");
	studentReportTabs.innerHTML = reportCategories.map((category) => `
		<button class="report-tab ${category.id === activePublicReportCategory ? "is-active" : ""}" type="button" role="tab" aria-selected="${category.id === activePublicReportCategory}" data-public-category="${category.id}">${category.label}<span>${totals.find((item) => item.id === category.id).count}</span></button>
	`).join("");

	const records = report[activePublicReportCategory].slice().reverse();
	if (!records.length) {
		studentPublicRecords.innerHTML = `<div class="reports-empty compact-empty"><span class="empty-mark">⌕</span><h3>لا توجد تقارير منشورة بعد</h3><p>ستظهر التقارير هنا بعد أن يسجلها المعلم.</p></div>`;
		return;
	}

	studentPublicRecords.innerHTML = records.map((record) => {
		const detail = activePublicReportCategory === "success"
			? `اجتاز ${escapeHtml(record.title)} بنسبة موزونة ${record.score}%.`
			: activePublicReportCategory === "quizzes"
				? `${escapeHtml(record.title)}: ${record.score} من ${record.examNumber ? 40 : 100}${record.passed && !record.examNumber ? " · ناجح" : ""}`
					: `${escapeHtml(record.status || record.details || "سجل مشاركة")}${record.score !== undefined ? ` · الدرجة ${record.score} من 2` : ""}`;
		return `<article class="public-report-record"><div class="public-record-meta"><strong>${escapeHtml(student.fullName || student.name)}</strong><span>${escapeHtml(record.date)}</span></div><p>${detail}</p>${record.teacherComment ? `<p class="teacher-comment">ملاحظة المعلم: ${escapeHtml(record.teacherComment)}</p>` : ""}<span class="public-record-lesson">${escapeHtml(record.lesson || "")}</span></article>`;
	}).join("");
}

function renderReportsPage() {
	if (!isTeacher) return;
	const searchTerm = studentSearch.value.trim().toLocaleLowerCase("ar");
	const matchingStudents = students.filter((student) =>
		(student.fullName || student.name).toLocaleLowerCase("ar").includes(searchTerm)
		|| student.nameEn?.toLocaleLowerCase("en").includes(searchTerm));
	document.querySelector("#student-count").textContent = `${students.length} طلاب`;
	studentRoster.innerHTML = matchingStudents.map((student) => `
		<button class="student-card ${student.id === activeReportStudentId ? "is-selected" : ""}" type="button" data-student-id="${student.id}">
			<span class="student-avatar">${(student.fullName || student.name).slice(0, 1)}</span><span class="student-card-name">${escapeHtml(student.fullName || student.name)}${student.nameEn ? `<small lang="en" dir="ltr">${escapeHtml(student.nameEn)}</small>` : ""}</span><span class="student-card-arrow">←</span>
		</button>
	`).join("") || `<p class="no-students">لا توجد نتائج مطابقة.</p>`;
	studentAccountList.innerHTML = students.map((student) => `
		<article class="student-account-row">
			<strong>${escapeHtml(student.fullName || student.name)}${student.nameEn ? `<small lang="en" dir="ltr">${escapeHtml(student.nameEn)}</small>` : ""}</strong>
			<button class="text-button" type="button" data-create-student-code="${escapeHtml(student.id)}">تعيين / تغيير رمز الدخول</button>
			<button class="text-button" type="button" data-reset-student-code="${escapeHtml(student.id)}">إبطال الرمز وإصدار جديد</button>
			<button class="delete-report-button" type="button" data-delete-student="${escapeHtml(student.id)}" aria-label="حذف الطالب ${escapeHtml(student.fullName || student.name)}">حذف</button>
		</article>
	`).join("") || `<p class="no-students">لا يوجد طلاب.</p>`;

	const totals = reportCategories.map((category) => ({
		...category,
		count: students.reduce((total, student) => total + (studentReports[student.id]?.[category.id]?.length || 0), 0)
	}));
	reportOverview.innerHTML = totals.map((item) => `
		<div class="overview-item"><span class="overview-label">${item.label}</span><strong>${item.count}</strong><span class="overview-caption">سجل</span></div>
	`).join("");
	renderStudentReport();
}

function renderStudentReport() {
	if (!isTeacher) return;
	const student = students.find((item) => item.id === activeReportStudentId);
	if (!student) {
		studentReportPanel.innerHTML = `<div class="reports-empty"><span class="empty-mark">↖</span><h2>اختر طالباً لعرض سجله</h2></div>`;
		return;
	}

	const report = getStudentReport(student.id);
	const activeCategory = reportCategories.find((category) => category.id === activeReportCategory);
	studentReportPanel.innerHTML = `
		<div class="student-report-heading">
			<div class="student-identity"><span class="student-avatar student-avatar-large">${(student.fullName || student.name).slice(0, 1)}</span><div><h2>${escapeHtml(student.fullName || student.name)}</h2><span>السجل الدراسي</span></div></div>
			<form id="student-name-form" class="student-name-form"><label class="field-label">الاسم الكامل<input name="fullName" required maxlength="120" value="${escapeHtml(student.fullName || student.name)}"></label><button class="save-report-button" type="submit">حفظ الاسم</button></form>
			<span class="record-total">${report.homework.length + report.participation.length + report.recitation.length + report.activityBook.length + report.quizzes.length} سجل</span>
		</div>
		<p class="report-stage-grade">${escapeHtml(curriculumData[activeLesson.level].name)} · النسبة الموزونة ${getStageGrade(student.id, activeLesson.level).percentage}% (${getStageGrade(student.id, activeLesson.level).earned} من ${getStageGrade(student.id, activeLesson.level).possible})</p>
		<div class="report-tabs" role="tablist" aria-label="أنواع التقارير">
			${reportCategories.map((category) => `<button class="report-tab ${category.id === activeReportCategory ? "is-active" : ""}" type="button" role="tab" aria-selected="${category.id === activeReportCategory}" data-report-category="${category.id}">${category.label}<span>${report[category.id].length}</span></button>`).join("")}
		</div>
		${reportNotice ? `<p class="report-notice" role="status">${escapeHtml(reportNotice)}</p>` : ""}
		<div class="report-detail" id="report-detail"></div>
	`;
	const detail = studentReportPanel.querySelector("#report-detail");
	if (activeCategory.id === "success") renderSuccessReports(detail, report.success);
	else renderReportEntry(detail, activeCategory, report[activeCategory.id]);
}

function renderReportEntry(container, category, records) {
	const isPreparatoryFirstSemester = activeLesson.level === 0 && activeLesson.semester === 0;
	const currentLessonRecords = records.filter((record) => Number(record.level ?? 0) === activeLesson.level && Number(record.semester ?? 0) === activeLesson.semester && Number(record.lessonIndex ?? 0) === activeLesson.lesson);
	const examNumber = isPreparatoryFirstSemester && (activeLesson.lesson + 1) % 5 === 0 && activeLesson.lesson < 35 ? (activeLesson.lesson + 1) / 5 : 0;
	const existingExam = examNumber && records.some((record) => Number(record.level ?? 0) === 0 && Number(record.semester ?? 0) === 0 && Number(record.examNumber) === examNumber);
	const gradeLimitReached = isPreparatoryFirstSemester && ["homework", "participation"].includes(category.id) && currentLessonRecords.length >= 5;
	const activityBookNotRequired = category.id === "activityBook" && stageLessonComponents[activeLesson.level].activityBook === 0;
	const formContent = category.id === "homework"
		? `<label class="field-label">حالة الواجب<select name="status"><option>تم التسليم</option><option>متأخر</option><option>لم يسلم</option></select></label><label class="field-label">تفاصيل الواجب<input name="details" required maxlength="120" placeholder="مثال: حل تدريبات الدرس"></label><label class="field-label">الدرجة من 2<input name="score" type="number" min="0" max="2" step="0.5" required inputmode="decimal"></label>`
		: category.id === "participation"
			? `<label class="field-label">تفاصيل المشاركة<textarea name="details" required maxlength="240" rows="3" placeholder="اكتب ملاحظة المشاركة"></textarea></label><label class="field-label">الدرجة من 2<input name="score" type="number" min="0" max="2" step="0.5" required inputmode="decimal"></label>`
			: category.id === "recitation"
				? `<label class="field-label">الكلمات المُسمّعة<input name="details" required maxlength="160" placeholder="اكتب الكلمات"></label><label class="field-label">الدرجة من 2<input name="score" type="number" min="0" max="2" step="0.5" required inputmode="decimal"></label>`
			: category.id === "activityBook"
				? `<label class="field-label">تفاصيل حل كتاب النشاط<input name="details" required maxlength="160" placeholder="صفحات أو تدريبات الدرس"></label><label class="field-label">الدرجة من ${stageLessonComponents[activeLesson.level].activityBook}<input name="score" type="number" min="0" max="${stageLessonComponents[activeLesson.level].activityBook}" step="0.5" required inputmode="decimal"></label>`
			: isPreparatoryFirstSemester
					? examNumber
						? `<label class="field-label">اسم الاختبار<input name="title" required maxlength="100" value="اختبار المرحلة ${examNumber} بعد الدرس ${activeLesson.lesson + 1}"></label><label class="field-label">الدرجة من 40<input name="score" type="number" min="0" max="40" required inputmode="numeric" placeholder="0 - 40"></label>`
						: ""
					: `<label class="field-label">اسم الاختبار<input name="title" required maxlength="100" value="${escapeHtml(currentLessonName())}"></label><label class="field-label">الدرجة من 100<input name="score" type="number" min="0" max="100" required inputmode="numeric" placeholder="0 - 100"></label>`;
	const recordsMarkup = records.length
		? `<div class="report-record-list">${records.map((record, index) => ({ record, index })).reverse().map(({ record, index }) => {
			const maxScore = category.id === "quizzes" ? record.examNumber ? 40 : 100
				: category.id === "activityBook" ? stageLessonComponents[Number(record.level ?? 0)]?.activityBook || 0
					: 2;
			return `<article class="report-record"><div><strong>${escapeHtml(record.title || record.details || category.label)}</strong><span>${escapeHtml(record.lesson || "")} · ${escapeHtml(record.date)}</span>${category.id === "homework" ? `<label class="field-label report-comment-field">ملاحظة للطالب<textarea rows="2" maxlength="300" data-edit-comment="${index}">${escapeHtml(record.teacherComment || "")}</textarea></label>` : ""}<div class="record-edit-controls">${category.id === "homework" ? `<select aria-label="حالة الواجب" data-edit-status="${index}"><option ${record.status === "تم التسليم" ? "selected" : ""}>تم التسليم</option><option ${record.status === "متأخر" ? "selected" : ""}>متأخر</option><option ${record.status === "لم يسلم" ? "selected" : ""}>لم يسلم</option></select>` : ""}<label>الدرجة<input type="number" min="0" max="${maxScore}" step="${category.id === "quizzes" ? 1 : 0.5}" inputmode="decimal" value="${record.score ?? ""}" placeholder="—" aria-label="درجة السجل" data-edit-score="${index}"></label><button class="save-report-button record-action" type="button" data-record-action="save" data-record-index="${index}" data-record-category="${category.id}">حفظ</button><button class="delete-report-button" type="button" data-record-action="delete" data-record-index="${index}" data-record-category="${category.id}" aria-label="حذف السجل">حذف</button></div></div><div class="record-result ${record.status === "لم يسلم" ? "is-pending" : record.passed ? "is-passed" : ""}">${record.status ? escapeHtml(record.status) : record.score !== undefined ? `${record.score} / ${maxScore}` : "سجل"}</div></article>`;
		}).join("")}</div>`
		: `<div class="reports-empty compact-empty"><span class="empty-mark">＋</span><h3>لا توجد تقارير مسجلة بعد</h3><p>أضف أول سجل لهذا الطالب من النموذج.</p></div>`;
	const formMessage = activityBookNotRequired
		? `<p class="activity-intro">لا يتضمن توزيع درجات هذا الدرس كتاب النشاط.</p>`
		: gradeLimitReached
		? `<p class="activity-intro">اكتملت سجلات ${category.label} الخمسة لهذا الدرس.</p>`
		: category.id === "quizzes" && isPreparatoryFirstSemester
			? existingExam
				? `<p class="activity-intro">تم تسجيل اختبار المرحلة ${examNumber} بالفعل.</p>`
				: examNumber
					? ""
					: `<p class="activity-intro">تُسجل الاختبارات بعد الدروس 5، 10، 15، 20، 25، 30، و35.</p>`
			: "";
	const canAddRecord = !activityBookNotRequired && !gradeLimitReached && !(category.id === "quizzes" && isPreparatoryFirstSemester && (!examNumber || existingExam));
	container.innerHTML = `
		<div class="report-detail-heading"><div><span class="eyebrow">${category.label}</span><h3>إضافة سجل</h3></div><span class="report-count">${records.length} سجل</span></div>
		${formMessage}${canAddRecord ? `<form class="report-entry-form" id="report-entry-form" data-category="${category.id}" data-exam-number="${examNumber}">${formContent}<button class="save-report-button" type="submit">حفظ التقرير</button></form>` : ""}
		<div class="report-history-heading"><h3>سجل ${category.label}</h3><span>${records.length}</span></div>${recordsMarkup}
	`;
}

function renderSuccessReports(container, notifications) {
	const content = notifications.length
		? `<div class="success-record-list">${notifications.slice().reverse().map((notification) => `
			<article class="success-record"><span class="success-seal" aria-hidden="true">✓</span><div><strong>إشعار نجاح: ${escapeHtml(notification.studentName)}</strong><p>اجتاز ${escapeHtml(notification.title)} بنسبة موزونة ${notification.score}% (حد النجاح 70%).</p><span>${escapeHtml(notification.date)} · ${escapeHtml(notification.lesson)}</span></div><button class="save-report-button" type="button" data-print-success-level="${notification.stageLevel ?? activeLesson.level}">طباعة الإشعار</button></article>
		`).join("")}</div>`
		: `<div class="reports-empty compact-empty"><span class="empty-mark">✓</span><h3>لا توجد إشعارات نجاح بعد</h3><p>يصدر إشعار النجاح عند بلوغ النسبة الموزونة 70% في المرحلة.</p></div>`;
	container.innerHTML = `<div class="report-detail-heading"><div><span class="eyebrow">إشعار النجاح</span><h3>إشعارات الطالب</h3></div></div><div class="report-history-heading"><span class="report-count">${notifications.length} إشعار</span></div>${content}`;
}

function printSuccessNotice(student, stageLevel = activeLesson.level) {
	const report = getStudentReport(student.id);
	const categories = [
		{ id: "homework", label: "الواجبات" },
		{ id: "participation", label: "المشاركات" },
		{ id: "recitation", label: "تسميع الكلمات" },
		{ id: "quizzes", label: "الاختبارات" }
	];
	const stageGrade = getStageGrade(student.id, stageLevel);
	const percentage = stageGrade.percentage;
	const result = isStagePassed(student.id, stageLevel) ? "ناجح" : "لم يجتز بعد";
	const rows = categories.map((category) => {
		const records = report[category.id].filter((record) => Number(record.level ?? 0) === stageLevel && (stageLevel !== 0 || Number(record.semester ?? 0) === 0) && (stageLevel !== 0 || category.id !== "quizzes" || record.examNumber));
		const scores = records.filter((record) => record.score !== undefined && record.score !== null && record.score !== "").map((record) => Number(record.score)).filter(Number.isFinite);
		const average = scores.length ? `${Math.round(scores.reduce((total, score) => total + score, 0) / scores.length)} ${category.id === "quizzes" ? (records.some((record) => record.examNumber) ? "من 40" : "%") : "من 2"}` : "لا توجد درجات";
		const summary = records.map((record) => record.details || record.title || record.status || "سجل").join("، ") || "لا توجد سجلات";
		return `<tr><th>${category.label}</th><td>${records.length}</td><td>${escapeHtml(average)}</td><td>${escapeHtml(summary)}</td></tr>`;
	}).join("");
	const printWindow = window.open("", "_blank", "width=900,height=700");
	if (!printWindow) {
		reportNotice = "تعذر فتح نافذة الطباعة. اسمح بالنوافذ المنبثقة ثم أعد المحاولة.";
		renderStudentReport();
		return;
	}
	printWindow.document.write(`<!doctype html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><title>إشعار نجاح ${escapeHtml(student.name)}</title><style>body{font-family:Tahoma,Arial,sans-serif;color:#203b36;margin:38px}h1,h2,p{text-align:center}h1{font-size:25px}h2{font-size:19px}table{width:100%;border-collapse:collapse;margin:28px 0}th,td{border:1px solid #8b998f;padding:11px;text-align:right;vertical-align:top}thead th{background:#edf3eb}.result{font-size:19px;font-weight:bold;text-align:center;margin-top:24px}@media print{body{margin:18mm}}</style></head><body><h1>منصة إتقان التعليمية</h1><h2>إشعار نتيجة المرحلة</h2><p>اسم الطالب: ${escapeHtml(student.fullName || student.name)}</p><p>اسم المنصة: إتقان</p><p>اسم المرحلة: ${escapeHtml(curriculumData[stageLevel].name)}</p><table><thead><tr><th>التقرير</th><th>عدد السجلات</th><th>متوسط الدرجات</th><th>التفاصيل</th></tr></thead><tbody>${rows}</tbody></table><p class="result">النسبة الموزونة: ${percentage}% (${stageGrade.earned} من ${stageGrade.possible} درجة)</p><p class="result">نتيجة المرحلة: ${result}</p><script>window.onload=()=>window.print();<\/script></body></html>`);
	printWindow.document.close();
}

function currentDate() {
	return new Intl.DateTimeFormat("ar", { year: "numeric", month: "short", day: "numeric" }).format(new Date());
}

function updateTeacherControls() {
	studentsHeading.hidden = !isTeacher;
	reportsNav.hidden = !isTeacher;
	studentsNav.hidden = !isTeacher;
	studentReportsNav.hidden = isTeacher || isGuest;
	lessonManagerToggle.hidden = !isTeacher;
	document.querySelector("#session-nav-label").textContent = isTeacher || activeStudentId || isGuest ? "تسجيل الخروج" : "تسجيل الدخول";
	if (!isTeacher) {
		lessonManagerPanel.hidden = true;
		lessonManagerToggle.setAttribute("aria-expanded", "false");
	}
	libraryManagement.hidden = !isTeacher || libraryPage.hidden;
	roleLabel.textContent = isTeacher ? "تسجيل خروج المعلم" : activeStudentId ? `خروج ${students.find((student) => student.id === activeStudentId).fullName}` : isGuest ? "خروج الزائر" : "دخول المعلم أو الطالب";
	roleAvatar.textContent = isTeacher ? "م" : activeStudentId ? students.find((student) => student.id === activeStudentId).fullName.slice(0, 1) : isGuest ? "ز" : "ط";
	roleToggle.setAttribute("aria-label", isTeacher ? "تسجيل خروج المعلم" : activeStudentId || isGuest ? "إنهاء جلسة العرض" : "دخول المعلم أو الطالب");
}

function openTeacherDialog() {
	teacherLoginError.hidden = true;
	teacherEmailInput.value = "";
	teacherPasswordInput.value = "";
	studentCodeInput.value = "";
	loginRoleInput.value = "teacher";
	updateLoginFields();
	document.querySelector("#teacher-dialog-title").textContent = "التسجيل والدخول";
	teacherDialog.showModal();
	teacherEmailInput.focus();
}

async function restoreLoginSession() {
	const cloud = window.itqanCloud;
	if (!cloud) {
		openTeacherDialog();
		return;
	}
	try {
		await cloud.ready;
		if (cloud.isTeacher) {
			isTeacher = true;
			activeStudentId = "";
			isGuest = false;
			activeReportStudentId = students[0]?.id || "";
		} else {
			const studentId = await cloud.getAuthenticatedStudentId();
			if (studentId) {
				await cloud.syncReady;
				const student = students.find((item) => item.id === studentId);
				if (!student) throw new Error("سجل الطالب غير موجود في قائمة المنصة. تواصل مع المعلم.");
				await cloud.activateStudent(student.id);
				isTeacher = false;
				activeStudentId = student.id;
				isGuest = false;
				studentReports = loadStudentReports();
				quizAttempts = loadQuizAttempts();
			}
		}
	} catch (error) {
		console.error("تعذرت استعادة جلسة الدخول:", error);
		openTeacherDialog();
		teacherLoginError.textContent = `تعذرت استعادة جلسة الدخول: ${error.message}`;
		teacherLoginError.hidden = false;
		return;
	}

	if (!isTeacher && !activeStudentId) {
		openTeacherDialog();
		return;
	}
	updateTeacherControls();
	renderCurriculum();
	window.dispatchEvent(new Event("itqan-session-changed"));
	if (isTeacher) showReports();
	else showStudentReports();
}

function updateLoginFields() {
	const teacherLogin = loginRoleInput.value === "teacher";
	loginEmailLabel.hidden = !teacherLogin;
	teacherEmailInput.hidden = !teacherLogin;
	teacherEmailInput.required = teacherLogin;
	loginPasswordLabel.hidden = !teacherLogin;
	teacherPasswordInput.hidden = !teacherLogin;
	teacherPasswordInput.required = teacherLogin;
	loginCodeLabel.hidden = teacherLogin;
	studentCodeInput.hidden = teacherLogin;
	studentCodeInput.required = !teacherLogin;
	if (!teacherLogin) studentCodeInput.focus();
}

function isActive(level, semester, lesson) {
	return activeLesson.level === level && activeLesson.semester === semester && activeLesson.lesson === lesson;
}

function renderCurriculum() {
	const studentId = activeStudentId;
	curriculum.innerHTML = curriculumData.map((level, levelIndex) => {
		if (!isTeacher && !isGuest && levelIndex > 0 && !isStagePassed(studentId, levelIndex - 1)) return "";
		return `
		<details class="level-group" ${levelIndex === activeLesson.level ? "open" : ""}>
			<summary><span class="level-marker">${String(levelIndex + 1).padStart(2, "0")}</span><span>${level.name}</span><span class="disclosure">⌄</span></summary>
			<div class="semester-list">
				${level.semesters.map((semester, semesterIndex) => `
					<details class="semester-group" ${levelIndex === activeLesson.level && semesterIndex === activeLesson.semester ? "open" : ""}>
						<summary><span>${semester}</span><span class="disclosure">⌄</span></summary>
						<div class="lesson-list">
							${getLessonNames(levelIndex, semesterIndex).map((lesson, lessonIndex) => {
								const key = `${levelIndex}-${semesterIndex}-${lessonIndex}`;
								const enabled = (Object.hasOwn(lessonAccess, key) ? lessonAccess[key] : semesterIndex === 0 && lessonIndex === 0)
									|| isLessonAvailableByProgress(studentId, levelIndex, semesterIndex, lessonIndex);
								if (!isTeacher && !isGuest && !enabled) return "";
								return `<div class="lesson-nav-row"><button class="lesson-nav ${isActive(levelIndex, semesterIndex, lessonIndex) ? "is-active" : ""}" type="button" data-level="${levelIndex}" data-semester="${semesterIndex}" data-lesson="${lessonIndex}"><span class="lesson-nav-dot"></span>${lesson}</button>${isTeacher ? `<button class="lesson-access-toggle ${enabled ? "is-enabled" : ""}" type="button" data-toggle-lesson="${key}" aria-label="${enabled ? "إيقاف" : "تفعيل"} ${lesson} للطلاب">${enabled ? "مفعّل" : "تفعيل"}</button>` : ""}</div>`;
							}).join("")}
						</div>
					</details>
				`).join("")}
			</div>
		</details>
		`;
	}).join("");
}

curriculum.addEventListener("click", (event) => {
	const toggle = event.target.closest("[data-toggle-lesson]");
	if (toggle && isTeacher) {
		const key = toggle.dataset.toggleLesson;
		const enabled = Object.hasOwn(lessonAccess, key) ? lessonAccess[key] : key.split("-")[1] === "0" && key.split("-")[2] === "0";
		lessonAccess[key] = !enabled;
		saveLessonAccess();
		renderCurriculum();
		return;
	}
	const lessonButton = event.target.closest(".lesson-nav");
	if (!lessonButton) return;
	const level = Number(lessonButton.dataset.level);
	const semester = Number(lessonButton.dataset.semester);
	const lesson = Number(lessonButton.dataset.lesson);
	const key = `${level}-${semester}-${lesson}`;
	const enabled = (Object.hasOwn(lessonAccess, key) ? lessonAccess[key] : semester === 0 && lesson === 0)
		|| isLessonAvailableByProgress(activeStudentId, level, semester, lesson);
	if (!isTeacher && ((!enabled && !isGuest) || !isGuest && level > 0 && !isStagePassed(activeStudentId, level - 1))) return;
	window.studentFeatures?.recordAuditEvent("فتح درس", getLessonNames(level, semester)[lesson]);
	activeLesson = { level, semester, lesson };
	updateLesson();
	openLessonCodePage(level, semester, lesson);
});

function setSidebarOpen(isOpen) {
	sidebar.classList.toggle("is-open", isOpen);
	sidebarScrim.classList.toggle("is-visible", isOpen);
	menuToggle.setAttribute("aria-expanded", String(isOpen));
	menuToggle.setAttribute("aria-label", isOpen ? "إغلاق القائمة" : "فتح القائمة");
}

function renderLessonBook(lessonPath) {
	const isTelegramBookLink = /^https?:\/\/(www\.)?t\.me\//i.test(lessonPath);
	const canPreviewBook = Boolean(lessonPath) && !isTelegramBookLink;
	bookFrame.hidden = !canPreviewBook;
	document.querySelector("#book-fallback").hidden = canPreviewBook;
	document.querySelector("#book-fallback h3").textContent = isTelegramBookLink ? "رابط كتاب الدرس جاهز" : "كتاب الدرس غير متاح للعرض";
	document.querySelector("#book-fallback p").textContent = isTelegramBookLink ? "افتح رابط تيليجرام من الزر أعلاه لعرض الكتاب." : "أضف ملف الدرس إلى مجلد المنصة أو أضف رابطاً من إدارة الدرس.";
	document.querySelector("#book-viewer").classList.toggle("is-empty", !canPreviewBook);
	openBook.hidden = !lessonPath;
	if (canPreviewBook) bookFrame.src = lessonPath;
	if (lessonPath) openBook.href = lessonPath;
}

function updateLesson() {
	const level = curriculumData[activeLesson.level];
	const semester = level.semesters[activeLesson.semester];
	const lesson = currentLessonName();
	homeworkAssignments = getLessonHomeworkAssignments(currentLessonKey());
	lessonTools = getLessonTools(currentLessonKey());
	const lessonPath = getLessonAssetPaths().lesson;

	lessonHeading.textContent = lesson;
	document.title = `${lesson} · ${level.name} | إتقان`;
	lessonContext.textContent = `${level.name} · ${semester}`;
	breadcrumbs.innerHTML = `${level.name} <span>/</span> ${semester}`;
	lessonNumber.innerHTML = `${String(absoluteLessonNumber(activeLesson.level, activeLesson.semester, activeLesson.lesson)).padStart(2, "0")} <i>/ ${String(stageLessonCounts[activeLesson.level]).padStart(2, "0")}</i>`;
	renderLessonBook(lessonPath);
	lessonManagerPanel.hidden = true;
	lessonManagerToggle.setAttribute("aria-expanded", "false");
	audio.pause();
	audio.currentTime = 0;
	if (audioObjectUrl) URL.revokeObjectURL(audioObjectUrl);
	audioObjectUrl = "";
	audio.removeAttribute("src");
	audio.controls = false;
	audio.hidden = true;
	if (translationObjectUrl) URL.revokeObjectURL(translationObjectUrl);
	translationObjectUrl = "";
	activityPanel.hidden = true;
	showLessons();
	renderLessonTools();
	if (isTeacher) renderTeacherLessonManager();
	renderCurriculum();
	setSidebarOpen(false);
}

function renderLessonTools() {
	const icons = { dictionary: "ع", "activity-book": "▤", audio: "♫", homework: "✓", quiz: "?", resource: "↗" };
	const visibleTools = isTeacher ? lessonTools : lessonTools.filter((tool) => tool.active);
	lessonToolsList.innerHTML = visibleTools.map((tool) => `
		<button class="tool-button ${tool.active ? "" : "is-disabled"}" type="button" data-action="${escapeHtml(tool.action)}" data-tool-id="${escapeHtml(tool.id)}" data-active="${tool.active}">
			<span class="tool-icon ${tool.action === "audio" ? "audio-icon" : tool.action === "quiz" ? "quiz-icon" : tool.action === "resource" ? "practice-icon" : "homework-icon"}">${escapeHtml(tool.icon || icons[tool.action] || "•")}</span>
			<span><strong>${escapeHtml(tool.title)}</strong><small>${escapeHtml(tool.description || "")}${tool.grade !== "" && tool.grade !== undefined ? ` · الدرجة القصوى ${escapeHtml(tool.grade)}` : ""}${!tool.active ? " · غير مفعّلة" : ""}</small></span><span class="tool-arrow">←</span>
		</button>
	`).join("") || `<p class="no-students">لا توجد أدوات مفعّلة لهذا الدرس.</p>`;
}

function renderTeacherLessonManager() {
	if (!isTeacher) return;
	const configuredRepository = githubAssetsRepository.value.trim() || detectGithubPagesRepository();
	const autoLoadKey = `${configuredRepository}|${githubAssetsBranch.value.trim()}`;
	if (!projectAssets.length && configuredRepository && githubAssetsAutoLoadKey !== autoLoadKey) {
		githubAssetsAutoLoadKey = autoLoadKey;
		githubAssetsRepository.value = configuredRepository;
		loadGithubProjectAssets(configuredRepository, githubAssetsBranch.value);
	}
	const lessonKey = currentLessonKey();
	const defaultBookPath = lessonKey === "0-0-0" ? firstLessonAssetFiles.lesson : `الدرس ${lessonOrdinals[activeLesson.lesson] || activeLesson.lesson + 1}.pdf`;
	lessonBookForm.elements.url.value = Object.hasOwn(lessonBookOverrides, lessonKey) ? lessonBookOverrides[lessonKey] : defaultBookPath;
	renderProjectAssets();
	lessonToolsManagerList.innerHTML = lessonTools.map((tool) => `
		<article class="managed-tool ${tool.active ? "is-active" : ""}">
			<div class="managed-tool-main"><strong>${escapeHtml(tool.title)}</strong><small>${escapeHtml(tool.description || tool.action)}</small></div>
			<label class="assignment-activation-toggle ${tool.active ? "is-active" : ""}"><input type="checkbox" data-tool-active="${escapeHtml(tool.id)}" ${tool.active ? "checked" : ""}><span>${tool.active ? "مفعّلة" : "متوقفة"}</span></label>
			<label class="managed-tool-grade">الدرجة القصوى<input type="number" min="0" max="100" inputmode="numeric" value="${tool.grade ?? ""}" data-tool-grade="${escapeHtml(tool.id)}" aria-label="الدرجة القصوى للأداة ${escapeHtml(tool.title)}"></label>
			<button class="delete-report-button" type="button" data-delete-tool="${escapeHtml(tool.id)}">حذف</button>
		</article>
	`).join("") || `<p class="no-students">لا توجد أدوات لهذا الدرس.</p>`;
}

function showActivity(title, content) {
	activityRequestId += 1;
	activityPanel.innerHTML = `<div class="activity-heading"><div><span class="eyebrow">نشاط الدرس</span><h3>${title}</h3></div><button class="close-activity" type="button" aria-label="إغلاق النشاط">×</button></div><div class="activity-content">${content}</div>`;
	activityPanel.hidden = false;
	activityPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

async function openHomeworkFileViewer(fileId, fileName = "معاينة المرفق") {
	const dialog = document.querySelector("#homework-file-dialog");
	const viewer = document.querySelector("#homework-file-viewer");
	document.querySelector("#homework-file-title").textContent = fileName;
	viewer.replaceChildren();
	const fileData = await window.itqanCloud.getHomeworkFileData(fileId);
	let element;
	if (/^data:image\//i.test(fileData)) {
		element = document.createElement("img");
		element.alt = fileName;
		element.src = fileData;
	} else if (/^data:application\/pdf/i.test(fileData)) {
		element = document.createElement("iframe");
		element.title = fileName;
		element.src = fileData;
	} else if (/^data:audio\//i.test(fileData)) {
		element = document.createElement("audio");
		element.controls = true;
		element.autoplay = true;
		element.src = fileData;
	} else {
		throw new Error("نوع المرفق غير مدعوم للمعاينة داخل المنصة.");
	}
	viewer.append(element);
	if (!dialog.open) dialog.showModal();
}

function renderHomeworkActivity() {
	const manager = isTeacher ? `<form id="homework-management-form" class="homework-management-form"><input name="assignmentId" type="hidden"><label class="field-label">عنوان الواجب<input name="title" required maxlength="100" placeholder="عنوان الواجب"></label><label class="field-label">تعليمات الواجب<textarea name="details" required maxlength="300" rows="2" placeholder="اكتب تعليمات الواجب"></textarea></label>	<label class="field-label">آخر موعد للتسليم<input name="dueDate" type="date"></label><label class="field-label">ملف ورقة العمل (اختياري، حتى 600 كيلوبايت)<input name="worksheet" type="file" accept="image/*,.pdf,application/pdf"></label><label class="assignment-activation-toggle"><input name="active" type="checkbox"><span>تفعيل الواجب للطلاب عند الحفظ</span></label><div class="homework-manager-actions"><button class="save-report-button" type="submit">حفظ الواجب</button><button class="delete-report-button" type="button" data-reset-assignment>تفريغ النموذج</button></div></form>` : `<p class="activity-intro">أرسل الحل من النموذج أدناه ليصل للمعلم عبر الإنترنت ويظهر في قائمة المراجعة.</p>`;
	let pendingLateRequests = [];
	if (!isTeacher && activeStudentId) {
		try {
			pendingLateRequests = JSON.parse(localStorage.getItem("itqan-late-submission-requests-v1") || "{}")[activeStudentId] || [];
		} catch (error) {
			console.error("تعذر قراءة طلبات التسليم المتأخر:", error);
		}
	}
	const visibleAssignments = isTeacher ? homeworkAssignments : homeworkAssignments.filter((assignment) => assignment.active);
	const today = new Date();
	const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
	const assignmentCards = visibleAssignments.length ? visibleAssignments.map((assignment) => {
		const isLate = Boolean(assignment.dueDate && assignment.dueDate < todayKey);
		const lateAllowed = Array.isArray(assignment.lateAllowedStudentIds) && assignment.lateAllowedStudentIds.includes(activeStudentId);
		const studentSubmission = !isTeacher && isLate && !lateAllowed
			? `<div class="homework-submission"><p>انتهى موعد التسليم. يمكنك طلب فتح الواجب من المعلم.</p>${pendingLateRequests.some((request) => request.assignmentId === assignment.id && request.status === "pending") ? `<button class="text-button" type="button" disabled>طلبك بانتظار مراجعة المعلم</button>` : `<button class="text-button" type="button" data-request-late-submission="${escapeHtml(assignment.id)}">طلب إعادة فتح الواجب</button>`}<p class="submission-status" role="status"></p></div>`
			: activeStudentId
				? `<form class="homework-submission" data-assignment-submission="${escapeHtml(assignment.id)}"><label class="field-label">ملاحظات الحل<textarea name="details" maxlength="500" rows="2" placeholder="اكتب ملاحظة للمعلم (اختياري)"></textarea></label><label class="field-label">إرفاق صورة أو PDF أو تسجيل صوتي (حتى 600 كيلوبايت)<input name="file" type="file" accept="image/*,.pdf,application/pdf,audio/*" required></label><div class="voice-record-controls"><button class="text-button" type="button" data-record-voice>بدء تسجيل صوتي</button><span class="voice-record-status" role="status"></span><audio class="voice-record-preview" controls hidden></audio></div><button class="save-report-button" type="submit">إرسال للمعلم</button><p class="submission-status" role="status"></p></form>`
				: `<div class="homework-submission"><p>سجّل الدخول برمز الطالب لإرسال الواجب ومتابعة مراجعته.</p><button class="save-report-button" type="button" data-open-student-login>دخول الطالب</button></div>`;
		return `
		<article class="homework-assignment ${assignment.active ? "is-active" : "is-inactive"}" data-assignment-card="${escapeHtml(assignment.id)}">
			<div class="homework-assignment-copy"><h4>${escapeHtml(assignment.title)}</h4><p>${escapeHtml(assignment.details)}</p>${assignment.dueDate ? `<small class="assignment-due-date">آخر موعد: ${escapeHtml(assignment.dueDate)}</small>` : ""}</div>
			${assignment.attachment?.fileId ? `<button class="text-button" type="button" data-open-homework-file data-file-id="${escapeHtml(assignment.attachment.fileId)}" data-file-name="${escapeHtml(assignment.attachment.name || "مرفق")}">معاينة ملف الواجب: ${escapeHtml(assignment.attachment.name || "مرفق")}</button>` : assignment.attachment?.url ? (assignment.attachment.type?.startsWith("image/") ? `<img class="worksheet-preview" src="${escapeHtml(assignment.attachment.url)}" alt="ورقة عمل: ${escapeHtml(assignment.title)}">` : `<a class="text-button" href="${escapeHtml(assignment.attachment.url)}" target="_blank" rel="noopener">فتح ملف الواجب: ${escapeHtml(assignment.attachment.name || "PDF")}</a>`) : assignment.image ? `<img class="worksheet-preview" src="${escapeHtml(assignment.image)}" alt="ورقة عمل: ${escapeHtml(assignment.title)}">` : ""}
			${isTeacher ? `<div class="assignment-admin-actions"><label class="assignment-activation-toggle ${assignment.active ? "is-active" : ""}"><input type="checkbox" data-toggle-assignment="${escapeHtml(assignment.id)}" ${assignment.active ? "checked" : ""}><span>${assignment.active ? "مفعّل للطلاب" : "غير مفعّل"}</span></label><button class="save-report-button" type="button" data-edit-assignment="${escapeHtml(assignment.id)}">تعديل الواجب</button><button class="delete-report-button" type="button" data-delete-assignment="${escapeHtml(assignment.id)}">حذف الواجب</button></div>` : studentSubmission}
		</article>`;
	}).join("") : `<div class="reports-empty compact-empty"><h3>${isTeacher ? "لا توجد واجبات في هذا الدرس" : "لا توجد واجبات مفعّلة حالياً"}</h3></div>`;
	showActivity("واجبات الدرس", `${manager}<div class="homework-assignment-list">${assignmentCards}</div>`);
}

async function saveHomeworkAssignment(form) {
	if (!isTeacher) return;
	const formData = new FormData(form);
	const id = String(formData.get("assignmentId") || crypto.randomUUID());
	const existingIndex = homeworkAssignments.findIndex((assignment) => assignment.id === id);
	const assignment = existingIndex >= 0 ? { ...homeworkAssignments[existingIndex] } : { id };
	assignment.title = String(formData.get("title")).trim();
	assignment.details = String(formData.get("details")).trim();
	assignment.active = formData.has("active");
	assignment.dueDate = String(formData.get("dueDate") || "");
	const imageFile = formData.get("worksheet");
	if (imageFile?.size) {
		if (!(imageFile.type.startsWith("image/") || imageFile.type === "application/pdf") || imageFile.size > 600 * 1024 && !imageFile.type.startsWith("image/")) {
			form.querySelector('[name="worksheet"]').focus();
			form.insertAdjacentHTML("beforeend", `<p class="homework-form-error" role="alert">اختر صورة أو ملف PDF لا يتجاوز حجمه 600 كيلوبايت. تُضغط الصور الكبيرة تلقائياً.</p>`);
			return;
		}
		const upload = await window.itqanCloud.uploadHomeworkFile(imageFile, "assignment", id);
		assignment.attachment = { fileId: upload.fileId, name: upload.name, type: upload.type };
		delete assignment.image;
	}
	if (existingIndex >= 0) homeworkAssignments[existingIndex] = assignment;
	else homeworkAssignments.push(assignment);
	saveHomeworkAssignments();
	renderHomeworkActivity();
}

function renderLessonDocument(title, assetKey, description, customPath = "") {
	const assetPath = normalizeResourcePath(customPath || getLessonAssetPaths()[assetKey]);
	if (!assetPath) {
		showActivity(title, `<div class="reports-empty compact-empty"><h3>لا يوجد ملف مرتبط بهذه الأداة</h3><p>يمكن للمعلم إضافة رابط أو ملف من إدارة الدرس.</p></div>`);
		return;
	}
	const preview = /\.(?:avif|gif|jpe?g|png|svg|webp)(?:[?#]|$)/i.test(assetPath)
		? `<img class="document-image-preview" src="${escapeHtml(assetPath)}" alt="${escapeHtml(title)}" loading="lazy">`
		: `<iframe class="document-preview" src="${escapeHtml(assetPath)}" title="${escapeHtml(title)}" loading="lazy"></iframe>`;
	showActivity(title, `<div class="lesson-document"><p class="activity-intro">${escapeHtml(description || "")}</p>${preview}<a class="asset-open" href="${escapeHtml(assetPath)}" target="_blank" rel="noopener">فتح الملف في نافذة جديدة ↗</a></div>`);
}

function getAudioMimeType(path) {
	const extension = path.split(/[?#]/, 1)[0].split(".").pop().toLocaleLowerCase();
	return {
		aac: "audio/aac",
		m4a: "audio/mp4",
		mp3: "audio/mpeg",
		mp4: "audio/mp4",
		ogg: "audio/ogg",
		opus: "audio/ogg; codecs=opus",
		wav: "audio/wav",
		webm: "audio/webm"
	}[extension] || "";
}

function renderLessonAudio(tool = null) {
	const paths = getLessonAssetPaths();
	const tracks = tool?.url ? [{ label: tool.title, src: normalizeResourcePath(tool.url), type: getAudioMimeType(tool.url) }] : [
		{ label: "الصوتية الأولى", src: paths.audioOne, type: getAudioMimeType(paths.audioOne) },
		{ label: "الصوتية الثانية", src: paths.audioTwo, type: getAudioMimeType(paths.audioTwo) }
	].filter((track) => track.src);
	showActivity(tool?.title || "صوتيات الدرس", `<div class="lesson-audio-list">${tracks.map((track) => `<article class="lesson-audio-track"><strong>${escapeHtml(track.label)}</strong><audio controls preload="metadata"><source src="${escapeHtml(track.src)}" ${track.type ? `type="${track.type}"` : ""}>المتصفح لا يدعم تشغيل هذا الملف الصوتي.</audio></article>`).join("") || `<p class="activity-intro">لا توجد ملفات صوتية مرتبطة بهذه الأداة.</p>`}</div>`);
}

function shuffleMatchingOptions(pairs) {
	const options = pairs.map((pair, index) => ({ pair, index }));
	for (let index = options.length - 1; index > 0; index -= 1) {
		const randomIndex = Math.floor(Math.random() * (index + 1));
		[options[index], options[randomIndex]] = [options[randomIndex], options[index]];
	}
	if (options.length > 1 && options.every((option, index) => option.index === index)) options.push(options.shift());
	return options;
}

function renderQuizQuestion() {
	const current = quizState.questions[quizState.questionIndex];
	const minimumSeconds = window.lessonInteractions?.minimumTimeRemaining() ?? null;
	const minimumTimeError = window.lessonInteractions?.minimumTimeError() || "";
	const minimumTimePhase = window.lessonInteractions?.minimumTimePhase() || "";
	const minimumTimeMessage = minimumTimeError
		? `<p class="lesson-feature-status" data-lesson-minimum-time role="status">${escapeHtml(minimumTimeError)}</p>`
		: minimumSeconds !== null && minimumSeconds > 0
			? `<p class="lesson-feature-status" data-lesson-minimum-time role="status">${minimumSeconds === Infinity ? "تعذر قراءة مؤقت النشاط؛ اطلب من المعلم إعادة ضبطه." : minimumTimePhase === "ready" ? `ينتظر النشاط بدء المعلم للمؤقت؛ الحد الأدنى: ${window.lessonInteractions.formatTime(minimumSeconds)}` : `الوقت الأدنى لحل النشاط: ${window.lessonInteractions.formatTime(minimumSeconds)}`}</p>`
		: "";
	const minimumTimeComplete = !minimumTimeError && (minimumSeconds === null || minimumSeconds === 0);
	const matchingOptions = current.type === "matching" || current.type === "imageMatching"
		? shuffleMatchingOptions(current.pairs)
		: [];
	const matchingQuestion = current.type === "matching" || current.type === "imageMatching";
	const optionInputs = current.type === "multiple"
		? `<div class="answer-list">${current.options.map((option, index) => `<label class="assessment-option"><input type="radio" name="answer" value="${index}" required><span>${escapeHtml(option)}</span></label>`).join("")}</div>`
		: current.type === "trueFalse"
				? `<div class="answer-list">${[true, false].map((answer, index) => `<label class="assessment-option"><input type="radio" name="answer" value="${index === 0}" required><span>${index === 0 ? "صح" : "خطأ"}</span></label>`).join("")}</div>`
				: matchingQuestion
					? `<div class="matching-list">${current.pairs.map((pair, index) => `<label class="matching-row">${current.type === "imageMatching" ? `<img class="quiz-question-image" src="${escapeHtml(pair.image)}" alt="صورة السؤال ${index + 1}" loading="lazy">` : `<strong>${escapeHtml(pair.left)}</strong>`}<select name="match-${index}" required><option value="">اختر المطابقة</option>${matchingOptions.map((option) => `<option value="${option.index}">${escapeHtml(option.pair.right ?? option.pair.text)}</option>`).join("")}</select></label>`).join("")}</div>`
				: `<label class="field-label writing-answer">الإجابة<input name="answer" type="text" required autocomplete="off" maxlength="80" placeholder="اكتب الإجابة"></label>`;
	const timer = quizState.expiresAt ? `<span class="quiz-countdown" id="quiz-countdown" role="timer" aria-live="off"></span>` : "";
	showActivity(quizSettingsByLesson[quizState.lessonKey]?.title || "اختبار الدرس", `<div class="quiz-progress"><span>السؤال رقم ${quizState.questionIndex + 1} من ${quizState.questions.length} · المحاولة ${quizState.attemptNumber} من 2</span>${timer}<span class="progress-track"><i style="width:${((quizState.questionIndex + 1) / quizState.questions.length) * 100}%"></i></span></div><h4 class="question-text">${escapeHtml(current.prompt)}</h4>${current.hint ? `<p class="quiz-question-hint"><strong>تلميح:</strong> ${escapeHtml(current.hint)}</p>` : ""}<form id="assessment-question-form" class="assessment-question-form" data-answered="false">${optionInputs}${minimumTimeMessage}<p class="answer-feedback" id="answer-feedback" aria-live="polite"></p><button class="next-question" type="submit" data-minimum-time-submit ${minimumTimeComplete ? "" : "disabled"}>تحقق من الإجابة</button></form>`);
	if (quizTimerInterval) window.clearInterval(quizTimerInterval);
	if (quizState.expiresAt) {
		const updateTimer = () => {
				const remaining = Math.max(0, quizState.expiresAt - Date.now());
				const timerElement = document.querySelector("#quiz-countdown");
				if (timerElement) timerElement.textContent = `الوقت المتبقي ${window.lessonInteractions.formatTime(Math.ceil(remaining / 1000))}`;
				if (!remaining) {
					window.clearInterval(quizTimerInterval);
					quizTimerInterval = 0;
					completeAssessment(true);
				}
		};
		updateTimer();
		if (quizState && quizState.expiresAt > Date.now()) quizTimerInterval = window.setInterval(updateTimer, 1000);
	}
}

async function startQuiz() {
	if (!activeStudentId) {
		showActivity("دخول الطالب مطلوب", `<p class="activity-intro">سجّل الدخول ببريدك الإلكتروني لحفظ محاولاتك ودرجتك.</p><button class="save-report-button" type="button" data-open-student-login>دخول الطالب</button>`);
		return;
	}
	const lessonKey = currentLessonKey();
	const settings = getQuizSettings(lessonKey, window.lessonQuizData?.[lessonKey]?.length || 0);
	if (!Object.hasOwn(quizSettingsByLesson, lessonKey)) {
		showActivity("الاختبار غير موجود", `<p class="activity-intro">لم يضف المعلم اختباراً لهذا الدرس.</p>`);
		return;
	}
	const scheduledAt = settings.startsAt ? new Date(settings.startsAt).getTime() : 0;
	if (!Number.isFinite(scheduledAt) || !scheduledAt) {
		showActivity("موعد الاختبار غير محدد", `<p class="activity-intro">لم يحدد المعلم موعد بدء هذا الاختبار بعد.</p>`);
		return;
	}
	if (scheduledAt > Date.now()) {
		showActivity("الاختبار غير مفعّل بعد", `<p class="activity-intro">يتفعّل الاختبار تلقائياً في: ${escapeHtml(new Date(scheduledAt).toLocaleString("ar"))}</p>`);
		return;
	}
	if (isExternalQuiz(settings.mode)) {
		if (!/^https:\/\/\S+$/i.test(settings.url || "")) {
			showActivity("رابط الاختبار غير صالح", `<p class="activity-intro">تحقق من رابط الاختبار الخارجي مع المعلم.</p>`);
			return;
		}
		window.open(settings.url, "_blank", "noopener");
		return;
	}
	const studentId = activeStudentId;
	const requestId = ++activityRequestId;
	let questions;
	try {
		questions = await loadLessonQuizFile(lessonKey);
	} catch (error) {
		if (requestId === activityRequestId) showActivity("تقويم الدرس", `<div class="reports-empty compact-empty"><h3>أسئلة هذا الدرس غير متاحة بعد</h3><p>${escapeHtml(error.message)}</p></div>`);
		return;
	}
	if (requestId !== activityRequestId || lessonKey !== currentLessonKey() || studentId !== activeStudentId) return;
	const studentAttempts = quizAttempts[activeStudentId]?.[lessonKey] || { completed: [], inProgress: null };
	if (!questions.length) {
		showActivity("أسئلة هذا الاختبار غير متاحة", `<p class="activity-intro">أضف أسئلة داخلية أو غيّر نوع الاختبار من إدارة المعلم.</p>`);
		return;
	}
	const attemptLimit = settings.allowRetry === false ? 1 : 2;
	if (!studentAttempts.inProgress && studentAttempts.completed.length >= attemptLimit) {
		renderAssessmentResult(studentAttempts, questions.length);
		return;
	}
	const attemptNumber = studentAttempts.completed.length + 1;
	if (!studentAttempts.inProgress) {
		const shuffled = [...questions];
		for (let index = shuffled.length - 1; index > 0; index -= 1) {
			const randomIndex = Math.floor(Math.random() * (index + 1));
			[shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
		}
		const selectedQuestions = shuffled.slice(0, Math.min(questions.length, Math.max(1, Number(settings.questionLimit) || questions.length)));
		const durationMinutes = Number(settings.durationMinutes);
		studentAttempts.inProgress = {
			questionIndex: 0,
			score: 0,
			answers: [],
			responses: [],
			questions: selectedQuestions,
			expiresAt: durationMinutes > 0 ? Date.now() + durationMinutes * 60 * 1000 : 0
		};
		if (!quizAttempts[activeStudentId]) quizAttempts[activeStudentId] = {};
		quizAttempts[activeStudentId][lessonKey] = studentAttempts;
		saveQuizAttempts();
	}
	const progress = studentAttempts.inProgress;
	if (!Array.isArray(progress.responses)) progress.responses = [];
	if (progress.expiresAt && progress.expiresAt <= Date.now()) {
		quizState = { studentId: activeStudentId, lessonKey, attemptNumber, ...progress, questions: progress.questions || questions };
		completeAssessment(true);
		return;
	}
	quizState = { studentId: activeStudentId, lessonKey, attemptNumber, ...progress, questions: progress.questions || questions };
	renderQuizQuestion();
}

function normalizeWrittenAnswer(value) {
	return String(value).trim().toLocaleLowerCase().replace(/[.,!?؟]/g, "");
}

function gradeAssessmentAnswer(question, form) {
	if (question.type === "multiple") return Number(form.elements.answer.value) === question.answer;
	if (question.type === "trueFalse") return (form.elements.answer.value === "true") === question.answer;
	if (question.type === "matching" || question.type === "imageMatching") return question.pairs.every((pair, index) => Number(form.elements[`match-${index}`].value) === index);
	return question.acceptedAnswers.some((answer) => normalizeWrittenAnswer(answer) === normalizeWrittenAnswer(form.elements.answer.value));
}

function getExpectedAssessmentAnswer(question) {
	if (question.type === "multiple") return question.options[question.answer];
	if (question.type === "trueFalse") return question.answer ? "صح" : "خطأ";
	if (question.type === "matching") return question.pairs.map((pair) => `${pair.left} = ${pair.right}`).join("، ");
	if (question.type === "imageMatching") return question.pairs.map((pair, index) => `الصورة ${index + 1} = ${pair.text}`).join("، ");
	return question.acceptedAnswers.join(" / ");
}

function getAssessmentResponse(question, form) {
	if (question.type === "multiple") return question.options[Number(form.elements.answer.value)] || "";
	if (question.type === "trueFalse") return form.elements.answer.value === "true" ? "صح" : "خطأ";
	if (question.type === "matching") return question.pairs.map((pair, index) => `${pair.left} = ${question.pairs[Number(form.elements[`match-${index}`].value)]?.right || ""}`);
	if (question.type === "imageMatching") return question.pairs.map((pair, index) => `الصورة ${index + 1} = ${question.pairs[Number(form.elements[`match-${index}`].value)]?.text || ""}`);
	return String(form.elements.answer.value || "").trim();
}

function persistAssessmentProgress() {
	const entry = quizAttempts[quizState.studentId][quizState.lessonKey];
	entry.inProgress = { questionIndex: quizState.questionIndex, score: quizState.score, answers: quizState.answers, responses: quizState.responses, questions: quizState.questions, expiresAt: quizState.expiresAt };
	saveQuizAttempts();
}

function renderAssessmentResult(entry, totalQuestions, timeExpired = false) {
	const bestScore = Math.max(0, ...entry.completed.map((attempt) => attempt.score));
	const latestCorrections = entry.completed[entry.completed.length - 1]?.corrections || [];
	const correctionReview = latestCorrections.length
		? `<details class="quiz-correction-review"><summary>مراجعة التصحيح التلقائي</summary>${latestCorrections.map((item, index) => `<p class="${item.correct ? "is-correct" : "is-incorrect"}"><strong>السؤال ${index + 1}:</strong> ${escapeHtml(item.prompt)}<br>${item.correct ? "إجابة صحيحة" : `الإجابة الصحيحة: ${escapeHtml(item.expected)}`}</p>`).join("")}</details>`
		: "";
	const attemptLimit = quizSettingsByLesson[quizState?.lessonKey]?.allowRetry === false ? 1 : 2;
	const retryButton = entry.completed.length < attemptLimit ? `<button class="next-question" type="button" data-retry-assessment>إعادة الاختبار</button>` : "";
	showActivity(quizSettingsByLesson[quizState?.lessonKey]?.title || "نتيجة الاختبار", `<div class="assessment-result"><span class="success-seal" aria-hidden="true">✓</span><h4>أعلى نتيجة حتى الآن ${bestScore}%</h4><p>عدد المحاولات المستخدمة: ${entry.completed.length} من ${attemptLimit}</p><p>تُعتمد أعلى درجة من المحاولات (${totalQuestions} أسئلة).</p>${timeExpired ? `<p>انتهى الوقت المحدد وصُححت الإجابات المحفوظة تلقائياً.</p>` : ""}${correctionReview}<p class="quiz-result-sync-status" id="quiz-result-sync-status" role="status"></p>${retryButton}</div>`);
}

async function completeAssessment(timeExpired = false) {
	if (!quizState || quizState.completionPending) return;
	quizState.completionPending = true;
	if (quizTimerInterval) window.clearInterval(quizTimerInterval);
	quizTimerInterval = 0;
	const entry = quizAttempts[quizState.studentId][quizState.lessonKey];
	const score = Math.round((quizState.score / quizState.questions.length) * 100);
	const completedAttempt = {
		score,
		completedAt: currentDate(),
		corrections: quizState.questions.map((question, index) => ({
			prompt: question.prompt,
			correct: quizState.answers[index] === true,
			expected: getExpectedAssessmentAnswer(question),
			response: quizState.responses?.[index] || ""
		}))
	};
	entry.completed.push(completedAttempt);
	entry.inProgress = null;
	saveQuizAttempts();
	const bestScore = Math.max(...entry.completed.map((attempt) => attempt.score));
	const report = getStudentReport(quizState.studentId);
	const assessment = report.quizzes.find((record) => record.assessmentId === quizState.lessonKey);
	const title = quizSettingsByLesson[quizState.lessonKey]?.title || currentLessonName();
	const attemptLimit = quizSettingsByLesson[quizState.lessonKey]?.allowRetry === false ? 1 : 2;
	const details = `أفضل نتيجة لاختبار ${title} (${entry.completed.length} من ${attemptLimit} محاولة)`;
	if (assessment) {
		assessment.score = bestScore;
		assessment.title = title;
		assessment.details = details;
		assessment.date = currentDate();
		assessment.passed = bestScore >= 70;
	} else {
		report.quizzes.push({ assessmentId: quizState.lessonKey, date: currentDate(), lesson: currentLessonName(), level: activeLesson.level, semester: activeLesson.semester, lessonIndex: activeLesson.lesson, title, details, score: bestScore, passed: bestScore >= 70 });
	}
	updateStageSuccess(quizState.studentId);
	saveStudentReports(true);
	renderAssessmentResult(entry, quizState.questions.length, timeExpired);
	renderCurriculum();
	const result = {
		id: crypto.randomUUID(),
		studentId: quizState.studentId,
		lessonKey: quizState.lessonKey,
		quizTitle: title,
		score,
		totalQuestions: quizState.questions.length,
		attemptNumber: quizState.attemptNumber,
		submittedAt: new Date().toISOString(),
		answers: completedAttempt.corrections
	};
	quizResults.push(result);
	try {
		localStorage.setItem(quizResultsKey, JSON.stringify(quizResults));
	} catch (error) {
		console.error("تعذر حفظ نتيجة الاختبار محلياً:", error);
	}
	window.dispatchEvent(new Event("itqan-quiz-results-changed"));
	const syncStatus = activityPanel.querySelector("#quiz-result-sync-status");
	try {
		if (!window.itqanCloud?.submitQuizResult) throw new Error("الاتصال السحابي غير جاهز.");
		await window.itqanCloud.submitQuizResult(result);
		if (syncStatus) syncStatus.textContent = "تم إرسال نتيجتك وإجاباتك للمعلم.";
	} catch (error) {
		console.error("تعذرت مزامنة نتيجة الاختبار:", error);
		if (syncStatus) syncStatus.innerHTML = `تعذرت مزامنة النتيجة مع المعلم: ${escapeHtml(error.message)} <button class="text-button" type="button" data-resend-quiz-result="${escapeHtml(result.id)}">إعادة الإرسال</button>`;
	}
}

reportsNav.addEventListener("click", () => {
	reportNotice = "";
	showReports();
});

studentsNav.addEventListener("click", (event) => {
	if (!isTeacher) return;
	const studentButton = event.target.closest("[data-student-id]");
	if (studentButton) showReports(studentButton.dataset.studentId);
});

studentRoster.addEventListener("click", (event) => {
	if (!isTeacher) return;
	const studentButton = event.target.closest("[data-student-id]");
	if (studentButton) {
		reportNotice = "";
		showReports(studentButton.dataset.studentId);
	}
});

studentSearch.addEventListener("input", () => {
	if (isTeacher) renderReportsPage();
});

studentAccountForm.addEventListener("submit", (event) => {
	event.preventDefault();
	if (!isTeacher) return;
	const formData = new FormData(studentAccountForm);
	const name = String(formData.get("name") || "").trim();
	const nameEn = String(formData.get("nameEn") || "").trim();
	if (!name || !nameEn) {
		studentAccountStatus.textContent = "أدخل اسم الطالب بالعربية والإنجليزية.";
		return;
	}
	students.push({ id: `student-${crypto.randomUUID()}`, name, nameEn, fullName: name });
	saveStudents();
	renderStudentNavigation();
	renderReportsPage();
	studentAccountForm.reset();
	studentAccountStatus.textContent = `تمت إضافة ${name}. أصدر له رمز دخول من قائمته.`;
	window.dispatchEvent(new Event("itqan-data-changed"));
});

studentAccountList.addEventListener("click", async (event) => {
	if (!isTeacher) return;
	const createCodeButton = event.target.closest("[data-create-student-code]");
	const resetCodeButton = event.target.closest("[data-reset-student-code]");
	if (resetCodeButton) {
		const student = students.find((item) => item.id === resetCodeButton.dataset.resetStudentCode);
		if (!student || !window.confirm(`سيُبطل رمز ${student.fullName || student.name} الحالي فوراً ويصدر رمزاً جديداً. هل تريد المتابعة؟`)) return;
		resetCodeButton.disabled = true;
		try {
			const code = await window.itqanCloud.createStudentLoginCode(student.id);
			studentAccountStatus.textContent = `الرمز الجديد لـ ${student.fullName || student.name}: ${code} — أرسله للطالب الآن؛ لن يُحفظ كنص ولن يظهر مرة أخرى.`;
		} catch (error) {
			console.error("تعذر إعادة ضبط رمز الطالب:", error);
			studentAccountStatus.textContent = `تعذر إصدار رمز جديد: ${error.message}`;
		} finally {
			resetCodeButton.disabled = false;
		}
		return;
	}
	if (createCodeButton) {
		const student = students.find((item) => item.id === createCodeButton.dataset.createStudentCode);
		if (!student) return;
		const requestedCode = window.prompt(`أدخل رمز الدخول الخاص بـ ${student.fullName || student.name}. سيُخزَّن كتجزئة فقط، ويُعامل اختلاف الأحرف الكبيرة والصغيرة على أنه متطابق.`);
		if (requestedCode === null) return;
		createCodeButton.disabled = true;
		studentAccountStatus.textContent = `جارٍ إصدار رمز لـ ${student.fullName || student.name}...`;
		try {
			const code = await window.itqanCloud.createStudentLoginCode(student.id, requestedCode);
			studentAccountStatus.textContent = requestedCode.trim()
				? `تم حفظ رمز دخول ${student.fullName || student.name}. أرسله للطالب؛ لن يُحفظ كنص ولن يظهر مرة أخرى.`
				: `رمز ${student.fullName || student.name}: ${code} — انسخه وأرسله للطالب الآن؛ لن يظهر مرة أخرى.`;
		} catch (error) {
			console.error("تعذر إصدار رمز الطالب:", error);
			studentAccountStatus.textContent = `تعذر إصدار الرمز: ${error.message}`;
		} finally {
			createCodeButton.disabled = false;
		}
		return;
	}
	const deleteButton = event.target.closest("[data-delete-student]");
	if (!deleteButton) return;
	const student = students.find((item) => item.id === deleteButton.dataset.deleteStudent);
	if (!student) return;
	if (!window.confirm(`هل تريد حذف حساب الطالب ${student.fullName || student.name} من قائمة الدخول؟ ستبقى سجلاته محفوظة.`)) return;
	try {
		await window.itqanCloud.revokeStudentLoginCode(student.id);
	} catch (error) {
		console.error("تعذر إبطال رمز الطالب:", error);
		studentAccountStatus.textContent = `تعذر إبطال الرمز، لم يُحذف الطالب: ${error.message}`;
		return;
	}
	students = students.filter((item) => item.id !== student.id);
	if (activeReportStudentId === student.id) activeReportStudentId = students[0]?.id || "";
	saveStudents();
	renderStudentNavigation();
	renderReportsPage();
	studentAccountStatus.textContent = `تم حذف ${student.fullName || student.name} من قائمة الدخول.`;
	window.dispatchEvent(new Event("itqan-data-changed"));
});

studentReportPanel.addEventListener("click", (event) => {
	if (!isTeacher) return;
	const printButton = event.target.closest("[data-print-success-level]");
	if (printButton) {
		const student = students.find((item) => item.id === activeReportStudentId);
		if (student) printSuccessNotice(student, Number(printButton.dataset.printSuccessLevel));
		return;
	}
	const recordAction = event.target.closest("[data-record-action]");
	if (recordAction) {
		const report = getStudentReport(activeReportStudentId);
		const category = recordAction.dataset.recordCategory;
		const index = Number(recordAction.dataset.recordIndex);
		const record = report[category]?.[index];
		if (!record) return;
		if (recordAction.dataset.recordAction === "delete") {
			report[category].splice(index, 1);
			reportNotice = "تم حذف السجل.";
		} else {
			const scoreInput = studentReportPanel.querySelector(`[data-edit-score="${index}"]`);
			if (scoreInput && scoreInput.value !== "" && !scoreInput.validity.valid) {
				scoreInput.focus();
				return;
			}
			if (scoreInput && scoreInput.value !== "") record.score = Number(scoreInput.value);
			else delete record.score;
			const statusInput = studentReportPanel.querySelector(`[data-edit-status="${index}"]`);
			if (statusInput) record.status = statusInput.value;
			const commentInput = studentReportPanel.querySelector(`[data-edit-comment="${index}"]`);
			if (commentInput) record.teacherComment = commentInput.value.trim();
			if (category === "quizzes" && !record.examNumber) record.passed = Number(record.score) >= 70;
			reportNotice = "تم تحديث السجل.";
		}
		updateStageSuccess(activeReportStudentId);
		saveStudentReports();
		renderReportsPage();
		renderCurriculum();
		return;
	}
	const categoryButton = event.target.closest("[data-report-category]");
	if (!categoryButton) return;
	activeReportCategory = categoryButton.dataset.reportCategory;
	reportNotice = "";
	renderStudentReport();
});

studentReportPanel.addEventListener("submit", (event) => {
	const nameForm = event.target.closest("#student-name-form");
	if (nameForm) {
		event.preventDefault();
		if (!isTeacher) return;
		const student = students.find((item) => item.id === activeReportStudentId);
		if (!student) return;
		student.fullName = String(new FormData(nameForm).get("fullName")).trim();
		student.name = student.fullName;
		localStorage.setItem(studentNamesStorageKey, JSON.stringify(Object.fromEntries(students.map((item) => [item.id, item.fullName || item.name]))));
		if (isTeacher) saveStudents();
		renderStudentNavigation();
		renderReportsPage();
		return;
	}
	const form = event.target.closest("#report-entry-form");
	if (!form) return;
	event.preventDefault();
	if (!isTeacher) {
		showLessons();
		return;
	}

	const report = getStudentReport(activeReportStudentId);
	const formData = new FormData(form);
	const lesson = currentLessonName();
	const date = currentDate();
	const level = activeLesson.level;
	const semester = activeLesson.semester;
	const lessonIndex = activeLesson.lesson;
	const lessonRecordCount = (category) => report[category].filter((record) => Number(record.level ?? 0) === level && Number(record.semester ?? 0) === semester && Number(record.lessonIndex ?? 0) === lessonIndex).length;

	if (form.dataset.category === "homework") {
		if (level === 0 && semester === 0 && lessonRecordCount("homework") >= 5) return;
		const record = { id: crypto.randomUUID(), date, lesson, level, semester, lessonIndex, status: formData.get("status"), details: formData.get("details"), score: Number(formData.get("score")) };
		report.homework.push(record);
	} else if (form.dataset.category === "participation") {
		if (level === 0 && semester === 0 && lessonRecordCount("participation") >= 5) return;
		const record = { id: crypto.randomUUID(), date, lesson, level, semester, lessonIndex, details: formData.get("details"), score: Number(formData.get("score")) };
		report.participation.push(record);
	} else if (form.dataset.category === "recitation") {
		report.recitation.push({ id: crypto.randomUUID(), date, lesson, level, semester, lessonIndex, details: formData.get("details"), score: Number(formData.get("score")) });
	} else if (form.dataset.category === "activityBook") {
		report.activityBook.push({ id: crypto.randomUUID(), date, lesson, level, semester, lessonIndex, details: formData.get("details"), score: Number(formData.get("score")) });
	} else if (form.dataset.category === "quizzes") {
		const score = Number(formData.get("score"));
		const title = String(formData.get("title")).trim();
		const examNumber = Number(form.dataset.examNumber);
		if (level === 0 && semester === 0 && (!examNumber || report.quizzes.some((record) => Number(record.level ?? 0) === 0 && Number(record.semester ?? 0) === 0 && Number(record.examNumber) === examNumber))) return;
		const isStageExam = level === 0 && semester === 0;
		const passed = !isStageExam && score >= 70;
		const quizId = crypto.randomUUID();
		report.quizzes.push({ id: quizId, date, lesson, level, semester, lessonIndex, ...(isStageExam ? { examNumber } : {}), title, score, ...(isStageExam ? {} : { passed }) });
	}

	updateStageSuccess(activeReportStudentId);
	saveStudentReports();
	if (report.success.some((notice) => notice.stageLevel === level)) {
		activeReportCategory = "success";
		reportNotice = "تم بلوغ نسبة النجاح وإصدار إشعار المرحلة.";
	} else {
		reportNotice = "تم حفظ التقرير.";
	}
	renderReportsPage();
	renderCurriculum();
});

document.querySelector(".lesson-tools").addEventListener("click", (event) => {
	const tool = event.target.closest("[data-action]");
	if (!tool) return;
	const configuredTool = lessonTools.find((item) => item.id === tool.dataset.toolId);
	if (!configuredTool || (!configuredTool.active && !isTeacher)) return;
	const actions = {
		dictionary: () => renderLessonDocument(configuredTool.title, "dictionary", configuredTool.description, configuredTool.url),
		"activity-book": () => renderLessonDocument(configuredTool.title, "activityBook", configuredTool.description, configuredTool.url),
		audio: () => renderLessonAudio(configuredTool),
		homework: renderHomeworkActivity,
		quiz: startQuiz,
		resource: () => renderLessonDocument(configuredTool.title, "", configuredTool.description, configuredTool.url)
	};
	actions[configuredTool.action]?.();
});

lessonManagerToggle.addEventListener("click", () => {
	if (!isTeacher) return;
	lessonManagerPanel.hidden = !lessonManagerPanel.hidden;
	lessonManagerToggle.setAttribute("aria-expanded", String(!lessonManagerPanel.hidden));
	if (!lessonManagerPanel.hidden) renderTeacherLessonManager();
});

lessonManagerPanel.addEventListener("focusin", (event) => {
	const input = event.target.closest("[data-resource-path-picker] input");
	if (isTeacher && input) renderResourcePathOptions(input);
});

lessonManagerPanel.addEventListener("input", (event) => {
	const input = event.target.closest("[data-resource-path-picker] input");
	if (isTeacher && input) renderResourcePathOptions(input);
});

lessonManagerPanel.addEventListener("keydown", (event) => {
	const input = event.target.closest("[data-resource-path-picker] input");
	if (event.key === "Escape" && input) hideResourcePathOptions(input.closest("[data-resource-path-picker]"));
});

projectAssetsFolder.addEventListener("change", () => {
	if (!isTeacher) return;
	projectAssetsRequestId += 1;
	projectAssets = Array.from(projectAssetsFolder.files, (file) => {
		const selectedPath = file.webkitRelativePath || file.name;
		const pathParts = selectedPath.split("/");
		const path = pathParts.length > 1 ? pathParts.slice(1).join("/") : file.name;
		return { path, name: file.name, category: getProjectAssetCategory(file.name) };
	}).sort((left, right) => left.path.localeCompare(right.path, "ar"));
	projectAssetsSource = "مجلد محلي";
	projectAssetsStatus.textContent = projectAssets.length
		? `تم العثور على ${projectAssets.length} ملف داخل المجلد المحدد.`
		: "لم يتم العثور على ملفات في المجلد المحدد.";
	projectAssetsStatus.setAttribute("role", "status");
	renderProjectAssets();
});

githubAssetsForm.addEventListener("submit", (event) => {
	event.preventDefault();
	if (!isTeacher) return;
	githubAssetsAutoLoadKey = `${githubAssetsRepository.value.trim()}|${githubAssetsBranch.value.trim()}`;
	loadGithubProjectAssets(githubAssetsRepository.value, githubAssetsBranch.value);
});

refreshGithubAssets.addEventListener("click", () => {
	if (!isTeacher) return;
	githubAssetsAutoLoadKey = `${githubAssetsRepository.value.trim()}|${githubAssetsBranch.value.trim()}`;
	loadGithubProjectAssets(githubAssetsRepository.value, githubAssetsBranch.value);
});

lessonBookForm.addEventListener("submit", (event) => {
	event.preventDefault();
	if (!isTeacher) return;
	lessonBookOverrides[currentLessonKey()] = lessonBookForm.elements.url.value.trim();
	saveLessonBooks();
	updateLesson();
	lessonManagerPanel.hidden = false;
	lessonManagerToggle.setAttribute("aria-expanded", "true");
});

document.querySelector("#remove-lesson-book").addEventListener("click", () => {
	if (!isTeacher) return;
	lessonBookOverrides[currentLessonKey()] = "";
	saveLessonBooks();
	updateLesson();
	lessonManagerPanel.hidden = false;
	lessonManagerToggle.setAttribute("aria-expanded", "true");
});

lessonToolForm.addEventListener("submit", (event) => {
	event.preventDefault();
	if (!isTeacher) return;
	const formData = new FormData(lessonToolForm);
	const action = String(formData.get("action"));
	const icons = { dictionary: "ع", "activity-book": "▤", audio: "♫", homework: "✓", quiz: "?", resource: "↗" };
	lessonTools.push({
		id: crypto.randomUUID(),
		title: String(formData.get("title")).trim(),
		description: String(formData.get("description")).trim(),
		action,
		url: String(formData.get("url")).trim(),
		grade: formData.get("grade") === "" ? "" : Number(formData.get("grade")),
		active: formData.has("active"),
		icon: icons[action] || "↗"
	});
	saveLessonTools();
	lessonToolForm.reset();
	lessonToolForm.elements.active.checked = true;
	renderLessonTools();
	renderTeacherLessonManager();
});

lessonManagerPanel.addEventListener("click", (event) => {
	if (!isTeacher) return;
	const pathOption = event.target.closest("[data-resource-path]");
	if (pathOption) {
		const picker = pathOption.closest("[data-resource-path-options]").closest("[data-resource-path-picker]");
		const input = picker.querySelector("input");
		input.value = pathOption.dataset.resourcePath;
		if (input === lessonToolForm.elements.url) {
			lessonToolForm.elements.action.value = pathOption.dataset.assetCategory === "صوت" ? "audio" : "resource";
			if (!lessonToolForm.elements.title.value.trim()) {
				lessonToolForm.elements.title.value = pathOption.dataset.assetName.replace(/\.[^.]+$/, "");
			}
		}
		hideResourcePathOptions(picker);
		return;
	}
	if (!event.target.closest("[data-resource-path-picker]")) {
		lessonManagerPanel.querySelectorAll("[data-resource-path-picker]").forEach(hideResourcePathOptions);
	}
	const bookAssetButton = event.target.closest("[data-project-asset-book]");
	if (bookAssetButton) {
		lessonBookForm.elements.url.value = bookAssetButton.dataset.projectAssetBook;
		return;
	}
	const toolAssetButton = event.target.closest("[data-project-asset-tool]");
	if (toolAssetButton) {
		const path = toolAssetButton.dataset.projectAssetTool;
		const filename = toolAssetButton.dataset.assetName;
		lessonToolForm.elements.url.value = path;
		lessonToolForm.elements.action.value = toolAssetButton.dataset.assetCategory === "صوت" ? "audio" : "resource";
		if (!lessonToolForm.elements.title.value.trim()) {
			lessonToolForm.elements.title.value = filename.replace(/\.[^.]+$/, "");
		}
		return;
	}
	const deleteButton = event.target.closest("[data-delete-tool]");
	if (!deleteButton) return;
	lessonTools = lessonTools.filter((tool) => tool.id !== deleteButton.dataset.deleteTool);
	saveLessonTools();
	renderLessonTools();
	renderTeacherLessonManager();
});

lessonManagerPanel.addEventListener("change", (event) => {
	if (!isTeacher) return;
	const activeToggle = event.target.closest("[data-tool-active]");
	const gradeInput = event.target.closest("[data-tool-grade]");
	const toolId = activeToggle?.dataset.toolActive || gradeInput?.dataset.toolGrade;
	const tool = lessonTools.find((item) => item.id === toolId);
	if (!tool) return;
	if (activeToggle) tool.active = activeToggle.checked;
	if (gradeInput) {
		if (gradeInput.value !== "" && !gradeInput.validity.valid) {
			gradeInput.focus();
			return;
		}
		tool.grade = gradeInput.value === "" ? "" : Number(gradeInput.value);
	}
	saveLessonTools();
	renderLessonTools();
	renderTeacherLessonManager();
});

activityPanel.addEventListener("click", async (event) => {
	if (event.target.closest(".close-activity")) activityPanel.hidden = true;
	if (event.target.closest("[data-open-student-login]")) openTeacherDialog();
	const recordVoiceButton = event.target.closest("[data-record-voice]");
	if (recordVoiceButton) {
		const form = recordVoiceButton.closest("[data-assignment-submission]");
		const status = form?.querySelector(".voice-record-status");
		if (!form || !status || !activeStudentId || isTeacher) return;
		if (homeworkRecorder?.state === "recording") {
			homeworkRecorder.stop();
			recordVoiceButton.disabled = true;
			recordVoiceButton.textContent = "جارٍ تجهيز التسجيل...";
			return;
		}
		if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
			status.textContent = "التسجيل الصوتي غير مدعوم في هذا المتصفح؛ يمكنك اختيار ملف صوتي بدلاً منه.";
			return;
		}
		recordVoiceButton.disabled = true;
		navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
			const mimeType = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4"].find((type) => MediaRecorder.isTypeSupported(type));
			homeworkRecorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
			homeworkRecordingChunks = [];
			homeworkRecorder.addEventListener("dataavailable", (recordingEvent) => {
				if (recordingEvent.data.size) homeworkRecordingChunks.push(recordingEvent.data);
			});
			homeworkRecorder.addEventListener("stop", () => {
				stream.getTracks().forEach((track) => track.stop());
				const recording = new Blob(homeworkRecordingChunks, { type: homeworkRecorder.mimeType || "audio/webm" });
				const fileInput = form.querySelector('[name="file"]');
				const button = form.querySelector("[data-record-voice]");
				button.disabled = false;
				button.textContent = "إعادة التسجيل";
				if (recording.size > 600 * 1024) {
					status.textContent = "التسجيل تجاوز 600 كيلوبايت. أعد تسجيل مقطع أقصر.";
					return;
				}
				try {
					const extension = recording.type.includes("mp4") ? "m4a" : "webm";
					const file = new File([recording], `voice-homework-${Date.now()}.${extension}`, { type: recording.type });
					const transfer = new DataTransfer();
					transfer.items.add(file);
					fileInput.files = transfer.files;
					if (homeworkVoiceUrl) URL.revokeObjectURL(homeworkVoiceUrl);
					homeworkVoiceUrl = URL.createObjectURL(recording);
					const preview = form.querySelector(".voice-record-preview");
					preview.src = homeworkVoiceUrl;
					preview.hidden = false;
					status.textContent = "تم تجهيز التسجيل. أرسل الواجب لحفظه وإرساله للمعلم.";
				} catch (error) {
					console.error("تعذر إرفاق التسجيل الصوتي:", error);
					status.textContent = `تعذر تجهيز التسجيل: ${error.message}`;
				}
			}, { once: true });
			homeworkRecorder.start();
			recordVoiceButton.disabled = false;
			recordVoiceButton.textContent = "إيقاف التسجيل";
			status.textContent = "يتم التسجيل الآن...";
		}).catch((error) => {
			recordVoiceButton.disabled = false;
			console.error("تعذر بدء تسجيل الواجب الصوتي:", error);
			status.textContent = `تعذر استخدام الميكروفون: ${error.message}`;
		});
		return;
	}
	const requestLateButton = event.target.closest("[data-request-late-submission]");
	if (requestLateButton) {
		if (!activeStudentId || isTeacher) return;
		try {
			const assignmentId = requestLateButton.dataset.requestLateSubmission;
			const requests = JSON.parse(localStorage.getItem("itqan-late-submission-requests-v1") || "{}");
			if (!Array.isArray(requests[activeStudentId])) requests[activeStudentId] = [];
			const existing = requests[activeStudentId].find((item) => item.assignmentId === assignmentId && item.status === "pending");
			if (existing) {
				requestLateButton.nextElementSibling.textContent = "أرسلت طلباً للمعلم، وهو بانتظار المراجعة.";
				requestLateButton.disabled = true;
				return;
			}
			const assignment = Object.values(homeworkAssignmentsByLesson).flat().find((item) => item.id === assignmentId);
			requests[activeStudentId].push({
				id: crypto.randomUUID(),
				assignmentId,
				assignmentTitle: assignment?.title || "واجب",
				createdAt: new Date().toISOString(),
				status: "pending"
			});
			await window.itqanCloud.publishStudentData(activeStudentId, "itqan-late-submission-requests-v1", requests[activeStudentId]);
			localStorage.setItem("itqan-late-submission-requests-v1", JSON.stringify(requests));
			requestLateButton.nextElementSibling.textContent = "تم إرسال طلبك للمعلم.";
			requestLateButton.disabled = true;
		} catch (error) {
			console.error("تعذر إرسال طلب التسليم المتأخر:", error);
			requestLateButton.nextElementSibling.textContent = `تعذر إرسال الطلب: ${error.message}`;
		}
		return;
	}
	const openFileButton = event.target.closest("[data-open-homework-file]");
	if (openFileButton) {
		openHomeworkFileViewer(openFileButton.dataset.fileId, openFileButton.dataset.fileName).catch((error) => {
			window.alert(`تعذرت معاينة الملف: ${error.message}`);
		});
	}
	if (event.target.closest("[data-retry-assessment]")) startQuiz();
	if (event.target.closest("[data-advance-assessment]")) {
		if (quizState.expiresAt && quizState.expiresAt <= Date.now()) {
			completeAssessment(true);
			return;
		}
		if (quizState.questionIndex < quizState.questions.length - 1) {
			quizState.questionIndex += 1;
			persistAssessmentProgress();
			renderQuizQuestion();
		} else completeAssessment();
	}
	const editButton = event.target.closest("[data-edit-assignment]");
	if (editButton && isTeacher) {
		const assignment = homeworkAssignments.find((item) => item.id === editButton.dataset.editAssignment);
		const form = activityPanel.querySelector("#homework-management-form");
		if (!assignment || !form) return;
		form.elements.assignmentId.value = assignment.id;
		form.elements.title.value = assignment.title;
		form.elements.details.value = assignment.details;
		form.elements.active.checked = assignment.active;
		form.elements.dueDate.value = assignment.dueDate || "";
		form.elements.title.focus();
	}
	const deleteButton = event.target.closest("[data-delete-assignment]");
	if (deleteButton && isTeacher) {
		homeworkAssignments = homeworkAssignments.filter((item) => item.id !== deleteButton.dataset.deleteAssignment);
		saveHomeworkAssignments();
		renderHomeworkActivity();
	}
	if (event.target.closest("[data-reset-assignment]") && isTeacher) renderHomeworkActivity();
});

activityPanel.addEventListener("submit", async (event) => {
	const assessmentForm = event.target.closest("#assessment-question-form");
	if (assessmentForm) {
		event.preventDefault();
		if (assessmentForm.dataset.answered === "true") return;
		if (quizState.expiresAt && quizState.expiresAt <= Date.now()) {
			completeAssessment(true);
			return;
		}
		const minimumSeconds = window.lessonInteractions?.minimumTimeRemaining() ?? null;
		if (window.lessonInteractions?.minimumTimeError() || (minimumSeconds !== null && minimumSeconds > 0)) {
			assessmentForm.querySelector("#answer-feedback").textContent = window.lessonInteractions.minimumTimeError() || "انتظر حتى ينتهي الوقت الأدنى الذي حدده المعلم قبل إرسال إجابتك.";
			return;
		}
		const question = quizState.questions[quizState.questionIndex];
		const correct = gradeAssessmentAnswer(question, assessmentForm);
		quizState.responses[quizState.questionIndex] = getAssessmentResponse(question, assessmentForm);
		let analyticsError = "";
		try {
			window.studentFeatures.recordQuizAnswer(quizState.lessonKey, question, correct);
		} catch (error) {
			console.error("تعذر حفظ تحليل إجابة الاختبار:", error);
			analyticsError = " (تعذر حفظ تحليل هذا السؤال.)";
		}
		quizState.score += Number(correct);
		quizState.answers.push(correct);
		assessmentForm.dataset.answered = "true";
		assessmentForm.querySelectorAll("input, select").forEach((input) => { input.disabled = true; });
		persistAssessmentProgress();
		assessmentForm.querySelector("#answer-feedback").textContent = `تم حفظ إجابتك. ستُرسل النتيجة للمعلم عند تسليم الاختبار.${analyticsError}`;
		const button = assessmentForm.querySelector('button[type="submit"]');
		button.type = "button";
		button.dataset.advanceAssessment = "true";
		button.textContent = quizState.questionIndex < quizState.questions.length - 1 ? "السؤال التالي" : "عرض النتيجة";
		return;
	}
	const managerForm = event.target.closest("#homework-management-form");
	if (managerForm) {
		event.preventDefault();
		try {
			await saveHomeworkAssignment(managerForm);
		} catch (error) {
			managerForm.querySelector(".homework-form-error")?.remove();
			managerForm.insertAdjacentHTML("beforeend", `<p class="homework-form-error" role="alert">تعذر حفظ الواجب أو رفع الملف: ${escapeHtml(error.message)}</p>`);
		}
		return;
	}
});

activityPanel.addEventListener("change", (event) => {
	const assignmentToggle = event.target.closest("[data-toggle-assignment]");
	if (assignmentToggle && isTeacher) {
		const assignment = homeworkAssignments.find((item) => item.id === assignmentToggle.dataset.toggleAssignment);
		if (!assignment) return;
		assignment.active = assignmentToggle.checked;
		saveHomeworkAssignments();
		renderHomeworkActivity();
		return;
	}
	const selectedFile = event.target.files?.[0];
	if (!selectedFile) return;

	if (event.target.id === "translation-file") {
		if (translationObjectUrl) URL.revokeObjectURL(translationObjectUrl);
		translationObjectUrl = URL.createObjectURL(selectedFile);
		const preview = activityPanel.querySelector("#translation-preview");
		preview.src = translationObjectUrl;
		preview.hidden = false;
		const openLink = activityPanel.querySelector("#translation-open");
		openLink.href = translationObjectUrl;
		openLink.hidden = false;
	}

	if (event.target.id === "audio-file") {
		if (audioObjectUrl) URL.revokeObjectURL(audioObjectUrl);
		audioObjectUrl = URL.createObjectURL(selectedFile);
		audio.src = audioObjectUrl;
		audio.controls = true;
		audio.hidden = false;
		activityPanel.querySelector(".audio-prompt").hidden = true;
		const status = activityPanel.querySelector(".audio-status");
		status.hidden = false;
		status.append(audio);
		audio.play().catch(() => {});
	}
});

activityPanel.addEventListener("submit", async (event) => {
	const submissionForm = event.target.closest("[data-assignment-submission]");
	if (!submissionForm || isTeacher || !activeStudentId) return;
	event.preventDefault();
	const file = submissionForm.elements.file.files?.[0];
	const status = submissionForm.querySelector(".submission-status");
	if (!file) return;
	if (!(file.type.startsWith("image/") || file.type === "application/pdf" || file.type.startsWith("audio/")) || file.size > 600 * 1024 && !file.type.startsWith("image/")) {
		status.textContent = "اختر صورة أو PDF أو ملفاً صوتياً. تُضغط الصور الكبيرة تلقائياً، ويجب ألا تتجاوز الملفات الأخرى 600 كيلوبايت.";
		return;
	}
	let savedLocally = false;
	try {
		const submissionId = submissionForm.dataset.pendingSubmissionId || crypto.randomUUID();
		submissionForm.dataset.pendingSubmissionId = submissionId;
		status.textContent = "جارٍ رفع الملف، يرجى الانتظار...";
		const upload = await window.itqanCloud.uploadHomeworkFile(file, "submission", submissionId, activeStudentId);
		const submissions = JSON.parse(localStorage.getItem("itqan-homework-submissions-v1")) || [];
		const submission = {
			id: submissionId,
			studentId: activeStudentId,
			assignmentId: submissionForm.dataset.assignmentSubmission,
			lessonKey: currentLessonKey(),
			details: String(new FormData(submissionForm).get("details") || "").trim(),
			fileName: upload.name,
			fileId: upload.fileId,
			submittedAt: new Date().toISOString(),
			status: "pending"
		};
		const existingIndex = submissions.findIndex((item) => item.id === submission.id);
		if (existingIndex >= 0) submissions[existingIndex] = submission;
		else submissions.push(submission);
		localStorage.setItem("itqan-homework-submissions-v1", JSON.stringify(submissions));
		savedLocally = true;
		if (!window.itqanCloud?.submitHomeworkSubmission) throw new Error("الاتصال السحابي غير جاهز؛ حُفظ الحل على هذا الجهاز فقط.");
		await window.itqanCloud.submitHomeworkSubmission(submission);
		let earnedHomeworkBadge = false;
		let achievementSaveError = "";
		try {
			earnedHomeworkBadge = window.studentFeatures?.recordHomeworkSubmission(submission.assignmentId || submission.id) === true;
		} catch (error) {
			console.error("تعذر حفظ تقدم أوسمة الواجبات:", error);
			achievementSaveError = ` تعذر حفظ تقدم الأوسمة: ${error.message}`;
		}
		window.studentFeatures?.recordAuditEvent("إرسال واجب", submission.fileName);
		status.textContent = `تم إرسال الحل عبر الإنترنت، وسيظهر للمعلم في قائمة تسليمات الطلاب.${earnedHomeworkBadge ? " حصلت على وسام إنجاز 200 واجب!" : ""}${achievementSaveError}`;
		delete submissionForm.dataset.pendingSubmissionId;
		submissionForm.reset();
	} catch (error) {
		status.textContent = savedLocally
			? `حُفظ الحل على هذا الجهاز، لكن لم يصل للمعلم: ${error.message} حاول الإرسال مجدداً عند اتصال الإنترنت.`
			: `تعذر حفظ التسليم: ${error.message}`;
	}
});

menuToggle.addEventListener("click", () => setSidebarOpen(!sidebar.classList.contains("is-open")));
sidebarScrim.addEventListener("click", () => setSidebarOpen(false));
portalNavigation.forEach((button) => button.addEventListener("click", () => {
	const page = button.dataset.portalPage;
	if (page === "home") showLessons();
	else showPortalPage(page);
}));
document.querySelector(".brand").addEventListener("click", (event) => {
	event.preventDefault();
	showLessons();
});
document.querySelector("#return-home-from-lesson").addEventListener("click", showLessons);
document.querySelector("#session-nav").addEventListener("click", () => roleToggle.click());
document.addEventListener("click", (event) => {
	const target = event.target.closest("[data-open-current-lesson], [data-open-feature-tab], [data-open-student-login], [data-open-student-reports], [data-toggle-theme], [data-open-portal], [data-open-homework-activity], [data-open-current-assessment]");
	if (!target) return;
	if (target.hasAttribute("data-open-current-lesson")) showLessons();
	else if (target.hasAttribute("data-open-homework-activity")) {
		showLessons();
		renderHomeworkActivity();
	}
	else if (target.hasAttribute("data-open-current-assessment")) {
		showLessons();
		startQuiz();
	}
	else if (target.hasAttribute("data-open-feature-tab")) showFeatures(target.dataset.openFeatureTab);
	else if (target.hasAttribute("data-open-student-login")) openTeacherDialog();
	else if (target.hasAttribute("data-open-student-reports")) showStudentReports();
	else if (target.hasAttribute("data-toggle-theme")) document.querySelector("#theme-toggle").click();
	else if (target.dataset.openPortal === "quizzes") showQuizzes();
});
window.addEventListener("hashchange", () => {
	const route = window.location.hash.slice(1);
	if (route === "home") showLessons();
	else if (portalPages[route]) showPortalPage(route);
	else if (route === "quizzes") showQuizzes();
	else if (route === "library") showLibrary();
	else if (route === "english-game") showEnglishGame();
	else if (route === "reports") showStudentReports();
	else if (route.startsWith("tools-")) showFeatures(route.slice(6));
});
document.addEventListener("keydown", (event) => {
	if (event.key === "Escape") setSidebarOpen(false);
});
teacherDialog.addEventListener("cancel", (event) => event.preventDefault());

reportsNav.addEventListener("click", () => {
	if (!isTeacher) openTeacherDialog();
	else showReports();
});

libraryNav.addEventListener("click", showLibrary);
englishGameNav.addEventListener("click", showEnglishGame);
quizzesNav.addEventListener("click", showQuizzes);
featuresNav.addEventListener("click", () => showFeatures());
librarySearch.addEventListener("input", renderLibrary);
quizLibraryFilters.addEventListener("input", renderQuizLibrary);
quizLibraryFilters.addEventListener("change", renderQuizLibrary);
window.addEventListener("itqan-quiz-results-changed", () => {
	quizResults = loadQuizResults();
	if (!quizzesPage.hidden) renderQuizLibrary();
});
window.addEventListener("itqan-cloud-auth-changed", async (event) => {
	if (event.detail?.isTeacher || !window.itqanCloud?.submitQuizResult) return;
	try {
		await window.itqanCloud.syncReady;
	} catch (error) {
		console.error("تعذرت مزامنة محاولات الاختبار بعد تحميل بيانات المنصة:", error);
		return;
	}
	const localResults = loadQuizResults();
	localResults.forEach((result) => {
		window.itqanCloud.submitQuizResult(result).catch((error) => {
			console.error(`تعذرت إعادة مزامنة نتيجة الاختبار ${result.id}:`, error);
		});
	});
});
window.addEventListener("itqan-quiz-data-cleared", () => {
	quizSettingsByLesson = loadQuizSettings();
	quizAttempts = loadQuizAttempts();
	quizResults = loadQuizResults();
	studentReports = loadStudentReports();
	if (!quizzesPage.hidden) renderQuizLibrary();
});
createQuizButton.addEventListener("click", () => {
	if (!isTeacher) return;
	managedQuizKey = quizCreateLesson.value || currentLessonKey();
	managedQuestionType = "multiple";
	renderQuizLibrary();
	quizManagementPanel.scrollIntoView({ behavior: "smooth", block: "start" });
});
quizScheduleBody.addEventListener("click", (event) => {
	const manageButton = event.target.closest("[data-manage-quiz]");
	if (manageButton && isTeacher) {
		managedQuizKey = manageButton.dataset.manageQuiz;
		managedQuestionType = "multiple";
		renderQuizLibrary();
		quizManagementPanel.scrollIntoView({ behavior: "smooth", block: "start" });
		return;
	}
	const deleteButton = event.target.closest("[data-delete-quiz]");
	if (!deleteButton || !isTeacher) return;
	const quizKey = deleteButton.dataset.deleteQuiz;
	if (!window.confirm("هل تريد حذف الاختبار وإزالة أسئلته التي أضافها المعلم؟ ستبقى النتائج السابقة محفوظة.")) return;
	try {
		delete quizSettingsByLesson[quizKey];
		saveQuizSettings();
		const customQuestions = JSON.parse(localStorage.getItem("itqan-custom-quizzes-v1")) || {};
		delete customQuestions[quizKey];
		persistCourseData("itqan-custom-quizzes-v1", customQuestions);
		if (managedQuizKey === quizKey) managedQuizKey = "";
		renderQuizLibrary();
		quizLibraryStatus.textContent = "تم حذف الاختبار. حُفظت نتائج الطلاب السابقة.";
	} catch (error) {
		quizLibraryStatus.textContent = `تعذر حذف الاختبار: ${error.message}`;
	}
});
quizLibraryGrid.addEventListener("click", (event) => {
	const startButton = event.target.closest("[data-start-quiz]");
	const manageButton = event.target.closest("[data-manage-quiz]");
	if (!startButton && !manageButton) return;
	if (manageButton) {
		if (!isTeacher) return;
		managedQuizKey = manageButton.dataset.manageQuiz;
		managedQuestionType = "multiple";
		renderQuizLibrary();
		quizManagementPanel.scrollIntoView({ behavior: "smooth", block: "start" });
		return;
	}
	const [level, semester, lesson] = startButton.dataset.startQuiz.split("-").map(Number);
	window.itqanApp.openLesson(level, semester, lesson);
	window.itqanApp.openQuiz();
});
activityPanel.addEventListener("click", async (event) => {
	const resendButton = event.target.closest("[data-resend-quiz-result]");
	if (!resendButton || !activeStudentId) return;
	const result = quizResults.find((item) => item.id === resendButton.dataset.resendQuizResult);
	if (!result || !window.itqanCloud?.submitQuizResult) return;
	const status = activityPanel.querySelector("#quiz-result-sync-status");
	resendButton.disabled = true;
	try {
		await window.itqanCloud.submitQuizResult(result);
		status.textContent = "تمت مزامنة النتيجة مع المعلم.";
		resendButton.remove();
	} catch (error) {
		status.textContent = `تعذرت المزامنة: ${error.message}`;
		resendButton.disabled = false;
	}
});
quizManagementPanel.addEventListener("click", (event) => {
	if (event.target.closest("[data-close-quiz-manager]")) {
		managedQuizKey = "";
		renderQuizLibrary();
		return;
	}
	const deleteButton = event.target.closest("[data-delete-managed-question]");
	if (!deleteButton || !isTeacher) return;
	try {
		const questionMap = JSON.parse(localStorage.getItem("itqan-custom-quizzes-v1")) || {};
		const questions = questionMap[deleteButton.dataset.questionKey];
		const index = Number(deleteButton.dataset.deleteManagedQuestion);
		if (!Array.isArray(questions) || !Number.isInteger(index) || !questions[index]) return;
		questions.splice(index, 1);
		questionMap[deleteButton.dataset.questionKey] = questions;
		persistCourseData("itqan-custom-quizzes-v1", questionMap);
		renderQuizLibrary();
	} catch (error) {
		quizLibraryStatus.textContent = `تعذر حذف السؤال: ${error.message}`;
	}
});
quizManagementPanel.addEventListener("change", (event) => {
	if (event.target.matches('#quiz-question-form select[name="type"]')) {
		managedQuestionType = event.target.value;
		const fields = quizManagementPanel.querySelector(".quiz-question-type-fields");
		fields.innerHTML = renderQuizQuestionFields(managedQuestionType);
		return;
	}
	if (event.target.matches('#quiz-settings-form select[name="mode"]')) {
		const linkField = quizManagementPanel.querySelector(".quiz-external-link");
		const urlInput = quizManagementPanel.querySelector('#quiz-settings-form [name="url"]');
		linkField.hidden = !isExternalQuiz(event.target.value);
		urlInput.required = isExternalQuiz(event.target.value);
	}
});
quizManagementPanel.addEventListener("submit", (event) => {
	const settingsForm = event.target.closest("#quiz-settings-form");
	if (settingsForm) {
		event.preventDefault();
		if (!isTeacher) return;
		const data = new FormData(settingsForm);
		const lessonKey = settingsForm.dataset.quizSettings;
		const mode = String(data.get("mode"));
		const url = String(data.get("url") || "").trim();
		const startsAtValue = String(data.get("startsAt") || "");
		const startsAt = startsAtValue ? new Date(startsAtValue).getTime() : 0;
		if (!startsAtValue || !Number.isFinite(startsAt) || !startsAt) {
			settingsForm.elements.startsAt.setCustomValidity("حدد موعد بدء الاختبار لتتم إضافته للطلاب.");
			settingsForm.elements.startsAt.reportValidity();
			settingsForm.elements.startsAt.setCustomValidity("");
			return;
		}
		if (isExternalQuiz(mode) && !/^https:\/\/\S+$/i.test(url)) {
			settingsForm.elements.url.setCustomValidity("أدخل رابطاً آمناً يبدأ بـ https://");
			settingsForm.elements.url.reportValidity();
			settingsForm.elements.url.setCustomValidity("");
			return;
		}
		const previousSettings = quizSettingsByLesson[lessonKey];
		let customQuestions = {};
		try {
			customQuestions = JSON.parse(localStorage.getItem("itqan-custom-quizzes-v1")) || {};
		} catch (error) {
			quizLibraryStatus.textContent = `تعذر قراءة أسئلة الاختبار: ${error.message}`;
			return;
		}
		const internalQuestionCount = (window.lessonQuizData?.[lessonKey]?.length || 0)
			+ (Array.isArray(customQuestions[lessonKey]) ? customQuestions[lessonKey].length : 0);
		if (!isExternalQuiz(mode) && !internalQuestionCount) {
			quizLibraryStatus.textContent = "أضف أسئلة الاختبار أولاً قبل حفظه كاختبار داخلي.";
			return;
		}
		if (!isExternalQuiz(mode) && Number(data.get("questionLimit")) > internalQuestionCount) {
			quizLibraryStatus.textContent = `عدد الأسئلة المطلوب أكبر من الأسئلة المتاحة (${internalQuestionCount}).`;
			settingsForm.elements.questionLimit.focus();
			return;
		}
		quizSettingsByLesson[lessonKey] = {
			title: String(data.get("title")).trim(),
			mode,
			url: isExternalQuiz(mode) ? url : "",
			questionLimit: Number(data.get("questionLimit")),
			durationMinutes: data.get("durationMinutes") ? Number(data.get("durationMinutes")) : "",
			startsAt: startsAtValue,
			allowRetry: settingsForm.elements.allowRetry.checked,
			createdAt: previousSettings?.createdAt || new Date().toISOString()
		};
		try {
			saveQuizSettings();
			quizLibraryStatus.textContent = "تم حفظ الاختبار، وتتم مزامنته مع أجهزة الطلاب.";
			renderQuizLibrary();
		} catch (error) {
			quizLibraryStatus.textContent = `تعذر حفظ إعدادات الاختبار: ${error.message}`;
		}
		return;
	}
	const questionForm = event.target.closest("#quiz-question-form");
	if (!questionForm) return;
	event.preventDefault();
	if (!isTeacher) return;
	const data = new FormData(questionForm);
	const type = String(data.get("type"));
	const question = {
		type,
		prompt: String(data.get("prompt")).trim(),
		hint: String(data.get("hint") || "").trim()
	};
	if (type === "multiple") {
		question.options = [0, 1, 2, 3].map((index) => String(data.get(`option${index}`)).trim());
		question.answer = Number(data.get("answer"));
		if (new Set(question.options).size !== question.options.length) {
			questionForm.elements.option0.setCustomValidity("يجب أن تكون الخيارات الأربعة مختلفة.");
			questionForm.elements.option0.reportValidity();
			questionForm.elements.option0.setCustomValidity("");
			return;
		}
	} else if (type === "trueFalse") {
		question.answer = data.get("answer") === "true";
	} else if (type === "matching") {
		question.pairs = [0, 1, 2].map((index) => ({ left: String(data.get(`left${index}`)).trim(), right: String(data.get(`right${index}`)).trim() }));
		if (new Set(question.pairs.map((pair) => pair.right)).size !== question.pairs.length) {
			questionForm.elements.right0.setCustomValidity("اجعل المعاني مختلفة حتى يمكن مزاوجتها بوضوح.");
			questionForm.elements.right0.reportValidity();
			questionForm.elements.right0.setCustomValidity("");
			return;
		}
	} else if (type === "writing") {
		question.acceptedAnswers = String(data.get("acceptedAnswers")).split(",").map((answer) => answer.trim()).filter(Boolean);
		if (!question.acceptedAnswers.length) return;
	} else if (type === "imageMatching") {
		question.pairs = [0, 1, 2].map((index) => ({ image: String(data.get(`image${index}`)).trim(), text: String(data.get(`text${index}`)).trim() }));
		if (question.pairs.some((pair) => !/^https:\/\/\S+$/i.test(pair.image))) {
			questionForm.elements.image0.setCustomValidity("يجب أن يكون رابط الصورة آمناً ويبدأ بـ https://");
			questionForm.elements.image0.reportValidity();
			questionForm.elements.image0.setCustomValidity("");
			return;
		}
		if (new Set(question.pairs.map((pair) => pair.text)).size !== question.pairs.length) {
			questionForm.elements.text0.setCustomValidity("اجعل النصوص المطابقة مختلفة.");
			questionForm.elements.text0.reportValidity();
			questionForm.elements.text0.setCustomValidity("");
			return;
		}
	} else return;
	try {
		const questionMap = JSON.parse(localStorage.getItem("itqan-custom-quizzes-v1")) || {};
		if (!Array.isArray(questionMap[questionForm.dataset.quizQuestion])) questionMap[questionForm.dataset.quizQuestion] = [];
		questionMap[questionForm.dataset.quizQuestion].push(question);
		persistCourseData("itqan-custom-quizzes-v1", questionMap);
		renderQuizLibrary();
	} catch (error) {
		quizLibraryStatus.textContent = `تعذر حفظ السؤال: ${error.message}`;
	}
});

libraryBookForm.addEventListener("submit", (event) => {
	event.preventDefault();
	if (!isTeacher) return;
	const formData = new FormData(libraryBookForm);
	const id = String(formData.get("bookId") || crypto.randomUUID());
	const existingBook = libraryBooks.find((book) => book.id === id);
	const palette = defaultLibraryBooks[libraryBooks.length % defaultLibraryBooks.length].colors;
	const book = {
		...(existingBook || { id, colors: palette }),
		title: String(formData.get("title")).trim(),
		category: String(formData.get("category")).trim(),
		description: String(formData.get("description")).trim(),
		coverUrl: String(formData.get("coverUrl")).trim(),
		downloadUrl: String(formData.get("downloadUrl")).trim()
	};
	if (existingBook) libraryBooks[libraryBooks.indexOf(existingBook)] = book;
	else libraryBooks.push(book);
	saveLibraryBooks();
	libraryBookForm.reset();
	renderLibrary();
});

libraryManagement.addEventListener("click", (event) => {
	if (!isTeacher) return;
	if (event.target.closest("#reset-library-book-form")) {
		libraryBookForm.reset();
		return;
	}
	const editButton = event.target.closest("[data-edit-library-book]");
	if (editButton) {
		const book = libraryBooks.find((item) => item.id === editButton.dataset.editLibraryBook);
		if (!book) return;
		libraryBookForm.elements.bookId.value = book.id;
		libraryBookForm.elements.title.value = book.title;
		libraryBookForm.elements.category.value = book.category;
		libraryBookForm.elements.description.value = book.description || "";
		libraryBookForm.elements.coverUrl.value = book.coverUrl || "";
		libraryBookForm.elements.downloadUrl.value = book.downloadUrl || "";
		libraryBookForm.elements.title.focus();
		return;
	}
	const deleteButton = event.target.closest("[data-delete-library-book]");
	if (deleteButton) {
		libraryBooks = libraryBooks.filter((book) => book.id !== deleteButton.dataset.deleteLibraryBook);
		saveLibraryBooks();
		renderLibrary();
	}
});

studentReportsNav.addEventListener("click", () => showStudentReports());

studentReportTabs.addEventListener("click", (event) => {
	if (isTeacher) return;
	const categoryButton = event.target.closest("[data-public-category]");
	if (!categoryButton) return;
	activePublicReportCategory = categoryButton.dataset.publicCategory;
	renderPublicReports();
});

roleToggle.addEventListener("click", async () => {
	if (isGuest) {
		isGuest = false;
		updateTeacherControls();
		openTeacherDialog();
		return;
	}
	if (isTeacher || activeStudentId) {
		isGuest = false;
		isTeacher = false;
		activeStudentId = "";
		reportNotice = "";
		studentRoster.innerHTML = "";
		studentReportPanel.innerHTML = `<div class="reports-empty"><span class="empty-mark">↖</span><h2>اختر طالباً لعرض سجله</h2></div>`;
		reportOverview.innerHTML = "";
		showLessons();
		window.dispatchEvent(new Event("itqan-session-changed"));
		try {
			await window.itqanCloud?.signOut();
		} catch (error) {
			console.error("تعذر تسجيل الخروج من Firebase:", error);
			teacherLoginError.textContent = `تعذر تسجيل الخروج: ${error.message}`;
			teacherLoginError.hidden = false;
		}
		openTeacherDialog();
		return;
	}
	openTeacherDialog();
});

document.querySelector("#guest-mode-button").addEventListener("click", () => {
	isTeacher = false;
	activeStudentId = "";
	isGuest = true;
	teacherDialog.close();
	updateTeacherControls();
	renderCurriculum();
	showLessons();
	teacherLoginError.hidden = true;
});

loginRoleInput.addEventListener("change", updateLoginFields);

teacherLoginForm.addEventListener("submit", async (event) => {
	event.preventDefault();
	const submitButton = teacherLoginForm.querySelector('[type="submit"]');
	submitButton.disabled = true;
	teacherLoginError.hidden = true;
	try {
		const cloud = window.itqanCloud;
		if (!cloud) throw new Error("تعذر تحميل خدمة Firebase. حدّث الصفحة وتأكد من اتصال الإنترنت.");
		await cloud.ready;
		if (loginRoleInput.value === "teacher") {
			await cloud.signInTeacher(teacherEmailInput.value.trim(), teacherPasswordInput.value);
			await cloud.syncReady;
			await cloud.clearLessonQuizzesOnce();
			if (await cloud.clearStudentRosterOnce()) {
				students = [];
				activeReportStudentId = "";
				localStorage.setItem(studentListStorageKey, "[]");
				localStorage.setItem(studentNamesStorageKey, "{}");
			}
			const sharedRoster = await cloud.seedStudentsOnce(defaultStudents);
			students = sharedRoster.map((student) => ({
				...student,
				fullName: student.name
			}));
			activeReportStudentId = students[0]?.id || "";
			localStorage.setItem(studentListStorageKey, JSON.stringify(sharedRoster));
			localStorage.setItem(studentNamesStorageKey, JSON.stringify(Object.fromEntries(sharedRoster.map((student) => [student.id, student.name]))));
			isTeacher = true;
			activeStudentId = "";
			isGuest = false;
		} else {
			await cloud.ensureStudentSession();
			await cloud.syncReady;
			const authenticatedStudentId = await cloud.signInStudent(studentCodeInput.value);
			const authenticatedStudent = students.find((item) => item.id === authenticatedStudentId);
			if (!authenticatedStudent) throw new Error("سجل الطالب غير موجود في قائمة المنصة. تواصل مع المعلم.");
			isTeacher = false;
			activeStudentId = authenticatedStudent.id;
			isGuest = false;
			await cloud.activateStudent(authenticatedStudent.id);
			studentReports = loadStudentReports();
			quizAttempts = loadQuizAttempts();
		}
		teacherDialog.close();
		updateTeacherControls();
		renderCurriculum();
		window.dispatchEvent(new Event("itqan-session-changed"));
		if (isTeacher) showReports();
		else showStudentReports();
	} catch (error) {
		console.error("تعذر تسجيل الدخول:", error);
		const authErrors = {
			"auth/invalid-credential": "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
			"auth/invalid-email": "أدخل بريداً إلكترونياً صالحاً.",
			"auth/unauthorized-domain": "أضف نطاق GitHub Pages إلى النطاقات المصرّح بها في Firebase Authentication.",
			"auth/network-request-failed": "تعذر الاتصال بـ Firebase. تحقق من الإنترنت وإعداد النطاقات المصرّح بها.",
			"auth/invalid-api-key": "إعداد Firebase API Key غير صالح.",
			"auth/operation-not-allowed": "فعّل Email/Password في Firebase Authentication.",
			"auth/admin-restricted-operation": "فعّل Email/Password من Firebase Authentication → Sign-in method.",
			"auth/user-disabled": "هذا الحساب معطّل في Firebase Authentication.",
			"auth/too-many-requests": "تم إيقاف محاولات الدخول مؤقتاً؛ حاول لاحقاً."
		};
		teacherLoginError.textContent = error.code === "auth/operation-not-allowed"
			? "فعّل Anonymous للطلاب وEmail/Password للمعلم من Firebase Authentication."
			: authErrors[error.code] || error.message || "تعذر تسجيل الدخول.";
		teacherLoginError.hidden = false;
	}
	submitButton.disabled = false;
});

window.itqanApp = {
	get isTeacher() { return isTeacher; },
	get isGuest() { return isGuest; },
	get activeStudentId() { return activeStudentId; },
	get activeLesson() { return { ...activeLesson }; },
	get students() { return students.map((student) => ({ ...student })); },
	get reports() { return studentReports; },
	getStageGrade,
	get quizAttempts() { return quizAttempts; },
	get quizResults() { return quizResults; },
	get libraryBooks() { return libraryBooks; },
	get currentLessonKey() { return currentLessonKey(); },
	getOfflineResources() {
		const paths = getLessonAssetPaths();
		return [paths.lesson, paths.dictionary, paths.activityBook, paths.audioOne, paths.audioTwo].filter(Boolean);
	},
	openLesson(level, semester = 0, lesson = 0) {
		activeLesson = { level, semester, lesson };
		updateLesson();
	},
	openLibrary: showLibrary,
	openFeatures: showFeatures,
	openQuiz: startQuiz,
	openLessonActivity: showActivity,
	previewHomeworkFile: openHomeworkFileViewer,
	async reviewHomeworkSubmission(submissionId, score, teacherComment) {
		if (!isTeacher) throw new Error("صلاحية المعلم مطلوبة لمراجعة التسليم.");
		const submissions = JSON.parse(localStorage.getItem("itqan-homework-submissions-v1")) || [];
		const submission = submissions.find((item) => item.id === submissionId);
		if (!submission) throw new Error("تعذر العثور على تسليم الواجب.");
		const numericScore = Number(score);
		if (!Number.isFinite(numericScore) || numericScore < 0 || numericScore > 2) throw new Error("الدرجة يجب أن تكون بين 0 و2.");
		const student = students.find((item) => item.id === submission.studentId);
		if (!student) throw new Error("الطالب المرتبط بالتسليم غير موجود.");
		const reviewedAt = new Date().toISOString();
		if (window.itqanCloud?.updateHomeworkSubmission) {
			await window.itqanCloud.updateHomeworkSubmission(submission.id, { status: "reviewed", reviewedAt });
		}
		const [level, semester, lessonIndex] = submission.lessonKey.split("-").map(Number);
		const assignment = Object.values(homeworkAssignmentsByLesson).flat().find((item) => item.id === submission.assignmentId);
		const report = getStudentReport(student.id);
		report.homework.push({
			id: submission.id,
			date: new Date(submission.submittedAt).toLocaleDateString("ar"),
			lesson: getLessonNames(level, semester)[lessonIndex] || "واجب",
			level,
			semester,
			lessonIndex,
			title: assignment?.title || "واجب مُرسل",
			details: submission.details || `تم إرفاق الملف ${submission.fileName}`,
			status: "تم التسليم",
			score: numericScore,
			teacherComment: String(teacherComment || "").trim()
		});
		submission.status = "reviewed";
		submission.reviewedAt = reviewedAt;
		localStorage.setItem("itqan-homework-submissions-v1", JSON.stringify(submissions));
		updateStageSuccess(student.id);
		saveStudentReports(true);
		window.dispatchEvent(new Event("itqan-data-changed"));
	},
	async respondToLateSubmission(studentId, requestId, decision) {
		if (!isTeacher) throw new Error("صلاحية المعلم مطلوبة لمراجعة طلب التسليم المتأخر.");
		if (!["approved", "rejected"].includes(decision)) throw new Error("قرار طلب التسليم غير صالح.");
		const storageKey = "itqan-late-submission-requests-v1";
		const requestsByStudent = JSON.parse(localStorage.getItem(storageKey) || "{}");
		const studentRequests = requestsByStudent[studentId];
		const request = Array.isArray(studentRequests) && studentRequests.find((item) => item.id === requestId);
		if (!request || request.status !== "pending") throw new Error("لم يعد طلب التسليم المعلق متاحاً.");
		const student = students.find((item) => item.id === studentId);
		if (!student) throw new Error("الطالب المرتبط بالطلب غير موجود.");
		if (decision === "approved") {
			const updatedAssignments = JSON.parse(JSON.stringify(homeworkAssignmentsByLesson));
			const assignment = Object.values(updatedAssignments).flat().find((item) => item.id === request.assignmentId);
			if (!assignment) throw new Error("تعذر العثور على الواجب المطلوب.");
			if (!Array.isArray(assignment.lateAllowedStudentIds)) assignment.lateAllowedStudentIds = [];
			if (!assignment.lateAllowedStudentIds.includes(studentId)) assignment.lateAllowedStudentIds.push(studentId);
			const serializedAssignments = JSON.stringify(updatedAssignments);
			if (!await window.itqanCloud.publish(homeworkAssignmentsKey, serializedAssignments)) throw new Error("تعذرت مزامنة السماح مع أجهزة الطلاب؛ تحقق من الاتصال والقواعد.");
			homeworkAssignmentsByLesson = updatedAssignments;
			homeworkAssignments = getLessonHomeworkAssignments(currentLessonKey());
			localStorage.setItem(homeworkAssignmentsKey, serializedAssignments);
		}
		request.status = decision;
		request.reviewedAt = new Date().toISOString();
		await window.itqanCloud.publishStudentData(studentId, storageKey, studentRequests);
		localStorage.setItem(storageKey, JSON.stringify(requestsByStudent));
		window.dispatchEvent(new CustomEvent("itqan-student-data-changed", { detail: { studentId, key: storageKey } }));
	}
};

window.addEventListener("itqan-cloud-status", (event) => {
	const { kind, message } = event.detail || {};
	if (!cloudSyncStatus) return;
	cloudSyncStatus.textContent = message || "";
	cloudSyncStatus.hidden = !message;
	cloudSyncStatus.classList.toggle("is-error", kind === "error");
});

window.addEventListener("itqan-cloud-auth-changed", (event) => {
	if (event.detail?.isTeacher) {
		if (isTeacher) return;
		isTeacher = true;
		activeStudentId = "";
	} else {
		if (!isTeacher) return;
		isTeacher = false;
		activeStudentId = "";
	}
	if (teacherDialog.open) teacherDialog.close();
	updateTeacherControls();
	renderCurriculum();
	window.dispatchEvent(new Event("itqan-session-changed"));
	if (isLessonCodePageOpen) openLessonCodePage(activeLesson.level, activeLesson.semester, activeLesson.lesson);
	else if (isTeacher) showReports();
	else showLessons();
});

window.addEventListener("itqan-cloud-data-changed", async (event) => {
	if (event.detail?.key === "itqan-teacher-notifications-v1") {
		window.dispatchEvent(new Event("itqan-notifications-changed"));
	}
	if (event.detail?.key === "itqan-attendance-v1" && !featuresPage.hidden) window.dispatchEvent(new Event("itqan-data-changed"));
	if (event.detail?.key === studentListStorageKey) {
		try {
			const sharedRoster = JSON.parse(localStorage.getItem(studentListStorageKey)) || [];
			students = sharedRoster;
			localStorage.setItem(studentListStorageKey, JSON.stringify(sharedRoster));
			localStorage.setItem(studentNamesStorageKey, JSON.stringify(Object.fromEntries(sharedRoster.map((student) => [student.id, student.name]))));
		} catch (error) {
			console.error("تعذر تحديث أسماء الطلاب المشتركة:", error);
			return;
		}
	}
	if (event.detail?.key !== studentListStorageKey) students = loadStudents();
	if (!students.some((student) => student.id === activeReportStudentId)) activeReportStudentId = students[0]?.id || "";
	if (activeStudentId && !students.some((student) => student.id === activeStudentId)) {
		activeStudentId = "";
		teacherLoginError.textContent = "لم يعد حساب الطالب مرتبطاً بالقائمة. تواصل مع المعلم.";
		teacherLoginError.hidden = false;
		if (!teacherDialog.open) teacherDialog.showModal();
	}
	lessonToolsByLesson = loadLessonTools();
	lessonBookOverrides = loadLessonBooks();
	homeworkAssignmentsByLesson = loadHomeworkAssignments();
	homeworkAssignments = getLessonHomeworkAssignments(currentLessonKey());
	lessonTools = getLessonTools(currentLessonKey());
	lessonAccess = loadLessonAccess();
	quizSettingsByLesson = loadQuizSettings();
	libraryBooks = loadLibraryBooks();
	renderLessonBook(getLessonAssetPaths().lesson);
	renderLessonTools();
	renderCurriculum();
	renderStudentNavigation();
	if (isTeacher && !reportsPage.hidden) renderReportsPage();
	if (isTeacher) renderTeacherLessonManager();
	if (!activityPanel.hidden && activityPanel.querySelector(".homework-assignment-list")) renderHomeworkActivity();
	renderLibrary();
	renderQuizLibrary();
	window.dispatchEvent(new Event("itqan-data-changed"));
});

window.addEventListener("itqan-student-data-changed", (event) => {
	if (event.detail?.key === storageKey) studentReports = loadStudentReports();
	if (event.detail?.key === quizAttemptsKey) quizAttempts = loadQuizAttempts();
	renderCurriculum();
	window.dispatchEvent(new Event("itqan-data-changed"));
});

updateTeacherControls();
updateLesson();
if (initialLessonCodeRoute) openLessonCodePage(activeLesson.level, activeLesson.semester, activeLesson.lesson);
else if (portalPages[initialPortalPage]) showPortalPage(initialPortalPage);
renderLibrary();
document.addEventListener("DOMContentLoaded", restoreLoginSession, { once: true });
