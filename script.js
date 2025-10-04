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

// Run every 5s
setInterval(showAnnouncement, 5000);

// Initial state
announcementEl.classList.add("slide-in", "active");

// Shop Now button scroll
document.getElementById("shopNowBtn").addEventListener("click", () => {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
});

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

// Run init when DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initPreloader);
} else {
  initPreloader();
}

// Main DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
  // ===== Quick View Modal =====
  const modal = document.getElementById("quickViewModal");
  const closeBtn = document.querySelector(".quick-view-close");
  const quickImg = document.getElementById("quickViewImg");
  const quickName = document.getElementById("quickViewName");
  const quickPrice = document.getElementById("quickViewPrice");
  const quickCat = document.getElementById("quickViewCat");
  const quickDetail = document.getElementById("quickViewDetail");

  // Sample data
  const productDetails = {
    "Product 1": {
      img: "img/producto-1.jpg",
      category: "EARRINGS",
      price: "$2.00",
      detail: "Beautiful handcrafted item with premium materials."
    },
    "Product 2": {
      img: "img/producto-2.jpg",
      category: "EARRINGS",
      price: "$2.00",
      detail: "Modern design and comfortable feel."
    },
    "Product 3": {
      img: "img/producto-3.jpg",
      category: "EARRINGS",
      price: "$2.00",
      detail: "Modern design and comfortable feel."
    },
    "Product 4": {
      img: "img/producto-4.jpg",
      category: "EARRINGS",
      price: "$2.00",
      detail: "Modern design and comfortable feel."
    },
    "Product 5": {
      img: "img/producto-5.jpg",
      category: "EARRINGS",
      price: "$2.00",
      detail: "Beautiful handcrafted item with premium materials."
    },
    "Product 6": {
      img: "img/producto-6.jpg",
      category: "EARRINGS",
      price: "$2.00",
      detail: "Modern design and comfortable feel."
    },
    "Product 7": {
      img: "img/producto-7.jpg",
      category: "EARRINGS",
      price: "$2.00",
      detail: "Modern design and comfortable feel."
    },
    "Product 8": {
      img: "img/producto-8.jpg",
      category: "RINGS",
      price: "$2.00",
      detail: "Modern design and comfortable feel."
    }
  };

  document.querySelectorAll(".product-card img").forEach(img => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      const name = img.nextElementSibling.textContent;
      const data = productDetails[name] || {};
      quickImg.src = data.img || img.src;
      quickName.textContent = name;
      quickPrice.textContent = data.price || "";
      quickCat.textContent = data.category || "";
      quickDetail.textContent = data.detail || "No details provided.";
      modal.style.display = "flex";
    });
  });

  closeBtn.addEventListener("click", () => modal.style.display = "none");
  modal.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });

  // ===== Sidebar Toggle =====
  const menuIcon = document.querySelector(".menu-icon");
  const sidebar = document.getElementById("sidebar");
  const closeSidebar = document.getElementById("closeSidebar");

  menuIcon.addEventListener("click", () => sidebar.classList.add("active"));
  closeSidebar.addEventListener("click", () => sidebar.classList.remove("active"));

  document.addEventListener("click", (e) => {
    if (sidebar.classList.contains("active") && !sidebar.contains(e.target) && !menuIcon.contains(e.target)) {
      sidebar.classList.remove("active");
    }
  });

  // ===== Favorite icon toggle =====
  document.querySelectorAll(".fav-icon").forEach(icon => {
    icon.addEventListener("click", () => {
      icon.classList.toggle("active");
      icon.textContent = icon.classList.contains("active") ? "♥" : "♡";
    });
  });

// ===== Product Carousel without Dots =====
const container = document.querySelector('.products-container');
const products = document.querySelectorAll('.product-card');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');

let currentSlide = 0;
let slidesToShow = getSlidesToShow();
let totalSlides = Math.ceil(products.length / slidesToShow);
let autoScrollInterval;

// Determine how many slides to show based on screen size
function getSlidesToShow() {
  if (window.innerWidth >= 1024) return 4; // desktop
  if (window.innerWidth >= 768) return 2;  // tablet
  return 1; // mobile
}

// Go to specific slide
function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  const translateX = -currentSlide * 100; // move container by 100% per slide
  
  container.style.transform = `translateX(${translateX}%)`;
  resetAutoScroll();
}

// Next slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  goToSlide(currentSlide);
}

// Previous slide
function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  goToSlide(currentSlide);
}

// Auto scroll
function startAutoScroll() {
  autoScrollInterval = setInterval(nextSlide, 3000);
}

// Reset auto scroll
function resetAutoScroll() {
  clearInterval(autoScrollInterval);
  startAutoScroll();
}

// Handle window resize
function handleResize() {
  const newSlidesToShow = getSlidesToShow();
  if (newSlidesToShow !== slidesToShow) {
    slidesToShow = newSlidesToShow;
    totalSlides = Math.ceil(products.length / slidesToShow);
    goToSlide(0);
  }
}

// Initialize carousel
function initCarousel() {
  startAutoScroll();
  
  // Event listeners
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  
  // Pause on hover
  container.addEventListener('mouseenter', () => {
    clearInterval(autoScrollInterval);
  });
  
  container.addEventListener('mouseleave', () => {
    startAutoScroll();
  });
  
  // Handle window resize
  window.addEventListener('resize', handleResize);
}

// Initialize the carousel
if (products.length > 0) {
  initCarousel();
}
}); // <-- Add this closing bracket to end the DOMContentLoaded event listener