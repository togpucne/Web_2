const cartCount = document.getElementById("cartCount");
const orders = JSON.parse(localStorage.getItem('orders')) || [];

// Cập nhật số lượng đơn hàng
cartCount.textContent = orders.length > 0 ? orders.length : '';
const cartBody = document.getElementById("cartBody");
