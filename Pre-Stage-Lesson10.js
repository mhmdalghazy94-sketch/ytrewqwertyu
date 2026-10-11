window.itqanLessonHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الدرس العاشر - كتاب اللغة الإنجليزية (Pp, Qq) (A4)</title>
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
    <span>الدرس العاشر - كتاب الإنجليزية (Pp, Qq) (A4)</span>
    <button type="button" class="print-btn" onclick="window.print()">🖨️ طباعة / نشر A4</button>
</div>

<!-- ================= الصفحة الأولى: الحرف Pp والفواكه والدب القطبي (صفحة 74) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span><span>Nn</span><span class="active" style="background-color: #247dc3; color: white; padding: 4px 6px; border-radius: 6px;">Pp</span>
        </div>
        <div class="main-letter">Pp</div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('Polar bears have black skin.')">
                🔊 "Polar bears have black skin."
            </button>
            <div class="greeting-text">الدببة القطبية لها جلد أسود[cite: 72].</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="أناناس">🍍</span><button type="button" class="english-word" onclick="speakText('pineapple')">pineapple 🔊</button><div class="arabic-translation">أناناس[cite: 72]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="كمثرى">🍐</span><button type="button" class="english-word" onclick="speakText('pear')">pear 🔊</button><div class="arabic-translation">كمثرى (إجاص)[cite: 72]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="برقوق">🟣</span><button type="button" class="english-word" onclick="speakText('plum')">plum 🔊</button><div class="arabic-translation">برقوق[cite: 72]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="خوخ">🍑</span><button type="button" class="english-word" onclick="speakText('peach')">peach 🔊</button><div class="arabic-translation">خوخ[cite: 72]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="بطاطس">🥔</span><button type="button" class="english-word" onclick="speakText('potato')">potato 🔊</button><div class="arabic-translation">بطاطس[cite: 72]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="يقطين">🎃</span><button type="button" class="english-word" onclick="speakText('pumpkin')">pumpkin 🔊</button><div class="arabic-translation">يقطين[cite: 72]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="بازلاء">🟢</span><button type="button" class="english-word" onclick="speakText('pea')">pea 🔊</button><div class="arabic-translation">بازلاء[cite: 72]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="فلفل">🫑</span><button type="button" class="english-word" onclick="speakText('pepper')">pepper 🔊</button><div class="arabic-translation">فلفل حلو[cite: 72]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="بطريق">🐧</span><button type="button" class="english-word" onclick="speakText('penguin')">penguin 🔊</button><div class="arabic-translation">بطريق[cite: 72]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="دب قطبي">🐻‍❄️</span><button type="button" class="english-word" onclick="speakText('polar bear')">bear 🔊</button><div class="arabic-translation">دب قطبي[cite: 72]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 74[cite: 72]</div>
</div>

