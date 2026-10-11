window.itqanLessonHtml = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الدرس الخامس - كتاب اللغة الإنجليزية الحرفين (Ee, Ff) (A4)</title>
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
    <span>الدرس الخامس - كتاب الإنجليزية (Ee, Ff) (A4)</span>
    <button type="button" class="print-btn" onclick="window.print()">🖨️ طباعة / نشر A4</button>
</div>

<!-- ================= الصفحة الأولى: الحرف Ee ومفرداته (صفحة 38) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span class="active">Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span>
        </div>
        <div class="main-letter">Ee</div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('Elephant tusks never stop growing.')">
                🔊 "Elephant tusks never stop growing."
            </button>
            <div class="greeting-text">أنياب الفيلة لا تتوقف عن النمو أبداً[cite: 26].</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="نسر">🦅</span><button type="button" class="english-word" onclick="speakText('eagle')">eagle 🔊</button><div class="arabic-translation">نسر[cite: 26]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="بيضة">🥚</span><button type="button" class="english-word" onclick="speakText('egg')">egg 🔊</button><div class="arabic-translation">بيضة[cite: 26]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="فيل">🐘</span><button type="button" class="english-word" onclick="speakText('elephant')">elephant 🔊</button><div class="arabic-translation">فيل[cite: 26]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="مستكشف">🧭</span><button type="button" class="english-word" onclick="speakText('explorer')">explorer 🔊</button><div class="arabic-translation">مستكشف[cite: 26]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 38[cite: 26]</div>
</div>

<!-- ================= الصفحة الثانية: أجزاء الجسم والوجه (صفحة 39) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="الأرض">🌍</span><button type="button" class="english-word" onclick="speakText('Earth')">Earth 🔊</button><div class="arabic-translation">كوكب الأرض[cite: 27]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="ثعبان البحر">🐍</span><button type="button" class="english-word" onclick="speakText('eel')">eel 🔊</button><div class="arabic-translation">ثعبان البحر[cite: 27]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="أذن">👂</span><button type="button" class="english-word" onclick="speakText('ear')">ear 🔊</button><div class="arabic-translation">أذن[cite: 27]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="قرط">💎</span><button type="button" class="english-word" onclick="speakText('earring')">earring 🔊</button><div class="arabic-translation">قرط / حلق[cite: 27]</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="حاجب">〰️</span><button type="button" class="english-word" onclick="speakText('eyebrow')">eyebrow 🔊</button><div class="arabic-translation">حاجب[cite: 27]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="رمش العين">👁️‍🗨️</span><button type="button" class="english-word" onclick="speakText('eyelash')">eyelash 🔊</button><div class="arabic-translation">رمش[cite: 27]</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="عين">👁️</span><button type="button" class="english-word" onclick="speakText('eye')">eye 🔊</button><div class="arabic-translation">عين[cite: 27]</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="مدخل">🚪</span><button type="button" class="english-word" onclick="speakText('entrance')">entrance 🔊</button><div class="arabic-translation">مدخل[cite: 27]</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="مخرج">🚪</span><button type="button" class="english-word" onclick="speakText('exit')">exit 🔊</button><div class="arabic-translation">مخرج[cite: 27]</div></div>
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="يأكل">🍽️</span><button type="button" class="english-word" onclick="speakText('eat')">eat 🔊</button><div class="arabic-translation">يأكل[cite: 27]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 39[cite: 27]</div>
</div>

