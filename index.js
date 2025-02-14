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
  
  if (!cardsList) {
    console.error("Error: Element with ID 'cardsList' not found.");
    return;
  }

  cardsList.innerHTML = ''; // Clear existing list
  try {
    const response = await fetch('https://haj-umrah-backend.onrender.com/cards/all');
    if (!response.ok) throw new Error('Failed to fetch cards');

    const cards = await response.json();
    console.log("cards=====", cards);
    
    if (cards.length === 0) {
      cardsList.innerHTML = '<p class="text-center text-muted">No packages available.</p>';
      return;
    }

    cards.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('col-md-4', 'mb-3');
       
      // Add AOS animation attributes
      cardElement.setAttribute("data-aos", "fade-up");
      cardElement.setAttribute("data-aos-duration", "1900");
      cardElement.setAttribute("data-aos-easing", "linear");
      
       
      cardElement.innerHTML = `
        <div class="card p-3 shadow-sm">
          <img src="${card.image}" class="card-img-top img-fluid" alt="Package Image">
          <div class="card-body text-start package-cards">
            <h5 class="card-title ">${card.packageName}</h5>
            <div class="d-flex gap-2 mt-3"><i class="fa-solid fa-tag"></i><p class="card-text"> ${card.price}</p></div>
            <div class="d-flex gap-2 mt-3"><i class="fa-solid fa-calendar-days"></i><p class="card-text"> ${card.start}</p></div>
            <div class="d-flex gap-2 mt-3"><i class="fa-solid fa-hotel"></i><p class="card-text"> ${card.hotel}</p></div>
            <div class="d-flex gap-2 mt-3"><i class="fa-solid fa-ticket"></i><p class="card-text"> ${card.ticket}</p></div>
            <div class="d-flex gap-2 mt-3"><i class="fa-solid fa-id-card"></i><p class="card-text"> ${card.visa}</p></div>
            <div class="d-flex gap-2 mt-3"><i class="fa-solid fa-bus"></i><p class="card-text"> ${card.transport}</p></div>
            <div class="d-flex gap-2 mt-3"><i class="fa-solid fa-utensils"></i><p class="card-text"> ${card.meals}</p></div>
            <div class="d-flex gap-2 mt-3"><i class="fa-solid fa-kaaba"></i><p class="card-text">${card.ziyarathTour}</p></div>
            <div class="d-flex gap-2 mt-3"><i class="fa-solid fa-person-walking "></i><p class="card-text"> ${card.guide}</p></div>
            <div class="d-flex gap-2 mt-3"><i class="fa-solid fa-suitcase"></i><p class="card-text"> ${card.kit}</p></div>
            <div class="d-flex gap-2 mt-3"><i class="fa-solid fa-hands-helping"></i><p class="card-text"> ${card.assist}</p></div>
          </div>
          <div class="text-center mt-5 mb-4">
              <a href="#" class="card-btn">CONTACT <i class="bi bi-chevron-right"></i></a>
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

document.addEventListener("DOMContentLoaded", () => {
  fetchCards();
});



// videos - getting methods
const baseUrl = "https://haj-umrah-backend.onrender.com/api/videos";

async function fetchVideos() {
  try {
    const response = await fetch(`${baseUrl}/get`);
    if (!response.ok) throw new Error(`Error: ${response.status}`);

    const videos = await response.json();
    const videoGrid = document.getElementById("videoGrid");
    videoGrid.innerHTML = "";

    videos.forEach(video => {
      const colDiv = document.createElement("div");
      colDiv.classList.add("col-md-4", "col-12", "mb-3"); // 4-column on medium, full width on small
      
        // Add AOS animation attributes
        colDiv.setAttribute("data-aos", "fade-up");
        colDiv.setAttribute("data-aos-duration", "1200");
        colDiv.setAttribute("data-aos-easing", "linear");
        

      colDiv.innerHTML = `
        <div class="card p-2 shadow-sm">
          <video onclick="playFullscreen('https://haj-umrah-backend.onrender.com/${video.url}')" controls style="width: 100%;">
            <source src="https://haj-umrah-backend.onrender.com/${video.url}" type="video/mp4">
          </video>
         
        </div>
      `;
      
      videoGrid.appendChild(colDiv);
    });
  } catch (error) {
    console.error("Error fetching videos:", error);
  }
}

// Fetch videos when page loads
document.addEventListener("DOMContentLoaded", fetchVideos);

document.addEventListener("DOMContentLoaded", function() {
  const API_URL = 'https://haj-umrah-backend.onrender.com/api/images'; // Your Spring Boot API endpoint
  const imageContainer = document.getElementById('imageContainer');

  // Function to load all images from the backend
  function loadImages() {
    fetch(`${API_URL}/all`)
      .then(response => response.json())
      .then(images => {
        console.log(images); // Check the response from the backend
        imageContainer.innerHTML = ''; // Clear previous images
        images.forEach(image => {
          console.log("image---------", image); // Debugging image

          const imgDiv = document.createElement('div');
          imgDiv.classList.add('image-container', 'col-md-4', 'col-12');

          // Add AOS attributes to the image container
          imgDiv.setAttribute('data-aos', 'fade-up'); // AOS fade-up animation
          imgDiv.setAttribute('data-aos-duration', '1200'); // Duration of 1200ms
          imgDiv.setAttribute('data-aos-easing', 'linear'); // Easing function for smooth animation

          const img = document.createElement('img');
          img.src = image.imageUrl;
          img.alt = 'Uploaded Image';
          img.classList.add('image');

          

          imgDiv.appendChild(img);
      

          imageContainer.appendChild(imgDiv);
        });
      })
      .catch(err => console.log('Error loading images:', err));
  }

  // Load images initially
  loadImages();
});
