window.itqanLessonHtml = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الدرس السابع - كتاب اللغة الإنجليزية (Ii, Jj, Kk) (A4)</title>
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
    <span>الدرس السابع - كتاب الإنجليزية (Ii, Jj, Kk) (A4)</span>
    <button type="button" class="print-btn" onclick="window.print()">🖨️ طباعة / نشر A4</button>
</div>

<!-- ================= الصفحة الأولى: الحرف Ii والأغنية والقطبيات (صفحة 56) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span class="active">Ii</span><span>Jj</span>
            <span>Kk</span><span>LI</span><span>Mm</span>
        </div>
        <div class="main-letter">Ii</div>
        <div class="song-box">
            <button type="button" class="song-title" onclick="speakText('It is cold on the island. There is an iceberg in the sea. There are penguins on the ice. Let us count them: one, two, three! Yes, it is cold on the island, but it is a great place to be!')">
                🎵 4 Listen and sing. (استمع وغنِّ) 🔊
            </button>
            <div class="song-lines">
                <button type="button" class="song-line" onclick="speakText('It is cold on the island.')">
                    <div class="en-text">It's cold on the island.</div>
                    <div class="ar-text">الجو بارد في الجزيرة[cite: 44].</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('There is an iceberg in the sea.')">
                    <div class="en-text">There's an iceberg in the sea.</div>
                    <div class="ar-text">هناك جبل جليدي في البحر[cite: 44].</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('There are penguins on the ice. Let us count them: one, two, three!')">
                    <div class="en-text">There are penguins on the ice. Let's count them: one, two, three!</div>
                    <div class="ar-text">هناك بطاريق على الجليد. لنعدّها: واحد، اثنان، ثلاثة![cite: 44]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('Yes, it is cold on the island, but it is a great place to be!')">
                    <div class="en-text">Yes, it's cold on the island, but it's a great place to be!</div>
                    <div class="ar-text">نعم، الجو بارد في الجزيرة، لكنه مكان رائع لتكون فيه![cite: 44]</div>
                </button>
            </div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="كوخ جليدي">🏠</span><button type="button" class="english-word" onclick="speakText('igloo')">igloo 🔊</button><div class="arabic-translation">كوخ جليدي (إيجلو)[cite: 44]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="جبل جليدي">🧊</span><button type="button" class="english-word" onclick="speakText('iceberg')">iceberg 🔊</button><div class="arabic-translation">جبل جليدي[cite: 44]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="جليد">❄️</span><button type="button" class="english-word" onclick="speakText('ice')">ice 🔊</button><div class="arabic-translation">جليد[cite: 44]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="مكواة">🪡</span><button type="button" class="english-word" onclick="speakText('iron')">iron 🔊</button><div class="arabic-translation">مكواة[cite: 44]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="حشرات">🐜</span><button type="button" class="english-word" onclick="speakText('insects')">insects 🔊</button><div class="arabic-translation">حشرات[cite: 44]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="آلات موسيقية">🎻</span><button type="button" class="english-word" onclick="speakText('instruments')">instruments 🔊</button><div class="arabic-translation">آلات موسيقية[cite: 44]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 56[cite: 44]</div>
</div>

<!-- ================= الصفحة الثانية: الجليد والتزلج والجزيرة (صفحة 57) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('I am good at ice skating!')">
                🔊 "I am good at ice skating!"
            </button>
            <div class="greeting-text">أنا جيد في التزلج على الجليد![cite: 45]</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="شاحنة مثلجات">🚐</span><button type="button" class="english-word" onclick="speakText('ice-cream van')">van 🔊</button><div class="arabic-translation">شاحنة مثلجات[cite: 45]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="مصاصة مثلجات">🍧</span><button type="button" class="english-word" onclick="speakText('ice lolly')">lolly 🔊</button><div class="arabic-translation">مصاصة مثلجات[cite: 45]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="آيس كريم">🍦</span><button type="button" class="english-word" onclick="speakText('ice cream')">cream 🔊</button><div class="arabic-translation">آيس كريم[cite: 45]</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="حلبة تزلج">⛸️</span><button type="button" class="english-word" onclick="speakText('ice rink')">rink 🔊</button><div class="arabic-translation">حلبة تزلج جليدية[cite: 45]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="هوكي الجليد">🏒</span><button type="button" class="english-word" onclick="speakText('ice hockey')">hockey 🔊</button><div class="arabic-translation">هوكي الجليد[cite: 45]</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="التزلج على الجليد">⛸️</span><button type="button" class="english-word" onclick="speakText('ice skating')">skating 🔊</button><div class="arabic-translation">التزلج على الجليد[cite: 45]</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="حذاء تزلج">🛼</span><button type="button" class="english-word" onclick="speakText('ice skate')">skate 🔊</button><div class="arabic-translation">حذاء تزلج[cite: 45]</div></div>
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="جزيرة">🏝️</span><button type="button" class="english-word" onclick="speakText('island')">island 🔊</button><div class="arabic-translation">جزيرة[cite: 45]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 57[cite: 45]</div>
</div>

