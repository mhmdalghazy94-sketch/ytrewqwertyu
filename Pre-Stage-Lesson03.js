window.itqanLessonHtml = `html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الدرس الثالث - كتاب اللغة الإنجليزية الحرف (Cc) (A4)</title>
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

        .lesson-book .main-title {
            font-size: 2.2rem;
            font-weight: bold;
            color: #2c3e50;
            text-align: left;
            direction: ltr;
            margin-bottom: 20px;
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
    <span>الدرس الثالث - كتاب الإنجليزية الحرف (Cc) (A4)</span>
    <button type="button" class="print-btn" onclick="window.print()">🖨️ طباعة / نشر A4</button>
</div>

<!-- ================= الصفحة الأولى: الحرف Cc ومفرداته (صفحة 24) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span class="active">Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span>
        </div>
        <div class="main-letter">Cc</div>
        <div class="words-grid">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="غزل البنات">🍬</span><button type="button" class="english-word" onclick="speakText('candyfloss')">candyfloss 🔊</button><div class="arabic-translation">غزل البنات</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="مهرج">🤡</span><button type="button" class="english-word" onclick="speakText('clown')">clown 🔊</button><div class="arabic-translation">مهرج</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="جوز الهند">🥥</span><button type="button" class="english-word" onclick="speakText('coconut')">coconut 🔊</button><div class="arabic-translation">جوز الهند</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="مخلب">🐾</span><button type="button" class="english-word" onclick="speakText('claw')">claw 🔊</button><div class="arabic-translation">مخلب</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="ياقة">👔</span><button type="button" class="english-word" onclick="speakText('collar')">collar 🔊</button><div class="arabic-translation">ياقة القميص</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="قطة">🐈</span><button type="button" class="english-word" onclick="speakText('cat')">cat 🔊</button><div class="arabic-translation">قطة</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="بطاقة">🪪</span><button type="button" class="english-word" onclick="speakText('card')">card 🔊</button><div class="arabic-translation">بطاقة</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="حبوب إفطار">🥣</span><button type="button" class="english-word" onclick="speakText('cereal')">cereal 🔊</button><div class="arabic-translation">حبوب إفطار</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="مشط">梳</span><button type="button" class="english-word" onclick="speakText('comb')">comb 🔊</button><div class="arabic-translation">مشط</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="ملابس">👕</span><button type="button" class="english-word" onclick="speakText('clothes')">clothes 🔊</button><div class="arabic-translation">ملابس</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 24[cite: 12]</div>
</div>

<!-- ================= الصفحة الثانية: السيرك والغرفة (صفحة 25) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('Oh no!')">
                🔊 "Oh no!"
            </button>
            <div class="greeting-text">أوه لا![cite: 13]</div>
        </div>
        <div class="words-grid">
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="يبكي">😢</span><button type="button" class="english-word" onclick="speakText('cry')">cry 🔊</button><div class="arabic-translation">يبكي[cite: 13]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="سيرك">🎪</span><button type="button" class="english-word" onclick="speakText('circus')">circus 🔊</button><div class="arabic-translation">سيرك[cite: 13]</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="سقف">🏠</span><button type="button" class="english-word" onclick="speakText('ceiling')">ceiling 🔊</button><div class="arabic-translation">سقف الغرفة[cite: 13]</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="ستارة">🪟</span><button type="button" class="english-word" onclick="speakText('curtain')">curtain 🔊</button><div class="arabic-translation">ستارة[cite: 13]</div></div>
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="وسادة">🛋️</span><button type="button" class="english-word" onclick="speakText('cushion')">cushion 🔊</button><div class="arabic-translation">وسادة أريكة[cite: 13]</div></div>
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="سجاد">🧶</span><button type="button" class="english-word" onclick="speakText('carpet')">carpet 🔊</button><div class="arabic-translation">سجادة[cite: 13]</div></div>
            <div class="word-card"><span class="badge-number">18</span><span class="word-illustration" role="img" aria-label="خزانة">🗄️</span><button type="button" class="english-word" onclick="speakText('cupboard')">cupboard 🔊</button><div class="arabic-translation">خزانة[cite: 13]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 25[cite: 13]</div>
</div>

<!-- ================= الصفحة الثالثة: الفهد والحاسوب والتكنولوجيا (صفحة 26 و 27) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span class="active">Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span>
        </div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('Cheetahs are the world\'s fastest land animals.')">
                🔊 "Cheetahs are the world's fastest land animals."
            </button>
            <div class="greeting-text">الـفهود هي أسرع حيوانات البر في العالم[cite: 14].</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="فهد">🐆</span><button type="button" class="english-word" onclick="speakText('cheetah')">cheetah 🔊</button><div class="arabic-translation">فهد[cite: 14]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="تمساح">🐊</span><button type="button" class="english-word" onclick="speakText('crocodile')">crocodile 🔊</button><div class="arabic-translation">تمساح[cite: 14]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="صورة">📷</span><button type="button" class="english-word" onclick="speakText('Take a photo!')">photo! 🔊</button><div class="arabic-translation">التقط صورة[cite: 14]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="كاميرا">📸</span><button type="button" class="english-word" onclick="speakText('camera')">camera 🔊</button><div class="arabic-translation">كاميرا[cite: 14]</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="حاسوب">💻</span><button type="button" class="english-word" onclick="speakText('computer')">computer 🔊</button><div class="arabic-translation">حاسوب[cite: 14]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="شاشة">🖥️</span><button type="button" class="english-word" onclick="speakText('screen')">screen 🔊</button><div class="arabic-translation">شاشة[cite: 14]</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="لوحة مفاتيح">⌨️</span><button type="button" class="english-word" onclick="speakText('keyboard')">keyboard 🔊</button><div class="arabic-translation">لوحة مفاتيح[cite: 14]</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="فأرة حاسوب">🖱️</span><button type="button" class="english-word" onclick="speakText('mouse')">mouse 🔊</button><div class="arabic-translation">فأرة[cite: 14]</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="ساعة حائط">⏰</span><button type="button" class="english-word" onclick="speakText('clock')">clock 🔊</button><div class="arabic-translation">ساعة[cite: 14]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 27[cite: 14]</div>
</div>

<!-- ================= الصفحة الرابعة: الألوان (صفحة 28) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="main-title" style="font-size: 1.6rem; margin-bottom: 15px;">Colours</div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="بنفسجي داكن/بني">🟤</span><button type="button" class="english-word" onclick="speakText('brown')">brown 🔊</button><div class="arabic-translation">بني[cite: 16]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="أصفر">🟡</span><button type="button" class="english-word" onclick="speakText('yellow')">yellow 🔊</button><div class="arabic-translation">أصفر[cite: 16]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="أخضر">🟢</span><button type="button" class="english-word" onclick="speakText('green')">green 🔊</button><div class="arabic-translation">أخضر[cite: 16]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="أبيض">⚪</span><button type="button" class="english-word" onclick="speakText('white')">white 🔊</button><div class="arabic-translation">أبيض[cite: 16]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="أحمر">🔴</span><button type="button" class="english-word" onclick="speakText('red')">red 🔊</button><div class="arabic-translation">أحمر[cite: 16]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="وردي">🩷</span><button type="button" class="english-word" onclick="speakText('pink')">pink 🔊</button><div class="arabic-translation">وردي[cite: 16]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="أزرق">🔵</span><button type="button" class="english-word" onclick="speakText('blue')">blue 🔊</button><div class="arabic-translation">أزرق[cite: 16]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="بنفسجي">🟣</span><button type="button" class="english-word" onclick="speakText('purple')">purple 🔊</button><div class="arabic-translation">بنفسجي[cite: 16]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="أسود">⚫</span><button type="button" class="english-word" onclick="speakText('black')">black 🔊</button><div class="arabic-translation">أسود[cite: 16]</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="برتقالي">🟠</span><button type="button" class="english-word" onclick="speakText('orange')">orange 🔊</button><div class="arabic-translation">برتقالي[cite: 16]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="رمادي">🔘</span><button type="button" class="english-word" onclick="speakText('grey')">grey 🔊</button><div class="arabic-translation">رمادي[cite: 16]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 28[cite: 16]</div>
</div>

<!-- ================= الصفحة الخامسة: الخضروات والطعام (صفحة 29) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span class="active">Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span>
        </div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('Not all carrots are orange.')">
                🔊 "Not all carrots are orange."
            </button>
            <div class="greeting-text">ليست كل الجزر برتقالياً[cite: 17].</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="ملفوف">🥬</span><button type="button" class="english-word" onclick="speakText('cabbage')">cabbage 🔊</button><div class="arabic-translation">ملفوف[cite: 17]</div></div>
            <div class="word-card"><span class="badge-number">18</span><span class="word-illustration" role="img" aria-label="قرنبيط">🥦</span><button type="button" class="english-word" onclick="speakText('cauliflower')">cauliflower 🔊</button><div class="arabic-translation">قرنبيط[cite: 17]</div></div>
            <div class="word-card"><span class="badge-number">19</span><span class="word-illustration" role="img" aria-label="لوح تقطيع">🪵</span><button type="button" class="english-word" onclick="speakText('chopping board')">board 🔊</button><div class="arabic-translation">لوح تقطيع[cite: 17]</div></div>
            <div class="word-card"><span class="badge-number">20</span><span class="word-illustration" role="img" aria-label="كرفس">🥬</span><button type="button" class="english-word" onclick="speakText('celery')">celery 🔊</button><div class="arabic-translation">كرفس[cite: 17]</div></div>
            <div class="word-card"><span class="badge-number">21</span><span class="word-illustration" role="img" aria-label="جزر">🥕</span><button type="button" class="english-word" onclick="speakText('carrot')">carrot 🔊</button><div class="arabic-translation">جزر[cite: 17]</div></div>
            <div class="word-card"><span class="badge-number">22</span><span class="word-illustration" role="img" aria-label="خيار">🥒</span><button type="button" class="english-word" onclick="speakText('cucumber')">cucumber 🔊</button><div class="arabic-translation">خيار[cite: 17]</div></div>
            <div class="word-card"><span class="badge-number">23</span><span class="word-illustration" role="img" aria-label="ذرة">🌽</span><button type="button" class="english-word" onclick="speakText('corn')">corn 🔊</button><div class="arabic-translation">ذرة[cite: 17]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 29[cite: 17]</div>
</div>

<!-- ================= الصفحة السادسة: المقهى والأغنية (صفحة 30) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="song-box">
            <button type="button" class="song-title" onclick="speakText('Let us go to the cafe! What can we see? A big bar of chocolate and a cup of coffee. A customer looks at a red lollipop, and points to the cake with a cherry on top.')">
                🎵 9 Listen and sing. (استمع وغنِّ) 🔊
            </button>
            <div class="song-lines">
                <button type="button" class="song-line" onclick="speakText('Let us go to the cafe! What can we see?')">
                    <div class="en-text">Let's go to the café! What can we see?</div>
                    <div class="ar-text">هيا بنا إلى المقهى! ماذا يمكننا أن نرى؟[cite: 18]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('A big bar of chocolate and a cup of coffee.')">
                    <div class="en-text">A big bar of chocolate and a cup of coffee.</div>
                    <div class="ar-text">لوح كبير من الشوكولاتة وفنجان من القهوة.[cite: 18]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('A customer looks at a red lollipop, and points to the cake with a cherry on top.')">
                    <div class="en-text">A customer looks at a red lollipop, and points to the cake with a cherry on top.</div>
                    <div class="ar-text">زبون ينظر إلى مصاصة حمراء، ويشير إلى الكعكة التي تعلوها حبة كرز.[cite: 18]</div>
                </button>
            </div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="جرف صخري">⛰️</span><button type="button" class="english-word" onclick="speakText('cliff')">cliff 🔊</button><div class="arabic-translation">جرف صخري[cite: 18]</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="يتسلق">🧗</span><button type="button" class="english-word" onclick="speakText('climb')">climb 🔊</button><div class="arabic-translation">يتسلق[cite: 18]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="كهف">🕳️</span><button type="button" class="english-word" onclick="speakText('cave')">cave 🔊</button><div class="arabic-translation">كهف[cite: 18]</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="بوصلة">🧭</span><button type="button" class="english-word" onclick="speakText('compass')">compass 🔊</button><div class="arabic-translation">بوصلة[cite: 18]</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="شمال">⬆️</span><button type="button" class="english-word" onclick="speakText('north')">north 🔊</button><div class="arabic-translation">شمال[cite: 18]</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="شرق">➡️</span><button type="button" class="english-word" onclick="speakText('east')">east 🔊</button><div class="arabic-translation">شرق[cite: 18]</div></div>
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="جنوب">⬇️</span><button type="button" class="english-word" onclick="speakText('south')">south 🔊</button><div class="arabic-translation">جنوب[cite: 18]</div></div>
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="غرب">⬅️</span><button type="button" class="english-word" onclick="speakText('west')">west 🔊</button><div class="arabic-translation">غرب[cite: 18]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 30[cite: 18]</div>
</div>

<!-- ================= الصفحة السابعة: التخييم والبحر والطعام (صفحة 31) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span class="active">Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span>
        </div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('Male crabs usually have blue claws.')">
                🔊 "Male crabs usually have blue claws."
            </button>
            <div class="greeting-text">عادة ما تمتلك سرطانات البحر (الكابوريا) الذكور مخالب زرقاء[cite: 19].</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">18</span><span class="word-illustration" role="img" aria-label="مذنب">☄️</span><button type="button" class="english-word" onclick="speakText('comet')">comet 🔊</button><div class="arabic-translation">مذنب[cite: 19]</div></div>
            <div class="word-card"><span class="badge-number">19</span><span class="word-illustration" role="img" aria-label="منزل متنقل">🚐</span><button type="button" class="english-word" onclick="speakText('caravan')">caravan 🔊</button><div class="arabic-translation">منزل متنقل[cite: 19]</div></div>
            <div class="word-card"><span class="badge-number">20</span><span class="word-illustration" role="img" aria-label="خيمة تخييم">⛺</span><button type="button" class="english-word" onclick="speakText('camp')">camp 🔊</button><div class="arabic-translation">يخيم / مخيم[cite: 19]</div></div>
            <div class="word-card"><span class="badge-number">21</span><span class="word-illustration" role="img" aria-label="معطف">🧥</span><button type="button" class="english-word" onclick="speakText('coat')">coat 🔊</button><div class="arabic-translation">معطف[cite: 19]</div></div>
            <div class="word-card"><span class="badge-number">22</span><span class="word-illustration" role="img" aria-label="نار مخيم">🔥</span><button type="button" class="english-word" onclick="speakText('campfire')">campfire 🔊</button><div class="arabic-translation">نار التخييم[cite: 19]</div></div>
            <div class="word-card"><span class="badge-number">24</span><span class="word-illustration" role="img" aria-label="مرجان">🪸</span><button type="button" class="english-word" onclick="speakText('coral')">coral 🔊</button><div class="arabic-translation">مرجان[cite: 19]</div></div>
            <div class="word-card"><span class="badge-number">25</span><span class="word-illustration" role="img" aria-label="سرطان البحر">🦀</span><button type="button" class="english-word" onclick="speakText('crab')">crab 🔊</button><div class="arabic-translation">سرطان البحر[cite: 19]</div></div>
            <div class="word-card"><span class="badge-number">26</span><span class="word-illustration" role="img" aria-label="جبن">🧀</span><button type="button" class="english-word" onclick="speakText('cheese')">cheese 🔊</button><div class="arabic-translation">جبن[cite: 19]</div></div>
            <div class="word-card"><span class="badge-number">27</span><span class="word-illustration" role="img" aria-label="دجاج">🍗</span><button type="button" class="english-word" onclick="speakText('chicken')">chicken 🔊</button><div class="arabic-translation">دجاج[cite: 19]</div></div>
            <div class="word-card"><span class="badge-number">28</span><span class="word-illustration" role="img" aria-label="رقائق بطاطس">🍟</span><button type="button" class="english-word" onclick="speakText('chips')">chips 🔊</button><div class="arabic-translation">بطاطس مقلية[cite: 19]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 31[cite: 19]</div>
</div>

<!-- ================= الصفحة الثامنة: القصص المصورة والحيوانات والريف (صفحة 32) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('Caterpillars turn into butterflies.')">
                🔊 "Caterpillars turn into butterflies."
            </button>
            <div class="greeting-text">تتحول اليرقات إلى فراشات[cite: 20].</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="قصة مصورة">📖</span><button type="button" class="english-word" onclick="speakText('comic book')">book 🔊</button><div class="arabic-translation">قصة مصورة[cite: 20]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="تاج">👑</span><button type="button" class="english-word" onclick="speakText('crown')">crown 🔊</button><div class="arabic-translation">تاج[cite: 20]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="قلعة">🏰</span><button type="button" class="english-word" onclick="speakText('castle')">castle 🔊</button><div class="arabic-translation">قلعة[cite: 20]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="ركن">📐</span><button type="button" class="english-word" onclick="speakText('corner')">corner 🔊</button><div class="arabic-translation">ركن[cite: 20]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="مركز">🎯</span><button type="button" class="english-word" onclick="speakText('centre')">centre 🔊</button><div class="arabic-translation">مركز[cite: 20]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="شبكة عنكبوت">🕸️</span><button type="button" class="english-word" onclick="speakText('cobweb')">cobweb 🔊</button><div class="arabic-translation">شبكة عنكبوت[cite: 20]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="بقرة">🐄</span><button type="button" class="english-word" onclick="speakText('cow')">cow 🔊</button><div class="arabic-translation">بقرة[cite: 20]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="يرقة">🐛</span><button type="button" class="english-word" onclick="speakText('caterpillar')">caterpillar 🔊</button><div class="arabic-translation">يرقة[cite: 20]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="دجاجة">🐓</span><button type="button" class="english-word" onclick="speakText('chicken')">chicken 🔊</button><div class="arabic-translation">دجاجة[cite: 20]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="صكوك دجاجة / كتكوت">🐥</span><button type="button" class="english-word" onclick="speakText('chick')">chick 🔊</button><div class="arabic-translation">كتكوت[cite: 20]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 32[cite: 20]</div>
</div>

<!-- ================= الصفحة التاسعة: معالم المدينة والمقهى (صفحة 33) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span class="active">Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span>
        </div>
        <div class="main-title" style="font-size: 1.6rem; margin-bottom: 15px;">Café & City</div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="مدينة">🏙️</span><button type="button" class="english-word" onclick="speakText('city')">city 🔊</button><div class="arabic-translation">مدينة[cite: 21]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="سحاب">☁️</span><button type="button" class="english-word" onclick="speakText('cloud')">cloud 🔊</button><div class="arabic-translation">سحابة[cite: 21]</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="مقهى">☕</span><button type="button" class="english-word" onclick="speakText('café')">café 🔊</button><div class="arabic-translation">مقهى[cite: 21]</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="سينما">🎬</span><button type="button" class="english-word" onclick="speakText('cinema')">cinema 🔊</button><div class="arabic-translation">سينما[cite: 21]</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="موقف سيارات">🅿️</span><button type="button" class="english-word" onclick="speakText('car park')">park 🔊</button><div class="arabic-translation">موقف سيارات[cite: 21]</div></div>
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="يقود دراجة">🚴</span><button type="button" class="english-word" onclick="speakText('cycle')">cycle 🔊</button><div class="arabic-translation">يركب دراجة[cite: 21]</div></div>
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="سيارة">🚗</span><button type="button" class="english-word" onclick="speakText('car')">car 🔊</button><div class="arabic-translation">سيارة[cite: 21]</div></div>
            <div class="word-card"><span class="badge-number">18</span><span class="word-illustration" role="img" aria-label="شمعة">🕯️</span><button type="button" class="english-word" onclick="speakText('candle')">candle 🔊</button><div class="arabic-translation">شمعة[cite: 21]</div></div>
            <div class="word-card"><span class="badge-number">19</span><span class="word-illustration" role="img" aria-label="عيدان طعام">🥢</span><button type="button" class="english-word" onclick="speakText('chopsticks')">chopsticks 🔊</button><div class="arabic-translation">عيدان الأكل[cite: 21]</div></div>
            <div class="word-card"><span class="badge-number">20</span><span class="word-illustration" role="img" aria-label="يطبخ">👨‍🍳</span><button type="button" class="english-word" onclick="speakText('cook')">cook 🔊</button><div class="arabic-translation">يطبخ[cite: 21]</div></div>
            <div class="word-card"><span class="badge-number">21</span><span class="word-illustration" role="img" aria-label="طاهٍ">🧑‍🍳</span><button type="button" class="english-word" onclick="speakText('chef')">chef 🔊</button><div class="arabic-translation">طاهٍ[cite: 21]</div></div>
            <div class="word-card"><span class="badge-number">22</span><span class="word-illustration" role="img" aria-label="موقد">🍳</span><button type="button" class="english-word" onclick="speakText('cooker')">cooker 🔊</button><div class="arabic-translation">موقد طهي[cite: 21]</div></div>
            <div class="word-card"><span class="badge-number">23</span><span class="word-illustration" role="img" aria-label="جمل">🐪</span><button type="button" class="english-word" onclick="speakText('camel')">camel 🔊</button><div class="arabic-translation">جمل[cite: 21]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 33[cite: 21]</div>
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
</html>
`;
