document.querySelectorAll(".product-link").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const productId = this.getAttribute("data-id");
    window.location.href = `../html/productDetails.html?id=${productId}`;
  });
});
function openModal(productName, imageUrl, price, discountPrice) {
  // Cập nhật tên sản phẩm
  document.querySelector(".modal .inner-name span").textContent = productName;

  // Cập nhật hình ảnh sản phẩm
  document.querySelector(".modal .img-1").src = imageUrl;

  // Cập nhật giá sản phẩm
  document.querySelector("#product-price").textContent = formatNumber(price);

  // Cập nhật giá discount
  document.querySelector(".modal .inner-discount .discount").textContent =
    formatNumber(discountPrice);

  // Khởi tạo input số lượng và tổng
  const quantityInput = document.getElementById("quantity-input");
  const totalInput = document.getElementById("total-output");
  const productPrice = price; // Lưu giá sản phẩm để tính toán
  const result_quantity = document.querySelector(".result_quantity"); // Lấy phần tử hiển thị kết quả

  // Xóa các listener cũ (nếu có) để tránh việc thêm nhiều lần
  quantityInput.removeEventListener("input", updateTotal);

  // Thêm event listener mới
  quantityInput.addEventListener("input", updateTotal);

  // Hàm để cập nhật tổng
  function updateTotal() {
    const quantity = parseInt(quantityInput.value) || 0; // Lấy số lượng
    if (quantity > 0) {
      const total = quantity * productPrice; // Tính tổng
      totalInput.value = formatNumber(total); // Hiển thị tổng
      result_quantity.innerHTML = "(*)";
      result_quantity.style.color = "green";
    } else {
      totalInput.value = ""; // Xóa giá trị tổng nếu không hợp lệ
      result_quantity.innerHTML = "* Quantity > 0"; // Hiển thị thông báo lỗi
      result_quantity.style.color = "red";
    }
  }

  // Mở modal
  $("#modelId").modal("show");
}

function formatNumber(num) {
  return new Intl.NumberFormat("vi-VN").format(num); // Bỏ phần currency để không có "đ"
}

let isValid = true;

// Name validation
let name = document.querySelector("#name");
name.addEventListener("blur", () => {
  const namePattern = /^(([A-Z][a-z]*\s)+([A-Z][a-z]*))$/; // Pattern for name validation
  let nameInput = name.value.trim();
  let result_name = document.querySelector(".result_name");

  if (nameInput === "") {
    result_name.innerHTML = "Không được bỏ trống !";
    result_name.style.color = "red";
    name.classList.add("inner-error");
    name.classList.remove("inner-success");
    isValid = false;
  } else if (!namePattern.test(nameInput)) {
    result_name.innerHTML =
      "Phải từ 2 chữ số, mỗi chữ từ 2 từ đảo lên, không có khoảng trắng thừa !";
    result_name.style.color = "red";
    name.classList.add("inner-error");
    name.classList.remove("inner-success");
    isValid = false;
  } else {
    result_name.innerHTML = "Confirm name!";
    result_name.style.color = "green";
    name.classList.remove("inner-error");
    name.classList.add("inner-success");
    isValid = true;
  }
});

// Phone validation
let phone = document.querySelector("#phone");
phone.addEventListener("blur", () => {
  const phonePattern = /^0\d{9}$/; // Phone number pattern
  let phoneInput = phone.value.trim();
  let result_phone = document.querySelector(".result_phone");

  if (phoneInput === "") {
    result_phone.innerHTML = "Không được bỏ trống!";
    result_phone.style.color = "red";
    phone.classList.add("inner-error");
    phone.classList.remove("inner-success");
    isValid = false;
  } else if (!phonePattern.test(phoneInput)) {
    result_phone.innerHTML =
      "Số điện thoại không hợp lệ! Phải bắt đầu bằng 0 và có 10 chữ số.";
    result_phone.style.color = "red";
    phone.classList.add("inner-error");
    phone.classList.remove("inner-success");
    isValid = false;
  } else {
    result_phone.innerHTML = "Confirm phone number!";
    result_phone.style.color = "green";
    phone.classList.remove("inner-error");
    phone.classList.add("inner-success");
    isValid = true;
  }
});

// Quantity validation
let quantityInput = document.querySelector("#quantity-input");
quantityInput.addEventListener("input", () => {
  let totalOutput = document.querySelector("#total-output");
  let productPrice = parseInt(
    document.querySelector("#product-price").textContent.replace(/\./g, "")
  ); // Lấy giá sản phẩm từ HTML

  let quantity = parseInt(quantityInput.value);
  if (quantity <= 0) {
    alert("Số lượng không được nhỏ hơn hoặc bằng 0.");
    quantityInput.value = 1; // Đặt lại giá trị thành 1 nếu không hợp lệ
    totalOutput.value = ""; // Xóa giá trị tổng
    return;
  }

  // Tính toán tổng
  let total = productPrice * quantity;
  totalOutput.value = formatNumber(total); // Cập nhật giá trị tổng
});

// Validate payment and shipping methods
function validatePaymentAndShipping() {
  const payChecked = document.querySelector("input[name='pay']:checked");
  const transforChecked = document.querySelector(
    "input[name='transfor']:checked"
  );
  return payChecked && transforChecked;
}

// Form validation
function validateForm() {
  isValid = true;
  const nameInput = name.value.trim();
  const phoneInput = phone.value.trim();

  // Name validation
  if (
    nameInput === "" ||
    !/^(([A-Z][a-z]*\s)+([A-Z][a-z]*))$/.test(nameInput)
  ) {
    isValid = false;
  }

  // Phone validation
  if (phoneInput === "" || !/^0\d{9}$/.test(phoneInput)) {
    isValid = false;
  }

  // Quantity validation
  const quantity = parseInt(quantityInput.value);
  if (quantity <= 0) {
    isValid = false;
  }

  // Validate payment and shipping
  if (!validatePaymentAndShipping()) {
    isValid = false;
  }

  // Check if the privacy policy is accepted
  const chinhSachChecked = document.getElementById("chinhSach").checked;
  if (!chinhSachChecked) {
    isValid = false;
  }

  return isValid;
}

let btnSubmit = document.querySelector("#btnSubmit");
btnSubmit.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent form submission to check validity

  if (validateForm()) {
    alert("Mua thành công");

    // Proceed with storing order details and redirecting
    const nameInput = name.value;
    const phoneInput = phone.value;
    const quantityInputValue = quantityInput.value;
    const productName1 = document.querySelector(".inner-name span").innerText;
    const productPrice1 =
      parseInt(
        document.querySelector("#product-price").textContent.replace(/\./g, "")
      ) || 0;
    const totalPrice = quantityInputValue * productPrice1;

    const orderData = {
      name: nameInput,
      phone: phoneInput,
      payment:
        document.querySelector("input[name='pay']:checked")?.value ||
        "Không có",
      shipping:
        document.querySelector("input[name='transfor']:checked")?.value ||
        "Không có",
      product: productName1,
      quantity: quantityInputValue,
      price: formatNumber(productPrice1), // Không có "đ"
      total: formatNumber(totalPrice), // Không có "đ"
    };

    let orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(orderData);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Redirect to shopping.html
    window.location.href = "shopping.html";
  } else {
    alert("Lỗi: vui lòng điền đầy đủ thông tin");
  }
});
