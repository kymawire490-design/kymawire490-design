// ---------- Preloader ----------
function initPreloader() {
  let percent = 0;
  const percentText = document.getElementById("percent");
  const preloader = document.getElementById("preloader");
  const mainContent = document.getElementById("main-content");
  const progressFill = document.getElementById("progressFill");

  if (percentText) percentText.textContent = "0%";
  if (progressFill) progressFill.style.width = "0%";
  if (mainContent) mainContent.style.display = "none";

  const loading = setInterval(() => {
    percent++;
    if (percentText) percentText.textContent = percent + "%";
    if (progressFill) progressFill.style.width = percent + "%";

    if (percent >= 100) {
      clearInterval(loading);
      if (preloader) preloader.classList.add("hidden");
      setTimeout(() => {
        if (preloader) preloader.style.display = "none";
        if (mainContent) mainContent.style.display = "block";
      }, 800);
    }
  }, 40);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPreloader);
} else {
  initPreloader();
}

// ---------- Sidebar Toggle ----------
const menuIcon = document.querySelector(".menu-icon");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("closeSidebar");

if (menuIcon && sidebar) {
  menuIcon.addEventListener("click", () => {
    sidebar.classList.add("active");
  });
}

if (closeSidebar && sidebar) {
  closeSidebar.addEventListener("click", () => {
    sidebar.classList.remove("active");
  });
}

// Optional: close when clicking outside
document.addEventListener("click", (e) => {
  if (sidebar && sidebar.classList.contains("active") &&
      !sidebar.contains(e.target) && !menuIcon.contains(e.target)) {
    sidebar.classList.remove("active");
  }
});

// ---------- Announcement Rotation ----------
const announcements = [
  "Welcome to our store",
  "Business Fair 2025 Special Offers",
  "New arrivals Only for OCTOBER 4",
  "GET YOUR RING AND EARRINGS NOW",
];

let announcementIndex = 0; // renamed to avoid conflict
const announcementEl = document.getElementById("announcementText");

function showAnnouncement() {
  if (!announcementEl) return;

  announcementEl.classList.remove("slide-in", "active");
  announcementEl.classList.add("slide-out", "leave");

  setTimeout(() => {
    announcementIndex = (announcementIndex + 1) % announcements.length;
    announcementEl.textContent = announcements[announcementIndex];

    announcementEl.className = "slide-in";
    void announcementEl.offsetWidth;
    announcementEl.classList.add("active");
  }, 600);
}

if (announcementEl) {
  announcementEl.classList.add("slide-in", "active");
  setInterval(showAnnouncement, 5000);
}

// ---------- Shop Now Button ----------
const shopNowBtn = document.getElementById("shopNowBtn");
if (shopNowBtn) {
  shopNowBtn.addEventListener("click", () => {
    const productsSection = document.getElementById("products");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

// ---------- Favorite Icon Toggle ----------
document.addEventListener("DOMContentLoaded", () => {
  const favIcons = document.querySelectorAll(".fav-icon");

  favIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      icon.classList.toggle("active");
      icon.textContent = icon.classList.contains("active") ? "♥" : "♡";
    });
  });
});

// ---------- Board Slider (Infinite Loop) ----------
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("boardContainer");
  const cards = container.querySelectorAll(".board-card");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let currentIndex = 1; // because we will add a clone at start
  const cardWidth = cards[0].offsetWidth + 20; // card + margin

  // Clone first and last
  const firstClone = cards[0].cloneNode(true);
  const lastClone = cards[cards.length - 1].cloneNode(true);

  container.appendChild(firstClone);
  container.insertBefore(lastClone, container.firstChild);

  const totalCards = container.querySelectorAll(".board-card").length;

  // Set initial position
  container.style.transform = `translateX(${-cardWidth * currentIndex}px)`;

  function moveToIndex(index) {
    container.style.transition = "transform 0.5s ease";
    container.style.transform = `translateX(${-cardWidth * index}px)`;
    currentIndex = index;
  }

  // Next button
  nextBtn.addEventListener("click", () => {
    if (currentIndex >= totalCards - 1) return;
    moveToIndex(currentIndex + 1);
  });

  // Prev button
  prevBtn.addEventListener("click", () => {
    if (currentIndex <= 0) return;
    moveToIndex(currentIndex - 1);
  });

  // After transition, snap to real card if on clone
  container.addEventListener("transitionend", () => {
    if (container.querySelectorAll(".board-card")[currentIndex].isSameNode(firstClone)) {
      container.style.transition = "none";
      currentIndex = 1;
      container.style.transform = `translateX(${-cardWidth * currentIndex}px)`;
    }
    if (container.querySelectorAll(".board-card")[currentIndex].isSameNode(lastClone)) {
      container.style.transition = "none";
      currentIndex = totalCards - 2;
      container.style.transform = `translateX(${-cardWidth * currentIndex}px)`;
    }
  });
});
