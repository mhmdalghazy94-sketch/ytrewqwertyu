window.itqanLessonHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الدرس التاسع - كتاب اللغة الإنجليزية (Nn, Oo) (A4)</title>
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
    <span>الدرس التاسع - كتاب الإنجليزية (Nn, Oo) (A4)</span>
    <button type="button" class="print-btn" onclick="window.print()">🖨️ طباعة / نشر A4</button>
</div>

<!-- ================= الصفحة الأولى: الحرف Nn والأغنية ومفرداته (صفحة 70) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span><span class="active">Nn</span>
        </div>
        <div class="main-letter">Nn</div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('I can count up to twenty.')">
                🔊 "I can count up to twenty."
            </button>
            <div class="greeting-text">يمكنني العد حتى العشرين[cite: 58].</div>
        </div>
        <div class="song-box">
            <button type="button" class="song-title" onclick="speakText('I really like the number nine, at night when the stars all shine. I write all the numbers in my notebook.')">
                🎵 1 Listen and sing. (استمع وغنِّ) 🔊
            </button>
            <div class="song-lines">
                <button type="button" class="song-line" onclick="speakText('I really like the number nine,')">
                    <div class="en-text">I really like the number nine,</div>
                    <div class="ar-text">أحب حقاً الرقم تسعة[cite: 58].</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('at night when the stars all shine.')">
                    <div class="en-text">at night when the stars all shine.</div>
                    <div class="ar-text">في الليل عندما تتألق جميع النجوم[cite: 58].</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('I write all the numbers in my notebook.')">
                    <div class="en-text">I write all the numbers in my notebook.</div>
                    <div class="ar-text">أكتب كل الأرقام في دفتر ملاحظاتي[cite: 58].</div>
                </button>
            </div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="ليل">🌙</span><button type="button" class="english-word" onclick="speakText('night')">night 🔊</button><div class="arabic-translation">ليل[cite: 58]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="ممرضة">👩‍⚕️</span><button type="button" class="english-word" onclick="speakText('nurse')">nurse 🔊</button><div class="arabic-translation">ممرضة[cite: 58]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="رقبة">🦒</span><button type="button" class="english-word" onclick="speakText('neck')">neck 🔊</button><div class="arabic-translation">رقبة[cite: 58]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="أنف">👃</span><button type="button" class="english-word" onclick="speakText('nose')">nose 🔊</button><div class="arabic-translation">أنف[cite: 58]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="قلادة">📿</span><button type="button" class="english-word" onclick="speakText('necklace')">necklace 🔊</button><div class="arabic-translation">قلادة[cite: 58]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="منخر">👃</span><button type="button" class="english-word" onclick="speakText('nostril')">nostril 🔊</button><div class="arabic-translation">منخر (فتحة الأنف)[cite: 58]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="دفتر ملاحظات">📓</span><button type="button" class="english-word" onclick="speakText('notebook')">notebook 🔊</button><div class="arabic-translation">دفتر ملاحظات[cite: 58]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="مكسرات">🥜</span><button type="button" class="english-word" onclick="speakText('nuts')">nuts 🔊</button><div class="arabic-translation">مكسرات[cite: 58]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="جريدة">📰</span><button type="button" class="english-word" onclick="speakText('newspaper')">newspaper 🔊</button><div class="arabic-translation">جريدة[cite: 58]</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="عش طائر">🪹</span><button type="button" class="english-word" onclick="speakText('nest')">nest 🔊</button><div class="arabic-translation">عش[cite: 58]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 70[cite: 58]</div>
</div>

