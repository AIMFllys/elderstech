# 智慧医养赋能计划（Elderstech）

面向华中科技大学 2025 年度思政课社会实践「返家乡」项目的静态展示网站。项目聚焦“智慧医养赋能”，围绕“智慧工具是桥梁还是壁垒”的核心议题，走进养老机构、医院老年科室与老人家庭开展调研，并形成「智护银龄」智能用药与健康导航轻应用原型及实践成果展示。

## 项目要点

- **研究主题**：智慧医养服务成效与痛点，适老化服务与产品优化建议
- **调研方式**：问卷、访谈、实地走访、案例分析与文献研究
- **实践周期**：2026.01.25–2026.02.22（准备启动、分散调研、集中分析、成果总结）
- **上一届基础**：走访 17 家机构、完成百余份问卷、覆盖 7 万老年人、提出 12 项建议、获 5 家媒体报道

## 主要页面

- **首页**：单页滚动，包含项目概览、时间线、活动介绍、数据统计、功能导航、团队与页脚
- **活动详情**：实践背景、内容、方案与基础
- **成果**：调研成果统计与类型展示
- **剪影**：调研图片与视频记录
- **记录**：调研手账与手抄报要求说明
- **反思**：实践心得与问题凝练
- **团队**：成员与指导教师展示
- **应用下载**：「智护银龄」轻应用原型介绍与下载入口

## 数据入口

