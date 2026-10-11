window.itqanLessonHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الدرس الثالث عشر - كتاب اللغة الإنجليزية (الحرف Tt) (A4)</title>
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
    <span>الدرس الثالث عشر - كتاب الإنجليزية (الحرف Tt) (A4)</span>
    <button type="button" class="print-btn" onclick="window.print()">🖨️ طباعة / نشر A4</button>
</div>

<!-- ================= الصفحة الأولى: الأدوات والضفادع (صفحة 104) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span><span>Nn</span><span>Oo</span>
            <span>Pp</span><span>Qq</span><span>Rr</span><span>Ss</span><span class="active" style="background-color: #247dc3; color: white; padding: 4px 6px; border-radius: 6px;">Tt</span>
        </div>
        <div class="main-letter">Tt</div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="علجوم">🐸</span><button type="button" class="english-word" onclick="speakText('toad')">toad 🔊</button><div class="arabic-translation">علجوم (ضفدع جاف)[cite: 102]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="شرغوف">🐟</span><button type="button" class="english-word" onclick="speakText('tadpole')">tadpole 🔊</button><div class="arabic-translation">شرغوف (يرقة الضفدع)[cite: 102]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="سلحفاة">🐢</span><button type="button" class="english-word" onclick="speakText('tortoise')">tortoise 🔊</button><div class="arabic-translation">سلحفاة برية[cite: 102]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="أدوات">🛠️</span><button type="button" class="english-word" onclick="speakText('tools')">tools 🔊</button><div class="arabic-translation">أدوات[cite: 102]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="مثقاب">🪛</span><button type="button" class="english-word" onclick="speakText('drill')">drill 🔊</button><div class="arabic-translation">مثقاب (شريحة)[cite: 102]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="مفك براغي">🔩</span><button type="button" class="english-word" onclick="speakText('screwdriver')">driver 🔊</button><div class="arabic-translation">مفك براغي[cite: 102]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="مفتاح ربط">🔧</span><button type="button" class="english-word" onclick="speakText('spanner')">spanner 🔊</button><div class="arabic-translation">مفتاح ربط[cite: 102]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="برغي">🔩</span><button type="button" class="english-word" onclick="speakText('screw')">screw 🔊</button><div class="arabic-translation">برغي (سدابة)[cite: 102]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="مسمار">📌</span><button type="button" class="english-word" onclick="speakText('nail')">nail 🔊</button><div class="arabic-translation">مسمار[cite: 102]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="صندوق أدوات">🧰</span><button type="button" class="english-word" onclick="speakText('toolbox')">toolbox 🔊</button><div class="arabic-translation">صندوق الأدوات[cite: 102]</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="مطرقة">🔨</span><button type="button" class="english-word" onclick="speakText('hammer')">hammer 🔊</button><div class="arabic-translation">مطرقة[cite: 102]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="شريط قياس">📏</span><button type="button" class="english-word" onclick="speakText('tape measure')">measure 🔊</button><div class="arabic-translation">شريط القياس[cite: 102]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 104[cite: 102]</div>
</div>

