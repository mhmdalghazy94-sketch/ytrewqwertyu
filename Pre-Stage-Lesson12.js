window.itqanLessonHtml =`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الدرس الثاني عشر - كتاب اللغة الإنجليزية الحرف (Ss) (A4)</title>
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
    <span>الدرس الثاني عشر - كتاب الإنجليزية (الحرف Ss) (A4)</span>
    <button type="button" class="print-btn" onclick="window.print()">🖨️ طباعة / نشر A4</button>
</div>

<!-- ================= الصفحة الأولى: الحرف Ss والفضاء والشتاء (صفحة 88) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span><span>Nn</span><span>Oo</span>
            <span>Pp</span><span>Qq</span><span>Rr</span><span class="active" style="background-color: #247dc3; color: white; padding: 4px 6px; border-radius: 6px;">Ss</span>
        </div>
        <div class="main-letter">Ss</div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="شمس">☀️</span><button type="button" class="english-word" onclick="speakText('sun')">sun 🔊</button><div class="arabic-translation">شمس[cite: 86]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="فضاء">🌌</span><button type="button" class="english-word" onclick="speakText('space')">space 🔊</button><div class="arabic-translation">الفضاء[cite: 86]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="مركبة فضائية">🚀</span><button type="button" class="english-word" onclick="speakText('spaceship')">spaceship 🔊</button><div class="arabic-translation">مركبة فضائية[cite: 86]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="نجوم">⭐</span><button type="button" class="english-word" onclick="speakText('stars')">stars 🔊</button><div class="arabic-translation">نجوم[cite: 86]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="زحل">🪐</span><button type="button" class="english-word" onclick="speakText('Saturn')">Saturn 🔊</button><div class="arabic-translation">كوكب زحل[cite: 86]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="يتزلج">⛷️</span><button type="button" class="english-word" onclick="speakText('ski')">ski 🔊</button><div class="arabic-translation">يتزلج[cite: 86]</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="زلاجة">🛷</span><button type="button" class="english-word" onclick="speakText('sledge')">sledge 🔊</button><div class="arabic-translation">زلاجة[cite: 86]</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="رجل الثلج">⛄</span><button type="button" class="english-word" onclick="speakText('snowman')">snowman 🔊</button><div class="arabic-translation">رجل الثلج[cite: 86]</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="وشاح">🧣</span><button type="button" class="english-word" onclick="speakText('scarf')">scarf 🔊</button><div class="arabic-translation">وشاح / شال[cite: 86]</div></div>
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="لوح تزلج ثلجي">🏂</span><button type="button" class="english-word" onclick="speakText('snowboard')">snowboard 🔊</button><div class="arabic-translation">لوح تزلج على الثلج[cite: 86]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 88[cite: 86]</div>
</div>

<!-- ================= الصفحة الثانية: الثلج والمقادير والحواس (صفحة 89 و 90) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span class="active">Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="شراب سكر">🍯</span><button type="button" class="english-word" onclick="speakText('syrup')">syrup 🔊</button><div class="arabic-translation">شراب مركز[cite: 87]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="سكر">🧂</span><button type="button" class="english-word" onclick="speakText('sugar')">sugar 🔊</button><div class="arabic-translation">سكر[cite: 87]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="بهارات">🌿</span><button type="button" class="english-word" onclick="speakText('spices')">spices 🔊</button><div class="arabic-translation">توابل / بهارات[cite: 87]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="ملح">🧂</span><button type="button" class="english-word" onclick="speakText('salt')">salt 🔊</button><div class="arabic-translation">ملح[cite: 87]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="مقص">✂️</span><button type="button" class="english-word" onclick="speakText('scissors')">scissors 🔊</button><div class="arabic-translation">مقص[cite: 87]</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="يخيط">🧵</span><button type="button" class="english-word" onclick="speakText('sew')">sew 🔊</button><div class="arabic-translation">يخيط[cite: 87]</div></div>
            <div class="word-card"><span class="badge-number">18</span><span class="word-illustration" role="img" aria-label="كرة ثلج">⚪</span><button type="button" class="english-word" onclick="speakText('snowball')">snowball 🔊</button><div class="arabic-translation">كرة ثلجية[cite: 87]</div></div>
            <div class="word-card"><span class="badge-number">19</span><span class="word-illustration" role="img" aria-label="ثلج">❄️</span><button type="button" class="english-word" onclick="speakText('snow')">snow 🔊</button><div class="arabic-translation">ثلج[cite: 87]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 89 و 90[cite: 87, 88]</div>
</div>

<!-- ================= الصفحة الثالثة: السباحة والمسبح والطعام (صفحة 91) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span><span>Nn</span><span>Oo</span>
            <span>Pp</span><span>Qq</span><span>Rr</span><span class="active" style="background-color: #247dc3; color: white; padding: 4px 6px; border-radius: 6px;">Ss</span>
        </div>
        <div class="greeting-box" style="background: linear-gradient(110deg, #eff9ed, #e8f5e7); border: 1px solid #cce5c8; border-inline-start: 4px solid #75b96d; border-radius: 12px; padding: 12px 14px; margin-bottom: 17px; display: flex; justify-content: space-between; align-items: center; gap: 12px;">
            <button type="button" class="greeting-speaker" onclick="speakText('My favourite sport is swimming!')" style="border: 0; padding: 0; background: transparent; cursor: pointer; font-weight: bold; color: #1b5e20; direction: ltr; font-size: 0.96rem; display: flex; align-items: center; gap: 6px;">
                🔊 "My favourite sport is swimming!"
            </button>
            <div class="greeting-text" style="font-size: 0.95rem; color: #2e7d32; font-weight: 500;">رياضتي المفضلة هي السباحة![cite: 90]</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="حمام سباحة">🏊‍♂️</span><button type="button" class="english-word" onclick="speakText('swimming pool')">pool 🔊</button><div class="arabic-translation">حمام سباحة[cite: 90]</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="يسبح">🏊‍♀️</span><button type="button" class="english-word" onclick="speakText('swim')">swim 🔊</button><div class="arabic-translation">يسبح[cite: 90]</div></div>
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="كرسي استرخاء">🪑</span><button type="button" class="english-word" onclick="speakText('sun lounger')">lounger 🔊</button><div class="arabic-translation">كرسي استرخاء شمسي[cite: 90]</div></div>
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="ملابس سباحة">🩱</span><button type="button" class="english-word" onclick="speakText('swimsuit')">swimsuit 🔊</button><div class="arabic-translation">ملابس سباحة[cite: 90]</div></div>
            <div class="word-card"><span class="badge-number">19</span><span class="word-illustration" role="img" aria-label="كيس نوم">⛺</span><button type="button" class="english-word" onclick="speakText('sleeping bag')">bag 🔊</button><div class="arabic-translation">كيس نوم[cite: 90]</div></div>
            <div class="word-card"><span class="badge-number">20</span><span class="word-illustration" role="img" aria-label="ينام">😴</span><button type="button" class="english-word" onclick="speakText('sleep')">sleep 🔊</button><div class="arabic-translation">ينام[cite: 90]</div></div>
            <div class="word-card"><span class="badge-number">21</span><span class="word-illustration" role="img" aria-label="نقانق">🌭</span><button type="button" class="english-word" onclick="speakText('sausage')">sausage 🔊</button><div class="arabic-translation">نقانق (سجق)[cite: 90]</div></div>
            <div class="word-card"><span class="badge-number">22</span><span class="word-illustration" role="img" aria-label="صلصة">🍅</span><button type="button" class="english-word" onclick="speakText('sauce')">sauce 🔊</button><div class="arabic-translation">صلصة[cite: 90]</div></div>
            <div class="word-card"><span class="badge-number">23</span><span class="word-illustration" role="img" aria-label="سباجيتي">🍝</span><button type="button" class="english-word" onclick="speakText('spaghetti')">spaghetti 🔊</button><div class="arabic-translation">معكرونة سباجيتي[cite: 90]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 91[cite: 90]</div>
</div>

<!-- ================= الصفحة الرابعة: البحر والحياة البحرية (صفحة 92 و 93) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span class="active">Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="يتزلج على الأمواج">🏄‍♂️</span><button type="button" class="english-word" onclick="speakText('surf')">surf 🔊</button><div class="arabic-translation">يتزلج على الأمواج[cite: 91, 92]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="لوح تزلج مائي">🏄‍♀️</span><button type="button" class="english-word" onclick="speakText('surfboard')">surfboard 🔊</button><div class="arabic-translation">لوح التزلج المائي[cite: 91, 92]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="سفينة">🚢</span><button type="button" class="english-word" onclick="speakText('ship')">ship 🔊</button><div class="arabic-translation">سفينة[cite: 91, 92]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="غواصة">🟡</span><button type="button" class="english-word" onclick="speakText('submarine')">submarine 🔊</button><div class="arabic-translation">غواصة[cite: 91, 92]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="غواص">🤿</span><button type="button" class="english-word" onclick="speakText('scuba diver')">diver 🔊</button><div class="arabic-translation">غواص أجهزة[cite: 91, 92]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="بحر">🌊</span><button type="button" class="english-word" onclick="speakText('sea')">sea 🔊</button><div class="arabic-translation">بحر[cite: 91, 92]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="أعشاب بحرية">🌿</span><button type="button" class="english-word" onclick="speakText('seaweed')">seaweed 🔊</button><div class="arabic-translation">عشبة البحر[cite: 91, 92]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="نجم البحر">⭐</span><button type="button" class="english-word" onclick="speakText('starfish')">starfish 🔊</button><div class="arabic-translation">نجم البحر[cite: 91, 92]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="صدفة">🐚</span><button type="button" class="english-word" onclick="speakText('shell')">shell 🔊</button><div class="arabic-translation">صدفة بحرية[cite: 91, 92]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="قارب شراعي">⛵</span><button type="button" class="english-word" onclick="speakText('sailing boat')">boat 🔊</button><div class="arabic-translation">قارب شراعي[cite: 92]</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="شراع">⛵</span><button type="button" class="english-word" onclick="speakText('sail')">sail 🔊</button><div class="arabic-translation">شراع القارب[cite: 92]</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="نورس">🕊️</span><button type="button" class="english-word" onclick="speakText('seagull')">seagull 🔊</button><div class="arabic-translation">طائر النورس[cite: 92]</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="قرش">🦈</span><button type="button" class="english-word" onclick="speakText('shark')">shark 🔊</button><div class="arabic-translation">سمكة قرش[cite: 92]</div></div>
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="سمك اللخمة">🐟</span><button type="button" class="english-word" onclick="speakText('stingray')">stingray 🔊</button><div class="arabic-translation">سمكة الراي اللدّاسة[cite: 92]</div></div>
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="حصان البحر">🌊</span><button type="button" class="english-word" onclick="speakText('seahorse')">seahorse 🔊</button><div class="arabic-translation">حصان البحر[cite: 92]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 92 و 93[cite: 91, 92]</div>
</div>

<!-- ================= الصفحة الخامسة: الألعاب والحديقة (صفحة 94 و 95) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span><span>Nn</span><span>Oo</span>
            <span>Pp</span><span>Qq</span><span>Rr</span><span class="active" style="background-color: #247dc3; color: white; padding: 4px 6px; border-radius: 6px;">Ss</span>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="زحليقة">🛝</span><button type="button" class="english-word" onclick="speakText('slide')">slide 🔊</button><div class="arabic-translation">زحليقة أطفال[cite: 93]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="لعبة التوازن">⚖️</span><button type="button" class="english-word" onclick="speakText('seesaw')">seesaw 🔊</button><div class="arabic-translation">لعبة الميزان (التوازن)[cite: 93]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="أرجوحة">🪢</span><button type="button" class="english-word" onclick="speakText('swing')">swing 🔊</button><div class="arabic-translation">أرجوحة[cite: 93]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="حبل قفز">🪢</span><button type="button" class="english-word" onclick="speakText('skipping rope')">rope 🔊</button><div class="arabic-translation">حبل القفز[cite: 93]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="يقفز">🦘</span><button type="button" class="english-word" onclick="speakText('skip')">skip 🔊</button><div class="arabic-translation">يقفز بالحبل[cite: 93]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="مجرفة">🛠️</span><button type="button" class="english-word" onclick="speakText('spade')">spade 🔊</button><div class="arabic-translation">مجرفة رمل[cite: 93]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="قلعة رملية">🏰</span><button type="button" class="english-word" onclick="speakText('sandcastle')">sandcastle 🔊</button><div class="arabic-translation">قلعة رملية[cite: 93]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="حفرة رمل">🏖️</span><button type="button" class="english-word" onclick="speakText('sandpit')">sandpit 🔊</button><div class="arabic-translation">صندوق الرمل للعب[cite: 93]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="سكوتر">🛴</span><button type="button" class="english-word" onclick="speakText('scooter')">scooter 🔊</button><div class="arabic-translation">سكوتر[cite: 93]</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="لوح تزلج">🛹</span><button type="button" class="english-word" onclick="speakText('skateboard')">skateboard 🔊</button><div class="arabic-translation">لوح التزلج بعجلات[cite: 93]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="يغني">🎤</span><button type="button" class="english-word" onclick="speakText('sing')">sing 🔊</button><div class="arabic-translation">يغني[cite: 94]</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="مغني">🧑‍🎤</span><button type="button" class="english-word" onclick="speakText('singer')">singer 🔊</button><div class="arabic-translation">مغني[cite: 94]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 94 و 95[cite: 93, 94]</div>
</div>

<!-- ================= الصفحة السادسة: الحيوانات والطبيعة والمدرسة (صفحة 96 و 97) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span class="active">Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="إسطبل">🏠</span><button type="button" class="english-word" onclick="speakText('stable')">stable 🔊</button><div class="arabic-translation">إسطبل الخيول[cite: 95]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="خروف">🐑</span><button type="button" class="english-word" onclick="speakText('sheep')">sheep 🔊</button><div class="arabic-translation">أغنام / خروف[cite: 95]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="جدول ماء">🌊</span><button type="button" class="english-word" onclick="speakText('stream')">stream 🔊</button><div class="arabic-translation">جدول ماء صغير[cite: 95]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="بجعة">🦢</span><button type="button" class="english-word" onclick="speakText('swan')">swan 🔊</button><div class="arabic-translation">بجعة[cite: 95]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="سنجاب">🐿️</span><button type="button" class="english-word" onclick="speakText('squirrel')">squirrel 🔊</button><div class="arabic-translation">سنجاب[cite: 95]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="ثعبان">🐍</span><button type="button" class="english-word" onclick="speakText('snake')">snake 🔊</button><div class="arabic-translation">ثعبان[cite: 95]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="دباسة">📎</span><button type="button" class="english-word" onclick="speakText('stapler')">stapler 🔊</button><div class="arabic-translation">دباسة ورق[cite: 95]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="طابع بريد">✉️</span><button type="button" class="english-word" onclick="speakText('stamp')">stamp 🔊</button><div class="arabic-translation">طابع بريدي[cite: 95]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="فصول السنة">🍂</span><button type="button" class="english-word" onclick="speakText('seasons')">seasons 🔊</button><div class="arabic-translation">فصول السنة[cite: 96]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 96 و 97[cite: 95, 96]</div>
</div>

<!-- ================= الصفحة السابعة: الأماكن والمدينة والملابس (صفحة 98 إلى 103) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span><span>Nn</span><span>Oo</span>
            <span>Pp</span><span>Qq</span><span>Rr</span><span class="active" style="background-color: #247dc3; color: white; padding: 4px 6px; border-radius: 6px;">Ss</span>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="ملعب رياضي">🏟️</span><button type="button" class="english-word" onclick="speakText('stadium')">stadium 🔊</button><div class="arabic-translation">ملعب رياضي (استاد)[cite: 97]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="مدرسة">🏫</span><button type="button" class="english-word" onclick="speakText('school')">school 🔊</button><div class="arabic-translation">مدرسة[cite: 97]</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="متجر">🏪</span><button type="button" class="english-word" onclick="speakText('shop')">shop 🔊</button><div class="arabic-translation">متجر / محل[cite: 97]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="ناطحة سحاب">🏙️</span><button type="button" class="english-word" onclick="speakText('skyscraper')">skyscraper 🔊</button><div class="arabic-translation">ناطحة سحاب[cite: 97]</div></div>
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="جوارب">🧦</span><button type="button" class="english-word" onclick="speakText('socks')">socks 🔊</button><div class="arabic-translation">جوارب[cite: 101]</div></div>
            <div class="word-card"><span class="badge-number">18</span><span class="word-illustration" role="img" aria-label="سروال قصير">🩳</span><button type="button" class="english-word" onclick="speakText('shorts')">shorts 🔊</button><div class="arabic-translation">سروال قصير (شورت)[cite: 101]</div></div>
            <div class="word-card"><span class="badge-number">19</span><span class="word-illustration" role="img" aria-label="تنورة">👗</span><button type="button" class="english-word" onclick="speakText('skirt')">skirt 🔊</button><div class="arabic-translation">تنورة[cite: 101]</div></div>
            <div class="word-card"><span class="badge-number">20</span><span class="word-illustration" role="img" aria-label="قميص">👔</span><button type="button" class="english-word" onclick="speakText('shirt')">shirt 🔊</button><div class="arabic-translation">قميص[cite: 101]</div></div>
            <div class="word-card"><span class="badge-number">29</span><span class="word-illustration" role="img" aria-label="أريكة">🛋️</span><button type="button" class="english-word" onclick="speakText('sofa')">sofa 🔊</button><div class="arabic-translation">أريكة (كنبة)[cite: 101]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 98 إلى 103[cite: 97, 101]</div>
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
