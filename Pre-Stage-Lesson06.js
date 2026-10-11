window.itqanLessonHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الدرس السادس - كتاب اللغة الإنجليزية الحرفين (Gg, Hh) (A4)</title>
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
            border-radius: 999px; مفردات
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
    <span>الدرس السادس - كتاب الإنجليزية (Gg, Hh) (A4)</span>
    <button type="button" class="print-btn" onclick="window.print()">🖨️ طباعة / نشر A4</button>
</div>

<!-- ================= الصفحة الأولى: الحرف Gg والأغنية (صفحة 46) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span class="active">Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span>
        </div>
        <div class="main-letter">Gg</div>
        <div class="song-box">
            <button type="button" class="song-title" onclick="speakText('I walk through my little white gate, and the garden is looking great! The grapes are growing and the carrots, too, and there is a really gorgeous view.')">
                🎵 1 Listen and sing. (استمع وغنِّ) 🔊
            </button>
            <div class="song-lines">
                <button type="button" class="song-line" onclick="speakText('I walk through my little white gate,')">
                    <div class="en-text">I walk through my little white gate,</div>
                    <div class="ar-text">أمشري عبر بوابتي البيضاء الصغيرة[cite: 34]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('and the garden is looking great!')">
                    <div class="en-text">and the garden is looking great!</div>
                    <div class="ar-text">وتدو الحديقة رائعة![cite: 34]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('The grapes are growing and the carrots, too,')">
                    <div class="en-text">The grapes are growing and the carrots, too,</div>
                    <div class="ar-text">العنب ينمو وكذلك الجزر،[cite: 34]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('and there is a really gorgeous view.')">
                    <div class="en-text">and there's a really gorgeous view.</div>
                    <div class="ar-text">وهناك منظر خلاب حقاً.[cite: 34]</div>
                </button>
            </div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="بيت زجاجي">🏡</span><button type="button" class="english-word" onclick="speakText('greenhouse')">greenhouse 🔊</button><div class="arabic-translation">بيت زجاجي[cite: 34]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="زهور">💐</span><button type="button" class="english-word" onclick="speakText('flowers')">flowers 🔊</button><div class="arabic-translation">زهور في السلة[cite: 34]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="نظارات">👓</span><button type="button" class="english-word" onclick="speakText('glasses')">glasses 🔊</button><div class="arabic-translation">نظارات[cite: 34]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="قفازات">🧤</span><button type="button" class="english-word" onclick="speakText('gloves')">gloves 🔊</button><div class="arabic-translation">قفازات[cite: 34]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="عنب">🍇</span><button type="button" class="english-word" onclick="speakText('grapes')">grapes 🔊</button><div class="arabic-translation">عنب[cite: 34]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="حديقة">🌳</span><button type="button" class="english-word" onclick="speakText('garden')">garden 🔊</button><div class="arabic-translation">حديقة[cite: 34]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 46[cite: 34]</div>
</div>

<!-- ================= الصفحة الثانية: الحديقة والجراد (صفحة 47) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('A grasshopper can jump 20 times its body length.')">
                🔊 "A grasshopper can jump 20 times its body length."
            </button>
            <div class="greeting-text">يستطيع الجراد القفز 20 ضعف طول جسمه[cite: 35].</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="بوابة">🚪</span><button type="button" class="english-word" onclick="speakText('gate')">gate 🔊</button><div class="arabic-translation">بوابة[cite: 35]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="ينمو">🌱</span><button type="button" class="english-word" onclick="speakText('grow')">grow 🔊</button><div class="arabic-translation">ينمو[cite: 35]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="عشب">🌿</span><button type="button" class="english-word" onclick="speakText('grass')">grass 🔊</button><div class="arabic-translation">عشب[cite: 35]</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="مرآب سيارات">🚙</span><button type="button" class="english-word" onclick="speakText('garage')">garage 🔊</button><div class="arabic-translation">مرآب[cite: 35]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="جرادة">🦗</span><button type="button" class="english-word" onclick="speakText('grasshopper')">grasshopper 🔊</button><div class="arabic-translation">جرادة[cite: 35]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 47[cite: 35]</div>
