<p align="center">
  <h1 align="center">智慧医养赋能计划（Elderstech）</h1>
  <p align="center">
    面向华中科技大学 2025 年度思政课社会实践「返家乡」项目的静态展示网站
    <br />
    聚焦"智慧医养赋能"，围绕"智慧工具是桥梁还是壁垒"的核心议题
    <br />
    <a href="#快速开始">快速开始</a> · <a href="#功能特性">功能特性</a> · <a href="#部署">部署指南</a> · <a href="#开发规范">开发规范</a>
  </p>
</p>

---

## 📖 项目简介

本项目走进养老机构、医院老年科室与老人家庭开展调研，形成「智护银龄」智能用药与健康导航轻应用原型及实践成果展示。

- **研究主题**：智慧医养服务成效与痛点，适老化服务与产品优化建议
- **调研方式**：问卷、访谈、实地走访、案例分析与文献研究
- **实践周期**：2026.01.25 – 2026.02.22
- **上一届基础**：走访 17 家机构、百余份问卷、覆盖 7 万老年人、12 项建议、5 家媒体报道

## ✨ 功能特性

| 页面 | 说明 |
|------|------|
| **首页** | 单页滚动：项目概览、时间线、活动介绍、数据统计、功能导航、团队与页脚 |
| **活动详情** | 实践背景、内容、方案与基础 |
| **成果** | 调研成果统计与类型展示 |
| **剪影** | 调研图片与视频记录 |
| **记录** | 调研手账与手抄报 |
| **反思** | 实践心得与问题凝练 |
| **团队** | 成员与指导教师展示 |
| **应用下载** | 「智护银龄」轻应用原型介绍与下载入口 |

## 🛠️ 技术栈

- **框架**：[Next.js 16](https://nextjs.org/)（App Router，静态导出）
- **语言**：TypeScript（严格模式）
- **样式**：Tailwind CSS
- **动画**：Framer Motion
- **部署**：静态导出（腾讯云 Pages / 宝塔 / 任意静态托管）

## 📋 环境要求

| 项目 | 版本 | 说明 |
|------|------|------|
| **Node.js** | `20.18.0`（锁定） | 通过 `.nvmrc` / `.node-version` / `engines` 三重约束 |
| **包管理器** | **npm**（锁定） | 禁止使用 yarn / pnpm，`preinstall` 脚本自动拦截 |
| **npm 版本** | `>=10.0.0` | Node.js 20.18.0 自带 npm 10.x |

## 🚀 快速开始

```bash
# 克隆仓库
git clone https://github.com/AIMFllys/elderstech.git
cd elderstech

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产产物
npm run build

# 代码检查
npm run lint
```

开发服务器默认运行在 `http://localhost:5223`。

## 📁 目录结构

```
elderstech/
├── app/                 # Next.js App Router 页面
│   ├── layout.tsx       # 根布局
│   ├── page.tsx         # 首页
│   ├── activity/        # 活动详情
│   ├── app-download/    # 应用下载
│   ├── team/            # 团队
│   ├── results/         # 成果
│   ├── gallery/         # 剪影
│   ├── records/         # 记录
│   └── reflection/      # 反思
├── components/          # React 组件
│   ├── layout/          # 布局组件
│   ├── home/            # 首页组件
│   └── ui/              # 通用 UI 组件
├── lib/                 # 工具函数与数据
│   └── data/            # 站点数据（时间线、活动、团队等）
├── public/              # 静态资源
├── docs/                # 项目文档
└── types/               # TypeScript 类型定义
```

## 🚢 部署

### 静态部署

本项目采用 Next.js 静态导出（`output: 'export'`），构建产物位于 `out/` 目录，可直接部署至任意静态托管服务。

### 腾讯云 Pages

| 配置项 | 值 |
|--------|-----|
| **框架预设** | `Next.js` |
| **输出目录** | `out` |
| **编译命令** | `npm run build` |
| **安装命令** | `npm install` |

> **Node.js 版本**：在腾讯云 Pages 环境变量中将 Node 版本设为 `20.18.0`，与项目 `.nvmrc` 保持一致。

## 📏 开发规范

<details>
<summary><b>代码文件行数限制</b></summary>

每个源代码文件（`.ts` / `.tsx` / `.css` / `.mjs`）的有效行数不得超过 **300 行**。

- 超过 300 行的组件必须拆分为多个子模块，放入同名目录并通过 `index.tsx` 统一导出
- 拆分维度建议：类型定义 → 子组件 → 逻辑 Hook → 主组件入口
- 数据文件（`lib/data/*.ts`）同样遵守该限制

</details>

<details>
<summary><b>腾讯云 Pages 兼容要求</b></summary>

#### 构建配置（`next.config.mjs`）

| 配置项 | 值 | 说明 |
|--------|-----|------|
| `output` | `'export'` | 静态导出 |
| `trailingSlash` | `true` | 腾讯云 Pages 需要 `/about/index.html` 形式 |
| `images.unoptimized` | `true` | 静态导出不支持 Image Optimization |

#### 禁止使用的功能

- ❌ API Routes / middleware / ISR
- ❌ Server Components 中的 `fetch` / 数据库访问
- ❌ `next/headers` / `next/cookies`
- ❌ `rewrites` / `redirects`

#### 资源引用

- 静态资源放入 `public/`，通过绝对路径引用
- 字体通过 CDN 加载
- 页面链接使用尾部斜杠（`/gallery/` 而非 `/gallery`）

</details>

<details>
<summary><b>目录与模块拆分</b></summary>

```
components/
  ui/
    story-viewer/          ← 超过 300 行的组件拆为目录模块
      index.tsx            ← 统一导出入口
      types.ts             ← 类型定义与常量
      story-thumbnail.tsx  ← 子组件
      story-content.tsx    ← 子组件
      modal-header.tsx     ← 子组件
      story-viewer-modal.tsx ← 主逻辑组件
```

</details>

## ✅ 检查清单

- [ ] 所有源代码文件行数 ≤ 300 行
- [ ] `npm run build` 无报错，产物位于 `out/`
- [ ] `next.config.mjs` 中 `output: 'export'` 和 `trailingSlash: true` 已配置
- [ ] 未使用 API Routes / middleware / ISR
- [ ] 静态资源通过 `public/` 引用
- [ ] 页面链接使用尾部斜杠
- [ ] Node.js 版本 `20.18.0`，使用 npm

## 📄 License

本项目基于 [MIT License](./LICENSE) 开源。

---

<p align="center">华中科技大学 2025 年度思政课社会实践「返家乡」项目</p>
