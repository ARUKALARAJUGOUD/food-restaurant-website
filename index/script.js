function filterMenu(category) {
  const items = document.querySelectorAll('.menu-item');
  const buttons = document.querySelectorAll('.menu-filter');
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  items.forEach(item => {
    const cat = item.getAttribute('data-category');
    if (category === 'all' || cat === category) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
  AOS.refresh();
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const fields = ["name", "email", "phone", "subject", "message"];

  function showError(input, message) {
    const error = input.nextElementSibling;
    error.textContent = message;
    error.style.visibility = "visible";
    input.classList.add("invalid");
  }

  function clearError(input) {
    const error = input.nextElementSibling;
    error.textContent = "";
    error.style.visibility = "hidden";
    input.classList.remove("invalid");
  }

  function validateEmail(email) {
    const re = /^\S+@\S+\.\S+$/;
    return re.test(email.toLowerCase());
  }

  function validatePhone(phone) {
    const re = /^\+?[0-9\s\-()]{7,20}$/;
    return re.test(phone);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    fields.forEach((id) => {
      const input = document.getElementById(id);
      const value = input.value.trim();
      clearError(input);

      if (!value) {
        showError(input, `${id.charAt(0).toUpperCase() + id.slice(1)} is required.`);
        isValid = false;
      } else if (id === "email" && !validateEmail(value)) {
        showError(input, "Please enter a valid email address.");
        isValid = false;
      } else if (id === "phone" && !validatePhone(value)) {
        showError(input, "Please enter a valid phone number.");
        isValid = false;
      }
    });

    if (isValid) {
      alert("✅ Your message was sent successfully!");
      form.reset();
    }
  });

  fields.forEach((id) => {
    const input = document.getElementById(id);
    input.addEventListener("input", () => {
      if (input.classList.contains("invalid")) {
        clearError(input);
      }
    });
  });
  const totalSpan = document.getElementById('total');
  const finalAmount = localStorage.getItem('finalAmount') || "0.00";
  totalSpan.textContent = finalAmount;
  localStorage.removeItem("finalAmount")
}
);

// toggle the menu bar 
  function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("show");
  }
//  active effect 

 // Handle manual click active effect
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  const sections = document.querySelectorAll("section[id]"); // all target sections
  const navItems = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navItems.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });

// add to cart food items 
let searchTimeout;

function debouncedSearch() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(searchFood, 500); // delay 500ms
}

async function searchFood() {
  const input = document.getElementById("searchInput").value.trim();
  const container = document.getElementById("searchResults");

  if (!input) {
    container.innerHTML = "";
    return;
  }

  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`);
  const data = await res.json();

  container.innerHTML = "";

  if (!data.meals) {
    container.innerHTML = "<p style='padding:10px'>No results found.</p>";
    return;
  }

  data.meals.slice(0, 5).forEach(meal => {
    const item = document.createElement("div");
    item.className = "result-item";
    item.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="result-details">
        <h4>${meal.strMeal}</h4>
        <p>${meal.strCategory} | ${meal.strArea}</p>
      </div>
      <button onclick='addToCartFromSearch("${meal.strMeal}", "${meal.strMealThumb}", 149)'>Add</button>
    `;
    container.appendChild(item);
  });
}
// for preload animation while loading the page

  window.addEventListener("load", function () {
    // Delay in milliseconds (e.g., 3000ms = 3 seconds)
    const delay = 1500;

     setTimeout(() => {
      const preloader = document.getElementById("preloader");
      preloader.style.opacity = "0";
      preloader.style.pointerEvents = "none";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500); // fade out transition
    }, delay);
  });



