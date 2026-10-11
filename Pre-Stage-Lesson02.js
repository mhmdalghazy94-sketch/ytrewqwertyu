window.itqanLessonHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الدرس الثاني - كتاب اللغة الإنجليزية (A4)</title>
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
    <span>الدرس الثاني - كتاب الإنجليزية الحرف (Bb) (A4)</span>
    <button type="button" class="print-btn" onclick="window.print()">🖨️ طباعة / نشر A4</button>
</div>

<!-- ================= الصفحة الأولى: الحرف Bb ومفرداته (صفحة 14) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span class="active">Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span>
        </div>
        <div class="main-letter">Bb</div>
        <div class="words-grid">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="منقار">🐦</span><button type="button" class="english-word" onclick="speakText('beak')">beak 🔊</button><div class="arabic-translation">منقار</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="طائر">🕊️</span><button type="button" class="english-word" onclick="speakText('bird')">bird 🔊</button><div class="arabic-translation">طائر</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="نحلة">🐝</span><button type="button" class="english-word" onclick="speakText('bee')">bee 🔊</button><div class="arabic-translation">نحلة</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="براعم الأزهار">🌸</span><button type="button" class="english-word" onclick="speakText('blossom')">blossom 🔊</button><div class="arabic-translation">براعم الأزهار</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="ثور">🐂</span><button type="button" class="english-word" onclick="speakText('bull')">bull 🔊</button><div class="arabic-translation">ثور</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="قندس">🦦</span><button type="button" class="english-word" onclick="speakText('beaver')">beaver 🔊</button><div class="arabic-translation">قندس</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="غرير">🦡</span><button type="button" class="english-word" onclick="speakText('badger')">badger 🔊</button><div class="arabic-translation">غرير</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="فراشة">🦋</span><button type="button" class="english-word" onclick="speakText('butterfly')">butterfly 🔊</button><div class="arabic-translation">فراشة</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="خنفساء">🪲</span><button type="button" class="english-word" onclick="speakText('beetle')">beetle 🔊</button><div class="arabic-translation">خنفساء</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="توت العليق">🫐</span><button type="button" class="english-word" onclick="speakText('blackberry')">blackberry 🔊</button><div class="arabic-translation">توت العليق</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 14</div>
</div>

<!-- ================= الصفحة الثانية: متابعة الحروف ومفردات الحيوانات والدب (صفحة 15) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('Bats sleep upside down.')">
                🔊 "Bats sleep upside down."
            </button>
            <div class="greeting-text">الخفافيش تنام مقلوبة رأساً على عقب.</div>
        </div>
        <div class="words-grid">
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="خفاش">🦇</span><button type="button" class="english-word" onclick="speakText('bat')">bat 🔊</button><div class="arabic-translation">خفاش</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="غصن">🌿</span><button type="button" class="english-word" onclick="speakText('branch')">branch 🔊</button><div class="arabic-translation">غصن</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="خلية نحل">🍯</span><button type="button" class="english-word" onclick="speakText('beehive')">beehive 🔊</button><div class="arabic-translation">خلية نحل</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="سؤال">❓</span><button type="button" class="english-word" onclick="speakText('How many bees can you see?')">bees? 🔊</button><div class="arabic-translation">كم عدد النحل؟</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="دب">🐻</span><button type="button" class="english-word" onclick="speakText('bear')">bear 🔊</button><div class="arabic-translation">دب</div></div>
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="لحاء الشجر">🪵</span><button type="button" class="english-word" onclick="speakText('bark')">bark 🔊</button><div class="arabic-translation">لحاء الشجر</div></div>
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="فاصوليا">🫘</span><button type="button" class="english-word" onclick="speakText('beans')">beans 🔊</button><div class="arabic-translation">فاصوليا</div></div>
            <div class="word-card"><span class="badge-number">18</span><span class="word-illustration" role="img" aria-label="لعبة لوحية">🎲</span><button type="button" class="english-word" onclick="speakText('board game')">board game 🔊</button><div class="arabic-translation">لعبة لوحية</div></div>
            <div class="word-card"><span class="badge-number">19</span><span class="word-illustration" role="img" aria-label="حظيرة">🛖</span><button type="button" class="english-word" onclick="speakText('barn')">barn 🔊</button><div class="arabic-translation">حظيرة</div></div>
            <div class="word-card"><span class="badge-number">20</span><span class="word-illustration" role="img" aria-label="بروكلي">🥦</span><button type="button" class="english-word" onclick="speakText('broccoli')">broccoli 🔊</button><div class="arabic-translation">بروكلي</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 15</div>