</div>

<!-- ================= الصفحة الثالثة: الحيوانات الطويلة والآلات الموسيقية (صفحة 48) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span class="active">Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span>
        </div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('Giraffes are the tallest animals in the world.')">
                🔊 "Giraffes are the tallest animals in the world."
            </button>
            <div class="greeting-text">الزرافات هي أطول الحيوانات في العالم[cite: 36].</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="زرافة">🦒</span><button type="button" class="english-word" onclick="speakText('giraffe')">giraffe 🔊</button><div class="arabic-translation">زرافة[cite: 36]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="غوريلا">🦍</span><button type="button" class="english-word" onclick="speakText('gorilla')">gorilla 🔊</button><div class="arabic-translation">غوريلا[cite: 36]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="غزال">🦌</span><button type="button" class="english-word" onclick="speakText('gazelle')">gazelle 🔊</button><div class="arabic-translation">غزال[cite: 36]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="جيتار">🎸</span><button type="button" class="english-word" onclick="speakText('guitar')">guitar 🔊</button><div class="arabic-translation">جيتار[cite: 36]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="مرمى">⚽</span><button type="button" class="english-word" onclick="speakText('goal')">goal 🔊</button><div class="arabic-translation">مرمى[cite: 36]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="نظارات واقية">🥽</span><button type="button" class="english-word" onclick="speakText('goggles')">goggles 🔊</button><div class="arabic-translation">نظارات سباحة[cite: 36]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 48[cite: 36]</div>
</div>

<!-- ================= الصفحة الرابعة: مفردات إضافية بحرف Gg (صفحة 49) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="ثوم">🧄</span><button type="button" class="english-word" onclick="speakText('garlic')">garlic 🔊</button><div class="arabic-translation">ثوم[cite: 37]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="كوب زجاجي">🥛</span><button type="button" class="english-word" onclick="speakText('glass')">glass 🔊</button><div class="arabic-translation">كوب زجاجي[cite: 37]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="صمغ">🧴</span><button type="button" class="english-word" onclick="speakText('glue')">glue 🔊</button><div class="arabic-translation">صمغ[cite: 37]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="سمكة ذهبية">🐠</span><button type="button" class="english-word" onclick="speakText('goldfish')">goldfish 🔊</button><div class="arabic-translation">سمكة ذهبية[cite: 37]</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="هدية">🎁</span><button type="button" class="english-word" onclick="speakText('gift')">gift 🔊</button><div class="arabic-translation">هدية[cite: 37]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="يعطي">🤝</span><button type="button" class="english-word" onclick="speakText('give')">give 🔊</button><div class="arabic-translation">يعطي[cite: 37]</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="صالة ألعاب رياضية">🏋️‍♂️</span><button type="button" class="english-word" onclick="speakText('gym')">gym 🔊</button><div class="arabic-translation">صالة رياضية[cite: 37]</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="جمباز">🤸‍♀️</span><button type="button" class="english-word" onclick="speakText('gymnastics')">gymnastics 🔊</button><div class="arabic-translation">جمباز[cite: 37]</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="معزة">🐐</span><button type="button" class="english-word" onclick="speakText('goat')">goat 🔊</button><div class="arabic-translation">مازة / عنز[cite: 37]</div></div>
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="وزة">🦢</span><button type="button" class="english-word" onclick="speakText('goose')">goose 🔊</button><div class="arabic-translation">وزة[cite: 37]</div></div>
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="جولف">⛳</span><button type="button" class="english-word" onclick="speakText('golf')">golf 🔊</button><div class="arabic-translation">لعبة الجولف[cite: 37]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 49[cite: 37]</div>
</div>

