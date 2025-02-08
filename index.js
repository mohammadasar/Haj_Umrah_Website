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
    navLinks.style.height = "100vh";  // Reset height when dropdown is closed
  } else {
    navLinks.style.height = "100vh"; // Set to full viewport height
  }
}


// security panel
document.addEventListener("DOMContentLoaded", function () {
  const adminButtons = document.querySelectorAll(".adminBtn"); // Select all admin buttons
  const securityModal = document.getElementById("securityModal");
  const submitCode = document.getElementById("submitCode");
  const closeModal = document.getElementById("closeModal");
  const securityCodeInput = document.getElementById("securityCode");
  const errorText = document.getElementById("errorText");
  const togglePassword = document.getElementById("togglePassword");

  // Open modal on admin button click (for both desktop & mobile)
  adminButtons.forEach(button => {
      button.addEventListener("click", function (event) {
          event.preventDefault(); // Prevent default link behavior
          securityModal.style.display = "block"; // Show modal
      });
  });

  // Close modal
  closeModal.addEventListener("click", function () {
      securityModal.style.display = "none";
  });

  // Toggle password visibility
  togglePassword.addEventListener("click", function () {
      if (securityCodeInput.type === "password") {
          securityCodeInput.type = "text";
          this.innerText = "👁"; // Change icon to open eye
      } else {
          securityCodeInput.type = "password";
          this.innerText = "🙈"; // Change icon to closed eye
      }
  });

  // Validate security code
  submitCode.addEventListener("click", function () {
      const enteredCode = securityCodeInput.value;
      const correctCode = "1234"; // Change this to your actual security code

      if (enteredCode === correctCode) {
          window.location.href = "admin.html"; // Redirect to admin panel
      } else {
          errorText.innerText = "Invalid security code!";
          errorText.style.color = "red";
      }
  });
});





// package api connection //for package page code
async function fetchCards() {
  const cardsList = document.getElementById('cardsList');
  cardsList.innerHTML = ''; // Clear the existing list

  try {
    const response = await fetch('http://localhost:8080/cards/all');
    
    if (!response.ok) {
      throw new Error('Failed to fetch cards');
    }

    const cards = await response.json();
    
    if (cards.length === 0) {
      cardsList.innerHTML = '<p class="text-center text-muted">No packages available.</p>';
      return;
    }

    // Loop through the cards and create card elements
    cards.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('col-md-4', 'mb-3');

      cardElement.innerHTML = `
        <div class="card p-3 shadow-sm">
          <img src="${card.image}" class="card-img-top img-fluid" alt="Package Image">
          <div class="card-body text-center">
            <h5 class="card-title">${card.packageName}</h5>
            <p class="card-text"><strong>Hotel:</strong> ${card.hotel}</p>
            <p class="card-text"><strong>Ticket:</strong> ${card.ticket}</p>
            <p class="card-text"><strong>Transport:</strong> ${card.transport}</p>
            <p class="card-text"><strong>Meals:</strong> ${card.meals}</p>
            <p class="card-text"><strong>Ziyarath Tour:</strong> ${card.ziyarathTour}</p>
            <p class="card-text"><strong>Guide:</strong> ${card.guide}</p>
            <p class="card-text"><strong>Kit:</strong> ${card.kit}</p>
            <p class="card-text"><strong>Assist:</strong> ${card.assist}</p>
            <p class="card-text"><strong>Date:</strong> ${card.date}</p>
            <p class="card-text"><strong>Visa:</strong> ${card.visa}</p>
            <p class="card-text"><strong>Price:</strong> $${card.price.toFixed(2)}</p>
          </div>
        </div>
      `;
      cardsList.appendChild(cardElement);
    });
  } catch (error) {
    console.error('Error fetching cards:', error);
    cardsList.innerHTML = '<p class="text-danger text-center">Failed to load packages. Please try again later.</p>';
  }
}

// Call the function to load cards when the page is ready
fetchCards();
