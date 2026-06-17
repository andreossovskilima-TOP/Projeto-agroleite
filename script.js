// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
let menuOpen = false;
menuToggle.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileNav.classList.toggle('open', menuOpen);
});
mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileNav.classList.remove('open');
  });
});

// Hero carousel
const slides = [
  {
    tag: 'Excelência no Campo',
    title: 'Soluções Completas para\nPecuária Leiteira',
    desc: 'Tecnologia, nutrição e manejo integrados para maximizar a produtividade do seu rebanho com qualidade e sustentabilidade.',
  },
  {
    tag: 'Tradição & Inovação',
    title: 'Cuidando do Seu\nRebanho com Dedicação',
    desc: 'Mais de 20 anos de experiência transformando a pecuária leiteira brasileira com as melhores práticas do mercado.',
  },
];
let currentSlide = 0;
const heroText = document.getElementById('heroText');
const dots = document.querySelectorAll('.hero-dot');

function showSlide(index) {
  currentSlide = index;
  document.querySelectorAll('.hero-slide').forEach((s, i) => s.classList.toggle('active', i === index));
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
  // Update text
  const slide = slides[index];
  heroText.querySelector('.hero-tag').textContent = slide.tag;
  heroText.querySelector('h1').innerHTML = slide.title.replace('\n', '<br>');
  heroText.querySelector('p').textContent = slide.desc;
}

document.getElementById('prevSlide').addEventListener('click', () => {
  showSlide((currentSlide - 1 + slides.length) % slides.length);
});
document.getElementById('nextSlide').addEventListener('click', () => {
  showSlide((currentSlide + 1) % slides.length);
});
dots.forEach(dot => {
  dot.addEventListener('click', () => showSlide(parseInt(dot.dataset.index)));
});

// Auto-advance slides
setInterval(() => {
  showSlide((currentSlide + 1) % slides.length);
}, 7000);

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15, rootMargin: '-40px' });
reveals.forEach(el => observer.observe(el));

// Contact form
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const toast = document.getElementById('toast');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Mensagem Enviada!';
  submitBtn.classList.add('success');
  form.reset();
  // Show toast
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
  setTimeout(() => {
    submitBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> Enviar Mensagem';
    submitBtn.classList.remove('success');
  }, 3000);
});
