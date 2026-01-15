# Mock Server Notes
Hướng dẫn tạo project mock-server bằng *Express*

## 📁 Mục tiêu cấu trúc
```
mock-server/
 ├── server.js
 └── package.json
```

## 1. Tạo thư mục project
```
mkdir mock-server
cd mock-server
```
Lúc này đang ở trong:
```
mock-server/
```

## 2. Khởi tạo package.json
```
npm init -y
```
Kết quả:
```
mock-server/
 └── package.json
```
Nội dung mặc định(ví dụ):
```
{
  "name": "mock-server",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

## 3. Cài dependencies
```
npm install express body-parser
```
Thư mục sau khi cài:
```
mock-server/
 ├── node_modules/
 ├── package-lock.json
 └── package.json
```
## 4. Tạo folder public và thêm file index.html
Cấu trúc sau khi tạo:
```
mock-server/
 ├── server.js
 ├── package.json
 ├── public/
 │    ├── index.html
 └── README.md
```
Thư mục public/ chứa toàn bộ HTML

## 5 Tạo file server.js
```
touch server.js
```
Thêm code:
```
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Parse POST body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static HTML
app.use(express.static(path.join(__dirname, "public")));

// ===== ROUTES =====

/**
 * Page index
 */
 app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Mock server running at http://localhost:${PORT}`);
});
 ```

 ## 6. Sửa package.json cho đúng
 Mở package.json và chỉnh lại:
 ```
 {
  "name": "universal-webview-mock-server",
  "version": "1.0.0",
  "private": true,
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.19.2",
    "body-parser": "^1.20.2"
  }
}
```
main: "server.js" → rõ ràng entry point

## 7. Chạy server
```
npm start
```
Hoặc
```
node server.js
```
👉 Console sẽ in:
```
Mock server running at http://localhost:3000
```

## 8. Test nhanh bằng browser
Mở trình duyệt:
```
http://localhost:3000
```

## 9. Sự cố thường gặp & cách xử lý
```
node: command not found
```

-> Cài Node.js:
https://nodejs.org

```
EADDRINUSE :3000
```
-> Port đang bị chiếm:

```
lsof -i :3000
kill -9 <PID>
```
Hoặc đổi port trong server.js.

```
Android không load http://localhost
```
👉 Dùng:
```
http://10.0.2.2:3000
```

## 10. Tổng kết
```
mkdir mock-server
cd mock-server
npm init -y
npm install express body-parser
```
Thêm server.js → chạy là xong

## Cấu hình để trình duyệt từ reload khi chỉnh sửa
## 1. Trạng thái hiện tại (mặc định)
Đang chạy:
```
node server.js
```
Khi chỉnh sửa server.js:
- ❌ Server không restart

- ❌ Browser không reload

👉 Bạn phải:
```
Ctrl + C
chạy lại node server.js
refresh browser thủ công
```
✅ Cách 1: dùng nodemon

Cài nodemon
```
npm install --save-dev nodemon
```
Sửa package.json
```
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```
Chạy chế độ dev
```
npm run dev
```
👉 Kết quả:
- Sửa server.js → server tự restart
- Refresh browser là thấy code mới
- Browser vẫn phải refresh, nhưng server tự restart

🔥 Cách 2: Tự reload browser (Live Reload)

Nếu bạn muốn browser tự reload luôn (giống frontend dev):

Dùng livereload + connect-livereload
```
npm install --save-dev livereload connect-livereload
```
Sửa server.js
```
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');

// LiveReload server
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(__dirname);

// Inject script
app.use(connectLiveReload());
```
Và trigger reload:
```
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});
```
👉 Kết quả:
- Sửa file → browser tự reload
- Hơi overkill cho mock-server

## Tóm tắt ngắn gọn
- Dùng nodemon → server tự restart
- Browser vẫn F5
- Muốn auto reload browser → thêm livereload (không cần thiết)