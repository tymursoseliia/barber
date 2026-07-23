/* ==========================================================================
   STATUS BARBER CLUB - INTERACTIVE JAVASCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.style.display === 'flex';
      navMenu.style.display = isOpen ? 'none' : 'flex';
      if (!isOpen) {
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = 'rgba(8,9,11,0.98)';
        navMenu.style.padding = '2rem';
        navMenu.style.borderBottom = '1px solid var(--border-light)';
      }
    });
  }

  // 3. Price Filter Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const priceRows = document.querySelectorAll('.price-table tr[data-category]');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-tab');
      priceRows.forEach(row => {
        if (cat === 'all' || row.getAttribute('data-category') === cat) {
          row.style.display = 'table-row';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  // 4. Gift Certificate Nominal Selection
  const nominalChips = document.querySelectorAll('.nominal-chip');
  const certNominalInput = document.getElementById('certNominalInput');
  const certPriceDisplay = document.getElementById('certPriceDisplay');

  nominalChips.forEach(chip => {
    chip.addEventListener('click', () => {
      nominalChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const val = chip.getAttribute('data-value');
      if (certPriceDisplay) {
        certPriceDisplay.textContent = val + ' ₴';
      }
      if (certNominalInput) {
        certNominalInput.value = val;
      }
    });
  });

  // 5. Booking Modal Logic
  const modalBackdrop = document.getElementById('bookingModal');
  const openModalBtns = document.querySelectorAll('.js-open-booking');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const bookingForm = document.getElementById('bookingForm');
  const modalSuccessMsg = document.getElementById('modalSuccessMsg');

  // Step Navigation
  let currentStep = 1;
  const step1 = document.getElementById('bookingStep1');
  const step2 = document.getElementById('bookingStep2');
  const nextStepBtn = document.getElementById('nextStepBtn');
  const prevStepBtn = document.getElementById('prevStepBtn');
  const submitBookingBtn = document.getElementById('submitBookingBtn');
  const stepNodes = document.querySelectorAll('.step-node');

  function updateSteps() {
    if (currentStep === 1) {
      step1.style.display = 'block';
      step2.style.display = 'none';
      prevStepBtn.style.display = 'none';
      nextStepBtn.style.display = 'inline-flex';
      submitBookingBtn.style.display = 'none';
      stepNodes[0].classList.add('active');
      stepNodes[1].classList.remove('active');
    } else {
      step1.style.display = 'none';
      step2.style.display = 'block';
      prevStepBtn.style.display = 'inline-flex';
      nextStepBtn.style.display = 'none';
      submitBookingBtn.style.display = 'inline-flex';
      stepNodes[0].classList.add('active');
      stepNodes[1].classList.add('active');
    }
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const barberName = btn.getAttribute('data-barber');
      const serviceName = btn.getAttribute('data-service');
      
      if (barberName) {
        const barberSelect = document.getElementById('modalBarberSelect');
        if (barberSelect) barberSelect.value = barberName;
      }
      if (serviceName) {
        const serviceSelect = document.getElementById('modalServiceSelect');
        if (serviceSelect) serviceSelect.value = serviceName;
      }

      currentStep = 1;
      updateSteps();
      modalSuccessMsg.style.display = 'none';
      bookingForm.style.display = 'block';
      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });

  if (nextStepBtn) {
    nextStepBtn.addEventListener('click', () => {
      currentStep = 2;
      updateSteps();
    });
  }

  if (prevStepBtn) {
    prevStepBtn.addEventListener('click', () => {
      currentStep = 1;
      updateSteps();
    });
  }

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('clientName').value;
      const phone = document.getElementById('clientPhone').value;

      if (!name || !phone) {
        alert('Будь ласка, заповніть ім\'я та номер телефону');
        return;
      }

      // Simulate success notification
      bookingForm.style.display = 'none';
      modalSuccessMsg.style.display = 'block';
    });
  }
});
