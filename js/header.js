// 汉堡菜单交互
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// 点击导航链接后关闭菜单
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// 滚动时改变导航栏样式
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (window.scrollY > 50) {
        header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.5)";
        header.style.backgroundColor = "rgba(10, 10, 10, 0.95)";
    } else {
        header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.5)";
        header.style.backgroundColor = "rgba(10, 10, 10, 0.9)";
    }
});

// 点击页面其他区域关闭菜单
document.addEventListener("click", (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }
});
