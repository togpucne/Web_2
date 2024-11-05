const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});
let passwordInput = document.querySelector("#passwordInput");
let togglePassword = document.querySelector("#togglePassword");

// Hiện/ẩn mật khẩu trong phần đăng ký

togglePassword.addEventListener("click", function () {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  this.classList.toggle("fa-eye-slash");
  this.classList.toggle("fa-eye");
});

// Hiện/ẩn mật khẩu trong phần đăng nhập
let passwordInputSignIn = document.querySelector("#passwordInputSignIn");
let togglePasswordSignIn = document.querySelector("#togglePasswordSignIn");

togglePasswordSignIn.addEventListener("click", function () {
  const type =
    passwordInputSignIn.getAttribute("type") === "password"
      ? "text"
      : "password";
  passwordInputSignIn.setAttribute("type", type);
  this.classList.toggle("fa-eye-slash");
  this.classList.toggle("fa-eye");
});

let nameInput = document.querySelector("#nameInput");
let emailInput = document.querySelector("#emailInput");

let namPattern = document.querySelector(".result-name");
let result_email = document.querySelector(".result-email");
let result_password = document.querySelector(".result-password");

// Regex patterns
let namePattern = /^(([A-Z][a-z]*\s)+([A-Z][a-z]*))$/;
let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
let isValid = true;

//Name
nameInput.addEventListener("blur", () => {
  let nameOutput = nameInput.value.trim();
  if (nameOutput === "") {
    nameInput.classList.add("input-error");
    nameInput.classList.remove("input-success");
    namPattern.innerHTML = "Name can not be empty!";
    namPattern.style.color = "red";
    isValid = false;
  } else if (!namePattern.test(nameOutput)) {
    nameInput.classList.add("input-error");
    nameInput.classList.remove("input-success");
    namPattern.innerHTML = "Invalid name!";
    namPattern.style.color = "red";
    isValid = false;
  } else {
    nameInput.classList.remove("input-error");
    nameInput.classList.add("input-success");
    namPattern.innerHTML = "Confirm name!";
    namPattern.style.color = "green";
    isValid = true;
  }
});
emailInput.addEventListener("blur", () => {
  let emailOutput = emailInput.value.trim();
  let users = JSON.parse(localStorage.getItem("users")) || []; // Lấy danh sách người dùng

  if (emailOutput === "") {
    emailInput.classList.add("input-error");
    emailInput.classList.remove("input-success");
    result_email.innerHTML = "Email không được để trống!";
    result_email.style.color = "red";
    isValid = false;
  } else if (!emailPattern.test(emailOutput)) {
    emailInput.classList.add("input-error");
    emailInput.classList.remove("input-success");
    result_email.innerHTML = "Email không hợp lệ!";
    result_email.style.color = "red";
    isValid = false;
  } else if (users.some((user) => user.email === emailOutput)) {
    // Kiểm tra email đã tồn tại
    emailInput.classList.add("input-error");
    emailInput.classList.remove("input-success");
    result_email.innerHTML = "Email đã được sử dụng!";
    result_email.style.color = "red";
    isValid = false;
  } else {
    emailInput.classList.remove("input-error");
    emailInput.classList.add("input-success");
    result_email.innerHTML = "Confirm email!";
    result_email.style.color = "green";
    isValid = true;
  }
});

passwordInput.addEventListener("blur", () => {
  let passwordOutput = passwordInput.value.trim();
  if (passwordOutput === "") {
    passwordInput.classList.add("input-error");
    passwordInput.classList.remove("input-success");
    result_password.innerHTML = "Password can not be empty!";
    result_password.style.color = "red";
    isValid = false;
  } else if (!passwordPattern.test(passwordOutput)) {
    passwordInput.classList.add("input-error");
    passwordInput.classList.remove("input-success");
    result_password.innerHTML = "Invalid password !";
    result_password.style.color = "red";
    isValid = false;
  } else {
    passwordInput.classList.add("input-success");
    passwordInput.classList.remove("input-error");
    result_password.innerHTML = "Confirm password !";
    result_password.style.color = "green";
    isValid = true;
  }
});
//  Đăng ký
let btnSignUp = document.querySelector("#btnSignUp");
btnSignUp.addEventListener("click", (event) => {
  event.preventDefault();
  let emailOutput = emailInput.value.trim();
  let users = JSON.parse(localStorage.getItem("users")) || []; // Lấy danh sách người dùng
  if (users.some((user) => user.email === emailOutput)) {
    // Kiểm tra email đã tồn tại
    emailInput.classList.add("input-error");
    emailInput.classList.remove("input-success");
    result_email.innerHTML = "Email đã được sử dụng!";
    result_email.style.color = "red";
    isValid = false;
  }
  if (isValid) {
    let newUser = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value.trim(),
    };
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Sign Up Successful!");
    window.location.href = "../html/login.html";
  } else {
    alert("You need to check your input.");
  }
});
//  Đăng nhập

let sign_In_Button = document.querySelector(".sign-in-button");

sign_In_Button.addEventListener("click", () => {
  let emailInputSignIn = document
    .querySelector("#emailInputSignIn")
    .value.trim();
  let passwordInputSignIn = document
    .querySelector("#passwordInputSignIn")
    .value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];
  let userFound = false;

  let user_name = "";
  let user_email = "";
  let user_password = "";

  for (let user of users) {
    if (
      user.email === emailInputSignIn &&
      user.password === passwordInputSignIn
    ) {
      userFound = true;
      user_name = user.name;
      user_email = user.email;
      user_password = user.password;
      break;
    }
  }

  if (userFound) {
    setTimeout(() => {
      window.location.href = "../html/home.html";

      let userProfile = document.getElementById("userProfile");
      let userGreeting = document.getElementById("userGreeting");
      let userName = document.getElementById("userName");

      userProfile.style.display = "none";
      userGreeting.style.display = "block";

      let fullName = user_name;
      let nameParts = fullName.split(" ");
      let lastName = nameParts[nameParts.length - 1];

      userName.innerText = lastName;
      localStorage.setItem("currentUser", lastName);
      localStorage.setItem("userEmail", user_email);
      localStorage.setItem("userPassword", user_password);

      localStorage.setItem("userProfileVisible", "true");
    }, 500);
    alert("Congratulations, Sign up successfully!");
  } else {
    alert("You need Sign Up!");
  }
});
