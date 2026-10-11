window.itqanLessonHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الدرس الخامس عشر - كتاب اللغة الإنجليزية (الحروف Xx, Yy, Zz) (A4)</title>
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

        .lesson-book .alphabet-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 2px;
            padding: 9px 10px;
            border-radius: 11px;
            font-weight: bold;
            font-size: 0.8rem;
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
            padding: 4px 6px;
            border-radius: 6px;
        }

        .lesson-book .header-part2 {
            background: linear-gradient(100deg, #fff0f5, #fde6ef);
            color: #c2185b;
        }

        .lesson-book .header-part2 span.active {
            background-color: #c2185b;
            color: white;
            padding: 4px 6px;
            border-radius: 6px;
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
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
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
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 4px;
            position: relative;
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

        .lesson-book .word-illustration {
            display: grid;
            place-items: center;
            width: 44px;
            height: 42px;
            margin: 3px auto 1px;
            font-size: 2rem;
            line-height: 1;
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
    <span>الدرس الخامس عشر - كتاب الإنجليزية (الحروف Xx, Yy, Zz) (A4)</span>
    <button type="button" class="print-btn" onclick="window.print()">🖨️ طباعة / نشر A4</button>
</div>

<!-- ================= الصفحة الأولى: الحرفين Xx و Yy (صفحة 118) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span><span>Nn</span><span>Oo</span>
            <span>Pp</span><span>Qq</span><span>Rr</span><span>Ss</span><span>Tt</span>
            <span>Uu</span><span>Vv</span><span>Ww</span><span class="active" style="background-color: #247dc3; color: white; padding: 4px 6px; border-radius: 6px;">Xx</span><span>Yy</span>
        </div>
        <div class="main-letter">Xx & Yy</div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="أشعة سينية">🩻</span><button type="button" class="english-word" onclick="speakText('x-ray')">x-ray 🔊</button><div class="arabic-translation">أشعة سينية (إكس-راي)[cite: 124]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="زيلوفون">🎹</span><button type="button" class="english-word" onclick="speakText('xylophone')">xylophone 🔊</button><div class="arabic-translation">آلة الزيلوفون[cite: 124]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="يوغا">🧘‍♀️</span><button type="button" class="english-word" onclick="speakText('yoga')">yoga 🔊</button><div class="arabic-translation">رياضة اليوغا[cite: 124]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="يتثاءب">🥱</span><button type="button" class="english-word" onclick="speakText('yawn')">yawn 🔊</button><div class="arabic-translation">يتثاءب[cite: 124]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="لعبة اليويو">🪀</span><button type="button" class="english-word" onclick="speakText('yo-yo')">yo-yo 🔊</button><div class="arabic-translation">لعبة اليويو[cite: 124]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="يخت">🛥️</span><button type="button" class="english-word" onclick="speakText('yacht')">yacht 🔊</button><div class="arabic-translation">يخت بحري[cite: 124]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="زبادي">🥣</span><button type="button" class="english-word" onclick="speakText('yoghurt')">yoghurt 🔊</button><div class="arabic-translation">زبادي (لبن رائب)[cite: 124]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 118[cite: 124]</div>
</div>

<!-- ================= الصفحة الثانية: الحرف Zz والأغنية والحديقة (صفحة 119) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span class="active">Zz</span>
        </div>
        <div class="song-box">
            <button type="button" class="song-title" onclick="speakText('It is a lovely day! What shall we do? Let us play the xylophone, then go to the zoo. I can see a zebra and there is a lion, too! I end the day with yoga. What about you?')">
                🎵 Listen and sing. (استمع وغنِّ) 🔊
            </button>
            <div class="song-lines">
                <button type="button" class="song-line" onclick="speakText('It is a lovely day! What shall we do?')">
                    <div class="en-text">It's a lovely day! What shall we do?</div>
                    <div class="ar-text">إنه يوم جميل! ماذا عسانا أن نفعل؟[cite: 125]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('Let us play the xylophone, then go to the zoo.')">
                    <div class="en-text">Let's play the xylophone, then go to the zoo.</div>
                    <div class="ar-text">دعونا نعزف على الزيلوفون، ثم نذهب إلى حديقة الحيوان.[cite: 125]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('I can see a zebra and there is a lion, too!')">
                    <div class="en-text">I can see a zebra and there's a lion, too!</div>
                    <div class="ar-text">أستطيع أن أرى حماراً وحشياً وهناك أسد أيضاً![cite: 125]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('I end the day with yoga. What about you?')">
                    <div class="en-text">I end the day with yoga. What about you?</div>
                    <div class="ar-text">أختم يومي باليوغا. ماذا عنك؟[cite: 125]</div>
                </button>
            </div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="حديقة حيوان">🦁</span><button type="button" class="english-word" onclick="speakText('zoo')">zoo 🔊</button><div class="arabic-translation">حديقة الحيوان[cite: 125]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="حمار وحشي">🦓</span><button type="button" class="english-word" onclick="speakText('zebra')">zebra 🔊</button><div class="arabic-translation">حمار وحشي[cite: 125]</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="خط متعرج">〰️</span><button type="button" class="english-word" onclick="speakText('zigzag')">zigzag 🔊</button><div class="arabic-translation">خط متعرج[cite: 125]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="سحاب ملابس">🧥</span><button type="button" class="english-word" onclick="speakText('zip')">zip 🔊</button><div class="arabic-translation">سحاب (سوستة)[cite: 125]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 119[cite: 125]</div>
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
