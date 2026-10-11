window.itqanLessonHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الدرس الرابع - كتاب اللغة الإنجليزية الحرف (Dd) (A4)</title>
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
    <span>الدرس الرابع - كتاب الإنجليزية الحرف (Dd) (A4)</span>
    <button type="button" class="print-btn" onclick="window.print()">🖨️ طباعة / نشر A4</button>
</div>

<!-- ================= الصفحة الأولى: الحرف Dd ومفرداته (صفحة 34) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span class="active">Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span>
        </div>
        <div class="main-letter">Dd</div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('Baby deer are called fawns.')">
                🔊 "Baby deer are called fawns."
            </button>
            <div class="greeting-text">تسمى صغار الغزلان بالأشبال/الأفناء[cite: 22].</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="غزال">🦌</span><button type="button" class="english-word" onclick="speakText('deer')">deer 🔊</button><div class="arabic-translation">غزال[cite: 22]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="يعسوب">🦟</span><button type="button" class="english-word" onclick="speakText('dragonfly')">dragonfly 🔊</button><div class="arabic-translation">يعسوب[cite: 22]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="بطة">🦆</span><button type="button" class="english-word" onclick="speakText('duck')">duck 🔊</button><div class="arabic-translation">بطة[cite: 22]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="فرخ البط">🐥</span><button type="button" class="english-word" onclick="speakText('duckling')">duckling 🔊</button><div class="arabic-translation">فرخ البط[cite: 22]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="صحراء">🏜️</span><button type="button" class="english-word" onclick="speakText('desert')">desert 🔊</button><div class="arabic-translation">صحراء[cite: 22]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="يرقص">💃</span><button type="button" class="english-word" onclick="speakText('dance')">dance 🔊</button><div class="arabic-translation">يرقص[cite: 22]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="يقود">🚗</span><button type="button" class="english-word" onclick="speakText('drive')">drive 🔊</button><div class="arabic-translation">يقود[cite: 22]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="حمار">🫏</span><button type="button" class="english-word" onclick="speakText('donkey')">donkey 🔊</button><div class="arabic-translation">حمار[cite: 22]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="قاموس">📖</span><button type="button" class="english-word" onclick="speakText('dictionary')">dictionary 🔊</button><div class="arabic-translation">قاموس[cite: 22]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="كلب">🐕</span><button type="button" class="english-word" onclick="speakText('dog')">dog 🔊</button><div class="arabic-translation">كلب[cite: 22]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 34[cite: 22]</div>
</div>

<!-- ================= الصفحة الثانية: العشاء والمسبح (صفحة 35) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('What time do you have dinner?')">
                🔊 "What time do you have dinner?"
            </button>
            <div class="greeting-text">في أي وقت تتناول وجبة العشاء؟[cite: 23]</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="عشاء">🍽️</span><button type="button" class="english-word" onclick="speakText('dinner')">dinner 🔊</button><div class="arabic-translation">وجبة العشاء[cite: 23]</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="تحلية">🍰</span><button type="button" class="english-word" onclick="speakText('dessert')">dessert 🔊</button><div class="arabic-translation">تحلية / حلوى[cite: 23]</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="مشروبات">🧃</span><button type="button" class="english-word" onclick="speakText('drinks')">drinks 🔊</button><div class="arabic-translation">مشروبات[cite: 23]</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="كرسي استرخاء">🪑</span><button type="button" class="english-word" onclick="speakText('deckchair')">deckchair 🔊</button><div class="arabic-translation">كرسي استرخاء شاطئي[cite: 23]</div></div>
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="يغوص">🏊‍♂️</span><button type="button" class="english-word" onclick="speakText('dive')">dive 🔊</button><div class="arabic-translation">يغوص[cite: 23]</div></div>
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="لوحة الغوص">🛹</span><button type="button" class="english-word" onclick="speakText('diving board')">board 🔊</button><div class="arabic-translation">لوحة الغوص[cite: 23]</div></div>
            <div class="word-card"><span class="badge-number">18</span><span class="word-illustration" role="img" aria-label="يشرب">🥤</span><button type="button" class="english-word" onclick="speakText('drink')">drink 🔊</button><div class="arabic-translation">يشرب[cite: 23]</div></div>
            <div class="word-card"><span class="badge-number">19</span><span class="word-illustration" role="img" aria-label="مثلجات">🍦</span><button type="button" class="english-word" onclick="speakText('This ice cream is delicious!')">ice cream 🔊</button><div class="arabic-translation">الآيس كريم لذيذ جداً![cite: 23]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 35[cite: 23]</div>
</div>