<!-- ================= الصفحة الثانية: الحيوانات والخدمات والبريد (صفحة 75) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span class="active">Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('I have got a parcel.')">
                🔊 "I've got a parcel."
            </button>
            <div class="greeting-text">لدي طرد البريد[cite: 73].</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="حصان صغير">🐴</span><button type="button" class="english-word" onclick="speakText('pony')">pony 🔊</button><div class="arabic-translation">حصان قصير (بوني)[cite: 73]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="خنزير">🐖</span><button type="button" class="english-word" onclick="speakText('pig')">pig 🔊</button><div class="arabic-translation">خنزير[cite: 73]</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="يدفع">➡️</span><button type="button" class="english-word" onclick="speakText('push')">push 🔊</button><div class="arabic-translation">يدفع[cite: 73]</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="يسحب">⬅️</span><button type="button" class="english-word" onclick="speakText('pull')">pull 🔊</button><div class="arabic-translation">يسحب[cite: 73]</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="مكتب بريد">🏢</span><button type="button" class="english-word" onclick="speakText('post office')">office 🔊</button><div class="arabic-translation">مكتب بريد[cite: 73]</div></div>
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="مركز شرطة">🚓</span><button type="button" class="english-word" onclick="speakText('police station')">station 🔊</button><div class="arabic-translation">مركز شرطة[cite: 73]</div></div>
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="سيارة شرطة">🚔</span><button type="button" class="english-word" onclick="speakText('police car')">car 🔊</button><div class="arabic-translation">سيارة شرطة[cite: 73]</div></div>
            <div class="word-card"><span class="badge-number">19</span><span class="word-illustration" role="img" aria-label="طرد">📦</span><button type="button" class="english-word" onclick="speakText('parcel')">parcel 🔊</button><div class="arabic-translation">طرد بريدي[cite: 73]</div></div>
            <div class="word-card"><span class="badge-number">20</span><span class="word-illustration" role="img" aria-label="ساعي بريد">👨‍✈️</span><button type="button" class="english-word" onclick="speakText('postman')">postman 🔊</button><div class="arabic-translation">ساعي بريد[cite: 73]</div></div>
            <div class="word-card"><span class="badge-number">21</span><span class="word-illustration" role="img" aria-label="ضابط شرطة">👮‍♂️</span><button type="button" class="english-word" onclick="speakText('police officer')">officer 🔊</button><div class="arabic-translation">ضابط شرطة[cite: 73]</div></div>
            <div class="word-card"><span class="badge-number">22</span><span class="word-illustration" role="img" aria-label="رصيف المشاة">🛣️</span><button type="button" class="english-word" onclick="speakText('pavement')">pavement 🔊</button><div class="arabic-translation">رصيف الشارع[cite: 73]</div></div>
            <div class="word-card"><span class="badge-number">23</span><span class="word-illustration" role="img" aria-label="صندوق بريد">📮</span><button type="button" class="english-word" onclick="speakText('postbox')">postbox 🔊</button><div class="arabic-translation">صندوق بريد[cite: 73]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 75[cite: 73]</div>
</div>

<!-- ================= الصفحة الثالثة: البيانو والفنون والأدوات (صفحة 76) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span><span>Nn</span><span class="active" style="background-color: #247dc3; color: white; padding: 4px 6px; border-radius: 6px;">Pp</span>
        </div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('I love playing the piano!')">
                🔊 "I love playing the piano!"
            </button>
            <div class="greeting-text">أنا أحب عزف البيانو![cite: 74]</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="بيانو">🎹</span><button type="button" class="english-word" onclick="speakText('piano')">piano 🔊</button><div class="arabic-translation">بيانو[cite: 74]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="لوحة فنية">🖼️</span><button type="button" class="english-word" onclick="speakText('painting')">painting 🔊</button><div class="arabic-translation">لوحة فنية[cite: 74]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="صورة فوتوغرافية">📷</span><button type="button" class="english-word" onclick="speakText('photo')">photo 🔊</button><div class="arabic-translation">صورة[cite: 74]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="ملصق">🖼️</span><button type="button" class="english-word" onclick="speakText('poster')">poster 🔊</button><div class="arabic-translation">ملصق حائط[cite: 74]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="نبات">🪴</span><button type="button" class="english-word" onclick="speakText('plant')">plant 🔊</button><div class="arabic-translation">نبات منزلي[cite: 74]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="وعاء نبات">🏺</span><button type="button" class="english-word" onclick="speakText('pot')">pot 🔊</button><div class="arabic-translation">إناء الزرع[cite: 74]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="دمية متحركة">🪆</span><button type="button" class="english-word" onclick="speakText('puppet')">puppet 🔊</button><div class="arabic-translation">دمية خيطية[cite: 74]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="يلعب">🧸</span><button type="button" class="english-word" onclick="speakText('play')">play 🔊</button><div class="arabic-translation">يلعب[cite: 74]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="فرشاة رسم">🖌️</span><button type="button" class="english-word" onclick="speakText('paintbrush')">paintbrush 🔊</button><div class="arabic-translation">فرشاة رسم[cite: 74]</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="طابعة">🖨️</span><button type="button" class="english-word" onclick="speakText('printer')">printer 🔊</button><div class="arabic-translation">طابعة[cite: 74]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="هاتف">📱</span><button type="button" class="english-word" onclick="speakText('phone')">phone 🔊</button><div class="arabic-translation">هاتف محمول[cite: 74]</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="طلاء">🎨</span><button type="button" class="english-word" onclick="speakText('paint')">paint 🔊</button><div class="arabic-translation">طلاء / يلوّن[cite: 74]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 76[cite: 74]</div>
