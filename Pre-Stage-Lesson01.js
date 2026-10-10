window.itqanLessonHtml = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الدرس الأول - كتاب اللغة الإنجليزية (A4)</title>
    <style>
        .lesson-book,
        .lesson-book * {
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
        }

        .lesson-book {
            --lesson-blue: #0878c9;
            --lesson-blue-soft: #eaf5ff;
            --lesson-green: #4d8c31;
            --lesson-green-soft: #f2f8e9;
            --lesson-pink: #c2185b;
            width: 100%;
            min-height: 100%;
            color: #263445;
            background: linear-gradient(145deg, #f2f7fb, #edf1f5);
            padding: 22px 12px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 24px;
        }

        .lesson-book .print-btn-container {
            position: relative;
            z-index: 999;
            width: min(100%, 210mm);
            background: rgba(24, 39, 58, 0.96);
            padding: 10px 16px;
            border: 1px solid rgba(255, 255, 255, 0.14);
            border-radius: 16px;
            box-shadow: 0 8px 26px rgba(24, 39, 58, 0.18);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
            color: white;
            backdrop-filter: blur(10px);
        }

        .lesson-book .lesson-tools {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: flex-end;
            gap: 7px;
        }

        .lesson-book .lesson-tools[hidden] {
            display: none !important;
        }

        .lesson-book .lesson-tool,
        .lesson-book .lesson-shape-picker,
        .lesson-book .lesson-tool-color {
            min-height: 38px;
            border: 1px solid rgba(255, 255, 255, 0.24);
            border-radius: 9px;
            padding: 7px 10px;
            color: #fff;
            background: rgba(255, 255, 255, 0.1);
            font: inherit;
            font-size: 0.82rem;
        }

        .lesson-book .lesson-tool {
            cursor: pointer;
        }

        .lesson-book .lesson-tool.is-active {
            background: #fff;
            color: #173452;
            box-shadow: 0 0 0 2px #53b5ff;
        }

        .lesson-book .lesson-shape-picker {
            color: #173452;
            background: #fff;
            cursor: pointer;
        }

        .lesson-book .lesson-tool-color {
            width: 44px;
            padding: 4px;
            cursor: pointer;
        }

        .lesson-book .lesson-tool-text {
            width: min(180px, 35vw);
            color: #173452;
            background: #fff;
        }

        .lesson-book .lesson-a4-tool {
            background: linear-gradient(135deg, #1594e5, #0874c5);
            font-weight: bold;
        }

        .lesson-book .annotation-layer {
            position: absolute;
            inset: 0;
            z-index: 5;
            width: 100%;
            height: 100%;
            pointer-events: none;
            touch-action: none;
        }

        .lesson-book.is-annotating .annotation-layer {
            pointer-events: auto;
            cursor: crosshair;
        }

        .lesson-book .print-btn {
            background: linear-gradient(135deg, #1594e5, #0874c5);
            color: white;
            border: none;
            padding: 9px 16px;
            border-radius: 11px;
            font-size: 0.92rem;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .lesson-book .print-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 5px 14px rgba(8, 116, 197, 0.3);
        }

        .lesson-book .a4-page {
            width: 210mm;
            height: 297mm;
            min-height: 297mm;
            flex: 0 0 auto;
            background: #ffffff;
            padding: 13mm;
            border: 1px solid #e7edf2;
            box-shadow: 0 12px 34px rgba(34, 55, 77, 0.13);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: relative;
            border-radius: 16px;
            overflow: hidden;
            page-break-after: always;
            break-after: page;
        }

        .lesson-book .alphabet-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 3px;
            padding: 9px 10px;
            border-radius: 11px;
            font-weight: bold;
            font-size: 0.84rem;
            direction: ltr;
            margin-bottom: 15px;
        }

        .lesson-book .alphabet-header span {
            min-width: 0;
            padding: 3px 2px;
            text-align: center;
        }

        .lesson-book .header-part1 {
            background: linear-gradient(100deg, #edf7ff, #e1f0ff);
            color: #246baf;
        }

        .lesson-book .header-part1 span.active {
            background-color: #247dc3;
            color: white;
            padding: 4px 7px;
            border-radius: 6px;
        }

        .lesson-book .header-part2 {
            background: linear-gradient(100deg, #fff0f5, #fde6ef);
            color: #c2185b;
        }

        .lesson-book .main-letter {
            font-size: 4rem;
            font-weight: bold;
            color: var(--lesson-blue);
            text-align: left;
            direction: ltr;
            margin: 3px 0 13px;
            line-height: 1;
            letter-spacing: -0.06em;
        }

        .lesson-book .main-title {
            font-size: 2.2rem;
            font-weight: bold;
            color: #2c3e50;
            text-align: left;
            direction: ltr;
            margin-bottom: 20px;
        }

        .lesson-book .characters-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px;
            direction: ltr;
            margin-top: 15px;
        }

        .lesson-book .character-intro-page .main-title {
            margin-bottom: 10px;
        }

        .lesson-book .character-intro-page .greeting-box {
            padding: 8px 12px;
            margin-bottom: 8px;
        }

        .lesson-book .character-intro-page .characters-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 10px;
            margin-top: 12px;
        }

        .lesson-book .character-intro-page .character-card {
            min-height: 92px;
            padding: 10px;
            gap: 5px;
        }

        .lesson-book .character-card {
            min-height: 150px;
            border: 1px solid #e4eaf0;
            border-radius: 14px;
            padding: 16px;
            text-align: center;
            background: linear-gradient(155deg, #ffffff, #f8fbfd);
            box-shadow: 0 4px 12px rgba(37, 64, 91, 0.05);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }

        .lesson-book .character-name {
            font-size: 1.4rem;
            font-weight: bold;
            color: #2c3e50;
        }

        .lesson-book .alphabet-reference-page .instruction-box {
            background: linear-gradient(110deg, #f8fafc, #f1f5f9);
            border: 1px solid #cbd5e1;
            border-inline-start: 4px solid var(--lesson-blue);
            border-radius: 12px;
            padding: 12px 16px;
            margin-bottom: 18px;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .lesson-book .alphabet-reference-page .instruction-en {
            direction: ltr;
            text-align: left;
            font-size: 0.9rem;
            color: #334155;
            line-height: 1.5;
        }

        .lesson-book .alphabet-reference-page .instruction-ar {
            direction: rtl;
            text-align: right;
            font-size: 0.88rem;
            color: #64748b;
            line-height: 1.5;
        }

        .lesson-book .alphabet-reference-page .alphabet-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 16px;
            direction: ltr;
            margin-top: 10px;
        }

        .lesson-book .alphabet-reference-page .letter-card {
            border: 1px solid #e2e8f0;
            border-radius: 14px;
            padding: 16px 10px;
            text-align: center;
            background: linear-gradient(155deg, #ffffff, #f8fafc);
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.03);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 6px;
            cursor: pointer;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .lesson-book .alphabet-reference-page .letter-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(8, 120, 201, 0.12);
        }

        .lesson-book .alphabet-reference-page .letter-text {
            font-size: 2.8rem;
            font-weight: bold;
            line-height: 1;
            letter-spacing: -0.02em;
        }

        .lesson-book .alphabet-reference-page .color-blue { color: #0088cc; }
        .lesson-book .alphabet-reference-page .color-red { color: #e11d48; }
        .lesson-book .alphabet-reference-page .color-green { color: #16a34a; }
        .lesson-book .alphabet-reference-page .color-orange { color: #ea580c; }
        .lesson-book .alphabet-reference-page .color-purple { color: #9333ea; }
        .lesson-book .alphabet-reference-page .color-teal { color: #0d9488; }

        .lesson-book .vocabulary-reference-page .words-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 8px;
        }

        .lesson-book .vocabulary-reference-page .word-card {
            min-height: 126px;
            padding: 8px 6px 10px;
            border-radius: 11px;
            box-shadow: 0 2px 6px rgba(37, 64, 91, 0.04);
            gap: 3px;
        }

        .lesson-book .word-illustration {
            display: grid;
            place-items: center;
            width: 44px;
            height: 42px;
            margin: 3px auto 1px;
            font-size: 2rem;
            line-height: 1;
        }

        .lesson-book .vocabulary-reference-page .badge-number {
            top: 5px;
            left: 5px;
            min-width: 20px;
            height: 18px;
            padding: 0 3px;
            font-size: 10px;
        }

        .lesson-book .vocabulary-reference-page .english-word {
            padding: 2px 4px;
            font-size: 0.85rem;
            gap: 4px;
        }

        .lesson-book .vocabulary-reference-page .arabic-translation {
            font-size: 0.78rem;
        }

        .lesson-book .alphabet-characters-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 12px;
        }

        .lesson-book .alphabet-characters-grid .character-card {
            min-height: 120px;
            padding: 14px 8px;
        }

        .lesson-book .alphabet-characters-grid .character-name {
            font-size: 1.2rem;
        }

        .lesson-book .greeting-box {
            background: linear-gradient(110deg, #eff9ed, #e8f5e7);
            border: 1px solid #cce5c8;
            border-inline-start: 4px solid #75b96d;
            border-radius: 12px;
            padding: 12px 14px;
            margin-bottom: 17px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
        }

        .lesson-book .greeting-text {
            font-size: 0.95rem;
            color: #2e7d32;
            font-weight: 500;
        }

        .lesson-book .greeting-speaker {
            border: 0;
            padding: 0;
            background: transparent;
            cursor: pointer;
            font-weight: bold;
            color: #1b5e20;
            direction: ltr;
            font-size: 0.96rem;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .lesson-book .song-box {
            background: linear-gradient(145deg, #f5faed, #edf6e2);
            border: 1px solid #d3e5bd;
            border-radius: 14px;
            padding: 14px;
            margin-bottom: 16px;
            text-align: center;
        }

        .lesson-book .song-title {
            border: 0;
            padding: 0;
            background: transparent;
            font: inherit;
            font-size: 1.02rem;
            font-weight: bold;
            color: #33691e;
            margin-bottom: 12px;
            cursor: pointer;
            display: inline-block;
        }

        .lesson-book .song-lines {
            display: flex;
            flex-direction: column;
            gap: 7px;
            font-size: 0.9rem;
            line-height: 1.5;
        }

        .lesson-book .song-line {
            width: 100%;
            background: rgba(255, 255, 255, 0.88);
            padding: 9px 12px;
            border-radius: 9px;
            border: 1px solid #dce9cf;
            cursor: pointer;
            transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
        }

        .lesson-book .song-line:hover {
            background-color: #f7fbeF;
            border-color: #bad49f;
            transform: translateY(-1px);
        }

        .lesson-book .en-text {
            direction: ltr;
            font-weight: bold;
            color: #2e7d32;
        }

        .lesson-book .ar-text {
            direction: rtl;
            color: #555555;
            font-size: 0.88rem;
        }

        .lesson-book .words-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 11px;
            direction: ltr;
            align-content: start;
        }

        .lesson-book .word-card {
            min-height: 137px;
            border: 1px solid #e4eaf0;
            border-radius: 13px;
            padding: 12px 8px 10px;
            text-align: center;
            background: linear-gradient(155deg, #ffffff, #f8fbfd);
            box-shadow: 0 2px 7px rgba(37, 64, 91, 0.04);
            transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 4px;
            position: relative;
        }

        .lesson-book .word-card:hover {
            border-color: #8fc8ef;
            box-shadow: 0 8px 18px rgba(8, 120, 201, 0.12);
            transform: translateY(-2px);
        }

        .lesson-book .card-page2:hover {
            border-color: #efb5cc;
            box-shadow: 0 8px 18px rgba(194, 24, 91, 0.11);
        }

        .lesson-book .badge-number {
            position: absolute;
            top: 8px;
            left: 8px;
            background-color: #e7f3fd;
            color: var(--lesson-blue);
            border-radius: 999px;
            min-width: 25px;
            height: 23px;
            padding: 0 5px;
            font-size: 11px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }

        .lesson-book .badge-page2 {
            background-color: #fceaf1;
            color: var(--lesson-pink);
        }

        .lesson-book .word-image {
            width: 78px;
            height: 68px;
            object-fit: contain;
            margin: 4px 0;
        }

        .lesson-book .english-word {
            border: 0;
            background: transparent;
            padding: 3px 6px;
            border-radius: 7px;
            font-size: 1rem;
            font-weight: bold;
            color: #2c3e50;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
            width: 100%;
        }

        .lesson-book .arabic-translation {
            font-size: 0.88rem;
            color: #66717c;
            direction: rtl;
            font-weight: 600;
        }

        .lesson-book .page-number-footer {
            margin-top: auto;
            text-align: center;
            font-size: 11px;
            color: #88939e;
            padding-top: 10px;
            border-top: 1px solid #edf0f3;
        }

        .lesson-book :is(button, [onclick]):focus-visible {
            outline: 3px solid rgba(8, 120, 201, 0.45);
            outline-offset: 3px;
        }

        @media (prefers-reduced-motion: reduce) {
            .lesson-book *,
            .lesson-book *::before,
            .lesson-book *::after {
                scroll-behavior: auto !important;
                transition-duration: 0.01ms !important;
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
            }
        }

        @media screen and (max-width: 210mm) {
            .lesson-book {
                padding: 12px 6px;
                gap: 16px;
            }

            .lesson-book .a4-page {
                width: 100%;
                max-width: 210mm;
                height: auto;
                min-height: 0;
                padding: clamp(16px, 4vw, 26px);
                border-radius: 14px;
            }

            .lesson-book .words-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .lesson-book .alphabet-characters-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .lesson-book .alphabet-reference-page .alphabet-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }

            .lesson-book .vocabulary-reference-page .words-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }

        @media screen and (max-width: 420px) {
            .lesson-book .print-btn-container {
                align-items: flex-start;
                flex-direction: column;
                gap: 8px;
                padding: 9px 10px;
                font-size: 0.82rem;
            }

            .lesson-book .lesson-tools {
                justify-content: flex-start;
            }

            .lesson-book .print-btn {
                padding: 8px 10px;
                font-size: 0.8rem;
            }

            .lesson-book .lesson-tool,
            .lesson-book .lesson-shape-picker {
                min-height: 34px;
                padding: 6px 8px;
                font-size: 0.75rem;
            }

            .lesson-book .greeting-box {
                align-items: flex-start;
                flex-direction: column;
            }

            .lesson-book .song-line {
                align-items: flex-start;
                flex-direction: column;
                gap: 3px;
            }

            .lesson-book .main-title {
                font-size: 1.8rem;
            }
        }

        @media print {
            @page {
                size: A4 portrait;
                margin: 0;
            }

            body {
                background: none;
                display: block;
                padding: 0;
                margin: 0;
                gap: 0;
            }

            body > *:not(.app-shell),
            .app-shell > .sidebar,
            .main-area > *:not(#lesson-code-page),
            #lesson-code-page > .lesson-code-header {
                display: none !important;
            }

            .app-shell,
            .app-shell > .main-area,
            #lesson-code-page,
            .lesson-code-content {
                display: block !important;
                width: 100% !important;
                min-height: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
                border: 0 !important;
                border-radius: 0 !important;
                box-shadow: none !important;
                overflow: visible !important;
            }

            .lesson-book {
                display: block;
                width: 100%;
                min-height: 0;
                padding: 0;
                background: #fff;
            }

            .lesson-book .print-btn-container {
                display: none !important;
            }

            .lesson-book .a4-page {
                width: 210mm;
                height: 297mm;
                min-height: 297mm;
                max-height: 297mm;
                padding: 12mm 15mm;
                box-shadow: none;
                border: 0;
                border-radius: 0;
                page-break-after: auto;
                break-after: auto;
                box-sizing: border-box;
            }

            .lesson-book .a4-page:not(:last-of-type) {
                page-break-after: always;
                break-after: page;
            }

            .lesson-book .words-grid {
                grid-template-columns: repeat(3, 1fr) !important;
            }

            .lesson-book .alphabet-characters-grid {
                grid-template-columns: repeat(4, 1fr) !important;
            }

            .lesson-book .alphabet-reference-page .alphabet-grid {
                grid-template-columns: repeat(3, 1fr) !important;
            }

            .lesson-book .vocabulary-reference-page .words-grid {
                grid-template-columns: repeat(4, 1fr) !important;
            }

            .lesson-book .word-card:hover {
                box-shadow: none;
                transform: none;
            }
        }
    </style>
</head>
<body>
<div class="lesson-book">

<!-- شريط الطباعة العلوي والمعاينة -->
<div class="print-btn-container">
    <span>الدرس الأول - كتاب الإنجليزية (A4)</span>
    <div class="lesson-tools" role="toolbar" aria-label="أدوات الشرح" hidden>
        <button type="button" class="lesson-tool" data-lesson-tool="pen" aria-pressed="false" title="اختر القلم ثم ارسم على أي صفحة">✏️ قلم</button>
        <button type="button" class="lesson-tool" data-lesson-tool="eraser" aria-pressed="false" title="مرر الممحاة فوق الرسم لإزالته">🧽 ممحاة</button>
        <select class="lesson-shape-picker" data-lesson-shape aria-label="اختر شكلاً هندسياً" title="اختر شكلاً ثم اسحب لرسمه">
            <option value="">◻️ أشكال</option>
            <option value="rectangle">مستطيل</option>
            <option value="ellipse">دائرة / بيضاوي</option>
            <option value="arrow">سهم</option>
        </select>
        <button type="button" class="lesson-tool" data-lesson-tool="text" aria-pressed="false" title="اختر الأداة ثم اضغط على موضع كتابة النص">🔤 كتابة نص</button>
        <input class="lesson-tool lesson-tool-text" data-lesson-text type="text" maxlength="80" placeholder="اكتب النص هنا" aria-label="النص المراد إضافته للصفحة">
        <input class="lesson-tool-color" data-lesson-color type="color" value="#e53935" aria-label="لون الرسم">
        <button type="button" class="lesson-tool lesson-a4-tool" onclick="window.print()">🖨️ طباعة / نشر A4</button>
    </div>
</div>

<!-- ================= الصفحة الأولى: الشخصيات وحواراتهم ================= -->
<div class="a4-page character-intro-page">
    <div>
        <div class="main-title">Meet the characters</div>

        <div class="greeting-box">
            <button type="button" class="greeting-speaker" aria-label="Listen to Andy" onclick="speakText(&quot;Hello, I'm Andy.&quot;)">
                🔊 "Hello, I'm Andy."
            </button>
            <div class="greeting-text">مرحباً، أنا أندي.</div>
        </div>

        <div class="greeting-box">
            <button type="button" class="greeting-speaker" aria-label="Listen to Ben" onclick="speakText(&quot;Hi, I'm Ben!&quot;)">
                🔊 "Hi, I'm Ben!"
            </button>
            <div class="greeting-text">أهلاً، أنا بين!</div>
        </div>

        <div class="greeting-box">
            <button type="button" class="greeting-speaker" aria-label="Listen to Maria" onclick="speakText(&quot;Let's learn the English alphabet.&quot;)">
                🔊 "Let's learn the English alphabet."
            </button>
            <div class="greeting-text">هيا بنا نتعلم الحروف الأبجدية الإنجليزية.</div>
        </div>

        <div class="greeting-box">
            <button type="button" class="greeting-speaker" aria-label="Listen to Max" onclick="speakText('That sounds fun!')">
                🔊 "That sounds fun!"
            </button>
            <div class="greeting-text">هذا يبدو ممتعاً!</div>
        </div>

        <div class="characters-grid">
            <div class="character-card">
                <div class="character-name">Andy</div>
                <div class="greeting-text">أندي</div>
            </div>
            <div class="character-card">
                <div class="character-name">Ben</div>
                <div class="greeting-text">بين</div>
            </div>
            <div class="character-card">
                <div class="character-name">Maria</div>
                <div class="greeting-text">ماريا</div>
            </div>
            <div class="character-card">
                <div class="character-name">Max</div>
                <div class="greeting-text">ماكس</div>
            </div>
            <div class="character-card">
                <div class="character-name">Sara</div>
                <div class="greeting-text">سارة</div>
            </div>
            <div class="character-card">
                <div class="character-name">Sofia</div>
                <div class="greeting-text">صوفيا</div>
            </div>
        </div>
    </div>

    <div class="page-number-footer">صفحة 1</div>
</div>

<!-- ================= الصفحة الثانية: الحروف من A إلى L ================= -->
<div class="a4-page alphabet-reference-page">
    <div>
        <div class="main-title">The alphabet</div>
        <div class="instruction-box">
            <div class="instruction-en">
                The English alphabet has 26 letters. Use capital letters for the first letter of a sentence, the names of people or places, the days of the week, and the months of the year. Use lower-case letters the rest of the time. Listen to each letter and repeat.
            </div>
            <div class="instruction-ar">
                تتكون الأبجدية الإنجليزية من 26 حرفاً. استخدم الحروف الكبيرة لبداية الجمل وأسماء الأشخاص والأماكن وأيام الأسبوع وأشهر السنة، واستخدم الحروف الصغيرة في بقية الأوقات. استمع إلى كل حرف وكرره.
            </div>
        </div>

        <div class="alphabet-grid">
            <div class="letter-card" onclick="speakText('A')"><span class="letter-text color-blue">Aa</span></div>
            <div class="letter-card" onclick="speakText('B')"><span class="letter-text color-red">Bb</span></div>
            <div class="letter-card" onclick="speakText('C')"><span class="letter-text color-green">Cc</span></div>
            <div class="letter-card" onclick="speakText('D')"><span class="letter-text color-orange">Dd</span></div>
            <div class="letter-card" onclick="speakText('E')"><span class="letter-text color-purple">Ee</span></div>
            <div class="letter-card" onclick="speakText('F')"><span class="letter-text color-teal">Ff</span></div>
            <div class="letter-card" onclick="speakText('G')"><span class="letter-text color-blue">Gg</span></div>
            <div class="letter-card" onclick="speakText('H')"><span class="letter-text color-red">Hh</span></div>
            <div class="letter-card" onclick="speakText('I')"><span class="letter-text color-green">Ii</span></div>
            <div class="letter-card" onclick="speakText('J')"><span class="letter-text color-orange">Jj</span></div>
            <div class="letter-card" onclick="speakText('K')"><span class="letter-text color-purple">Kk</span></div>
            <div class="letter-card" onclick="speakText('L')"><span class="letter-text color-teal">Ll</span></div>
        </div>
    </div>

    <div class="page-number-footer">صفحة 2</div>
</div>

<!-- ================= الصفحة الثالثة: الحروف من M إلى Z ================= -->
<div class="a4-page alphabet-reference-page">
    <div>
        <div class="main-title">The alphabet <span class="greeting-text">(continued)</span></div>
        <div class="instruction-box">
            <div class="instruction-en">Continue with the next letters. Select any letter to hear its name, then say it aloud.</div>
            <div class="instruction-ar">تابع الحروف التالية. اضغط على أي حرف للاستماع إلى اسمه، ثم انطقه بنفسك.</div>
        </div>

        <div class="alphabet-grid">
            <div class="letter-card" onclick="speakText('M')"><span class="letter-text color-blue">Mm</span></div>
            <div class="letter-card" onclick="speakText('N')"><span class="letter-text color-red">Nn</span></div>
            <div class="letter-card" onclick="speakText('O')"><span class="letter-text color-green">Oo</span></div>
            <div class="letter-card" onclick="speakText('P')"><span class="letter-text color-orange">Pp</span></div>
            <div class="letter-card" onclick="speakText('Q')"><span class="letter-text color-purple">Qq</span></div>
            <div class="letter-card" onclick="speakText('R')"><span class="letter-text color-teal">Rr</span></div>
            <div class="letter-card" onclick="speakText('S')"><span class="letter-text color-blue">Ss</span></div>
            <div class="letter-card" onclick="speakText('T')"><span class="letter-text color-red">Tt</span></div>
            <div class="letter-card" onclick="speakText('U')"><span class="letter-text color-green">Uu</span></div>
            <div class="letter-card" onclick="speakText('V')"><span class="letter-text color-orange">Vv</span></div>
            <div class="letter-card" onclick="speakText('W')"><span class="letter-text color-purple">Ww</span></div>
            <div class="letter-card" onclick="speakText('X')"><span class="letter-text color-teal">Xx</span></div>
            <div class="letter-card" onclick="speakText('Y')"><span class="letter-text color-blue">Yy</span></div>
            <div class="letter-card" onclick="speakText('Z')"><span class="letter-text color-red">Zz</span></div>
            <div class="letter-card" style="background: linear-gradient(135deg, #eff6ff, #f0fdf4);" onclick="speakText('Alphabet Song')">
                <span style="font-size: 2.2rem;">🎵 🔊</span>
                <span style="font-size: 0.85rem; font-weight: bold; color: #1e293b; margin-top: 4px;">Alphabet Song</span>
            </div>
        </div>
    </div>

    <div class="page-number-footer">صفحة 3</div>
</div>


<!-- ================= مفردات Aa: الصفحتان 4 و5 ================= -->
<div class="a4-page vocabulary-reference-page">
    <div>
        <div class="alphabet-header header-part1">
            <span class="active">Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span>
        </div>
        <div class="main-letter">Aa</div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" aria-label="Listen to greeting" onclick="speakText(&quot;Hello, I'm Andy. Welcome to my town!&quot;)">
                🔊 "Hello, I'm Andy. Welcome to my town!"
            </button>
            <div class="greeting-text">مرحباً، أنا أندي. أهلاً بك في بلدتي!</div>
        </div>
        <div class="words-grid">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="طائرة">✈️</span><button type="button" class="english-word" onclick="speakText('aeroplane')">aeroplane 🔊</button><div class="arabic-translation">طائرة</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="مطار">🛫</span><button type="button" class="english-word" onclick="speakText('airport')">airport 🔊</button><div class="arabic-translation">مطار</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="مريلة">🧑‍🍳</span><button type="button" class="english-word" onclick="speakText('apron')">apron 🔊</button><div class="arabic-translation">مريلة</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="باذنجان">🍆</span><button type="button" class="english-word" onclick="speakText('aubergine')">aubergine 🔊</button><div class="arabic-translation">باذنجان</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="مشمش">🍑</span><button type="button" class="english-word" onclick="speakText('apricot')">apricot 🔊</button><div class="arabic-translation">مشمش</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="أفوكادو">🥑</span><button type="button" class="english-word" onclick="speakText('avocado')">avocado 🔊</button><div class="arabic-translation">أفوكادو</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="تفاحة">🍎</span><button type="button" class="english-word" onclick="speakText('apple')">apple 🔊</button><div class="arabic-translation">تفاحة</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 4</div>
</div>

<div class="a4-page vocabulary-reference-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="song-box">
            <button type="button" class="song-title" onclick="speakText(&quot;Listen and sing. Welcome to Andy's town. There's an artist on the street. The market sells apples and apricots. They're really tasty! What a treat!&quot;)">
                🎵 Listen and sing. (استمع وغنِّ) 🔊
            </button>
            <div class="song-lines">
                <button type="button" class="song-line" onclick="speakText(&quot;Welcome to Andy's town.&quot;)">
                    <div class="en-text">Welcome to Andy's town.</div>
                    <div class="ar-text">مرحباً بكم في بلدة أندي.</div>
                </button>
                <button type="button" class="song-line" onclick="speakText(&quot;There's an artist on the street.&quot;)">
                    <div class="en-text">There's an artist on the street.</div>
                    <div class="ar-text">هناك فنان في الشارع.</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('The market sells apples and apricots.')">
                    <div class="en-text">The market sells apples and apricots.</div>
                    <div class="ar-text">السوق يبيع التفاح والمشمش.</div>
                </button>
                <button type="button" class="song-line" onclick="speakText(&quot;They're really tasty! What a treat!&quot;)">
                    <div class="en-text">They're really tasty! What a treat!</div>
                    <div class="ar-text">إنها لذيذة حقاً! يا له من شيء رائع!</div>
                </button>
            </div>
        </div>
        <div class="words-grid">
            <div class="word-card"><span class="badge-number badge-page2">10</span><span class="word-illustration" role="img" aria-label="سيارة إسعاف">🚑</span><button type="button" class="english-word" onclick="speakText('ambulance')">ambulance 🔊</button><div class="arabic-translation">سيارة إسعاف</div></div>
            <div class="word-card"><span class="badge-number badge-page2">11</span><span class="word-illustration" role="img" aria-label="فن">🎨</span><button type="button" class="english-word" onclick="speakText('art')">art 🔊</button><div class="arabic-translation">فن</div></div>
            <div class="word-card"><span class="badge-number badge-page2">12</span><span class="word-illustration" role="img" aria-label="فنان">🧑‍🎨</span><button type="button" class="english-word" onclick="speakText('artist')">artist 🔊</button><div class="arabic-translation">فنان</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 5</div>
</div>

<!-- ================= مفردات Aa: الصفحتان 6 و7 ================= -->
<div class="a4-page vocabulary-reference-page">
    <div>
        <div class="alphabet-header header-part1">
            <span class="active">Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span>
        </div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText(&quot;Good morning! What time is it?&quot;)">
                🔊 "Good morning! What time is it?"
            </button>
            <div class="greeting-text">صباح الخير! كم الوقت؟</div>
        </div>
        <div class="words-grid">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="منبه">⏰</span><button type="button" class="english-word" onclick="speakText('alarm clock')">alarm clock 🔊</button><div class="arabic-translation">منبه</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="صباح الخير">🌅</span><button type="button" class="english-word" onclick="speakText('good morning')">good morning 🔊</button><div class="arabic-translation">صباح الخير</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="مجسم شخصية">🦸</span><button type="button" class="english-word" onclick="speakText('action figure')">action figure 🔊</button><div class="arabic-translation">مجسم شخصية</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="الأبجدية">🔤</span><button type="button" class="english-word" onclick="speakText('alphabet')">alphabet 🔊</button><div class="arabic-translation">الأبجدية</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="مستيقظ">🌞</span><button type="button" class="english-word" onclick="speakText('awake')">awake 🔊</button><div class="arabic-translation">مستيقظ</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="نائم">😴</span><button type="button" class="english-word" onclick="speakText('asleep')">asleep 🔊</button><div class="arabic-translation">نائم</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="كرسي بمسندين">🛋️</span><button type="button" class="english-word" onclick="speakText('armchair')">armchair 🔊</button><div class="arabic-translation">كرسي بمسندين</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="عنوان منزل">🏠</span><button type="button" class="english-word" onclick="speakText('address')">address 🔊</button><div class="arabic-translation">عنوان</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="مرساة سفينة">⚓</span><button type="button" class="english-word" onclick="speakText('anchor')">anchor 🔊</button><div class="arabic-translation">مرساة سفينة</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="رائد فضاء">👨‍🚀</span><button type="button" class="english-word" onclick="speakText('astronaut')">astronaut 🔊</button><div class="arabic-translation">رائد فضاء</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="تمساح">🐊</span><button type="button" class="english-word" onclick="speakText('alligator')">alligator 🔊</button><div class="arabic-translation">تمساح</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 6</div>
</div>

<div class="a4-page vocabulary-reference-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="words-grid">
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="ممثل">🎭</span><button type="button" class="english-word" onclick="speakText('actor')">actor 🔊</button><div class="arabic-translation">ممثل</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="جمهور">👥</span><button type="button" class="english-word" onclick="speakText('audience')">audience 🔊</button><div class="arabic-translation">جمهور</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="سهم">➡️</span><button type="button" class="english-word" onclick="speakText('arrow')">arrow 🔊</button><div class="arabic-translation">سهم</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="رماية">🏹</span><button type="button" class="english-word" onclick="speakText('archery')">archery 🔊</button><div class="arabic-translation">رماية</div></div>
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="حيوانات">🐾</span><button type="button" class="english-word" onclick="speakText('animals')">animals 🔊</button><div class="arabic-translation">حيوانات</div></div>
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="ظبي">🦌</span><button type="button" class="english-word" onclick="speakText('antelope')">antelope 🔊</button><div class="arabic-translation">ظبي</div></div>
            <div class="word-card"><span class="badge-number">18</span><span class="word-illustration" role="img" aria-label="نملة">🐜</span><button type="button" class="english-word" onclick="speakText('ant')">ant 🔊</button><div class="arabic-translation">نملة</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 7</div>
</div>

</div>
</body>
</html>`;
