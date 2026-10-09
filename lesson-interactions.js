(() => {
	const activityPanel = document.querySelector("#activity-panel");
	const toolList = document.querySelector("#lesson-interaction-tools");
	const keys = {
		questions: "itqan-lesson-questions-v1",
		answers: "itqan-lesson-question-answers-v1",
		understanding: "itqan-lesson-understanding-v1",
		notes: "itqan-lesson-notes-v1",
		timers: "itqan-lesson-activity-timers-v1"
	};
	let timerInterval = 0;

	function escapeHtml(value) {
		return String(value).replace(/[&<>"']/g, (character) => ({
			"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
		})[character]);
	}

	function readStore(key) {
		try {
			const value = localStorage.getItem(key);
			return { value: value === null ? {} : JSON.parse(value), error: "" };
		} catch (error) {
			console.error(`تعذرت قراءة بيانات أداة الدرس ${key}:`, error);
			return { value: {}, error: "تعذرت قراءة البيانات المحفوظة." };
		}
	}

	function writeStore(key, value) {
		try {
			localStorage.setItem(key, JSON.stringify(value));
			return "";
		} catch (error) {
			console.error(`تعذر حفظ بيانات أداة الدرس ${key}:`, error);
			return "تعذر الحفظ على هذا الجهاز. تحقق من مساحة التخزين المتاحة.";
		}
	}

	function app() {
		return window.itqanApp;
	}

	function lessonKey() {
		return app().currentLessonKey;
	}

	function actorId() {
		return app().activeStudentId || (app().isTeacher ? "teacher" : "guest");
	}

	function getPersonalValue(key) {
		const result = readStore(key);
		return { values: result.value[actorId()] || {}, error: result.error };
	}

	function savePersonalValue(key, values) {
		const result = readStore(key);
		if (result.error) return result.error;
		result.value[actorId()] = values;
		return writeStore(key, result.value);
	}

	function readTimerState(key = lessonKey()) {
		const result = readStore(keys.timers);
		const state = result.value[key] || null;
		if (result.error || !state) return { state, error: result.error };
		if (!["ready", "running", "paused", "finished"].includes(state.phase) || !Number.isFinite(state.durationSeconds) || state.durationSeconds < 60 || state.durationSeconds > 1200) {
			console.error("بيانات مؤقت النشاط المحفوظة غير صالحة.", state);
			return { state: null, error: "بيانات المؤقت المحفوظة غير صالحة؛ أعد ضبط المؤقت من حساب المعلم." };
		}
		if (state.phase === "running") {
			if (!Number.isFinite(state.endsAt)) {
				console.error("موعد انتهاء مؤقت النشاط غير صالح.", state);
				return { state: null, error: "موعد انتهاء المؤقت غير صالح؛ أعد ضبط المؤقت من حساب المعلم." };
			}
			const remainingSeconds = Math.max(0, Math.ceil((state.endsAt - Date.now()) / 1000));
			if (remainingSeconds === 0) {
				state.phase = "finished";
				state.remainingSeconds = 0;
				delete state.endsAt;
				const saveError = writeTimerState(key, state);
				return { state, error: saveError };
			}
			return { state: { ...state, remainingSeconds }, error: "" };
		}
		if (state.phase === "paused" && (!Number.isFinite(state.remainingSeconds) || state.remainingSeconds <= 0 || state.remainingSeconds > state.durationSeconds)) {
			console.error("الوقت المتبقي للمؤقت المحفوظ غير صالح.", state);
			return { state: null, error: "الوقت المتبقي للمؤقت غير صالح؛ أعد ضبط المؤقت من حساب المعلم." };
		}
		return { state, error: "" };
	}

	function writeTimerState(key, state) {
		const result = readStore(keys.timers);
		if (result.error) return result.error;
		result.value[key] = state;
		return writeStore(keys.timers, result.value);
	}

	function minimumTimeRemaining() {
		const { state, error } = readTimerState();
		if (error) return Number.POSITIVE_INFINITY;
		if (!state) return null;
		if (state.phase === "ready") return state.durationSeconds;
		if (state.phase === "finished") return 0;
		return state.phase === "paused" ? state.remainingSeconds : Math.max(0, Math.ceil((state.endsAt - Date.now()) / 1000));
	}

	function minimumTimeError() {
		return readTimerState().error;
	}

	function minimumTimePhase() {
		return readTimerState().state?.phase || "";
	}

	function formatTime(totalSeconds) {
		const minutes = Math.floor(totalSeconds / 60);
		const seconds = totalSeconds % 60;
		return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
	}

	function updateMinimumTimeDisplays() {
		const { state, error } = readTimerState();
		const remaining = minimumTimeRemaining();
		document.querySelectorAll("[data-lesson-minimum-time]").forEach((display) => {
			if (error) display.textContent = error;
			else if (state?.phase === "ready") display.textContent = `بانتظار بدء المعلم للمؤقت؛ الحد الأدنى: ${formatTime(state.durationSeconds)}.`;
			else if (remaining === null) display.textContent = state?.phase === "ready"
				? `بانتظار بدء المعلم للمؤقت (${Math.ceil(state.durationSeconds / 60)} دقائق).`
				: "لم يحدد المعلم وقتاً أدنى لهذا النشاط.";
			else if (remaining === 0) display.textContent = "انتهى الوقت الأدنى؛ يمكنك إرسال إجابتك.";
			else if (state?.phase === "paused") display.textContent = `المؤقت متوقف مؤقتاً عند ${formatTime(remaining)}؛ انتظر استئناف المعلم.`;
			else display.textContent = `الوقت الأدنى للحل: ${formatTime(remaining)}`;
		});
		document.querySelectorAll("[data-minimum-time-submit]").forEach((button) => {
			button.disabled = remaining !== null && remaining > 0;
		});
		const timerDisplay = document.querySelector("#lesson-timer-display");
		if (timerDisplay) {
			if (state && ["running", "paused", "finished"].includes(state.phase)) timerDisplay.textContent = formatTime(remaining ?? 0);
			else timerDisplay.textContent = state ? `${String(Math.floor(state.durationSeconds / 60)).padStart(2, "0")}:00` : "--:--";
		}
		const timerStatus = document.querySelector("#timer-status");
		if (timerStatus) {
			timerStatus.textContent = error || (state?.phase === "running"
				? "المؤقت يعمل، ولا يمكن إرسال الإجابة قبل انتهائه."
				: state?.phase === "paused"
					? "أوقف المعلم المؤقت مؤقتاً؛ سيُستأنف الحد الأدنى عند تشغيله."
					: state?.phase === "finished"
						? "انتهى الوقت الأدنى، ويمكن للطلاب إرسال إجاباتهم."
						: state?.phase === "ready"
							? "تم تحديد المدة؛ ابدأ المؤقت عند بدء النشاط."
							: "اختر الحد الأدنى للمدة ثم ابدأ النشاط.");
		}
		const timerAction = document.querySelector("#lesson-timer-form [data-timer-action]");
		if (timerAction && app().isTeacher && state) {
			timerAction.dataset.timerAction = state.phase === "running" ? "pause" : state.phase === "paused" ? "resume" : "start";
			timerAction.textContent = state.phase === "running" ? "إيقاف مؤقت" : state.phase === "paused" ? "استئناف المؤقت" : state.phase === "finished" ? "بدء المؤقت من جديد" : "بدء النشاط والمؤقت";
		}
		const durationSelect = document.querySelector("#lesson-timer-form [name='minutes']");
		if (durationSelect && app().isTeacher && state) durationSelect.disabled = state.phase === "running" || state.phase === "paused";
		if (state?.phase !== "running" && timerInterval) {
			window.clearInterval(timerInterval);
			timerInterval = 0;
		}
	}

	function syncTimerTicker() {
		if (timerInterval) window.clearInterval(timerInterval);
		timerInterval = 0;
		if (readTimerState().state?.phase === "running") timerInterval = window.setInterval(updateMinimumTimeDisplays, 1000);
		updateMinimumTimeDisplays();
	}

	function show(title, content) {
		app().openLessonActivity(title, content);
	}

	function statusLine(error, success = "") {
		return `<p class="lesson-feature-status" role="status">${escapeHtml(error || success)}</p>`;
	}

	function loginPrompt() {
		return `<p class="activity-intro">سجّل الدخول كطالب لحفظ إجابتك ومتابعتها ضمن حسابك المحلي.</p><button class="save-report-button" type="button" data-lesson-login>دخول الطالب</button>`;
	}

	function renderQuestion() {
		const questionsResult = readStore(keys.questions);
		const question = questionsResult.value[lessonKey()];
		const answersResult = readStore(keys.answers);
		const answers = answersResult.value;
		const answerCount = Object.values(answers).filter((studentAnswers) => studentAnswers?.[lessonKey()]?.questionId === question?.id).length;
		let content = `<p class="lesson-local-note">تُحفظ الإجابات على هذا الجهاز فقط ولا تُرسل إلى أجهزة أخرى.</p>`;
		if (questionsResult.error || answersResult.error) content += statusLine(questionsResult.error || answersResult.error);
		if (app().isTeacher) {
			content += `
				<form class="lesson-feature-form" id="lesson-question-form">
					<label class="field-label">السؤال<input name="prompt" maxlength="220" required value="${escapeHtml(question?.prompt || "")}" placeholder="اكتب سؤالاً قصيراً عن الدرس"></label>
					<div class="lesson-feature-options">${[0, 1, 2, 3].map((index) => `<label class="field-label">الخيار ${index + 1}<input name="option${index}" maxlength="100" required value="${escapeHtml(question?.options?.[index] || "")}" placeholder="اكتب خيار الإجابة"></label>`).join("")}</div>
					<label class="field-label">الإجابة الصحيحة<select name="correctIndex">${[0, 1, 2, 3].map((index) => `<option value="${index}" ${Number(question?.correctIndex) === index ? "selected" : ""}>الخيار ${index + 1}</option>`).join("")}</select></label>
					<div class="lesson-feature-actions"><button class="save-report-button" type="submit">حفظ السؤال وإتاحته</button>${question ? `<button class="delete-report-button" type="button" data-question-toggle>${question.active ? "إيقاف السؤال" : "إعادة إتاحة السؤال"}</button>` : ""}</div>
				</form>`;
			if (question) {
				const counts = question.options.map((option, index) => Object.values(answers).filter((studentAnswers) => studentAnswers?.[lessonKey()]?.questionId === question.id && Number(studentAnswers[lessonKey()].answer) === index).length);
				content += `<section class="lesson-poll-results" aria-label="نتائج السؤال"><h4>الإجابات المسجلة: ${answerCount}</h4>${question.options.map((option, index) => `<div class="lesson-poll-result"><span>${escapeHtml(option)}${index === Number(question.correctIndex) ? " · صحيحة" : ""}</span><strong>${counts[index]}</strong></div>`).join("")}</section>`;
			}
		} else if (!app().activeStudentId) {
			content += loginPrompt();
		} else if (!question) {
			content += `<p class="activity-intro">لم يضف المعلم سؤالاً تفاعلياً لهذا الدرس بعد.</p>`;
		} else if (!question.active) {
			content += `<p class="activity-intro">أغلق المعلم هذا السؤال. يمكنك متابعة الدرس أو مراجعة ملاحظاتك.</p>`;
		} else {
			const savedAnswer = answersResult.value[app().activeStudentId]?.[lessonKey()];
			const existingAnswer = savedAnswer?.questionId === question.id ? savedAnswer.answer : undefined;
			content += `<h4 class="question-text">${escapeHtml(question.prompt)}</h4><p class="lesson-feature-status" data-lesson-minimum-time role="status"></p><form class="lesson-feature-form" id="lesson-question-vote"><div class="lesson-feature-options">${question.options.map((option, index) => `<label><input type="radio" name="answer" value="${index}" ${Number(existingAnswer) === index ? "checked" : ""} required> ${escapeHtml(option)}</label>`).join("")}</div><div class="lesson-feature-actions"><button class="save-report-button" type="submit" data-minimum-time-submit>${existingAnswer === undefined ? "إرسال الإجابة" : "تحديث إجابتي"}</button></div><p class="lesson-feature-status" id="question-feedback" role="status">${existingAnswer !== undefined ? `إجابتك ${Number(existingAnswer) === Number(question.correctIndex) ? "صحيحة، أحسنت!" : "غير صحيحة؛ راجع الدرس وحاول مجدداً."}` : ""}</p></form>`;
		}
		show("السؤال التفاعلي", content);
		updateMinimumTimeDisplays();
	}

	function renderTimer() {
		const { state, error } = readTimerState();
		if (!app().isTeacher) {
			const remaining = minimumTimeRemaining();
			const message = error || (remaining === null
				? state?.phase === "ready" ? `حدد المعلم الحد الأدنى: ${Math.ceil(state.durationSeconds / 60)} دقائق. ينتظر النشاط بدء المؤقت.` : "لم يحدد المعلم وقتاً أدنى لهذا النشاط بعد."
				: state?.phase === "ready" ? `ينتظر النشاط بدء المعلم للمؤقت. الحد الأدنى للحل: ${formatTime(remaining)}.`
					: remaining === 0 ? "انتهى الوقت الأدنى؛ يمكنك حل النشاط وإرسال إجابتك."
					: state?.phase === "paused" ? `المؤقت متوقف مؤقتاً. الوقت المتبقي: ${formatTime(remaining)}`
						: `الوقت الأدنى لحل النشاط: ${formatTime(remaining)}`);
			const displayTime = error ? "--:--" : remaining === null ? state ? formatTime(state.durationSeconds) : "--:--" : formatTime(remaining);
			show("مؤقت النشاط", `<p class="activity-intro">يتحكم المعلم ببدء المؤقت وإيقافه؛ لا يمكن إرسال إجابات النشاط قبل انتهاء المدة.</p><p class="lesson-local-note">تعمل هذه الميزة على هذا الجهاز فقط؛ لا ينتقل المؤقت إلى أجهزة أخرى دون خادم.</p><div class="lesson-timer-display" id="lesson-timer-display" aria-live="polite">${displayTime}</div><p class="lesson-feature-status" data-lesson-minimum-time role="status">${escapeHtml(message)}</p>`);
			syncTimerTicker();
			return;
		}
		const durationSeconds = state?.durationSeconds || 300;
		const phase = state?.phase || "ready";
		const selectedMinutes = Math.ceil(durationSeconds / 60);
		const options = [1, 3, 5, 10, 15, 20];
		const timerValue = phase === "running" ? Math.max(0, Math.ceil((state.endsAt - Date.now()) / 1000)) : phase === "paused" ? state.remainingSeconds : phase === "finished" ? 0 : durationSeconds;
		const action = phase === "running" ? "pause" : phase === "paused" ? "resume" : "start";
		const actionLabel = phase === "running" ? "إيقاف مؤقت" : phase === "paused" ? "استئناف المؤقت" : phase === "finished" ? "بدء المؤقت من جديد" : "بدء النشاط والمؤقت";
		show("مؤقت النشاط", `
			<p class="activity-intro">اختر الحد الأدنى لوقت الحل، ثم ابدأ المؤقت عند بدء النشاط. لن يستطيع الطلاب إرسال إجابات السؤال أو التقويم حتى تنتهي المدة.</p>
			<p class="lesson-local-note">يحفظ المؤقت محلياً على هذا الجهاز، ولا تتم مزامنته مع أجهزة الطلاب الأخرى.</p>
			<form class="lesson-feature-form" id="lesson-timer-form">
				<label class="field-label">الحد الأدنى لوقت الحل<select name="minutes" ${phase === "running" || phase === "paused" ? "disabled" : ""}>${options.map((value) => `<option value="${value}" ${value === selectedMinutes ? "selected" : ""}>${value} دقائق</option>`).join("")}</select></label>
				<div class="lesson-timer-display" id="lesson-timer-display" aria-live="polite">${formatTime(timerValue)}</div>
				<div class="lesson-feature-actions"><button class="save-report-button" type="button" data-timer-action="${action}">${actionLabel}</button><button class="delete-report-button" type="button" data-timer-action="reset">إعادة الضبط</button></div>
				<p class="lesson-feature-status" id="timer-status" role="status"></p>
			</form>`);
		updateMinimumTimeDisplays();
	}

	function renderUnderstanding() {
		const result = readStore(keys.understanding);
		const choices = [
			["understood", "فهمت الدرس"],
			["review", "أحتاج إلى مراجعة"],
			["help", "أحتاج إلى مساعدة"]
		];
		let content = `<p class="activity-intro">اختر الحالة التي تعبّر عن فهمك. يمكنك تحديث اختيارك في أي وقت.</p><p class="lesson-local-note">تُحفظ الإجابات على هذا الجهاز، ويمكن للمعلم الاطلاع على ملخصها من الجهاز نفسه.</p>`;
		if (result.error) content += statusLine(result.error);
		if (app().isTeacher) {
			const responses = Object.values(result.value).filter((studentAnswers) => studentAnswers?.[lessonKey()]);
			const counts = choices.map(([key]) => responses.filter((studentAnswers) => studentAnswers[lessonKey()] === key).length);
			content += `<section class="lesson-poll-results" aria-label="ملخص فهم الطلاب"><h4>مؤشر الفهم المحلي</h4>${choices.map(([key, label], index) => `<div class="lesson-poll-result"><span>${label}</span><strong>${counts[index]}</strong></div>`).join("")}</section>`;
		} else if (!app().activeStudentId) {
			content += loginPrompt();
		} else {
			const selected = result.value[app().activeStudentId]?.[lessonKey()];
			content += `<div class="lesson-understanding-options">${choices.map(([key, label]) => `<button type="button" class="${selected === key ? "is-selected" : ""}" data-understanding="${key}" aria-pressed="${selected === key}">${label}</button>`).join("")}</div><p class="lesson-feature-status" id="understanding-status" role="status">${selected ? "تم حفظ اختيارك على هذا الجهاز." : ""}</p>`;
		}
		show("مؤشر الفهم", content);
	}

	function renderNotes() {
		const result = getPersonalValue(keys.notes);
		const note = result.values[lessonKey()] || "";
		show("ملاحظاتي", `
			<p class="activity-intro">اكتب ملخصاً أو كلمات جديدة أو أسئلة تريد طرحها. تُحفظ الملاحظات لهذا الدرس على هذا الجهاز.</p>
			<form class="lesson-feature-form" id="lesson-notes-form">
				<label class="field-label" for="lesson-notes-text">ملاحظات الدرس<textarea id="lesson-notes-text" name="notes" maxlength="5000" placeholder="دوّن ملاحظاتك هنا...">${escapeHtml(note)}</textarea></label>
				<div class="lesson-feature-actions"><button class="save-report-button" type="submit">حفظ الملاحظات</button><button class="delete-report-button" type="button" data-clear-notes>مسح الملاحظات</button></div>
				${statusLine(result.error, note ? "ملاحظاتك محفوظة على هذا الجهاز." : "")}
			</form>`);
	}

	toolList.addEventListener("click", (event) => {
		const button = event.target.closest("[data-lesson-feature]");
		if (!button) return;
		const actions = {
			question: renderQuestion,
			timer: renderTimer,
			understanding: renderUnderstanding,
			notes: renderNotes
		};
		actions[button.dataset.lessonFeature]?.();
	});

	activityPanel.addEventListener("click", (event) => {
		const target = event.target.closest("button");
		if (!target) return;
		if (target.matches("[data-lesson-login]")) {
			document.querySelector("#role-toggle").click();
			return;
		}
		if (target.matches("[data-question-toggle]") && app().isTeacher) {
			const result = readStore(keys.questions);
			const question = result.value[lessonKey()];
			if (!question || result.error) return;
			question.active = !question.active;
			const error = writeStore(keys.questions, result.value);
			if (error) {
				target.insertAdjacentHTML("afterend", statusLine(error));
				return;
			}
			renderQuestion();
			return;
		}
		if (target.matches("[data-understanding]") && app().activeStudentId && !app().isTeacher) {
			const result = readStore(keys.understanding);
			if (result.error) {
				document.querySelector("#understanding-status").textContent = result.error;
				return;
			}
			if (!result.value[app().activeStudentId]) result.value[app().activeStudentId] = {};
			result.value[app().activeStudentId][lessonKey()] = target.dataset.understanding;
			const error = writeStore(keys.understanding, result.value);
			if (error) {
				document.querySelector("#understanding-status").textContent = error;
				return;
			}
			renderUnderstanding();
			return;
		}
		if (target.matches("[data-clear-notes]")) {
			const result = getPersonalValue(keys.notes);
			delete result.values[lessonKey()];
			const error = result.error || savePersonalValue(keys.notes, result.values);
			renderNotes();
			const status = activityPanel.querySelector(".lesson-feature-status");
			if (status) status.textContent = error || "تم مسح الملاحظات.";
			return;
		}
	});

	activityPanel.addEventListener("click", (event) => {
		const target = event.target.closest("[data-timer-action]");
		if (!target || !app().isTeacher) return;
		const { state: previousState, error: readError } = readTimerState();
		if (readError && target.dataset.timerAction !== "reset") {
			const status = activityPanel.querySelector("#timer-status");
			if (status) status.textContent = readError;
			return;
		}
		const durationSeconds = previousState?.durationSeconds || 300;
		let nextState;
		if (target.dataset.timerAction === "start" || target.dataset.timerAction === "resume") {
			const remainingSeconds = previousState?.phase === "paused" ? previousState.remainingSeconds : durationSeconds;
			nextState = { phase: "running", durationSeconds, endsAt: Date.now() + remainingSeconds * 1000 };
		} else if (target.dataset.timerAction === "pause" && previousState?.phase === "running") {
			const remainingSeconds = Math.max(0, Math.ceil((previousState.endsAt - Date.now()) / 1000));
			nextState = remainingSeconds === 0
				? { phase: "finished", durationSeconds, remainingSeconds: 0 }
				: { phase: "paused", durationSeconds, remainingSeconds };
		} else if (target.dataset.timerAction === "reset") {
			nextState = { phase: "ready", durationSeconds: Number(activityPanel.querySelector("#lesson-timer-form [name='minutes']")?.value || durationSeconds / 60) * 60 };
		} else {
			return;
		}
		const saveError = writeTimerState(lessonKey(), nextState);
		if (saveError) {
			const status = activityPanel.querySelector("#timer-status");
			if (status) status.textContent = saveError;
			return;
		}
		renderTimer();
		syncTimerTicker();
	});

	activityPanel.addEventListener("change", (event) => {
		if (!event.target.matches("#lesson-timer-form [name='minutes']") || !app().isTeacher) return;
		const durationSeconds = Number(event.target.value) * 60;
		const error = writeTimerState(lessonKey(), { phase: "ready", durationSeconds });
		if (error) {
			const status = activityPanel.querySelector("#timer-status");
			if (status) status.textContent = error;
		} else updateMinimumTimeDisplays();
	});

	activityPanel.addEventListener("submit", (event) => {
		const questionForm = event.target.closest("#lesson-question-form");
		if (questionForm) {
			event.preventDefault();
			if (!app().isTeacher) return;
			const form = new FormData(questionForm);
			const result = readStore(keys.questions);
			if (result.error) {
				questionForm.querySelector(".lesson-feature-actions").insertAdjacentHTML("afterend", statusLine(result.error));
				return;
			}
			const options = [0, 1, 2, 3].map((index) => String(form.get(`option${index}`) || "").trim());
			const prompt = String(form.get("prompt") || "").trim();
			const previousQuestion = result.value[lessonKey()];
			const previousContent = JSON.stringify([previousQuestion?.prompt, previousQuestion?.options, previousQuestion?.correctIndex]);
			const newContent = JSON.stringify([prompt, options, Number(form.get("correctIndex"))]);
			const question = {
				id: previousContent === newContent && previousQuestion?.id ? previousQuestion.id : crypto.randomUUID(),
				prompt,
				options,
				correctIndex: Number(form.get("correctIndex")),
				active: true
			};
			result.value[lessonKey()] = question;
			const error = writeStore(keys.questions, result.value);
			if (error) questionForm.querySelector(".lesson-feature-actions").insertAdjacentHTML("afterend", statusLine(error));
			else renderQuestion();
			return;
		}
		const voteForm = event.target.closest("#lesson-question-vote");
		if (voteForm) {
			event.preventDefault();
			if (app().isTeacher || !app().activeStudentId) return;
			const remaining = minimumTimeRemaining();
			if (remaining !== null && remaining > 0) {
				voteForm.querySelector("#question-feedback").textContent = "لا يمكن إرسال الإجابة قبل انتهاء الحد الأدنى الذي حدده المعلم.";
				updateMinimumTimeDisplays();
				return;
			}
			const selected = new FormData(voteForm).get("answer");
			if (selected === null) return;
			const result = readStore(keys.questions);
			const question = result.value[lessonKey()];
			if (result.error || !question?.active) {
				voteForm.querySelector("#question-feedback").textContent = result.error || "السؤال غير متاح حالياً.";
				return;
			}
			const answers = readStore(keys.answers);
			if (answers.error) {
				voteForm.querySelector("#question-feedback").textContent = answers.error;
				return;
			}
			if (!answers.value[app().activeStudentId]) answers.value[app().activeStudentId] = {};
			answers.value[app().activeStudentId][lessonKey()] = { questionId: question.id, answer: Number(selected) };
			const error = writeStore(keys.answers, answers.value);
			if (error) voteForm.querySelector("#question-feedback").textContent = error;
			else renderQuestion();
			return;
		}
		const notesForm = event.target.closest("#lesson-notes-form");
		if (notesForm) {
			event.preventDefault();
			const result = getPersonalValue(keys.notes);
			if (result.error) {
				notesForm.querySelector(".lesson-feature-status").textContent = result.error;
				return;
			}
			result.values[lessonKey()] = String(new FormData(notesForm).get("notes") || "");
			const error = savePersonalValue(keys.notes, result.values);
			notesForm.querySelector(".lesson-feature-status").textContent = error || "تم حفظ ملاحظاتك على هذا الجهاز.";
		}
	});

	window.addEventListener("storage", (event) => {
		if (event.key !== keys.timers) return;
		if (activityPanel.querySelector(".activity-heading h3")?.textContent === "مؤقت النشاط" && app().isTeacher) renderTimer();
		else syncTimerTicker();
	});

	window.lessonInteractions = { minimumTimeRemaining, minimumTimeError, minimumTimePhase, formatTime };
	syncTimerTicker();
})();