</div>

<!-- ================= الصفحة الرابعة: الملابس والأطعمة (صفحة 77) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span class="active">Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('What do you like on your pizza?')">
                🔊 "What do you like on your pizza?"
            </button>
            <div class="greeting-text">ماذا تفضل على البيتزا الخاصة بك؟[cite: 75]</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">19</span><span class="word-illustration" role="img" aria-label="جيب">👕</span><button type="button" class="english-word" onclick="speakText('pocket')">pocket 🔊</button><div class="arabic-translation">جيب[cite: 75]</div></div>
            <div class="word-card"><span class="badge-number">20</span><span class="word-illustration" role="img" aria-label="بيجامة">👕</span><button type="button" class="english-word" onclick="speakText('pyjamas')">pyjamas 🔊</button><div class="arabic-translation">ملابس نوم (بيجامة)[cite: 75]</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="بيتزا">🍕</span><button type="button" class="english-word" onclick="speakText('pizza')">pizza 🔊</button><div class="arabic-translation">بيتزا[cite: 75]</div></div>
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="طبق">🍽️</span><button type="button" class="english-word" onclick="speakText('plate')">plate 🔊</button><div class="arabic-translation">طبق[cite: 75]</div></div>
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="معكرونة">🍝</span><button type="button" class="english-word" onclick="speakText('pasta')">pasta 🔊</button><div class="arabic-translation">معكرونة (باستا)[cite: 75]</div></div>
            <div class="word-card"><span class="badge-number">18</span><span class="word-illustration" role="img" aria-label="فلفل حار">🌶️</span><button type="button" class="english-word" onclick="speakText('pepper')">pepper 🔊</button><div class="arabic-translation">فلفل أسود / حار[cite: 75]</div></div>
            <div class="word-card"><span class="badge-number">21</span><span class="word-illustration" role="img" aria-label="نقش">🎴</span><button type="button" class="english-word" onclick="speakText('pattern')">pattern 🔊</button><div class="arabic-translation">نمط / نقش[cite: 75]</div></div>
            <div class="word-card"><span class="badge-number">22</span><span class="word-illustration" role="img" aria-label="قماش سادة">🟨</span><button type="button" class="english-word" onclick="speakText('plain')">plain 🔊</button><div class="arabic-translation">سادة (بدون نقش)[cite: 75]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 77[cite: 75]</div>
</div>