<!-- ================= الصفحة الثالثة: الحرف Jj والأدغال وقناديل البحر (صفحة 58) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span class="active">Jj</span>
            <span>Kk</span><span>LI</span><span>Mm</span>
        </div>
        <div class="main-letter">Jj</div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('Some jellyfish glow in the dark.')">
                🔊 "Some jellyfish glow in the dark."
            </button>
            <div class="greeting-text">بعض قناديل البحر تتوهج في الظلام[cite: 46].</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="نمر رقطاء (جاغوار)">🐆</span><button type="button" class="english-word" onclick="speakText('jaguar')">jaguar 🔊</button><div class="arabic-translation">نمر رقطاء (جاغوار)[cite: 46]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="غابة استوائية">🌴</span><button type="button" class="english-word" onclick="speakText('jungle')">jungle 🔊</button><div class="arabic-translation">أدغال / غابة استوائية[cite: 46]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="قنديل بحر">🪼</span><button type="button" class="english-word" onclick="speakText('jellyfish')">jellyfish 🔊</button><div class="arabic-translation">قنديل البحر[cite: 46]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="وظائف">🧑‍💼</span><button type="button" class="english-word" onclick="speakText('jobs')">jobs 🔊</button><div class="arabic-translation">وظائف / مهن[cite: 46]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="يصل / يربط">🧩</span><button type="button" class="english-word" onclick="speakText('join')">join 🔊</button><div class="arabic-translation">ينضم / يربط[cite: 46]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="أحجية الصور المقطوعة">🧩</span><button type="button" class="english-word" onclick="speakText('jigsaw puzzle')">puzzle 🔊</button><div class="arabic-translation">أحجية الصور (بازل)[cite: 46]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="يقفز">🦘</span><button type="button" class="english-word" onclick="speakText('jump')">jump 🔊</button><div class="arabic-translation">يقفز[cite: 46]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 58[cite: 46]</div>
</div>

<!-- ================= الصفحة الرابعة: مفردات بحرف Jj والأغنية (صفحة 59) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="song-box">
            <button type="button" class="song-title" onclick="speakText('There is a jaguar in the jungle. There is a jellyfish in the sea. There is a glass of juice on the table, please leave some for me!')">
                🎵 17 Listen and sing. (استمع وغنِّ) 🔊
            </button>
            <div class="song-lines">
                <button type="button" class="song-line" onclick="speakText('There is a jaguar in the jungle.')">
                    <div class="en-text">There's a jaguar in the jungle.</div>
                    <div class="ar-text">هناك نمر جاغوار في الأدغال[cite: 47].</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('There is a jellyfish in the sea.')">
                    <div class="en-text">There's a jellyfish in the sea.</div>
                    <div class="ar-text">هناك قنديل بحر في البحر[cite: 47].</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('There is a glass of juice on the table, please leave some for me!')">
                    <div class="en-text">There's a glass of juice on the table... please leave some for me!</div>
                    <div class="ar-text">هناك كوب عصير على الطاولة... من فضلك اترك بعضاً منه لي![cite: 47]</div>
                </button>
            </div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="برطمان">🫙</span><button type="button" class="english-word" onclick="speakText('jar')">jar 🔊</button><div class="arabic-translation">برطمان / وعاء زجاجي[cite: 47]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="جيلي">🍮</span><button type="button" class="english-word" onclick="speakText('jelly')">jelly 🔊</button><div class="arabic-translation">جيلي[cite: 47]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="إبريق">🏺</span><button type="button" class="english-word" onclick="speakText('jug')">jug 🔊</button><div class="arabic-translation">إبريق[cite: 47]</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="عصير">🧃</span><button type="button" class="english-word" onclick="speakText('juice')">juice 🔊</button><div class="arabic-translation">عصير[cite: 47]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="مربى">🍓</span><button type="button" class="english-word" onclick="speakText('jam')">jam 🔊</button><div class="arabic-translation">مربى[cite: 47]</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="سترة">🧥</span><button type="button" class="english-word" onclick="speakText('jacket')">jacket 🔊</button><div class="arabic-translation">سترة / جاكيت[cite: 47]</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="كنزة صوفية">👕</span><button type="button" class="english-word" onclick="speakText('jumper')">jumper 🔊</button><div class="arabic-translation">كنزة صوفية[cite: 47]</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="مجوهرات">💍</span><button type="button" class="english-word" onclick="speakText('jewellery')">jewellery 🔊</button><div class="arabic-translation">مجوهرات[cite: 47]</div></div>
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="بنطلون جينز">👖</span><button type="button" class="english-word" onclick="speakText('jeans')">jeans 🔊</button><div class="arabic-translation">بنطلون جينز[cite: 47]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 59[cite: 47]</div>
</div>

