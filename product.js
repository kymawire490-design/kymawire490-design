// Preloader functionality
function initPreloader() {
  let percent = 0;
  const percentText = document.getElementById("percent");
  const preloader = document.getElementById("preloader");
  const mainContent = document.getElementById("main-content");
  const progressFill = document.getElementById("progressFill");

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

// Run when DOM is ready
document.addEventListener("DOMContentLoaded", function() {
  initPreloader();
  
  // Sidebar toggle
  const menuIcon = document.querySelector(".menu-icon");
  const sidebar = document.getElementById("sidebar");
  const closeSidebar = document.getElementById("closeSidebar");

  // Open sidebar
  if (menuIcon) {
    menuIcon.addEventListener("click", () => {
      sidebar.classList.add("active");
    });
  }

  // Close sidebar
  if (closeSidebar) {
    closeSidebar.addEventListener("click", () => {
      sidebar.classList.remove("active");
    });
  }

  // Close sidebar when clicking outside
  document.addEventListener("click", (e) => {
    if (sidebar && sidebar.classList.contains("active") && 
        !sidebar.contains(e.target) && 
        !menuIcon.contains(e.target)) {
      sidebar.classList.remove("active");
    }
  });

  // Announcement rotation
  const announcements = [
    "Welcome to our store",
    "Business Fair 2025 Special Offers",
    "New arrivals Only for OCTOBER 4",
    "GET YOUR RING AND EARRINGS NOW",
  ];

  let index = 0;
  const announcementEl = document.getElementById("announcementText");

  function showAnnouncement() {
    if (!announcementEl) return;
    
    announcementEl.classList.remove("slide-in", "active");
    announcementEl.classList.add("slide-out", "leave");

    setTimeout(() => {
      index = (index + 1) % announcements.length;
      announcementEl.textContent = announcements[index];

      announcementEl.className = "slide-in";
      void announcementEl.offsetWidth;

      announcementEl.classList.add("active");
    }, 600);
  }

  // Run every 5s
  if (announcementEl) {
    setInterval(showAnnouncement, 5000);
    announcementEl.classList.add("slide-in", "active");
  }

  // Favorite icon toggle
  const favIcons = document.querySelectorAll(".fav-icon");
  favIcons.forEach(icon => {
    icon.addEventListener("click", () => {
      icon.classList.toggle("active");
      if (icon.classList.contains("active")) {
        icon.textContent = "♥";
      } else {
        icon.textContent = "♡";
      }
    });
  });

  // Quick View Modal Functionality
  const modal = document.getElementById("quickViewModal");
  const closeBtn = document.querySelector(".quick-view-close");
  const quickImg = document.getElementById("quickViewImg");
  const quickName = document.getElementById("quickViewName");
  const quickPrice = document.getElementById("quickViewPrice");
  const quickCat = document.getElementById("quickViewCat");
  const quickDetail = document.getElementById("quickViewDetail");
  const quickAddCart = document.getElementById("quickAddCart");
  const quickFav = document.getElementById("quickFav");
  const productCards = document.querySelectorAll(".product-card");

  // Product details data
  const productDetails = {
    "Lapislazuli Earrings": { 
      img: "assets/image1.jpg", 
      category: "Earrings", 
      price: "$2.00", 
      detail: "Deep celestial blue with timeless elegance." 
    },
    "Obsidian Earrings": { 
      img: "assets/image2.jpg", 
      category: "Earrings", 
      price: "$2.00", 
      detail: "Sleek volcanic glass with bold appeal." 
    },
    "Amethyst Earrings": { 
      img: "assets/image3.jpg", 
      category: "Earrings", 
      price: "$2.00", 
      detail: "Regal violet crystal radiating calm." 
    },
    "Sapphire Earrings": { 
      img: "assets/image4.jpg", 
      category: "Earrings", 
      price: "$2.00", 
      detail: "Timeless elegance with deep blue tones." 
    },
    "Silver Earrings": { 
      img: "assets/image5.jpg", 
      category: "Earrings", 
      price: "$2.00", 
      detail: "Shimmering silver for everyday luxury." 
    },
    "Ruby Earrings": { 
      img: "assets/image6.jpg", 
      category: "Earrings", 
      price: "$2.00", 
      detail: "Fiery red gemstones symbolizing passion." 
    },
    "Amber Earrings": { 
      img: "assets/image7.jpg", 
      category: "Earrings", 
      price: "$2.00", 
      detail: "Golden amber with natural beauty." 
    },
    "Rings": { 
      img: "assets/image8.jpg", 
      category: "Rings", 
      price: "$2.00", 
      detail: "Beautiful handcrafted rings with unique stones." 
    },
    "Tourmaline Earrings": { 
      img: "assets/image9.jpg", 
      category: "Earrings", 
      price: "$2.00", 
      detail: "Vibrant tourmaline with natural charm." 
    },
    "Rings #2": { 
      img: "assets/image10.jpg", 
      category: "Rings", 
      price: "$2.00", 
      detail: "Handmade rings with elegant finishes." 
    }
  };

  // Add click event to each product card
  productCards.forEach(card => {
    card.addEventListener("click", (e) => {
      // Don't open quick view if clicking the Add to Cart button
      if (e.target.classList.contains("btn") || e.target.closest(".btn")) {
        return;
      }
      
      const productName = card.querySelector(".product-name").textContent;
      const productImage = card.querySelector("img").src;
      const productPrice = card.querySelector(".product-price").textContent.replace("Price: ", "");
      
      // Get product details or use defaults
      const details = productDetails[productName] || {
        img: productImage,
        category: "Jewelry",
        price: productPrice,
        detail: "Beautiful handmade jewelry with exquisite craftsmanship."
      };

      // Populate quick view modal
      quickImg.src = details.img;
      quickName.textContent = productName;
      quickPrice.textContent = details.price;
      quickCat.textContent = details.category;
      quickDetail.textContent = details.detail;

      // Show modal
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  });

  // Close modal functionality
  function closeQuickView() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  // Close modal events
  if (closeBtn) {
    closeBtn.addEventListener("click", closeQuickView);
  }

  // Close when clicking outside modal content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeQuickView();
    }
  });

  // Close with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      closeQuickView();
    }
  });

  // Quick view Add to Cart button
  if (quickAddCart) {
    quickAddCart.addEventListener("click", function() {
      const productName = quickName.textContent;
      alert(`Added ${productName} to cart!`);
      // Here you would typically add to cart logic
    });
  }

  // Quick view favorite button
  if (quickFav) {
    quickFav.addEventListener("click", function() {
      this.classList.toggle("active");
      if (this.classList.contains("active")) {
        this.textContent = "♥";
      } else {
        this.textContent = "♡";
      }
    });
  }

  // Regular Add to Cart buttons
  const addToCartButtons = document.querySelectorAll(".product-card .btn");
  addToCartButtons.forEach(button => {
    button.addEventListener("click", function(e) {
      e.stopPropagation(); // Prevent triggering the card click
      const productName = this.closest(".product-card").querySelector(".product-name").textContent;
      alert(`Added ${productName} to cart!`);
      // Add your cart logic here
    });
  });
});

