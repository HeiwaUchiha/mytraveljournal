export function setupAuthForms() {
    const regCon = document.querySelector(".reg-container");
    const regBtn = document.querySelector(".register-btn");
    const logBtn = document.querySelector(".login-btn");

    if (!regCon) return;
  
    const urlParams = new URLSearchParams(window.location.search);
    const formType = urlParams.get("form");
  
  
    regBtn?.addEventListener("click", () => {
      regCon.classList.add("active");
      history.replaceState(null, "", "?form=register");
      document.title = "my travel journal | Sign-in";
    });
  
    logBtn?.addEventListener("click", () => {
      regCon.classList.remove("active");
      history.replaceState(null, "", "?form=login");
      document.title = "my travel journal | Login";
    });    
    
    if (formType === "register") {
      regCon.classList.add("active", "no-animation");
      document.title = "my travel journal | Sign-in"
    } else if (formType === "login") {
      regCon.classList.remove("active");
      regCon.classList.add("no-animation");
      document.title = "my travel journal | Login"
    }
    setTimeout(() => regCon.classList.remove("no-animation"), 50);
    document.querySelectorAll(".toggle-pass").forEach(icon => {
      icon.addEventListener("click", () => {
        const input = icon.previousElementSibling;
        if (input.type === "password") {
          input.type = "text";
          icon.textContent = "visibility_off";
        } else {
          input.type = "password";
          icon.textContent = "visibility";
        }
      });
    });
  
    const regForm = document.querySelector("#register form");
    const loginForm = document.querySelector("#login form");
  
    [regForm, loginForm].forEach(form => {
      if (!form) console.log("NO FORM");
  
      form.addEventListener("submit", (e) => {
        e.preventDefault();
  
        const formType = form.closest(".form-box").id;
        const inputs = form.querySelectorAll("input");
        const errorMessage = form.querySelector(".error");
        let errors = [];
  
        inputs.forEach(input => input.parentElement.classList.remove("incorrect"));
  
        const username = form.querySelector("#user-input");
        const password = form.querySelector("#pass-input");
  
        if (!username.value.trim()) {
          errors.push("Username is required");
          username.parentElement.classList.add("incorrect");
        }
  
        if (!password.value.trim()) {
          errors.push("Password is required");
          password.parentElement.classList.add("incorrect");
        }
  
        if (formType === "register") {
          const email = form.querySelector("#email-input");
          const confirm = form.querySelector("#confirm-pass");
  
          if (!email.value.trim()) {
            errors.push("Email is required");
            email.parentElement.classList.add("incorrect");
          } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
            errors.push("Enter a valid email address");
            email.parentElement.classList.add("incorrect");
          }
  
          if (password.value.length < 8) {
            errors.push("Password must be at least 8 characters");
            password.parentElement.classList.add("incorrect");
          }
  
          if (password.value !== confirm.value) {
            errors.push("Passwords do not match");
            confirm.parentElement.classList.add("incorrect");
          }
        }
  
        if (errors.length > 0) {
          errorMessage.innerHTML = errors.join(". ");
          return;
        }
  
        if (formType === "register") {
          const email = form.querySelector("#email-input").value.trim();
          const userData = { username: username.value.trim(), email, password: password.value, loggedIn: true };
          localStorage.setItem("travelJournalUser", JSON.stringify(userData));
          window.location.href = "journal.html";
        } else {
          const savedData = JSON.parse(localStorage.getItem("travelJournalUser"));
          if (!savedData || savedData.username !== username.value.trim() || savedData.password !== password.value) {
            errorMessage.textContent = "Invalid username or password.";
            username.parentElement.classList.add("incorrect");
            password.parentElement.classList.add("incorrect");
          } else {
            savedData.loggedIn = true;
            localStorage.setItem("travelJournalUser", JSON.stringify(savedData));
            window.location.href = "journal.html";
          }
        }
      }
    );
    });
  }
  