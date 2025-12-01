
const navToggle = document.getElementById('navThemeToggle');
const root = document.documentElement;
const saved = localStorage.getItem('gem_theme');
if (saved === 'dark') {
  root.classList.add('dark-theme');
  if (navToggle) navToggle.checked = true;
}
if (navToggle) {
  navToggle.addEventListener('change', () => {
    if (navToggle.checked) {
      root.classList.add('dark-theme');
      localStorage.setItem('gem_theme', 'dark');
    } else {
      root.classList.remove('dark-theme');
      localStorage.setItem('gem_theme', 'light');
    }
  })
}

(function () {
  const slidesEl = document.getElementById('slides');
  const slides = slidesEl ? slidesEl.children : [];
  const dotsContainer = document.getElementById('dots');
  const prev = document.getElementById('prev');
  const next = document.getElementById('next');
  let idx = 0; let timer = null;
  if (!slidesEl) return;

  function go(i) {
    idx = (i + slides.length) % slides.length;
    slidesEl.style.transform = `translateX(-${idx * 100}%)`;
    updateDots();
  }
  function updateDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < slides.length; i++) {
      const d = document.createElement('div');
      d.className = 'dot' + (i === idx ? ' active' : '');
      d.addEventListener('click', () => { go(i); reset(); });
      dotsContainer.appendChild(d);
    }
  }
  function nextSlide() { go(idx + 1); }
  function prevSlide() { go(idx - 1); }
  function reset() { clearInterval(timer); timer = setInterval(nextSlide, 4000); }

  if (next) next.addEventListener('click', () => { nextSlide(); reset(); });
  if (prev) prev.addEventListener('click', () => { prevSlide(); reset(); });

  updateDots();
  reset();
})();

document.getElementById('year').textContent = new Date().getFullYear();

const msg = "Hello, I am interested in Brand Approval service.";
const phone = "80076 97020";
document.getElementById("waBtn").href =`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

