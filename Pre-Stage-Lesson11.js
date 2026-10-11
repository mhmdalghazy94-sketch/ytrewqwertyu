window.itqanLessonHtml =`<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الدرس الحادي عشر - كتاب اللغة الإنجليزية الحرف (Rr) (A4)</title>
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
    <span>الدرس الحادي عشر - كتاب الإنجليزية (الحرف Rr) (A4)</span>
    <button type="button" class="print-btn" onclick="window.print()">🖨️ طباعة / نشر A4</button>
</div>

<!-- ================= الصفحة الأولى: الحرف Rr ومفرداته الطبيعية (صفحة 84) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span><span>Nn</span><span>Oo</span>
            <span>Pp</span><span>Qq</span><span class="active" style="background-color: #247dc3; color: white; padding: 4px 6px; border-radius: 6px;">Rr</span>
        </div>
        <div class="main-letter">Rr</div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="مسطرة">📏</span><button type="button" class="english-word" onclick="speakText('ruler')">ruler 🔊</button><div class="arabic-translation">مسطرة[cite: 82]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="نهر">🌊</span><button type="button" class="english-word" onclick="speakText('river')">river 🔊</button><div class="arabic-translation">نهر[cite: 82]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="راكون">🦝</span><button type="button" class="english-word" onclick="speakText('raccoon')">raccoon 🔊</button><div class="arabic-translation">حيوان الراكون[cite: 82]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="رنة (حيوان)">🦌</span><button type="button" class="english-word" onclick="speakText('reindeer')">reindeer 🔊</button><div class="arabic-translation">حيوان الرنة[cite: 82]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="أرنب">🐇</span><button type="button" class="english-word" onclick="speakText('rabbit')">rabbit 🔊</button><div class="arabic-translation">أرنب[cite: 82]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="صخرة">🪨</span><button type="button" class="english-word" onclick="speakText('rock')">rock 🔊</button><div class="arabic-translation">صخرة[cite: 82]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="شريط">🎗️</span><button type="button" class="english-word" onclick="speakText('ribbon')">ribbon 🔊</button><div class="arabic-translation">شريط / زينة[cite: 82]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="سباق">🏁</span><button type="button" class="english-word" onclick="speakText('race')">race 🔊</button><div class="arabic-translation">سباق[cite: 82]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="يركض">🏃‍♂️</span><button type="button" class="english-word" onclick="speakText('run')">run 🔊</button><div class="arabic-translation">يركض[cite: 82]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="ممحاة">🧹</span><button type="button" class="english-word" onclick="speakText('rubber')">rubber 🔊</button><div class="arabic-translation">ممحاة[cite: 82]</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="حبل">🪢</span><button type="button" class="english-word" onclick="speakText('rope')">rope 🔊</button><div class="arabic-translation">حبل[cite: 82]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 84[cite: 82]</div>
</div>

<!-- ================= الصفحة الثانية: المنزل والمواصلات (صفحة 85) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span class="active">Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="غرفة">🚪</span><button type="button" class="english-word" onclick="speakText('room')">room 🔊</button><div class="arabic-translation">غرفة[cite: 83]</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="راديو">📻</span><button type="button" class="english-word" onclick="speakText('radio')">radio 🔊</button><div class="arabic-translation">راديو[cite: 83]</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="سجادة">🟦</span><button type="button" class="english-word" onclick="speakText('rug')">rug 🔊</button><div class="arabic-translation">سجادة صغيرة[cite: 83]</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="جهاز تحكم">🎛️</span><button type="button" class="english-word" onclick="speakText('remote control')">control 🔊</button><div class="arabic-translation">جهاز تحكم عن بُعد[cite: 83]</div></div>
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="قطار الموت">🎢</span><button type="button" class="english-word" onclick="speakText('roller-coaster')">coaster 🔊</button><div class="arabic-translation">قطار الموت السريع[cite: 83]</div></div>
            <div class="word-card"><span class="badge-number">18</span><span class="word-illustration" role="img" aria-label="سقف">🏠</span><button type="button" class="english-word" onclick="speakText('roof')">roof 🔊</button><div class="arabic-translation">سقف المبنى[cite: 83]</div></div>
            <div class="word-card"><span class="badge-number">19</span><span class="word-illustration" role="img" aria-label="طريق">🛣️</span><button type="button" class="english-word" onclick="speakText('road')">road 🔊</button><div class="arabic-translation">طريق[cite: 83]</div></div>
            <div class="word-card"><span class="badge-number">20</span><span class="word-illustration" role="img" aria-label="سكة حديد">🛤️</span><button type="button" class="english-word" onclick="speakText('railway track')">track 🔊</button><div class="arabic-translation">سكة حديدية[cite: 83]</div></div>
            <div class="word-card"><span class="badge-number">22</span><span class="word-illustration" role="img" aria-label="محطة قطار">🚉</span><button type="button" class="english-word" onclick="speakText('railway station')">station 🔊</button><div class="arabic-translation">محطة القطار[cite: 83]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 85[cite: 83]</div>
</div>

<!-- ================= الصفحة الثالثة: إعادة التدوير والطعام والطقس (صفحة 86) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span><span>Nn</span><span>Oo</span>
            <span>Pp</span><span>Qq</span><span class="active" style="background-color: #247dc3; color: white; padding: 4px 6px; border-radius: 6px;">Rr</span>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="إعادة تدوير">♻️</span><button type="button" class="english-word" onclick="speakText('recycle')">recycle 🔊</button><div class="arabic-translation">إعادة تدوير[cite: 84]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="قمامة">🗑️</span><button type="button" class="english-word" onclick="speakText('rubbish')">rubbish 🔊</button><div class="arabic-translation">قمامة[cite: 84]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="توت العليق">🍇</span><button type="button" class="english-word" onclick="speakText('raspberries')">raspberries 🔊</button><div class="arabic-translation">توت البري[cite: 84]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="أرز">🍚</span><button type="button" class="english-word" onclick="speakText('rice')">rice 🔊</button><div class="arabic-translation">أرز[cite: 84]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="خاتم">💍</span><button type="button" class="english-word" onclick="speakText('ring')">ring 🔊</button><div class="arabic-translation">خاتم[cite: 84]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="زبيب">🍇</span><button type="button" class="english-word" onclick="speakText('raisins')">raisins 🔊</button><div class="arabic-translation">زبيب[cite: 84]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="مطعم">🍽️</span><button type="button" class="english-word" onclick="speakText('restaurant')">restaurant 🔊</button><div class="arabic-translation">مطعم[cite: 84]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="مطر">🌧️</span><button type="button" class="english-word" onclick="speakText('rain')">rain 🔊</button><div class="arabic-translation">مطر[cite: 84]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="قوس قزح">🌈</span><button type="button" class="english-word" onclick="speakText('rainbow')">rainbow 🔊</button><div class="arabic-translation">قوس قزح[cite: 84]</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="معطف واق من المطر">🧥</span><button type="button" class="english-word" onclick="speakText('raincoat')">raincoat 🔊</button><div class="arabic-translation">معطف المطر[cite: 84]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 86[cite: 84]</div>
</div>

<!-- ================= الصفحة الرابعة: الألعاب والمركبات والغابات المطيرة (صفحة 87) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span class="active">Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="song-box">
            <button type="button" class="song-title" onclick="speakText('It is raining outside but I am ready. I am wearing my raincoat so I can stay dry. I will put on my roller skates and roll through the puddles, while looking at the rainbow in the sky!')">
                🎵 19 Listen and sing. (استمع وغنِّ) 🔊
            </button>
            <div class="song-lines">
                <button type="button" class="song-line" onclick="speakText('It is raining outside but I am ready.')">
                    <div class="en-text">It's raining outside but I am ready.</div>
                    <div class="ar-text">الجو تمطر بالخارج لكني مستعد.[cite: 85]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('I am wearing my raincoat so I can stay dry.')">
                    <div class="en-text">I'm wearing my raincoat so I can stay dry.</div>
                    <div class="ar-text">أرتدي معطف المطر لكي أبقى جافاً.[cite: 85]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('I will put on my roller skates and roll through the puddles, while looking at the rainbow in the sky!')">
                    <div class="en-text">I'll put on my roller skates and roll through the puddles, while looking at the rainbow in the sky!</div>
                    <div class="ar-text">سأرتدي حذاء التزلج وأمر عبر البرك، بينما أنظر إلى قوس قزح في السماء![cite: 85]</div>
                </button>
            </div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="حصان هزاز">🎠</span><button type="button" class="english-word" onclick="speakText('rocking horse')">horse 🔊</button><div class="arabic-translation">حصان هزاز[cite: 85]</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="صاروخ">🚀</span><button type="button" class="english-word" onclick="speakText('rocket')">rocket 🔊</button><div class="arabic-translation">صاروخ[cite: 85]</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="يقرأ">📖</span><button type="button" class="english-word" onclick="speakText('read')">read 🔊</button><div class="arabic-translation">يقرأ[cite: 85]</div></div>
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="سيارة سباق">🏎️</span><button type="button" class="english-word" onclick="speakText('racing car')">car 🔊</button><div class="arabic-translation">سيارة سباق[cite: 85]</div></div>
            <div class="word-card"><span class="badge-number">17</span><span class="word-illustration" role="img" aria-label="حذاء تزلج بعجلات">🛼</span><button type="button" class="english-word" onclick="speakText('roller skates')">skates 🔊</button><div class="arabic-translation">حذاء التزلج بعجلات[cite: 85]</div></div>
            <div class="word-card"><span class="badge-number">18</span><span class="word-illustration" role="img" aria-label="روبوت">🤖</span><button type="button" class="english-word" onclick="speakText('robot')">robot 🔊</button><div class="arabic-translation">روبوت (نسان آلي)[cite: 85]</div></div>
            <div class="word-card"><span class="badge-number">20</span><span class="word-illustration" role="img" aria-label="غابة استوائية ممطرة">🌴</span><button type="button" class="english-word" onclick="speakText('rainforest')">rainforest 🔊</button><div class="arabic-translation">غابة مطيرة[cite: 85]</div></div>
            <div class="word-card"><span class="badge-number">21</span><span class="word-illustration" role="img" aria-label="وحيد القرن">🦏</span><button type="button" class="english-word" onclick="speakText('rhino')">rhino 🔊</button><div class="arabic-translation">وحيد القرن (خرتيت)[cite: 85]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 87[cite: 85]</div>
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
