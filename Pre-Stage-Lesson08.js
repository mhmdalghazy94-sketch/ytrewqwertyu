window.itqanLessonHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الدرس الثامن - كتاب اللغة الإنجليزية (Ll, Mm) (A4)</title>
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
    <span>الدرس الثامن - كتاب الإنجليزية (Ll, Mm) (A4)</span>
    <button type="button" class="print-btn" onclick="window.print()">🖨️ طباعة / نشر A4</button>
</div>

<!-- ================= الصفحة الأولى: الحرف Ll والأغنية (صفحة 62) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span class="active">Ll</span><span>Mm</span>
        </div>
        <div class="main-letter">Ll</div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('Lions sleep for up to 20 hours a day.')">
                🔊 "Lions sleep for up to 20 hours a day."
            </button>
            <div class="greeting-text">تنام الأسود لمدة تصل إلى 20 ساعة في اليوم[cite: 50].</div>
        </div>
        <div class="song-box">
            <button type="button" class="song-title" onclick="speakText('Lions love to sleep in the sun. Leopards like to go for a run. Lizards climb trees and hide under rocks. If you look closely you might find one!')">
                🎵 4 Listen and sing. (استمع وغنِّ) 🔊
            </button>
            <div class="song-lines">
                <button type="button" class="song-line" onclick="speakText('Lions love to sleep in the sun.')">
                    <div class="en-text">Lions love to sleep in the sun.</div>
                    <div class="ar-text">تحب الأسود النوم تحت أشعة الشمس[cite: 50].</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('Leopards like to go for a run.')">
                    <div class="en-text">Leopards like to go for a run.</div>
                    <div class="ar-text">تحب النمور الذهاب في جولة جري[cite: 50].</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('Lizards climb trees and hide under rocks. If you look closely you might find one!')">
                    <div class="en-text">Lizards climb trees and hide under rocks. If you look closely you might find one!</div>
                    <div class="ar-text">تتسلق السحالي الأشجار وتختبئ تحت الصخور. إذا نظرت عن كثب قد تجد واحدة![cite: 50]</div>
                </button>
            </div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="سحّلية">🦎</span><button type="button" class="english-word" onclick="speakText('lizard')">lizard 🔊</button><div class="arabic-translation">سحليّة[cite: 50]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="ورقة شجر">🍃</span><button type="button" class="english-word" onclick="speakText('leaf')">leaf 🔊</button><div class="arabic-translation">ورقة شجر[cite: 50]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="نمر">🐆</span><button type="button" class="english-word" onclick="speakText('leopard')">leopard 🔊</button><div class="arabic-translation">نمر (فهد)[cite: 50]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="دعسوقة">🐞</span><button type="button" class="english-word" onclick="speakText('ladybird')">ladybird 🔊</button><div class="arabic-translation">دعسوقة[cite: 50]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="أسد">🦁</span><button type="button" class="english-word" onclick="speakText('lion')">lion 🔊</button><div class="arabic-translation">أسد[cite: 50]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 62[cite: 50]</div>
</div>

<!-- ================= الصفحة الثانية: مفردات وأشياء بحرف Ll (صفحة 63) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="أضواء">💡</span><button type="button" class="english-word" onclick="speakText('lights')">lights 🔊</button><div class="arabic-translation">أضواء[cite: 51]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="غرفة المعيشة">🛋️</span><button type="button" class="english-word" onclick="speakText('living room')">room 🔊</button><div class="arabic-translation">غرفة المعيشة[cite: 51]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="رسالة">✉️</span><button type="button" class="english-word" onclick="speakText('letter')">letter 🔊</button><div class="arabic-translation">رسالة / حرف[cite: 51]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="حاسوب محمول">💻</span><button type="button" class="english-word" onclick="speakText('laptop')">laptop 🔊</button><div class="arabic-translation">حاسوب محمول[cite: 51]</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="حروف">🔤</span><button type="button" class="english-word" onclick="speakText('letters')">letters 🔊</button><div class="arabic-translation">حروف[cite: 51]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="يستمع">👂</span><button type="button" class="english-word" onclick="speakText('listen')">listen 🔊</button><div class="arabic-translation">يستمع[cite: 51]</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="يتعلم">📚</span><button type="button" class="english-word" onclick="speakText('I like to learn!')">learn! 🔊</button><div class="arabic-translation">أحب أن أتعلم![cite: 51]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 63[cite: 51]</div>
</div>

