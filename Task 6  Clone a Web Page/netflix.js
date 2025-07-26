// Get DOM elements
const emailInput = document.getElementById("emailInput");
const errorMsg = document.getElementById("errorMsg");
const yearSpan = document.getElementById("year");

// Email submit function
function submitEmail() {
  const email = emailInput.value.trim();

  if (email === "") {
    errorMsg.textContent = "Please enter your email address.";
  } else if (!validateEmail(email)) {
    errorMsg.textContent = "Please enter a valid email address.";
  } else {
    errorMsg.style.color = "#0f0";
    errorMsg.textContent = "Success! Redirecting...";
    // Simulate redirection
    setTimeout(() => {
      alert("Welcome to Netflix Clone!");
      emailInput.value = "";
      errorMsg.textContent = "";
      errorMsg.style.color = "#ff4e4e";
    }, 1500);
  }
}

// Email validation helper
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Footer Year Auto Update
yearSpan.textContent = new Date().getFullYear();