<!-- ================= الصفحة الخامسة: الأدوات المدرسية والباندا والأفراح (صفحة 78) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span><span>Nn</span><span class="active" style="background-color: #247dc3; color: white; padding: 4px 6px; border-radius: 6px;">Pp</span>
        </div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('Pandas eat for up to 14 hours a day.')">
                🔊 "Pandas eat for up to 14 hours a day."
            </button>
            <div class="greeting-text">تاكل حيوانات الباندا لمدة تصل إلى 14 ساعة في اليوم[cite: 76].</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="ورق">📄</span><button type="button" class="english-word" onclick="speakText('paper')">paper 🔊</button><div class="arabic-translation">ورقة[cite: 76]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="قلم رصاص">✏️</span><button type="button" class="english-word" onclick="speakText('pencil')">pencil 🔊</button><div class="arabic-translation">قلم رصاص[cite: 76]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="مقلمة">📏</span><button type="button" class="english-word" onclick="speakText('pencil case')">case 🔊</button><div class="arabic-translation">مقلمة[cite: 76]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="قلم حبر">🖊️</span><button type="button" class="english-word" onclick="speakText('pen')">pen 🔊</button><div class="arabic-translation">قلم جاف[cite: 76]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="حفل">🎉</span><button type="button" class="english-word" onclick="speakTest('party')">party 🔊</button><div class="arabic-translation">حفلة[cite: 76]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="هدية">🎁</span><button type="button" class="english-word" onclick="speakTest('present')">present 🔊</button><div class="arabic-translation">هدية[cite: 76]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="عطر">🍾</span><button type="button" class="english-word" onclick="speakTest('perfume')">perfume 🔊</button><div class="arabic-translation">عطر[cite: 76]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="ألوان">🎨</span><button type="button" class="english-word" onclick="speakTest('paint')">paint 🔊</button><div class="arabic-translation">ألوان مائية[cite: 76]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="باندا">🐼</span><button type="button" class="english-word" onclick="speakText('panda')">panda 🔊</button><div class="arabic-translation">حيوان الباندا[cite: 76]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 78[cite: 76]</div>
</div>

<!-- ================= الصفحة السادسة: الأشخاص والأشياء (صفحة 79) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span class="active">Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="ببغاء">🦜</span><button type="button" class="english-word" onclick="speakText('parrot')">parrot 🔊</button><div class="arabic-translation">ببغاء[cite: 77]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="قرصان">🏴‍☠️</span><button type="button" class="english-word" onclick="speakText('pirate')">pirate 🔊</button><div class="arabic-translation">قرصان[cite: 77]</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="طائرة">✈️</span><button type="button" class="english-word" onclick="speakText('plane')">plane 🔊</button><div class="arabic-translation">طائرة[cite: 77]</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="مسافر">🧳</span><button type="button" class="english-word" onclick="speakText('passenger')">passenger 🔊</button><div class="arabic-translation">مسافر[cite: 77]</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="طيار">👨‍✈️</span><button type="button" class="english-word" onclick="speakText('pilot')">pilot 🔊</button><div class="arabic-translation">طيار[cite: 77]</div></div>
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="أشخاص">👥</span><button type="button" class="english-word" onclick="speakText('people')">people 🔊</button><div class="arabic-translation">أشخاص / ناس[cite: 77]</div></div>
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="أطفال">👶</span><button type="button" class="english-word" onclick="speakText('children')">children 🔊</button><div class="arabic-translation">أطفال[cite: 77]</div></div>
            <div class="word-card"><span class="badge-number">18</span><span class="word-illustration" role="img" aria-label="ولد">👦</span><button type="button" class="english-word" onclick="speakText('boy')">boy 🔊</button><div class="arabic-translation">ولد[cite: 77]</div></div>
            <div class="word-card"><span class="badge-number">19</span><span class="word-illustration" role="img" aria-label="رجل">👨</span><button type="button" class="english-word" onclick="speakText('man')">man 🔊</button><div class="arabic-translation">رجل[cite: 77]</div></div>
            <div class="word-card"><span class="badge-number">20</span><span class="word-illustration" role="img" aria-label="رجال">👨‍🦰</span><button type="button" class="english-word" onclick="speakText('men')">men 🔊</button><div class="arabic-translation">رجال[cite: 77]</div></div>
            <div class="word-card"><span class="badge-number">21</span><span class="word-illustration" role="img" aria-label="بنت">👧</span><button type="button" class="english-word" onclick="speakText('girl')">girl 🔊</button><div class="arabic-translation">فتاة[cite: 77]</div></div>
            <div class="word-card"><span class="badge-number">22</span><span class="word-illustration" role="img" aria-label="امرأة">👩</span><button type="button" class="english-word" onclick="speakText('woman')">woman 🔊</button><div class="arabic-translation">امرأة[cite: 77]</div></div>
            <div class="word-card"><span class="badge-number">23</span><span class="word-illustration" role="img" aria-label="نساء">👩‍🦰</span><button type="button" class="english-word" onclick="speakText('women')">women 🔊</button><div class="arabic-translation">نساء[cite: 77]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 79[cite: 77]</div>
