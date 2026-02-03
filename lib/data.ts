/** 站点内容数据，与 docs/社会实践 一致 */

export const site = {
  title: "智慧医养赋能计划",
  teamName: "桑梓智护  心驿耆年",
  projectIntro:
    "探索智慧工具给老年群体带来的双重影响与解决方案，深入养老机构、医院老年科室及老年人家庭开展调研，开发「智护银龄」智能用药与健康导航轻应用原型，为构建中国特色立体化智慧医养服务体系建言献策。",
  logoUrl:
    "http://husteread.com/wp-content/uploads/2025/11/cropped-jimeng-2025-11-26-2200-将图片调整为512x512像素.png",
};

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

export const aboutIntro =
  "以积极应对人口老龄化国家战略为指引，我们聚焦老年群体真实需求，结合问卷、访谈与实地走访，评估智慧医养服务的成效与痛点，探索“智慧工具是桥梁还是壁垒”的核心议题，最终形成适老化服务与产品改进的青年方案。";

export const aboutServiceItems = [
  {
    icon: "survey",
    title: "返乡摸底调研",
    description:
      "走进养老机构、医院老年科室与老人家庭，收集医养服务供给、智慧产品体验与需求痛点。",
    position: "left",
  },
  {
    icon: "case",
    title: "开展案例研究",
    description:
      "追踪典型场景下的学习与使用过程，梳理智慧工具带来的支持与障碍。",
    position: "left",
  },
  {
    icon: "prototype",
    title: "推动融合创新",
    description:
      "开发“智护银龄”轻应用原型与适老化图标包、药物色卡等辅助工具。",
    position: "left",
  },
  {
    icon: "analysis",
    title: "集中分析研判",
    description:
      "对调研数据进行归纳与对比，形成案例报告与关键问题清单。",
    position: "right",
  },
  {
    icon: "proposal",
    title: "贡献青年方案",
    description:
      "提出可操作的服务优化建议，助力构建中国特色智慧医养体系。",
    position: "right",
  },
  {
    icon: "impact",
    title: "成果传播转化",
    description:
      "以报告、图文与视频等形式传播实践成果，推动社会认知与持续改进。",
    position: "right",
  },
];

export const aboutImage =
  "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&w=800&q=80";

export const aboutCta = {
  title: "立即开始了解",
  description: "点击进入活动详情页，查看调研流程、方法与阶段成果。",
};

export const activitySections = [
  {
    title: "选题背景与意义",
    desc: "我国老龄化程度快速加深，医养服务需求与供给矛盾凸显。智慧医养在带来新工具的同时也可能形成新的“数字鸿沟”。本项目围绕老年群体真实需求，探索医养融合的可行路径。",
  },
  {
    title: "实践主要内容",
    desc: "返乡摸底调研、开展案例研究、推动融合创新、总结调研发现，最终形成实践报告与适老化产品原型。",
  },
  {
    title: "实践具体方案",
    desc: "时间为2026年1月25日至2月22日，覆盖湖北、黑龙江、安徽、山东、河北、内蒙古、贵州等地，综合运用问卷、访谈、实地走访与文献研究。",
  },
  {
    title: "已有实践基础",
    desc: "上一届实践走访17家机构，完成百余份问卷，覆盖7万老年人，提出12项建议，形成4份专项建议函，并获5家媒体报道。",
  },
];

/** 数据统计（来自立项书已有实践基础） */
export const stats = [
  { label: "走访机构", value: "17", suffix: "家", desc: "合肥、如皋、武汉三地" },
  { label: "完成问卷", value: "百余", suffix: "份", desc: "上一届实践" },
  { label: "覆盖老年人", value: "7", suffix: "万", desc: "服务对象" },
  { label: "提出建议", value: "12", suffix: "项", desc: "形成4份专项建议函" },
  { label: "媒体报道", value: "5", suffix: "家", desc: "服务获报道" },
];

export const statsIntro =
  "上一届实践基础：走访多地机构，完成问卷与访谈，形成报告与可执行建议。";

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