<!-- ================= الصفحة الثالثة: الأفعال والشاحنات ومنارة البحر (صفحة 64) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span class="active">Ll</span><span>Mm</span>
        </div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('Lobsters do not have brains.')">
                🔊 "Lobsters don't have brains."
            </button>
            <div class="greeting-text">الكركند (إستاكوزا) ليس لديه دماغ[cite: 53].</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="يضحك">😆</span><button type="button" class="english-word" onclick="speakTest('laugh')">laugh 🔊</button><div class="arabic-translation">يضحك[cite: 53]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="شاحنة نقل">🚚</span><button type="button" class="english-word" onclick="speakText('lorry')">lorry 🔊</button><div class="arabic-translation">شاحنة نقل[cite: 53]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="يرفع">📦</span><button type="button" class="english-word" onclick="speakTest('lift')">lift 🔊</button><div class="arabic-translation">يرفع[cite: 53]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="منارة">lighthouse</span><button type="button" class="english-word" onclick="speakText('lighthouse')">lighthouse 🔊</button><div class="arabic-translation">منارة بحرية[cite: 53]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="كركند">🦞</span><button type="button" class="english-word" onclick="speakText('There is a lobster on the sand.')">lobster 🔊</button><div class="arabic-translation">حيوان الكركند[cite: 53]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="يابسة">⛰️</span><button type="button" class="english-word" onclick="speakText('land')">land 🔊</button><div class="arabic-translation">أرض / يابسة[cite: 53]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="منقذ">🧑‍✈️</span><button type="button" class="english-word" onclick="speakText('lifeguard')">lifeguard 🔊</button><div class="arabic-translation">منقذ سباحة[cite: 53]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="سترة نجاة">🦺</span><button type="button" class="english-word" onclick="speakText('life jacket')">jacket 🔊</button><div class="arabic-translation">سترة نجاة[cite: 53]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 64[cite: 53]</div>
</div>

<!-- ================= الصفحة الرابعة: الطعام والمكتبة والحيوانات (صفحة 65) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('Let us eat lunch!')">
                🔊 "Let's eat lunch!"
            </button>
            <div class="greeting-text">لنأكل طعام الغداء![cite: 54]</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="مصاصة">🍭</span><button type="button" class="english-word" onclick="speakText('lollipop')">lollipop 🔊</button><div class="arabic-translation">مصاصة حلوى[cite: 54]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="خس">🥬</span><button type="button" class="english-word" onclick="speakText('lettuce')">lettuce 🔊</button><div class="arabic-translation">خس[cite: 54]</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="عصير ليمون">🍋</span><button type="button" class="english-word" onclick="speakText('lemonade')">lemonade 🔊</button><div class="arabic-translation">عصير ليمون[cite: 54]</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="ليمون حامض أخضر">🍈</span><button type="button" class="english-word" onclick="speakText('lime')">lime 🔊</button><div class="arabic-translation">ليمون أخضر[cite: 54]</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="ليمون أصفر">🍋</span><button type="button" class="english-word" onclick="speakText('lemon')">lemon 🔊</button><div class="arabic-translation">ليمون أصفر[cite: 54]</div></div>
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="لاما">🦙</span><button type="button" class="english-word" onclick="speakText('llama')">llama 🔊</button><div class="arabic-translation">حيوان اللاما[cite: 54]</div></div>
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="بحيرة">🏞️</span><button type="button" class="english-word" onclick="speakText('lake')">lake 🔊</button><div class="arabic-translation">بحيرة[cite: 54]</div></div>
            <div class="word-card"><span class="badge-number">18</span><span class="word-illustration" role="img" aria-label="خروف صغير">🐑</span><button type="button" class="english-word" onclick="speakTest('lamb')">lamb 🔊</button><div class="arabic-translation">خروف صغير[cite: 54]</div></div>
            <div class="word-card"><span class="badge-number">19</span><span class="word-illustration" role="img" aria-label="مكتبة كتب">📚</span><button type="button" class="english-word" onclick="speakText('library')">library 🔊</button><div class="arabic-translation">مكتبة عامة[cite: 54]</div></div>
            <div class="word-card"><span class="badge-number">20</span><span class="word-illustration" role="img" aria-label="سلم">🪜</span><button type="button" class="english-word" onclick="speakText('ladder')">ladder 🔊</button><div class="arabic-translation">سلم[cite: 54]</div></div>
            <div class="word-card"><span class="badge-number">21</span><span class="word-illustration" role="img" aria-label="أمينة مكتبة">👩‍💼</span><button type="button" class="english-word" onclick="speakText('librarian')">librarian 🔊</button><div class="arabic-translation">أمين مكتبة[cite: 54]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 65[cite: 54]</div>