<!-- ================= الصفحة الثانية: الطاولة والنمر والمخيم (صفحة 105) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span class="active">Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="طاولة">🪵</span><button type="button" class="english-word" onclick="speakText('table')">table 🔊</button><div class="arabic-translation">طاولة[cite: 104]</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="إبريق شاي">🫖</span><button type="button" class="english-word" onclick="speakText('teapot')">teapot 🔊</button><div class="arabic-translation">إبريق شاي[cite: 104]</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="شاي">🍵</span><button type="button" class="english-word" onclick="speakText('tea')">tea 🔊</button><div class="arabic-translation">شاي[cite: 104]</div></div>
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="محمصة خبز">🍞</span><button type="button" class="english-word" onclick="speakText('toaster')">toaster 🔊</button><div class="arabic-translation">محمصة خبز[cite: 104]</div></div>
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="خبز محمص">🥪</span><button type="button" class="english-word" onclick="speakText('toast')">toast 🔊</button><div class="arabic-translation">خبز محمص[cite: 104]</div></div>
            <div class="word-card"><span class="badge-number">18</span><span class="word-illustration" role="img" aria-label="مفرش طاولة"> tablecloth</span><button type="button" class="english-word" onclick="speakText('tablecloth')">cloth 🔊</button><div class="arabic-translation">مفرش الطاولة[cite: 104]</div></div>
            <div class="word-card"><span class="badge-number">19</span><span class="word-illustration" role="img" aria-label="نمر">🐅</span><button type="button" class="english-word" onclick="speakText('tiger')">tiger 🔊</button><div class="arabic-translation">نمر[cite: 104]</div></div>
            <div class="word-card"><span class="badge-number">20</span><span class="word-illustration" role="img" aria-label="ذيل">🐈‍⬛</span><button type="button" class="english-word" onclick="speakText('tail')">tail 🔊</button><div class="arabic-translation">ذيل الحيوان[cite: 104]</div></div>
            <div class="word-card"><span class="badge-number">21</span><span class="word-illustration" role="img" aria-label="تلسكوب">🔭</span><button type="button" class="english-word" onclick="speakText('telescope')">telescope 🔊</button><div class="arabic-translation">منظار فلكي (تلسكوب)[cite: 104]</div></div>
            <div class="word-card"><span class="badge-number">22</span><span class="word-illustration" role="img" aria-label="خيمة">⛺</span><button type="button" class="english-word" onclick="speakText('tent')">tent 🔊</button><div class="arabic-translation">خيمة[cite: 104]</div></div>
            <div class="word-card"><span class="badge-number">23</span><span class="word-illustration" role="img" aria-label="مصباح يدوي">🔦</span><button type="button" class="english-word" onclick="speakText('torch')">torch 🔊</button><div class="arabic-translation">مصباح يدوي[cite: 104]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 105[cite: 104]</div>
</div>

<!-- ================= الصفحة الثالثة: المرور والتسوق والألعاب (صفحة 106) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span><span>Nn</span><span>Oo</span>
            <span>Pp</span><span>Qq</span><span>Rr</span><span>Ss</span><span class="active" style="background-color: #247dc3; color: white; padding: 4px 6px; border-radius: 6px;">Tt</span>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="مرور">🚗</span><button type="button" class="english-word" onclick="speakText('traffic')">traffic 🔊</button><div class="arabic-translation">حركة المرور[cite: 105]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="إشارات المرور">🚦</span><button type="button" class="english-word" onclick="speakText('traffic lights')">lights 🔊</button><div class="arabic-translation">إشارات المرور[cite: 105]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="جهاز لوحي">📱</span><button type="button" class="english-word" onclick="speakText('tablet')">tablet 🔊</button><div class="arabic-translation">جهاز لوحي[cite: 105]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="تلفاز">📺</span><button type="button" class="english-word" onclick="speakText('television')">television 🔊</button><div class="arabic-translation">تلفاز[cite: 105]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="طماطم">🍅</span><button type="button" class="english-word" onclick="speakTest('tomato')">tomato 🔊</button><div class="arabic-translation">طماطم[cite: 105]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="عربة تسوق">🛒</span><button type="button" class="english-word" onclick="speakTest('trolley')">trolley 🔊</button><div class="arabic-translation">عربة تسوق[cite: 105]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="صندوق الدفع">💻</span><button type="button" class="english-word" onclick="speakTest('till')">till 🔊</button><div class="arabic-translation">ماكينة الدفع (الكاشير)[cite: 105]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="دراجة ثلاثية">🚲</span><button type="button" class="english-word" onclick="speakTest('tricycle')">tricycle 🔊</button><div class="arabic-translation">دراجة ثلاثية العجلات[cite: 105]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="كنز">🪙</span><button type="button" class="english-word" onclick="speakTest('treasure')">treasure 🔊</button><div class="arabic-translation">كنز[cite: 105]</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="ألعاب">🧸</span><button type="button" class="english-word" onclick="speakTest('toys')">toys 🔊</button><div class="arabic-translation">ألعاب[cite: 105]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="قطار ألعاب">🚂</span><button type="button" class="english-word" onclick="speakTest('train set')">set 🔊</button><div class="arabic-translation">مجموعة قطار للعب[cite: 105]</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="دبدوب">🧸</span><button type="button" class="english-word" onclick="speakTest('teddy bear')">bear 🔊</button><div class="arabic-translation">دمية الدب (تيدي)[cite: 105]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 106[cite: 105]</div>