<!-- ================= الصفحة الثانية: الأرقام بالأنجليزية (صفحة 71) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="main-title" style="font-size: 1.5rem; margin-bottom: 15px; font-weight: bold; color: #c2185b;">Numbers 1 to 20</div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">13</span><button type="button" class="english-word" onclick="speakText('one')">one (1) 🔊</button><div class="arabic-translation">واحد[cite: 59]</div></div>
            <div class="word-card"><span class="badge-number">14</span><button type="button" class="english-word" onclick="speakText('two')">two (2) 🔊</button><div class="arabic-translation">اثنان[cite: 59]</div></div>
            <div class="word-card"><span class="badge-number">15</span><button type="button" class="english-word" onclick="speakText('three')">three (3) 🔊</button><div class="arabic-translation">ثلاثة[cite: 59]</div></div>
            <div class="word-card"><span class="badge-number">16</span><button type="button" class="english-word" onclick="speakText('four')">four (4) 🔊</button><div class="arabic-translation">أربعة[cite: 59]</div></div>
            <div class="word-card"><span class="badge-number">17</span><button type="button" class="english-word" onclick="speakText('five')">five (5) 🔊</button><div class="arabic-translation">خمسة[cite: 59]</div></div>
            <div class="word-card"><span class="badge-number">18</span><button type="button" class="english-word" onclick="speakText('six')">six (6) 🔊</button><div class="arabic-translation">ستة[cite: 59]</div></div>
            <div class="word-card"><span class="badge-number">19</span><button type="button" class="english-word" onclick="speakText('seven')">seven (7) 🔊</button><div class="arabic-translation">سبعة[cite: 59]</div></div>
            <div class="word-card"><span class="badge-number">20</span><button type="button" class="english-word" onclick="speakText('eight')">eight (8) 🔊</button><div class="arabic-translation">ثمانية[cite: 59]</div></div>
            <div class="word-card"><span class="badge-number">21</span><button type="button" class="english-word" onclick="speakText('nine')">nine (9) 🔊</button><div class="arabic-translation">تسعة[cite: 59]</div></div>
            <div class="word-card"><span class="badge-number">22</span><button type="button" class="english-word" onclick="speakText('ten')">ten (10) 🔊</button><div class="arabic-translation">عشرة[cite: 59]</div></div>
            <div class="word-card"><span class="badge-number">23</span><button type="button" class="english-word" onclick="speakText('eleven')">eleven (11) 🔊</button><div class="arabic-translation">أحد عشر[cite: 59]</div></div>
            <div class="word-card"><span class="badge-number">24</span><button type="button" class="english-word" onclick="speakText('twelve')">twelve (12) 🔊</button><div class="arabic-translation">اثنا عشر[cite: 59]</div></div>
            <div class="word-card"><span class="badge-number">25</span><button type="button" class="english-word" onclick="speakText('thirteen')">thirteen (13) 🔊</button><div class="arabic-translation">ثلاثة عشر[cite: 59]</div></div>
            <div class="word-card"><span class="badge-number">26</span><button type="button" class="english-word" onclick="speakText('fourteen')">fourteen (14) 🔊</button><div class="arabic-translation">أربعة عشر[cite: 59]</div></div>
            <div class="word-card"><span class="badge-number">27</span><button type="button" class="english-word" onclick="speakText('fifteen')">fifteen (15) 🔊</button><div class="arabic-translation">خمسة عشر[cite: 59]</div></div>
            <div class="word-card"><span class="badge-number">28</span><button type="button" class="english-word" onclick="speakText('sixteen')">sixteen (16) 🔊</button><div class="arabic-translation">ستة عشر[cite: 59]</div></div>
            <div class="word-card"><span class="badge-number">29</span><button type="button" class="english-word" onclick="speakText('seventeen')">seventeen (17) 🔊</button><div class="arabic-translation">سبعة عشر[cite: 59]</div></div>
            <div class="word-card"><span class="badge-number">30</span><button type="button" class="english-word" onclick="speakText('eighteen')">eighteen (18) 🔊</button><div class="arabic-translation">ثمانية عشر[cite: 59]</div></div>
            <div class="word-card"><span class="badge-number">31</span><button type="button" class="english-word" onclick="speakText('nineteen')">nineteen (19) 🔊</button><div class="arabic-translation">تسعة عشر[cite: 59]</div></div>
            <div class="word-card"><span class="badge-number">32</span><button type="button" class="english-word" onclick="speakText('twenty')">twenty (20) 🔊</button><div class="arabic-translation">عشرون[cite: 59]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 71[cite: 59]</div>
</div>

