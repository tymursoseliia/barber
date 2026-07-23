/* ==========================================================================
   STATUS MEMBER'S CLUB - PERFECTED CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll background effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Navigation Hamburger Toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navLinks = id = document.getElementById('navLinks');

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    // Close menu when clicking link
    document.querySelectorAll('.nav-item-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }

  // 3. Service Matrix Filter Pills
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

  // 4. Certificate Value Selector Chips
  const certChips = document.querySelectorAll('.chip-btn');
  const certDisplayPrice = document.getElementById('certDisplayPrice');

  certChips.forEach(chip => {
    chip.addEventListener('click', () => {
      certChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const val = chip.getAttribute('data-val');
      if (certDisplayPrice) {
        certDisplayPrice.textContent = val + ' ₴';
      }
    });
  });

  // 5. Modal Booking Drawer Controller
  const modalOverlay = document.getElementById('bookingModal');
  const openModalBtns = document.querySelectorAll('.js-open-booking');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const bookingForm = document.getElementById('bookingForm');
  const modalSuccessMsg = document.getElementById('modalSuccessMsg');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetBarber = btn.getAttribute('data-barber');
      const targetService = btn.getAttribute('data-service');

      if (targetBarber) {
        const barberSelect = document.getElementById('modalBarberSelect');
        if (barberSelect) barberSelect.value = targetBarber;
      }
      if (targetService) {
        const serviceSelect = document.getElementById('modalServiceSelect');
        if (serviceSelect) serviceSelect.value = targetService;
      }

      if (bookingForm) bookingForm.style.display = 'block';
      if (modalSuccessMsg) modalSuccessMsg.style.display = 'none';
      
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('clientName').value;
      const phone = document.getElementById('clientPhone').value;

      if (!name || !phone) {
        alert('Будь ласка, введіть ім\'я та номер телефону');
        return;
      }

      bookingForm.style.display = 'none';
      modalSuccessMsg.style.display = 'block';
    });
  }
});
