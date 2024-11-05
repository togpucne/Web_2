let currentUser = localStorage.getItem("currentUser");
let user_email = localStorage.getItem("userEmail");
let user_password = localStorage.getItem("userPassword");

if (currentUser) {
  document.getElementById("userName").innerText = currentUser;
  document.getElementById("userGreeting").style.display = "block";
  document.getElementById("userProfile").style.display = "none";

  const nameInput = document.querySelector(
    ".info .inner-wrap .inner-right .inner-name .inner-title input"
  );
  nameInput.placeholder = currentUser;
  const emailInput = document.querySelector(
    ".info .inner-wrap .inner-right .inner-email .inner-title input"
  );
  emailInput.placeholder = user_email;
  const passwordInput = document.querySelector(
    ".info .inner-wrap .inner-right .inner-password .inner-title input"
  );
  passwordInput.placeholder = user_password;
} else {
  document.getElementById("userGreeting").style.display = "none";
  document.getElementById("userProfile").style.display = "block";
}
let btnSignUp = document.querySelector("#btnSignUp");
let btnClose = document.querySelector("#btnClose");
let btnSignOut = document.querySelector("#btnSignOut");

btnClose.addEventListener("click", () => {
  window.location.href = "../html/home.html";
});
btnSignOut.addEventListener("click", () => {
  localStorage.setItem("userProfileVisible", "false");
  alert("Sign Out Successfully");
  window.location.href = "../html/login.html";
});
let personal = document.querySelector(
  ".info .inner-wrap .inner-left .inner-name .inner-title"
);
personal.innerHTML = currentUser;

// name
let nameInput = document.querySelector(
  ".info .inner-wrap .inner-right .inner-name .inner-title input"
);
let result_name = document.querySelector("#result-name");

