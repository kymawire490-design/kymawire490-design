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
// Note: Ensure the HTML has an element with id="products" for this to work.

// Quick View Modal functionality
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("quickViewModal");
  const closeBtn = document.querySelector(".quick-view-close");
  const quickImg = document.getElementById("quickViewImg");
  const quickName = document.getElementById("quickViewName");
  const quickPrice = document.getElementById("quickViewPrice");
  const quickCat = document.getElementById("quickViewCat");
  const quickDetail = document.getElementById("quickViewDetail");

  // Sample data – ideally fetch from a real source
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
    },
    // Add more products as needed

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
});



