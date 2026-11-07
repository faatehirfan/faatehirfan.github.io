/**
 * ZENIXA INTERACTION ENGINE
 * Handles dynamic live time, interactive segmented toggles,
 * dashboard sliders, metric dash rotation, and mobile drawer.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Live Timezone Clock (Malaysia Time: MYT UTC+8)
  const timezoneValue = document.getElementById('liveTimezone');

  function updateTimezoneClock() {
    if (!timezoneValue) return;
    const now = new Date();
    
    // Format options for Malaysia timezone
    const timeOptions = {
      timeZone: 'Asia/Kuala_Lumpur',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    
    const dateOptions = {
      timeZone: 'Asia/Kuala_Lumpur',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    };

    const timeStr = new Intl.DateTimeFormat('en-US', timeOptions).format(now);
    const dateStr = new Intl.DateTimeFormat('en-US', dateOptions).format(now);
    
    timezoneValue.textContent = `${timeStr.toLowerCase()} • ${dateStr}`;
  }

  updateTimezoneClock();
  setInterval(updateTimezoneClock, 1000 * 30); // Update every 30s

  // Dynamic Navigation Active Highlight (Click & Scroll Spy)
  const navLinks = document.querySelectorAll('.nav-links .nav-item');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(item => item.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Scroll Spy: automatically update the active link when scrolling
  const trackedSections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPos = window.pageYOffset + 140;

    trackedSections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentSectionId}`) {
          navLinks.forEach(item => item.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }
  }, { passive: true });

  // 2. Mobile Drawer Navigation
  const menuBtn = document.getElementById('menuBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.mobile-nav-links a');

  if (menuBtn && mobileDrawer) {
    menuBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    if (closeDrawerBtn) {
      closeDrawerBtn.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Segmented Toggle in "Choose Your Option" Section
  const toggleOptions = document.querySelectorAll('.segmented-toggle .toggle-option');
  const optionCard1Title = document.getElementById('optionCard1Title');
  const optionCard1Desc = document.getElementById('optionCard1Desc');
  const optionCard1Price = document.getElementById('optionCard1Price');
  const optionCard2Title = document.getElementById('optionCard2Title');
  const optionCard2Desc = document.getElementById('optionCard2Desc');
  const optionCard2Price = document.getElementById('optionCard2Price');

  const optionData = {
    internship: {
      card1: {
        title: 'Full-Stack Internship',
        desc: 'Dedicated placement for web & mobile software development (Laravel, Flutter, MySQL).',
        price: 'Full-Time • Immediate / 2026'
      },
      card2: {
        title: 'Software Engineering Role',
        desc: 'High-impact contributions to enterprise systems, backend architecture, and API integration.',
        price: 'Long-term • Hybrid / On-site'
      }
    },
    freelance: {
      card1: {
        title: 'Single Projects',
        desc: 'Best option for focused small-to-medium web modules, API integrations, or bug audits.',
        price: 'from $500 / Project'
      },
      card2: {
        title: 'Multi-Projects Package',
        desc: 'For complete end-to-end full-stack applications with database design, auth, and dashboards.',
        price: 'from $1,000 / Project'
      }
    }
  };

  toggleOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleOptions.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.mode || 'internship';
      const data = optionData[target];

      if (data && optionCard1Title && optionCard2Title) {
        optionCard1Title.textContent = data.card1.title;
        optionCard1Desc.textContent = data.card1.desc;
        optionCard1Price.textContent = data.card1.price;

        optionCard2Title.textContent = data.card2.title;
        optionCard2Desc.textContent = data.card2.desc;
        optionCard2Price.textContent = data.card2.price;
      }
    });
  });

  // 4. Indicator / Statistics Dash Rotation
  const dashItems = document.querySelectorAll('.dark-widget-dashes .dash-item');
  const metricVal = document.getElementById('indicatorMetricVal');
  const metricLabel = document.getElementById('indicatorMetricLabel');
  const metricSub = document.getElementById('indicatorMetricSub');

  const metricsData = [
    {
      metric: '3.68',
      arrow: '↗',
      label: 'Cumulative CGPA in CS',
      sub: 'Consistent academic distinction with Dean\'s List in 6 consecutive semesters.'
    },
    {
      metric: '89%',
      arrow: '↗',
      label: 'increase in system efficiency',
      sub: 'Optimized Laravel database queries and reactive Flutter UI state.'
    },
    {
      metric: '100%',
      arrow: '✓',
      label: 'on-time project milestones',
      sub: 'Delivered Activity Management System & JomMasjid with zero data collisions.'
    },
    {
      metric: '01',
      arrow: '★',
      label: 'Bronze Award FYP 1',
      sub: 'Recognized for software architecture excellence in Final Year Project.'
    },
    {
      metric: 'CCNA',
      arrow: '⚡',
      label: 'Cisco Certified Networks',
      sub: 'Certified in network routing, switching, IP addressing and cybersecurity basics.'
    },
    {
      metric: '125+',
      arrow: '↗',
      label: 'Git commits & deployments',
      sub: 'Active source code management with clean branching and documentation.'
    }
  ];

  let currentMetricIdx = 0;

  function setMetric(idx) {
    if (idx < 0 || idx >= metricsData.length) return;
    currentMetricIdx = idx;
    
    dashItems.forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });

    const item = metricsData[idx];
    if (metricVal) {
      metricVal.innerHTML = `${item.metric} <span class="metric-arrow">${item.arrow}</span>`;
    }
    if (metricLabel) metricLabel.textContent = item.label;
    if (metricSub) metricSub.textContent = item.sub;
  }

  dashItems.forEach((dash, idx) => {
    dash.addEventListener('click', () => setMetric(idx));
  });

  // Auto rotate stats every 5 seconds
  setInterval(() => {
    currentMetricIdx = (currentMetricIdx + 1) % metricsData.length;
    setMetric(currentMetricIdx);
  }, 5000);

  // 5. Hero Glass Slider Widget Controls
  const prevSlideBtn = document.getElementById('heroPrevBtn');
  const nextSlideBtn = document.getElementById('heroNextBtn');
  const heroSliderThumb = document.getElementById('heroSliderThumb');
  const heroWidgetTitle = document.getElementById('heroWidgetTitle');
  const heroWidgetNum = document.getElementById('heroWidgetNum');

  const heroSlides = [
    { num: '01', title: 'Design to explore.', pos: '20%' },
    { num: '02', title: 'Architect to scale.', pos: '55%' },
    { num: '03', title: 'Deploy to deliver.', pos: '85%' }
  ];

  let currentHeroSlide = 0;

  function updateHeroSlide(idx) {
    currentHeroSlide = (idx + heroSlides.length) % heroSlides.length;
    const slide = heroSlides[currentHeroSlide];
    if (heroWidgetNum) heroWidgetNum.textContent = slide.num;
    if (heroWidgetTitle) heroWidgetTitle.textContent = slide.title;
    if (heroSliderThumb) heroSliderThumb.style.left = slide.pos;
  }

  if (prevSlideBtn && nextSlideBtn) {
    prevSlideBtn.addEventListener('click', () => updateHeroSlide(currentHeroSlide - 1));
    nextSlideBtn.addEventListener('click', () => updateHeroSlide(currentHeroSlide + 1));
  }

  // 6. Interactive 4-Pill Flow Sequence Sound / Click effect
  const interactivePills = document.querySelectorAll('.zen-interactive-pill');
  interactivePills.forEach(pill => {
    pill.addEventListener('click', () => {
      pill.style.transform = 'scale(0.96)';
      setTimeout(() => {
        pill.style.transform = '';
      }, 150);
    });
  });
});
