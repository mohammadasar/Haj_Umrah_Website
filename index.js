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

// security panel
document.addEventListener("DOMContentLoaded", function () {
  const adminBtn = document.getElementById("adminBtn");
  const securityModal = document.getElementById("securityModal");
  const submitCode = document.getElementById("submitCode");
  const closeModalBtn = document.getElementById("closeModal");
  const securityCodeInput = document.getElementById("securityCode");
  const errorText = document.getElementById("errorText");

  const correctPassword = "1234"; // Change this for security

  // Open Security Modal
  adminBtn.addEventListener("click", function () {
      securityModal.style.display = "flex";
      securityCodeInput.value = ""; // Clear input field
      errorText.innerText = ""; // Clear error message
  });

  // Close Modal
  closeModalBtn.addEventListener("click", function () {
      securityModal.style.display = "none";
  });

  // Check Security Code
  submitCode.addEventListener("click", function () {
      if (securityCodeInput.value === correctPassword) {
          localStorage.setItem("adminLoggedIn", "true"); // Store login state
          window.location.href = "admin.html"; // Redirect to admin panel
      } else {
          errorText.innerText = "Incorrect code! Try again.";
      }
  });
});


// package api connection //for package page code
async function fetchCards() {
  const response = await fetch('http://localhost:8080/cards/all');
  const cards = await response.json();
  const cardsList = document.getElementById('cardsList');
  cardsList.innerHTML = '';

  cards.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('col-12','col-md-3', 'mb-3');
      cardElement.innerHTML = `
          <div class="card p-3">
              <img src="${card.image}" class="card-img-top" alt="Card Image">
              <div class="card-body">
                  <h5 class="card-title" >${card.title1}</h5>
                  <p class="card-text">${card.title2}</p>
                  <p class="card-text">${card.title3}</p>
                  <p class="card-text">${card.title4}</p>
                  <p class="card-text">${card.title5}</p>
              </div>
          </div>
      `;
      cardsList.appendChild(cardElement);
  });
}

fetchCards();