</div>

<!-- ================= الصفحة الثالثة: الرياضات والأنشطة (صفحة 16) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span class="active">Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span>
        </div>
        <div class="main-title" style="font-size: 1.6rem; margin-bottom: 15px;">Sports & Activities</div>
        <div class="words-grid">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="بيسبول">⚾</span><button type="button" class="english-word" onclick="speakText('baseball')">baseball 🔊</button><div class="arabic-translation">بيسبول</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="مضرب">🏏</span><button type="button" class="english-word" onclick="speakText('bat')">bat 🔊</button><div class="arabic-translation">مضرب</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="قبعة بيسبول">🧢</span><button type="button" class="english-word" onclick="speakText('baseball cap')">baseball cap 🔊</button><div class="arabic-translation">قبعة بيسبول</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="كرة سلة">🏀</span><button type="button" class="english-word" onclick="speakText('basketball')">basketball 🔊</button><div class="arabic-translation">كرة سلة</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="بولينغ">🎳</span><button type="button" class="english-word" onclick="speakText('bowling')">bowling 🔊</button><div class="arabic-translation">بولينغ</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="تنس ريشة">🏸</span><button type="button" class="english-word" onclick="speakText('badminton')">badminton 🔊</button><div class="arabic-translation">تنس ريشة</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="ارتداد الكرة">🏀</span><button type="button" class="english-word" onclick="speakText('bounce')">bounce 🔊</button><div class="arabic-translation">ارتداد</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="كرة">⚽</span><button type="button" class="english-word" onclick="speakText('ball')">ball 🔊</button><div class="arabic-translation">كرة</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 16</div>
</div>

<!-- ================= الصفحة الرابعة: جسم الإنسان (صفحة 17) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('There are 206 bones in the adult human body.')">
                🔊 "There are 206 bones in the adult human body."
            </button>
            <div class="greeting-text">يوجد 206 عظام في جسم الإنسان البالغ.</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="جسم">🧍</span><button type="button" class="english-word" onclick="speakText('body')">body 🔊</button><div class="arabic-translation">جسم</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="رأس">🗣️</span><button type="button" class="english-word" onclick="speakText('head')">head 🔊</button><div class="arabic-translation">رأس</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="كتف">💪</span><button type="button" class="english-word" onclick="speakText('shoulder')">shoulder 🔊</button><div class="arabic-translation">كتف</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="صدر">👕</span><button type="button" class="english-word" onclick="speakText('chest')">chest 🔊</button><div class="arabic-translation">صدر</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="وجه">🙂</span><button type="button" class="english-word" onclick="speakText('face')">face 🔊</button><div class="arabic-translation">وجه</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="يد">✋</span><button type="button" class="english-word" onclick="speakText('hand')">hand 🔊</button><div class="arabic-translation">يد</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="مرفق">🦾</span><button type="button" class="english-word" onclick="speakText('elbow')">elbow 🔊</button><div class="arabic-translation">مرفق</div></div>
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="معدة">🍽️</span><button type="button" class="english-word" onclick="speakText('stomach')">stomach 🔊</button><div class="arabic-translation">معدة</div></div>
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="ذراع">🦾</span><button type="button" class="english-word" onclick="speakText('arm')">arm 🔊</button><div class="arabic-translation">ذراع</div></div>
            <div class="word-card"><span class="badge-number">18</span><span class="word-illustration" role="img" aria-label="إصبع">☝️</span><button type="button" class="english-word" onclick="speakText('finger')">finger 🔊</button><div class="arabic-translation">إصبع</div></div>
            <div class="word-card"><span class="badge-number">19</span><span class="word-illustration" role="img" aria-label="ساق">🦵</span><button type="button" class="english-word" onclick="speakText('leg')">leg 🔊</button><div class="arabic-translation">ساق</div></div>
            <div class="word-card"><span class="badge-number">20</span><span class="word-illustration" role="img" aria-label="ركبة">🦿</span><button type="button" class="english-word" onclick="speakText('knee')">knee 🔊</button><div class="arabic-translation">ركبة</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 17</div>
</div>

