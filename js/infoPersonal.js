// Lấy tên người dùng từ localStorage
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

btnSignUp.addEventListener("click", () => {
  alert("Update successfull");
  window.location.href = "../html/infoPersonal.html";
});
btnClose.addEventListener("click", () => {
  window.location.href = "../html/home.html";
});
btnSignOut.addEventListener("click", () => {
  window.location.href = "../html/login.html";
});
let personal = document.querySelector(".info .inner-wrap .inner-left .inner-name .inner-title");
personal.innerHTML =  currentUser;
// 