<!-- ================= الصفحة الثالثة: الحرف Oo والمحيط والمطبخ (صفحة 72) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span><span>Nn</span><span class="active" style="background-color: #247dc3; color: white; padding: 4px 6px; border-radius: 6px;">Oo</span>
        </div>
        <div class="main-letter" style="color: #4d8c31;">Oo</div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('I am making a salad.')">
                🔊 "I'm making a salad."
            </button>
            <div class="greeting-text">أنا أعدّ سلطة[cite: 60].</div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="مجداف">🛶</span><button type="button" class="english-word" onclick="speakText('oar')">oar 🔊</button><div class="arabic-translation">مجداف[cite: 60]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="محيط">🌊</span><button type="button" class="english-word" onclick="speakText('ocean')">ocean 🔊</button><div class="arabic-translation">محيط[cite: 60]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="أخطبوط">🐙</span><button type="button" class="english-word" onclick="speakText('octopus')">octopus 🔊</button><div class="arabic-translation">أخطبوط[cite: 60]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="برتقال">🍊</span><button type="button" class="english-word" onclick="speakText('orange')">orange 🔊</button><div class="arabic-translation">برتقال[cite: 60]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="زيتون">🫒</span><button type="button" class="english-word" onclick="speakText('olive')">olive 🔊</button><div class="arabic-translation">زيتون[cite: 60]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="فرن">🔥</span><button type="button" class="english-word" onclick="speakText('oven')">oven 🔊</button><div class="arabic-translation">فرن[cite: 60]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="بصل">🧅</span><button type="button" class="english-word" onclick="speakText('onion')">onion 🔊</button><div class="arabic-translation">بصل[cite: 60]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 72[cite: 60]</div>
</div>

<!-- ================= الصفحة الرابعة: مفردات بحرف Oo والأغنية (صفحة 73) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span class="active">Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="greeting-box">
            <button type="button" class="greeting-speaker" onclick="speakText('Owl eggs are almost completely round.')">
                🔊 "Owl eggs are almost completely round."
            </button>
            <div class="greeting-text">بيوض البوم دائرية الشكل تماماً تقريباً[cite: 61].</div>
        </div>
        <div class="song-box">
            <button type="button" class="song-title" onclick="speakText('There is a stream at the bottom of the hill, where some otters swim around. There is an owl in a tree looking at me, making his odd little sound (tu-whit, tu-whoo), making his odd little sound.')">
                🎵 15 Listen and sing. (استمع وغنِّ) 🔊
            </button>
            <div class="song-lines">
                <button type="button" class="song-line" onclick="speakText('There is a stream at the bottom of the hill, where some otters swim around.')">
                    <div class="en-text">There's a stream at the bottom of the hill, where some otters swim around.</div>
                    <div class="ar-text">هناك جدول ماء أسفل التل، حيث تسبح بعض حيوانات الثعالب المائية[cite: 61].</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('There is an owl in a tree looking at me, making his odd little sound, tu-whit, tu-whoo.')">
                    <div class="en-text">There's an owl in a tree looking at me, making his odd little sound (tu-whit, tu-whoo)...</div>
                    <div class="ar-text">هناك بومة على شجرة تنظر إليّ، تصدر صوتها الغريب الصغير (تو-ويت، تو-هوو)[cite: 61].</div>
                </button>
            </div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="مكتب عمل">🏢</span><button type="button" class="english-word" onclick="speakText('office')">office 🔊</button><div class="arabic-translation">مكتب / شركة[cite: 61]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="متوقف / خارج">🔌</span><button type="button" class="english-word" onclick="speakText('off')">off 🔊</button><div class="arabic-translation">مغلق / إيقاف[cite: 61]</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="على / مشغل">💡</span><button type="button" class="english-word" onclick="speakText('on')">on 🔊</button><div class="arabic-translation">على / تشغيل[cite: 61]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="نعامة">🐦</span><button type="button" class="english-word" onclick="speakText('ostrich')">ostrich 🔊</button><div class="arabic-translation">نعامة[cite: 61]</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="قوندس البحر (قضاعة)">🦦</span><button type="button" class="english-word" onclick="speakText('otter')">otter 🔊</button><div class="arabic-translation">ثعلب الماء (قضاعة)[cite: 61]</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="بومة">🦉</span><button type="button" class="english-word" onclick="speakText('owl')">owl 🔊</button><div class="arabic-translation">بومة[cite: 61]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 73[cite: 61]</div>
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
