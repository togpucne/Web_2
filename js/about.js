const cartCount = document.getElementById("cartCount");
const orders = JSON.parse(localStorage.getItem('orders')) || [];

// Cập nhật số lượng đơn hàng
cartCount.textContent = orders.length > 0 ? orders.length : '';
const cartBody = document.getElementById("cartBody");

window.onload = function () {
    const loadingOverlay = document.querySelector('.loading-overlay');
    loadingOverlay.style.display = 'none'; // Ẩn lớp phủ khi trang đã tải xong
};