// ====== Mobile Filter Toggle ======
const filterBtn = document.getElementById("filterToggle");
const filterSidebar = document.getElementById("filterSidebar");
const applyFiltersBtn = document.getElementById("applyFilters");

if (filterBtn) {
  filterBtn.addEventListener("click", () => {
    filterSidebar.classList.toggle("active");
  });
}

// ====== Filtering Logic ======
applyFiltersBtn.addEventListener("click", () => {
  const selectedCategories = [...document.querySelectorAll('input[name="category"]:checked')].map(cb => cb.value);
  const selectedColors = [...document.querySelectorAll('input[name="color"]:checked')].map(cb => cb.value);
  const selectedStock = [...document.querySelectorAll('input[name="stock"]:checked')].map(cb => cb.value);

  document.querySelectorAll(".product-card").forEach(card => {
    const category = card.dataset.category;
    const color = card.dataset.color;
    const stock = card.dataset.stock;

    const matchCategory = selectedCategories.length ? selectedCategories.includes(category) : true;
    const matchColor = selectedColors.length ? selectedColors.includes(color) : true;
    const matchStock = selectedStock.length ? selectedStock.includes(stock) : true;

    if (matchCategory && matchColor && matchStock) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });

  // Close sidebar on mobile after applying
  if (window.innerWidth <= 768) {
    filterSidebar.classList.remove("active");
  }
});
