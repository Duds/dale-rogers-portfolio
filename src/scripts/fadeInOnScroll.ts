/**
 * fadeInOnScroll - Utility to animate elements with fade-in-up effect as they scroll into view.
 *
 * Usage:
 *   import { fadeInOnScroll } from '@/scripts/fadeInOnScroll';
 *   fadeInOnScroll();
 *
 * By default, targets elements with [data-fade].
 * Adds 'visible' class when in view, with staggered delay.
 */
export function fadeInOnScroll(selector = "[data-fade]") {
  if (typeof window === "undefined") return;
  const elements = document.querySelectorAll(selector);
  const observer = new window.IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  elements.forEach((el, i) => {
    // Add staggered delay
    (el as HTMLElement).style.transitionDelay = `${i * 80}ms`;
    observer.observe(el);
  });
}
