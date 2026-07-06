// =========================
// QuickTools Hub Script
// =========================

// Current Year in Footer (if element exists)
const yearElement = document.getElementById("year");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Smooth Card Animation
const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, {
    threshold: 0.15
});

cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "0.6s ease";
    observer.observe(card);
});

// Button Click Effect
const buttons = document.querySelectorAll(".btn");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {

        btn.style.transform = "scale(.95)";

        setTimeout(() => {
            btn.style.transform = "scale(1)";
        }, 150);

    });
});

// Console Welcome
console.log("QuickTools Hub Loaded Successfully");

// Future Functions Placeholder
function comingSoon() {
    alert("This tool will be available soon.");
}