nameInput.addEventListener("blur", () => {
  let nameValue = nameInput.value.trim();
  let namePattern = /^[A-Z][a-z]{0,9}$/; // Bắt đầu bằng chữ hoa, có ít nhất 1 chữ cái và tối đa 10 ký tự

  if (nameValue === "") {
    result_name.innerHTML = "(*)"; // Nếu không nhập gì, không hiển thị thông báo
    result_name.style.color = "red";
  } else if (!namePattern.test(nameValue)) {
    result_name.innerHTML =
      "Tên chỉ cần điền 1 chữ độ dài tối đa 10 kí tự, in hoa chữ đầu!";
    result_name.style.color = "red";
    nameInput.classList.add("input-error");
    nameInput.classList.remove("input-success");
  } else {
    result_name.innerHTML = "Tên hợp lệ!";
    result_name.style.color = "green";
    nameInput.classList.remove("input-error");
    nameInput.classList.add("input-success");
  }
});
//  Email
let emailInput = document.querySelector("#email");
let result_email = document.querySelector("#result-email");
let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
emailInput.addEventListener("blur", () => {
  let emailOutput = emailInput.value.trim();
  let users = JSON.parse(localStorage.getItem("users")) || []; // Lấy danh sách người dùng

  if (emailOutput === "") {
    result_email.innerHTML = "(*)";
    result_email.style.color = "red";
    isValid = false;
  } else if (!emailPattern.test(emailOutput)) {
    emailInput.classList.add("input-error");
    emailInput.classList.remove("input-success");
    result_email.innerHTML = "Invalid email format!";
    result_email.style.color = "red";
    isValid = false;
  } else if (users.some((user) => user.email === emailOutput)) {
    emailInput.classList.add("input-error");
    emailInput.classList.remove("input-success");
    result_email.innerHTML = "Email already in use!";
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

// Password
let passwordInput = document.querySelector("#password");
let result_password = document.querySelector("#result-password");
let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

passwordInput.addEventListener("blur", () => {
  let passwordOutput = passwordInput.value.trim();
  if (passwordOutput === "") {
    result_password.innerHTML = "(*)";
    result_password.style.color = "red";
    isValid = false;
  } else if (!passwordPattern.test(passwordOutput)) {
    passwordInput.classList.add("input-error");
    passwordInput.classList.remove("input-success");
    result_password.innerHTML =
      "Mật khẩu phải ít nhất(1 chữ thường, 1 chữ hoa, 1 ký tự đặc biệt, 1 ký tự số), tổng đồ dài tối thiểu là 8. ";
    result_password.style.color = "red";
    isValid = false;
  } else {
    passwordInput.classList.remove("input-error");
    passwordInput.classList.add("input-success");
    result_password.innerHTML = "Confirm password!";
    result_password.style.color = "green";
    isValid = true;
  }
});

// Phone
let phone = document.querySelector("#phone");
let result_phone = document.querySelector("#result-phone");

phone.addEventListener("blur", () => {
  let phoneInput = phone.value.trim();
  let phonePattern = /^0[0-9]{9}$/; // Số điện thoại bắt đầu với 0 và có 10 chữ số

  if (phoneInput === "") {
    result_phone.innerHTML = "(*)"; // Nếu không nhập gì, không hiển thị thông báo
    result_phone.style.color = "red";
  } else if (!phonePattern.test(phoneInput)) {
    result_phone.innerHTML =
      "* Số điện thoại phải có 10 chữ số và bắt đầu bằng số 0.";
    result_phone.style.color = "red";
    phone.classList.add("input-error");
    phone.classList.remove("input-success");
  } else {
    result_phone.innerHTML = "Số điện thoại hợp lệ!";
    result_phone.style.color = "green";
    phone.classList.remove("input-error");
    phone.classList.add("input-success");
  }
});

// Nút Sign Up
btnSignUp.addEventListener("click", () => {
  // Lấy giá trị từ các input
  let nameInputValue = nameInput.value.trim();
  let emailValue = emailInput.value.trim(); // thêm dòng này để lấy giá trị email
  let passwordValue = passwordInput.value.trim(); // thêm dòng này để lấy giá trị password
  let phoneInputValue = phone.value.trim();

  let genderValue = document.querySelector('input[name="gender"]:checked')
    ? document.querySelector('input[name="gender"]:checked').id
    : "";

  // Kiểm tra hợp lệ cho từng trường đã nhập
  let isNameValid =
    nameInputValue === "" || /^[A-Z][a-z]{0,9}$/.test(nameInputValue);
  let isPhoneValid =
    phoneInputValue === "" || /^0[0-9]{9}$/.test(phoneInputValue);
  let isEmailValid = emailValue === "" || emailPattern.test(emailValue);
  let isPasswordValid =
    passwordValue === "" || passwordPattern.test(passwordValue);

  if (!isNameValid) {
    alert("Tên không hợp lệ. Vui lòng kiểm tra lại.");
    return;
  }
  if (!isPhoneValid) {
    alert("Số điện thoại không hợp lệ. Vui lòng kiểm tra lại.");
    return;
  }
  if (!isEmailValid) {
    alert("Email không hợp lệ. Vui lòng kiểm tra lại.");
    return;
  }
  if (!isPasswordValid) {
    alert("Password không hợp lệ. Vui lòng kiểm tra lại.");
    return;
  }

  // Lưu thông tin vào localStorage nếu trường hợp lệ
  if (nameInputValue) localStorage.setItem("currentUser", nameInputValue);
  if (emailValue) localStorage.setItem("userEmail", emailValue);
  if (passwordValue) localStorage.setItem("userPassword", passwordValue);
  if (phoneInputValue) localStorage.setItem("userPhone", phoneInputValue);
  if (genderValue) localStorage.setItem("userGender", genderValue);

  alert("Update Successfully");
  location.reload();
});

window.onload = () => {
  let currentUser = localStorage.getItem("currentUser") || "";
  let userEmail = localStorage.getItem("userEmail") || "";
  let userPassword = localStorage.getItem("userPassword") || "";
  let userPhone = localStorage.getItem("userPhone");
  let userGender = localStorage.getItem("userGender");

  if (currentUser) {
    document.getElementById("userName").innerText = currentUser;
    document.querySelector(
      ".info .inner-wrap .inner-right .inner-name .inner-title input"
    ).placeholder = currentUser;
  }

  if (userEmail) {
    document.querySelector(
      ".info .inner-wrap .inner-right .inner-email .inner-title input"
    ).placeholder = userEmail;
  }

  if (userPassword) {
    document.querySelector(
      ".info .inner-wrap .inner-right .inner-password .inner-title input"
    ).placeholder = userPassword;
  }

  if (userPhone && userPhone.trim() !== "") {
    document.querySelector(
      ".info .inner-wrap .inner-right .inner-phone input"
    ).placeholder = userPhone;
  } else {
    document.querySelector(
      ".info .inner-wrap .inner-right .inner-phone input"
    ).placeholder = "";
  }

  if (userGender === "female") {
    document.getElementById("female").checked = true;
  } else if (userGender === "male") {
    document.getElementById("male").checked = true;
  } else {
    document.getElementById("female").checked = false;
    document.getElementById("male").checked = false;
  }
  if (userPhone && userPhone.trim() !== "") {
    document.querySelector(
      ".info .inner-wrap .inner-right .inner-phone input"
    ).placeholder = userPhone;
  } else {
    document.querySelector(
      ".info .inner-wrap .inner-right .inner-phone input"
    ).placeholder = "";
  }

  if (userGender === "female") {
    document.getElementById("female").checked = true;
  } else if (userGender === "male") {
    document.getElementById("male").checked = true;
  } else {
    document.getElementById("female").checked = false;
    document.getElementById("male").checked = false;
  }
};
