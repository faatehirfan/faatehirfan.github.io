/**
 * Portfolio Interaction Engine
 * Handles floating navbar scroll-spy, mobile drawer,
 * and Homepage glass widget slider.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Floating Navbar Active State & Scroll Spy
  const navLinks = document.querySelectorAll('.nav-links .nav-item');
  const trackedSections = document.querySelectorAll('section[id]');

  function setActiveNav(sectionId) {
    navLinks.forEach((link) => {
      const isMatch = link.getAttribute('href') === `#${sectionId}`;
      link.classList.toggle('active', isMatch);
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const href = link.getAttribute('href') || '';
      if (href.startsWith('#')) {
        setActiveNav(href.slice(1));
      }
    });
  });

  function onScrollSpy() {
    const scrollPos = window.scrollY + 180;
    let currentId = 'home';

    trackedSections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.id;
      }
    });

    // Ensure bottom of page highlights Contact
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24) {
      currentId = 'contact';
    }

    setActiveNav(currentId);
  }

  window.addEventListener('scroll', onScrollSpy, { passive: true });
  onScrollSpy();

  // 3. Mobile Drawer Navigation
  const menuBtn = document.getElementById('menuBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.mobile-nav-links a');

  function setDrawerOpen(isOpen) {
    if (!mobileDrawer) return;
    mobileDrawer.classList.toggle('open', isOpen);
    mobileDrawer.setAttribute('aria-hidden', String(!isOpen));
    if (menuBtn) menuBtn.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (menuBtn && mobileDrawer) {
    menuBtn.addEventListener('click', () => setDrawerOpen(true));
    if (closeDrawerBtn) {
      closeDrawerBtn.addEventListener('click', () => setDrawerOpen(false));
    }
    drawerLinks.forEach((link) => {
      link.addEventListener('click', () => setDrawerOpen(false));
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        setDrawerOpen(false);
      }
    });
  }

  // 4. Homepage Floating Glass Widget Slider
  const prevSlideBtn = document.getElementById('heroPrevBtn');
  const nextSlideBtn = document.getElementById('heroNextBtn');
  const heroSliderThumb = document.getElementById('heroSliderThumb');
  const heroWidgetNum = document.getElementById('heroWidgetNum');
  const heroWidgetTag = document.getElementById('heroWidgetTag');
  const heroWidgetTitle = document.getElementById('heroWidgetTitle');
  const heroWidgetDesc = document.getElementById('heroWidgetDesc');

  const heroSlides = [
    {
      num: '01',
      tag: 'Web',
      title: 'Full-Stack Web.',
      desc: 'Laravel MVC, MySQL & Tailwind CSS.',
      pos: '0%'
    },
    {
      num: '02',
      tag: 'Mobile',
      title: 'Cross-Platform Apps.',
      desc: 'Flutter, Dart & Firebase Firestore.',
      pos: '33.33%'
    },
    {
      num: '03',
      tag: 'Systems',
      title: 'Clean Architecture.',
      desc: 'Relational DBs, RBAC & CCNA Networks.',
      pos: '66.66%'
    }
  ];

  let currentHeroSlide = 0;

  function updateHeroSlide(idx) {
    currentHeroSlide = (idx + heroSlides.length) % heroSlides.length;
    const slide = heroSlides[currentHeroSlide];
    if (heroWidgetNum) heroWidgetNum.textContent = slide.num;
    if (heroWidgetTag) heroWidgetTag.textContent = slide.tag;
    if (heroWidgetTitle) heroWidgetTitle.textContent = slide.title;
    if (heroWidgetDesc) heroWidgetDesc.textContent = slide.desc;
    if (heroSliderThumb) heroSliderThumb.style.left = slide.pos;
  }

  if (prevSlideBtn && nextSlideBtn) {
    prevSlideBtn.addEventListener('click', () => updateHeroSlide(currentHeroSlide - 1));
    nextSlideBtn.addEventListener('click', () => updateHeroSlide(currentHeroSlide + 1));
  }
});