<!-- ================= الصفحة الثالثة: الحرف Ff ومفرداته (صفحة 40) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span class="active">Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span>
        </div>
        <div class="main-letter">Ff</div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="مزرعة">🏡</span><button type="button" class="english-word" onclick="speakText('farm')">farm 🔊</button><div class="arabic-translation">مزرعة[cite: 28]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="حقل">🌾</span><button type="button" class="english-word" onclick="speakText('field')">field 🔊</button><div class="arabic-translation">حقل[cite: 28]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="مزارع">👨‍🌾</span><button type="button" class="english-word" onclick="speakText('farmer')">farmer 🔊</button><div class="arabic-translation">مزارع[cite: 28]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="زهرة">🌸</span><button type="button" class="english-word" onclick="speakText('flower')">flower 🔊</button><div class="arabic-translation">زهرة[cite: 28]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="سيارة إطفاء">🚒</span><button type="button" class="english-word" onclick="speakText('fire engine')">engine 🔊</button><div class="arabic-translation">سيارة إطفاء[cite: 28]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="محطة إطفاء">🏢</span><button type="button" class="english-word" onclick="speakText('fire station')">station 🔊</button><div class="arabic-translation">محطة إطفاء[cite: 28]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="رجل إطفاء">👨‍🚒</span><button type="button" class="english-word" onclick="speakText('firefighter')">firefighter 🔊</button><div class="arabic-translation">رجل إطفاء[cite: 28]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="نار">🔥</span><button type="button" class="english-word" onclick="speakText('fire')">fire 🔊</button><div class="arabic-translation">نار[cite: 28]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 40[cite: 28]</div>
</div>

<!-- ================= الصفحة الرابعة: الوجه والحيوانات البحرية (صفحة 41) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('Flamingos eat with their heads upside down.')">
                🔊 "Flamingos eat with their heads upside down."
            </button>
            <div class="greeting-text">تأكل طيور الفلامنجو ورؤوسها مقلوبة رأساً على عقب[cite: 29].</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="وجه">🙂</span><button type="button" class="english-word" onclick="speakText('face')">face 🔊</button><div class="arabic-translation">وجه[cite: 29]</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="ذقن">🧔</span><button type="button" class="english-word" onclick="speakText('chin')">chin 🔊</button><div class="arabic-translation">ذقن[cite: 29]</div></div>
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="شارب">🧔</span><button type="button" class="english-word" onclick="speakText('moustache')">moustache 🔊</button><div class="arabic-translation">شارب[cite: 29]</div></div>
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="لحية">🧔‍♂️</span><button type="button" class="english-word" onclick="speakText('beard')">beard 🔊</button><div class="arabic-translation">لحية[cite: 29]</div></div>
            <div class="word-card"><span class="badge-number">18</span><span class="word-illustration" role="img" aria-label="زعانف سباحة">🏊‍♂️</span><button type="button" class="english-word" onclick="speakText('flippers')">flippers 🔊</button><div class="arabic-translation">زعانف سباحة[cite: 29]</div></div>
            <div class="word-card"><span class="badge-number">19</span><span class="word-illustration" role="img" aria-label="سمكة">🐟</span><button type="button" class="english-word" onclick="speakText('fish')">fish 🔊</button><div class="arabic-translation">سمكة[cite: 29]</div></div>
            <div class="word-card"><span class="badge-number">20</span><span class="word-illustration" role="img" aria-label="زعنفة سمكة">🦈</span><button type="button" class="english-word" onclick="speakText('fin')">fin 🔊</button><div class="arabic-translation">زعنفة[cite: 29]</div></div>
            <div class="word-card"><span class="badge-number">21</span><span class="word-illustration" role="img" aria-label="فلامنجو">🦩</span><button type="button" class="english-word" onclick="speakText('flamingo')">flamingo 🔊</button><div class="arabic-translation">طائر الفلامنجو[cite: 29]</div></div>
            <div class="word-card"><span class="badge-number">22</span><span class="word-illustration" role="img" aria-label="يُحلق / طيران">🪰</span><button type="button" class="english-word" onclick="speakText('fly')">fly 🔊</button><div class="arabic-translation">يطير / ذبابة[cite: 29]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 41[cite: 29]</div>
</div>

