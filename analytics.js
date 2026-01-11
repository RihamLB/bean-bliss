(() => {

    // 🔒 Protection anti double exécution
    if (window.__analytics_loaded__) return;
    window.__analytics_loaded__ = true;

    /* ===============================
       👥 VISITOR COUNTER (1 PAR SESSION)
       =============================== */
    if (!sessionStorage.getItem("session_active")) {
        let visits = localStorage.getItem("total_visitors");
        visits = visits ? parseInt(visits) + 1 : 1;
        localStorage.setItem("total_visitors", visits);
        sessionStorage.setItem("session_active", "true");
    }

    const visits = localStorage.getItem("total_visitors") || 1;
    animateCounter(document.getElementById("visits"), visits);


    /* ===============================
       📍 LOCATION + 🌍 COUNTRY
       =============================== */
    fetch("https://ipapi.co/json/")
    .then(res => res.json())
    .then(data => {
        const location = `${data.city || "Unknown"}, ${data.country_name || "Unknown"}`;
        animateText(document.getElementById("location-text"), location);
    })
    .catch(() => {
        animateText(document.getElementById("location-text"), "Unavailable");
    });


})();

/* ===============================
   🔢 Animated Counter
   =============================== */
function animateCounter(el, target, duration = 800) {
    let start = 0;
    const stepTime = Math.max(Math.floor(duration / target), 20);

    const timer = setInterval(() => {
        start++;
        el.textContent = start;
        if (start >= target) clearInterval(timer);
    }, stepTime);
}

/* ===============================
   ✍️ Location animation
   =============================== */
function animateText(el, text, speed = 30) {
    el.textContent = "";
    let i = 0;
    const timer = setInterval(() => {
        el.textContent += text.charAt(i);
        i++;
        if (i >= text.length) clearInterval(timer);
    }, speed);
}