<!-- ================= الصفحة الخامسة: الحرف Hh ووسائل النقل والمباني (صفحة 50) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span class="active">Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span>
        </div>
        <div class="main-letter">Hh</div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('A sheep, a chicken, and a duck were the first hot-air balloon passengers.')">
                🔊 "A sheep, a chicken, and a duck were the first hot-air balloon passengers."
            </button>
            <div class="greeting-text">كانت خروف ودجاجة وبطة أول ركاب لمنطاد الهواء الساخن[cite: 38].</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="منطاد">🎈</span><button type="button" class="english-word" onclick="speakText('hot-air balloon')">balloon 🔊</button><div class="arabic-translation">منطاد هواء ساخن[cite: 38]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="طائرة عمودية">🚁</span><button type="button" class="english-word" onclick="speakText('helicopter')">helicopter 🔊</button><div class="arabic-translation">مروحية (هليكوبتر)[cite: 38]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="مستشفى">🏥</span><button type="button" class="english-word" onclick="speakText('hospital')">hospital 🔊</button><div class="arabic-translation">مستشفى[cite: 38]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="فندق">🏨</span><button type="button" class="english-word" onclick="speakText('hotel')">hotel 🔊</button><div class="arabic-translation">فندق[cite: 38]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="منزل">🏠</span><button type="button" class="english-word" onclick="speakText('house')">house 🔊</button><div class="arabic-translation">منزل[cite: 38]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="فرس النهر">🦛</span><button type="button" class="english-word" onclick="speakText('hippo')">hippo 🔊</button><div class="arabic-translation">فرس النهر[cite: 38]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="عسل">🍯</span><button type="button" class="english-word" onclick="speakText('honey')">honey 🔊</button><div class="arabic-translation">عسل[cite: 38]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 50[cite: 38]</div>
</div>

<!-- ================= الصفحة السادسة: اليد والملابس والأغراض (صفحة 51) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('There are 27 bones in your hand.')">
                🔊 "There are 27 bones in your hand."
            </button>
            <div class="greeting-text">يوجد 27 عظمة في يدك[cite: 39].</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="يد">✋</span><button type="button" class="english-word" onclick="speakText('hand')">hand 🔊</button><div class="arabic-translation">يد[cite: 39]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="راحت اليد">🤚</span><button type="button" class="english-word" onclick="speakText('palm')">palm 🔊</button><div class="arabic-translation">راحة اليد[cite: 39]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="إهام">👍</span><button type="button" class="english-word" onclick="speakText('thumb')">thumb 🔊</button><div class="arabic-translation">الإبهام[cite: 39]</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="إصبع">☝️</span><button type="button" class="english-word" onclick="speakText('finger')">finger 🔊</button><div class="arabic-translation">إصبع[cite: 39]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="ظفر">💅</span><button type="button" class="english-word" onclick="speakText('fingernail')">fingernail 🔊</button><div class="arabic-translation">ظفر الإصبع[cite: 39]</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="مفصل الإصبع">✊</span><button type="button" class="english-word" onclick="speakText('knuckle')">knuckle 🔊</button><div class="arabic-translation">مفصل الإصبع[cite: 39]</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="رواق / مدخل">🏛️</span><button type="button" class="english-word" onclick="speakText('hall')">hall 🔊</button><div class="arabic-translation">رواق / صالة[cite: 39]</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="قبعة">👒</span><button type="button" class="english-word" onclick="speakText('hat')">hat 🔊</button><div class="arabic-translation">قبعة[cite: 39]</div></div>
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="سماعات رأس">🎧</span><button type="button" class="english-word" onclick="speakText('headphones')">headphones 🔊</button><div class="arabic-translation">سماعات[cite: 39]</div></div>
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="خوذة">🪖</span><button type="button" class="english-word" onclick="speakText('helmet')">helmet 🔊</button><div class="arabic-translation">خوذة[cite: 40]</div></div>
            <div class="word-card"><span class="badge-number">18</span><span class="word-illustration" role="img" aria-label="حقيبة يد">👜</span><button type="button" class="english-word" onclick="speakText('handbag')">handbag 🔊</button><div class="arabic-translation">حقيبة يد[cite: 40]</div></div>
            <div class="word-card"><span class="badge-number">19</span><span class="word-illustration" role="img" aria-label="خطاف">🪝</span><button type="button" class="english-word" onclick="speakText('hook')">hook 🔊</button><div class="arabic-translation">خطاف تعليق[cite: 40]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 51[cite: 39, 40]</div>
</div>