<!-- ================= الصفحة الخامسة: العائلة شجرة العائلة (صفحة 42) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span class="active">Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span>
        </div>
        <div class="main-title" style="font-size: 1.6rem; margin-bottom: 15px;">Family Tree</div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="عائلة">👨‍👩‍👧‍👦</span><button type="button" class="english-word" onclick="speakText('family')">family 🔊</button><div class="arabic-translation">عائلة[cite: 30]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="جدة">👵</span><button type="button" class="english-word" onclick="speakText('grandmother')">grandma 🔊</button><div class="arabic-translation">جدة[cite: 30]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="أب">👨‍👧</span><button type="button" class="english-word" onclick="speakText('father')">dad 🔊</button><div class="arabic-translation">أب / أبي[cite: 30]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="أم">👩‍👧</span><button type="button" class="english-word" onclick="speakText('mother')">mum 🔊</button><div class="arabic-translation">أم / أمي[cite: 30]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="أخ">👦</span><button type="button" class="english-word" onclick="speakText('brother')">brother 🔊</button><div class="arabic-translation">أخ[cite: 30]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="أخت">👧</span><button type="button" class="english-word" onclick="speakText('sister')">sister 🔊</button><div class="arabic-translation">أخت[cite: 30]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="أنا">🙋</span><button type="button" class="english-word" onclick="speakText('me')">me 🔊</button><div class="arabic-translation">أنا[cite: 30]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="الوالدان">👫</span><button type="button" class="english-word" onclick="speakText('parents')">parents 🔊</button><div class="arabic-translation">الوالدان[cite: 30]</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="بنات">👧‍👧</span><button type="button" class="english-word" onclick="speakText('daughters')">daughters 🔊</button><div class="arabic-translation">بنات[cite: 30]</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="ابن">👦</span><button type="button" class="english-word" onclick="speakText('son')">son 🔊</button><div class="arabic-translation">ابن[cite: 30]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 42[cite: 30]</div>
</div>

<!-- ================= الصفحة السادسة: أفراد العائلة والأقارب (صفحة 43) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('We have five grandchildren.')">
                🔊 "We have five grandchildren."
            </button>
            <div class="greeting-text">لدينا خمسة أحفاد[cite: 31].</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="جد">👴</span><button type="button" class="english-word" onclick="speakText('grandfather')">grandpa 🔊</button><div class="arabic-translation">جد[cite: 31]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="عم / خال">👨‍🦰</span><button type="button" class="english-word" onclick="speakText('uncle')">uncle 🔊</button><div class="arabic-translation">عم / خال[cite: 31]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="عمة / خالة">👩‍🦰</span><button type="button" class="english-word" onclick="speakText('aunt')">aunt 🔊</button><div class="arabic-translation">عمة / خالة[cite: 31]</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="أولاد العم / الخال">🧒👧</span><button type="button" class="english-word" onclick="speakText('cousins')">cousins 🔊</button><div class="arabic-translation">أولاد العم/الخال[cite: 31]</div></div>
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="الأجداد">👴👵</span><button type="button" class="english-word" onclick="speakText('grandparents')">grandparents 🔊</button><div class="arabic-translation">الأجداد[cite: 31]</div></div>
            <div class="word-card"><span class="badge-number">18</span><span class="word-illustration" role="img" aria-label="زوج">🤵</span><button type="button" class="english-word" onclick="speakText('husband')">husband 🔊</button><div class="arabic-translation">زوج[cite: 31]</div></div>
            <div class="word-card"><span class="badge-number">19</span><span class="word-illustration" role="img" aria-label="زوجة">👰</span><button type="button" class="english-word" onclick="speakText('wife')">wife 🔊</button><div class="arabic-translation">زوجة[cite: 31]</div></div>
            <div class="word-card"><span class="badge-number">20</span><span class="word-illustration" role="img" aria-label="حفيد">👦</span><button type="button" class="english-word" onclick="speakText('grandson')">grandson 🔊</button><div class="arabic-translation">حفيد[cite: 31]</div></div>
            <div class="word-card"><span class="badge-number">21</span><span class="word-illustration" role="img" aria-label="حفيدة">👧</span><button type="button" class="english-word" onclick="speakText('granddaughter')">granddaughter 🔊</button><div class="arabic-translation">حفيدة[cite: 31]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 43[cite: 31]</div>
</div>

