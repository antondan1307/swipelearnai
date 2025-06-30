# 🔑 Hướng dẫn thiết lập API Keys

## 1. Lấy Perplexity API Key

### Bước 1: Tạo tài khoản Perplexity
1. Truy cập [Perplexity AI](https://www.perplexity.ai/)
2. Đăng ký tài khoản mới hoặc đăng nhập
3. Vào phần **Settings** > **API**

### Bước 2: Tạo API Key
1. Nhấp vào **"Create API Key"**
2. Đặt tên cho key (ví dụ: "SwipeLearn-AI")
3. Copy API key được tạo

### Bước 3: Thêm vào dự án
1. Tạo file `.env.local` trong thư mục gốc của dự án
2. Thêm dòng sau:
```env
PERPLEXITY_API_KEY=pplx-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 2. Thiết lập Firebase (Tùy chọn)

### Bước 1: Tạo Firebase Project
1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Tạo project mới
3. Kích hoạt Authentication và Firestore

### Bước 2: Lấy config
1. Vào **Project Settings** > **General**
2. Scroll xuống phần **"Your apps"**
3. Nhấp **"Web app"** và copy config

### Bước 3: Thêm vào .env.local
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 3. Chạy ứng dụng

```bash
npm run dev
```

## 4. Kiểm tra kết nối

Sau khi thêm API key, bạn có thể test bằng cách:
1. Vào trang **"Tải lên"**
2. Nhập một đoạn text mẫu
3. Tạo flashcard để kiểm tra API hoạt động

## 🚨 Lưu ý bảo mật

- **KHÔNG BAO GIỜ** commit file `.env.local` lên Git
- **KHÔNG** chia sẻ API key với người khác
- Sử dụng environment variables cho production
- Thường xuyên rotate API keys

## 💰 Chi phí Perplexity API

- **Free tier**: 5 requests/month
- **Pro**: $20/month cho 5,000 requests
- **Enterprise**: Liên hệ để biết giá

## 🔧 Troubleshooting

### Lỗi "API Key not found"
- Kiểm tra file `.env.local` có tồn tại
- Đảm bảo tên biến đúng: `PERPLEXITY_API_KEY`
- Restart development server

### Lỗi "Unauthorized"
- Kiểm tra API key có đúng không
- Đảm bảo account Perplexity còn credits
- Kiểm tra API key chưa bị revoke

### Lỗi "Rate limit exceeded"
- Đợi một lúc rồi thử lại
- Upgrade plan Perplexity nếu cần
- Implement caching để giảm requests