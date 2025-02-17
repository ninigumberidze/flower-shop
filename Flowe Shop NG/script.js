// Selecting DOM elements
const header = document.querySelector(".header");
const navLinks = document.querySelectorAll(".nav-link");
const shopItems = document.querySelectorAll(".cont-div");
const viewMoreBtn = document.querySelector(".view-more");
const footerYear = document.querySelector(".pp p");

// Sticky navigation
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(header);

// Smooth scrolling animation
navLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to section
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Shop items hover animation
shopItems.forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-1.2rem)";
    this.style.boxShadow = "0 3.2rem 6.4rem rgba(0, 0, 0, 0.07)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "0 1.2rem 2.4rem rgba(0, 0, 0, 0.09)";
  });
});

// View More button functionality
let isExpanded = false;
viewMoreBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const hiddenItems = document.querySelectorAll(".container-div.hidden");

  if (!isExpanded) {
    hiddenItems.forEach((item) => item.classList.remove("hidden"));
    viewMoreBtn.textContent = "View Less";
  } else {
    hiddenItems.forEach((item) => item.classList.add("hidden"));
    viewMoreBtn.textContent = "View More";
  }

  isExpanded = !isExpanded;
});

// Mobile navigation
const mobileNavBtn = document.createElement("button");
mobileNavBtn.classList.add("mobile-nav-btn");
mobileNavBtn.innerHTML = '<ion-icon name="menu-outline"></ion-icon>';
header.appendChild(mobileNavBtn);

const navigation = document.querySelector(".navigation");

mobileNavBtn.addEventListener("click", function () {
  header.classList.toggle("nav-open");
});

// Close mobile navigation when clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", function () {
    header.classList.remove("nav-open");
  });
});

// Update copyright year
const updateYear = function () {
  const year = new Date().getFullYear();
  footerYear.textContent = `copyright © ${year} by NiniGumb.`;
};
updateYear();

// Add lazy loading to images
const images = document.querySelectorAll("img");
images.forEach((img) => img.setAttribute("loading", "lazy"));

// Add to cart functionality
const addToCartBtns = document.querySelectorAll(".add-to-cart");
let cartItems = 0;

addToCartBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    cartItems++;
    updateCartBadge();
    showNotification("Item added to cart!");
  });
});

function updateCartBadge() {
  const cartBadge = document.querySelector(".cart-badge");
  if (cartBadge) {
    cartBadge.textContent = cartItems;
  }
}

function showNotification(message) {
  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Add resize observer for responsive design
const resizeObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
    if (entry.contentRect.width < 768) {
      header.classList.add("mobile");
    } else {
      header.classList.remove("mobile");
      header.classList.remove("nav-open");
    }
  }
});

console.log("hi");

resizeObserver.observe(document.body);
