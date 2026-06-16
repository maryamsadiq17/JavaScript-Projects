// Wait for the DOM window elements to fully load
document.addEventListener("DOMContentLoaded", () => {
    const mainHeader = document.querySelector(".main-nav-bar");
    
    // Simple Sticky Header functionality
    window.addEventListener("scroll", () => {
        if (window.scrollY > 150) {
            mainHeader.style.position = "fixed";
            mainHeader.style.top = "0";
            mainHeader.style.left = "0";
            mainHeader.style.width = "100%;";
            mainHeader.style.backgroundColor = "#ffffff";
            mainHeader.style.boxShadow = "0px 2px 10px rgba(0,0,0,0.05)";
            mainHeader.style.padding = "15px 0"; // slightly smaller when scrolling
        } else {
            // Revert back to original layout when scroll is back at top
            mainHeader.style.position = "relative";
            mainHeader.style.boxShadow = "none";
            mainHeader.style.padding = "25px 0";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // 1. STICKY HEADER
    const mainHeader = document.querySelector(".main-nav-bar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 150) {
            mainHeader.style.position = "fixed";
            mainHeader.style.top = "0";
            mainHeader.style.left = "0";
            mainHeader.style.width = "100%";
            mainHeader.style.backgroundColor = "#ffffff";
            mainHeader.style.boxShadow = "0px 2px 10px rgba(0,0,0,0.05)";
            mainHeader.style.padding = "15px 0";
        } else {
            mainHeader.style.position = "relative";
            mainHeader.style.boxShadow = "none";
            mainHeader.style.padding = "25px 0";
        }
    });

    // 2. MODAZ CONTINUOUS TIMELINE SLIDER ENGINE
    const track = document.querySelector(".slider-track");
    const slides = Array.from(document.querySelectorAll(".slide"));
    const timelineBar = document.querySelector(".slider-timeline-bar");
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    const slideDuration = 5000; // 5 seconds total per slide
    const updateInterval = 20;  // Refresh calculation every 20ms for buttery smoothness
    let timeElapsed = 0;
    let progressTimer;

    // Set slide 1 active on initialization
    slides[0].classList.add("active-slide");

    const updateSlider = (index) => {
        // Move the track horizontally
        track.style.transform = `translateX(-${index * (100 / totalSlides)}%)`;
        
        // Reset and trigger slide inner text typography delayed transitions
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add("active-slide");
            } else {
                slide.classList.remove("active-slide");
            }
        });

        currentIndex = index;
    };

    // Continuous Progress Loader Loop Function
    const startTimelineClock = () => {
        progressTimer = setInterval(() => {
            timeElapsed += updateInterval;
            
            // Calculate current percentage complete
            let percentage = (timeElapsed / slideDuration) * 100;
            timelineBar.style.width = `${percentage}%`;

            // Once 5 seconds complete, shift to next slide and clear cycle back to zero
            if (timeElapsed >= slideDuration) {
                timeElapsed = 0;
                timelineBar.style.width = "0%";
                
                let nextIndex = currentIndex + 1;
                if (nextIndex >= totalSlides) nextIndex = 0;
                
                updateSlider(nextIndex);
            }
        }, updateInterval);
    };

    // Kickstart engine
    startTimelineClock();
});


// ==========================================================================
// 8. DYNAMIC PRODUCT GRID FILTER CONTROLLER
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const tabButtons = document.querySelectorAll(".filter-tab-bar .tab-btn");
    const filterItems = document.querySelectorAll(".dynamic-filter-grid .filter-item");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            // 1. Remove active highlights across all button modules
            tabButtons.forEach(btn => btn.classList.remove("active"));
            
            // 2. Lock active highlight onto current clicked button block
            button.classList.add("active");

            // 3. Extract targeting category variable profile
            const targetFilter = button.getAttribute("data-filter");

            // 4. Loop grid arrays to isolate item matches
            filterItems.forEach(item => {
                const itemCategory = item.getAttribute("data-category");

                if (targetFilter === "all" || targetFilter === itemCategory) {
                    item.classList.remove("hide");
                } else {
                    item.classList.add("hide");
                }
            });
        });
    });
});


// ==========================================================================
// 10. DIRECTION-AWARE HOVER OVERLAY ENGINE (REFACTORED FRAMEWORK)
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".editorial-card-wrapper");

    const getDirection = (e, item) => {
        const w = item.offsetWidth;
        const h = item.offsetHeight;
        const x = (e.clientX - item.getBoundingClientRect().left - (w / 2)) * (w > h ? (h / w) : 1);
        const y = (e.clientY - item.getBoundingClientRect().top - (h / 2)) * (h > w ? (w / h) : 1);
        return Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
    };

    cards.forEach(card => {
        // Exit Trigger: Instantly remove standard hover state flags
        card.addEventListener("mouseleave", () => {
            card.classList.remove("hovered");
        });

        // Entry Trigger: Perform vector math logic loop on card intersection boundary
        card.addEventListener("mouseenter", (e) => {
            // Reset previous positional flags to prevent overlap conflicts
            card.classList.remove("card-enter-top", "card-enter-right", "card-enter-bottom", "card-enter-left");
            
            const direction = getDirection(e, card);
            
            // Map geometric integer coordinate value profile to named CSS class mappings
            switch(direction) {
                case 0: card.classList.add("card-enter-top"); break;
                case 1: card.classList.add("card-enter-right"); break;
                case 2: card.classList.add("card-enter-bottom"); break;
                case 3: card.classList.add("card-enter-left"); break;
            }

            // Force browser repaint calculation cycle to finalize CSS position resets before activation
            void card.offsetWidth;

            // Activate standard hover state flag trigger loop sequence
            card.classList.add("hovered");
        });
    });
});