</div>

<!-- ================= الصفحة الخامسة: الحرف Mm والمتحف والأشياء (صفحة 66) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>LI</span><span class="active">Mm</span>
        </div>
        <div class="main-letter">Mm</div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('Where is the museum?')">
                🔊 "Where is the museum?"
            </button>
            <div class="greeting-text">أين المتحف؟[cite: 54]</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="متحف">🏛️</span><button type="button" class="english-word" onclick="speakText('museum')">museum 🔊</button><div class="arabic-translation">متحف[cite: 54]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="خريطة">🗺️</span><button type="button" class="english-word" onclick="speakText('map')">map 🔊</button><div class="arabic-translation">خريطة[cite: 54]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="خلد (حيوان)">🦫</span><button type="button" class="english-word" onclick="speakText('mole')">mole 🔊</button><div class="arabic-translation">خلد (حيوان)[cite: 54]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="فأر">🐁</span><button type="button" class="english-word" onclick="speakTest('mouse')">mouse 🔊</button><div class="arabic-translation">فأر[cite: 54]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="طين">🟤</span><button type="button" class="english-word" onclick="speakText('mud')">mud 🔊</button><div class="arabic-translation">طين / وحل[cite: 54]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="وحش">👾</span><button type="button" class="english-word" onclick="speakText('monster')">monster 🔊</button><div class="arabic-translation">وحش[cite: 54]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="مباراة">⚽</span><button type="button" class="english-word" onclick="speakTest('match')">match 🔊</button><div class="arabic-translation">مباراة / عود ثقاب[cite: 54]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="مرآة">🪞</span><button type="button" class="english-word" onclick="speakTest('mirror')">mirror 🔊</button><div class="arabic-translation">مرآة[cite: 54]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="ساحر">🎩</span><button type="button" class="english-word" onclick="speakTest('magician')">magician 🔊</button><div class="arabic-translation">ساحر[cite: 54]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 66[cite: 54]</div>
</div>

<!-- ================= الصفحة السادسة: شهور السنة والآلات والمحركات (صفحة 67) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">24</span><span class="word-illustration" role="img" aria-label="ميكانيكي">🧑‍🔧</span><button type="button" class="english-word" onclick="speakText('mechanic')">mechanic 🔊</button><div class="arabic-translation">ميكانيكي[cite: 55]</div></div>
            <div class="word-card"><span class="badge-number">25</span><span class="word-illustration" role="img" aria-label="دراجة نارية">🏍️</span><button type="button" class="english-word" onclick="speakText('motorbike')">motorbike 🔊</button><div class="arabic-translation">دراجة نارية[cite: 55]</div></div>
            <div class="word-card"><span class="badge-number">26</span><span class="word-illustration" role="img" aria-label="آلة">⚙️</span><button type="button" class="english-word" onclick="speakText('machine')">machine 🔊</button><div class="arabic-translation">آلة[cite: 55]</div></div>
            <div class="word-card"><span class="badge-number">27</span><span class="word-illustration" role="img" aria-label="معدن">🔩</span><button type="button" class="english-word" onclick="speakText('metal')">metal 🔊</button><div class="arabic-translation">معدن[cite: 55]</div></div>
            <div class="word-card"><span class="badge-number">28</span><span class="word-illustration" role="img" aria-label="سجادة صغيرة">🟦</span><button type="button" class="english-word" onclick="speakText('mat')">mat 🔊</button><div class="arabic-translation">سجادة أرضية[cite: 55]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 67[cite: 55]</div>
</div>

