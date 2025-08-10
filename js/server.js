const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Đường dẫn đến file users.json
const usersFilePath = path.join(__dirname, "users.json");

// Khởi tạo users.json nếu chưa tồn tại
if (!fs.existsSync(usersFilePath)) {
  fs.writeFileSync(usersFilePath, JSON.stringify([]));
}

// API đăng ký
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Đọc danh sách người dùng
  const users = JSON.parse(fs.readFileSync(usersFilePath));

  // Kiểm tra xem tên đăng nhập đã tồn tại chưa
  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });
  }

  // Thêm người dùng mới
  users.push({ username, password });
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  res.status(200).json({ message: "Đăng ký thành công" });
});

// API đăng nhập
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFilePath));

  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    res.status(200).json({ message: "Đăng nhập thành công", username });
  } else {
    res.status(401).json({ message: "Sai tên đăng nhập hoặc mật khẩu" });
  }
});

// Phục vụ các file tĩnh (HTML, CSS, JS)
app.use(express.static("public"));

// Khởi động server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
