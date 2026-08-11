/* ==========================================================================
   STATUS MEMBER'S CLUB - CONTROLLER & LINK INTEGRATION
   ========================================================================== */

const ALTEGIO_CRM_URL = 'https://status.altegio.me/company/1367028/personal/menu?utm_source=ig&utm_medium=social&utm_content=link_in_bio&o=';
const TELEGRAM_BOT_URL = 'https://t.me/STATUSua_bot';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Toast Notification Helper
  const toastContainer = document.getElementById('toastNotification');
  const toastMessage = toastContainer ? toastContainer.querySelector('.toast-message') : null;
  let toastTimer = null;

  function showToast(msg) {
    if (!toastContainer || !toastMessage) return;
    toastMessage.textContent = msg;
    toastContainer.classList.add('show');
    
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastContainer.classList.remove('show');
    }, 3500);
  }

  // 2. Header Scroll Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Mobile Navigation Hamburger Toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    document.querySelectorAll('.nav-item-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  // 4. Phone Badge Interaction
  const phoneBadges = document.querySelectorAll('.phone-badge');
  phoneBadges.forEach(badge => {
    badge.addEventListener('click', () => {
      showToast('📞 Набір номера: +38 (073) 333-11-00 (STATUS)');
    });
  });

  // 5. Service Matrix Filter Pills
  const filterPills = document.querySelectorAll('.tab-pill');
  const matrixRows = document.querySelectorAll('.matrix-table tr[data-category]');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');
      matrixRows.forEach(row => {
        if (filter === 'all' || row.getAttribute('data-category') === filter) {
          row.style.display = 'table-row';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  // 6. Certificate Value Selector Chips & Custom Amount Controller
  const certChips = document.querySelectorAll('.chip-btn');
  const certDisplayPrice = document.getElementById('certDisplayPrice');
  const customAmountWrapper = document.getElementById('customAmountWrapper');
  const customCertInput = document.getElementById('customCertInput');

  function updateCertPriceDisplay(val) {
    if (!certDisplayPrice) return;
    if (val === 'custom') {
      const numVal = customCertInput ? parseInt(customCertInput.value, 10) : 0;
      if (numVal && numVal >= 1000) {
        certDisplayPrice.textContent = numVal + ' ₴';
      } else {
        certDisplayPrice.textContent = 'від 1000 ₴';
      }
    } else {
      certDisplayPrice.textContent = val + ' ₴';
    }
  }

  certChips.forEach(chip => {
    chip.addEventListener('click', () => {
      certChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const val = chip.getAttribute('data-val');

      if (val === 'custom') {
        if (customAmountWrapper) customAmountWrapper.style.display = 'block';
        if (customCertInput) customCertInput.focus();
        updateCertPriceDisplay('custom');
      } else {
        if (customAmountWrapper) customAmountWrapper.style.display = 'none';
        updateCertPriceDisplay(val);
      }
    });
  });

  if (customCertInput) {
    customCertInput.addEventListener('input', () => {
      const activeChip = document.querySelector('.chip-btn.active');
      if (activeChip && activeChip.getAttribute('data-val') === 'custom') {
        updateCertPriceDisplay('custom');
      }
    });

    customCertInput.addEventListener('blur', () => {
      const val = parseInt(customCertInput.value, 10);
      if (!val || val < 1000) {
        customCertInput.value = 1000;
        updateCertPriceDisplay('custom');
      }
    });
  }

  // 7. Modal Booking Drawer Controller
  const modalOverlay = document.getElementById('bookingModal');
  const openModalBtns = document.querySelectorAll('.js-open-booking');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const bookingForm = document.getElementById('bookingForm');
  const modalSuccessMsg = document.getElementById('modalSuccessMsg');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (bookingForm) bookingForm.style.display = 'block';
      if (modalSuccessMsg) modalSuccessMsg.style.display = 'none';
      
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('clientName').value;
      const phone = document.getElementById('clientPhone').value;

      if (!name || !phone) {
        showToast('⚠️ Будь ласка, введіть ім\'я та номер телефону');
        return;
      }

      bookingForm.style.display = 'none';
      if (modalSuccessMsg) modalSuccessMsg.style.display = 'block';
      showToast('🎉 Запит отримано! Адміністратор зателефонує вам.');
    });
  }

  // 8. Link Click Toast Feedback
  document.querySelectorAll('a[href*="altegio.me"]').forEach(link => {
    link.addEventListener('click', () => {
      showToast('⚡ Перехід до CRM-системи онлайн-запису Altegio...');
    });
  });

  document.querySelectorAll('a[href*="t.me"]').forEach(link => {
    link.addEventListener('click', () => {
      showToast('🤖 Перехід до Telegram Bot STATUS (@STATUSua_bot)...');
    });
  });

  // 9. Table Horizontal Scroll Peek Animation Hint for Mobile/Tablet
  const priceMatrix = document.querySelector('.price-card-matrix');
  const scrollHintBar = document.getElementById('scrollHintBar');
  let hasPeeked = false;

  if (priceMatrix) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasPeeked) {
          hasPeeked = true;
          
          // Only trigger horizontal peek if table is scrollable
          if (priceMatrix.scrollWidth > priceMatrix.clientWidth) {
            setTimeout(() => {
              priceMatrix.scrollTo({ left: 115, behavior: 'smooth' });
              setTimeout(() => {
                priceMatrix.scrollTo({ left: 0, behavior: 'smooth' });
              }, 800);
            }, 400);
          }
        }
      });
    }, { threshold: 0.25 });

    observer.observe(priceMatrix);

    priceMatrix.addEventListener('scroll', () => {
      if (priceMatrix.scrollLeft > 20 && scrollHintBar) {
        scrollHintBar.style.opacity = '0.35';
      } else if (scrollHintBar) {
        scrollHintBar.style.opacity = '1';
      }
    });
  }
});
