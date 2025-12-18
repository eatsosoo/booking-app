# DyHome

**DyHome** là một ứng dụng đặt lịch trực tuyến được xây dựng với **Nuxt 4** và **Bun**, giúp người dùng dễ dàng quản lý các lịch đặt, tối ưu hiệu suất và trải nghiệm mượt mà trên web.

## 📦 Công nghệ sử dụng

- **Frontend & SSR**: [Nuxt 4](https://nuxt.com/)
- **Runtime & Package Manager**: [Bun](https://bun.sh/)
- **CSS Framework**: TailwindCSS (tùy chỉnh theo dự án)
- **Icons**: Font Awesome
- **Quản lý trạng thái**: Pinia hoặc composables Nuxt (tùy nhu cầu)
- **Code Linting & Formatting**: ESLint, Prettier
- **Git commit convention**: [Conventional Commits](https://www.conventionalcommits.org/)

## ⚡ Cài đặt và chạy project

1. **Cài Bun** (nếu chưa có):

```bash
curl -fsSL https://bun.sh/install | bash
```

2. **Cài đặt dependencies**:

```bash
bun install
```

3. **Chạy project ở môi trường phát triển**:

```bash
bun dev
```

4. **Build cho production**:

```bash
bun build
```

5. **Chạy server production**:

```bash
bun start
```

## 🗂 Cấu trúc thư mục

```
booking-app/
│
├─ app/                   # Thư mục chính Nuxt app
│   ├─ components/        # Components UI
│   ├─ pages/             # Pages Nuxt
│   ├─ layouts/           # Layouts
│   ├─ plugins/           # Plugins
│   └─ assets/            # CSS, images, fonts
│
├─ server/                # API hoặc server-side code (nếu có)
├─ public/                # Files public
├─ bun.lockb              # Bun lockfile
├─ nuxt.config.ts         # Config Nuxt 4
└─ package.json
```

## 🧹 Quy chuẩn viết commit

Chúng tôi tuân theo chuẩn **Conventional Commits** để dễ dàng quản lý lịch sử git và tạo changelog tự động.

**Cấu trúc cơ bản**:

```
<type>(<scope>): <subject>
```

### Các loại commit phổ biến

| Type         | Khi nào dùng                                     |
| ------------ | ------------------------------------------------ |
| **feat**     | Thêm tính năng mới                               |
| **fix**      | Sửa lỗi                                          |
| **docs**     | Chỉ chỉnh sửa tài liệu                           |
| **style**    | Chỉ thay đổi format, space, dấu chấm phẩy        |
| **refactor** | Thay đổi code nhưng không thêm tính năng/sửa lỗi |
| **perf**     | Cải thiện hiệu suất                              |
| **test**     | Thêm hoặc chỉnh sửa test                         |
| **chore**    | Các công việc khác (build, configs, scripts...)  |

**Ví dụ commit hợp lệ**:

```bash
git commit -m "feat(auth): add login with Google OAuth"
git commit -m "fix(booking): correct timezone issue"
git commit -m "docs(readme): update setup instructions"
```

---

## 📌 Lời khuyên

- Luôn tạo branch riêng khi phát triển tính năng mới:

```bash
git checkout -b feat/add-new-feature
```

- Kiểm tra code format trước khi commit:

```bash
bun lint
bun format
```
