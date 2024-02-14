// Change navbar background-color when scroll
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("js-navbar");

  if (window.scrollY > 0) {
    navbar.classList.add("nav-bg");
  }
  else {
    navbar.classList.remove("nav-bg");
  }
});

const nav = document.querySelector("nav");
const menuBtn = document.querySelector(".bi-list");
const closeBtn = document.querySelector(".bi-x-lg");
// Set offcanvas animation when screen width smaller than 1000px
function setOffcanvasAnimation() {
  const screenWidth = document.documentElement.clientWidth;

  if (screenWidth < 1000) {
    nav.classList.add("offcanvas-animation");
  }
  else {
    nav.classList.remove("offcanvas-animation");
  }
}

// Show offcanvas when click on menu button
menuBtn.addEventListener("click", () => {
  // Add animation to menu button
  menuBtn.classList.add("rotate-90");
  nav.classList.add("offcanvas-active");
  closeBtn.classList.remove("rotate-90");
  // Hide body overflow
  document.body.style.overflow = "hidden";
});

// Close offcanvas when click on close button
closeBtn.addEventListener("click", () => {
  // Add animation to close button
  closeBtn.classList.add("rotate-90");
  nav.classList.remove("offcanvas-active");
  menuBtn.classList.remove("rotate-90");

  if (dropdownList.classList.contains("toggle-dropdown")) {
    dropdownList.classList.remove("toggle-dropdown");
  }

  // Reset body overflow
  document.body.style.overflow = "";
});

const dropdownBtn = document.querySelector(".bi-chevron-down");
const dropdownList = document.querySelector(".nav-dropdown-list");
let isDropdownExpanded = false;

// Add animation to nav dropdown button
dropdownBtn.addEventListener("click", () => {
  // Check if dropdown is expanded
  if (isDropdownExpanded) {
    // If dropdown is expanded, remove expand animation and add collapse animation
    dropdownList.classList.remove("expand-dropdown-animation");
    dropdownList.classList.add("collapse-dropdown-animation");

    // Wait for collapse animation to finish before removing the class
    dropdownList.addEventListener("animationend", () => {
      dropdownList.classList.remove("toggle-dropdown");
      dropdownList.classList.remove("collapse-dropdown-animation");
    }, { once: true });
  }
  else {
    // If dropdown is not expanded, expand dropdown and remove collapse animation and add expand animation
    dropdownList.classList.add("toggle-dropdown");
    dropdownList.classList.remove("collapse-dropdown-animation");
    dropdownList.classList.add("expand-dropdown-animation");
  }

  // Add animation to dropdown icon
  if (dropdownBtn.classList.contains("rotate-180")) {
    dropdownBtn.classList.remove("rotate-180");
    dropdownBtn.classList.add("rotate-0");
  }
  else {
    dropdownBtn.classList.remove("rotate-0");
    dropdownBtn.classList.add("rotate-180");
  }

  // Toggle dropdown state
  isDropdownExpanded = !isDropdownExpanded;
});

const navDropdown = document.querySelector(".nav-dropdown");
// Show dropdown when user hover nav dropdown
function hoverDropdown(show) {
  if (show) {
    dropdownList.classList.add("toggle-dropdown");
    navDropdown.children[0].children[0].classList.add("active");
  }
  else {
    dropdownList.classList.remove("toggle-dropdown");
    navDropdown.children[0].children[0].classList.remove("active");
  }
}

// Check if user hover over nav dropdown
navDropdown.addEventListener("mouseenter", () => {
  const screenWidth = document.documentElement.clientWidth;

  if (screenWidth >= 1000) {
    hoverDropdown(true);
  }
});

// Close dropdown menu if user hover away
navDropdown.addEventListener("mouseleave", () => {
  hoverDropdown(false);
});

// Make nav active when user hover inside dropdown
dropdownList.addEventListener("mouseenter", () => {
  navDropdown.children[0].children[0].classList.add("active");
});

// Close dropdown menu if user hover away
dropdownList.addEventListener("mouseleave", () => {
  hoverDropdown(false);
});

document.addEventListener("DOMContentLoaded", () => {
  setSlide();
  window.addEventListener("load", setOffcanvasAnimation);
  window.addEventListener("resize", setOffcanvasAnimation);
  window.addEventListener("load", setFontSize);
  window.addEventListener("resize", setFontSize);
});

// Set font size dynamically for slide content based on screen width
function setFontSize() {
  const screenWidth = document.documentElement.clientWidth;
  const slideTitles = document.querySelectorAll(".slide-title");
  const slideDescriptions = document.querySelectorAll(".slide-description");

  // Set slide title font size
  slideTitles.forEach((title) => {
    if (screenWidth >= 778) {
      title.style.fontSize = Math.round(3.12 * 1 / 100 * screenWidth) + "px";
    }
    else {
      title.style.fontSize = Math.round(8.4 * 1 / 100 * screenWidth) + "px";
    }
  });

  // Set slide description font size
  slideDescriptions.forEach((description) => {
    if (screenWidth >= 778) {
      description.style.fontSize = Math.round(1.05 * 1 / 100 * screenWidth) + "px";
    }
    else {
      description.style.fontSize = Math.round(3.8 * 1 / 100 * screenWidth) + "px";
    }
  })
}

// Set autoplay slide
function setSlide() {
  const images = [
    "./assets/Depositphotos_534347342_L-jpg.webp",
    "./assets/Depositphotos_645359096_L-jpg.webp",
    "./assets/Depositphotos_238891930_L-jpg.webp",
  ];
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;
  let currentSlide = 2;

  const showSlide = (n) => {
    slides.forEach((slide) => {
      slide.classList.remove("slide-active");

      if (slide.children[1].children[0].children[1].classList.contains("animated")) {
        slide.children[1].children[0].children[1].classList.remove("animated");
      }

    });
    slides[n].classList.add("slide-active");
    // Set background image of current slide
    slides[currentSlide].children[0].style.backgroundImage = `url("${images[currentSlide]}")`;
  };

  // Play next slide
  const nextSlide = () => {
    // When showing last slide, switch back to first slide
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  };

  // Autoplay slide
  setInterval(nextSlide, 3000);

  nextSlide();
}

// Set copyright year
document.querySelectorAll(".current-year").forEach((element) => element.innerHTML = new Date().getFullYear());

// Runs animation when 70% of element is loaded on screen
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");

      if (entry.target.classList.contains("js-expertise-counter")) {
        counterAnimation(entry.target);
        observer.unobserve(entry.target);
      }
    }
  });
}, {
  threshold: 0.7,
});

const animationElements = document.querySelectorAll(".animate");
animationElements.forEach((element) => observer.observe(element));

// Counter animation for Expertise section
function counterAnimation(counter) {
  let count = 0;
  const finalValue = parseInt(counter.innerHTML);
  const interval = finalValue === 6 ? 700 : 5000 / finalValue;

  let intervalId = setInterval(() => {
    if (count > finalValue) {
      count = finalValue;
      clearInterval(intervalId);
    }

    counter.innerHTML = count;
    count++;
  }, interval);
}