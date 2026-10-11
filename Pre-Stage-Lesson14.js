window.itqanLessonHtml = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>الدرس الرابع عشر - كتاب اللغة الإنجليزية (الحروف Uu, Vv, Ww) (A4)</title>
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
    <span>الدرس الرابع عشر - كتاب الإنجليزية (الحروف Uu, Vv, Ww) (A4)</span>
    <button type="button" class="print-btn" onclick="window.print()">🖨️ طباعة / نشر A4</button>
</div>

<!-- ================= الصفحة الأولى: الحرف Uu والحرف Vv (صفحة 112) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span><span>Nn</span><span>Oo</span>
            <span>Pp</span><span>Qq</span><span>Rr</span><span>Ss</span><span>Tt</span>
            <span class="active" style="background-color: #247dc3; color: white; padding: 4px 6px; border-radius: 6px;">Uu</span>
        </div>
        <div class="main-letter">Uu</div>
        <div class="words-grid" style="grid-template-columns: repeat(2, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="مظلة">☂️</span><button type="button" class="english-word" onclick="speakText('umbrella')">umbrella 🔊</button><div class="arabic-translation">مظلة (شمسية)[cite: 118]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="جامعة">🏛️</span><button type="button" class="english-word" onclick="speakText('university')">university 🔊</button><div class="arabic-translation">جامعة[cite: 118]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="وحيد القرن الخيالي">🦄</span><button type="button" class="english-word" onclick="speakText('unicorn')">unicorn 🔊</button><div class="arabic-translation">وحيد القرن الخيالي[cite: 118]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="ملابس داخلية">🩳</span><button type="button" class="english-word" onclick="speakText('underwear')">underwear 🔊</button><div class="arabic-translation">ملابس داخلية[cite: 118]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 112[cite: 118]</div>
</div>

<!-- ================= الصفحة الثانية: الحرف Vv والأغنية والكلمات (صفحة 113) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span class="active">Vv</span><span>Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="song-box">
            <button type="button" class="song-title" onclick="speakText('Can you see the volcano? It is very, very hot. There is fire and smoke and lots of noise. I like volcanoes a lot!')">
                🎵 Listen and sing. (استمع وغنِّ) 🔊
            </button>
            <div class="song-lines">
                <button type="button" class="song-line" onclick="speakText('Can you see the volcano?')">
                    <div class="en-text">Can you see the volcano?</div>
                    <div class="ar-text">هل يمكنك رؤية البركان؟[cite: 118]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('It is very, very hot.')">
                    <div class="en-text">It's very, very hot.</div>
                    <div class="ar-text">إنه حار جداً جداً.[cite: 118]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('There is fire and smoke and lots of noise.')">
                    <div class="en-text">There's fire and smoke and lots of noise.</div>
                    <div class="ar-text">هناك نار ودخان والكثير من الضوضاء.[cite: 118]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('I like volcanoes a lot!')">
                    <div class="en-text">I like volcanoes a lot!</div>
                    <div class="ar-text">أنا أحب البراكين كثيراً![cite: 118]</div>
                </button>
            </div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="بركان">🌋</span><button type="button" class="english-word" onclick="speakText('volcano')">volcano 🔊</button><div class="arabic-translation">بركان[cite: 118, 119]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="منظر">👀</span><button type="button" class="english-word" onclick="speakText('view')">view 🔊</button><div class="arabic-translation">منظر طبيعي[cite: 119]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="لعبة فيديو">🎮</span><button type="button" class="english-word" onclick="speakText('video game')">game 🔊</button><div class="arabic-translation">لعبة فيديو[cite: 119]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="مزهرية">🏺</span><button type="button" class="english-word" onclick="speakText('vase')">vase 🔊</button><div class="arabic-translation">مزهرية (فازة)[cite: 119]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="طبيب بيطري">👩‍⚕️</span><button type="button" class="english-word" onclick="speakText('vet')">vet 🔊</button><div class="arabic-translation">طبيب بيطري[cite: 119]</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="كرة طائرة">🏐</span><button type="button" class="english-word" onclick="speakText('volleyball')">volleyball 🔊</button><div class="arabic-translation">كرة الطائرة[cite: 119]</div></div>
            <div class="word-card"><span class="badge-number">12</span><span class="word-illustration" role="img" aria-label="قرية">🏡</span><button type="button" class="english-word" onclick="speakText('village')">village 🔊</button><div class="arabic-translation">قرية[cite: 119]</div></div>
            <div class="word-card"><span class="badge-number">13</span><span class="word-illustration" role="img" aria-label="شاحنة">🚐</span><button type="button" class="english-word" onclick="speakText('van')">van 🔊</button><div class="arabic-translation">شاحنة صغيرة[cite: 119]</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="خضروات">🥕</span><button type="button" class="english-word" onclick="speakText('vegetables')">vegetables 🔊</button><div class="arabic-translation">خضروات[cite: 119]</div></div>
            <div class="word-card"><span class="badge-number">15</span><span class="word-illustration" role="img" aria-label="آلة الكمان">🎻</span><button type="button" class="english-word" onclick="speakText('violin')">violin 🔊</button><div class="arabic-translation">آلة الكمان[cite: 119]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 113[cite: 119]</div>