</div>

<!-- ================= الصفحة الرابعة: الملابس والمدينة (صفحة 107) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span class="active">Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="جوارب طويلة">🧦</span><button type="button" class="english-word" onclick="speakText('tights')">tights 🔊</button><div class="arabic-translation">جوارب ضيقة طويلة[cite: 106]</div></div>
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="ربطة عنق">👔</span><button type="button" class="english-word" onclick="speakText('tie')">tie 🔊</button><div class="arabic-translation">ربطة عنق (كرافتة)[cite: 106]</div></div>
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="بنطلون">👖</span><button type="button" class="english-word" onclick="speakText('trousers')">trousers 🔊</button><div class="arabic-translation">بنطلون (سروال)[cite: 106]</div></div>
            <div class="word-card"><span class="badge-number">18</span><span class="word-illustration" role="img" aria-label="قميص قصير الأكمام">👕</span><button type="button" class="english-word" onclick="speakText('T-shirt')">shirt 🔊</button><div class="arabic-translation">قميص قطني (تي شيرت)[cite: 106]</div></div>
            <div class="word-card"><span class="badge-number">19</span><span class="word-illustration" role="img" aria-label="بلوزة علوية">👚</span><button type="button" class="english-word" onclick="speakText('top')">top 🔊</button><div class="arabic-translation">قطعة ملابس علوية[cite: 106]</div></div>
            <div class="word-card"><span class="badge-number">20</span><span class="word-illustration" role="img" aria-label="حذاء رياضي">👟</span><button type="button" class="english-word" onclick="speakText('trainers')">trainers 🔊</button><div class="arabic-translation">أحذية رياضية[cite: 106]</div></div>
            <div class="word-card"><span class="badge-number">21</span><span class="word-illustration" role="img" aria-label="بلدة">🏙️</span><button type="button" class="english-word" onclick="speakText('town')">town 🔊</button><div class="arabic-translation">بلدة / مدينة صغيرة[cite: 106]</div></div>
            <div class="word-card"><span class="badge-number">22</span><span class="word-illustration" role="img" aria-label="متجر ألعاب">🧸</span><button type="button" class="english-word" onclick="speakText('toyshop')">shop 🔊</button><div class="arabic-translation">متجر الألعاب[cite: 106]</div></div>
            <div class="word-card"><span class="badge-number">23</span><span class="word-illustration" role="img" aria-label="مسرح">🎭</span><button type="button" class="english-word" onclick="speakText('theatre')">theatre 🔊</button><div class="arabic-translation">مسرح[cite: 106]</div></div>
            <div class="word-card"><span class="badge-number">24</span><span class="word-illustration" role="img" aria-label="سيارة أجرة">🚕</span><button type="button" class="english-word" onclick="speakText('taxi')">taxi 🔊</button><div class="arabic-translation">سيارة أجرة (تاكسي)[cite: 106]</div></div>
            <div class="word-card"><span class="badge-number">25</span><span class="word-illustration" role="img" aria-label="ترام">🚊</span><button type="button" class="english-word" onclick="speakText('tram')">tram 🔊</button><div class="arabic-translation">قطار ترام كهربائي[cite: 106]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 107[cite: 106]</div>
</div>

