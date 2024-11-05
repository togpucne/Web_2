document.addEventListener('DOMContentLoaded', function () {

    // Hàm định dạng số với dấu chấm
    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    const innerPriceElement = document.querySelector('.inner-price');
    let productPrice = parseInt(innerPriceElement.getAttribute('data-price')) || 0;

    const quantityInput = document.getElementById('quantity');
    const totalInput = document.getElementById('total');
    let result_quantity = document.querySelector(".result_quantity");

    // Hàm cập nhật modal với thông tin sản phẩm
    function updateModal(product) {
        document.querySelector('.modal .inner-name').innerText = product.name;
        document.querySelector('.modal .inner-img img').src = product.images[0];
        document.querySelector('.modal .inner-discount').innerText = formatNumber(product.price);

        const quantity = parseInt(quantityInput.value) || 0;
        document.querySelector('.modal .price-quantity .price').innerText = quantity;
        document.querySelector('.modal .price-price .price').innerText = formatNumber(product.price);
        document.querySelector('.modal .price-total .total').innerText = formatNumber(quantity * product.price);
    }

    // Xử lý thay đổi số lượng
    quantityInput.addEventListener('input', function () {
        const quantity = parseInt(quantityInput.value) || 0;
        if (quantity > 0) {
            const total = quantity * productPrice;
            totalInput.value = formatNumber(total);
            result_quantity.innerHTML = '(*)';
            result_quantity.style.color = "green";
        } else {
            totalInput.value = '';
            result_quantity.innerHTML = '* Quantity > 0';
            result_quantity.style.color = "red";
        }

        updateModal({
            name: document.querySelector('.inner-title span').innerText,
            price: productPrice,
            images: [document.querySelector('.carousel-item.active img').src]
        });
    });

    // Hàm xử lý thumbnail click
    function setupThumbnailClick() {
        const thumbnails = document.querySelectorAll('.thumbnail-img');
        const carouselItems = document.querySelectorAll('.carousel-item');

        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                carouselItems.forEach(item => item.classList.remove('active'));
                carouselItems[index].classList.add('active');

                thumbnails.forEach(img => img.classList.remove('active-thumbnail'));
                thumbnail.classList.add('active-thumbnail');

                const newPrice = parseInt(thumbnail.getAttribute('data-price'));
                productPrice = newPrice;
                innerPriceElement.innerText = `Price: ${formatNumber(productPrice)}`;

                const quantity = parseInt(quantityInput.value) || 0;
                if (quantity > 0) {
                    const total = quantity * productPrice;
                    totalInput.value = formatNumber(total);
                }

                updateModal({
                    name: document.querySelector('.inner-title span').innerText,
                    price: productPrice,
                    images: [thumbnail.src]
                });
            });
        });
    }
    // Lấy dữ liệu từ file json 
    async function loadProductDetails() {
        try {
            const response = await fetch('../js/product.json');
            const products = await response.json();

            const params = new URLSearchParams(window.location.search);
            const productId = params.get('id');

            const product = products.find(p => p.id == productId);

            if (product) {
                document.querySelector('.inner-title span').innerText = product.name;
                innerPriceElement.innerText = `Price: ${formatNumber(product.price)}`;
                innerPriceElement.setAttribute('data-price', product.price);
                productPrice = product.price;
                document.querySelector('.tomTat').innerHTML = product.summary.map(item => `<li>${item}</li>`).join('');

                const carouselInner = document.querySelector('.carousel-inner');
                const thumbnailContainer = document.querySelector('.thumbnails');
                carouselInner.innerHTML = '';
                thumbnailContainer.innerHTML = '';

                product.images.forEach((image, index) => {
                    const activeClass = index === 0 ? 'active' : '';
                    carouselInner.innerHTML += `
                    <div class="carousel-item ${activeClass}">
                        <img src="${image}" class="d-block w-100" alt="...">
                    </div>
                    `;
                    thumbnailContainer.innerHTML += `
                    <img src="${image}" class="thumbnail-img ${index === 0 ? 'active-thumbnail' : ''}" data-target="${index}" data-price="${product.price}" alt="...">
                    `;
                });

                const offerList = document.getElementById('offer-list');
                offerList.innerHTML = product.description.map(desc => `<li>${desc}</li>`).join('');

                const warranty = document.querySelector('.inner-input-11 span:nth-of-type(1)');
                warranty.textContent = product.warranty;

                const accessories = document.querySelector('.inner-input-11 span:nth-of-type(2)');
                accessories.textContent = product.accessories;

                setupThumbnailClick();


            }
        } catch (error) {
            console.error("Failed to load product details:", error);
        }
    }




    loadProductDetails();
    // Định dạng số thành dạng có dấu phân cách hàng nghìn
    function formatNumber(number) {
        return new Intl.NumberFormat('vi-VN').format(number);
    }

    // Hàm mở modal và cập nhật giá trị
    function openModal() {
        const price = parseInt(document.querySelector('.inner-price').getAttribute('data-price')) || 0;
        const quantity = parseInt(document.getElementById('quantity').value) || 0;
        const total = price * quantity;

        // Cập nhật thông tin vào modal
        document.querySelector('#modelId .price-price .price').innerText = formatNumber(price) + " VND";
        document.querySelector('#modelId .price-quantity .price').innerText = quantity;
        document.querySelector('#modelId .price-total .total').innerText = formatNumber(total) + " VND";

        // Mở modal
        $('#modelId').modal('show');
    }

    // Thêm sự kiện click cho nút "Bought"
    document.querySelector('.btn.bought').addEventListener('click', openModal);


    let isValid = true;

    // name
    let name = document.querySelector("#name");
    name.addEventListener("blur", () => {
        const namePattern = /^(([A-Z][a-z]*\s)+([A-Z][a-z]*))$/;
        let nameInput = name.value.trim();
        let result_name = document.querySelector(".result_name");
        if (nameInput === "") {
            result_name.innerHTML = "Không được bỏ trống !";
            result_name.style.color = "red";
            name.classList.add("inner-error");
            name.classList.remove("inner-success");
            isValid = false;
        } else if (!namePattern.test(nameInput)) {
            result_name.innerHTML = "Phải từ 2 chữ số, mỗi chữ từ 2 từ đảo lên, không có khoảng trắng thừa !";
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

    // phone 
    let phone = document.querySelector("#phone");
    phone.addEventListener("blur", () => {
        const phonePattern = /^0\d{9}$/; // Số điện thoại bắt đầu bằng 0 và có 10 chữ số
        let phoneInput = phone.value.trim();
        let result_phone = document.querySelector(".result_phone");

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
    });
    // Pay 
    const payChecked = document.querySelector("input[name='pay']:checked");
    if (!payChecked) {
        isValid = false;
    } else {
        isValid = true;
    }

    // Transfor
    const transforChecked = document.querySelector("input[name='transfor']:checked");
    if (!transforChecked) {
        isValid = false;
    } else {
        isValid = true;
    }
    // Bought 
    function validateForm() {
        isValid = true;

        // Kiểm tra Họ tên
        const namePattern = /^(([A-Z][a-z]*\s)+([A-Z][a-z]*))$/;
        let nameInput = name.value.trim();
        let result_name = document.querySelector(".result_name");
        if (nameInput === "" || !namePattern.test(nameInput)) {
            isValid = false;
        }

        // Kiểm tra Số điện thoại
        const phonePattern = /^0\d{9}$/;
        let phoneInput = phone.value.trim();
        if (phoneInput === "" || !phonePattern.test(phoneInput)) {
            isValid = false;
        }

        // Kiểm tra thanh toán
        const payChecked = document.querySelector("input[name='pay']:checked");
        if (!payChecked) {
            isValid = false;
        }

        // Kiểm tra vận chuyển
        const transforChecked = document.querySelector("input[name='transfor']:checked");
        if (!transforChecked) {
            isValid = false;
        }
        // Kiểm tra chính sách xử lý dữ liệu cá nhân
        const chinhSachChecked = document.getElementById("chinhSach").checked;
        let result_chinhSach = document.querySelector(".result_chinhSach");
        if (!chinhSachChecked) {
            isValid = false;
        }


        return isValid;

    }

    let btnSubmit = document.querySelector("#btnSubmit");
    btnSubmit.addEventListener("click", () => {

        alert("Mua thành công");

        function clearValidationClasses() {
            const inputs = document.querySelectorAll("#name, #phone, #quantity");
            inputs.forEach(input => {
                input.classList.remove("inner-error");
                input.classList.remove("inner-success");
            });
        }
        window.location.href = "shopping.html";


        if (validateForm()) {
            // Lấy thông tin sản phẩm và người dùng
            const nameInput = document.querySelector("#name").value;
            const phoneInput = document.querySelector("#phone").value;
            const quantityInput = document.querySelector("#quantity").value;
            const productName1 = document.querySelector('.inner-title span').innerText;
            const productPrice1 = parseInt(innerPriceElement.getAttribute('data-price')) || 0;
            const totalPrice = quantityInput * productPrice1;

            // Tạo đối tượng chứa thông tin đơn hàng
            const orderData = {
                name: nameInput,
                phone: phoneInput,
                payment: document.querySelector("input[name='pay']:checked")?.value || "Không có",
                shipping: document.querySelector("input[name='transfor']:checked")?.value || "Không có",
                product: productName1,
                quantity: quantityInput,
                price: formatNumber(productPrice1),
                total: formatNumber(totalPrice)
            };

            // Lưu vào Local Storage
            let orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.push(orderData);
            localStorage.setItem('orders', JSON.stringify(orders));

            resetModalState();

        } else {
            alert("Lỗi: vui lòng điền đầy đủ thông tin");
            resetModalState();
        }
    });
    // Add to Cart
    const addToCartButton = document.querySelector(".add");

    addToCartButton.addEventListener("click", () => {
        const nameInput = document.querySelector("#name").value;
        const phoneInput = document.querySelector("#phone").value;
        const quantityInput = document.querySelector("#quantity").value || 1;
        const productName = document.querySelector('.inner-title span').innerText;
        const innerPriceElement = document.querySelector('.inner-price');
        const productPrice = parseInt(innerPriceElement.getAttribute('data-price')) || 0;
        const totalPrice = quantityInput * productPrice;

        const productData = {
            name: nameInput,
            phone: phoneInput,
            product: productName,
            quantity: quantityInput,
            price: formatNumber(productPrice),
            total: formatNumber(totalPrice)
        };

        // Lưu vào Local Storage
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems.push(productData);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        alert("Sản phẩm đã được thêm vào giỏ hàng!");
        window.location.href = "shoppingCart.html";
    });


    // Hàm reset trạng thái modal
    function resetModalState() {
        document.querySelector("#name").value = ""; // Reset trường họ tên
        document.querySelector("#phone").value = ""; // Reset trường số điện thoại
        document.querySelector("#quantity").value = "1"; // Đặt lại số lượng mặc định
        document.querySelector("#total").value = ""; // Reset tổng giá

        // Xóa lớp thành công và lỗi
        const nameField = document.querySelector("#name");
        const phoneField = document.querySelector("#phone");
        nameField.classList.remove("inner-success", "inner-error");
        phoneField.classList.remove("inner-success", "inner-error");

        // Xóa thông báo kết quả
        document.querySelector(".result_name").innerHTML = "";
        document.querySelector(".result_phone").innerHTML = "";
        document.querySelector(".result_quantity").innerHTML = "";
        document.querySelector(".result_chinhSach").innerHTML = "";

        // Đặt lại trạng thái cho các checkbox và radio button
        const checkboxes = document.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach(checkbox => checkbox.checked = false);

        const radioButtons = document.querySelectorAll("input[type='radio']");
        radioButtons.forEach(radio => radio.checked = false);

        clearValidationClasses();
    }




});