/** 团队成员（来自 docs/社会实践/团队名单.md） */
export interface TeamMember {
  name: string;
  role?: string;
  gender: string;
  age: number;
  college: string;
  phone: string;
  place: string;
  avatar: string;
}

export const teamMembers: TeamMember[] = [
  {
    name: "杨佳怡",
    role: "负责人",
    gender: "女",
    age: 19,
    college: "基础医学院临床医学五年制2401班",
    phone: "18134035361",
    place: "河北省张家口市康保县永康社区",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "何佳欢",
    gender: "女",
    age: 18,
    college: "基础医学院临床医学五年制2505班",
    phone: "14753531433",
    place: "山东省烟台市芝罘区向阳街道",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "丁文轩",
    gender: "女",
    age: 20,
    college: "基础医学院临床医学五年制2405班",
    phone: "18356015183",
    place: "合肥市瑶海区新站高新区瑶海街道",
    avatar:
      "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "赵梓舒",
    gender: "男",
    age: 18,
    college: "基础医学院临床医学五年制2501班",
    phone: "15754873002",
    place: "内蒙古自治区呼和浩特市赛罕区中专路街道",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "李文龙",
    gender: "男",
    age: 19,
    college: "基础医学院儿科2501班",
    phone: "13258602586",
    place: "黑龙江省佳木斯市向阳区永泰社区",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "张星睿",
    gender: "女",
    age: 19,
    college: "药学院药学2402班",
    phone: "18627937077",
    place: "黑龙江省佳木斯市向阳区永红社区",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "罗宇然",
    gender: "女",
    age: 20,
    college: "药学院生药2401",
    phone: "18105488483",
    place: "贵州省黔南州罗甸县沫阳镇跃进村",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "周嘉琦",
    gender: "女",
    age: 18,
    college: "基础医学院临床医学八年制2503班",
    phone: "13707180127",
    place: "武汉市青山区红卫路街道翠园社区",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "孔德羽",
    gender: "男",
    age: 18,
    college: "基础医学院基础医学（强基）2501",
    phone: "15245059981",
    place: "黑龙江省哈尔滨市道里区丽水社区",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
  },
  {
    name: "杨静萱",
    gender: "女",
    age: 22,
    college: "基础医学院基医学（强基）2301",
    phone: "13921906688",
    place: "江苏省扬州市扬子津街道桃源社区",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=80",
  },
];

export const teamIntro =
  "基础医学院与药学院本科生组成，兼具医学与计算机背景，聚焦智慧医养真实需求。";

export const instructors = [
  { name: "田德生", title: "基础医学院党委副书记", research: "思想政治教育" },
  { name: "王 卉", title: "基础医学院团委书记", research: "大学生思想政治教育" },
  { name: "刘诗雅", title: "无", research: "无" },
];

/** 页脚信息（主脉络规定） */
export const footer = {
  project: "华中科技大学2025年度思政课社会实践「返家乡」项目",
  projectName: "桑梓智护，心驿耆年——智慧医养赋能计划",
  specialName: "普通专项三：家乡民生温度提升观察",
  college: "基础医学院",
  instructors: "田德生 王卉 刘诗雅",
  leader: "杨佳怡",
  tech: "孔德羽",
  email: "Hi@yusheng.email",
  qq: "2158858577",
  personalUrl: "https://yusheng.husteread.com",
  github: "AIMFllys",
  githubUrl: "https://github.com/AIMFllys/elderstech",
  disclaimer:
    "网站如有侵权请告知，网站内容为华科活动项目展示网站，网站内容开源。",
  logoHust:
    "http://husteread.com/wp-content/uploads/2026/01/华中科技大学.png",
  logoTongji:
    "https://ts1.tc.mm.bing.net/th/id/OIP-C.cec2gr3VkKoczOk5EsNcRQHaHM?rs=1&pid=ImgDetMain&o=7&rm=3",
  iconEmail: "http://husteread.com/wp-content/uploads/2026/01/短信.png",
  iconQQ: "http://husteread.com/wp-content/uploads/2026/01/QQ.png",
};
