const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
// const forgetPassword = document.getElementById("forget-password");
// const createAccount = document.getElementById("create-btn");
// const createPage = document.getElementById("create-page");
const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
const passwordReg = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/;
const emailErrorMessage = document.querySelector(".invalid-email");
emailErrorMessage.style.display = "none";
const passwordErrorMessage = document.querySelector(".invalid-password");
passwordErrorMessage.style.display = "none";
const userData = [];

// Add validation to email
emailInput.addEventListener("input", function () {
  let emailValue = emailInput.value.trim();
  if (emailValue === "") {
    return;
  }
  if (emailValue.match(emailReg)) {
    console.log(`this your email${emailValue}`);
    emailErrorMessage.style.display = "none";
    emailErrorMessage.innerHTML = "";
  } else {
    emailErrorMessage.style.display = "block";
    emailErrorMessage.innerHTML = "";
    const invalidEmail = document.createElement("p");
    invalidEmail.innerText = "Please enter a valid email address.";
    emailErrorMessage.appendChild(invalidEmail);
  }
});

// add validation to password: minLength: 6 characters characters must contain special character and numbers
passwordInput.addEventListener("input", function () {
  let passwordValue = passwordInput.value.trim();
  if (passwordValue === "") {
    return;
  }
  if (passwordValue.match(passwordReg)) {
    passwordErrorMessage.style.display = "none";
  } else {
    passwordErrorMessage.style.display = "block";
    passwordErrorMessage.innerHTML = "";
    const invalidPassword = document.createElement("p");
    invalidPassword.innerText =
      "Password must be at least 6 characters long and include at least one lowercase letter, one number, and one special character (#?!@$%^&*-).";
      passwordErrorMessage.appendChild(invalidPassword);
  }
});

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (emailInput.value === ""||passwordInput.value === "") {
    return;
  }
  const userInfo = {
    email: emailInput.value,
    password: passwordInput.value,
  };
  userData.push(userInfo);
  saveUserData();
    window.location.href = "main.html";
});

// Save user's data on local storage //
function saveUserData() {
    localStorage.setItem("userData",JSON.stringify(userData));
}
// Get user's data from local storage//
function getUserData(){
   const savedData = localStorage.getItem("userData");
    if(savedData){
        const parsedData = JSON.parse(savedData);
        userData.push(...parsedData);
    }
}
getUserData();