/** 时间线阶段（对应社会实践具体安排） */
export const timelinePhases = [
  {
    id: 1,
    name: "准备启动",
    status: "complete" as const,
    date: "1.25-1.27",
    desc: "召开线上培训会，统一调研标准与方法。",
  },
  {
    id: 2,
    name: "分散调研与同步开发",
    status: "in-progress" as const,
    date: "1.27-2.17",
    desc: "成员返乡开展为期三周的实地调研，提交日志；开发组同步推进应用原型与产品设计。",
  },
  {
    id: 3,
    name: "集中分析",
    status: "pending" as const,
    date: "2.17-2.20",
    desc: "进行数据汇总与案例分析，分工撰写报告。",
  },
  {
    id: 4,
    name: "成果总结",
    status: "pending" as const,
    date: "2.21-2.22",
    desc: "完成报告统稿、润色与排版，完善应用原型及相关成果设计。",
  },
];

/** 主脉络：按钮点击展示的图片 */
export const timelineModalImages = {
  seeHowItWorks: "https://husteread.com/storage/files/elderstech/PPT/07.png",
  getStarted: "https://husteread.com/storage/files/elderstech/PPT/011.png",
};

export const timelineSummary =
  "集中指导、分散调研，成员返乡开展实地调研，开发组同步推进应用原型与产品设计。";

export const timelineMapImage =
  "https://images.unsplash.com/photo-1502920514313-52581002a659?auto=format&fit=crop&w=1200&q=80";

export const timelineMilestones = [
  {
    id: 1,
    name: "准备启动",
    status: "complete" as const,
    position: { top: "70%", left: "5%" },
  },
  {
    id: 2,
    name: "分散调研",
    status: "in-progress" as const,
    position: { top: "25%", left: "22%" },
  },
  {
    id: 3,
    name: "集中分析",
    status: "pending" as const,
    position: { top: "48%", left: "55%" },
  },
  {
    id: 4,
    name: "成果总结",
    status: "pending" as const,
    position: { top: "12%", right: "8%" },
  },
];
