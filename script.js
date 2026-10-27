/**
 * Bhisham Singh Inter College - Pre-School & Junior Wing
 * Interactive Frontend Controller
 */

document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------------------------------------------
  // 1. Navigation & Mobile Drawer
  // --------------------------------------------------------------------------
  const menuToggle = document.getElementById("menu-toggle");
  const navbar = document.getElementById("navbar");
  const mobileOverlay = document.getElementById("mobile-overlay");
  const header = document.getElementById("main-header");
  const navLinks = document.querySelectorAll(".nav-link");

  // Mobile menu toggle & drawer
  const drawerCloseBtn = document.getElementById("drawer-close");

  const closeMenu = () => {
    if (navbar.classList.contains("active")) {
      navbar.classList.remove("active");
      menuToggle.classList.remove("active");
      mobileOverlay.classList.remove("active");
      if (header) header.classList.remove("drawer-open");
      document.body.classList.remove("drawer-open");
      document.body.style.overflow = "";
    }
  };

  const openMenu = () => {
    navbar.classList.add("active");
    menuToggle.classList.add("active");
    mobileOverlay.classList.add("active");
    if (header) header.classList.add("drawer-open");
    document.body.classList.add("drawer-open");
    document.body.style.overflow = "hidden";
  };

  if (menuToggle && navbar && mobileOverlay) {
    menuToggle.addEventListener("click", () => {
      if (navbar.classList.contains("active")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileOverlay.addEventListener("click", closeMenu);

    if (drawerCloseBtn) {
      drawerCloseBtn.addEventListener("click", closeMenu);
    }

    // Close menu when clicking any nav link
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });
  }

  // Sticky Header & Scroll Spy
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Scroll spy for active link
    const sections = document.querySelectorAll("section[id]");
    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });

    // Floating scroll to top button
    const scrollTopBtn = document.getElementById("btn-scroll-top");
    if (scrollTopBtn) {
      if (window.scrollY > 350) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    }
  });

  // Scroll to Top action
  const scrollTopBtn = document.getElementById("btn-scroll-top");
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Smooth scroll for all hash links with proper header offset
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId.startsWith("#!")) return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // Schedule a Tour Hero Button click
  const scheduleTourBtn = document.getElementById("btn-schedule-tour");
  if (scheduleTourBtn) {
    scheduleTourBtn.addEventListener("click", () => {
      const enrollSection = document.getElementById("enroll");
      if (enrollSection) {
        enrollSection.scrollIntoView({ behavior: "smooth" });
        const tourDateInput = document.getElementById("tour-date");
        if (tourDateInput) {
          setTimeout(() => tourDateInput.focus(), 600);
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // 2. Animated Stats Counter
  // --------------------------------------------------------------------------
  const counterElements = document.querySelectorAll(".counter");
  let countersAnimated = false;

  const animateCounters = () => {
    counterElements.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      const speed = 40; // lower is faster
      const increment = target / speed;

      let current = 0;
      const updateCount = () => {
        current += increment;
        if (current < target) {
          counter.innerText = Math.ceil(current);
          setTimeout(updateCount, 25);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  const statsSection = document.querySelector(".stats-card");
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !countersAnimated) {
        countersAnimated = true;
        animateCounters();
      }
    }, { threshold: 0.3 });
    observer.observe(statsSection);
  }

  // --------------------------------------------------------------------------
  // 3. About Section Tabs
  // --------------------------------------------------------------------------
  const aboutTabBtns = document.querySelectorAll(".about-tab-btn");
  const aboutTabPanes = document.querySelectorAll(".about-tab-pane");

  aboutTabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      aboutTabBtns.forEach((b) => b.classList.remove("active"));
      aboutTabPanes.forEach((p) => p.classList.remove("active"));

      btn.classList.add("active");
      const targetPane = document.getElementById(btn.getAttribute("data-tab"));
      if (targetPane) {
        targetPane.classList.add("active");
      }
    });
  });

  // "Meet Our Educators" Modal Trigger
  const meetTeamBtn = document.getElementById("btn-meet-team");
  if (meetTeamBtn) {
    meetTeamBtn.addEventListener("click", () => {
      openModal("team-modal");
    });
  }

  // --------------------------------------------------------------------------
  // 4. Program Filter Tabs & Program Detail Modals
  // --------------------------------------------------------------------------
  const programFilterBtns = document.querySelectorAll(".filter-btn");
  const programCards = document.querySelectorAll(".program-card");

  programFilterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      programFilterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      programCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "flex";
          card.style.animation = "fadeIn 0.4s ease";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Program Modal Data & Handler
  const programDetails = {
    toddler: {
      badge: "Ages 18-36 Months",
      title: "Toddler Playgroup & Sensory Wonder",
      body: `
        <p>Our Toddler Playgroup is a loving transition from home to school. We focus on sensory discovery, emotional comfort, speech initiation, and motor coordination.</p>
        <div style="margin: 20px 0; background: #FFF5F7; padding: 18px; border-radius: 12px; border-left: 4px solid #FF4769;">
          <h4 style="color: #FF4769; margin-bottom: 8px;"><i class="fas fa-clock"></i> Schedule & Batch:</h4>
          <p><strong>Timings:</strong> 8:30 AM - 11:30 AM (Monday to Friday)</p>
          <p><strong>Ratio:</strong> 8:1 (Trained Teachers with dedicated female maid care)</p>
        </div>
        <h4 style="margin-bottom: 10px; color: #1E293B;">Key Learning Milestones:</h4>
        <ul style="list-style: disc; padding-left: 20px; line-height: 1.8;">
          <li>Sensory sand, water & texture play to refine fine motor control</li>
          <li>Rhythm, musical rhymes and daily circle-time speech development</li>
          <li>Gentle potty-training guidance and healthy snacking manners</li>
          <li>Separation anxiety ease through warmth and positive reinforcement</li>
        </ul>
      `,
      programValue: "Toddler Playgroup"
    },
    preschool: {
      badge: "Ages 2.5 - 3.5 Years",
      title: "Preschool (Nursery) - Discovery & Pre-Literacy",
      body: `
        <p>Our Nursery program channels children's immense natural curiosity into early literacy, phonetics, number concepts, and social collaboration.</p>
        <div style="margin: 20px 0; background: #E0F8F5; padding: 18px; border-radius: 12px; border-left: 4px solid #00B8A9;">
          <h4 style="color: #00B8A9; margin-bottom: 8px;"><i class="fas fa-clock"></i> Schedule & Batch:</h4>
          <p><strong>Timings:</strong> 8:30 AM - 12:30 PM (Monday to Saturday)</p>
          <p><strong>Ratio:</strong> 10:1 (Subject specialist + Assistant educator)</p>
        </div>
        <h4 style="margin-bottom: 10px; color: #1E293B;">Key Learning Milestones:</h4>
        <ul style="list-style: disc; padding-left: 20px; line-height: 1.8;">
          <li>Jolly Phonics (A-Z letter sounds, association and vocabulary)</li>
          <li>Number sense, sorting, pattern recognition and size comparison</li>
          <li>Creative arts, clay dough sculpting, dance and puppet theater</li>
          <li>Self-reliance: managing school bags, water bottles and lunch boxes</li>
        </ul>
      `,
      programValue: "Preschool (Nursery)"
    },
    prek: {
      badge: "Ages 3.5 - 4.5 Years",
      title: "Pre-K (Junior KG) - Exploration & STEM Readiness",
      body: `
        <p>Junior KG bridges foundational wonder with structured pre-academic preparation, fostering logical reasoning, fluent conversational English, and fine pencil grip.</p>
        <div style="margin: 20px 0; background: #FFF8E1; padding: 18px; border-radius: 12px; border-left: 4px solid #F8B500;">
          <h4 style="color: #B45309; margin-bottom: 8px;"><i class="fas fa-clock"></i> Schedule & Batch:</h4>
          <p><strong>Timings:</strong> 8:00 AM - 1:00 PM (Monday to Saturday)</p>
          <p><strong>Ratio:</strong> 12:1 (Expert Educator with individual tracking)</p>
        </div>
        <h4 style="margin-bottom: 10px; color: #1E293B;">Key Learning Milestones:</h4>
        <ul style="list-style: disc; padding-left: 20px; line-height: 1.8;">
          <li>Sight word mastery, two & three-letter blending, and story recitation</li>
          <li>Pre-math: basic addition concepts, sequencing and geometric shapes</li>
          <li>Environmental sciences: weather, plants, animals and healthy living</li>
          <li>Confidence building through stage speaking and sports day drills</li>
        </ul>
      `,
      programValue: "Pre-K (Junior KG)"
    },
    kg: {
      badge: "Ages 4.5 - 5.5 Years",
      title: "Kindergarten (Senior KG) - Confident Primary Prep",
      body: `
        <p>Senior KG delivers comprehensive school readiness, ensuring children enter formal Grade 1 with reading fluency, mental math skills, and high emotional resilience.</p>
        <div style="margin: 20px 0; background: #F0EDFD; padding: 18px; border-radius: 12px; border-left: 4px solid #6C5CE7;">
          <h4 style="color: #6C5CE7; margin-bottom: 8px;"><i class="fas fa-clock"></i> Schedule & Batch:</h4>
          <p><strong>Timings:</strong> 8:00 AM - 1:30 PM (Monday to Saturday)</p>
          <p><strong>Ratio:</strong> 12:1 (Experienced Primary Prep Mentors)</p>
        </div>
        <h4 style="margin-bottom: 10px; color: #1E293B;">Key Learning Milestones:</h4>
        <ul style="list-style: disc; padding-left: 20px; line-height: 1.8;">
          <li>Independent sentence writing in English & Hindi Varnamala basics</li>
          <li>Mental math: addition, subtraction, time and money concepts</li>
          <li>Critical thinking puzzles, coding games, and team projects</li>
          <li>Leadership opportunities: class monitor, morning assembly prayer leaders</li>
        </ul>
      `,
      programValue: "Kindergarten (Senior KG)"
    }
  };

  let activeModalProgram = "";

  window.openProgramModal = (progKey) => {
    const data = programDetails[progKey];
    if (!data) return;

    activeModalProgram = data.programValue;
    document.getElementById("modal-program-badge").innerText = data.badge;
    document.getElementById("modal-program-title").innerText = data.title;
    document.getElementById("modal-program-body").innerHTML = data.body;

    openModal("program-modal");
  };

  const btnModalEnroll = document.getElementById("btn-modal-enroll");
  if (btnModalEnroll) {
    btnModalEnroll.addEventListener("click", () => {
      closeModal("program-modal");
      const enrollSection = document.getElementById("enroll");
      if (enrollSection) {
        enrollSection.scrollIntoView({ behavior: "smooth" });
        const programSelect = document.getElementById("program");
        if (programSelect && activeModalProgram) {
          programSelect.value = activeModalProgram;
          programSelect.dispatchEvent(new Event("change"));
        }
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. Feature Details Modal
  // --------------------------------------------------------------------------
  const featureDetailsData = {
    curriculum: {
      title: "Experiential NEP Curriculum",
      icon: '<i class="fas fa-graduation-cap text-pink" style="font-size: 2rem;"></i>',
      body: "<p>Our curriculum is thoughtfully mapped to India's National Education Policy (NEP 2020) foundational stage guidelines. Instead of passive listening, children learn through tactile play, scientific observation, and artistic expression. Each month has a thematic unit (e.g. 'Community Helpers', 'Our Solar System', 'Seasons & Nature') that integrates storytelling, mathematics, crafts, and physical games.</p>"
    },
    care: {
      title: "Loving & Nurturing Educators",
      icon: '<i class="fas fa-heart text-blue" style="font-size: 2rem;"></i>',
      body: "<p>Every teacher at Bhisham Singh Pre-School is background-verified, early childhood education certified, and trained in gentle communication. We maintain high caregiver ratios to ensure no child feels overlooked or hesitant. Our caring female attendants assist with sanitization, snacks, and personal care throughout school hours.</p>"
    },
    safety: {
      title: "Safe & Sanitized Campus",
      icon: '<i class="fas fa-shield-alt text-green" style="font-size: 2rem;"></i>',
      body: "<p>Child safety is our highest priority. The campus features 24x7 HD CCTV surveillance across all corridors, classrooms, and grounds. Gates are manned by trained security guards, and children are only handed over to authorized guardians carrying student pickup photo ID passes. Clean, child-height washrooms are disinfected hourly.</p>"
    },
    arts: {
      title: "Music, Dance & Drama",
      icon: '<i class="fas fa-music text-yellow" style="font-size: 2rem;"></i>',
      body: "<p>Music and stage exposure build immense lifelong self-confidence. Our children take part in weekly keyboard & percussion rhythm sessions, folk and western creative dance, puppet dramas, and festival celebrations where every student gets the opportunity to perform before an encouraging audience.</p>"
    },
    play: {
      title: "Outdoor & Sensory Playgrounds",
      icon: '<i class="fas fa-futbol text-purple" style="font-size: 2rem;"></i>',
      body: "<p>Surrounded by fresh air and green trees in Bhatpar Rani, our outdoor zone features soft turf, rubberized shock-absorbing flooring beneath swings and slides, tricycles, balance beams, and clean sand pits that foster gross motor coordination, balance, and cooperative peer play.</p>"
    },
    app: {
      title: "Parent Connect System",
      icon: '<i class="fas fa-mobile-alt text-orange" style="font-size: 2rem;"></i>',
      body: "<p>We believe in transparent, close partnership with families. Parents receive daily WhatsApp/SMS attendance updates, weekly activity photos, monthly developmental report cards, and scheduled one-on-one parent-teacher conferences to discuss their child's holistic growth.</p>"
    }
  };

  window.openFeatureModal = (featKey) => {
    const feat = featureDetailsData[featKey];
    if (!feat) return;

    document.getElementById("modal-feature-title").innerText = feat.title;
    document.getElementById("modal-feature-icon").innerHTML = feat.icon;
    document.getElementById("modal-feature-body").innerHTML = feat.body;
    openModal("feature-modal");
  };

  // --------------------------------------------------------------------------
  // 6. Interactive Age Eligibility & Fee Calculator Widget
  // --------------------------------------------------------------------------
  const calcDobInput = document.getElementById("calc-dob");
  const calcBtn = document.getElementById("btn-calculate-eligibility");
  const calcResultBox = document.getElementById("calculator-result");
  const resultClassName = document.getElementById("result-class-name");
  const resultDescription = document.getElementById("result-description");
  const btnApplyCalculated = document.getElementById("btn-apply-calculated-class");

  let calculatedProgram = "";

  if (calcBtn && calcDobInput) {
    calcBtn.addEventListener("click", () => {
      const dobVal = calcDobInput.value;
      const childName = document.getElementById("calc-child-name").value.trim() || "Your child";

      if (!dobVal) {
        showToast("Missing Information", "Please select your child's Date of Birth to check eligibility.", "error");
        calcDobInput.focus();
        return;
      }

      // Calculate age as of March 31, 2026 (standard school admission cutoff)
      const cutoffDate = new Date("2026-03-31");
      const birthDate = new Date(dobVal);

      let totalMonths = (cutoffDate.getFullYear() - birthDate.getFullYear()) * 12 + (cutoffDate.getMonth() - birthDate.getMonth());
      if (cutoffDate.getDate() < birthDate.getDate()) {
        totalMonths--;
      }

      const years = (totalMonths / 12).toFixed(1);

      let targetClass = "";
      let desc = "";

      if (totalMonths < 18) {
        targetClass = "Early Toddler (Waitlist / Day Care)";
        desc = `${childName} is currently ${years} years old. While our standard playgroup starts at 18 months, you can pre-register for upcoming batches!`;
        calculatedProgram = "Toddler Playgroup";
      } else if (totalMonths >= 18 && totalMonths < 30) {
        targetClass = "Toddler Playgroup (Ages 1.5 - 2.5 Yrs)";
        desc = `Great news! ${childName} (${years} yrs) is eligible for our Toddler Playgroup. Focus is on sensory development, language stimulation, and social play.`;
        calculatedProgram = "Toddler Playgroup";
      } else if (totalMonths >= 30 && totalMonths < 42) {
        targetClass = "Preschool / Nursery (Ages 2.5 - 3.5 Yrs)";
        desc = `Perfect match! ${childName} (${years} yrs) is eligible for Nursery for session 2026-27. Pre-literacy phonics, numeracy, and creative arts await!`;
        calculatedProgram = "Preschool (Nursery)";
      } else if (totalMonths >= 42 && totalMonths < 54) {
        targetClass = "Pre-K / Junior KG (Ages 3.5 - 4.5 Yrs)";
        desc = `Ideal! ${childName} (${years} yrs) qualifies for Junior KG. Focus includes early reading, handwriting, logical thinking, and scientific curiosity.`;
        calculatedProgram = "Pre-K (Junior KG)";
      } else if (totalMonths >= 54 && totalMonths <= 72) {
        targetClass = "Kindergarten / Senior KG (Ages 4.5 - 6 Yrs)";
        desc = `Excellent! ${childName} (${years} yrs) is eligible for Senior KG (UKG) to prepare seamlessly for Grade 1 formal schooling.`;
        calculatedProgram = "Kindergarten (Senior KG)";
      } else {
        targetClass = "Primary Wing (Class 1 & Above)";
        desc = `${childName} (${years} yrs) is ready for primary schooling in our main college wing!`;
        calculatedProgram = "Kindergarten (Senior KG)";
      }

      resultClassName.innerText = targetClass;
      resultDescription.innerText = desc;
      calcResultBox.style.display = "block";
      calcResultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });

      showToast("Eligibility Identified!", `${childName} is eligible for ${targetClass}.`, "success");
    });
  }

  if (btnApplyCalculated) {
    btnApplyCalculated.addEventListener("click", () => {
      const enrollSection = document.getElementById("enroll");
      if (enrollSection) {
        enrollSection.scrollIntoView({ behavior: "smooth" });
        
        // Auto-fill form fields
        const childNameInput = document.getElementById("child-name");
        const calcChildName = document.getElementById("calc-child-name").value.trim();
        if (childNameInput && calcChildName) {
          childNameInput.value = calcChildName;
        }

        const programSelect = document.getElementById("program");
        if (programSelect && calculatedProgram) {
          programSelect.value = calculatedProgram;
        }

        showToast("Form Prefilled", "Admission form has been prefilled with your selected program.", "info");
      }
    });
  }

  // --------------------------------------------------------------------------
  // 7. Testimonials Slider (Fixed, Autoplay & Review Modal)
  // --------------------------------------------------------------------------
  const testimonialSlider = document.getElementById("testimonial-slider");
  let testimonialSlides = document.querySelectorAll(".testimonial-slide");
  let dots = document.querySelectorAll("#testimonial-dots .dot");
  const prevTestiBtn = document.getElementById("prev-testi-btn");
  const nextTestiBtn = document.getElementById("next-testi-btn");
  let currentSlideIndex = 0;
  let testimonialAutoSlideTimer = null;

  function updateSlider(index) {
    testimonialSlides = document.querySelectorAll(".testimonial-slide");
    dots = document.querySelectorAll("#testimonial-dots .dot");

    if (testimonialSlides.length === 0) return;

    currentSlideIndex = (index + testimonialSlides.length) % testimonialSlides.length;

    testimonialSlides.forEach((slide, idx) => {
      slide.classList.remove("active");
      if (idx === currentSlideIndex) {
        slide.classList.add("active");
      }
    });

    dots.forEach((dot, idx) => {
      dot.classList.remove("active");
      if (idx === currentSlideIndex) {
        dot.classList.add("active");
      }
    });
  }

  function startAutoSlide() {
    stopAutoSlide();
    testimonialAutoSlideTimer = setInterval(() => {
      updateSlider(currentSlideIndex + 1);
    }, 5500);
  }

  function stopAutoSlide() {
    if (testimonialAutoSlideTimer) {
      clearInterval(testimonialAutoSlideTimer);
      testimonialAutoSlideTimer = null;
    }
  }

  if (prevTestiBtn) {
    prevTestiBtn.addEventListener("click", () => {
      updateSlider(currentSlideIndex - 1);
      startAutoSlide();
    });
  }

  if (nextTestiBtn) {
    nextTestiBtn.addEventListener("click", () => {
      updateSlider(currentSlideIndex + 1);
      startAutoSlide();
    });
  }

  const dotsContainer = document.getElementById("testimonial-dots");
  if (dotsContainer) {
    dotsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("dot")) {
        const slideIdx = parseInt(e.target.getAttribute("data-slide"));
        updateSlider(slideIdx);
        startAutoSlide();
      }
    });
  }

  if (testimonialSlider) {
    testimonialSlider.addEventListener("mouseenter", stopAutoSlide);
    testimonialSlider.addEventListener("mouseleave", startAutoSlide);
    startAutoSlide();
  }

  // Parent Review Modal & Star Selector
  const btnAddReview = document.getElementById("btn-add-review");
  const starRatingSelect = document.getElementById("star-rating-select");
  const revRatingVal = document.getElementById("rev-rating-val");

  if (btnAddReview) {
    btnAddReview.addEventListener("click", () => {
      openModal("review-modal");
    });
  }

  if (starRatingSelect) {
    const stars = starRatingSelect.querySelectorAll(".star");
    stars.forEach((star) => {
      star.addEventListener("click", () => {
        const rating = parseInt(star.getAttribute("data-rating"));
        revRatingVal.value = rating;
        stars.forEach((s) => {
          const sRating = parseInt(s.getAttribute("data-rating"));
          if (sRating <= rating) {
            s.classList.add("active");
          } else {
            s.classList.remove("active");
          }
        });
      });
    });
  }

  const reviewForm = document.getElementById("review-form");
  if (reviewForm) {
    reviewForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const parentName = document.getElementById("rev-parent-name").value.trim();
      const childName = document.getElementById("rev-child-name").value.trim();
      const comment = document.getElementById("rev-comment").value.trim();
      const rating = parseInt(revRatingVal.value) || 5;

      if (!parentName || !childName || !comment) {
        showToast("Incomplete Form", "Please fill in all review fields.", "error");
        return;
      }

      // Generate stars html
      let starHtml = "";
      for (let i = 0; i < rating; i++) {
        starHtml += '<i class="fas fa-star"></i>';
      }

      // Create new slide
      const newSlide = document.createElement("div");
      newSlide.className = "testimonial-slide";
      const initials = parentName.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2) || "P";
      newSlide.innerHTML = `
        <div class="testimonial-card">
          <div class="quote-icon"><i class="fas fa-quote-left"></i></div>
          <div class="star-rating">${starHtml}</div>
          <p class="testimonial-text">"${comment}"</p>
          <div class="testimonial-author">
            <div class="author-avatar bg-coral">${initials}</div>
            <div class="author-info">
              <h4>${parentName}</h4>
              <p>Parent of ${childName}</p>
              <small class="verified-parent"><i class="fas fa-check-circle"></i> Just Submitted • Parent Review</small>
            </div>
          </div>
        </div>
      `;

      testimonialSlider.appendChild(newSlide);

      // Add a dot
      const newDot = document.createElement("button");
      newDot.className = "dot";
      newDot.setAttribute("data-slide", testimonialSlides.length);
      dotsContainer.appendChild(newDot);

      closeModal("review-modal");
      reviewForm.reset();
      updateSlider(testimonialSlides.length); // jump to newly added slide

      showToast("Thank You!", "Your heartfelt review has been added to our wall of love!", "success");
    });
  }

  // --------------------------------------------------------------------------
  // 8. Gallery Category Filter, "View More" & Interactive Lightbox
  // --------------------------------------------------------------------------
  const galleryTabs = document.querySelectorAll(".gallery-tab");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const btnToggleGallery = document.getElementById("btn-toggle-gallery");
  const galleryBtnText = document.getElementById("gallery-btn-text");
  let isGalleryExpanded = false;

  // Gallery Category Filter
  galleryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      galleryTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.getAttribute("data-gallery-filter");

      galleryItems.forEach((item) => {
        const cat = item.getAttribute("data-category");
        const isExtra = item.classList.contains("extra-gallery-item");

        if (filter === "all" || cat === filter) {
          if (!isExtra || isGalleryExpanded) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // "View More Photos" toggle
  if (btnToggleGallery) {
    btnToggleGallery.addEventListener("click", () => {
      const extraItems = document.querySelectorAll(".extra-gallery-item");
      isGalleryExpanded = !isGalleryExpanded;

      extraItems.forEach((item) => {
        item.style.display = isGalleryExpanded ? "block" : "none";
        if (isGalleryExpanded) {
          item.style.animation = "fadeIn 0.5s ease";
        }
      });

      if (isGalleryExpanded) {
        galleryBtnText.innerText = "Show Fewer Photos";
      } else {
        galleryBtnText.innerText = "View More Photos";
      }
    });
  }

  // Lightbox Data & Viewer
  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const lightboxClose = document.getElementById("lightbox-close");
  const lightboxPrev = document.getElementById("lightbox-prev");
  const lightboxNext = document.getElementById("lightbox-next");

  const galleryData = [
    { src: "classrooms.webp", title: "Modern Interactive Classrooms", desc: "Airy, safe and ergonomically designed furniture with interactive displays." },
    { src: "sld-2.jpg", title: "Outdoor Sports & Playground", desc: "Children developing motor agility and team camaraderie on our safe grounds." },
    { src: "unnamed.webp", title: "School Events & Celebrations", desc: "Flag hoisting ceremonies and special gatherings on our campus." },
    { src: "nature.jpeg", title: "Lush Green Eco Lawn", desc: "Nurturing an organic bond with nature, plants and open sky." },
    { src: "default-schools-6-250.avif", title: "Group Circle Time & Story Hour", desc: "Fostering active listening, phonics and friendly peer interactions." },
    { src: "images (2).jpeg", title: "Art, Clay & Finger Painting", desc: "Igniting boundless imagination with safe non-toxic pigments and clay." },
    { src: "sld-2.jpg", title: "Festivals & Cultural Days", desc: "Celebrating our rich heritage, Diwali, Eid, and National events." },
    { src: "classrooms.webp", title: "Music & Rhythm Corner", desc: "Reciting musical rhymes, exploring rhythm instruments, and singing." }
  ];

  let currentLightboxIndex = 0;

  window.openLightbox = (index) => {
    currentLightboxIndex = index;
    updateLightbox();
    lightboxModal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  function updateLightbox() {
    const item = galleryData[currentLightboxIndex];
    if (!item) return;

    lightboxImg.src = item.src;
    lightboxCaption.innerHTML = `<strong>${item.title}</strong> — ${item.desc}`;
  }

  if (lightboxClose) {
    lightboxClose.addEventListener("click", () => {
      lightboxModal.classList.remove("active");
      document.body.style.overflow = "";
    });
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", () => {
      currentLightboxIndex = (currentLightboxIndex - 1 + galleryData.length) % galleryData.length;
      updateLightbox();
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", () => {
      currentLightboxIndex = (currentLightboxIndex + 1) % galleryData.length;
      updateLightbox();
    });
  }

  // Keyboard navigation for Lightbox
  window.addEventListener("keydown", (e) => {
    if (lightboxModal && lightboxModal.classList.contains("active")) {
      if (e.key === "Escape") {
        lightboxModal.classList.remove("active");
        document.body.style.overflow = "";
      } else if (e.key === "ArrowLeft") {
        currentLightboxIndex = (currentLightboxIndex - 1 + galleryData.length) % galleryData.length;
        updateLightbox();
      } else if (e.key === "ArrowRight") {
        currentLightboxIndex = (currentLightboxIndex + 1) % galleryData.length;
        updateLightbox();
      }
    }
  });

  // --------------------------------------------------------------------------
  // 9. Admission Inquiry Form Live Validation & Token Slip
  // --------------------------------------------------------------------------
  const inquiryForm = document.getElementById("inquiry-form");
  const btnDownloadForm = document.getElementById("btn-download-form");

  if (inquiryForm) {
    inquiryForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Form Fields
      const parentName = document.getElementById("parent-name");
      const childName = document.getElementById("child-name");
      const childAge = document.getElementById("child-age");
      const program = document.getElementById("program");
      const phone = document.getElementById("phone");
      const email = document.getElementById("email");

      let isValid = true;

      // Helper to set error
      const setError = (input, errorId, msg) => {
        const group = input.closest(".form-group");
        group.classList.add("has-error");
        const errElem = document.getElementById(errorId);
        if (errElem) errElem.innerText = msg;
        isValid = false;
      };

      const clearError = (input) => {
        const group = input.closest(".form-group");
        group.classList.remove("has-error");
      };

      // Reset errors
      [parentName, childName, childAge, program, phone, email].forEach(clearError);

      if (!parentName.value.trim()) {
        setError(parentName, "err-parent-name", "Please enter parent or guardian name.");
      }

      if (!childName.value.trim()) {
        setError(childName, "err-child-name", "Please enter child's full name.");
      }

      if (!childAge.value) {
        setError(childAge, "err-child-age", "Please select child's age group.");
      }

      if (!program.value) {
        setError(program, "err-program", "Please choose an interested program.");
      }

      // Phone check: 10 digits
      const phoneVal = phone.value.replace(/\D/g, "");
      if (phoneVal.length !== 10) {
        setError(phone, "err-phone", "Please enter a valid 10-digit mobile number.");
      }

      // Email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        setError(email, "err-email", "Please enter a valid email address.");
      }

      if (!isValid) {
        showToast("Validation Error", "Please correct the highlighted fields.", "error");
        return;
      }

      // Submit loading state
      const submitBtn = document.getElementById("btn-submit-inquiry");
      const originalBtnHtml = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Inquiry...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHtml;

        // Generate token and populate slip
        const randomToken = "BSIC-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);
        document.getElementById("slip-token").innerText = randomToken;
        document.getElementById("slip-parent").innerText = parentName.value.trim();
        document.getElementById("slip-child").innerText = childName.value.trim();
        document.getElementById("slip-program").innerText = program.value;
        document.getElementById("slip-phone").innerText = "+91 " + phoneVal;

        openModal("success-modal");
        inquiryForm.reset();

        showToast("Inquiry Received!", `Admission Token ${randomToken} generated successfully.`, "success");
      }, 1200);
    });
  }

  // "Download Forms PDF" action
  if (btnDownloadForm) {
    btnDownloadForm.addEventListener("click", () => {
      // Create a printable window with official form format
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Admission Application Form - Bhisham Singh Inter College</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #1e293b; }
            .header { text-align: center; border-bottom: 3px double #ff4769; padding-bottom: 20px; margin-bottom: 30px; }
            .header h1 { color: #ff4769; margin: 0 0 5px 0; font-size: 26px; text-transform: uppercase; }
            .header p { margin: 3px 0; font-size: 14px; color: #64748b; }
            .photo-box { float: right; width: 120px; height: 140px; border: 2px dashed #94a3b8; text-align: center; line-height: 140px; font-size: 12px; color: #94a3b8; }
            .form-section { margin-bottom: 25px; clear: both; }
            .section-title { background: #ffeef2; color: #ff4769; padding: 6px 12px; font-size: 15px; font-weight: bold; border-radius: 4px; margin-bottom: 15px; }
            .field-row { display: flex; margin-bottom: 12px; }
            .field { flex: 1; margin-right: 15px; font-size: 14px; }
            .field-line { border-bottom: 1px dotted #94a3b8; display: inline-block; width: 60%; min-height: 18px; }
            .instructions { font-size: 12px; color: #64748b; border: 1px solid #e2e8f0; padding: 12px; border-radius: 4px; margin-top: 40px; }
            .sign-area { display: flex; justify-content: space-between; margin-top: 60px; }
            .sign-line { width: 200px; border-top: 1px solid #1e293b; text-align: center; padding-top: 5px; font-size: 13px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="photo-box">Affix Recent Child Photo</div>
            <h1>Bhisham Singh Inter College</h1>
            <p><strong>Pre-School & Junior Wing • Session 2026-2027</strong></p>
            <p>Pipra Baghel, Bhatpar Rani, Deoria (UP) - 274702 | Phone: +91 96708 23651</p>
            <p><em>Registration & Admission Application Form</em></p>
          </div>

          <div class="form-section">
            <div class="section-title">1. Student Details</div>
            <p>Child's Full Name (in block letters): <span class="field-line"></span></p>
            <p>Date of Birth: <span class="field-line" style="width: 25%;"></span> Gender: [ ] Boy [ ] Girl</p>
            <p>Program Seeking Admission For: [ ] Playgroup [ ] Nursery [ ] Pre-K [ ] Kindergarten</p>
            <p>Blood Group: <span class="field-line" style="width: 20%;"></span> Mother Tongue: <span class="field-line" style="width: 25%;"></span></p>
          </div>

          <div class="form-section">
            <div class="section-title">2. Parent / Guardian Details</div>
            <p>Father's Name: <span class="field-line"></span> Occupation: <span class="field-line" style="width: 30%;"></span></p>
            <p>Mother's Name: <span class="field-line"></span> Occupation: <span class="field-line" style="width: 30%;"></span></p>
            <p>Primary Contact Number: <span class="field-line" style="width: 30%;"></span> Alternate: <span class="field-line" style="width: 30%;"></span></p>
            <p>Residential Address: <span class="field-line" style="width: 80%;"></span></p>
            <p>Requires School Transport? [ ] Yes [ ] No (Pickup Location: <span class="field-line" style="width: 40%;"></span>)</p>
          </div>

          <div class="form-section">
            <div class="section-title">3. Enclosures Checklist</div>
            <p>[ ] Copy of Birth Certificate &nbsp;&nbsp;&nbsp;&nbsp; [ ] 4 Passport Photos of Child &nbsp;&nbsp;&nbsp;&nbsp; [ ] Aadhaar Copy of Parents</p>
          </div>

          <div class="sign-area">
            <div class="sign-line">Parent / Guardian Signature</div>
            <div class="sign-line">Admission Coordinator</div>
            <div class="sign-line">Principal / Seal</div>
          </div>

          <div class="instructions">
            <strong>Note:</strong> Please bring this completed form along with required documents to the school admissions office in Bhatpar Rani between 8:00 AM and 2:00 PM.
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 500);

      showToast("Admission Form Ready", "Print dialogue opened for official admission form.", "info");
    });
  }

  // --------------------------------------------------------------------------
  // 10. FAQs Accordion
  // --------------------------------------------------------------------------
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question");
    if (questionBtn) {
      questionBtn.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        // Close other FAQs
        faqItems.forEach((other) => other.classList.remove("active"));

        if (!isActive) {
          item.classList.add("active");
        }
      });
    }
  });

  // --------------------------------------------------------------------------
  // 11. Newsletter Subscription
  // --------------------------------------------------------------------------
  const newsletterForm = document.getElementById("newsletter-form");
  const newsletterEmail = document.getElementById("newsletter-email");
  const newsletterMsg = document.getElementById("newsletter-msg");

  if (newsletterForm && newsletterEmail) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = newsletterEmail.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        showToast("Invalid Email", "Please provide a valid email address.", "error");
        return;
      }

      const btnNewsletter = document.getElementById("btn-newsletter");
      btnNewsletter.disabled = true;

      setTimeout(() => {
        btnNewsletter.disabled = false;
        newsletterEmail.value = "";
        showToast("Subscribed!", "You have successfully subscribed to school newsletters.", "success");
      }, 800);
    });
  }

  // --------------------------------------------------------------------------
  // 12. Policy Modals (Privacy & Terms)
  // --------------------------------------------------------------------------
  window.openPolicyModal = (type) => {
    const titleElem = document.getElementById("policy-modal-title");
    const bodyElem = document.getElementById("policy-modal-body");

    if (type === "privacy") {
      titleElem.innerText = "Privacy & Student Protection Policy";
      bodyElem.innerHTML = `
        <p>At <strong>Bhisham Singh Inter College</strong>, protecting the privacy and dignity of our students and their families is of paramount importance.</p>
        <h4 style="margin: 15px 0 8px 0; color: #1e293b;">Data Collection & Usage</h4>
        <p>Information collected through our inquiry form (such as parent names, contact numbers, and children's dates of birth) is strictly used for admissions processing, school communications, and safety purposes. We never sell, lease, or share personal information with third-party marketing entities.</p>
        <h4 style="margin: 15px 0 8px 0; color: #1e293b;">Campus Photography & Consent</h4>
        <p>Photos taken during campus events, sports days, and educational projects are shared only on authorized school platforms for community updates with guardian permission.</p>
      `;
    } else {
      titleElem.innerText = "Terms of Admission & Code of Conduct";
      bodyElem.innerHTML = `
        <p>We believe in nurturing young learners through positive reinforcement, safety, and mutual respect.</p>
        <h4 style="margin: 15px 0 8px 0; color: #1e293b;">Key Terms:</h4>
        <ul style="list-style: disc; padding-left: 20px; line-height: 1.8;">
          <li>Admissions are granted on a first-come, first-served basis according to batch capacity.</li>
          <li>Accurate age verification via municipal birth certificate or hospital discharge summary is mandatory.</li>
          <li>Guardians are requested to maintain punctual drop and pickup timings for student security.</li>
          <li>Parents are welcome to schedule meetings with educators during designated visit hours.</li>
        </ul>
      `;
    }

    openModal("policy-modal");
  };

  // --------------------------------------------------------------------------
  // 13. Modal Core Helpers
  // --------------------------------------------------------------------------
  window.openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  };

  window.closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  };

  // Close modals on background click
  document.querySelectorAll(".modal").forEach((m) => {
    m.addEventListener("click", (e) => {
      if (e.target === m) {
        closeModal(m.getAttribute("id"));
      }
    });
  });

  // --------------------------------------------------------------------------
  // 14. Toast Notification Dispatcher
  // --------------------------------------------------------------------------
  window.showToast = (title, message, type = "info") => {
    const toastContainer = document.getElementById("toast-container");
    if (!toastContainer) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    let iconClass = "fa-info-circle";
    if (type === "success") iconClass = "fa-check-circle";
    if (type === "error") iconClass = "fa-exclamation-circle";

    toast.innerHTML = `
      <i class="fas ${iconClass} toast-icon"></i>
      <div class="toast-text">
        <strong>${title}</strong>
        <p>${message}</p>
      </div>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = "toastIn 0.3s ease reverse";
      setTimeout(() => toast.remove(), 280);
    }, 4000);
  };
});