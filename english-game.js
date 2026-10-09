(() => {
const englishGameFilters = document.querySelector("#english-game-filters");
const englishGameSession = document.querySelector("#english-game-session");
const englishGameHint = document.querySelector("#game-filter-hint");
const englishGameDifficultyLabels = { easy: "سهل", medium: "متوسط", hard: "صعب" };
const englishGameCategoryLabels = { vocabulary: "مفردات", phrases: "جمل شائعة", grammar: "قواعد" };
const englishGameLevelLabels = {
	preparatory: "المرحلة التمهيدية",
	primary: "المرحلة الابتدائية",
	middle: "المرحلة المتوسطة",
	secondary: "المرحلة الثانوية",
	university: "المرحلة الجامعية"
};
let englishGameQuestions = [];
let englishGameIndex = 0;
let englishGameScore = 0;
let englishGameAdvanceTimer = 0;

function matchingEnglishQuestions() {
	const filters = new FormData(englishGameFilters);
	return window.englishQuestionBank.filter((question) =>
		(filters.get("difficulty") === "all" || question.difficulty === filters.get("difficulty")) &&
		(filters.get("category") === "all" || question.category === filters.get("category")) &&
		(filters.get("level") === "all" || question.level === filters.get("level"))
	);
}

function shuffleEnglishQuestions(questions) {
	const shuffled = [...questions];
	for (let index = shuffled.length - 1; index > 0; index -= 1) {
		const randomIndex = Math.floor(Math.random() * (index + 1));
		[shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
	}
	return shuffled;
}

function updateEnglishGameHint() {
	const availableCount = matchingEnglishQuestions().length;
	const requestedCount = Number(englishGameFilters.elements.count.value);
	englishGameHint.textContent = availableCount === 0
		? "لا توجد أسئلة مطابقة لهذه الخيارات حالياً. غيّر عوامل التصفية."
		: availableCount < requestedCount
			? `يتوفر ${availableCount} سؤالاً لهذه التصفية؛ ستلعب جميع الأسئلة المتاحة بدلاً من ${requestedCount}.`
			: `يتوفر ${availableCount} سؤالاً، وسيتم اختيار ${requestedCount} سؤالاً عشوائياً دون تكرار.`;
}

function startEnglishGame(event) {
	event.preventDefault();
	const filters = new FormData(englishGameFilters);
	const requestedCount = Number(filters.get("count"));
	const availableQuestions = matchingEnglishQuestions();
	if (!availableQuestions.length) {
		updateEnglishGameHint();
		englishGameSession.hidden = true;
		return;
	}
	window.clearTimeout(englishGameAdvanceTimer);
	englishGameQuestions = shuffleEnglishQuestions(availableQuestions).slice(0, requestedCount);
	englishGameIndex = 0;
	englishGameScore = 0;
	englishGameFilters.hidden = true;
	englishGameHint.hidden = true;
	englishGameSession.hidden = false;
	renderEnglishGameQuestion();
}

function renderEnglishGameQuestion() {
	const question = englishGameQuestions[englishGameIndex];
	const progress = `${englishGameIndex + 1} / ${englishGameQuestions.length}`;
	englishGameSession.innerHTML = `
		<div class="game-progress"><span>السؤال <bdi dir="ltr">${progress}</bdi></span><span>النقاط ${englishGameScore}</span></div>
		<div class="game-progress-track" role="progressbar" aria-label="تقدم الأسئلة" aria-valuemin="0" aria-valuemax="${englishGameQuestions.length}" aria-valuenow="${englishGameIndex}"><span style="width:${(englishGameIndex / englishGameQuestions.length) * 100}%"></span></div>
		<div class="game-question-card">
			<div class="game-question-meta"><span>${englishGameCategoryLabels[question.category]}</span><span>${englishGameLevelLabels[question.level]}</span><span>${englishGameDifficultyLabels[question.difficulty]}</span></div>
			<h2 lang="en" dir="ltr">${question.prompt}</h2>
			<div class="game-answer-options">${question.options.map((option, index) => `<button class="game-answer-option" type="button" data-answer="${index}" dir="auto"><span>${String.fromCharCode(65 + index)}</span>${option}</button>`).join("")}</div>
			<p class="game-answer-feedback" id="game-answer-feedback" aria-live="assertive"></p>
		</div>`;
	englishGameSession.querySelector(".game-answer-options").addEventListener("click", handleEnglishGameAnswer);
}

function handleEnglishGameAnswer(event) {
	const answerButton = event.target.closest("[data-answer]");
	if (!answerButton) return;
	const question = englishGameQuestions[englishGameIndex];
	const chosenAnswer = Number(answerButton.dataset.answer);
	const optionButtons = englishGameSession.querySelectorAll(".game-answer-option");
	optionButtons.forEach((button) => {
		button.disabled = true;
		if (Number(button.dataset.answer) === question.answer) button.classList.add("is-correct");
	});
	const feedback = englishGameSession.querySelector("#game-answer-feedback");
	if (chosenAnswer === question.answer) {
		englishGameScore += 1;
		feedback.textContent = "إجابة صحيحة! أحسنت.";
		feedback.classList.add("is-correct");
	} else {
		answerButton.classList.add("is-incorrect");
		feedback.textContent = `إجابة غير صحيحة. الإجابة الصحيحة: ${question.options[question.answer]}`;
		feedback.classList.add("is-incorrect");
	}
	englishGameIndex += 1;
	if (englishGameIndex < englishGameQuestions.length) {
		feedback.textContent += " ينتقل السؤال التالي بعد لحظات…";
		englishGameAdvanceTimer = window.setTimeout(renderEnglishGameQuestion, 900);
	} else {
		englishGameAdvanceTimer = window.setTimeout(renderEnglishGameResult, 900);
	}
}

function renderEnglishGameResult() {
	const total = englishGameQuestions.length;
	const percentage = Math.round((englishGameScore / total) * 100);
	let earnedPerfect160 = false;
	let awardSaveError = "";
	try {
		earnedPerfect160 = window.studentFeatures?.recordEnglishGameResult(englishGameScore, total) === true;
	} catch (error) {
		console.error("تعذر حفظ إنجاز لعبة الأسئلة:", error);
		awardSaveError = "تعذر حفظ تقدم الوسام على هذا الجهاز.";
	}
	englishGameSession.innerHTML = `
		<div class="game-result">
			<span class="game-result-mark" aria-hidden="true">${percentage >= 70 ? "★" : "✓"}</span>
			<span class="eyebrow">انتهت اللعبة</span>
			<h2>أحسنت! نتيجتك <bdi dir="ltr">${englishGameScore} / ${total}</bdi></h2>
			<p><bdi dir="ltr">${percentage}%</bdi> إجابات صحيحة</p>
			<p class="english-game-award-status" id="english-game-award-status" aria-live="polite"></p>
			<button class="save-report-button" type="button" id="english-game-restart">العب مرة أخرى</button>
		</div>`;
	const awardStatus = englishGameSession.querySelector("#english-game-award-status");
	if (earnedPerfect160) awardStatus.textContent = "مبروك! حصلت على وسام بطل الأسئلة لإجابتك عن 160 سؤالاً دون خطأ.";
	else if (awardSaveError) awardStatus.textContent = awardSaveError;
	englishGameSession.querySelector("#english-game-restart").addEventListener("click", () => {
		englishGameFilters.hidden = false;
		englishGameHint.hidden = false;
		englishGameSession.hidden = true;
		updateEnglishGameHint();
	});
}

function initializeEnglishGame() {
	window.clearTimeout(englishGameAdvanceTimer);
	englishGameSession.hidden = true;
	englishGameFilters.hidden = false;
	englishGameHint.hidden = false;
	updateEnglishGameHint();
}

englishGameFilters.addEventListener("submit", startEnglishGame);
englishGameFilters.addEventListener("change", updateEnglishGameHint);
window.initializeEnglishGame = initializeEnglishGame;
window.openEnglishQuestion = (prompt) => {
	const question = window.englishQuestionBank.find((item) => item.prompt === prompt);
	if (!question) throw new Error("تعذر العثور على السؤال المحدد.");
	window.clearTimeout(englishGameAdvanceTimer);
	englishGameQuestions = [question];
	englishGameIndex = 0;
	englishGameScore = 0;
	englishGameFilters.hidden = true;
	englishGameHint.hidden = true;
	englishGameSession.hidden = false;
	renderEnglishGameQuestion();
};
})();
