
  function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const toggle = document.querySelector('.menu-toggle');
    navLinks.classList.toggle('show');
    toggle.classList.toggle('active');
  }

  function toggleDropdown() {
    const dropdown = document.getElementById('dropdown');
    dropdown.classList.toggle('show');
  }

  // Close nav menu when clicking outside
  window.addEventListener('click', (event) => {
    const navLinks = document.getElementById('navLinks');
    const toggle = document.querySelector('.menu-toggle');
    const dropdown = document.getElementById('dropdown');

    // Close dropdown if clicked outside
    if (!event.target.closest('#dropdown')) {
      dropdown.classList.remove('show');
    }

    // Close nav menu if clicked outside
    if (!event.target.closest('.navbar') && !event.target.closest('.nav-links')) {
      navLinks.classList.remove('show');
      toggle.classList.remove('active');
    }
  });

