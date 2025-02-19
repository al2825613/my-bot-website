document.addEventListener("DOMContentLoaded", function() {
    fetch("data/hadith.json")
        .then(response => response.json())
        .then(data => {
            document.getElementById("hadith-text").textContent = data.hadith;
        });

    fetch("data/events.json")
        .then(response => response.json())
        .then(data => {
            const ramadanDate = new Date(data.ramadan);
            const today = new Date();
            const diffTime = ramadanDate - today;
            const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            document.getElementById("ramadan-countdown").textContent = `متبقي ${daysLeft} يومًا على رمضان`;
        });
});