</div>

<!-- ================= الصفحة الثالثة: الحرف Ww والحديقة والطبيعة (صفحة 114 و 115) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part1">
            <span>Aa</span><span>Bb</span><span>Cc</span><span>Dd</span><span>Ee</span>
            <span>Ff</span><span>Gg</span><span>Hh</span><span>Ii</span><span>Jj</span>
            <span>Kk</span><span>Ll</span><span>Mm</span><span>Nn</span><span>Oo</span>
            <span>Pp</span><span>Qq</span><span>Rr</span><span>Ss</span><span>Tt</span>
            <span>Uu</span><span>Vv</span><span class="active" style="background-color: #247dc3; color: white; padding: 4px 6px; border-radius: 6px;">Ww</span>
        </div>
        <div class="main-letter">Ww</div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="بطيخ">🍉</span><button type="button" class="english-word" onclick="speakText('watermelon')">watermelon 🔊</button><div class="arabic-translation">بطيخ[cite: 120]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="دبور">🐝</span><button type="button" class="english-word" onclick="speakText('wasp')">wasp 🔊</button><div class="arabic-translation">دبور[cite: 120]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="عربة يد">🛒</span><button type="button" class="english-word" onclick="speakText('wheelbarrow')">barrow 🔊</button><div class="arabic-translation">عربة يد بعجلة واحدة[cite: 120]</div></div>
            <div class="word-card"><span class="badge-number">5</span><span class="word-illustration" role="img" aria-label="مرشة ماء">🚿</span><button type="button" class="english-word" onclick="speakText('watering can')">can 🔊</button><div class="arabic-translation">مرشة ماء الحديقة[cite: 120]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="حذاء مطاطي">🥾</span><button type="button" class="english-word" onclick="speakText('wellies')">wellies 🔊</button><div class="arabic-translation">حذاء مطاطي للمطر[cite: 120]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="ماء">💧</span><button type="button" class="english-word" onclick="speakText('water')">water 🔊</button><div class="arabic-translation">ماء / يروي[cite: 120]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="دودة">🪱</span><button type="button" class="english-word" onclick="speakText('worm')">worm 🔊</button><div class="arabic-translation">دودة الارض[cite: 120]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="يكتب">✍️</span><button type="button" class="english-word" onclick="speakText('write')">write 🔊</button><div class="arabic-translation">يكتب[cite: 120]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="يصفر">😗</span><button type="button" class="english-word" onclick="speakText('whistle')">whistle 🔊</button><div class="arabic-translation">يصفّر / صفارة[cite: 120]</div></div>
            <div class="word-card"><span class="badge-number">11</span><span class="word-illustration" role="img" aria-label="يهمس">🤫</span><button type="button" class="english-word" onclick="speakText('whisper')">whisper 🔊</button><div class="arabic-translation">يهمس[cite: 120]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 114 و 115[cite: 120, 121]</div>
</div>

