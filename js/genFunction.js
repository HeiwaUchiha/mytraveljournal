export function setupThemeToggle() {
    const icon = document.getElementById("mode");
    const icon2 = document.getElementById("mode2");
    const icon2Img = icon2?.querySelector("img");
    const iconImg = icon?.querySelector("img");
    const logo = document.getElementById("logo");
    const logoImg = logo?.querySelector("img");
    const cloud = document.getElementById("img2");
    const journal = document.getElementById("journal");
    const map = document.getElementById("map");
    const cam = document.getElementById("cam");
    const lock = document.getElementById("lock");
    const previous = document.getElementById("previous");
    const next = document.getElementById("next");
  
    const applyTheme = (theme) => {
      document.body.classList.toggle("dark-theme", theme === "dark");
      document.body.setAttribute("data-theme", theme);
  
      if (iconImg) iconImg.src = `/assets/${theme === "dark" ? "sun" : "moon"}.png`;
      if (icon2Img) icon2Img.src = `/assets/${theme === "dark" ? "sun" : "moon"}.png`;
      if (logoImg) logoImg.src = `/assets/logo-${theme === "dark" ? "light" : "dark"}-transparent.png`;
      if (cloud) cloud.src = `/assets/clouds${theme === "dark" ? "-dark" : ""}.png`;
      if (journal) journal.src = `/assets/diary${theme === "dark" ? "" : "-dark"}.png`;
      if (map) map.src = `/assets/map${theme === "dark" ? "" : "-dark"}.png`;
      if (cam) cam.src = `/assets/camera${theme === "dark" ? "" : "-dark"}.png`;
      if (lock) lock.src = `/assets/lock${theme === "dark" ? "" : "-dark"}.png`;
      if (previous) previous.src = `/assets/rewind${theme === "dark" ? "" : "-dark"}.png`;
      if (next) next.src = `/assets/forward${theme === "dark" ? "" : "-dark"}.png`;
  
      localStorage.setItem("theme", theme);
    };
  
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);
  
    icon?.addEventListener("click", () => {
      const newTheme = document.body.classList.contains("dark-theme") ? "light" : "dark";
      applyTheme(newTheme);
    });
    icon2?.addEventListener("click", () => {
      const newTheme = document.body.classList.contains("dark-theme") ? "light" : "dark";
      applyTheme(newTheme);
    });
  }

// SCROLL EFFECTS
  export function setupScrollEffect() {
    const hero = document.querySelector(".hero");
    const img3 = document.getElementById("img3");
  
    if (!hero || !img3) return;
  
    let lastScroll = 0;
    let ticking = false;
  
    const updateScrollEffects = () => {
      let value = lastScroll;
      let marginTop = Math.min(1200, Math.max(0, value * 2.5));
      let newLeft = Math.max(20, Math.min(70 - value * 0.1, 70));
  
      hero.style.marginTop = `${marginTop}px`;
      img3.style.left = `${newLeft}%`;
  
      ticking = false;
    };
  
    window.addEventListener("scroll", () => {
      lastScroll = window.scrollY;
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    });
  }
  
// LOG BUTTON
export function isLoggedIn() {
  document.getElementById("log")?.addEventListener("click", (e) => {
    e.preventDefault();
  
    const userData = JSON.parse(localStorage.getItem("travelJournalUser"));
  
    if (userData && userData.loggedIn) {
      window.location.href = "/pages/journal.html";
    } else {
      window.location.href = "register.html?form=login";
    }
  });
}