<!-- ================= الصفحة الثالثة: المهن والمنزل (صفحة 36) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span class="active">Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="حلم">💭</span><button type="button" class="english-word" onclick="speakText('dream')">dream 🔊</button><div class="arabic-translation">حلم[cite: 24]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="طبيب">👨‍⚕️</span><button type="button" class="english-word" onclick="speakText('doctor')">doctor 🔊</button><div class="arabic-translation">طبيب[cite: 24]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="طبيب أسنان">🦷</span><button type="button" class="english-word" onclick="speakText('dentist')">dentist 🔊</button><div class="arabic-translation">طبيب أسنان[cite: 24]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="دلفين">🐬</span><button type="button" class="english-word" onclick="speakText('dolphin')">dolphin 🔊</button><div class="arabic-translation">دلفين[cite: 24]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="ديناصور">🦕</span><button type="button" class="english-word" onclick="speakText('dinosaur')">dinosaur 🔊</button><div class="arabic-translation">ديناصور[cite: 24]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="تنين">🐉</span><button type="button" class="english-word" onclick="speakText('dragon')">dragon 🔊</button><div class="arabic-translation">تنين[cite: 24]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="دمية">🪆</span><button type="button" class="english-word" onclick="speakText('doll')">doll 🔊</button><div class="arabic-translation">دمية[cite: 24]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="مكتب">🪑</span><button type="button" class="english-word" onclick="speakText('desk')">desk 🔊</button><div class="arabic-translation">مكتب[cite: 24]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="درج">🗄️</span><button type="button" class="english-word" onclick="speakText('drawer')">drawer 🔊</button><div class="arabic-translation">درج[cite: 24]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="بيت الدمى">🏠</span><button type="button" class="english-word" onclick="speakText('dolls house')">house 🔊</button><div class="arabic-translation">منزل الدمى[cite: 24]</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="غرفة طعام">🍽️</span><button type="button" class="english-word" onclick="speakText('dining room')">room 🔊</button><div class="arabic-translation">غرفة طعام[cite: 24]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="باب">🚪</span><button type="button" class="english-word" onclick="speakText('door')">door 🔊</button><div class="arabic-translation">باب[cite: 24]</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="طبل">🪘</span><button type="button" class="english-word" onclick="speakText('drum')">drum 🔊</button><div class="arabic-translation">طبل[cite: 24]</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="يرسم">✏️</span><button type="button" class="english-word" onclick="speakText('draw')">draw 🔊</button><div class="arabic-translation">يرسم[cite: 24]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 36[cite: 24]</div>
</div>

<!-- ================= الصفحة الرابعة: أيام الأسبوع والأغنية (صفحة 37) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="song-box">
            <button type="button" class="song-title" onclick="speakText('On Monday, I dreamed about dragons. On Tuesday, I played my drum. On Wednesday, I drew a picture of a dinosaur in the sun. On Thursday, I saw the doctor, and I took my doll with me. On Friday, I went to the beach, and there were dolphins in the sea.')">
                🎵 24 Listen and sing. (استمع وغنِّ) 🔊
            </button>
            <div class="song-lines">
                <button type="button" class="song-line" onclick="speakText('On Monday, I dreamed about dragons.')">
                    <div class="en-text">On Monday, I dreamed about dragons.</div>
                    <div class="ar-text">في يوم الاثنين، حلمت بالتنانين.[cite: 25]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('On Tuesday, I played my drum.')">
                    <div class="en-text">On Tuesday, I played my drum.</div>
                    <div class="ar-text">في يوم الثلاثاء، عزفت على طبلي.[cite: 25]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('On Wednesday, I drew a picture of a dinosaur in the sun.')">
                    <div class="en-text">On Wednesday, I drew a picture of a dinosaur in the sun.</div>
                    <div class="ar-text">في يوم الأربعاء، رسمت صورة ديناصور تحت الشمس.[cite: 25]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('On Thursday, I saw the doctor, and I took my doll with me.')">
                    <div class="en-text">On Thursday, I saw the doctor, and I took my doll with me.</div>
                    <div class="ar-text">في يوم الخميس، رأيت الطبيب وأخذت دُميتي معي.[cite: 25]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('On Friday, I went to the beach, and there were dolphins in the sea.')">
                    <div class="en-text">On Friday, I went to the beach, and there were dolphins in the sea.</div>
                    <div class="ar-text">في يوم الجمعة، ذهبت إلى الشاطئ وكانت هناك دلافين في البحر.[cite: 25]</div>
                </button>
            </div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="الاثنين">📅</span><button type="button" class="english-word" onclick="speakText('Monday')">Monday 🔊</button><div class="arabic-translation">الإثنين[cite: 25]</div></div>
            <div class="word-card"><span class="badge-number">18</span><span class="word-illustration" role="img" aria-label="الثلاثاء">📅</span><button type="button" class="english-word" onclick="speakText('Tuesday')">Tuesday 🔊</button><div class="arabic-translation">الثلاثاء[cite: 25]</div></div>
            <div class="word-card"><span class="badge-number">19</span><span class="word-illustration" role="img" aria-label="الأربعاء">📅</span><button type="button" class="english-word" onclick="speakText('Wednesday')">Wednesday 🔊</button><div class="arabic-translation">الأربعاء[cite: 25]</div></div>
            <div class="word-card"><span class="badge-number">20</span><span class="word-illustration" role="img" aria-label="الخميس">📅</span><button type="button" class="english-word" onclick="speakText('Thursday')">Thursday 🔊</button><div class="arabic-translation">الخميس[cite: 25]</div></div>
            <div class="word-card"><span class="badge-number">21</span><span class="word-illustration" role="img" aria-label="الجمعة">📅</span><button type="button" class="english-word" onclick="speakText('Friday')">Friday 🔊</button><div class="arabic-translation">الجمعة[cite: 25]</div></div>
            <div class="word-card"><span class="badge-number">22</span><span class="word-illustration" role="img" aria-label="السبت">📅</span><button type="button" class="english-word" onclick="speakText('Saturday')">Saturday 🔊</button><div class="arabic-translation">السبت[cite: 25]</div></div>
            <div class="word-card"><span class="badge-number">23</span><span class="word-illustration" role="img" aria-label="الأحد">📅</span><button type="button" class="english-word" onclick="speakText('Sunday')">Sunday 🔊</button><div class="arabic-translation">الأحد[cite: 25]</div></div>
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="مفكرة يومية">📔</span><button type="button" class="english-word" onclick="speakText('diary')">diary 🔊</button><div class="arabic-translation">مفكرة يومية[cite: 25]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 37[cite: 25]</div>
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
</html>` ;
