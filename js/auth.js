// Xử lý đăng ký
function register(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  localStorage.setItem("username", username);
  localStorage.setItem("password", password);
  alert("Đăng ký thành công!");
  window.location.href = "login.html";
}

// Xử lý đăng nhập
function login(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const savedUser = localStorage.getItem("username");
  const savedPass = localStorage.getItem("password");

  if (username === savedUser && password === savedPass) {
    localStorage.setItem("loggedInUser", username);
    alert("Đăng nhập thành công!");
    window.location.href = "index.html";
  } else {
    alert("Sai tên đăng nhập hoặc mật khẩu");
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