<!-- ================= الصفحة السابعة: الحيوانات والشعر والأغنية (صفحة 52 و 53) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span class="active">Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span>
        </div>
        <div class="song-box">
            <button type="button" class="song-title" onclick="speakText('There is a hedgehog on the grass, and a hummingbird in the sky. There are horses in the stables, where it is nice and dry.')">
                🎵 11 Listen and sing. (استمع وغنِّ) 🔊
            </button>
            <div class="song-lines">
                <button type="button" class="song-line" onclick="speakText('There is a hedgehog on the grass,')">
                    <div class="en-text">There's a hedgehog on the grass,</div>
                    <div class="ar-text">هناك قنفذ على العشب،[cite: 40]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('and a hummingbird in the sky.')">
                    <div class="en-text">and a hummingbird in the sky.</div>
                    <div class="ar-text">وطائر طنان في السماء.[cite: 40]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('There are horses in the stables, where it is nice and dry.')">
                    <div class="en-text">There are horses in the stables, where it's nice and dry.</div>
                    <div class="ar-text">توجد خيول في الإسطبلات، حيث المكان لطيف وجاف.[cite: 40]</div>
                </button>
            </div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="قنفذ">🦔</span><button type="button" class="english-word" onclick="speakText('hedgehog')">hedgehog 🔊</button><div class="arabic-translation">قنفذ[cite: 40]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="طائر طنان">🐦</span><button type="button" class="english-word" onclick="speakText('hummingbird')">hummingbird 🔊</button><div class="arabic-translation">طائر طنان[cite: 40]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="ركوب الخيل">🐎</span><button type="button" class="english-word" onclick="speakText('horse riding')">riding 🔊</button><div class="arabic-translation">ركوب الخيل[cite: 41]</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="قش">🌾</span><button type="button" class="english-word" onclick="speakText('hay')">hay 🔊</button><div class="arabic-translation">قش (تبن)[cite: 41]</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="حصان">🐴</span><button type="button" class="english-word" onclick="speakText('horse')">horse 🔊</button><div class="arabic-translation">حصان[cite: 41]</div></div>
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="حافر">🐎</span><button type="button" class="english-word" onclick="speakText('hoof')">hoof 🔊</button><div class="arabic-translation">حافر[cite: 41]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 52 و 53[cite: 40, 41]</div>
</div>

<!-- ================= الصفحة الثامنة: الصحة والرعاية الطبية (صفحة 54) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="main-title" style="font-size: 1.6rem; margin-bottom: 15px;">Health & Medical</div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="صحة">❤️</span><button type="button" class="english-word" onclick="speakText('health')">health 🔊</button><div class="arabic-translation">الصحة[cite: 42]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="مستشفى">🏥</span><button type="button" class="english-word" onclick="speakText('hospital')">hospital 🔊</button><div class="arabic-translation">مستشفى[cite: 42]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="قناع طبي">😷</span><button type="button" class="english-word" onclick="speakText('mask')">mask 🔊</button><div class="arabic-translation">كمامة / قناع[cite: 42]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="ضمادة">🩹</span><button type="button" class="english-word" onclick="speakText('bandage')">bandage 🔊</button><div class="arabic-translation">ضمادة[cite: 42]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="دواء">💊</span><button type="button" class="english-word" onclick="speakText('medicine')">medicine 🔊</button><div class="arabic-translation">دواء[cite: 42]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="لاصقة جروح">🩹</span><button type="button" class="english-word" onclick="speakText('plaster')">plaster 🔊</button><div class="arabic-translation">لاصة طبية للجروح[cite: 42]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="ميزان حرارة">🌡️</span><button type="button" class="english-word" onclick="speakText('thermometer')">thermometer 🔊</button><div class="arabic-translation">مقياس الحرارة[cite: 42]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="مريض">🧑‍⚕️</span><button type="button" class="english-word" onclick="speakText('patient')">patient 🔊</button><div class="arabic-translation">مريض[cite: 42]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="نقالة إسعاف">🛏️</span><button type="button" class="english-word" onclick="speakText('stretcher')">stretcher 🔊</button><div class="arabic-translation">نقالة إسعاف[cite: 42]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 54[cite: 42]</div>
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