<!-- ================= الصفحة الخامسة: الحرف Kk والأغنية (صفحة 60) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span class="active">Kk</span><span>LI</span><span>Mm</span>
        </div>
        <div class="main-letter">Kk</div>
        <div class="song-box">
            <button type="button" class="song-title" onclick="speakText('The king keeps his keys in his pocket. The cat keeps her kitten by her side. Kangaroos keep their joeys in a pouch, so the babies are comfortable inside.')">
                🎵 3 Listen and sing. (استمع وغنِّ) 🔊
            </button>
            <div class="song-lines">
                <button type="button" class="song-line" onclick="speakText('The king keeps his keys in his pocket.')">
                    <div class="en-text">The king keeps his keys in his pocket.</div>
                    <div class="ar-text">الملك يحتفظ بمفاتيحه في جيبه[cite: 48].</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('The cat keeps her kitten by her side.')">
                    <div class="en-text">The cat keeps her kitten by her side.</div>
                    <div class="ar-text">القطة تبقي صغيرها (القطت الصغير) بجانبها[cite: 48].</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('Kangaroos keep their joeys in a pouch, so the babies are comfortable inside.')">
                    <div class="en-text">Kangaroos keep their joeys in a pouch, so the babies are comfortable inside.</div>
                    <div class="ar-text">تحتفظ الكنغر بصغارها في جيبها، ليكون الصغار مرتاحين بالداخل[cite: 48].</div>
                </button>
            </div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="كنغر">🦘</span><button type="button" class="english-word" onclick="speakText('kangaroo')">kangaroo 🔊</button><div class="arabic-translation">كنغر[cite: 48]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="كوالا">🐨</span><button type="button" class="english-word" onclick="speakText('koala')">koala 🔊</button><div class="arabic-translation">كوالا[cite: 48]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 60[cite: 48]</div>
</div>

<!-- ================= الصفحة السادسة: المطبخ والأشياء والأفعال بحرف Kk (صفحة 61) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="مطبخ">🍳</span><button type="button" class="english-word" onclick="speakText('kitchen')">kitchen 🔊</button><div class="arabic-translation">مطبخ[cite: 49]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="غلاية ماء">🫖</span><button type="button" class="english-word" onclick="speakText('kettle')">kettle 🔊</button><div class="arabic-translation">غلاية[cite: 49]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="كيوي">🥝</span><button type="button" class="english-word" onclick="speakText('kiwi')">kiwi 🔊</button><div class="arabic-translation">كيوي[cite: 49]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="سكين">🔪</span><button type="button" class="english-word" onclick="speakText('knife')">knife 🔊</button><div class="arabic-translation">سكين[cite: 49]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="قط صغير">🐈‍⬛</span><button type="button" class="english-word" onclick="speakText('kitten')">kitten 🔊</button><div class="arabic-translation">قط صغير (كيتن)[cite: 49]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="ملك">👑</span><button type="button" class="english-word" onclick="speakText('king')">king 🔊</button><div class="arabic-translation">ملك[cite: 49]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="مفتاح">🔑</span><button type="button" class="english-word" onclick="speakText('key')">key 🔊</button><div class="arabic-translation">مفتاح[cite: 49]</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="حلقة مفاتيح">🔑</span><button type="button" class="english-word" onclick="speakText('key ring')">ring 🔊</button><div class="arabic-translation">ميدالية مفاتيح[cite: 49]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="طائرة ورقية">🪁</span><button type="button" class="english-word" onclick="speakText('kite')">kite 🔊</button><div class="arabic-translation">طائرة ورقية[cite: 49]</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="يحاك / يغزل">🧶</span><button type="button" class="english-word" onclick="speakText('knit')">knit 🔊</button><div class="arabic-translation">يحاك / ينسج[cite: 49]</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="يركل الكرة">⚽</span><button type="button" class="english-word" onclick="speakText('kick')">kick 🔊</button><div class="arabic-translation">ركلة / يركل[cite: 49]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 61[cite: 49]</div>
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
