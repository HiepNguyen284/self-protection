const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();

// Giới hạn số lần yêu cầu cho mỗi IP
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 phút
  max: 2, // tối đa 100 yêu cầu trong 15 phút
  message: 'Quá nhiều yêu cầu từ IP này, vui lòng thử lại sau',
  handler: (req, res, next) => {
    console.log(`Địa chỉ IP ${req.ip} đã vượt quá số lượng yêu cầu. Tính năng bảo vệ đã được kích hoạt.`);
    res.status(429).send('Bạn đã bị tạm thời chặn vì gửi quá nhiều yêu cầu.');
  }
});

// Áp dụng rate limiter cho tất cả các yêu cầu
app.use(limiter);

app.set('trust proxy', false);

// Để xử lý các yêu cầu của người dùng
app.get('/', (req, res) => {
  res.send('Chào mừng bạn đến với trang web!');
});

// Lắng nghe trên port 3000
app.listen(3000, () => {
  console.log('Server đang chạy trên port 3000');
});