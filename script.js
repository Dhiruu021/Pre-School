document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
  
    if (menuToggle) {
      menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        const icon = menuToggle.querySelector("i");
        if (navMenu.classList.contains("active")) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-times");
        } else {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      });
    }
  
    document.addEventListener("click", (event) => {
      if (
        !event.target.closest(".nav-menu") &&
        !event.target.closest(".menu-toggle") &&
        navMenu.classList.contains("active")
      ) {
        navMenu.classList.remove("active");
        const icon = menuToggle.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        if (navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
          const icon = menuToggle.querySelector("i");
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 90,
            behavior: "smooth",
          });
        }
      });
    });
  
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-menu a");
  
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
          current = section.getAttribute("id");
        }
      });
  
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    });
  
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll(".testimonial-slide");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    let currentSlide = 0;
  
    function showSlide(n) {
      testimonialSlides.forEach((slide) => slide.classList.remove("active"));
      dots.forEach((dot) => dot.classList.remove("active"));
      currentSlide = (n + testimonialSlides.length) % testimonialSlides.length;
      testimonialSlides[currentSlide].classList.add("active");
      dots[currentSlide].classList.add("active");
    }
  
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));
      nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
    }
  
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => showSlide(index));
    });
  
    setInterval(() => {
      if (testimonialSlides.length > 0) {
        showSlide(currentSlide + 1);
      }
    }, 5000);
  
    // Form Submission
    const inquiryForm = document.getElementById("inquiry-form");
    const newsletterForm = document.getElementById("newsletter-form");
  
    if (inquiryForm) {
      inquiryForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";
        setTimeout(() => {
          alert("Thank you for your inquiry! We will contact you shortly.");
          inquiryForm.reset();
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }, 1500);
      });
    }
  
    if (newsletterForm) {
      newsletterForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const submitButton = this.querySelector('button[type="submit"]');
        const emailInput = this.querySelector('input[type="email"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = "Subscribing...";
        setTimeout(() => {
          alert(`Thank you for subscribing to our newsletter with ${emailInput.value}!`);
          newsletterForm.reset();
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        }, 1500);
      });
    }
  
    // Animation on scroll
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(
        ".feature-box, .program-card, .gallery-item, .about-image, .about-text"
      );
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementPosition < windowHeight - 100) {
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
        }
      });
    };
  
    document
      .querySelectorAll(".feature-box, .program-card, .gallery-item, .about-image, .about-text")
      .forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      });
  
    window.addEventListener("load", animateOnScroll);
    window.addEventListener("scroll", animateOnScroll);
  });
  