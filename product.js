// Preloader functionality
function initPreloader() {
  let percent = 0;
  const percentText = document.getElementById("percent");
  const preloader = document.getElementById("preloader");
  const mainContent = document.getElementById("main-content");
  const progressFill = document.getElementById("progressFill");

  // Reset visible states (in case of reload)
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
// Run init when DOM ready (works even if script placed in head or body)
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPreloader);
} else {
  initPreloader();
}
//preloader finished

// Sidebar toggle
const menuIcon = document.querySelector(".menu-icon");
const sidebar = document.getElementById("sidebar");
const closeSidebar = document.getElementById("closeSidebar");

// Open sidebar
menuIcon.addEventListener("click", () => {
  sidebar.classList.add("active");
});

// Close sidebar
closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("active");
});

// Optional: close when clicking outside
document.addEventListener("click", (e) => {
  if (sidebar.classList.contains("active") && !sidebar.contains(e.target) && !menuIcon.contains(e.target)) {
    sidebar.classList.remove("active");
  }
});
// End Sidebar

// Announcement rotation with left slide effect
const announcements = [
  "Welcome to our store",
  "Business Fair 2025 Special Offers",
  "New arrivals Only for OCTOBER 4",
  "GET YOUR RING AND EARRINGS NOW",
];

let index = 0;
const announcementEl = document.getElementById("announcementText");

function showAnnouncement() {
  // Slide current text out to the left
  announcementEl.classList.remove("slide-in", "active");
  announcementEl.classList.add("slide-out", "leave");

  // Wait for slide-out before changing text
  setTimeout(() => {
    index = (index + 1) % announcements.length;
    announcementEl.textContent = announcements[index];

    // Reset for next entry
    announcementEl.className = "slide-in"; // reset classes
    void announcementEl.offsetWidth; // force reflow

    // Animate in from right
    announcementEl.classList.add("active");
  }, 600); // match CSS transition
}

function openModal(id) {
  document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
  document.querySelectorAll('.modal').forEach(modal => {
    if (event.target === modal) modal.style.display = 'none';
  });
}

// Run every 5s
setInterval(showAnnouncement, 5000);

// Initial state
announcementEl.classList.add("slide-in", "active");

// Shop Now button scroll
document.getElementById("shopNowBtn").addEventListener("click", () => {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
});
// End Announcement rotation

// Favorite icon toggle
document.addEventListener("DOMContentLoaded", () => {
  const favIcons = document.querySelectorAll(".fav-icon");

  favIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      icon.classList.toggle("active");

      if (icon.classList.contains("active")) {
        icon.textContent = "♥"; // filled heart
      } else {
        icon.textContent = "♡"; // empty heart
      }
    });
  });
});
// End Favorite icon toggle