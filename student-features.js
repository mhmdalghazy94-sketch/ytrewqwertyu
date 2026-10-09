(() => {
	const featureContent = document.querySelector("#features-content");
	const featureTabs = document.querySelector("#feature-tabs");
	const featuresNav = document.querySelector("#features-nav");
	const featuresPage = document.querySelector("#features-page");
	const globalSearch = document.querySelector("#global-search");
	const searchResults = document.querySelector("#global-search-results");
	const notificationBell = document.querySelector("#notification-bell");
	const notificationBadge = document.querySelector("#notification-bell-badge");
	const notificationPopover = document.querySelector("#notification-popover");
	const featureNames = {
		dashboard: "لوحة المتابعة",
		cards: "بطاقات المفردات",
		teacher: "إدارة الأنشطة",
		notifications: "الإشعارات",
		analytics: "تحليل الأداء",
		reminders: "التذكيرات والتصدير",
		groups: "مجموعات الدراسة",
		classroom: "أدوات الصف",
		appearance: "الهوية والمظهر"
	};
	const categories = [
		["homework", "الواجبات"],
		["participation", "المشاركات"],
		["recitation", "تسميع الكلمات"],
		["activityBook", "كتاب النشاط"],
		["quizzes", "الاختبارات"]
	];
	const featureStorage = {
		analytics: "itqan-question-analytics-v1",
		reviews: "itqan-homework-submissions-v1",
		homeworkAchievements: "itqan-homework-achievements-v1",
		gameAchievements: "itqan-game-achievements-v1",
		reminders: "itqan-reminders-v1",
		flashcards: "itqan-flashcard-progress-v1",
		activityDays: "itqan-learning-days-v1",
		fontScale: "itqan-accessibility-font-v1",
		contrast: "itqan-accessibility-contrast-v1"
	};
	const teacherNotificationsKey = "itqan-teacher-notifications-v1";
	const studentSyncKeys = new Set([
		featureStorage.analytics,
		featureStorage.homeworkAchievements,
		featureStorage.gameAchievements,
		featureStorage.reminders,
		featureStorage.flashcards,
		featureStorage.activityDays,
		"itqan-notification-read-state-v1",
		"itqan-assignment-reminder-state-v1",
		"itqan-audit-log-v1",
		"itqan-lesson-question-answers-v1",
		"itqan-lesson-understanding-v1",
		"itqan-lesson-notes-v1"
	]);
	let activeTab = "dashboard";
	let flashcardDeck = [];
	let flashcardIndex = 0;
	let flashcardRevealed = false;
	let dueReminderTimer = 0;
	let installPrompt = null;
	let notificationStatus = "";
	let submissionSearch = "";
	let submissionFilter = "pending";
	let whiteboardDrawing = false;

	function escapeHtml(value) {
		return String(value).replace(/[&<>"']/g, (character) => ({
			"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
		})[character]);
	}

	function localDateKey(date = new Date()) {
		return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
	}

	function getStored(key, fallback) {
		try {
			const stored = localStorage.getItem(key);
			return stored === null ? fallback : JSON.parse(stored);
		} catch (error) {
			console.error(`تعذر قراءة ${key}:`, error);
			return fallback;
		}
	}

	function setStored(key, value) {
		try {
			if (window.itqanApp.isGuest) throw new Error("وضع الزائر للعرض فقط.");
			localStorage.setItem(key, JSON.stringify(value));
			if (window.itqanApp.isTeacher && [teacherNotificationsKey, "itqan-attendance-v1", "itqan-study-groups-v1", "itqan-theme-settings-v1"].includes(key)) {
				window.itqanCloud?.publish(key, JSON.stringify(value)).then((synced) => {
					if (!synced) console.error(`لم تتم مزامنة ${key}.`);
				});
			} else if (!window.itqanApp.isTeacher && window.itqanApp.activeStudentId && studentSyncKeys.has(key)) {
				const studentId = window.itqanApp.activeStudentId;
				const studentValue = key === featureStorage.reminders ? value : value?.[studentId];
				if (studentValue !== undefined) window.itqanCloud?.publishStudentData(studentId, key, studentValue).catch((error) => {
					console.error(`تعذرت مزامنة بيانات الطالب ${key}:`, error);
					window.dispatchEvent(new CustomEvent("itqan-cloud-status", { detail: { kind: "error", message: `تعذرت مزامنة بيانات التقدم: ${error.message}` } }));
				});
			}
			return true;
		} catch (error) {
			console.error(`تعذر حفظ ${key}:`, error);
			return false;
		}
	}

	function activeStudent() {
		return window.itqanApp.students.find((student) => student.id === window.itqanApp.activeStudentId);
	}

	function getStudentReport(studentId) {
		const report = window.itqanApp.reports[studentId] || {};
		return Object.fromEntries(categories.map(([key]) => [key, Array.isArray(report[key]) ? report[key] : []]));
	}

	function allStudentRecords(report) {
		return Object.values(report).flat();
	}

	function getQuizSummary(report) {
		const quizzes = report.quizzes;
		const average = quizzes.length ? Math.round(quizzes.reduce((sum, record) => sum + Number(record.score || 0), 0) / quizzes.length) : 0;
		const best = quizzes.length ? Math.max(...quizzes.map((record) => Number(record.score || 0))) : 0;
		return { count: quizzes.length, average, best };
	}

	function recordStudyDay(studentId) {
		const days = getStored(featureStorage.activityDays, {});
		if (!Array.isArray(days[studentId])) days[studentId] = [];
		const date = new Date();
		const today = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
		if (!days[studentId].includes(today)) {
			days[studentId].push(today);
			days[studentId] = days[studentId].slice(-365);
			setStored(featureStorage.activityDays, days);
		}
	}

	function getStreak(studentId) {
		const days = new Set(getStored(featureStorage.activityDays, {})[studentId] || []);
		const current = new Date();
		let streak = 0;
		for (let offset = 0; offset < 365; offset += 1) {
			const date = new Date(current);
			date.setDate(current.getDate() - offset);
			const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
			if (!days.has(key)) {
				if (offset === 0) continue;
				break;
			}
			streak += 1;
		}
		return streak;
	}

	function buildAchievements(report, summary, streak, student) {
		const total = allStudentRecords(report).length;
		const reviewedHomework = report.homework.filter((item) => Number.isFinite(Number(item.score)));
		const onTimeHomework = report.homework.filter((item) => item.onTime === true).length;
		const stages = [
			["المرحلة التمهيدية", 1000, 50],
			["المرحلة الابتدائية", 1500, 60],
			["المرحلة المتوسطة", 2100, 250],
			["المرحلة الثانوية", 3200, 410],
			["المرحلة الجامعية", 5000, 910]
		];
		const achievements = [
			{ title: "البداية الموفقة", description: "أكمل أول نشاط تعليمي", unlocked: total > 0, mark: "✓" },
			{ title: "عشر خطوات", description: "أكمل 10 أنشطة أو اختبارات", unlocked: total >= 10, mark: "10" },
			{ title: "متقن الاختبارات", description: "احصل على 80% في اختبار", unlocked: summary.best >= 80, mark: "★" },
			{ title: "ثلاثة أيام متتالية", description: "تعلّم ثلاثة أيام متتابعة", unlocked: streak >= 3, mark: "3" },
			{ title: "سريع التسليم", description: "سلّم ثلاثة واجبات قبل الموعد", unlocked: onTimeHomework >= 3, mark: "⏱" },
			{ title: "المتلتزم المبدع", description: "أكمل خمسة واجبات وراجعها المعلم", unlocked: reviewedHomework.length >= 5, mark: "✦" },
			...stages.flatMap(([name, points, homeworkCount], level) => {
				const grade = window.itqanApp.getStageGrade(student.id, level);
				const stageHomeworkCount = report.homework.filter((item) => Number(item.level ?? 0) === level).length;
				return [
					{
						title: `الدرجة الكاملة · ${name}`,
						description: `احصل على ${points} من ${points} في ${name}`,
						unlocked: grade.earned >= points,
						mark: "medal",
						attribution: { href: "https://www.flaticon.com/free-icons/medal", creator: "Vectors Market" }
					},
					{
						title: `إنجاز الواجبات · ${name}`,
						description: `أكمل ${homeworkCount} واجباً في ${name}`,
						unlocked: stageHomeworkCount >= homeworkCount,
						mark: "medal",
						attribution: { href: "https://www.flaticon.com/free-icons/medal", creator: "Magnific" }
					}
				];
			}),
			{
				title: "بطل الأسئلة",
				description: "أكمل جولة من 160 سؤالاً دون أي خطأ",
				unlocked: Boolean(getStored(featureStorage.gameAchievements, {})[student.id]?.perfect160),
				mark: "award",
				attribution: { href: "https://www.flaticon.com/free-icons/award", creator: "Magnific" }
			}
		];
		return achievements;
	}

	function renderAchievementMark(mark) {
		if (mark !== "medal" && mark !== "award") return escapeHtml(mark);
		const ribbon = mark === "medal"
			? '<path d="M8 2h4l-1 5-2-1-2 1zM16 2h4l-1 5-2-1-2 1z"/>'
			: '<path d="m12 2 2.2 4.5 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7z"/>';
		return `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="11" r="6.5"/><path d="m9 16-1 6 4-2 4 2-1-6"/><path class="achievement-icon-detail" d="m12 7 1.2 2.5 2.8.4-2 1.9.5 2.8-2.5-1.3-2.5 1.3.5-2.8-2-1.9 2.8-.4z"/>${ribbon}</svg>`;
	}

	function renderAchievementCard(item) {
		const attribution = item.attribution
			? `<a class="achievement-attribution" href="${item.attribution.href}" target="_blank" rel="noopener noreferrer">مرجع Flaticon: ${item.attribution.creator}</a>`
			: "";
		return `<article class="achievement-card ${item.unlocked ? "is-unlocked" : ""}"><span>${item.unlocked ? renderAchievementMark(item.mark) : "·"}</span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.description)}</small>${attribution}</article>`;
	}

	function renderDashboard() {
		const student = activeStudent();
		if (!student) {
			const classCount = window.itqanApp.students.length;
			featureContent.innerHTML = `<div class="feature-empty"><span class="empty-mark">✦</span><h2>سجّل الدخول لعرض لوحة الطالب</h2><p>تُزامن بيانات التقدم والاختبارات مع Firebase عند الاتصال بالإنترنت.</p><button class="save-report-button" type="button" data-open-feature-login>دخول الطالب</button>${window.itqanApp.isTeacher ? `<p>أنت في وضع المعلم؛ عدد الطلاب المسجلين: ${classCount}.</p>` : ""}</div>`;
			return;
		}
		const report = getStudentReport(student.id);
		const summary = getQuizSummary(report);
		const recordCount = allStudentRecords(report).length;
		const points = recordCount * 10 + report.quizzes.reduce((total, quiz) => total + Math.max(0, Number(quiz.score) || 0), 0);
		const streak = getStreak(student.id);
		const achievements = buildAchievements(report, summary, streak, student);
		const groupMarkup = renderStudyGroups();
		const announcements = (getStored(teacherNotificationsKey, {})[student.id] || [])
			.filter((item) => item.type === "announcement")
			.sort((left, right) => right.createdAt.localeCompare(left.createdAt))
			.slice(0, 3);
		const lesson = window.itqanApp.activeLesson;
		const currentLesson = `${["التمهيدية", "الابتدائية", "المتوسطة", "الثانوية", "الجامعية"][lesson.level] || "الدراسية"} · الدرس ${lesson.lesson + 1}`;
		const resumableAttempt = Object.entries(window.itqanApp.quizAttempts[student.id] || {}).find(([, attempt]) => attempt.inProgress);
		const inProgress = resumableAttempt?.[1].inProgress;
		const weakQuiz = report.quizzes.filter((record) => Number(record.score) < 70).sort((left, right) => Number(left.score) - Number(right.score))[0];
		const recommendation = inProgress
			? { ...Object.fromEntries(resumableAttempt[0].split("-").map((value, index) => [["level", "semester", "lesson"][index], Number(value)])), title: "اختبار لم يكتمل" }
			: weakQuiz
			? { level: Number(weakQuiz.level || 0), semester: Number(weakQuiz.semester || 0), lesson: Number(weakQuiz.lessonIndex || 0), title: `${weakQuiz.lesson || "درس سابق"} · مراجعة موصى بها` }
			: { ...lesson, title: currentLesson };
		const nextMistake = Object.entries(getStored(featureStorage.analytics, {})[student.id] || {})
			.filter(([, value]) => value.incorrect > 0)
			.sort((left, right) => right[1].incorrect - left[1].incorrect)[0];
		const categoryCards = categories.map(([id, label]) => `<div class="overview-item"><span class="overview-label">${label}</span><strong>${report[id].length}</strong><span class="overview-caption">نشاط</span></div>`).join("");
		featureContent.innerHTML = `
			<section class="dashboard-welcome"><div><span class="eyebrow">مرحباً ${escapeHtml(student.fullName || student.name)}</span><h2>خطوة صغيرة كل يوم تصنع فرقاً.</h2><p>تابع إنجازك واختر نشاطك التالي.</p></div><div class="dashboard-streak"><strong>${points}</strong><span>نقطة تعليمية</span></div><div class="dashboard-streak"><strong>${streak}</strong><span>أيام تعلّم متتابعة</span></div></section>
			<div class="report-overview feature-overview">${categoryCards}<div class="overview-item"><span class="overview-label">متوسط الاختبارات</span><strong>${summary.average}%</strong><span class="overview-caption">${summary.count} اختبار</span></div></div>
			<div class="feature-columns">
				<section class="feature-card"><span class="eyebrow">متابعة التعلّم</span><h3>ملخص التقدّم</h3><p>لديك ${recordCount} سجلاً تعليمياً، وأعلى نتيجة اختبار ${summary.best}%.</p><div class="feature-progress"><span style="width:${summary.average}%"></span></div><button class="text-button" type="button" data-open-student-reports>عرض التقارير والدرجات</button></section>
				<section class="feature-card"><span class="eyebrow">الخطوة التالية</span><h3>${escapeHtml(recommendation.title)}</h3><p>${inProgress ? "لديك اختبار قيد التقدم؛ يمكنك استكماله من حيث توقفت." : weakQuiz ? "اقترحنا هذا الدرس لمراجعة نتيجة تحتاج إلى تعزيز." : "تابع درس اليوم واختبر فهمك."}</p><button class="save-report-button" type="button" data-continue-learning data-level="${recommendation.level}" data-semester="${recommendation.semester}" data-lesson="${recommendation.lesson}">${inProgress ? "استكمال الاختبار" : weakQuiz ? "مراجعة الدرس" : "متابعة الدرس"}</button></section>
			</div>
			<section class="feature-card"><div class="feature-section-heading"><div><span class="eyebrow">إنجازاتك</span><h3>الشارات</h3></div><span>${achievements.filter((item) => item.unlocked).length} من ${achievements.length}</span></div><div class="achievement-grid">${achievements.map(renderAchievementCard).join("")}</div></section>
			${groupMarkup}
			<section class="feature-card"><div class="feature-section-heading"><div><span class="eyebrow">لوحة الإعلانات</span><h3>إعلانات المعلم</h3></div><button class="text-button" type="button" data-feature-tab="notifications">كل الإشعارات</button></div>${announcements.length ? announcements.map((item) => `<article class="student-notification"><time>${new Date(item.createdAt).toLocaleString("ar")}</time><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.message)}</p></article>`).join("") : `<p class="offline-status">لا توجد إعلانات جديدة.</p>`}</section>
			<section class="feature-card"><div class="feature-section-heading"><div><span class="eyebrow">مراجعة موجهة</span><h3>نقطة تستحق التدريب</h3></div></div>${nextMistake ? `<p>راجع السؤال: <strong>${escapeHtml(nextMistake[0])}</strong>، فقد تكرر فيه الخطأ.</p>` : `<p>أجب عن بعض الأسئلة لتظهر لك الموضوعات التي قد تحتاج إلى مراجعة.</p>`}<button class="text-button" type="button" data-feature-tab="cards">ابدأ مراجعة المفردات</button></section>`;
	}

	function getVocabularyCards() {
		return (window.englishQuestionBank || [])
			.filter((question) => question.category === "vocabulary")
			.map((question) => ({ front: question.prompt, back: question.options[question.answer] }));
	}

	function renderFlashcards() {
		const cards = getVocabularyCards();
		if (!flashcardDeck.length) {
			flashcardDeck = cards.map((_, index) => index);
			for (let index = flashcardDeck.length - 1; index > 0; index -= 1) {
				const randomIndex = Math.floor(Math.random() * (index + 1));
				[flashcardDeck[index], flashcardDeck[randomIndex]] = [flashcardDeck[randomIndex], flashcardDeck[index]];
			}
		}
		if (!cards.length) {
			featureContent.innerHTML = `<div class="feature-empty"><h2>لا توجد بطاقات مفردات</h2></div>`;
			return;
		}
		const card = cards[flashcardDeck[flashcardIndex % flashcardDeck.length]];
		const progress = getStored(featureStorage.flashcards, {});
		const studentId = window.itqanApp.activeStudentId;
		const studiedCount = studentId ? progress[studentId]?.known?.length || 0 : 0;
		featureContent.innerHTML = `<section class="flashcard-workspace"><div class="feature-section-heading"><div><span class="eyebrow">مفردات الإنجليزية</span><h2>بطاقات تفاعلية</h2></div><span>${flashcardIndex + 1} / ${flashcardDeck.length} · أتقنت ${studiedCount}</span></div><button class="flashcard ${flashcardRevealed ? "is-revealed" : ""}" type="button" id="flashcard-reveal" aria-label="${flashcardRevealed ? "إخفاء المعنى" : "إظهار المعنى"}"><span>${flashcardRevealed ? "المعنى" : "السؤال"}</span><strong>${escapeHtml(flashcardRevealed ? card.back : card.front)}</strong><small>${flashcardRevealed ? "اضغط لإخفاء الإجابة" : "اضغط لإظهار الإجابة"}</small></button><div class="flashcard-controls">${flashcardRevealed && studentId ? `<button class="save-report-button" type="button" data-card-rating="known">أعرفها</button><button class="text-button" type="button" data-card-rating="review">أراجعها لاحقاً</button>` : ""}<button class="text-button" type="button" data-card-speak>استمع للنطق</button><button class="text-button" type="button" data-card-next>بطاقة أخرى</button></div>${!studentId ? `<p class="offline-status">سجّل الدخول لحفظ الكلمات التي أتقنتها.</p>` : ""}</section>`;
	}

	function renderTeacherTools() {
		if (!window.itqanApp.isTeacher) {
			featureContent.innerHTML = `<div class="feature-empty"><h2>هذه الأدوات متاحة للمعلم</h2><button class="save-report-button" type="button" data-open-feature-login>دخول المعلم</button></div>`;
			return;
		}
		featureContent.innerHTML = `
			${renderTeacherDashboard()}
			<section class="feature-card"><div class="feature-section-heading"><div><span class="eyebrow">مراجعة الواجبات</span><h2>تسليمات الطلاب</h2></div><button class="text-button" type="button" data-open-lesson-management>إدارة واجبات الدرس</button></div>${renderHomeworkSubmissions()}</section>
			<section class="feature-card"><span class="eyebrow">إدارة الاختبارات</span><h2>إعداد الاختبار وبنك أسئلته</h2><p>حدّد نوع الاختبار ورابطه أو موعده ومدته وعدد الأسئلة، وأنشئ الأسئلة وأضف التلميحات.</p><button class="save-report-button" type="button" data-open-quiz-management>فتح إدارة الاختبارات</button></section>`;
	}

	function notificationTypeLabel(type) {
		return ({
			homework: "واجب جديد",
			test: "اختبار جديد",
			announcement: "إعلان",
			"teacher-absence": "عدم حضور المعلم"
		})[type] || "إشعار من المعلم";
	}

	function renderNotifications() {
		const notificationMap = getStored(teacherNotificationsKey, {});
		if (window.itqanApp.isTeacher) {
			const sentById = new Map();
			Object.entries(notificationMap).forEach(([studentId, items]) => {
				(Array.isArray(items) ? items : []).forEach((item) => {
					const sentItem = sentById.get(item.id) || { ...item, recipients: [], readCount: 0 };
					sentItem.recipients.push(studentId);
					if (item.read) sentItem.readCount += 1;
					sentById.set(item.id, sentItem);
				});
			});
			const sent = [...sentById.values()].sort((left, right) => right.createdAt.localeCompare(left.createdAt));
			featureContent.innerHTML = `
				<section class="feature-card">
					<span class="eyebrow">تواصل مع الطلاب</span><h2>إرسال إشعار</h2>
					<p>اختر سبب الإشعار، ثم اكتب التفاصيل للطلاب. سيظهر الإشعار في صندوقهم على هذا الجهاز.</p>
					<p class="offline-status">تُزامن الإشعارات إلى أجهزة الطلاب عبر Firebase.</p>
					<form class="feature-form" id="teacher-notification-form">
						<label class="field-label">نوع الرسالة<select name="type" required><option value="announcement">إعلان يظهر في لوحة الطالب</option><option value="homework">نزول واجب</option><option value="test">نزول اختبار</option><option value="teacher-absence">عدم حضور المعلم</option></select></label>
						<label class="field-label">عنوان الإشعار<input name="title" required maxlength="100" placeholder="مثال: واجب الدرس الثاني"></label>
						<label class="field-label">التفاصيل<textarea name="message" required maxlength="500" rows="3" placeholder="اكتب التعليمات أو موعد الواجب أو الاختبار"></textarea></label>
						<label class="field-label">المستلمون<select name="recipient"><option value="all">كل الطلاب</option>${window.itqanApp.students.map((student) => `<option value="${escapeHtml(student.id)}">${escapeHtml(student.fullName || student.name)}</option>`).join("")}</select></label>
						<button class="save-report-button" type="submit">إرسال الإشعار</button>
						<p class="lesson-feature-status" id="notification-form-status" role="status">${escapeHtml(notificationStatus)}</p>
					</form>
				</section>
				<section class="feature-card"><span class="eyebrow">سجل الإرسال</span><h2>الإشعارات المرسلة</h2>${sent.length ? `<div class="teacher-notification-history">${sent.slice(0, 30).map((item) => `<article class="teacher-notification-item"><div><strong>${escapeHtml(item.title)}</strong><small>${notificationTypeLabel(item.type)} · ${new Date(item.createdAt).toLocaleString("ar")}</small><p>${escapeHtml(item.message)}</p></div><span>${item.readCount} من ${item.recipients.length} قرأوا</span></article>`).join("")}</div>` : `<p class="offline-status">لم ترسل إشعارات بعد.</p>`}</section>`;
			return;
		}

		const student = activeStudent();
		if (!student) {
			featureContent.innerHTML = `<div class="feature-empty"><h2>سجّل الدخول لعرض إشعاراتك</h2><button class="save-report-button" type="button" data-open-feature-login>دخول الطالب</button></div>`;
			return;
		}
		const readState = getStored("itqan-notification-read-state-v1", {});
		const readIds = new Set(readState[student.id] || []);
		const notifications = (Array.isArray(notificationMap[student.id]) ? notificationMap[student.id] : [])
			.map((item) => ({ ...item, read: readIds.has(item.id) }))
			.sort((left, right) => right.createdAt.localeCompare(left.createdAt));
		const unreadCount = notifications.filter((item) => !item.read).length;
		featureContent.innerHTML = `<section class="feature-card"><div class="feature-section-heading"><div><span class="eyebrow">رسائل المعلم</span><h2>صندوق الإشعارات</h2></div><span>${unreadCount} غير مقروء</span></div><p class="offline-status">تُزامن إشعارات المعلم بين أجهزتك عبر Firebase.</p>${unreadCount ? `<button class="text-button" type="button" data-mark-all-notifications-read>تحديد الكل كمقروء</button>` : ""}${notifications.length ? `<div class="student-notification-list">${notifications.map((item) => `<article class="student-notification ${item.read ? "" : "is-unread"}"><div class="student-notification-meta"><span>${notificationTypeLabel(item.type)}</span><time datetime="${escapeHtml(item.createdAt)}">${new Date(item.createdAt).toLocaleString("ar")}</time></div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.message)}</p>${!item.read ? `<button class="text-button" type="button" data-mark-notification-read="${escapeHtml(item.id)}">تحديد كمقروء</button>` : `<span class="notification-read-label">تمت القراءة</span>`}</article>`).join("")}</div>` : `<div class="reports-empty compact-empty"><span class="empty-mark">✉</span><h3>لا توجد إشعارات حتى الآن</h3><p>ستظهر هنا تنبيهات الواجبات والاختبارات وأي إشعار يرسله المعلم.</p></div>`}</section>`;
	}

	function getTeacherNotificationSummary(notificationMap) {
		const readState = getStored("itqan-notification-read-state-v1", {});
		const sentById = new Map();
		Object.entries(notificationMap).forEach(([studentId, items]) => {
			(Array.isArray(items) ? items : []).forEach((item) => {
				const sentItem = sentById.get(item.id) || { ...item, recipients: 0, readCount: 0 };
				sentItem.recipients += 1;
				if ((readState[studentId] || []).includes(item.id)) sentItem.readCount += 1;
				sentById.set(item.id, sentItem);
			});
		});
		return [...sentById.values()].sort((left, right) => right.createdAt.localeCompare(left.createdAt));
	}

	function renderHeaderNotifications() {
		const notificationMap = getStored(teacherNotificationsKey, {});
		if (window.itqanApp.isTeacher) {
			const sent = getTeacherNotificationSummary(notificationMap);
			const unread = sent.reduce((sum, item) => sum + item.recipients - item.readCount, 0);
			notificationBadge.textContent = unread > 99 ? "99+" : String(unread);
			notificationBadge.hidden = unread === 0;
			notificationPopover.innerHTML = `<div class="notification-popover-heading"><strong>الإشعارات المرسلة</strong><button class="notification-popover-close" type="button" aria-label="إغلاق الإشعارات">×</button></div>${sent.length ? `<div class="notification-popover-list">${sent.slice(0, 8).map((item) => `<article class="notification-popover-item"><span class="notification-type-label">${notificationTypeLabel(item.type)}</span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.message)}</small><span class="notification-popover-date">${item.readCount} من ${item.recipients} قرأوا · ${new Date(item.createdAt).toLocaleString("ar")}</span></article>`).join("")}</div><button class="notification-show-all" type="button" data-open-notification-center>عرض سجل الإشعارات</button>` : `<p class="notification-popover-empty">لا توجد إشعارات مرسلة بعد.</p>`}`;
			return;
		}
		const student = activeStudent();
		if (!student) {
			notificationBadge.hidden = true;
			notificationPopover.innerHTML = `<div class="notification-popover-heading"><strong>إشعارات المنصة</strong><button class="notification-popover-close" type="button" aria-label="إغلاق الإشعارات">×</button></div><p class="notification-popover-empty">سجّل الدخول كطالب لعرض إشعاراتك.</p><button class="notification-show-all" type="button" data-notification-login>دخول الطالب</button>`;
			return;
		}
		const readState = getStored("itqan-notification-read-state-v1", {});
		const readIds = new Set(readState[student.id] || []);
		const notifications = (Array.isArray(notificationMap[student.id]) ? notificationMap[student.id] : [])
			.map((item) => ({ ...item, read: readIds.has(item.id) }))
			.sort((left, right) => right.createdAt.localeCompare(left.createdAt));
		const unread = notifications.filter((item) => !item.read).length;
		notificationBadge.textContent = unread > 99 ? "99+" : String(unread);
		notificationBadge.hidden = unread === 0;
		notificationPopover.innerHTML = `<div class="notification-popover-heading"><strong>إشعارات المنصة</strong><button class="notification-popover-close" type="button" aria-label="إغلاق الإشعارات">×</button></div>${notifications.length ? `<div class="notification-popover-list">${notifications.slice(0, 8).map((item) => `<article class="notification-popover-item ${item.read ? "" : "is-unread"}"><span class="notification-type-label">${notificationTypeLabel(item.type)}</span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.message)}</small><span class="notification-popover-date">${new Date(item.createdAt).toLocaleString("ar")}</span>${item.read ? `<span class="notification-read-label">تمت القراءة</span>` : `<button class="notification-mark-read" type="button" data-notification-popover-read="${escapeHtml(item.id)}">تحديد كمقروء</button>`}</article>`).join("")}</div><button class="notification-show-all" type="button" data-open-notification-center>عرض كل الإشعارات</button>` : `<p class="notification-popover-empty">لا توجد إشعارات جديدة.</p>`}`;
	}

	function renderHomeworkSubmissions() {
		const submissions = getStored(featureStorage.reviews, []);
		const lateRequestsByStudent = getStored("itqan-late-submission-requests-v1", {});
		const allLateRequests = Object.values(lateRequestsByStudent).flatMap((requests) => Array.isArray(requests) ? requests : []);
		const query = submissionSearch.toLocaleLowerCase();
		const visibleSubmissions = submissions.filter((submission) => {
			const isReviewed = submission.status === "reviewed";
			if (submissionFilter === "pending" && isReviewed || submissionFilter === "reviewed" && !isReviewed) return false;
			const student = window.itqanApp.students.find((item) => item.id === submission.studentId);
			const assignment = Object.values(getStored("itqan-homework-assignments-v1", {})).flatMap((items) => Array.isArray(items) ? items : []).find((item) => item.id === submission.assignmentId);
			const searchText = [student?.fullName, student?.name, submission.fileName, submission.details, assignment?.title].join(" ").toLocaleLowerCase();
			return !query || searchText.includes(query);
		}).sort((left, right) => new Date(right.submittedAt) - new Date(left.submittedAt));
		const pendingCount = submissions.filter((submission) => submission.status !== "reviewed").length;
		const reviewedCount = submissions.length - pendingCount;
		const lateRequests = Object.entries(lateRequestsByStudent).flatMap(([studentId, requests]) =>
			(Array.isArray(requests) ? requests : []).map((request) => ({ ...request, studentId }))
		).filter((request) => {
			if (submissionFilter === "pending" && request.status !== "pending" || submissionFilter === "reviewed" && request.status === "pending") return false;
			const student = window.itqanApp.students.find((item) => item.id === request.studentId);
			return !query || [student?.fullName, student?.name, request.assignmentTitle].join(" ").toLocaleLowerCase().includes(query);
		}).sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt));
		const lateRequestCards = lateRequests.map((request) => {
			const student = window.itqanApp.students.find((item) => item.id === request.studentId);
			const status = request.status === "approved" ? "تمت الموافقة" : request.status === "rejected" ? "مرفوض" : "بانتظار المراجعة";
			return `<article class="submission-review-card"><div><strong>طلب تسليم متأخر · ${escapeHtml(student?.fullName || student?.name || "طالب")}</strong><small>${escapeHtml(request.assignmentTitle || "واجب")} · ${new Date(request.createdAt).toLocaleString("ar")}</small><small class="submission-reviewed-label">${status}</small></div>${request.status === "pending" ? `<div class="homework-manager-actions"><button class="save-report-button" type="button" data-respond-late-request="approved" data-student-id="${escapeHtml(request.studentId)}" data-request-id="${escapeHtml(request.id)}">السماح بالتسليم</button><button class="delete-report-button" type="button" data-respond-late-request="rejected" data-student-id="${escapeHtml(request.studentId)}" data-request-id="${escapeHtml(request.id)}">رفض الطلب</button></div>` : ""}</article>`;
		}).join("");
		const cards = visibleSubmissions.map((submission) => {
			const student = window.itqanApp.students.find((item) => item.id === submission.studentId);
			const assignment = Object.values(getStored("itqan-homework-assignments-v1", {})).flatMap((items) => Array.isArray(items) ? items : []).find((item) => item.id === submission.assignmentId);
			const metadata = `${escapeHtml(assignment?.title || "واجب")} · ${new Date(submission.submittedAt).toLocaleString("ar")}`;
			const reviewed = submission.status === "reviewed";
			const audioSubmission = /\.(m4a|mp3|ogg|opus|wav|webm)$/i.test(submission.fileName || "");
			const fileLink = submission.fileId
				? `<button class="text-button" type="button" data-open-homework-file data-file-id="${escapeHtml(submission.fileId)}" data-file-name="${escapeHtml(submission.fileName || "مرفق")}">${audioSubmission ? "تشغيل التسجيل" : "معاينة الملف"}</button>`
				: submission.fileData
					? `<a class="text-button" href="${escapeHtml(submission.fileData)}" target="_blank" rel="noopener" download="${escapeHtml(submission.fileName)}">فتح الملف</a>`
					: `<span class="text-button" aria-disabled="true">الملف القديم غير متاح</span>`;
			return `<article class="submission-review-card ${reviewed ? "is-reviewed" : ""}"><div><strong>${escapeHtml(student?.fullName || student?.name || "طالب")}</strong><small>${metadata} · ${escapeHtml(submission.fileName)}</small>${submission.details ? `<p>${escapeHtml(submission.details)}</p>` : ""}${reviewed ? `<small class="submission-reviewed-label">تمت المراجعة · ${new Date(submission.reviewedAt).toLocaleString("ar")}</small>` : ""}</div>${fileLink}${reviewed ? "" : `<form class="review-submission-form" data-review-submission="${escapeHtml(submission.id)}"><label class="field-label">الدرجة من 2<input name="score" type="number" min="0" max="2" step="0.5" required value="2"></label><label class="field-label">ملاحظة للطالب<textarea name="comment" rows="2" maxlength="300" placeholder="أحسنت، أو ملاحظة للتحسين"></textarea></label><button class="save-report-button" type="submit">حفظ المراجعة</button></form>`}</article>`;
		}).join("");
		const emptyMessage = submissions.length
			? "لا توجد تسليمات تطابق البحث والتصفية."
			: "لم يرسل الطلاب واجبات بعد.";
		return `<div class="submission-review-summary"><span>${pendingCount} تسليمات بانتظار المراجعة</span><span>${allLateRequests.filter((request) => request.status === "pending").length} طلبات تأخير معلقة</span><span>${reviewedCount} تمت مراجعتها</span></div><form class="submission-review-filters" id="submission-review-filters"><label class="field-label">ابحث باسم الطالب أو الملف<input name="search" type="search" value="${escapeHtml(submissionSearch)}" placeholder="اسم الطالب أو اسم الملف"></label><label class="field-label">حالة التسليم<select name="status"><option value="pending" ${submissionFilter === "pending" ? "selected" : ""}>بانتظار المراجعة</option><option value="reviewed" ${submissionFilter === "reviewed" ? "selected" : ""}>تمت مراجعته</option><option value="all" ${submissionFilter === "all" ? "selected" : ""}>كل التسليمات</option></select></label><button class="text-button" type="submit">تطبيق</button></form>${lateRequestCards ? `<h3>طلبات إعادة فتح الواجبات</h3><div class="submission-review-list">${lateRequestCards}</div>` : ""}${cards ? `<div class="submission-review-list">${cards}</div>` : `<p class="offline-status">${emptyMessage}</p>`}`;
	}

	function getTeacherOverview() {
		const students = window.itqanApp.students;
		const reports = window.itqanApp.reports;
		const submissions = getStored(featureStorage.reviews, []);
		const assignments = Object.entries(getStored("itqan-homework-assignments-v1", {}))
			.flatMap(([lessonKey, items]) => (Array.isArray(items) ? items : []).map((item) => ({ ...item, lessonKey })));
		const activeAssignments = assignments.filter((assignment) => assignment.active);
		const today = localDateKey();
		const upcomingAssignments = activeAssignments.filter((assignment) => assignment.dueDate && assignment.dueDate >= today)
			.sort((left, right) => left.dueDate.localeCompare(right.dueDate));
		const upcomingQuizzes = Object.entries(getStored("itqan-quiz-settings-v1", {}))
			.filter(([, quiz]) => quiz.startsAt && quiz.startsAt.slice(0, 10) >= today)
			.map(([lessonKey, quiz]) => ({ ...quiz, lessonKey }))
			.sort((left, right) => left.startsAt.localeCompare(right.startsAt));
		const studentsAtRisk = students.map((student) => {
			const quizzes = (reports[student.id]?.quizzes || []).filter((quiz) => quiz.score !== undefined && quiz.score !== null && Number.isFinite(Number(quiz.score)));
			const average = quizzes.length ? Math.round(quizzes.reduce((sum, quiz) => sum + Number(quiz.score), 0) / quizzes.length) : null;
			return { student, average, quizCount: quizzes.length };
		}).filter((item) => item.average !== null && item.average < 70).sort((left, right) => left.average - right.average);
		return {
			students,
			pendingReviews: submissions.filter((submission) => submission.status !== "reviewed").length,
			activeAssignments: activeAssignments.length,
			upcomingAssignments: upcomingAssignments.slice(0, 5),
			upcomingQuizzes: upcomingQuizzes.slice(0, 5),
			studentsAtRisk,
			totalRecords: students.reduce((sum, student) => sum + categories.reduce((count, [key]) => count + (Array.isArray(reports[student.id]?.[key]) ? reports[student.id][key].length : 0), 0), 0)
		};
	}

	function getStudentAttendance(studentId) {
		const attendance = getStored("itqan-attendance-v1", {});
		const markedDates = Object.entries(attendance)
			.filter(([, records]) => records && ["present", "late", "absent"].includes(records[studentId]))
			.map(([date, records]) => ({ date, status: records[studentId] }));
		const attended = markedDates.filter((entry) => entry.status === "present" || entry.status === "late").length;
		return { marked: markedDates.length, attended, percent: markedDates.length ? Math.round(attended / markedDates.length * 100) : null };
	}

	function renderPerformanceProfiles() {
		const submissions = getStored(featureStorage.reviews, []);
		return `<section class="feature-card"><div class="feature-section-heading"><div><span class="eyebrow">ملف الأداء الشامل</span><h2>أداء الطلاب والتزامهم</h2></div><button class="text-button" type="button" data-print-report>طباعة التقارير</button></div><div class="quiz-schedule-table-wrap"><table class="quiz-schedule-table"><thead><tr><th>الطالب</th><th>الواجبات المسلّمة</th><th>متوسط درجة الواجب</th><th>الحضور</th><th>الالتزام بالموعد</th></tr></thead><tbody>${window.itqanApp.students.map((student) => {
			const studentSubmissions = submissions.filter((item) => item.studentId === student.id);
			const gradedSubmissions = studentSubmissions.filter((item) => item.status === "reviewed" && Number.isFinite(Number(item.score)));
			const homeworkAverage = gradedSubmissions.length
				? `${Math.round(gradedSubmissions.reduce((total, item) => total + Number(item.score), 0) / gradedSubmissions.length / 2 * 100)}%`
				: "—";
			const onTime = studentSubmissions.filter((item) => {
				const assignment = Object.values(getStored("itqan-homework-assignments-v1", {}))
					.flatMap((items) => Array.isArray(items) ? items : [])
					.find((entry) => entry.id === item.assignmentId);
				return !assignment?.dueDate || item.submittedAt.slice(0, 10) <= assignment.dueDate;
			}).length;
			const attendance = getStudentAttendance(student.id);
			const attendanceLabel = attendance.percent === null ? "لا يوجد سجل" : `${attendance.percent}% (${attendance.attended}/${attendance.marked})`;
			const adherence = studentSubmissions.length ? `${Math.round(onTime / studentSubmissions.length * 100)}%` : "لا توجد تسليمات";
			return `<tr><td><strong>${escapeHtml(student.fullName || student.name)}</strong>${student.nameEn ? `<br><small dir="ltr" lang="en">${escapeHtml(student.nameEn)}</small>` : ""}</td><td>${studentSubmissions.length} (${gradedSubmissions.length} مقيّمة)</td><td>${homeworkAverage}</td><td>${attendanceLabel}</td><td>${adherence}</td></tr>`;
		}).join("") || `<tr><td colspan="5">لا يوجد طلاب في القائمة.</td></tr>`}</tbody></table></div><p class="offline-status">نسبة الحضور محسوبة من سجلات الحضور اليدوية. الالتزام محسوب من مواعيد الواجبات المسجّلة.</p></section>`;
	}

	function renderStudyGroups() {
		const groups = getStored("itqan-study-groups-v1", []).filter((group) =>
			group && typeof group.id === "string" && typeof group.name === "string" && Array.isArray(group.members));
		const students = window.itqanApp.students;
		const student = activeStudent();
		if (!window.itqanApp.isTeacher) {
			const group = groups.find((item) => item.members.includes(student?.id));
			return `<section class="feature-card"><span class="eyebrow">التعاون</span><h2>مجموعتي الدراسية</h2>${group ? `<p>أنت ضمن مجموعة <strong>${escapeHtml(group.name)}</strong>.</p><p>${group.members.map((id) => students.find((item) => item.id === id)?.fullName || students.find((item) => item.id === id)?.name).filter(Boolean).map(escapeHtml).join("، ")}</p>` : `<p class="offline-status">لم يحدد المعلم مجموعتك بعد.</p>`}</section>`;
		}
		return `<section class="feature-card"><div class="feature-section-heading"><div><span class="eyebrow">تقسيم الصف</span><h2>مجموعات الدراسة</h2></div></div><form class="feature-form" id="study-group-form"><label class="field-label">اسم المجموعة<input name="name" required maxlength="80" placeholder="مثال: مجموعة النجوم"></label><label class="field-label">الطلاب<select name="members" multiple required size="${Math.min(Math.max(students.length, 2), 6)}">${students.map((item) => `<option value="${escapeHtml(item.id)}">${escapeHtml(item.fullName || item.name)}</option>`).join("")}</select></label><button class="save-report-button" type="submit">إنشاء المجموعة</button></form>${groups.length ? `<div class="teacher-notification-history">${groups.map((group) => `<article class="teacher-notification-item"><div><strong>${escapeHtml(group.name)}</strong><p>${group.members.map((id) => students.find((item) => item.id === id)?.fullName || students.find((item) => item.id === id)?.name).filter(Boolean).map(escapeHtml).join("، ") || "لا أعضاء"}</p></div><button class="delete-report-button" type="button" data-delete-study-group="${escapeHtml(group.id)}">حذف</button></article>`).join("")}</div>` : `<p class="offline-status">لم تُنشأ مجموعات بعد.</p>`}</section>`;
	}

		function renderClassroomTools() {
			const students = window.itqanApp.students;
			const audit = getStored("itqan-audit-log-v1", {});
			const events = Object.entries(audit).flatMap(([studentId, records]) =>
				(Array.isArray(records) ? records : []).map((record) => ({ ...record, studentId }))
			).sort((left, right) => right.at.localeCompare(left.at)).slice(0, 60);
			const auditMarkup = window.itqanApp.isTeacher
				? `<section class="feature-card"><span class="eyebrow">النشاط المتزامن</span><h2>سجل نشاط الطلاب</h2><p>يسجل وقت الدخول وفتح الدروس وإرسال الواجبات والإجابات. يعمل التسجيل عند الاتصال والمزامنة.</p>${events.length ? `<div class="teacher-notification-history">${events.map((item) => `<article class="teacher-notification-item"><div><strong>${escapeHtml(students.find((student) => student.id === item.studentId)?.fullName || students.find((student) => student.id === item.studentId)?.name || "طالب")}</strong><small>${escapeHtml(item.action)} · ${new Date(item.at).toLocaleString("ar")}</small>${item.details ? `<p>${escapeHtml(item.details)}</p>` : ""}</div></article>`).join("")}</div>` : `<p class="offline-status">لا توجد أنشطة مسجلة بعد. لا يمكن تسجيل وقت الاستخدام أثناء انقطاع الإنترنت.</p>`}</section>`
				: "";
			const picker = window.itqanApp.isTeacher
				? `<section class="feature-card"><span class="eyebrow">مشاركة الصف</span><h2>اختيار طالب عشوائي</h2><p id="random-student-result" aria-live="polite">اضغط لاختيار طالب من القائمة.</p><button class="save-report-button" type="button" data-pick-student>اختيار عشوائي</button></section>`
				: "";
			featureContent.innerHTML = `${picker}<section class="feature-card"><div class="feature-section-heading"><div><span class="eyebrow">مساحة الشرح</span><h2>السبورة البيضاء</h2></div></div><p>لوحة رسم تفاعلية محلية على هذا الجهاز؛ لا تتم مشاركتها مباشرة مع الطلاب.</p><div class="whiteboard-tools"><label class="field-label">لون القلم<input id="whiteboard-color" type="color" value="#286b58"></label><label class="field-label">سماكة القلم<input id="whiteboard-width" type="range" min="1" max="18" value="4"></label><button class="text-button" type="button" data-clear-whiteboard>مسح اللوحة</button></div><canvas class="whiteboard-canvas" id="whiteboard-canvas" aria-label="مساحة الرسم"></canvas></section>${auditMarkup}`;
			initializeWhiteboard();
		}

		function applyThemeSettings() {
			const settings = getStored("itqan-theme-settings-v1", {});
			const root = document.documentElement;
			root.style.setProperty("--green", /^#[0-9a-f]{6}$/i.test(settings.primary || "") ? settings.primary : "");
			root.style.setProperty("--accent", /^#[0-9a-f]{6}$/i.test(settings.accent || "") ? settings.accent : "");
			root.style.setProperty("--coral", /^#[0-9a-f]{6}$/i.test(settings.accent || "") ? settings.accent : "");
			const brand = document.querySelector(".brand");
			if (brand) {
				brand.querySelector("strong").textContent = settings.name || "إتقان";
				brand.querySelector("small").textContent = settings.subtitle || "منصتك للتعلّم";
				const mark = brand.querySelector(".brand-mark");
				mark.textContent = settings.logoData ? "" : (settings.logo || settings.name || "إ").slice(0, 2);
				mark.style.backgroundImage = /^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(settings.logoData || "") ? `url("${settings.logoData}")` : "";
				mark.style.backgroundSize = "cover";
				mark.style.backgroundPosition = "center";
				mark.style.color = settings.logoData ? "transparent" : "";
				brand.setAttribute("aria-label", `${settings.name || "إتقان"}، الصفحة الرئيسية`);
			}
			if (!/^(?:Pre-Stage|Primary-Stage|Middle-Stage|Secondary-Stage|University-Stage)-Lesson\d+\.html$/i.test(window.location.pathname.split("/").pop())) {
				document.title = `${settings.name || "إتقان"} | منصة التعلم`;
			}
			document.querySelector(".page-footer span")?.replaceChildren(document.createTextNode(`منصة ${settings.name || "إتقان"} التعليمية`));
			document.querySelector("meta[name='theme-color']")?.setAttribute("content", document.documentElement.classList.contains("dark-theme") ? "#17221f" : "#f4f6ef");
		}

		function renderAppearance() {
			if (!window.itqanApp.isTeacher) {
				featureContent.innerHTML = `<section class="feature-card"><span class="eyebrow">المظهر</span><h2>إعدادات المنصة</h2><p>يمكنك تبديل الوضع الليلي من الزر أعلى الصفحة. تخصيص الهوية متاح للمعلم.</p></section>`;
				return;
			}
			const settings = getStored("itqan-theme-settings-v1", {});
			featureContent.innerHTML = `<section class="feature-card"><span class="eyebrow">هوية المنصة</span><h2>تخصيص الاسم والألوان</h2><p>تُحفظ الإعدادات في Firestore وتظهر على أجهزة الطلاب عند اتصالهم.</p><form class="feature-form theme-settings-form" id="theme-settings-form"><label class="field-label">اسم المنصة أو المادة<input name="name" maxlength="40" value="${escapeHtml(settings.name || "إتقان")}" required></label><label class="field-label">النص أسفل الاسم<input name="subtitle" maxlength="60" value="${escapeHtml(settings.subtitle || "منصتك للتعلّم")}"></label><label class="field-label">حروف الشعار (حتى حرفين)<input name="logo" maxlength="2" value="${escapeHtml(settings.logo || "إ")}"></label><label class="field-label">صورة الشعار (اختياري، تُضغط محلياً)<input name="logoFile" type="file" accept="image/png,image/jpeg,image/webp"></label><label class="field-label">اللون الأساسي<input name="primary" type="color" value="${/^#[0-9a-f]{6}$/i.test(settings.primary || "") ? settings.primary : "#286b58"}"></label><label class="field-label">اللون المساعد<input name="accent" type="color" value="${/^#[0-9a-f]{6}$/i.test(settings.accent || "") ? settings.accent : "#df7759"}"></label><div class="theme-settings-actions"><button class="save-report-button" type="submit">حفظ الهوية</button><button class="text-button" type="button" data-reset-theme>إعادة الهوية الافتراضية</button><button class="text-button" id="dark-mode-settings-toggle" type="button">${document.documentElement.classList.contains("dark-theme") ? "إيقاف الوضع الليلي" : "تفعيل الوضع الليلي"}</button></div><p class="lesson-feature-status" id="theme-settings-status" role="status"></p></form></section>`;
		}

		async function encodeLogoFile(file) {
			if (!(file instanceof File) || !["image/jpeg", "image/png", "image/webp"].includes(file.type) || !("createImageBitmap" in window)) {
				throw new Error("اختر صورة شعار بصيغة مدعومة.");
			}
			const bitmap = await createImageBitmap(file);
			try {
				const canvas = document.createElement("canvas");
				canvas.width = 180;
				canvas.height = 180;
				const context = canvas.getContext("2d");
				if (!context) throw new Error("تعذر تجهيز صورة الشعار.");
				context.fillStyle = "#ffffff";
				context.fillRect(0, 0, canvas.width, canvas.height);
				const scale = Math.max(180 / bitmap.width, 180 / bitmap.height);
				const width = bitmap.width * scale;
				const height = bitmap.height * scale;
				context.drawImage(bitmap, (180 - width) / 2, (180 - height) / 2, width, height);
				const dataUrl = canvas.toDataURL("image/jpeg", 0.78);
				if (dataUrl.length > 100000) throw new Error("صورة الشعار المضغوطة ما زالت كبيرة؛ اختر صورة أبسط.");
				return dataUrl;
			} finally {
				bitmap.close();
			}
		}

		function initializeWhiteboard() {
			const canvas = document.querySelector("#whiteboard-canvas");
			if (!canvas) return;
			const bounds = canvas.getBoundingClientRect();
			const pixelRatio = Math.max(1, window.devicePixelRatio || 1);
			canvas.width = Math.round(bounds.width * pixelRatio);
			canvas.height = Math.round(bounds.height * pixelRatio);
			const context = canvas.getContext("2d");
			context.scale(pixelRatio, pixelRatio);
			context.lineCap = "round";
			context.lineJoin = "round";
		}

		function recordAuditEvent(action, details = "") {
			const studentId = window.itqanApp.activeStudentId;
			if (!studentId || window.itqanApp.isTeacher) return;
			const audit = getStored("itqan-audit-log-v1", {});
			if (!Array.isArray(audit[studentId])) audit[studentId] = [];
			const eventKey = `${action}:${details}`;
			if (action === "تسجيل الدخول" && audit[studentId].some((record) => record.eventKey === eventKey && Date.now() - new Date(record.at).getTime() < 60000)) return;
			audit[studentId].push({ at: new Date().toISOString(), action, details: String(details).slice(0, 120), eventKey });
			audit[studentId] = audit[studentId].slice(-100);
			setStored("itqan-audit-log-v1", audit);
		}
	function renderAbsenceAlerts() {
		const days = getStored(featureStorage.activityDays, {});
		const threshold = Math.min(90, Math.max(1, Number(localStorage.getItem("itqan-absence-threshold-v1")) || 7));
		const today = new Date();
		const students = window.itqanApp.students;
		const inactive = students.map((student) => {
			const dates = Array.isArray(days[student.id]) ? days[student.id].filter((date) => /^\d{4}-\d{2}-\d{2}$/.test(date)).sort() : [];
			const lastSeen = dates.at(-1) || "";
			const elapsedDays = lastSeen ? Math.floor((new Date(`${localDateKey(today)}T00:00:00`) - new Date(`${lastSeen}T00:00:00`)) / 86400000) : null;
			return { student, lastSeen, elapsedDays };
		}).filter((item) => item.elapsedDays === null || item.elapsedDays > threshold);
		return `<section class="feature-card"><div class="feature-section-heading"><div><span class="eyebrow">متابعة الحضور الرقمي</span><h2>طلاب لم يدخلوا المنصة</h2></div><label class="field-label">التنبيه بعد <input id="absence-threshold" type="number" min="1" max="90" value="${threshold}" aria-label="عدد الأيام قبل تنبيه المعلم"> أيام</label></div><div class="teacher-student-risk-list">${inactive.map(({ student, lastSeen, elapsedDays }) => `<article><strong>${escapeHtml(student.fullName || student.name)}</strong><span>${lastSeen ? `آخر نشاط منذ ${elapsedDays} يوم (${lastSeen})` : "لم يُسجل له نشاط بعد"}</span></article>`).join("") || `<p class="offline-status">كل الطلاب نشطون خلال آخر ${threshold} أيام.</p>`}</div><small>النشاط يُسجل عند استخدام المنصة مع اتصال الإنترنت؛ هذا تنبيه نشاط وليس سجل حضور مدرسي.</small></section>`;
	}

	function renderTeacherDashboard() {
		const overview = getTeacherOverview();
		const today = localDateKey();
		const attendance = getStored("itqan-attendance-v1", {});
		const todayAttendance = attendance[today] || {};
		const presentCount = Object.values(todayAttendance).filter((status) => status === "present").length;
		const atRiskMarkup = overview.studentsAtRisk.length
			? `<div class="teacher-student-risk-list">${overview.studentsAtRisk.slice(0, 6).map(({ student, average, quizCount }) => `<article><strong>${escapeHtml(student.fullName || student.name)}</strong><span>متوسط ${average}% · ${quizCount} اختبار</span></article>`).join("")}</div>`
			: `<p class="offline-status">لا توجد نتائج اختبار منخفضة تحتاج إلى متابعة حالياً.</p>`;
		const assignmentsMarkup = overview.upcomingAssignments.length
			? `<div class="teacher-upcoming-list">${overview.upcomingAssignments.map((assignment) => `<article><strong>${escapeHtml(assignment.title)}</strong><span>${escapeHtml(assignment.dueDate)}</span></article>`).join("")}</div>`
			: `<p class="offline-status">لا توجد واجبات نشطة بمواعيد قادمة.</p>`;
		const quizzesMarkup = overview.upcomingQuizzes.length
			? `<div class="teacher-upcoming-list">${overview.upcomingQuizzes.map((quiz) => `<article><strong>${escapeHtml(quiz.title || "اختبار")}</strong><span>${new Date(quiz.startsAt).toLocaleString("ar")}</span></article>`).join("")}</div>`
			: `<p class="offline-status">لا توجد اختبارات قادمة.</p>`;
		const attendanceForm = `<section class="feature-card"><div class="feature-section-heading"><div><span class="eyebrow">الحضور اليومي</span><h2>تسجيل حضور الصف</h2></div><span>${presentCount} من ${overview.students.length} حاضر</span></div><form class="attendance-form" id="attendance-form"><label class="field-label">التاريخ<input name="date" type="date" value="${today}" required></label><div class="attendance-student-list">${overview.students.map((student) => `<label><span>${escapeHtml(student.fullName || student.name)}</span><select name="${escapeHtml(student.id)}"><option value="unmarked" ${!todayAttendance[student.id] ? "selected" : ""}>لم يسجل</option><option value="present" ${todayAttendance[student.id] === "present" ? "selected" : ""}>حاضر</option><option value="absent" ${todayAttendance[student.id] === "absent" ? "selected" : ""}>غائب</option><option value="late" ${todayAttendance[student.id] === "late" ? "selected" : ""}>متأخر</option></select></label>`).join("")}</div><button class="save-report-button" type="submit">حفظ الحضور</button></form></section>`;
		return `<section class="feature-card"><div class="feature-section-heading"><div><span class="eyebrow">ملخص الصف</span><h2>لوحة متابعة المعلم</h2></div><span class="offline-status">تُزامن بيانات الصف عبر Firebase</span></div><div class="teacher-overview-cards"><article><strong>${overview.students.length}</strong><span>طالباً</span></article><article><strong>${overview.pendingReviews}</strong><span>تسليمات بانتظار المراجعة</span></article><article><strong>${overview.activeAssignments}</strong><span>واجب نشط</span></article><article><strong>${overview.totalRecords}</strong><span>سجل أداء ومشاركة</span></article></div><div class="teacher-quick-actions"><button class="save-report-button" type="button" data-open-student-reports>إدارة تقارير الطلاب</button><button class="text-button" type="button" data-open-quiz-management>إدارة الاختبارات</button><button class="text-button" type="button" data-open-lesson-management>إدارة الدرس الحالي</button><button class="text-button" type="button" data-feature-tab="notifications">الإعلانات والإشعارات</button><button class="text-button" type="button" data-feature-tab="groups">مجموعات الدراسة</button></div></section><div class="feature-columns"><section class="feature-card"><div class="feature-section-heading"><div><span class="eyebrow">متابعة التحصيل</span><h2>طلاب يحتاجون إلى دعم</h2></div><span>${overview.studentsAtRisk.length}</span></div>${atRiskMarkup}<button class="text-button" type="button" data-open-student-reports>فتح تقارير الطلاب</button></section><section class="feature-card"><div class="feature-section-heading"><div><span class="eyebrow">التخطيط</span><h2>الواجبات القادمة</h2></div></div>${assignmentsMarkup}</section><section class="feature-card"><div class="feature-section-heading"><div><span class="eyebrow">التخطيط</span><h2>الاختبارات القادمة</h2></div></div>${quizzesMarkup}</section></div>${attendanceForm}${renderPerformanceProfiles()}${renderAbsenceAlerts()}${renderStudyGroups()}`;
	}

	function renderAnalytics() {
		const studentRows = window.itqanApp.students.map((student) => {
			const report = getStudentReport(student.id);
			const summary = getQuizSummary(report);
			return { student, report, summary };
		});
		const totals = categories.map(([id, label]) => ({
			label,
			count: studentRows.reduce((sum, item) => sum + item.report[id].length, 0)
		}));
		const maxCount = Math.max(1, ...totals.map((item) => item.count));
		const student = activeStudent();
		const analytics = getStored(featureStorage.analytics, {});
		const mistakesByPrompt = new Map();
		const analyticsSources = window.itqanApp.isTeacher ? Object.values(analytics).filter((source) => source && typeof source === "object") : student ? [analytics[student.id] || {}] : [];
		analyticsSources.forEach((studentAnalytics) => Object.entries(studentAnalytics).forEach(([prompt, result]) => {
			if (!result || typeof result !== "object") return;
			const aggregate = mistakesByPrompt.get(prompt) || { incorrect: 0, total: 0 };
			aggregate.incorrect += result.incorrect;
			aggregate.total += result.total;
			mistakesByPrompt.set(prompt, aggregate);
		}));
		const mistakes = [...mistakesByPrompt.entries()].sort((left, right) => right[1].incorrect - left[1].incorrect).slice(0, 10);
		const assignments = Object.values(getStored("itqan-homework-assignments-v1", {})).flatMap((items) => Array.isArray(items) ? items.filter((item) => item.active) : []);
		const submissions = getStored(featureStorage.reviews, []);
		const expectedSubmissions = assignments.length * window.itqanApp.students.length;
		const activeAssignmentIds = new Set(assignments.map((assignment) => assignment.id));
		const submittedPairs = new Set(submissions.filter((item) => activeAssignmentIds.has(item.assignmentId)).map((item) => `${item.studentId}:${item.assignmentId}`));
		const submissionPercent = expectedSubmissions ? Math.min(100, Math.round(submittedPairs.size / expectedSubmissions * 100)) : 0;
		const quizAverages = studentRows.flatMap(({ summary }) => summary.count ? [summary.average] : []);
		const classQuizAverage = quizAverages.length ? Math.round(quizAverages.reduce((sum, score) => sum + score, 0) / quizAverages.length) : 0;
		featureContent.innerHTML = `<section class="feature-card"><span class="eyebrow">${window.itqanApp.isTeacher ? "تحليل الصف" : "تحليل تقدّمك"}</span><h2>ملخص الأنشطة</h2>${window.itqanApp.isTeacher ? `<div class="teacher-overview-cards"><article><strong>${classQuizAverage}%</strong><span>متوسط نتائج الاختبارات</span></article><article><strong>${submissionPercent}%</strong><span>نسبة تسليم الواجبات</span></article><article><strong>${submissions.length}</strong><span>إجمالي التسليمات</span></article><article><strong>${assignments.length}</strong><span>واجبات نشطة</span></article></div><div class="analytics-bars">${totals.map((item) => `<div class="analytics-row"><span>${item.label}</span><div><i style="width:${(item.count / maxCount) * 100}%"></i></div><strong>${item.count}</strong></div>`).join("")}</div><h3>متوسط الاختبارات حسب الطالب</h3><div class="analytics-students">${studentRows.map(({ student: item, summary: studentSummary }) => `<div><span>${escapeHtml(item.fullName || item.name)}</span><strong>${studentSummary.average}%</strong><small>${studentSummary.count} اختبار</small></div>`).join("")}</div>` 		: student ? `<div class="report-overview feature-overview">${categories.map(([id, label]) => `<div class="overview-item"><span class="overview-label">${label}</span><strong>${getStudentReport(student.id)[id].length}</strong></div>`).join("")}<div class="overview-item"><span class="overview-label">متوسط الاختبارات</span><strong>${getQuizSummary(getStudentReport(student.id)).average}%</strong></div></div>` : `<p>سجّل الدخول لعرض تحليلك الشخصي. تظهر إحصاءات الصف للمعلم فقط.</p>`}</section><section class="feature-card"><span class="eyebrow">تحليل الأسئلة</span><h2>الأسئلة الأكثر حاجة إلى مراجعة</h2>${mistakes.length ? `<ol class="mistake-list">${mistakes.map(([prompt, value]) => `<li><span>${escapeHtml(prompt)}</span><strong>${value.incorrect} إجابة غير صحيحة من ${value.total}</strong></li>`).join("")}</ol>` : `<p class="offline-status">ستظهر النتائج بعد استخدام اختبارات الدروس.</p>`}<small>تُزامن تحليلات الإجابات عبر Firebase بين أجهزة الطالب والمعلم.</small>${window.itqanApp.isTeacher ? `<button class="save-report-button" type="button" data-export-analytics>تصدير النتائج والحضور CSV</button>` : ""}</section>`;
	}

	function listAssignments() {
		const all = getStored("itqan-homework-assignments-v1", {});
		return Object.entries(all).flatMap(([lessonKey, assignments]) => (Array.isArray(assignments) ? assignments : []).filter((assignment) => assignment.active && assignment.dueDate).map((assignment) => ({ ...assignment, lessonKey })));
	}

	function renderReminders() {
		const reminders = getStored(featureStorage.reminders, []);
		const today = localDateKey();
		const assignments = listAssignments().filter((assignment) => assignment.dueDate >= today)
			.map((item) => ({ title: item.title, date: item.dueDate, kind: "واجب" }));
		const quizzes = Object.entries(getStored("itqan-quiz-settings-v1", {}))
			.filter(([, quiz]) => quiz.startsAt && quiz.startsAt.slice(0, 10) >= today)
			.map(([, quiz]) => ({ title: quiz.title || "اختبار", date: quiz.startsAt, kind: "اختبار" }));
		const schedule = [...assignments, ...quizzes].sort((left, right) => left.date.localeCompare(right.date));
		const scheduleMarkup = schedule.length
			? schedule.map((item) => `<p class="upcoming-assignment"><span>${escapeHtml(item.kind)}</span><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(new Date(item.date).toLocaleString("ar"))}</span></p>`).join("")
			: `<p class="offline-status">لا توجد واجبات أو اختبارات قادمة.</p>`;
		featureContent.innerHTML = `<div class="feature-columns"><section class="feature-card"><span class="eyebrow">تذكير شخصي</span><h2>أضف تذكيراً</h2><form class="feature-form" id="reminder-form"><label class="field-label">التذكير<input name="title" required maxlength="100" placeholder="مثال: مراجعة الدرس الثالث"></label><label class="field-label">الموعد<input name="at" type="datetime-local" required></label><button class="save-report-button" type="submit">حفظ التذكير</button></form><p class="offline-status">تُحفظ تذكيراتك وتُزامن مع Firebase؛ يظهر التنبيه عند فتح المنصة.</p></section><section class="feature-card"><span class="eyebrow">التقويم الدراسي</span><h2>الواجبات والاختبارات القادمة</h2>${scheduleMarkup}</section></div><section class="feature-card"><div class="feature-section-heading"><div><span class="eyebrow">تذكيراتك</span><h2>المواعيد المحفوظة</h2></div><button class="text-button" type="button" id="enable-notifications">تفعيل إشعارات المتصفح</button></div>${reminders.length ? `<div class="reminder-list">${reminders.map((item, index) => `<article class="reminder-item"><div><strong>${escapeHtml(item.title)}</strong><small>${new Date(item.at).toLocaleString("ar")}</small></div><button class="delete-report-button" type="button" data-delete-reminder="${index}">حذف</button></article>`).join("")}</div>` : `<p class="offline-status">لم تضف أي تذكير بعد.</p>`}</section><section class="feature-card"><span class="eyebrow">نسخة أو تقرير</span><h2>حفظ نتائجك</h2><p>يمكنك تنزيل التقارير بصيغة CSV أو طباعتها وحفظها PDF من نافذة الطباعة.</p><div class="features-actions"><button class="save-report-button" type="button" data-export-csv>تنزيل التقرير CSV</button><button class="text-button" type="button" data-print-report>طباعة / حفظ PDF</button></div></section>`;
	}

	function render(tab = activeTab) {
		activeTab = featureNames[tab] ? tab : "dashboard";
		const studentId = window.itqanApp.activeStudentId;
		const notificationMap = getStored(teacherNotificationsKey, {});
		const unreadNotifications = studentId && !window.itqanApp.isTeacher
			? (Array.isArray(notificationMap[studentId]) ? notificationMap[studentId] : []).filter((item) => !item.read).length
			: 0;
		featureTabs.innerHTML = Object.entries(featureNames).filter(([key]) => key !== "teacher" || window.itqanApp.isTeacher).map(([key, label]) => `<button class="feature-tab ${key === activeTab ? "is-active" : ""}" type="button" role="tab" aria-selected="${key === activeTab}" data-feature-tab="${key}">${label}${key === "notifications" && unreadNotifications ? `<span class="notification-badge">${unreadNotifications}</span>` : ""}</button>`).join("");
		renderHeaderNotifications();
		const renderers = {
			dashboard: renderDashboard,
			cards: renderFlashcards,
			teacher: renderTeacherTools,
			notifications: renderNotifications,
			analytics: renderAnalytics,
			reminders: renderReminders,
			groups: () => { featureContent.innerHTML = renderStudyGroups(); },
			classroom: renderClassroomTools,
			appearance: renderAppearance
		};
		renderers[activeTab]();
	}

	function applyAccessibilitySettings() {
		const scale = Number(localStorage.getItem(featureStorage.fontScale)) || 0;
		document.documentElement.style.zoom = String(Math.min(1.2, Math.max(0.9, 1 + scale * 0.05)));
		const highContrast = localStorage.getItem(featureStorage.contrast) === "true";
		document.body.classList.toggle("high-contrast", highContrast);
		document.querySelector("#contrast-toggle").setAttribute("aria-pressed", String(highContrast));
	}

	document.querySelector("#theme-toggle").addEventListener("click", () => {
		const enabled = !document.documentElement.classList.contains("dark-theme");
		document.documentElement.classList.toggle("dark-theme", enabled);
		localStorage.setItem("itqan-dark-mode-v1", String(enabled));
		document.querySelector("#theme-toggle").setAttribute("aria-pressed", String(enabled));
		document.querySelector("#theme-toggle").textContent = enabled ? "الوضع النهاري" : "الوضع الليلي";
		applyThemeSettings();
	});

	document.querySelector("#close-homework-file").addEventListener("click", () => {
		document.querySelector("#homework-file-dialog").close();
		document.querySelector("#homework-file-viewer").replaceChildren();
	});
	document.querySelector("#homework-file-dialog").addEventListener("click", (event) => {
		if (event.target === event.currentTarget) event.currentTarget.close();
	});

	function exportCsv() {
		const student = activeStudent();
		const rows = [["الطالب", "الفئة", "التاريخ", "الدرس", "التفاصيل", "الدرجة", "ملاحظة المعلم"]];
		for (const person of window.itqanApp.students) {
			if (!window.itqanApp.isTeacher && person.id !== student?.id) continue;
			const report = getStudentReport(person.id);
			for (const [category, label] of categories) {
				for (const record of report[category]) rows.push([person.fullName || person.name, label, record.date || "", record.lesson || "", record.details || record.title || "", record.score ?? "", record.teacherComment || ""]);
			}
		}
		for (const result of window.itqanApp.quizResults || []) {
			if (window.itqanApp.isTeacher || result.studentId === student?.id) {
				rows.push([window.itqanApp.students.find((person) => person.id === result.studentId)?.fullName || "", "نتيجة اختبار", result.submittedAt || "", result.quizTitle || "", `${result.score}%`, result.score ?? "", ""]);
			}
		}
		if (window.itqanApp.isTeacher) {
			const attendance = getStored("itqan-attendance-v1", {});
			for (const [date, records] of Object.entries(attendance)) {
				for (const [studentId, status] of Object.entries(records || {})) {
					rows.push([window.itqanApp.students.find((person) => person.id === studentId)?.fullName || "", "الحضور", date, status, "", "", ""]);
				}
			}
		}
		const csv = `\uFEFF${rows.map((row) => row.map((value) => {
			const safe = String(value).replace(/"/g, '""');
			return /^[=+\-@]/.test(safe) ? `"'${safe}"` : `"${safe}"`;
		}).join(",")).join("\r\n")}`;
		const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
		const link = document.createElement("a");
		link.href = url;
		link.download = "itqan-reports.csv";
		link.click();
		window.setTimeout(() => URL.revokeObjectURL(url), 1000);
	}

	function printReports() {
		const student = activeStudent();
		const people = window.itqanApp.isTeacher ? window.itqanApp.students : window.itqanApp.students.filter((item) => item.id === student?.id);
		if (!people.length) throw new Error("سجّل الدخول أولاً لطباعة تقريرك.");
		const rows = people.flatMap((person) => {
			const report = getStudentReport(person.id);
			return categories.flatMap(([key, label]) => report[key].map((record) => `<tr><td>${escapeHtml(person.fullName || person.name)}</td><td>${label}</td><td>${escapeHtml(record.date || "")}</td><td>${escapeHtml(record.lesson || "")}</td><td>${escapeHtml(record.details || record.title || "")}</td><td>${escapeHtml(record.score ?? "")}</td></tr>`));
		});
		const printWindow = window.open("", "_blank");
		if (!printWindow) throw new Error("سمح المتصفح بالنوافذ المنبثقة لطباعة التقرير.");
		printWindow.document.write(`<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><title>تقرير منصة إتقان</title><style>body{font-family:Tahoma,sans-serif;color:#203b36;margin:24px}h1{text-align:center}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ccd5ca;padding:8px;text-align:right}th{background:#edf3eb}@media print{body{margin:10mm}}</style><h1>تقارير منصة إتقان</h1><table><thead><tr><th>الطالب</th><th>الفئة</th><th>التاريخ</th><th>الدرس</th><th>التفاصيل</th><th>الدرجة</th></tr></thead><tbody>${rows.join("") || "<tr><td colspan=\"6\">لا توجد سجلات</td></tr>"}</tbody></table><script>window.onload=()=>window.print();<\/script></html>`);
		printWindow.document.close();
	}

	function exportBackup() {
		const student = activeStudent();
		if (!window.itqanApp.isTeacher && !student) {
			window.alert("سجّل الدخول لتنزيل بياناتك أو اطلب من المعلم إنشاء نسخة احتياطية.");
			return;
		}
		const payload = { format: "itqan-local-backup", version: 1, createdAt: new Date().toISOString(), scope: window.itqanApp.isTeacher ? "all" : "student", ownerStudentId: student?.id || "", storage: {} };
		if (window.itqanApp.isTeacher) {
			for (let index = 0; index < localStorage.length; index += 1) {
				const key = localStorage.key(index);
				if (key?.startsWith("itqan-")) payload.storage[key] = localStorage.getItem(key);
			}
		} else {
			const reports = getStored("itqan-student-reports-v1", {});
			payload.storage["itqan-student-reports-v1"] = JSON.stringify({ [student.id]: reports[student.id] || {} });
			const quizAttempts = getStored("itqan-lesson-quiz-attempts-v1", {});
			payload.storage["itqan-lesson-quiz-attempts-v1"] = JSON.stringify({ [student.id]: quizAttempts[student.id] || {} });
			const notifications = getStored(teacherNotificationsKey, {});
			payload.storage[teacherNotificationsKey] = JSON.stringify({ [student.id]: notifications[student.id] || [] });
			for (const key of [
				featureStorage.analytics,
				featureStorage.activityDays,
				featureStorage.flashcards,
				"itqan-lesson-question-answers-v1",
				"itqan-lesson-understanding-v1",
				"itqan-lesson-notes-v1"
			]) {
				const values = getStored(key, {});
				payload.storage[key] = JSON.stringify({ [student.id]: values[student.id] || {} });
			}
		}
		const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }));
		const link = document.createElement("a");
		link.href = url;
		link.download = `itqan-backup-${new Date().toISOString().slice(0, 10)}.json`;
		link.click();
		URL.revokeObjectURL(url);
	}

	async function importBackup(file) {
		if (!file) return;
		if (file.size > 10 * 1024 * 1024) throw new Error("حجم ملف النسخة الاحتياطية يتجاوز 10 ميغابايت.");
		const payload = JSON.parse(await file.text());
		if (payload.format !== "itqan-local-backup" || payload.version !== 1 || !["all", "student"].includes(payload.scope) || !payload.storage || typeof payload.storage !== "object" || Array.isArray(payload.storage)) {
			throw new Error("ملف النسخة الاحتياطية غير صالح أو غير متوافق.");
		}
		const entries = Object.entries(payload.storage);
		if (entries.some(([key, value]) => !key.startsWith("itqan-") || typeof value !== "string")) throw new Error("يحتوي الملف على بيانات غير مسموح باستعادتها.");
		const studentKeys = [
			"itqan-student-reports-v1",
			"itqan-lesson-quiz-attempts-v1",
			featureStorage.analytics,
			featureStorage.activityDays,
			featureStorage.flashcards,
			"itqan-lesson-question-answers-v1",
			"itqan-lesson-understanding-v1",
			"itqan-lesson-notes-v1",
			teacherNotificationsKey
		];
		if (payload.scope === "student" && entries.some(([key]) => !studentKeys.includes(key))) throw new Error("تحتوي النسخة الطلابية على بيانات خارج النطاق المسموح.");
		if (payload.scope === "all" && !window.itqanApp.isTeacher) throw new Error("استعادة نسخة المنصة الكاملة تتطلب دخول المعلم.");
		if (!window.confirm(`سيتم استعادة ${entries.length} مجموعة بيانات محلية واستبدال بياناتها الحالية. هل تريد المتابعة؟`)) return;
		if (payload.scope === "all") {
			const existingKeys = [];
			for (let index = 0; index < localStorage.length; index += 1) {
				const key = localStorage.key(index);
				if (key?.startsWith("itqan-")) existingKeys.push(key);
			}
			existingKeys.forEach((key) => localStorage.removeItem(key));
		}
		if (payload.scope === "student" && (!payload.ownerStudentId || payload.ownerStudentId !== window.itqanApp.activeStudentId || window.itqanApp.isTeacher)) {
			throw new Error("نسخة الطالب لا تطابق الجلسة الحالية.");
		}
		if (payload.scope === "student") {
			for (const [key, value] of entries) {
				const current = getStored(key, {});
				const incoming = JSON.parse(value);
				const merged = { ...current, [payload.ownerStudentId]: incoming[payload.ownerStudentId] || {} };
				localStorage.setItem(key, JSON.stringify(merged));
			}
		} else {
			for (const [key, value] of entries) localStorage.setItem(key, value);
		}
		window.location.reload();
	}

	function buildSearchIndex() {
		const lessons = [];
		for (let level = 0; level < 5; level += 1) {
			const lessonCount = level === 0 ? 36 : 3;
			for (let lesson = 0; lesson < lessonCount; lesson += 1) lessons.push({
				title: `المرحلة ${["التمهيدية", "الابتدائية", "المتوسطة", "الثانوية", "الجامعية"][level]} · الدرس ${lesson + 1}`,
				kind: "lesson",
				level,
				lesson
			});
		}
		const books = window.itqanApp.libraryBooks.map((book) => ({ title: `${book.title} ${book.category}`, kind: "book" }));
		const questions = (window.englishQuestionBank || []).map((question) => ({ title: question.prompt, kind: "question" }));
		return [...lessons, ...books, ...questions];
	}

	function renderSearchResults() {
		const term = globalSearch.value.trim().toLocaleLowerCase();
		if (!term) {
			searchResults.hidden = true;
			searchResults.innerHTML = "";
			return;
		}
		const results = buildSearchIndex().filter((item) => item.title.toLocaleLowerCase().includes(term)).slice(0, 8);
		searchResults.innerHTML = results.length ? results.map((item, index) => `<button type="button" role="option" data-search-kind="${item.kind}" data-search-title="${escapeHtml(item.title)}" data-search-level="${item.level ?? ""}" data-search-lesson="${item.lesson ?? ""}" data-search-index="${index}">${escapeHtml(item.title)}<small>${item.kind === "lesson" ? "درس" : item.kind === "book" ? "كتاب" : "سؤال"}</small></button>`).join("") : `<p class="search-no-results">لا توجد نتائج مطابقة.</p>`;
		searchResults.hidden = false;
	}

	async function handleFeatureClick(event) {
		const target = event.target.closest("button");
		if (!target) return;
		if (target.matches("[data-pick-student]")) {
			if (!window.itqanApp.isTeacher) return;
			const students = window.itqanApp.students;
			if (!students.length) {
				target.insertAdjacentHTML("afterend", `<p class="lesson-feature-status" role="status">أضف الطلاب أولاً.</p>`);
				return;
			}
			const index = crypto.getRandomValues(new Uint32Array(1))[0] % students.length;
			const result = featureContent.querySelector("#random-student-result");
			result.textContent = students[index].fullName || students[index].name;
			result.classList.add("random-student-selected");
			return;
		}
		if (target.matches("[data-clear-whiteboard]")) {
			const canvas = featureContent.querySelector("#whiteboard-canvas");
			if (canvas) {
				canvas.width = 0;
				canvas.height = 0;
				initializeWhiteboard();
			}
			return;
		}
		if (target.matches("[data-reset-theme]")) {
			if (!window.itqanApp.isTeacher) return;
			setStored("itqan-theme-settings-v1", {});
			applyThemeSettings();
			renderAppearance();
			return;
		}
		if (target.matches("#dark-mode-settings-toggle")) {
			document.querySelector("#theme-toggle").click();
			renderAppearance();
			return;
		}
		if (target.matches("[data-export-analytics]")) {
			if (!window.itqanApp.isTeacher) return;
			exportCsv();
			return;
		}
		if (target.matches("[data-respond-late-request]")) {
			if (!window.itqanApp.isTeacher) return;
			target.disabled = true;
			try {
				await window.itqanApp.respondToLateSubmission(target.dataset.studentId, target.dataset.requestId, target.dataset.respondLateRequest);
				renderTeacherTools();
			} catch (error) {
				target.disabled = false;
				target.insertAdjacentHTML("afterend", `<p class="lesson-feature-status" role="alert">تعذرت مراجعة الطلب: ${escapeHtml(error.message)}</p>`);
			}
			return;
		}
		if (target.matches("[data-delete-study-group]")) {
			if (!window.itqanApp.isTeacher) return;
			const groups = getStored("itqan-study-groups-v1", []).filter((group) => group.id !== target.dataset.deleteStudyGroup);
			if (!setStored("itqan-study-groups-v1", groups)) {
				target.insertAdjacentHTML("afterend", `<p class="lesson-feature-status" role="alert">تعذر حذف المجموعة.</p>`);
				return;
			}
			renderStudyGroups();
			renderTeacherTools();
			return;
		}
		if (target.matches("[data-open-homework-file]")) {
			try {
				await window.itqanApp.previewHomeworkFile(target.dataset.fileId, target.dataset.fileName);
			} catch (error) {
				target.insertAdjacentHTML("afterend", `<p class="lesson-feature-status" role="alert">تعذر فتح الملف: ${escapeHtml(error.message)}</p>`);
			}
			return;
		}
		if (target.matches("[data-feature-tab]")) {
			render(target.dataset.featureTab);
			return;
		}
		if (target.matches("[data-open-feature-login]")) {
			document.querySelector("#role-toggle").click();
			return;
		}
		if (target.matches("[data-open-student-reports]")) {
			document.querySelector("#student-reports-nav").click();
			return;
		}
		if (target.matches("[data-continue-learning]")) {
			window.itqanApp.openLesson(Number(target.dataset.level), Number(target.dataset.semester), Number(target.dataset.lesson));
			window.itqanApp.openQuiz();
			return;
		}
		if (target.matches("[data-open-quiz-management]")) {
			document.querySelector("#quizzes-nav").click();
			return;
		}
		if (target.matches("[data-open-lesson-management]")) {
			if (!window.itqanApp.isTeacher) return;
			const lesson = window.itqanApp.activeLesson;
			window.itqanApp.openLesson(lesson.level, lesson.semester, lesson.lesson);
			document.querySelector("#lesson-manager-toggle").click();
			return;
		}
		if (target.matches("#flashcard-reveal")) {
			flashcardRevealed = !flashcardRevealed;
			renderFlashcards();
			return;
		}
		if (target.matches("[data-card-next]")) {
			flashcardIndex = (flashcardIndex + 1) % flashcardDeck.length;
			flashcardRevealed = false;
			renderFlashcards();
			return;
		}
		if (target.matches("[data-card-speak]")) {
			const card = getVocabularyCards()[flashcardDeck[flashcardIndex]];
			if (!("speechSynthesis" in window)) {
				window.alert("النطق الصوتي غير مدعوم في هذا المتصفح.");
				return;
			}
			window.speechSynthesis.cancel();
			const utterance = new SpeechSynthesisUtterance(card.back);
			utterance.lang = /[a-z]/i.test(card.back) ? "en-US" : "ar";
			window.speechSynthesis.speak(utterance);
			return;
		}
		if (target.matches("[data-card-rating]")) {
			const studentId = window.itqanApp.activeStudentId;
			if (!studentId) return;
			const index = flashcardDeck[flashcardIndex];
			const progress = getStored(featureStorage.flashcards, {});
			if (!progress[studentId]) progress[studentId] = { known: [], review: [] };
			const destination = target.dataset.cardRating;
			for (const group of ["known", "review"]) progress[studentId][group] = progress[studentId][group].filter((item) => item !== index);
			progress[studentId][destination].push(index);
			setStored(featureStorage.flashcards, progress);
			flashcardIndex = (flashcardIndex + 1) % flashcardDeck.length;
			flashcardRevealed = false;
			renderFlashcards();
			return;
		}
		if (target.matches("[data-delete-reminder]")) {
			const reminders = getStored(featureStorage.reminders, []);
			reminders.splice(Number(target.dataset.deleteReminder), 1);
			if (setStored(featureStorage.reminders, reminders)) renderReminders();
			else if (window.itqanApp.isGuest) target.insertAdjacentHTML("afterend", `<p class="lesson-feature-status" role="status">وضع الزائر للعرض فقط.</p>`);
			return;
		}
		if (target.matches("[data-mark-notification-read]")) {
			markNotificationRead(target.dataset.markNotificationRead, target);
			return;
		}
		if (target.matches("[data-mark-all-notifications-read]")) {
			markAllNotificationsRead(target);
			return;
		}
		if (target.matches("#enable-notifications")) {
			if (!("Notification" in window)) {
				window.alert("الإشعارات غير مدعومة في هذا المتصفح.");
				return;
			}
			Notification.requestPermission().then((permission) => {
				document.querySelector("#offline-status").textContent = permission === "granted" ? "تم تفعيل إشعارات المتصفح." : "لم يتم منح إذن الإشعارات.";
			});
			return;
		}
		if (target.matches("[data-export-csv]")) exportCsv();
		if (target.matches("[data-print-report]")) {
			try { printReports(); } catch (error) { window.alert(error.message); }
		}
	}

	function markNotificationRead(notificationId, target) {
		const studentId = window.itqanApp.activeStudentId;
		if (!studentId || window.itqanApp.isTeacher) return;
		const readState = getStored("itqan-notification-read-state-v1", {});
		if (!Array.isArray(readState[studentId])) readState[studentId] = [];
		if (!readState[studentId].includes(notificationId)) readState[studentId].push(notificationId);
		if (!setStored("itqan-notification-read-state-v1", readState)) {
			target.insertAdjacentHTML("afterend", `<p class="lesson-feature-status" role="alert">تعذر حفظ حالة الإشعار كمقروء.</p>`);
			return;
		}
		renderHeaderNotifications();
		if (activeTab === "notifications" && !featuresPage.hidden) render("notifications");
	}

	function markAllNotificationsRead(target) {
		const studentId = window.itqanApp.activeStudentId;
		if (!studentId || window.itqanApp.isTeacher) return;
		const notifications = getStored(teacherNotificationsKey, {});
		const readState = getStored("itqan-notification-read-state-v1", {});
		readState[studentId] = [...new Set([...(readState[studentId] || []), ...(notifications[studentId] || []).map((item) => item.id)])];
		if (!setStored("itqan-notification-read-state-v1", readState)) {
			target.insertAdjacentHTML("afterend", `<p class="lesson-feature-status" role="alert">تعذر حفظ حالة الإشعارات.</p>`);
			return;
		}
		renderHeaderNotifications();
		if (activeTab === "notifications" && !featuresPage.hidden) render("notifications");
	}

	async function handleFeatureSubmit(event) {
		if (window.itqanApp.isGuest) {
			event.preventDefault();
			event.target.insertAdjacentHTML("beforeend", `<p class="lesson-feature-status" role="status">وضع الزائر للعرض فقط؛ سجّل الدخول لحفظ التغييرات.</p>`);
			return;
		}
		if (event.target.matches("#theme-settings-form")) {
			event.preventDefault();
			if (!window.itqanApp.isTeacher) return;
			const data = new FormData(event.target);
			const logoFile = data.get("logoFile");
			const status = event.target.querySelector("#theme-settings-status");
			let savedLocally = false;
			try {
				const settings = {
					name: String(data.get("name") || "").trim(),
					subtitle: String(data.get("subtitle") || "").trim(),
					logo: String(data.get("logo") || "").trim().slice(0, 2),
					logoData: logoFile?.size ? await encodeLogoFile(logoFile) : getStored("itqan-theme-settings-v1", {}).logoData || "",
					primary: String(data.get("primary")),
					accent: String(data.get("accent"))
				};
				localStorage.setItem("itqan-theme-settings-v1", JSON.stringify(settings));
				savedLocally = true;
				if (!await window.itqanCloud.publish("itqan-theme-settings-v1", JSON.stringify(settings))) throw new Error("تحقق من اتصال Firebase وقواعد Firestore.");
				applyThemeSettings();
				status.textContent = "تم حفظ الهوية ومزامنتها إلى Firestore.";
			} catch (error) {
				console.error("تعذر مزامنة إعدادات الهوية:", error);
				status.textContent = `${savedLocally ? "حُفظت محلياً لكن تعذرت مزامنتها" : "تعذر حفظ الإعدادات"}: ${error.message}`;
			}
			return;
		}
		if (event.target.matches("#submission-review-filters")) {
			event.preventDefault();
			if (!window.itqanApp.isTeacher) return;
			const data = new FormData(event.target);
			submissionSearch = String(data.get("search") || "").trim();
			submissionFilter = String(data.get("status") || "pending");
			renderTeacherTools();
			return;
		}
		if (event.target.matches("#attendance-form")) {
			event.preventDefault();
			if (!window.itqanApp.isTeacher) return;
			const data = new FormData(event.target);
			const date = String(data.get("date") || "");
			const attendance = getStored("itqan-attendance-v1", {});
			attendance[date] = {};
			window.itqanApp.students.forEach((student) => {
				const state = String(data.get(student.id) || "unmarked");
				if (["present", "absent", "late"].includes(state)) attendance[date][student.id] = state;
			});
			if (!setStored("itqan-attendance-v1", attendance)) {
				event.target.insertAdjacentHTML("beforeend", `<p class="homework-form-error" role="alert">تعذر حفظ سجل الحضور.</p>`);
				return;
			}
			if (event.target.matches("#study-group-form")) {
				event.preventDefault();
				if (!window.itqanApp.isTeacher) return;
				const data = new FormData(event.target);
				const name = String(data.get("name") || "").trim();
				const members = [...new Set(data.getAll("members").map(String))]
					.filter((id) => window.itqanApp.students.some((student) => student.id === id));
				if (!name || !members.length) {
					event.target.insertAdjacentHTML("beforeend", `<p class="homework-form-error" role="alert">أدخل اسم المجموعة واختر طالباً واحداً على الأقل.</p>`);
					return;
				}
				const groups = getStored("itqan-study-groups-v1", []);
				groups.push({ id: crypto.randomUUID(), name, members, createdAt: new Date().toISOString() });
				if (!setStored("itqan-study-groups-v1", groups)) {
					event.target.insertAdjacentHTML("beforeend", `<p class="homework-form-error" role="alert">تعذر حفظ المجموعة؛ تحقق من مساحة التخزين.</p>`);
					return;
				}
				renderTeacherTools();
				return;
			}
			renderTeacherDashboard();
			return;
		}
		if (event.target.matches("#teacher-notification-form")) {
			event.preventDefault();
			if (!window.itqanApp.isTeacher) return;
			const form = event.target;
			const data = new FormData(form);
			const recipient = String(data.get("recipient") || "all");
			const students = recipient === "all"
				? window.itqanApp.students
				: window.itqanApp.students.filter((student) => student.id === recipient);
			const status = form.querySelector("#notification-form-status");
			notificationStatus = "";
			if (!students.length) {
				status.textContent = "تعذر العثور على الطالب المحدد.";
				return;
			}
			const type = String(data.get("type"));
			const title = String(data.get("title") || "").trim();
			const message = String(data.get("message") || "").trim();
			const notifications = getStored(teacherNotificationsKey, {});
			const createdAt = new Date().toISOString();
			const id = crypto.randomUUID();
			students.forEach((student) => {
				if (!Array.isArray(notifications[student.id])) notifications[student.id] = [];
				notifications[student.id].push({ id, type, title, message, createdAt, read: false });
				notifications[student.id] = notifications[student.id].slice(-100);
			});
			if (!setStored(teacherNotificationsKey, notifications)) {
				status.textContent = "تعذر حفظ الإشعار؛ تحقق من مساحة التخزين المتاحة.";
				return;
			}
			form.reset();
			notificationStatus = `تم حفظ الإشعار وإرساله إلى ${recipient === "all" ? "جميع الطلاب" : students[0].fullName || students[0].name}.`;
			window.dispatchEvent(new Event("itqan-notifications-changed"));
			renderNotifications();
			renderHeaderNotifications();
			return;
		}
		if (event.target.matches("[data-review-submission]")) {
			event.preventDefault();
			if (!window.itqanApp.isTeacher) return;
			const data = new FormData(event.target);
			try {
				await window.itqanApp.reviewHomeworkSubmission(event.target.dataset.reviewSubmission, data.get("score"), data.get("comment"));
				renderTeacherTools();
			} catch (error) {
				event.target.insertAdjacentHTML("beforeend", `<p class="homework-form-error" role="alert">${escapeHtml(error.message)}</p>`);
			}
			return;
		}
		if (event.target.matches("#reminder-form")) {
			event.preventDefault();
			const data = new FormData(event.target);
			const reminderDate = new Date(String(data.get("at")));
			if (!Number.isFinite(reminderDate.getTime()) || reminderDate <= new Date()) {
				event.target.elements.at.setCustomValidity("اختر موعداً في المستقبل.");
				event.target.elements.at.reportValidity();
				event.target.elements.at.setCustomValidity("");
				return;
			}
			const reminders = getStored(featureStorage.reminders, []);
			reminders.push({ id: crypto.randomUUID(), title: String(data.get("title")).trim(), at: reminderDate.toISOString(), notified: false });
			if (setStored(featureStorage.reminders, reminders)) {
				event.target.reset();
				renderReminders();
			}
		}
	}

	function tickReminders() {
		const reminders = getStored(featureStorage.reminders, []);
		const now = Date.now();
		let changed = false;
		const dueMessages = [];
		reminders.forEach((reminder) => {
			if (reminder.notified || new Date(reminder.at).getTime() > now) return;
			reminder.notified = true;
			changed = true;
			dueMessages.push(reminder.title);
		});
		if (changed) setStored(featureStorage.reminders, reminders);
		const studentId = window.itqanApp.activeStudentId;
		if (studentId && !window.itqanApp.isTeacher) {
			const today = new Date();
			const dateKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
			const assignmentReminders = getStored("itqan-assignment-reminder-state-v1", {});
			const notifiedAssignments = assignmentReminders[studentId] || {};
			listAssignments().filter((assignment) => assignment.dueDate === dateKey && !notifiedAssignments[`${assignment.id}:${dateKey}`]).forEach((assignment) => {
				dueMessages.push(`موعد تسليم واجب ${assignment.title} اليوم`);
				notifiedAssignments[`${assignment.id}:${dateKey}`] = true;
			});
			assignmentReminders[studentId] = notifiedAssignments;
			setStored("itqan-assignment-reminder-state-v1", assignmentReminders);
		}
		if (dueMessages.length) {
			const message = dueMessages.join("\n");
			if ("Notification" in window && Notification.permission === "granted") new Notification("تذكيرات منصة إتقان", { body: message });
			else window.alert(message);
		}
	}

	function recordQuizAnswer(lessonKey, question, correct) {
		const studentId = window.itqanApp.activeStudentId;
		if (!studentId) return;
		const analytics = getStored(featureStorage.analytics, {});
		if (!analytics[studentId]) analytics[studentId] = {};
		const prompt = String(question.prompt);
		if (!analytics[studentId][prompt]) analytics[studentId][prompt] = { incorrect: 0, correct: 0, total: 0 };
		analytics[studentId][prompt][correct ? "correct" : "incorrect"] += 1;
		analytics[studentId][prompt].total += 1;
		if (!setStored(featureStorage.analytics, analytics)) throw new Error("تعذر حفظ تحليل إجابة الاختبار.");
		recordStudyDay(studentId);
		recordAuditEvent("إجابة اختبار", prompt);
		window.dispatchEvent(new Event("itqan-data-changed"));
	}

	function recordHomeworkSubmission(submissionId) {
		const studentId = window.itqanApp.activeStudentId;
		if (!studentId || window.itqanApp.isTeacher || window.itqanApp.isGuest || !submissionId) return false;
		const storedProgress = getStored(featureStorage.homeworkAchievements, {});
		const progress = storedProgress && typeof storedProgress === "object" && !Array.isArray(storedProgress) ? storedProgress : {};
		const existingProgress = progress[studentId];
		const studentProgress = existingProgress && typeof existingProgress === "object" && !Array.isArray(existingProgress)
			? existingProgress
			: { assignmentIds: [] };
		if (!Array.isArray(studentProgress.assignmentIds)) studentProgress.assignmentIds = [];
		const previouslyEarned = studentProgress.assignmentIds.length >= 200;
		if (!studentProgress.assignmentIds.includes(submissionId) && !previouslyEarned) {
			studentProgress.assignmentIds.push(submissionId);
			progress[studentId] = studentProgress;
			if (!setStored(featureStorage.homeworkAchievements, progress)) throw new Error("تعذر حفظ تقدم وسام الواجبات.");
			window.dispatchEvent(new Event("itqan-achievements-changed"));
		}
		return !previouslyEarned && studentProgress.assignmentIds.length >= 200;
	}

	function recordEnglishGameResult(correct, total) {
		const studentId = window.itqanApp.activeStudentId;
		if (!studentId || window.itqanApp.isTeacher || window.itqanApp.isGuest) return false;
		const storedProgress = getStored(featureStorage.gameAchievements, {});
		const progress = storedProgress && typeof storedProgress === "object" && !Array.isArray(storedProgress) ? storedProgress : {};
		if (progress[studentId]?.perfect160) return false;
		if (total !== 160 || correct !== 160) return false;
		progress[studentId] = { perfect160: true, completedAt: new Date().toISOString() };
		if (!setStored(featureStorage.gameAchievements, progress)) throw new Error("تعذر حفظ وسام جولة الأسئلة.");
		window.dispatchEvent(new Event("itqan-achievements-changed"));
		return true;
	}

	function setOfflineStatus() {
		const status = document.querySelector("#offline-status");
		if (!("serviceWorker" in navigator)) {
			status.textContent = "التصفح دون اتصال غير مدعوم في هذا المتصفح.";
			return;
		}
		if (location.protocol === "file:") {
			status.textContent = "النسخ المحلي يعمل على هذا الجهاز. يلزم تشغيل المنصة عبر localhost أو HTTPS لتفعيل التخزين المؤقت والعمل دون اتصال.";
			return;
		}
		navigator.serviceWorker.register("service-worker.js").then(() => {
			status.textContent = "دعم التصفح دون اتصال مفعّل للواجهة. استخدم زر حفظ ملفات الدرس لتخزين موارده المحلية؛ روابط المصادر الخارجية لا يمكن تخزينها.";
		}).catch((error) => {
			status.textContent = `تعذر تفعيل التصفح دون اتصال: ${error.message}`;
		});
	}

	featureTabs.addEventListener("click", handleFeatureClick);
	featureContent.addEventListener("click", handleFeatureClick);
	featureContent.addEventListener("submit", handleFeatureSubmit);
	featureContent.addEventListener("pointerdown", (event) => {
		if (!event.target.matches("#whiteboard-canvas")) return;
		const canvas = event.target;
		const context = canvas.getContext("2d");
		const bounds = canvas.getBoundingClientRect();
		context.strokeStyle = featureContent.querySelector("#whiteboard-color")?.value || "#286b58";
		context.lineWidth = Number(featureContent.querySelector("#whiteboard-width")?.value) || 4;
		context.beginPath();
		context.moveTo(event.clientX - bounds.left, event.clientY - bounds.top);
		canvas.setPointerCapture(event.pointerId);
		whiteboardDrawing = true;
	});
	featureContent.addEventListener("pointermove", (event) => {
		if (!whiteboardDrawing || !event.target.matches("#whiteboard-canvas")) return;
		const canvas = event.target;
		const bounds = canvas.getBoundingClientRect();
		const context = canvas.getContext("2d");
		context.lineTo(event.clientX - bounds.left, event.clientY - bounds.top);
		context.stroke();
	});
	featureContent.addEventListener("pointerup", () => { whiteboardDrawing = false; });
	featureContent.addEventListener("pointercancel", () => { whiteboardDrawing = false; });
	featureContent.addEventListener("change", (event) => {
		if (!event.target.matches("#absence-threshold")) return;
		const value = Number(event.target.value);
		if (!Number.isInteger(value) || value < 1 || value > 90) {
			event.target.value = localStorage.getItem("itqan-absence-threshold-v1") || "7";
			return;
		}
		localStorage.setItem("itqan-absence-threshold-v1", String(value));
		renderTeacherTools();
	});
	notificationBell.addEventListener("click", () => {
		const willOpen = notificationPopover.hidden;
		renderHeaderNotifications();
		notificationPopover.hidden = !willOpen;
		notificationBell.setAttribute("aria-expanded", String(willOpen));
	});
	notificationPopover.addEventListener("click", (event) => {
		const target = event.target.closest("button");
		if (!target) return;
		if (target.matches(".notification-popover-close")) {
			notificationPopover.hidden = true;
			notificationBell.setAttribute("aria-expanded", "false");
			return;
		}
		if (target.matches("[data-notification-popover-read]")) {
			markNotificationRead(target.dataset.notificationPopoverRead, target);
			renderHeaderNotifications();
			return;
		}
		if (target.matches("[data-notification-login]")) {
			notificationPopover.hidden = true;
			notificationBell.setAttribute("aria-expanded", "false");
			document.querySelector("#role-toggle").click();
			return;
		}
		if (target.matches("[data-open-notification-center]")) {
			notificationPopover.hidden = true;
			notificationBell.setAttribute("aria-expanded", "false");
			window.itqanApp.openFeatures("notifications");
		}
	});
	featuresNav.addEventListener("click", () => render("dashboard"));
	document.querySelector("#export-backup").addEventListener("click", exportBackup);
	document.querySelector("#cache-current-lesson").addEventListener("click", async () => {
		const status = document.querySelector("#offline-status");
		if (location.protocol === "file:" || !("serviceWorker" in navigator)) {
			status.textContent = "يلزم تشغيل المنصة عبر localhost أو HTTPS لتخزين ملفات الدرس دون اتصال.";
			return;
		}
		try {
			const registration = await navigator.serviceWorker.ready;
			const worker = navigator.serviceWorker.controller || registration.active;
			if (!worker) throw new Error("عامل الخدمة لم يبدأ بعد؛ حدّث الصفحة ثم أعد المحاولة.");
			const resources = window.itqanApp.getOfflineResources();
			const channel = new MessageChannel();
			const results = await new Promise((resolve, reject) => {
				const timeout = window.setTimeout(() => reject(new Error("انتهت مهلة تخزين الملفات.")), 15000);
				channel.port1.onmessage = (event) => {
					window.clearTimeout(timeout);
					resolve(event.data);
				};
				worker.postMessage({ type: "CACHE_LESSON_RESOURCES", resources }, [channel.port2]);
			});
			const saved = results.filter((item) => item.cached).length;
			const failed = results.filter((item) => !item.cached);
			status.textContent = failed.length
				? `تم تخزين ${saved} ملفاً. تعذر تخزين ${failed.length}: ${failed.map((item) => item.url).join("، ")}`
				: `تم تخزين ${saved} ملفاً للدرس الحالي دون اتصال.`;
		} catch (error) {
			status.textContent = `تعذر حفظ ملفات الدرس: ${error.message}`;
		}
	});
	document.querySelector("#import-backup").addEventListener("change", async (event) => {
		try {
			await importBackup(event.target.files?.[0]);
		} catch (error) {
			window.alert(`تعذرت استعادة النسخة الاحتياطية: ${error.message}`);
		} finally {
			event.target.value = "";
		}
	});
	document.querySelector("#contrast-toggle").addEventListener("click", () => {
		localStorage.setItem(featureStorage.contrast, String(localStorage.getItem(featureStorage.contrast) !== "true"));
		applyAccessibilitySettings();
	});
	document.querySelectorAll("[data-font-size]").forEach((button) => button.addEventListener("click", () => {
		const current = Number(localStorage.getItem(featureStorage.fontScale)) || 0;
		const next = Math.max(-2, Math.min(4, current + (button.dataset.fontSize === "up" ? 1 : -1)));
		localStorage.setItem(featureStorage.fontScale, String(next));
		applyAccessibilitySettings();
	}));
	globalSearch.addEventListener("input", renderSearchResults);
	globalSearch.addEventListener("keydown", (event) => {
		if (event.key === "Escape") searchResults.hidden = true;
		if (event.key === "Enter") searchResults.querySelector("button")?.click();
	});
	searchResults.addEventListener("click", (event) => {
		const result = event.target.closest("[data-search-kind]");
		if (!result) return;
		const searchTerm = globalSearch.value;
		searchResults.hidden = true;
		globalSearch.value = "";
		if (result.dataset.searchKind === "lesson") {
			window.itqanApp.openLesson(Number(result.dataset.searchLevel), 0, Number(result.dataset.searchLesson));
			return;
		}
		if (result.dataset.searchKind === "book") {
			document.querySelector("#library-nav").click();
			document.querySelector("#library-search").value = searchTerm;
			document.querySelector("#library-search").dispatchEvent(new Event("input"));
			return;
		}
		document.querySelector("#english-game-nav").click();
		window.openEnglishQuestion(result.dataset.searchTitle);
	});
	document.addEventListener("click", (event) => {
		if (!event.target.closest(".global-search")) searchResults.hidden = true;
		if (!event.target.closest(".notification-center")) {
			notificationPopover.hidden = true;
			notificationBell.setAttribute("aria-expanded", "false");
		}
		const featureTab = event.target.closest("[data-feature-tab]");
		if (featureTab && !featureTab.closest("#feature-tabs") && !featureTab.closest("#features-content")) render(featureTab.dataset.featureTab);
	});
	window.addEventListener("beforeinstallprompt", (event) => {
		event.preventDefault();
		installPrompt = event;
		document.querySelector("#install-app-button").hidden = false;
	});
	document.querySelector("#install-app-button").addEventListener("click", async () => {
		if (!installPrompt) return;
		installPrompt.prompt();
		await installPrompt.userChoice;
		installPrompt = null;
		document.querySelector("#install-app-button").hidden = true;
	});
	window.addEventListener("itqan-data-changed", () => {
		if (!featuresPage.hidden) render(activeTab);
	});
	window.addEventListener("itqan-achievements-changed", () => {
		if (!featuresPage.hidden && activeTab === "dashboard") renderDashboard();
	});
	window.addEventListener("itqan-homework-submissions-changed", () => {
		if (!featuresPage.hidden && window.itqanApp.isTeacher) render(activeTab);
	});
	window.addEventListener("itqan-notifications-changed", () => {
		renderHeaderNotifications();
		if (!featuresPage.hidden) render(activeTab);
	});
	window.addEventListener("itqan-student-data-changed", (event) => {
		if (event.detail?.key === "itqan-notification-read-state-v1") renderHeaderNotifications();
		if (!["itqan-notification-read-state-v1", "itqan-late-submission-requests-v1", "itqan-audit-log-v1", featureStorage.homeworkAchievements, featureStorage.gameAchievements].includes(event.detail?.key)) return;
		if (!featuresPage.hidden) render(activeTab);
	});
	window.addEventListener("storage", (event) => {
		if (event.key !== teacherNotificationsKey) return;
		renderHeaderNotifications();
		if (!featuresPage.hidden) render(activeTab);
	});
	window.addEventListener("itqan-session-changed", () => {
		const student = activeStudent();
		if (student && !window.itqanApp.isTeacher) {
			recordStudyDay(student.id);
			recordAuditEvent("تسجيل الدخول");
		}
		renderHeaderNotifications();
	});
	window.addEventListener("itqan-cloud-data-changed", (event) => {
		if (event.detail?.key === "itqan-theme-settings-v1") {
			applyThemeSettings();
			if (activeTab === "appearance" && !featuresPage.hidden) renderAppearance();
		}
		if (event.detail?.key === "itqan-audit-log-v1" && activeTab === "classroom" && !featuresPage.hidden) renderClassroomTools();
	});
	window.addEventListener("online", () => {
		if (navigator.serviceWorker?.controller) document.querySelector("#offline-status").textContent = "تم الاتصال بالإنترنت.";
	});
	window.addEventListener("offline", () => {
		document.querySelector("#offline-status").textContent = "أنت غير متصل. ستعمل الواجهة المخزنة، لكن بيانات هذا الجهاز لن تتم مزامنتها.";
	});
	window.studentFeatures = { render, recordQuizAnswer, recordAuditEvent, recordHomeworkSubmission, recordEnglishGameResult };
	document.documentElement.classList.toggle("dark-theme", localStorage.getItem("itqan-dark-mode-v1") === "true");
	document.querySelector("#theme-toggle").setAttribute("aria-pressed", String(document.documentElement.classList.contains("dark-theme")));
	document.querySelector("#theme-toggle").textContent = document.documentElement.classList.contains("dark-theme") ? "الوضع النهاري" : "الوضع الليلي";
	applyThemeSettings();
	applyAccessibilitySettings();
	renderHeaderNotifications();
	setOfflineStatus();
	dueReminderTimer = window.setInterval(tickReminders, 30000);
	tickReminders();
})();
