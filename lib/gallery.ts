import type { MediaItemType } from "@/types";

export const galleryArcImages = [
  "/assets/gallery/images/arc-01.jpg",
  "/assets/gallery/images/arc-02.jpg",
  "/assets/gallery/images/arc-03.jpg",
  "/assets/gallery/images/arc-04.jpg",
  "/assets/gallery/images/arc-05.jpg",
  "/assets/gallery/images/arc-06.jpg",
  "/assets/gallery/images/arc-07.jpg",
  "/assets/gallery/images/arc-08.jpg",
  "/assets/gallery/images/arc-09.jpg",
  "/assets/gallery/images/arc-10.jpg",
];

export const galleryMediaItems: MediaItemType[] = [
  {
    id: 1,
    type: "image",
    title: "养老机构走访",
    desc: "记录机构医疗护理与适老化设施",
    url: "/assets/gallery/images/gallery-01.jpg",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 2,
    type: "video",
    title: "社区访谈",
    desc: "倾听老人对智慧产品的真实反馈",
    url: "/assets/gallery/videos/gallery-02.mp4",
    span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 3,
    type: "image",
    title: "医疗场景观察",
    desc: "慢病管理与随访的实际流程",
    url: "/assets/gallery/images/gallery-03.jpg",
    span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 4,
    type: "image",
    title: "调研小组讨论",
    desc: "集中分析与案例复盘",
    url: "/assets/gallery/images/gallery-04.jpg",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 5,
    type: "video",
    title: "产品共创",
    desc: `"智护银龄"原型推进记录`,
    url: "/assets/gallery/videos/gallery-05.mp4",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 6,
    type: "image",
    title: "入户家访",
    desc: "记录使用障碍与改进方向",
    url: "/assets/gallery/images/gallery-06.jpg",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 7,
    type: "video",
    title: "社区健康点",
    desc: "智慧设备在基层的应用",
    url: "/assets/gallery/videos/gallery-07.mp4",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
];