<!-- ================= الصفحة الخامسة: الحمام والموسيقى (صفحة 108 و 109) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span><span>Nn</span><span>Oo</span>
            <span>Pp</span><span>Qq</span><span>Rr</span><span>Ss</span><span class="active" style="background-color: #247dc3; color: white; padding: 4px 6px; border-radius: 6px;">Tt</span>
        </div>
        <div class="song-box">
            <button type="button" class="song-title" onclick="speakText('Sara plays the trumpet. Andy plays the tambourine. Maria plays the triangle. They make a great team!')">
                🎵 Listen and sing. (استمع وغنِّ) 🔊
            </button>
            <div class="song-lines">
                <button type="button" class="song-line" onclick="speakText('Sara plays the trumpet (toot-toot).')">
                    <div class="en-text">Sara plays the trumpet (toot-toot).</div>
                    <div class="ar-text">سارة تعزف على البوق (توت-توت).[cite: 108]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('Andy plays the tambourine (tap-tap).')">
                    <div class="en-text">Andy plays the tambourine (tap-tap).</div>
                    <div class="ar-text">أندي يعزف على الدف (تاب-تاب).[cite: 108]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('Maria plays the triangle (ting-a-ling).')">
                    <div class="en-text">Maria plays the triangle (ting-a-ling).</div>
                    <div class="ar-text">ماريا تعزف على المثلث الموسيقي (تنغ-أ-لنغ).[cite: 108]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('They make a great team (clap-clap)!')">
                    <div class="en-text">They make a great team (clap-clap)!</div>
                    <div class="ar-text">إنهم يشكلون فريقاً رائعاً (كناب-كناب/تصفيق)![cite: 108]</div>
                </button>
            </div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="منشفة">🧴</span><button type="button" class="english-word" onclick="speakText('towel')">towel 🔊</button><div class="arabic-translation">منشفة (فوطة)[cite: 107, 108]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="دف">🪘</span><button type="button" class="english-word" onclick="speakText('tambourine')">tambourine 🔊</button><div class="arabic-translation">دف موسيقي[cite: 108]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="بوق">🎺</span><button type="button" class="english-word" onclick="speakText('trumpet')">trumpet 🔊</button><div class="arabic-translation">آلة البوق[cite: 108]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="مثلث موسيقي">📐</span><button type="button" class="english-word" onclick="speakText('triangle')">triangle 🔊</button><div class="arabic-translation">المثلث الموسيقي[cite: 108]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 108 و 109[cite: 107, 108]</div>
</div>

<!-- ================= الصفحة السادسة: المدرسة والقطارات (صفحة 110 و 111) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span class="active">Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="تنس">🎾</span><button type="button" class="english-word" onclick="speakText('tennis')">tennis 🔊</button><div class="arabic-translation">لعبة التنس[cite: 109]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="مضرب تنس">🏸</span><button type="button" class="english-word" onclick="speakText('tennis racket')">racket 🔊</button><div class="arabic-translation">مضرب التنس[cite: 109]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="معلم">👨‍🏫</span><button type="button" class="english-word" onclick="speakText('teacher')">teacher 🔊</button><div class="arabic-translation">معلم / مدرس[cite: 109]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="نفق">🚇</span><button type="button" class="english-word" onclick="speakText('tunnel')">tunnel 🔊</button><div class="arabic-translation">نفق قطار[cite: 109]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="قطار">🚄</span><button type="button" class="english-word" onclick="speakText('train')">train 🔊</button><div class="arabic-translation">قطار سريق[cite: 109]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="جدول مواعيد">📅</span><button type="button" class="english-word" onclick="speakText('timetable')">timetable 🔊</button><div class="arabic-translation">جدول المواعيد[cite: 109]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="تذكرة">🎫</span><button type="button" class="english-word" onclick="speakText('ticket')">ticket 🔊</button><div class="arabic-translation">تذكرة سفر[cite: 109]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="شجرة">🌳</span><button type="button" class="english-word" onclick="speakText('tree')">tree 🔊</button><div class="arabic-translation">شجرة[cite: 110]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="إطار سيارة">🛞</span><button type="button" class="english-word" onclick="speakText('tyre')">tyre 🔊</button><div class="arabic-translation">إطار (عجلة)[cite: 110]</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="جرار زراعي">🚜</span><button type="button" class="english-word" onclick="speakText('tractor')">tractor 🔊</button><div class="arabic-translation">جرار زراعي[cite: 110]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="ديك رومي">🦃</span><button type="button" class="english-word" onclick="speakText('turkey')">turkey 🔊</button><div class="arabic-translation">ديك رومي[cite: 110]</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="تنس طاولة">🏓</span><button type="button" class="english-word" onclick="speakText('table tennis')">tennis 🔊</button><div class="arabic-translation">تنس الطاولة (بينج بونج)[cite: 110]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 110 و 111[cite: 109, 110]</div>
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