- 站点与项目简介：[site](file:///d:/project/old_and_new/elderstech/lib/data/site.ts)
- 时间线与路线图：[timeline](file:///d:/project/old_and_new/elderstech/lib/data/timeline.ts)
- 活动与方法：[about](file:///d:/project/old_and_new/elderstech/lib/data/about.ts)
- 实践内容：[activity](file:///d:/project/old_and_new/elderstech/lib/data/activity.ts)
- 数据统计：[stats](file:///d:/project/old_and_new/elderstech/lib/data/stats.ts)
- 功能导航：[nav](file:///d:/project/old_and_new/elderstech/lib/data/nav.ts)
- 团队信息：[team](file:///d:/project/old_and_new/elderstech/lib/data/team.ts)
- 页脚信息：[footer](file:///d:/project/old_and_new/elderstech/lib/data/footer.ts)

## 技术栈

- Next.js 14（App Router）
- TypeScript（严格模式）
- Tailwind CSS
- 静态导出部署（适配宝塔）

## 目录结构

```
app/
  layout.tsx
  page.tsx
  activity/
  app-download/
  team/
  results/
  gallery/
  records/
  reflection/
components/
  layout/
  home/
  ui/
lib/
  data/
docs/
```

## 开发与构建

```bash
npm install
npm run dev
npm run build
npm run lint
```

## 部署

- 静态构建产物位于 `out/`
- 可直接部署至宝塔、腾讯云 Pages 或任意静态托管

---

## 项目开发规范与部署要求

### 一、代码文件行数限制

**每个源代码文件（`.ts` / `.tsx` / `.css` / `.mjs`）的有效行数不得超过 300 行。**

- 超过 300 行的组件必须拆分为多个子模块，放入同名目录并通过 `index.tsx` 统一导出
- 拆分维度建议：类型定义 → 子组件 → 逻辑 Hook → 主组件入口
- 数据文件（`lib/data/*.ts`）同样遵守该限制，过长时按领域拆分

### 二、腾讯云 Pages 完美兼容要求

本项目采用 **Next.js 静态导出（`output: 'export'`）** 模式，构建产物为纯静态 HTML/CSS/JS，可直接部署至腾讯云 Pages。为确保完美兼容，必须遵守以下规则：

#### 1. 构建配置（`next.config.mjs`）

| 配置项 | 值 | 说明 |
|--------|-----|------|
| `output` | `'export'` | 静态导出，生成 `out/` 目录 |
| `trailingSlash` | `true` | **必须开启**——腾讯云 Pages 需要 `/about/index.html` 形式的路径匹配 |
| `images.unoptimized` | `true` | 静态导出不支持 Next.js Image Optimization API |
| `poweredByHeader` | `false` | 减小响应头体积 |
| `compress` | `true` | 启用 gzip 压缩 |

#### 2. 禁止使用的 Next.js 功能

以下功能在静态导出 + 腾讯云 Pages 环境中**不可用**：

- ❌ `next/image` 的 `loader` / 远程图片优化（已设置 `unoptimized: true`，使用原生 `<img>` 即可）
- ❌ API Routes（`app/api/`）——纯静态托管无服务端
- ❌ Server Components 中的 `fetch` / 数据库访问——无运行时服务端
- ❌ `middleware.ts`——静态托管不执行中间件
- ❌ `rewrites` / `redirects`——需改用腾讯云 Pages 的路由规则配置
- ❌ `next/headers` / `next/cookies`——无服务端上下文
- ❌ Incremental Static Regeneration（ISR）——纯静态无重新验证机制

#### 3. 资源引用规范

- 静态资源统一放入 `public/` 目录，通过绝对路径（`/images/xxx.png`）引用
- 字体通过 CDN 加载（当前使用 `fonts.loli.net`），布局中已配置 `preconnect` + `dns-prefetch`
- 避免使用 `fs`、`path` 等 Node.js 模块——构建阶段可用，运行时不存在

#### 4. 路由与链接

- 所有页面路由在 `app/` 目录下以 `page.tsx` 形式定义
- 页面间跳转使用 `<Link href="/xxx">` 或原生 `<a href="/xxx/">`（注意尾部斜杠）
- 动态路由（如 `[id]`）需配合 `generateStaticParams` 预生成所有页面

#### 5. 部署流程

```bash
# 1. 安装依赖
npm install

# 2. 构建静态产物
npm run build

# 3. 产物目录
# out/ ← 将此目录上传至腾讯云 Pages
```

腾讯云 Pages 配置：
- **框架预设**：Next.js
- **构建命令**：`npm run build`
- **输出目录**：`out`
- **Node.js 版本**：18+（推荐 20.x）

#### 6. 性能优化建议

- `framer-motion`、`lucide-react`、`react-icons` 已配置 `optimizePackageImports` 以减少打包体积
- 字体加载带有 `display=swap`，不阻塞首屏渲染
- 所有页面均为静态生成，首次加载即为完整 HTML，有利于 SEO 和 CDN 缓存
- 暗色模式采用内联脚本预判，避免 FOUC（Flash of Unstyled Content）

### 三、目录与模块拆分规范

```
components/
  ui/
    story-viewer/          ← 超过 300 行的组件拆分为目录模块
      index.tsx            ← 统一导出入口
      types.ts             ← 类型定义与常量
      story-thumbnail.tsx  ← 子组件
      story-content.tsx    ← 子组件
      modal-header.tsx     ← 子组件
      story-viewer-modal.tsx ← 主逻辑组件
```

- 单个组件文件超过 300 行时，**必须重构**为目录模块
- 目录内各文件职责单一，通过 `index.tsx` 对外暴露公共 API
- 类型定义（`types.ts`）与组件实现分离，避免循环依赖

### 四、检查清单

开发完成后，请逐项确认：

- [ ] 所有源代码文件行数 ≤ 300 行
- [ ] `npm run build` 无报错，产物生成在 `out/` 目录
- [ ] `next.config.mjs` 中 `output: 'export'` 和 `trailingSlash: true` 已配置
- [ ] 未使用 API Routes、middleware、ISR 等不兼容特性
- [ ] 静态资源通过 `public/` 目录引用，无 Node.js 运行时依赖
- [ ] 页面链接使用尾部斜杠（`/gallery/` 而非 `/gallery`）
- [ ] 腾讯云 Pages 部署测试通过，所有路由可正常访问
