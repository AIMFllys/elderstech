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

/** 关于活动：四大板块（来自立项书） */
export const aboutActivities = [
  {
    title: "返乡摸底调研",
    desc: "组织队员返回家乡，深入养老机构、医院老年科室及老年人家庭，通过问卷调查与深度访谈，系统调研当前医养服务的供给模式与老年人对智慧产品的真实使用体验。",
  },
  {
    title: "开展案例研究",
    desc: "围绕「智慧工具是桥梁还是壁垒」的核心问题，对典型使用场景进行深度案例剖析，形成有深度的案例报告。",
  },
  {
    title: "推动融合创新",
    desc: "启动「智护银龄」辅助工具开发项目，设计并开发面向老年人的智能用药与健康导航轻应用原型，配套适老化图标包、药物分类色卡等实体辅助工具。",
  },
  {
    title: "总结调研发现",
    desc: "在全面调研与案例分析基础上，系统梳理智慧医养服务在基层落地面临的现实矛盾，撰写实践报告，提出具有建设性、可操作性的服务优化与产品改进方案。",
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

/** 功能导航五卡 */
export const navCards = [
  { title: "团队", desc: "团队成员信息", href: "/team", icon: "team" },
  { title: "成果", desc: "调研成果统计与展示", href: "/results", icon: "results" },
  { title: "剪影", desc: "调研图片与视频记录", href: "/gallery", icon: "gallery" },
  { title: "记录", desc: "调研手抄报记录", href: "/records", icon: "records" },
  { title: "反思", desc: "调研反思", href: "/reflection", icon: "reflection" },
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
  },
  {
    name: "何佳欢",
    gender: "女",
    age: 18,
    college: "基础医学院临床医学五年制2505班",
    phone: "14753531433",
    place: "山东省烟台市芝罘区向阳街道",
  },
  {
    name: "丁文轩",
    gender: "女",
    age: 20,
    college: "基础医学院临床医学五年制2405班",
    phone: "18356015183",
    place: "合肥市瑶海区新站高新区瑶海街道",
  },
  {
    name: "赵梓舒",
    gender: "男",
    age: 18,
    college: "基础医学院临床医学五年制2501班",
    phone: "15754873002",
    place: "内蒙古自治区呼和浩特市赛罕区中专路街道",
  },
  {
    name: "李文龙",
    gender: "男",
    age: 19,
    college: "基础医学院儿科2501班",
    phone: "13258602586",
    place: "黑龙江省佳木斯市向阳区永泰社区",
  },
  {
    name: "张星睿",
    gender: "女",
    age: 19,
    college: "药学院药学2402班",
    phone: "18627937077",
    place: "黑龙江省佳木斯市向阳区永红社区",
  },
  {
    name: "罗宇然",
    gender: "女",
    age: 20,
    college: "药学院生药2401",
    phone: "18105488483",
    place: "贵州省黔南州罗甸县沫阳镇跃进村",
  },
  {
    name: "周嘉琦",
    gender: "女",
    age: 18,
    college: "基础医学院临床医学八年制2503班",
    phone: "13707180127",
    place: "武汉市青山区红卫路街道翠园社区",
  },
  {
    name: "孔德羽",
    gender: "男",
    age: 18,
    college: "基础医学院基础医学（强基）2501",
    phone: "15245059981",
    place: "黑龙江省哈尔滨市道里区丽水社区",
  },
  {
    name: "杨静萱",
    gender: "女",
    age: 22,
    college: "基础医学院基医学（强基）2301",
    phone: "13921906688",
    place: "江苏省扬州市扬子津街道桃源社区",
  },
];

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