<!-- ================= الصفحة السابعة: الطعام والموسيقى والأغنية (صفحة 68) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>LI</span><span class="active">Mm</span>
        </div>
        <div class="song-box">
            <button type="button" class="song-title" onclick="speakText('I buy food at the market: mushrooms, melon, and meat. I take it home and I make a meal for Maria and Ben to eat.')">
                🎵 6 Listen and sing. (استمع وغنِّ) 🔊
            </button>
            <div class="song-lines">
                <button type="button" class="song-line" onclick="speakText('I buy food at the market:')">
                    <div class="en-text">I buy food at the market:</div>
                    <div class="ar-text">أشتري الطعام من السوق:[cite: 56]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('mushrooms, melon, and meat.')">
                    <div class="en-text">mushrooms, melon, and meat.</div>
                    <div class="ar-text">فطر، بطيخ، ولحم.[cite: 56]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('I take it home and I make a meal for Maria and Ben to eat.')">
                    <div class="en-text">I take it home and I make a meal for Maria and Ben to eat.</div>
                    <div class="ar-text">آخذه إلى المنزل وأصنع وجبة لتأكلها ماريا وبين.[cite: 56]</div>
                </button>
            </div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="لحم">🥩</span><button type="button" class="english-word" onclick="speakText('meat')">meat 🔊</button><div class="arabic-translation">لحم[cite: 56]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="فطر">🍄</span><button type="button" class="english-word" onclick="speakText('mushroom')">mushroom 🔊</button><div class="arabic-translation">فطر (مشروم)[cite: 56]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="مانجو">🥭</span><button type="button" class="english-word" onclick="speakText('mango')">mango 🔊</button><div class="arabic-translation">مانجو[cite: 56]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="بطيخ">🍈</span><button type="button" class="english-word" onclick="speakText('melon')">melon 🔊</button><div class="arabic-translation">بطيخ / شمام[cite: 56]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="سوق">🛒</span><button type="button" class="english-word" onclick="speakText('market')">market 🔊</button><div class="arabic-translation">سوق[cite: 56]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="موسيقى">🎶</span><button type="button" class="english-word" onclick="speakText('music')">music 🔊</button><div class="arabic-translation">موسيقى[cite: 56]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="موسيقي">🎸</span><button type="button" class="english-word" onclick="speakText('musician')">musician 🔊</button><div class="arabic-translation">عازف / موسيقي[cite: 56]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 68[cite: 56]</div>
</div>

<!-- ================= الصفحة الثامنة: المشروبات والحيوانات (صفحة 69) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="كوب">🍵</span><button type="button" class="english-word" onclick="speakText('mug')">mug 🔊</button><div class="arabic-translation">كوب[cite: 57]</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="قائمة طعام">📜</span><button type="button" class="english-word" onclick="speakText('menu')">menu 🔊</button><div class="arabic-translation">قائمة طعام[cite: 57]</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="وجبة">🍽️</span><button type="button" class="english-word" onclick="speakText('meal')">meal 🔊</button><div class="arabic-translation">وجبة[cite: 57]</div></div>
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="مجلة">📖</span><button type="button" class="english-word" onclick="speakText('magazine')">magazine 🔊</button><div class="arabic-translation">مجلة[cite: 57]</div></div>
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="نقود">💵</span><button type="button" class="english-word" onclick="speakText('money')">money 🔊</button><div class="arabic-translation">نقود / مال[cite: 57]</div></div>
            <div class="word-card"><span class="badge-number">18</span><span class="word-illustration" role="img" aria-label="حليب">🥛</span><button type="button" class="english-word" onclick="speakText('milk')">milk 🔊</button><div class="arabic-translation">حليب[cite: 57]</div></div>
            <div class="word-card"><span class="badge-number">19</span><span class="word-illustration" role="img" aria-label="ميلك شيك">🥤</span><button type="button" class="english-word" onclick="speakText('milkshake')">milkshake 🔊</button><div class="arabic-translation">مشروب الحليب المخفوق[cite: 57]</div></div>
            <div class="word-card"><span class="badge-number">20</span><span class="word-illustration" role="img" aria-label="جبل">🏔️</span><button type="button" class="english-word" onclick="speakText('mountain')">mountain 🔊</button><div class="arabic-translation">جبل[cite: 57]</div></div>
            <div class="word-card"><span class="badge-number">21</span><span class="word-illustration" role="img" aria-label="قرد">🐒</span><button type="button" class="english-word" onclick="speakText('monkey')">monkey 🔊</button><div class="arabic-translation">قرد[cite: 57]</div></div>
            <div class="word-card"><span class="badge-number">22</span><span class="word-illustration" role="img" aria-label="مركات (حيوان الميركات)">🦦</span><button type="button" class="english-word" onclick="speakText('meerkat')">meerkat 🔊</button><div class="arabic-translation">حيوان الميركات[cite: 57]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 69[cite: 57]</div>
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
