  // Hàm hiển thị modal
  function showModal() {
    $('#myModal').modal('show');
}

// Lấy các nút theo ID
let btnClose = document.querySelector("#btnClose");
let btnSubmit = document.querySelector("#btnSubmit");
let btnClose1 = document.querySelector("#btnClose1");

// Bắt sự kiện cho btnClose để đóng modal
btnClose.addEventListener("click", () => {
    $('#myModal').modal('hide'); // Đóng modal
});
btnClose1.addEventListener("click", () => {
    $('#myModal').modal('hide'); // Đóng modal
});

// Bắt sự kiện cho btnSubmit để chuyển hướng
btnSubmit.addEventListener("click", () => {
    window.location.href = "../html/products.html"; // Chuyển trang
});