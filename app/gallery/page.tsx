import Image from "next/image";
import { BackLink } from "@/components/BackLink";

/** 剪影页：头部、中部、下部三段（参考 docs/参考资源/功能区剪映头部、中部、下部） */
const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1576765608535-5f0d0c20c017?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=800&auto=format&fit=crop",
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-paper dark:bg-paper-dark text-ink dark:text-ink-dark py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        <BackLink />
        <h1 className="text-3xl md:text-4xl font-bold mb-4">调研剪影</h1>
        <p className="text-foreground/80 mb-12">
          调研图片与视频记录：实地走访、访谈、智慧医养产品体验等影像资料。
        </p>
        {/* 头部：弧形/焦点展示区 */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-hust mb-6">调研现场</h2>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-ink/5">
            <Image
              src={GALLERY_IMAGES[0]}
              alt="调研现场"
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </section>
        {/* 中部：多图/选项展示 */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold text-hust mb-6">走访记录</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY_IMAGES.slice(1, 5).map((src, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden bg-ink/5">
                <Image src={src} alt={`记录 ${i + 2}`} fill className="object-cover" unoptimized />
              </div>
            ))}
          </div>
        </section>
        {/* 下部：Bento/网格展示 */}
        <section>
          <h2 className="text-xl font-semibold text-hust mb-6">影像集锦</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GALLERY_IMAGES.slice(0, 4).map((src, i) => (
              <div key={i} className="relative aspect-video rounded-xl overflow-hidden bg-ink/5">
                <Image src={src} alt={`集锦 ${i + 1}`} fill className="object-cover" unoptimized />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
