// Toggle password visibility
function togglePasswordVisibility(inputId, button) {
    const input = document.getElementById(inputId)
    if (input.type === "password") {
      input.type = "text"
      button.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
              </svg>
          `
    } else {
      input.type = "password"
      button.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
              </svg>
          `
    }
  }
  
  // Validate email format
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  // Add a message display element to the signup form
  function addErrorMessageElement() {
    // Check if we're on the signup page
    if (!document.getElementById("signup-confirm-password")) return
  
    // Check if error message element already exists
    if (document.getElementById("password-error-message")) return
  
    // Create error message element
    const errorElement = document.createElement("div")
    errorElement.id = "password-error-message"
    errorElement.style.color = "red"
    errorElement.style.fontSize = "0.9rem"
    errorElement.style.marginTop = "0.5rem"
    errorElement.style.display = "none"
    errorElement.textContent = "Passwords do not match!"
  
    // Insert after confirm password field
    const confirmPasswordField = document.getElementById("signup-confirm-password")
    confirmPasswordField.parentNode.appendChild(errorElement)
  }
  
  // Validate password match
  function validatePasswordMatch() {
    const password = document.getElementById("signup-password").value.trim()
    const confirmPassword = document.getElementById("signup-confirm-password").value.trim()
    const errorElement = document.getElementById("password-error-message")
  
    if (!password || !confirmPassword) {
      if (errorElement) errorElement.style.display = "none"
      return false
    }
  
    if (password !== confirmPassword) {
      if (errorElement) errorElement.style.display = "block"
      return false
    } else {
      if (errorElement) errorElement.style.display = "none"
      return true
    }
  }
  
  // Initialize form validation
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded")
  
    // Add error message element to the form
    addErrorMessageElement()
  
    // Get the form element
    const form = document.querySelector(".auth-form")
  
    if (form) {
      console.log("Form found:", form)
  
      // Handle form submission
      form.addEventListener("submit", (e) => {
        console.log("Form submission attempted")
  
        // Check if we're on the signup page
        const isSignupPage = document.getElementById("signup-confirm-password") !== null
        console.log("Is signup page:", isSignupPage)
  
        if (isSignupPage) {
          const password = document.getElementById("signup-password").value.trim()
          const confirmPassword = document.getElementById("signup-confirm-password").value.trim()
          console.log("Password:", password.length > 0 ? "provided" : "empty")
          console.log("Confirm password:", confirmPassword.length > 0 ? "provided" : "empty")
  
          if (password !== confirmPassword) {
            console.log("Passwords don't match!")
            e.preventDefault() // Prevent form submission
  
            // Show error message
            const errorElement = document.getElementById("password-error-message")
            if (errorElement) {
              errorElement.style.display = "block"
            } else {
              alert("Passwords do not match!")
            }
  
            return false
          }
        }
  
        // Email validation
        const emailInput = document.getElementById("signup-email") || document.getElementById("signin-email")
        if (emailInput && !validateEmail(emailInput.value.trim())) {
          e.preventDefault()
          alert("Please enter a valid email address.")
          return false
        }
      })
  
      // Real-time password validation
      const confirmPasswordField = document.getElementById("signup-confirm-password")
      if (confirmPasswordField) {
        confirmPasswordField.addEventListener("input", validatePasswordMatch)
  
        // Also validate when the original password changes
        const passwordField = document.getElementById("signup-password")
        if (passwordField) {
          passwordField.addEventListener("input", () => {
            if (confirmPasswordField.value.trim().length > 0) {
              validatePasswordMatch()
            }
          })
        }
      }
    }
  })
  
  // Handle forgot password form submission
  if (document.getElementById("forgot-password-form")) {
    document.getElementById("forgot-password-form").addEventListener("submit", (e) => {
      e.preventDefault()
      document.getElementById("forgot-password-form").style.display = "none"
      document.getElementById("reset-success").style.display = "block"
    })
  }
  
  // Back to sign in from reset success
  function backToSignIn() {
    window.location.href = "signin.html"
  }
  
  