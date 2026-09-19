const shotButtons = [...document.querySelectorAll('[data-shot]')];
const shotPanels = [...document.querySelectorAll('[data-shot-panel]')];

function selectShot(name, moveFocus = false) {
  shotPanels.forEach((panel) => {
    panel.hidden = panel.dataset.shotPanel !== name;
  });

  shotButtons.forEach((button) => {
    const selected = button.dataset.shot === name;
    button.setAttribute('aria-selected', String(selected));
    button.tabIndex = selected ? 0 : -1;
    if (selected && moveFocus) button.focus();
  });
}

shotButtons.forEach((button, index) => {
  button.addEventListener('click', () => selectShot(button.dataset.shot));
  button.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();

    let next = index;
    if (event.key === 'ArrowLeft') next = (index - 1 + shotButtons.length) % shotButtons.length;
    if (event.key === 'ArrowRight') next = (index + 1) % shotButtons.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = shotButtons.length - 1;
    selectShot(shotButtons[next].dataset.shot, true);
  });
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
  );
  revealItems.forEach((item) => revealObserver.observe(item));
}

const header = document.querySelector('.site-header');
const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 32);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