<!-- ================= الصفحة السابعة: الأكل والطعام والأغنية (صفحة 44) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span class="active">Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span>
        </div>
        <div class="song-box">
            <button type="button" class="song-title" onclick="speakText('We watch fireworks and we have fun. We go fishing in the sun. When we finish, we have some food from the fridge if we are in the mood.')">
                🎵 10 Listen and sing. (استمع وغنِّ) 🔊
            </button>
            <div class="song-lines">
                <button type="button" class="song-line" onclick="speakText('We watch fireworks and we have fun.')">
                    <div class="en-text">We watch fireworks and we have fun.</div>
                    <div class="ar-text">نحن نشاهد الألعاب النارية ونمرح[cite: 32].</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('We go fishing in the sun.')">
                    <div class="en-text">We go fishing in the sun.</div>
                    <div class="ar-text">نذهب للصيد تحت أشعة الشمس[cite: 32].</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('When we finish, we have some food from the fridge if we are in the mood.')">
                    <div class="en-text">When we finish, we have some food from the fridge if we're in the mood.</div>
                    <div class="ar-text">عندما ننتهي، نتناول بعض الطعام من الثلاجة إذا كنّا في المزاج[cite: 32].</div>
                </button>
            </div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="ألعاب نارية">🎆</span><button type="button" class="english-word" onclick="speakText('fireworks')">fireworks 🔊</button><div class="arabic-translation">ألعاب نارية[cite: 32]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="ثلاجة">🧊</span><button type="button" class="english-word" onclick="speakText('fridge')">fridge 🔊</button><div class="arabic-translation">ثلاجة[cite: 32]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="فاكهة">🍎</span><button type="button" class="english-word" onclick="speakText('fruit')">fruit 🔊</button><div class="arabic-translation">فاكهة[cite: 32]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="دقيق">🌾</span><button type="button" class="english-word" onclick="speakText('flour')">flour 🔊</button><div class="arabic-translation">دقيق / طحين[cite: 32]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="أرضية">🟧</span><button type="button" class="english-word" onclick="speakText('floor')">floor 🔊</button><div class="arabic-translation">أرضية[cite: 32]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="طعام">🍲</span><button type="button" class="english-word" onclick="speakText('food')">food 🔊</button><div class="arabic-translation">طعام[cite: 32]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="فيلم">🎬</span><button type="button" class="english-word" onclick="speakText('film')">film 🔊</button><div class="arabic-translation">فيلم[cite: 32]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 44[cite: 32]</div>
</div>

<!-- ================= الصفحة الثامنة: الرياضة والطبيعة والصيد (صفحة 45) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('Fishing is fun!')">
                🔊 "Fishing is fun!"
            </button>
            <div class="greeting-text">الصيد ممتع![cite: 33]</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="ينتهي">🏁</span><button type="button" class="english-word" onclick="speakText('finish')">finish 🔊</button><div class="arabic-translation">ينتهي / خط النهاية[cite: 33]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="علم">🚩</span><button type="button" class="english-word" onclick="speakText('flag')">flag 🔊</button><div class="arabic-translation">علم[cite: 33]</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="كرة قدم">⚽</span><button type="button" class="english-word" onclick="speakText('football')">football 🔊</button><div class="arabic-translation">كرة قدم[cite: 33]</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="سياج / سور">🚧</span><button type="button" class="english-word" onclick="speakText('fence')">fence 🔊</button><div class="arabic-translation">سياج / سور[cite: 33]</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="غابة">🌲</span><button type="button" class="english-word" onclick="speakText('forest')">forest 🔊</button><div class="arabic-translation">غابة[cite: 33]</div></div>
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="صنارة صيد">🎣</span><button type="button" class="english-word" onclick="speakText('fishing rod')">rod 🔊</button><div class="arabic-translation">صنارة صيد[cite: 33]</div></div>
            <div class="word-card"><span class="badge-number">18</span><span class="word-illustration" role="img" aria-label="ثعلب">🦊</span><button type="button" class="english-word" onclick="speakText('fox')">fox 🔊</button><div class="arabic-translation">ثعلب[cite: 33]</div></div>
            <div class="word-card"><span class="badge-number">19</span><span class="word-illustration" role="img" aria-label="ذبابة">🪰</span><button type="button" class="english-word" onclick="speakText('fly')">fly 🔊</button><div class="arabic-translation">حشرة / ذبابة[cite: 33]</div></div>
            <div class="word-card"><span class="badge-number">20</span><span class="word-illustration" role="img" aria-label="ضفدع">🐸</span><button type="button" class="english-word" onclick="speakText('frog')">frog 🔊</button><div class="arabic-translation">ضفدع[cite: 33]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 45[cite: 33]</div>
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