</div>

<!-- ================= الصفحة السابعة: المتنزه والطبيعة (صفحة 80) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span><span>Nn</span><span class="active" style="background-color: #247dc3; color: white; padding: 4px 6px; border-radius: 6px;">Pp</span>
        </div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('This is a pretty park.')">
                🔊 "This is a pretty park."
            </button>
            <div class="greeting-text">هذه حديقة جميلة[cite: 78].</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="متنزه">🌳</span><button type="button" class="english-word" onclick="speakText('park')">park 🔊</button><div class="arabic-translation">متنزه / حديقة عامة[cite: 78]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="مسار">🛤️</span><button type="button" class="english-word" onclick="speakText('path')">path 🔊</button><div class="arabic-translation">ممر / مسار[cite: 78]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="عربة أطفال">🛞</span><button type="button" class="english-word" onclick="speakText('pushchair')">pushchair 🔊</button><div class="arabic-translation">عربة أطفال[cite: 78]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="نزهة">🧺</span><button type="button" class="english-word" onclick="speakText('picnic')">picnic 🔊</button><div class="arabic-translation">نزهة خلوية[cite: 78]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="بركة مياه">🦆</span><button type="button" class="english-word" onclick="speakText('pond')">pond 🔊</button><div class="arabic-translation">بركة ماء[cite: 78]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="بركة طين">💧</span><button type="button" class="english-word" onclick="speakText('puddle')">puddle 🔊</button><div class="arabic-translation">بركة ماء صغيرة (مستنقع)[cite: 78]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="بلاستيك">🧪</span><button type="button" class="english-word" onclick="speakText('plastic')">plastic 🔊</button><div class="arabic-translation">بلاستيك[cite: 78]</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="فطيرة">🥧</span><button type="button" class="english-word" onclick="speakText('pie')">pie 🔊</button><div class="arabic-translation">فطيرة[cite: 78]</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="مشبك ورق">📎</span><button type="button" class="english-word" onclick="speakText('paperclip')">paperclip 🔊</button><div class="arabic-translation">مشبك ورق[cite: 78]</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="فشار">🍿</span><button type="button" class="english-word" onclick="speakText('popcorn')">popcorn 🔊</button><div class="arabic-translation">فشار[cite: 78]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 80[cite: 78]</div>
</div>

