// تغيير الآية
const ayahList = [
    "وَلَقَدْ أَرْسَلْنَا رُسُلًا مِنْ قَبْلِكَ وَجَعَلْنَا لَهُمْ أَزْوَاجًا وَذُرِّيَّةً ۚ وَكَانَ حَقًّا عَلَيْنَا النَّصْرُ.",
    "إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ.",
    "وَالسَّمَاءِ ذَاتِ الرَّجْعِ."
];

function changeAyah() {
    const randomIndex = Math.floor(Math.random() * ayahList.length);
    const randomAyah = ayahList[randomIndex];
    document.querySelector("#ayah-of-day").textContent = `"${randomAyah}"`;
}

// البحث في القرآن
function searchQuran() {
    const query = document.getElementById("quran-search").value;
    if (query.trim() === "") return;

    const quranData = [
        { surah: "الفاتحة", text: "بسم الله الرحمن الرحيم", translation: "In the name of Allah, the Most Gracious, the Most Merciful.", tafsir: "فاتحة الكتاب." },
        { surah: "البقرة", text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", translation: "All praise is due to Allah, the Lord of the worlds.", tafsir: "السورة الثانية في القرآن." }
    ];

    const result = quranData.find(surah => surah.surah.includes(query) || surah.text.includes(query));
    if (result) {
        document.getElementById("quran-text").textContent = result.text;
        document.getElementById("quran-translation").textContent = `الترجمة: ${result.translation}`;
        document.getElementById("quran-tafsir").textContent = `التفسير: ${result.tafsir}`;
    } else {
        alert("لم يتم العثور على النص المطلوب.");
    }
}

// تشغيل التلاوة
function playQuran() {
    const audio = document.getElementById("quran-audio");
    audio.play();
}

// تحديث أوقات الصلاة
async function fetchPrayerTimes() {
    try {
        const response = await fetch('https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt');
        const data = await response.json();
        const timings = data.data.timings;

        document.getElementById("fajr-time").textContent = timings.Fajr;
        document.getElementById("dhuhr-time").textContent = timings.Dhuhr;
        document.getElementById("asr-time").textContent = timings.Asr;
        document.getElementById("maghrib-time").textContent = timings.Maghrib;
        document.getElementById("isha-time").textContent = timings.Isha;
    } catch (error) {
        console.error("حدث خطأ أثناء استلام أوقات الصلاة:", error);
    }
}

// البحث في الأحاديث
function searchHadith() {
    const query = document.getElementById("hadith-search").value;
    if (query.trim() === "") return;

    const hadithData = [
        { text: "إنما الأعمال بالنيات.", source: "متفق عليه" },
        { text: "من صلى عليَّ صلاة واحدة صلى الله عليه عشرًا.", source: "رواه مسلم" }
    ];

    const result = hadithData.find(hadith => hadith.text.includes(query));
    if (result) {
        document.getElementById("hadith-result").innerHTML = `<strong>الحديث:</strong> ${result.text} <br><strong>المصدر:</strong> ${result.source}`;
    } else {
        document.getElementById("hadith-result").textContent = "لم يتم العثور على الحديث.";
    }
}

// مساعد ذكي إسلامي
function askAI() {
    const question = document.getElementById("ai-input").value;
    if (question.trim() === "") return;

    const responses = {
        "كم عدد سور القرآن؟": "عدد سور القرآن الكريم هو 114 سورة.",
        "ما هي أهمية الصلاة؟": "الصلاة عماد الدين وأول ما يحاسب عليه المسلم يوم القيامة."
    };

    const response = responses[question] || "سؤال غير معروف.";
    document.getElementById("ai-response").textContent = response;
}

// الحصول على التاريخ الهجري
async function getHijriDate() {
    try {
        const response = await fetch('https://api.aladhan.com/v1/gToH?date=2023-10-15');
        const data = await response.json();
        const hijriDate = data.data.hijri.date;
        document.getElementById("hijri-date").textContent = `تاريخ اليوم الهجري: ${hijriDate}`;
    } catch (error) {
        console.error("حدث خطأ أثناء استلام التاريخ الهجري:", error);
    }
}

getHijriDate();

// تغيير الموضوع
function changeTheme() {
    const theme = document.getElementById("theme").value;
    document.body.classList.toggle("dark", theme === "dark");
          }
