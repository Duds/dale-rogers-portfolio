function fadeInOnScroll(selector = "[data-fade]") {
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
    { threshold: 0.15 }
  );

  elements.forEach((element, index) => {
    element.style.transitionDelay = `${index * 80}ms`;
    observer.observe(element);
  });
}

export { fadeInOnScroll };
