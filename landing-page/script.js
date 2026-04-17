
// 🔹 Smooth scroll for links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({
                behavior: "smooth"
            });
    });
});


// 🔹 Sticky navbar shadow on scroll
window.addEventListener("scroll", () => {
    let navbar = document.querySelector("nav");

    if (window.scrollY > 50) {
        navbar.classList.add("nav-scrolled");
    } else {
        navbar.classList.remove("nav-scrolled");
    }
});


// 🔹 Button click animation
document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.style.transform = "scale(0.95)";
        setTimeout(() => {
            btn.style.transform = "scale(1)";
        }, 150);
    });
});


// 🔹 Scroll reveal animation
const elements = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    let triggerBottom = window.innerHeight * 0.85;

    elements.forEach(el => {
        let top = el.getBoundingClientRect().top;

        if (top < triggerBottom) {
            el.classList.add("active");
        }
    });
});