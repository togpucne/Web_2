document.addEventListener("DOMContentLoaded", () => {
    const cartCount = document.getElementById("cartCount");
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    // Cập nhật số lượng đơn hàng
    cartCount.textContent = orders.length > 0 ? orders.length : '';
    const cartBody = document.getElementById("cartBody");
    localStorage.setItem('cartCount', orders.length);  // Lưu số lượng đơn hàng vào localStorage



    // Kiểm tra nếu có đơn hàng
    if (orders.length === 0) {
        // Nếu không có đơn hàng, hiện thông báo
        cartBody.innerHTML = `<div class="table-row d-flex justify-content-between" id="emptyRow">
            <div colspan="9" class="text-center">Chưa có sản phẩm được đặt</div>
        </div>`;
    } else {
        // Nếu có đơn hàng, lặp qua từng đơn hàng và hiển thị
        orders.forEach((order, index) => {
            const row = document.createElement("div");
            row.className = "table-row d-flex justify-content-between";
            row.innerHTML = `
                <div>${index + 1}</div>
                <div>${order.name}</div>
                <div>${order.phone}</div>
                <div>${order.product}</div>
                <div>${order.quantity}</div>
                <div>${order.price}</div>
                <div>${order.total}</div>
                <div>
                    <button class="cancel-btn" data-index="${index}" style="align-items: center; border: 1px sold black; border-radius:10px; padding:5px 15px;">Hủy</button>
                </div>
            `;
            cartBody.appendChild(row);
        });

        // Thêm sự kiện cho các nút hủy
        const cancelButtons = document.querySelectorAll('.cancel-btn');
        cancelButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                cancelOrder(index);
            });
        });
    }
});

// Hàm hủy đơn hàng
function cancelOrder(index) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.splice(index, 1); // Xóa đơn hàng tại vị trí chỉ định
    localStorage.setItem('orders', JSON.stringify(orders)); // Lưu lại đơn hàng đã cập nhật
    location.reload(); // Tải lại trang để cập nhật giỏ hàng
}