<!-- ================= الصفحة الخامسة: الشاطئ والحمام (صفحة 18) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span class="active">Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span>
        </div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('What do you like to do at the beach?')">
                🔊 "What do you like to do at the beach?"
            </button>
            <div class="greeting-text">ما الذي تحب أن تفعله على الشاطئ؟</div>
        </div>
        <div class="words-grid">
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="قارب">🛶</span><button type="button" class="english-word" onclick="speakText('boat')">boat 🔊</button><div class="arabic-translation">قارب</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="كرة شاطئ">🏐</span><button type="button" class="english-word" onclick="speakText('beach ball')">beach ball 🔊</button><div class="arabic-translation">كرة شاطئ</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="حقيبة ظهر">🎒</span><button type="button" class="english-word" onclick="speakText('backpack')">backpack 🔊</button><div class="arabic-translation">حقيبة ظهر</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="زجاجة">🍼</span><button type="button" class="english-word" onclick="speakText('bottle')">bottle 🔊</button><div class="arabic-translation">زجاجة</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="شاطئ">🏖️</span><button type="button" class="english-word" onclick="speakText('beach')">beach 🔊</button><div class="arabic-translation">شاطئ</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="حمام">🛁</span><button type="button" class="english-word" onclick="speakText('bathroom')">bathroom 🔊</button><div class="arabic-translation">حمام</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="حوض الاستحمام">🛀</span><button type="button" class="english-word" onclick="speakText('bath')">bath 🔊</button><div class="arabic-translation">حوض استرخاء</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="فقاعة">🫧</span><button type="button" class="english-word" onclick="speakText('bubble')">bubble 🔊</button><div class="arabic-translation">فقاعة</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="سلة مهملات">🗑️</span><button type="button" class="english-word" onclick="speakText('bin')">bin 🔊</button><div class="arabic-translation">سلة مهملات</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="حوض مغسلة">🚰</span><button type="button" class="english-word" onclick="speakText('basin')">basin 🔊</button><div class="arabic-translation">مغسلة</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 18</div>
</div>

<!-- ================= الصفحة السادسة: غرفة النوم والأغنية (صفحة 19) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="song-box">
            <button type="button" class="song-title" onclick="speakText('Sofia drinks from the bottle in her hand. Andy has filled his bucket with sand. There is a boat over there on the big blue sea. The beach is a wonderful place to be!')">
                🎵 7 Listen and sing. (استمع وغنِّ) 🔊
            </button>
            <div class="song-lines">
                <button type="button" class="song-line" onclick="speakText('Sofia drinks from the bottle in her hand.')">
                    <div class="en-text">Sofia drinks from the bottle in her hand.</div>
                    <div class="ar-text">تشرب صوفيا من الزجاجة التي في يدها.</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('Andy has filled his bucket with sand.')">
                    <div class="en-text">Andy has filled his bucket with sand.</div>
                    <div class="ar-text">ملأ أندي دلوه بالرمل.</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('There is a boat over there on the big blue sea.')">
                    <div class="en-text">There's a boat over there on the big blue sea.</div>
                    <div class="ar-text">هناك قارب هناك على البحر الأزرق الكبير.</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('The beach is a wonderful place to be!')">
                    <div class="en-text">The beach is a wonderful place to be!</div>
                    <div class="ar-text">الشاطئ مكان رائع لتكون فيه!</div>
                </button>
            </div>
        </div>
        <div class="words-grid">
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="غرفة نوم">🛏️</span><button type="button" class="english-word" onclick="speakText('bedroom')">bedroom 🔊</button><div class="arabic-translation">غرفة نوم</div></div>
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="ستارة نافذة">🪟</span><button type="button" class="english-word" onclick="speakText('blind')">blind 🔊</button><div class="arabic-translation">ستارة نافذة</div></div>
            <div class="word-card"><span class="badge-number">18</span><span class="word-illustration" role="img" aria-label="سرير">🛌</span><button type="button" class="english-word" onclick="speakText('bed')">bed 🔊</button><div class="arabic-translation">سرير</div></div>
            <div class="word-card"><span class="badge-number">19</span><span class="word-illustration" role="img" aria-label="بطانية">🛋️</span><button type="button" class="english-word" onclick="speakText('blanket')">blanket 🔊</button><div class="arabic-translation">بطانية</div></div>
            <div class="word-card"><span class="badge-number">20</span><span class="word-illustration" role="img" aria-label="كتاب">📖</span><button type="button" class="english-word" onclick="speakText('I love to read books!')">books! 🔊</button><div class="arabic-translation">أحب قراءة الكتب!</div></div>
            <div class="word-card"><span class="badge-number">22</span><span class="word-illustration" role="img" aria-label="خزانة كتب">📚</span><button type="button" class="english-word" onclick="speakText('bookcase')">bookcase 🔊</button><div class="arabic-translation">خزانة كتب</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 19</div>
