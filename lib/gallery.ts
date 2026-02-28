import { MediaItemType } from "@/components/ui/interactive-bento-gallery";

const rawFiles = [
  "何佳欢_8-1.jpg",
  "何佳欢_8-2.jpg",
  "何佳欢_8-3.jpg",
  "周嘉琪_1-1.jpg",
  "周嘉琪_1-2.jpg",
  "周嘉琪_1-3.jpg",
  "周嘉琪_1-4.jpg",
  "周嘉琪_1-5 地点照片.jpg",
  "周嘉琪_1-6 医院门口照片.jpg",
  "周嘉琪_1.jpg",
  "孔德羽开发记录1.png",
  "孔德羽开发记录2.png",
  "孔德羽开发记录3.png",
  "孔德羽开发记录4.png",
  "孔德羽开发记录5.png",
  "张星睿_3-1.jpg",
  "张星睿_3-2.jpg",
  "张星睿_3-3.jpg",
  "张星睿_3-4 老年人照片.jpg",
  "张星睿_3-5 老年人照片.jpg",
  "李文龙_4-1.jpg",
  "杨佳怡_6-1.jpg",
  "杨佳怡_6-2.jpg",
  "杨佳怡_6-3.jpg",
  "杨佳怡_6-4.jpg",
  "杨佳怡_6-5.jpg",
  "杨静萱_7-1.jpg",
  "杨静萱_7-2.jpg",
  "杨静萱_7-3 视频.mp4",
  "罗宇然_5-1.png",
  "罗宇然_5-10 门口.jpg",
  "罗宇然_5-11 住宿门口.jpg",
  "罗宇然_5-12 习语.jpg",
  "罗宇然_5-13 打卡.jpg",
  "罗宇然_5-14 远程呼叫.jpg",
  "罗宇然_5-2.png",
  "罗宇然_5-3.jpg",
  "罗宇然_5-4 地点.jpg",
  "罗宇然_5-5.jpg",
  "罗宇然_5-6.jpg",
  "罗宇然_5-7.jpg",
  "罗宇然_5-8 开头.mp4",
  "罗宇然_5-9.jpg",
  "赵梓舒_2-1.jpg",
  "赵梓舒_2-2.jpg",
  "赵梓舒_2-3.jpg",
];

const spanOptions = [
  "md:col-span-2 md:row-span-2 col-span-2 sm:col-span-2 sm:row-span-2", // Large
  "md:col-span-1 md:row-span-2 col-span-1 sm:col-span-1 sm:row-span-2", // Tall
  "md:col-span-2 md:row-span-1 col-span-2 sm:col-span-2 sm:row-span-1", // Wide
  "md:col-span-1 md:row-span-1 col-span-1 sm:col-span-1 sm:row-span-1", // Small
];

export const galleryMediaItems: MediaItemType[] = rawFiles.map((file, index) => {
  const isVideo = file.endsWith(".mp4");

  // Create a pleasant, repeatable masonry/bento pattern
  const pattern = [0, 3, 2, 1, 3, 2, 3, 0, 1, 3, 2, 3, 1, 2, 0];

  let span = isVideo
    ? "md:col-span-2 md:row-span-2 col-span-2 sm:col-span-2 sm:row-span-2"
    : spanOptions[pattern[index % pattern.length]];

  // Customize the text based on the name
  let person = file.split('_')[0] || "调研记录";
  if (file.includes("孔德羽")) person = "孔德羽 开发记录";

  return {
    id: index + 1,
    type: isVideo ? "video" : "image",
    title: person,
    desc: file.replace(".jpg", "").replace(".png", "").replace(".mp4", ""),
    url: `/实践成果/照片 视频/${file}`,
    span,
  };
});

export const galleryArcImages = [
  "/实践成果/照片 视频/何佳欢_8-1.jpg",
  "/实践成果/照片 视频/周嘉琪_1-1.jpg",
  "/实践成果/照片 视频/张星睿_3-1.jpg",
  "/实践成果/照片 视频/杨佳怡_6-1.jpg",
  "/实践成果/照片 视频/赵梓舒_2-1.jpg",
];
