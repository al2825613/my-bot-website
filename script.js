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

// حاسبة الزكاة
function calculateZakat() {
    const amount = parseFloat(document.getElementById("zakat-amount").value);
    if (isNaN(amount) || amount <= 0) {
        document.getElementById("zakat-result").textContent = "يرجى إدخال مبلغ صحيح.";
        return;
    }

    const zakatRate = 0.025; // نسبة الزكاة (2.5%)
    const zakat = amount * zakatRate;
    document.getElementById("zakat-result").textContent = `زكاتك المستحقة: ${zakat.toFixed(2)} دولار`;
}

// إظهار المساجد القريبة
let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 30.0444, lng: 31.2357 }, // القاهرة كمثال
        zoom: 12,
    });
}

function findNearbyMosques() {
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(
        {
            location: map.getCenter(),
            radius: 5000, // نصف قطر البحث (5 كم)
            type: ["mosque"],
        },
        (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                results.forEach((place) => {
                    new google.maps.Marker({
                        map,
                        position: place.geometry.location,
                    });
                });
            }
        }
    );
}

// تحديات يومية
let dailyChallengeCompleted = false;

function completeChallenge() {
    if (!dailyChallengeCompleted) {
        alert("تهانينا! لقد أنجزت التحدي اليومي.");
        dailyChallengeCompleted = true;
    } else {
        alert("لقد أنجزت هذا التحدي بالفعل اليوم!");
    }
}

// مشاركة المحتوى
function shareContent(platform) {
    const content = "مرحبًا بك في موقعنا الإسلامي!";
    if (platform === "twitter") {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(content)}`);
    } else if (platform === "facebook") {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`);
    }
}

// تغيير الموضوع
function changeTheme() {
    const theme = document.getElementById("theme").value;
    document.body.classList.toggle("dark", theme === "dark");
         }