</div>

<!-- ================= الصفحة السابعة: البناء ووسائل النقل والمجاورات (صفحة 20) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span class="active">Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="يبني">🧱</span><button type="button" class="english-word" onclick="speakText('build')">build 🔊</button><div class="arabic-translation">يبني</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="ممسحة">🧹</span><button type="button" class="english-word" onclick="speakText('broom')">broom 🔊</button><div class="arabic-translation">ممسحة</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="صندوق">📦</span><button type="button" class="english-word" onclick="speakText('box')">box 🔊</button><div class="arabic-translation">صندوق</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="بناء">👷</span><button type="button" class="english-word" onclick="speakText('builder')">builder 🔊</button><div class="arabic-translation">عامل بناء</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="حذاء طويل">🥾</span><button type="button" class="english-word" onclick="speakText('boot')">boot 🔊</button><div class="arabic-translation">حذاء طويل</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="مبنى">🏢</span><button type="button" class="english-word" onclick="speakText('building')">building 🔊</button><div class="arabic-translation">مبنى</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="طوب">🧱</span><button type="button" class="english-word" onclick="speakText('bricks')">bricks 🔊</button><div class="arabic-translation">طوب</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="محطة حافلات">🚏</span><button type="button" class="english-word" onclick="speakText('bus station')">bus station 🔊</button><div class="arabic-translation">محطة حافلات</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="حافلة">🚌</span><button type="button" class="english-word" onclick="speakText('bus')">bus 🔊</button><div class="arabic-translation">حافلة</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="موقف حافلات">🚏</span><button type="button" class="english-word" onclick="speakText('bus stop')">bus stop 🔊</button><div class="arabic-translation">موقف حافلات</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="خرز">📿</span><button type="button" class="english-word" onclick="speakText('beads')">beads 🔊</button><div class="arabic-translation">خرز</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="زر">🔘</span><button type="button" class="english-word" onclick="speakText('button')">button 🔊</button><div class="arabic-translation">زر</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 20</div>
</div>

<!-- ================= الصفحة الثامنة: الإفطار وحفلة عيد الميلاد (صفحة 21) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="خبز">🍞</span><button type="button" class="english-word" onclick="speakText('bread')">bread 🔊</button><div class="arabic-translation">خبز</div></div>
            <div class="word-card"><span class="badge-number">18</span><span class="word-illustration" role="img" aria-label="وعاء">🥣</span><button type="button" class="english-word" onclick="speakText('bowl')">bowl 🔊</button><div class="arabic-translation">وعاء</div></div>
            <div class="word-card"><span class="badge-number">19</span><span class="word-illustration" role="img" aria-label="فطور">🥣</span><button type="button" class="english-word" onclick="speakText('breakfast')">breakfast 🔊</button><div class="arabic-translation">إفطار</div></div>
            <div class="word-card"><span class="badge-number">20</span><span class="word-illustration" role="img" aria-label="موز">🍌</span><button type="button" class="english-word" onclick="speakText('banana')">banana 🔊</button><div class="arabic-translation">موز</div></div>
            <div class="word-card"><span class="badge-number">21</span><span class="word-illustration" role="img" aria-label="زبدة">🧈</span><button type="button" class="english-word" onclick="speakText('butter')">butter 🔊</button><div class="arabic-translation">زبدة</div></div>
            <div class="word-card"><span class="badge-number">22</span><span class="word-illustration" role="img" aria-label="توت أزرق">🫐</span><button type="button" class="english-word" onclick="speakText('blueberries')">blueberries 🔊</button><div class="arabic-translation">توت أزرق</div></div>
            <div class="word-card"><span class="badge-number">24</span><span class="word-illustration" role="img" aria-label="فرقة موسيقية">🎸</span><button type="button" class="english-word" onclick="speakText('band')">band 🔊</button><div class="arabic-translation">فرقة موسيقية</div></div>
            <div class="word-card"><span class="badge-number">25</span><span class="word-illustration" role="img" aria-label="برجر">🍔</span><button type="button" class="english-word" onclick="speakText('burger')">burger 🔊</button><div class="arabic-translation">برجر</div></div>
            <div class="word-card"><span class="badge-number">26</span><span class="word-illustration" role="img" aria-label="بسكويت">🍪</span><button type="button" class="english-word" onclick="speakText('biscuit')">biscuit 🔊</button><div class="arabic-translation">بسكويت</div></div>
            <div class="word-card"><span class="badge-number">27</span><span class="word-illustration" role="img" aria-label="حفلة عيد ميلاد">🥳</span><button type="button" class="english-word" onclick="speakText('Happy birthday, Ben!')">party 🔊</button><div class="arabic-translation">حفلة عيد ميلاد</div></div>
            <div class="word-card"><span class="badge-number">28</span><span class="word-illustration" role="img" aria-label="بالون">🎈</span><button type="button" class="english-word" onclick="speakText('balloon')">balloon 🔊</button><div class="arabic-translation">بالون</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 21</div>
