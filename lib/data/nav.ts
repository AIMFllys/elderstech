/** 功能导航五卡 */
export const navCards = [
  { title: "团队", desc: "团队成员信息", href: "/team", icon: "team" },
  { title: "成果", desc: "调研成果统计与展示", href: "/results", icon: "results" },
  { title: "剪影", desc: "调研图片与视频记录", href: "/gallery", icon: "gallery" },
  { title: "记录", desc: "调研手抄报记录", href: "/records", icon: "records" },
  { title: "反思", desc: "调研反思", href: "/reflection", icon: "reflection" },
];

export const navTimelineIntro =
  "围绕团队、成果、剪影、记录与反思，构建完整的调研成果导航体系。";

export const navTimelineItems = [
  {
    id: 1,
    title: "团队",
    date: "成员信息",
    content: "呈现指导教师与成员构成，展示跨学科协作优势。",
    category: "Team",
    icon: "users",
    relatedIds: [2],
    status: "completed" as const,
    energy: 85,
  },
  {
    id: 2,
    title: "成果",
    date: "数据统计",
    content: "汇总调研走访、问卷与报告成果。",
    category: "Results",
    icon: "bar",
    relatedIds: [1, 3],
    status: "in-progress" as const,
    energy: 70,
  },
  {
    id: 3,
    title: "剪影",
    date: "影像记录",
    content: "记录走访、访谈与产品共创现场。",
    category: "Gallery",
    icon: "camera",
    relatedIds: [2, 4],
    status: "pending" as const,
    energy: 60,
  },
  {
    id: 4,
    title: "记录",
    date: "手账档案",
    content: "收录电子手账与调研纪要。",
    category: "Records",
    icon: "book",
    relatedIds: [3, 5],
    status: "pending" as const,
    energy: 45,
  },
  {
    id: 5,
    title: "反思",
    date: "实践心得",
    content: "凝练调研反思与青年方案。",
    category: "Reflection",
    icon: "light",
    relatedIds: [4],
    status: "pending" as const,
    energy: 35,
  },
];
