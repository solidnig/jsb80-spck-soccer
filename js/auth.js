// Xử lý đăng ký
function register(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Lấy danh sách người dùng hoặc khởi tạo mảng rỗng
  let users = JSON.parse(localStorage.getItem("users") || "[]");

  // Kiểm tra xem tên đăng nhập đã tồn tại chưa
  if (users.find((user) => user.username === username)) {
    alert("Tên đăng nhập đã tồn tại");
    return;
  }

  // Thêm người dùng mới
  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Đăng ký thành công!");
  window.location.href = "login.html"; // Chuyển hướng sang login.html
}

// Xử lý đăng nhập
function login(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    localStorage.setItem("loggedInUser", username);
    alert("Đăng nhập thành công!");
    window.location.href = "index.html";
  }
}

// Xử lý hiển thị tên người dùng trong navbar
window.addEventListener("DOMContentLoaded", () => {
  const userNav = document.getElementById("userNav");
  const loggedInUser = localStorage.getItem("loggedInUser");
  if (userNav && loggedInUser) {
    userNav.innerHTML = `
            <a class="nav-link dropdown-toggle text-warning" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Xin chào, <b>${loggedInUser}</b>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                <li><a class="dropdown-item text-danger" href="#" onclick="logout()">Đăng xuất</a></li>
            </ul>
        `;
  } else if (userNav) {
    userNav.innerHTML = `
            <a class="nav-link" href="login.html">Đăng nhập</a>
        `;
  }
});

// Đăng xuất
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}