<!-- ================= الصفحة الثامنة: الحيوانات الأليفة والأغنية (صفحة 81) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span class="active">Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="song-box">
            <button type="button" class="song-title" onclick="speakText('Let us have a picnic in the park! There is not a cloud in the sky. The puppy can run, you can play and have fun, and I will make a pumpkin pie.')">
                🎵 8 Listen and sing. (استمع وغنِّ) 🔊
            </button>
            <div class="song-lines">
                <button type="button" class="song-line" onclick="speakText('Let us have a picnic in the park!')">
                    <div class="en-text">Let's have a picnic in the park!</div>
                    <div class="ar-text">دعنا نقيم نزهة في المتنزه![cite: 79]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('There is not a cloud in the sky.')">
                    <div class="en-text">There's not a cloud in the sky.</div>
                    <div class="ar-text">ليس هناك سحابة واحدة في السماء.[cite: 79]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('The puppy can run, you can play and have fun, and I will make a pumpkin pie.')">
                    <div class="en-text">The puppy can run, you can play and have fun, and I'll make a pumpkin pie.</div>
                    <div class="ar-text">الجرو الصغير يمكنه الركض، ويمكنك اللعب المرح، وسأصنع فطيرة يقطين.[cite: 79]</div>
                </button>
            </div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">19</span><span class="word-illustration" role="img" aria-label="حيوانات أليفة">🐕</span><button type="button" class="english-word" onclick="speakText('pets')">pets 🔊</button><div class="arabic-translation">حيوانات أليفة[cite: 79]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="جرو">🐶</span><button type="button" class="english-word" onclick="speakText('puppy')">puppy 🔊</button><div class="arabic-translation">جرو (كلب صغير)[cite: 79]</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="مخلب">🐾</span><button type="button" class="english-word" onclick="speakText('paw')">paw 🔊</button><div class="arabic-translation">مخلب الحيوان[cite: 79]</div></div>
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="فطائر دائرية">🥞</span><button type="button" class="english-word" onclick="speakText('pancakes')">pancakes 🔊</button><div class="arabic-translation">فطائر محلاة (بان كيك)[cite: 79]</div></div>
            <div class="word-card"><span class="badge-number">18</span><span class="word-illustration" role="img" aria-label="بطاقة بريدية">🖼️</span><button type="button" class="english-word" onclick="speakText('postcard')">postcard 🔊</button><div class="arabic-translation">بطاقة بريدية[cite: 79]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 81[cite: 79]</div>
</div>

<!-- ================= الصفحة التاسعة: الكواكب والعائلة الملكية (صفحة 82) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span><span>Nn</span><span>Pp</span><span class="active" style="background-color: #c2185b; color: white; padding: 4px 6px; border-radius: 6px;">Qq</span>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="كواكب">🪐</span><button type="button" class="english-word" onclick="speakText('planets')">planets 🔊</button><div class="arabic-translation">الكواكب[cite: 80]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="شمس">☀️</span><button type="button" class="english-word" onclick="speakText('sun')">sun 🔊</button><div class="arabic-translation">الشمس[cite: 80]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="قصر">🏰</span><button type="button" class="english-word" onclick="speakText('palace')">palace 🔊</button><div class="arabic-translation">قصر[cite: 80]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="طاووس">🦚</span><button type="button" class="english-word" onclick="speakText('peacock')">peacock 🔊</button><div class="arabic-translation">طاووس[cite: 80]</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="أميرة">👸</span><button type="button" class="english-word" onclick="speakText('princess')">princess 🔊</button><div class="arabic-translation">أميرة[cite: 80]</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="أمير">🤴</span><button type="button" class="english-word" onclick="speakText('prince')">prince 🔊</button><div class="arabic-translation">أمير[cite: 80]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 82[cite: 80]</div>
</div>

<!-- ================= الصفحة العاشرة: الحرف Qq والأغنية الملكية (صفحة 83) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span class="active">Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="main-letter" style="color: #c2185b;">Qq</div>
        <div class="song-box">
            <button type="button" class="song-title" onclick="speakText('Quick! Come and see the queen sitting on her golden throne! The prince and princess are happy when their mother is home.')">
                🎵 16 Listen and sing. (استمع وغنِّ) 🔊
            </button>
            <div class="song-lines">
                <button type="button" class="song-line" onclick="speakText('Quick! Come and see the queen sitting on her golden throne!')">
                    <div class="en-text">Quick! Come and see the queen sitting on her golden throne!</div>
                    <div class="ar-text">سريعا! تعرّف وتعال لرؤية الملكة جالسة على عرشها الذهبي![cite: 81]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('The prince and princess are happy when their mother is home.')">
                    <div class="en-text">The prince and princess are happy when their mother's home.</div>
                    <div class="ar-text">الأمير والأميرة سعداء عندما تكون والدتهم في المنزل.[cite: 81]</div>
                </button>
            </div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="ملكة">👑</span><button type="button" class="english-word" onclick="speakText('queen')">queen 🔊</button><div class="arabic-translation">ملكة[cite: 81]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 83[cite: 81]</div>
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
