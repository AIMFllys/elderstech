import { BackLink } from "@/components/layout/back-link";
import { FooterSection } from "@/components/home/FooterSection";

/** 反思页：调研反思与感悟（来自实践成果申报要求：实践感悟 2–3 篇，每篇 500 字以内） */
export default function ReflectionPage() {
  return (
    <main className="min-h-screen bg-paper dark:bg-paper-dark text-ink dark:text-ink-dark py-12 px-4">
      <div className="container mx-auto max-w-3xl mb-20">
        <BackLink />
        <h1 className="text-3xl md:text-4xl font-bold mb-4">调研反思</h1>
        <p className="text-foreground/80 mb-12">
          择优选取 2–3 篇学生实践感悟，每篇 500 字以内。内容积极向上，符合社会主义核心价值观，对青年有鼓舞和借鉴意义。
        </p>
        <section className="space-y-8">
          <div className="p-6 rounded-xl bg-background dark:bg-background border border-ink/10">
            <h2 className="text-lg font-semibold text-hust mb-2">实践感悟（示例）</h2>
            <p className="text-sm text-foreground/80 leading-relaxed">
              深入养老机构与老年人家庭开展调研，让我更直观地感受到智慧医养产品在实际使用中的机遇与挑战。许多老人对智能设备既好奇又畏难，适老化设计不仅是界面与字体，更是理解与陪伴。本次实践为「智护银龄」轻应用的设计提供了宝贵的一手需求，我们将从用药提醒与健康信息简易查询入手，做老年人「用得上、愿意用」的产品。
            </p>
          </div>
          <div className="p-6 rounded-xl bg-background dark:bg-background border border-ink/10">
            <h2 className="text-lg font-semibold text-hust mb-2">调研反思（示例）</h2>
            <p className="text-sm text-foreground/80 leading-relaxed">
              返乡分散调研与集中开发相结合的模式，既保证了调研覆盖多地域、多场景，又让开发组能及时吸收一线反馈。在数据汇总与案例分析阶段，我们将重点梳理「智慧工具是桥梁还是壁垒」的典型场景，为构建中国特色立体化智慧医养服务体系贡献青年方案。
            </p>
          </div>
        </section>
      </div>
      <FooterSection compact />
    </main>
  );
}