<!-- ================= الصفحة الرابعة: الطاحونة والبحر والحيتان (صفحة 116 و 117) ================= -->
<div class="a4-page">
    <div>
        <div class="alphabet-header header-part2">
            <span>Nn</span><span>Oo</span><span>Pp</span><span>Qq</span><span>Rr</span>
            <span>Ss</span><span>Tt</span><span>Uu</span><span>Vv</span><span class="active">Ww</span>
            <span>Xx</span><span>Yy</span><span>Zz</span>
        </div>
        <div class="song-box">
            <button type="button" class="song-title" onclick="speakText('There is a wolf by the river. There is a woodpecker in the tree. The waterfall comes pouring down. What else can you see?')">
                🎵 Listen and sing. (استمع وغنِّ) 🔊
            </button>
            <div class="song-lines">
                <button type="button" class="song-line" onclick="speakText('There is a wolf by the river.')">
                    <div class="en-text">There's a wolf by the river.</div>
                    <div class="ar-text">هناك ذئب بجانب النهر.[cite: 123]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('There is a woodpecker in the tree.')">
                    <div class="en-text">There's a woodpecker in the tree.</div>
                    <div class="ar-text">هناك طائر نقار الخشب على الشجرة.[cite: 123]</div>
                </button>
                <button type="button" class="song-line" onclick="speakText('The waterfall comes pouring down. What else can you see?')">
                    <div class="en-text">The waterfall comes pouring down. What else can you see?</div>
                    <div class="ar-text">الشلال يتدفق إلى الأسفل. ماذا ترى أيضاً؟[cite: 123]</div>
                </button>
            </div>
        </div>
        <div class="words-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
            <div class="word-card"><span class="badge-number">1</span><span class="word-illustration" role="img" aria-label="طاحونة هوائية">windmill</span><button type="button" class="english-word" onclick="speakText('windmill')">windmill 🔊</button><div class="arabic-translation">طاحونة هوائية[cite: 122]</div></div>
            <div class="word-card"><span class="badge-number">2</span><span class="word-illustration" role="img" aria-label="نافذة">🪟</span><button type="button" class="english-word" onclick="speakText('window')">window 🔊</button><div class="arabic-translation">نافذة[cite: 122]</div></div>
            <div class="word-card"><span class="badge-number">3</span><span class="word-illustration" role="img" aria-label="جدار">🧱</span><button type="button" class="english-word" onclick="speakText('wall')">wall 🔊</button><div class="arabic-translation">جدار / حائط[cite: 122]</div></div>
            <div class="word-card"><span class="badge-number">4</span><span class="word-illustration" role="img" aria-label="خشب">🪵</span><button type="button" class="english-word" onclick="speakText('wood')">wood 🔊</button><div class="arabic-translation">خشب[cite: 122, 123]</div></div>
            <div class="word-card"><span class="badge-number">6</span><span class="word-illustration" role="img" aria-label="شوارب القطة">🐱</span><button type="button" class="english-word" onclick="speakText('whiskers')">whiskers 🔊</button><div class="arabic-translation">شوارب الحيوان[cite: 122]</div></div>
            <div class="word-card"><span class="badge-number">7</span><span class="word-illustration" role="img" aria-label="صوف">🧶</span><button type="button" class="english-word" onclick="speakText('wool')">wool 🔊</button><div class="arabic-translation">صوف[cite: 122]</div></div>
            <div class="word-card"><span class="badge-number">8</span><span class="word-illustration" role="img" aria-label="موجة">🌊</span><button type="button" class="english-word" onclick="speakText('wave')">wave 🔊</button><div class="arabic-translation">موجة البحر[cite: 122, 123]</div></div>
            <div class="word-card"><span class="badge-number">9</span><span class="word-illustration" role="img" aria-label="فظ">🦭</span><button type="button" class="english-word" onclick="speakText('walrus')">walrus 🔊</button><div class="arabic-translation">حيوان الفقمة (الفظ)[cite: 122]</div></div>
            <div class="word-card"><span class="badge-number">10</span><span class="word-illustration" role="img" aria-label="حوت">🐋</span><button type="button" class="english-word" onclick="speakText('whale')">whale 🔊</button><div class="arabic-translation">حوت[cite: 122]</div></div>
            <div class="word-card"><span class="badge-number">14</span><span class="word-illustration" role="img" aria-label="ذئب">🐺</span><button type="button" class="english-word" onclick="speakText('wolf')">wolf 🔊</button><div class="arabic-translation">ذئب[cite: 123]</div></div>
            <div class="word-card"><span class="badge-number">16</span><span class="word-illustration" role="img" aria-label="نقار الخشب">🐦</span><button type="button" class="english-word" onclick="speakText('woodpecker')">pecker 🔊</button><div class="arabic-translation">طائر نقار الخشب[cite: 123]</div></div>
        </div>
    </div>
    <div class="page-number-footer">صفحة 116 و 117[cite: 122, 123]</div>
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
