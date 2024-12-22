function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  const toggle = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('.navbar');

  navLinks.classList.toggle('show');
  toggle.classList.toggle('active');

  // Toggle navbar position
  navbar.classList.toggle('fixed');

}


function toggleDropdown() {
  const dropdown = document.getElementById('dropdown');
  const navLinks = document.getElementById('navLinks');
  
  // Toggle the dropdown visibility
  dropdown.classList.toggle('show');
  
   // Adjust navLinks height to 100vh when dropdown is shown
   if (dropdown.classList.contains('show')) {
    navLinks.style.height = "auto";  // Reset height when dropdown is closed
  } else {
    navLinks.style.height = "100vh"; // Set to full viewport height
  }
}
