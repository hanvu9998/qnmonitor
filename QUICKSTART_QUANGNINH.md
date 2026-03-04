# Quick Start - Quảng Ninh Monitor

## Bắt đầu nhanh (5 phút)

### 1️⃣ Cài đặt Dependencies
```bash
cd worldmonitor
npm install --legacy-peer-deps
```

### 2️⃣ Chạy Development Server
```bash
npm run dev:quangninh
```
> Trang sẽ mở ở `http://localhost:5173/` với Quảng Ninh Monitor variant

### 3️⃣ Build Production
```bash
npm run build:quangninh
```
> Output: `dist/` folder - sẵn sàng deploy

---

## Kiến Trúc Variant

```
WorldMonitor (Main App)
├── Full Variant (worldmonitor.app) - Geopolitical/Global
├── Tech Variant (tech.worldmonitor.app) - Tech & AI
├── Finance Variant (finance.worldmonitor.app) - Markets
├── Happy Variant (happy.worldmonitor.app) - Positive News
└── ✨ Quảng Ninh Variant (NEW!) - Regional Monitoring
```

---

## Files Thay Đổi

| File | Thay Đổi |
|------|---------|
| `src/config/variants/quangninh.ts` | ✨ NEW - Cấu hình Quảng Ninh |
| `src/config/quangninh-feeds.ts` | ✨ NEW - RSS feeds |
| `package.json` | ➕ Scripts `dev:quangninh`, `build:quangninh` |
| `vite.config.ts` | ➕ Metadata cho variant mới |
| `src/config/variant.ts` | ➕ Hỗ trợ `quangninh` variant |
| `src/config/panels.ts` | ➕ Panel config cho Quảng Ninh |

---

## Làm Gì Tiếp?

### Để chạy localhost:
```bash
npm run dev:quangninh
# Mở browser → http://localhost:5173
```

### Để deploy:
```bash
npm run build:quangninh
# Upload `dist/` folder lên server
```

### Để test các variant khác:
```bash
npm run dev              # Default (Full geopolitical)
npm run dev:tech        # Tech variant
npm run dev:finance     # Finance variant
npm run dev:happy       # Happy variant
```

---

## Điều Chỉnh Feeds

Chỉnh sửa `src/config/quangninh-feeds.ts`:

```typescript
export const QUANGNINH_FEEDS = {
  general: [
    // Thêm/xoá sources ở đây
    { name: 'Tên Báo', url: rss('https://...'), lang: 'vi' },
  ],
  // ... thêm categories khác
};
```

---

## Trợ Giúp

- TypeScript errors? Run: `npm run typecheck`
- Build issues? Try: `npm ci && npm run build:quangninh`
- Dev server not responding? Restart: `npm run dev:quangninh`

---

**Bước 1 hoàn tất! 🎉**

**Tiếp theo:** Bước 2 - UI tuning & Bước 3 - Production deployment
