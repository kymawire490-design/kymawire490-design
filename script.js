// Announcement rotation with left slide effect
const announcements = [
  "Welcome to our store",
  "Free shipping on orders over $100",
  "New arrivals every week",
  "Sign up for 10% off your first order"
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

// Run every 5s
setInterval(showAnnouncement, 5000);

// Initial state
announcementEl.classList.add("slide-in", "active");

// Shop Now button scroll
document.getElementById("shopNowBtn").addEventListener("click", () => {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
});
// Note: Ensure the HTML has an element with id="products" for this to work.



