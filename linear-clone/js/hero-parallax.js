/**
 * js/hero-parallax.js
 * High-Performance Smooth Scrolling Parallax Hook
 * * WHY: Traditional scroll event monitoring causes lag because it triggers 
 * calculations faster than the monitor can draw frames. We use requestAnimationFrame 
 * to align calculations perfectly with your screen refresh rate.
 */

// Target the wrapper div element we want to move
const parallaxTarget = document.getElementById('parallax-target');

// Simple tracking state container object
let lastScrollY = 0;
let ticking = false;

function updateParallaxPosition(scrollY) {
  // Multiply the scroll distance by an intensity modifier ratio (0.08)
  // Higher numbers make the parallax travel faster, lower numbers make it subtle.
  const yOffset = scrollY * 0.08;
  
  // Use translate3d instead of translateY. 
  // WHY: translate3d prompts hardware acceleration on the system GPU natively.
  parallaxTarget.style.transform = `translate3d(0, -${yOffset}px, 0)`;
  
  // Mark execution complete so subsequent frames can lock down animation space
  ticking = false;
}

window.addEventListener('scroll', () => {
  lastScrollY = window.scrollY;

  // Verify whether an animation sequence is currently pending run
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateParallaxPosition(lastScrollY);
    });

    ticking = true;
  }
});