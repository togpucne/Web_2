document.addEventListener("DOMContentLoaded", () => {
    const cartCount = document.getElementById("cartCount");

    // Lấy số lượng sản phẩm trong giỏ hàng từ localStorage và hiển thị
    const cartCountValue = localStorage.getItem('cartCount');
    cartCount.textContent = cartCountValue > 0 ? cartCountValue : '';

    // Phần còn lại của mã của bạn để hiển thị các sản phẩm trong giỏ hàng (nếu có)
    const cartBody = document.getElementById("cartBody");
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Kiểm tra nếu giỏ hàng trống
    if (cartItems.length === 0) {
        cartBody.innerHTML = `<div class="table-row d-flex justify-content-between" id="emptyRow">
            <div colspan="9" class="text-center">Chưa có sản phẩm được thêm vào giỏ hàng!</div>
        </div>`;
    } else {
        // Hiển thị sản phẩm trong giỏ hàng
        cartItems.forEach((item, index) => {
            const row = document.createElement("div");
            row.className = "table-row d-flex justify-content-between";
            row.innerHTML = `
                <div>${index + 1}</div>
                <div>${item.product}</div>
                <div>${item.quantity}</div>
                <div>${item.price}</div>
                <div>${item.total}</div>
                <div>
                    <button class="buy-btn" style="padding:5px 20px; border-radius: 10px; margin-right: 10px;" 
                            data-index="${index}" 
                            data-toggle="modal" 
                            data-target="#myModal">Mua</button>
                </div>
                <div>
                    <button class="cancel-btn" style="padding:5px 20px; border-radius: 10px" 
                            data-index="${index}">Hủy</button>
                </div>
            `;
            cartBody.appendChild(row);
        });

        // Xử lý sự kiện hủy sản phẩm trong giỏ hàng
        document.querySelectorAll('.cancel-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                cancelCartItem(index);
            });
        });

        // Xử lý sự kiện mua sản phẩm
        document.querySelectorAll('.buy-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                showModalForPurchase(index);
            });
        });
    }
});

let isValid = true;

// Hàm kiểm tra tên
function validateName() {
    const name = document.querySelector("#name");
    const namePattern = /^(([A-Z][a-z]*\s)+([A-Z][a-z]*))$/;
    const nameInput = name.value.trim();
    const result_name = document.querySelector(".result_name");

    if (nameInput === "") {
        result_name.innerHTML = "Không được bỏ trống!";
        result_name.style.color = "red";
        name.classList.add("inner-error");
        name.classList.remove("inner-success");
        isValid = false;
    } else if (!namePattern.test(nameInput)) {
        result_name.innerHTML = "Phải từ 2 chữ số, mỗi chữ từ 2 từ đảo lên, không có khoảng trắng thừa!";
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
}

// Hàm kiểm tra số điện thoại
function validatePhone() {
    const phone = document.querySelector("#phone");
    const phonePattern = /^0\d{9}$/;
    const phoneInput = phone.value.trim();
    const result_phone = document.querySelector(".result_phone");

    if (phoneInput === "") {
        result_phone.innerHTML = "Không được bỏ trống!";
        result_phone.style.color = "red";
        phone.classList.add("inner-error");
        phone.classList.remove("inner-success");
        isValid = false;
    } else if (!phonePattern.test(phoneInput)) {
        result_phone.innerHTML = "Số điện thoại không hợp lệ! Phải bắt đầu bằng 0 và có 10 chữ số.";
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
}

// Thêm sự kiện blur cho các trường input
document.querySelector("#name").addEventListener("blur", validateName);
document.querySelector("#phone").addEventListener("blur", validatePhone);

// Hàm xử lý khi nhấn "Mua" trong modal
document.getElementById("btnSubmit").addEventListener("click", () => {
    validateName();
    validatePhone();

    if (isValid) {
        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        // Lấy đơn hàng hiện có từ localStorage
        const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];

        // Lưu thông tin người mua và chi tiết giỏ hàng vào localStorage
        const orderDetails = cartItems.map((item, index) => ({
            stt: existingOrders.length + index + 1, // Cập nhật STT
            name: name,
            phone: phone,
            product: item.product,
            quantity: item.quantity,
            price: item.price,
            total: item.total
        }));

        // Kết hợp đơn hàng mới vào đơn hàng đã có
        const updatedOrders = [...existingOrders, ...orderDetails];
        localStorage.setItem("orders", JSON.stringify(updatedOrders));

        // Xóa sản phẩm khỏi giỏ hàng sau khi mua
        localStorage.setItem("cartItems", JSON.stringify([])); // Xóa giỏ hàng

        // Chuyển sang trang shopping.html
        window.location.href = "../html/shopping.html";
    }
});

// Hàm hủy sản phẩm trong giỏ hàng
function cancelCartItem(index) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    location.reload();
}