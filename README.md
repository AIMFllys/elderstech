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
- 可直接部署至宝塔或任意静态托管