</div>

<!-- ================= الصفحة التاسعة: الدراجة والمدينة (صفحة 22) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span class="active">Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span>
        </div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('I love riding my bicycle!')">
                🔊 "I love riding my bicycle!"
            </button>
            <div class="greeting-text">أحب ركوب دراجتي!</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="شرفة">🏢</span><button type="button" class="english-word" onclick="speakText('balcony')">balcony 🔊</button><div class="arabic-translation">شرفة</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="مبنى سكني">🏘️</span><button type="button" class="english-word" onclick="speakText('block of flats')">flats 🔊</button><div class="arabic-translation">مبنى شقق</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="جسر">🌉</span><button type="button" class="english-word" onclick="speakText('bridge')">bridge 🔊</button><div class="arabic-translation">جسر</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="مكتبة كتب">📚</span><button type="button" class="english-word" onclick="speakText('bookshop')">bookshop 🔊</button><div class="arabic-translation">مكتبة كتب</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="بنك">🏦</span><button type="button" class="english-word" onclick="speakText('bank')">bank 🔊</button><div class="arabic-translation">بنك</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="دراجة">🚲</span><button type="button" class="english-word" onclick="speakText('bicycle')">bicycle 🔊</button><div class="arabic-translation">دراجة</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="سرج الدراجة">💺</span><button type="button" class="english-word" onclick="speakText('saddle')">saddle 🔊</button><div class="arabic-translation">مقعد الدراجة</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="مقود الدراجة">🚲</span><button type="button" class="english-word" onclick="speakText('handlebar')">handlebar 🔊</button><div class="arabic-translation">مقود الدراجة</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="إطار">⭕</span><button type="button" class="english-word" onclick="speakText('tyre')">tyre 🔊</button><div class="arabic-translation">إطار</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="سلسلة">🔗</span><button type="button" class="english-word" onclick="speakText('chain')">chain 🔊</button><div class="arabic-translation">سلسلة</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="سلة">🧺</span><button type="button" class="english-word" onclick="speakText('basket')">basket 🔊</button><div class="arabic-translation">سلة</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="مقعد حديقة">🪑</span><button type="button" class="english-word" onclick="speakText('bench')">bench 🔊</button><div class="arabic-translation">مقعد حديقة</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 22</div>
</div>

<!-- ================= الصفحة العاشرة: المخبز والشراء (صفحة 23) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('I would like to buy some bread.')">
                🔊 "I'd like to buy some bread."
            </button>
            <div class="greeting-text">أود شراء بعض الخبز.</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="قارب">🛥️</span><button type="button" class="english-word" onclick="speakText('boat')">boat 🔊</button><div class="arabic-translation">قارب</div></div>
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="مخبز">🥖</span><button type="button" class="english-word" onclick="speakText('bakery')">bakery 🔊</button><div class="arabic-translation">مخبز</div></div>
            <div class="word-card"><span class="badge-number">18</span><span class="word-illustration" role="img" aria-label="خبز">🍞</span><button type="button" class="english-word" onclick="speakText('bread')">bread 🔊</button><div class="arabic-translation">خبز</div></div>
            <div class="word-card"><span class="badge-number">19</span><span class="word-illustration" role="img" aria-label="خباز">🧑‍🍳</span><button type="button" class="english-word" onclick="speakText('baker')">baker 🔊</button><div class="arabic-translation">خباز</div></div>
            <div class="word-card"><span class="badge-number">20</span><span class="word-illustration" role="img" aria-label="يشتري">🤝</span><button type="button" class="english-word" onclick="speakText('buy')">buy 🔊</button><div class="arabic-translation">يشتري</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 23</div>
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

