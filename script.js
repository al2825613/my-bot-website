document.addEventListener("DOMContentLoaded", function () {
    getPrayerTimes();
    calculateRamadanCountdown();
});

function getPrayerTimes() {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiURL = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`;
        
        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                const timings = data.data.timings;
                document.getElementById("prayer-times").innerHTML = `
                    الفجر: ${timings.Fajr} 🌅<br>
                    الظهر: ${timings.Dhuhr} ☀️<br>
                    العصر: ${timings.Asr} 🌇<br>
                    المغرب: ${timings.Maghrib} 🌆<br>
                    العشاء: ${timings.Isha} 🌙
                `;
            })
            .catch(() => {
                document.getElementById("prayer-times").textContent = "حدث خطأ في جلب أوقات الصلاة!";
            });
    });
}

function getQiblaDirection() {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        alert("اتجاه القبلة: جاري تحديده...");
    });
}

function openQuran() {
    window.open("https://quran.com/", "_blank");
}

function playAdhan() {
    const adhanType = document.getElementById("adhan-select").value;
    let adhanUrl = adhanType === "makkah" ? "https://server8.mp3quran.net/haram/001.mp3" :
                   adhanType === "madinah" ? "https://server12.mp3quran.net/madina/001.mp3" :
                   "https://server8.mp3quran.net/aqsa/001.mp3";

    let audio = new Audio(adhanUrl);
    audio.play();
}

function calculateRamadanCountdown() {
    const ramadanDate = new Date("2025-03-01T00:00:00");
    setInterval(() => {
        const now = new Date();
        const diff = ramadanDate - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById("ramadan-countdown").textContent = `متبقي ${days} يوم على رمضان!`;
    }, 1000);
}

function initMap() {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        new google.maps.Map(document.getElementById("map"), {
            center: { lat, lng: lon },
            zoom: 14
        });
    });
      }
