window.itqanLessonHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الدرس السادس عشر - كتاب اللغة الإنجليزية (الأرقام، الوقت، العكس والصفات) (A4)</title>
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

        .lesson-book .section-title {
            font-size: 1.25rem;
            font-weight: bold;
            color: var(--lesson-blue);
            margin-bottom: 12px;
            border-bottom: 2px solid var(--lesson-blue-soft);
            padding-bottom: 6px;
        }

        .lesson-book .words-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 10px;
            direction: ltr;
            align-content: start;
        }

        .lesson-book .word-card {
            min-height: 115px;
            border: 1px solid #e4eaf0;
            border-radius: 11px;
            padding: 10px 6px;
            text-align: center;
            background: linear-gradient(155deg, #ffffff, #f8fbfd);
            box-shadow: 0 2px 7px rgba(37, 64, 91, 0.04);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 3px;
            position: relative;
        }

        .lesson-book .badge-number {
            position: absolute;
            top: 6px;
            left: 6px;
            background-color: #e7f3fd;
            color: var(--lesson-blue);
            border-radius: 999px;
            min-width: 22px;
            height: 20px;
            padding: 0 4px;
            font-size: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }

        .lesson-book .english-word {
            border: 0;
            background: transparent;
            padding: 2px 4px;
            border-radius: 6px;
            font-size: 0.92rem;
            font-weight: bold;
            color: #2c3e50;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            width: 100%;
        }

        .lesson-book .arabic-translation {
            font-size: 0.82rem;
            color: #66717c;
            direction: rtl;
            font-weight: 600;
        }

        .lesson-book .page-number-footer {
            margin-top: auto;
            text-align: center;
            font-size: 11px;
            color: #88939e;
            padding-top: 8px;
            border-top: 1px solid #edf0f3;
        }

        @media print {
            @page {
                size: A4 portrait;
                margin: 0;
            }
            body {
                background: none;
                padding: 0;
                margin: 0;
            }
            .lesson-book .print-btn-container {
                display: none !important;
            }
            .lesson-book .a4-page {
                width: 210mm;
                height: 297mm;
                min-height: 297mm;
                padding: 12mm 15mm;
                box-shadow: none;
                border: 0;
                border-radius: 0;
                page-break-after: always;
            }
        }
    </style>
</head>
<body>
<div class="lesson-book">

<div class="print-btn-container">
    <span>الدرس السادس عشر - كتاب الإنجليزية (مرجع المفردات والأرقام والمشاعر) (A4)</span>
    <button type="button" class="print-btn" onclick="window.print()">🖨️ طباعة / نشر A4</button>
</div>

<!-- ================= الصفحة الأولى: الأرقام والفصول (صفحة 120 و 121) ================= -->
<div class="a4-page">
    <div>
        <div class="section-title">Numbers & Classroom (الأرقام والفصل المدرسي)</div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><button type="button" class="english-word" onclick="speakText('zero')">zero 🔊</button><div class="arabic-translation">صفر[cite: 93]</div></div>
            <div class="word-card"><span class="badge-number">2</span><button type="button" class="english-word" onclick="speakText('ten')">ten 🔊</button><div class="arabic-translation">عشرة[cite: 93]</div></div>
            <div class="word-card"><span class="badge-number">3</span><button type="button" class="english-word" onclick="speakText('twenty')">twenty 🔊</button><div class="arabic-translation">عشرون[cite: 93]</div></div>
            <div class="word-card"><span class="badge-number">4</span><button type="button" class="english-word" onclick="speakText('thirty')">thirty 🔊</button><div class="arabic-translation">ثلاثون[cite: 93]</div></div>
            <div class="word-card"><span class="badge-number">5</span><button type="button" class="english-word" onclick="speakText('forty')">forty 🔊</button><div class="arabic-translation">أربعون[cite: 93]</div></div>
            <div class="word-card"><span class="badge-number">6</span><button type="button" class="english-word" onclick="speakText('fifty')">fifty 🔊</button><div class="arabic-translation">خمسون[cite: 93]</div></div>
            <div class="word-card"><span class="badge-number">7</span><button type="button" class="english-word" onclick="speakText('sixty')">sixty 🔊</button><div class="arabic-translation">ستون[cite: 93]</div></div>
            <div class="word-card"><span class="badge-number">8</span><button type="button" class="english-word" onclick="speakText('seventy')">seventy 🔊</button><div class="arabic-translation">سبعون[cite: 93]</div></div>
            <div class="word-card"><span class="badge-number">9</span><button type="button" class="english-word" onclick="speakText('eighty')">eighty 🔊</button><div class="arabic-translation">ثمانون[cite: 93]</div></div>
            <div class="word-card"><span class="badge-number">10</span><button type="button" class="english-word" onclick="speakText('ninety')">ninety 🔊</button><div class="arabic-translation">تسعون[cite: 93]</div></div>
            <div class="word-card"><span class="badge-number">20</span><button type="button" class="english-word" onclick="speakText('one hundred')">hundred 🔊</button><div class="arabic-translation">مائة[cite: 93]</div></div>
            <div class="word-card"><span class="badge-number">21</span><button type="button" class="english-word" onclick="speakText('one thousand')">thousand 🔊</button><div class="arabic-translation">ألف[cite: 93]</div></div>
        </div>

        <div class="section-title" style="margin-top: 15px;">In the Classroom (في الفصل)</div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">23</span><button type="button" class="english-word" onclick="speakText('add')">add 🔊</button><div class="arabic-translation">يجمع (أرقام)[cite: 94]</div></div>
            <div class="word-card"><span class="badge-number">24</span><button type="button" class="english-word" onclick="speakText('answer')">answer 🔊</button><div class="arabic-translation">يجيب[cite: 94]</div></div>
            <div class="word-card"><span class="badge-number">25</span><button type="button" class="english-word" onclick="speakText('ask')">ask 🔊</button><div class="arabic-translation">يسأل[cite: 94]</div></div>
            <div class="word-card"><span class="badge-number">26</span><button type="button" class="english-word" onclick="speakText('colour in')">colour in 🔊</button><div class="arabic-translation">يلون[cite: 94]</div></div>
            <div class="word-card"><span class="badge-number">27</span><button type="button" class="english-word" onclick="speakText('count')">count 🔊</button><div class="arabic-translation">يعد / يحسب[cite: 94]</div></div>
            <div class="word-card"><span class="badge-number">31</span><button type="button" class="english-word" onclick="speakText('read')">read 🔊</button><div class="arabic-translation">يقرأ[cite: 94]</div></div>
            <div class="word-card"><span class="badge-number">33</span><button type="button" class="english-word" onclick="speakText('spell')">spell 🔊</button><div class="arabic-translation">يتهجى الحروف[cite: 94]</div></div>
            <div class="word-card"><span class="badge-number">34</span><button type="button" class="english-word" onclick="speakText('write')">write 🔊</button><div class="arabic-translation">يكتب[cite: 94]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 120 و 121[cite: 93, 94]</div>
</div>

<!-- ================= الصفحة الثانية: الوقت والمشاعر (صفحة 122 و 125) ================= -->
<div class="a4-page">
    <div>
        <div class="section-title">Time & Calendar (الوقت والتقويم)</div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><button type="button" class="english-word" onclick="speakText('clock')">clock 🔊</button><div class="arabic-translation">ساعة[cite: 95]</div></div>
            <div class="word-card"><span class="badge-number">2</span><button type="button" class="english-word" onclick="speakText('hour')">hour 🔊</button><div class="arabic-translation">ساعة (زمنية)[cite: 95]</div></div>
            <div class="word-card"><span class="badge-number">3</span><button type="button" class="english-word" onclick="speakText('minute')">minute 🔊</button><div class="arabic-translation">دقيقة[cite: 95]</div></div>
            <div class="word-card"><span class="badge-number">4</span><button type="button" class="english-word" onclick="speakText('second')">second 🔊</button><div class="arabic-translation">ثانية[cite: 95]</div></div>
            <div class="word-card"><span class="badge-number">5</span><button type="button" class="english-word" onclick="speakText('midday')">midday 🔊</button><div class="arabic-translation">منتصف النهار[cite: 95]</div></div>
            <div class="word-card"><span class="badge-number">6</span><button type="button" class="english-word" onclick="speakText('midnight')">midnight 🔊</button><div class="arabic-translation">منتصف الليل[cite: 95]</div></div>
            <div class="word-card"><span class="badge-number">7</span><button type="button" class="english-word" onclick="speakText('day')">day 🔊</button><div class="arabic-translation">يوم[cite: 95]</div></div>
            <div class="word-card"><span class="badge-number">8</span><button type="button" class="english-word" onclick="speakText('week')">week 🔊</button><div class="arabic-translation">أسبوع[cite: 95]</div></div>
            <div class="word-card"><span class="badge-number">10</span><button type="button" class="english-word" onclick="speakText('month')">month 🔊</button><div class="arabic-translation">شهر[cite: 95]</div></div>
        </div>

        <div class="section-title" style="margin-top: 15px;">Feelings (المشاعر والأحاسيس)</div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">13</span><button type="button" class="english-word" onclick="speakText('happy')">happy 🔊</button><div class="arabic-translation">سعيد[cite: 98]</div></div>
            <div class="word-card"><span class="badge-number">14</span><button type="button" class="english-word" onclick="speakText('sad')">sad 🔊</button><div class="arabic-translation">حزين[cite: 98]</div></div>
            <div class="word-card"><span class="badge-number">15</span><button type="button" class="english-word" onclick="speakText('surprised')">surprised 🔊</button><div class="arabic-translation">متفاجئ[cite: 98]</div></div>
            <div class="word-card"><span class="badge-number">16</span><button type="button" class="english-word" onclick="speakText('angry')">angry 🔊</button><div class="arabic-translation">غاضب[cite: 98]</div></div>
            <div class="word-card"><span class="badge-number">17</span><button type="button" class="english-word" onclick="speakText('scared')">scared 🔊</button><div class="arabic-translation">خائف[cite: 98]</div></div>
            <div class="word-card"><span class="badge-number">19</span><button type="button" class="english-word" onclick="speakText('thirsty')">thirsty 🔊</button><div class="arabic-translation">عطشان[cite: 98]</div></div>
            <div class="word-card"><span class="badge-number">20</span><button type="button" class="english-word" onclick="speakText('hungry')">hungry 🔊</button><div class="arabic-translation">جائع[cite: 98]</div></div>
            <div class="word-card"><span class="badge-number">21</span><button type="button" class="english-word" onclick="speakText('shy')">shy 🔊</button><div class="arabic-translation">خجول[cite: 98]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 122 و 125[cite: 95, 98]</div>
</div>

<!-- ================= الصفحة الثالثة: العكسيات والصفات (صفحة 126 إلى 129) ================= -->
<div class="a4-page">
    <div>
        <div class="section-title">Opposites & Descriptions (العكسيات والصفات)</div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">3</span><button type="button" class="english-word" onclick="speakText('young')">young 🔊</button><div class="arabic-translation">صغير السن[cite: 99]</div></div>
            <div class="word-card"><span class="badge-number">4</span><button type="button" class="english-word" onclick="speakText('old')">old 🔊</button><div class="arabic-translation">كبير السن / قديم[cite: 99]</div></div>
            <div class="word-card"><span class="badge-number">5</span><button type="button" class="english-word" onclick="speakText('easy')">easy 🔊</button><div class="arabic-translation">سهل[cite: 99]</div></div>
            <div class="word-card"><span class="badge-number">6</span><button type="button" class="english-word" onclick="speakText('difficult')">difficult 🔊</button><div class="arabic-translation">صعب[cite: 99]</div></div>
            <div class="word-card"><span class="badge-number">7</span><button type="button" class="english-word" onclick="speakText('light')">light 🔊</button><div class="arabic-translation">خفيف الوزن / مضيء[cite: 99]</div></div>
            <div class="word-card"><span class="badge-number">8</span><button type="button" class="english-word" onclick="speakText('heavy')">heavy 🔊</button><div class="arabic-translation">ثقيل[cite: 99]</div></div>
            <div class="word-card"><span class="badge-number">11</span><button type="button" class="english-word" onclick="speakText('cheap')">cheap 🔊</button><div class="arabic-translation">رخيص الثمن[cite: 99]</div></div>
            <div class="word-card"><span class="badge-number">12</span><button type="button" class="english-word" onclick="speakText('expensive')">expensive 🔊</button><div class="arabic-translation">باهظ الثمن[cite: 99]</div></div>
            <div class="word-card"><span class="badge-number">17</span><button type="button" class="english-word" onclick="speakText('big')">big 🔊</button><div class="arabic-translation">كبير[cite: 102]</div></div>
            <div class="word-card"><span class="badge-number">18</span><button type="button" class="english-word" onclick="speakText('small')">small 🔊</button><div class="arabic-translation">صغير[cite: 102]</div></div>
            <div class="word-card"><span class="badge-number">25</span><button type="button" class="english-word" onclick="speakText('quiet')">quiet 🔊</button><div class="arabic-translation">هادئ[cite: 102]</div></div>
            <div class="word-card"><span class="badge-number">26</span><button type="button" class="english-word" onclick="speakText('loud')">loud 🔊</button><div class="arabic-translation">صاخب / مرتفع الصوت[cite: 102]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 126 إلى 129[cite: 99, 102]</div>
</div>

</div>

<script>
    function speakText(text) {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            window.speechSynthesis.speak(utterance);
        }
    }
</script>
</body>
</html>`;
