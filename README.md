## Nuxt 4 全棧案例模板

基於 Nuxt 4 + Nuxt UI + Tailwind CSS 的全棧示例專案，涵蓋：

- SSR 首頁數據渲染（/api/banner）
- CSR 用戶中心頁面（/api/user）
- 基於 `$fetch` 的 HTTP 封裝層
- Nuxt 官方 Hydration / Performance 最佳實踐

適合用於學習或作為企業級 Nuxt 4 項目的起始模板。

---

## 技術棧

- **框架**：Nuxt 4（Vue 3 + Vite）
- **UI**：[@nuxt/ui](https://ui.nuxt.com) + Tailwind CSS
- **語言**：TypeScript
- **接口 Mock**：Nuxt Server API（Nitro）  
- **部署**：Vercel（預設）、PM2（可選）

---

## 功能特性概覽

### 1. 首頁 SSR + 性能優化

- 路由 `/` 使用 SSR + `useAsyncData` 預取數據
- 接口：`GET /api/banner`
- 頁面文件：
  - [index.vue](file:///e:/Project/template-request/app/pages/index.vue)
  - [hook.ts](file:///e:/Project/template-request/app/pages/hook.ts)

實現重點：

- `useAsyncData('home-banner', () => http.get('/banner'))`  
- 使用穩定 cache key 避免 hydration mismatch  
- 首張 Banner 圖片設置：
  - `fetchpriority="high"`（提高 LCP 資源優先級）
  - `loading="eager"`（首圖立即加載）
  - 其餘圖片 `loading="lazy"`，減少首屏流量
- `routeRules['/'].prerender = true`，首頁在構建時靜態預渲染

### 2. 用戶中心 CSR

- 路由：`/user`
- 接口：`GET /api/user`
- 頁面文件：
  - [user/index.vue](file:///e:/Project/template-request/app/pages/user/index.vue)
  - [user/hook.ts](file:///e:/Project/template-request/app/pages/user/hook.ts)

實現重點：

- 使用 `useFetch('/api/user', { server: false, lazy: true })`
  - **只在瀏覽器發起請求**，不佔用 SSR 資源
  - `lazy` 不阻塞路由導航
- Nuxt UI 組件構建用戶卡片：`UCard`、`UAvatar`、`UBadge`、`UButton`

### 3. HTTP 請求封裝

- 文件： [http.ts](file:///e:/Project/template-request/app/utils/http.ts)

封裝內容：

- 基於 `$fetch` 的通用請求核心
- 統一 `baseURL = '/api'`
- 支持：
  - `http.get<T>(url, query?)`
  - `http.post<T>(url, body?)`
  - `http.put<T>(url, body?)`
  - `http.delete<T>(url, query?)`
- 請求/響應攔截鉤子：
  - `onRequest`：可注入 token 等 header
  - `onResponse`：可統一處理業務 code
  - `onResponseError`：統一錯誤日誌與提示入口

> 封裝層只關注 HTTP 行為，不在其中混入 SSR/CSR 判斷，與 Nuxt 官方最佳實踐一致。

### 4. Server API Mock

路徑：`/server/api`

- [banner.ts](file:///e:/Project/template-request/server/api/banner.ts)
  - `GET /api/banner`
  - 返回首頁 Banner 列表（id / title / image / link）
- [user.ts](file:///e:/Project/template-request/server/api/user.ts)
  - `GET /api/user`
  - 返回用戶基本信息（id / username / nickname / avatar / email / role / balance）

所有接口返回結構遵循：

```ts
interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}
```

---

## 項目結構概覽

```text
e:\Project\template-request
├─ app
│  ├─ app.vue           # 全局佈局 & SEO 配置（useHead）
│  ├─ app.config.ts     # Nuxt UI 配置
│  ├─ pages
│  │  ├─ index.vue      # 首頁（SSR + Banner）
│  │  ├─ hook.ts        # 首頁邏輯 Hook（useAsyncData）
│  │  └─ user
│  │     ├─ index.vue   # 用戶中心頁（CSR）
│  │     └─ hook.ts     # 用戶請求邏輯（useFetch server:false）
│  └─ utils
│     └─ http.ts        # HTTP 請求封裝
├─ server
│  └─ api
│     ├─ banner.ts      # Banner 模擬接口
│     └─ user.ts        # 用戶模擬接口
├─ nuxt.config.ts       # Nuxt 配置（routeRules、NuxtLink 預取等）
├─ ecosystem.config.js  # PM2 啟動配置
├─ vercel.json          # Vercel 部署配置
└─ package.json
```

---

## 安裝與啟動

專案使用 `pnpm` 作為包管理器（見 `package.json` 中的 `packageManager`）。

### 1. 安裝依賴

```bash
pnpm install
```

### 2. 開發環境

啟動開發服務（預設 `http://localhost:3000`）：

```bash
pnpm dev
```

### 3. 構建與本地預覽

構建生產版本：

```bash
pnpm build
```

本地預覽生產構建：

```bash
pnpm preview
```

---

## Nuxt 最佳實踐落地

本專案按 Nuxt 官方文檔實踐了多項最佳實踐：

### Hydration（同構渲染安全）

- SSR 數據通過 `useAsyncData` / `useFetch` 管理，避免用 `$fetch` 直接在 `setup` 裡重複請求。
- 所有影響模板輸出的數據都來自可重放的來源（接口 / `useState`），沒有直接使用 `Math.random()` / `new Date()` 等非穩定輸出。
- 避免在服務端調用瀏覽器專屬 API（`window`、`localStorage` 等）。

### Performance（性能）

- 首頁 `/`：
  - `routeRules['/'].prerender = true`，構建期預渲染，首屏更快。
  - 首張 Banner 圖片 `fetchpriority="high"` + `loading="eager"` 作為 LCP 重點優化。
- 路由預取：
  - 在 `nuxt.config.ts` 中將 `<NuxtLink>` 的 `prefetchOn` 設置為 `"interaction"`，避免首屏過度預取 JS。
- CSR 頁面：
  - 用戶頁使用 `useFetch({ server: false })`，避免不必要的 SSR 請求，減少服務端壓力。

---

## 部署說明

### 1. Vercel 部署

根目錄包含 `vercel.json`，可直接在 Vercel 專案中導入此倉庫進行部署。

核心步驟：

1. 將倉庫推送到 GitHub / GitLab。
2. 在 Vercel 後台「Import Project」選擇本倉庫。
3. 構建命令：`pnpm build`，輸出目錄 `.output/public`（默認由 Nuxt 處理）。

### 2. PM2 部署（Node 伺服器）

專案提供了 `ecosystem.config.js`，可用於在伺服器上通過 PM2 啟動 Nuxt 應用。

基本流程：

```bash
pnpm install
pnpm build

# 使用 PM2 啟動
pm2 start ecosystem.config.js
```

配置中已指定對應的 `PORT`（例如 `3004`），可按需調整。

---

## 適用場景

- 想快速搭建一個帶有 **SSR 首頁 + CSR 子頁** 的 Nuxt 4 全棧樣板。
- 希望參考 **Nuxt 官方 Hydration / Performance 最佳實踐** 的實戰代碼。
- 需要一個內建 Nuxt UI + Tailwind CSS 的乾淨起始專案。

你可以在此基礎上擴展認證、實際後端服務、更多業務模塊等，作為完整的企業級 Nuxt 4 專案基礎骨架。
