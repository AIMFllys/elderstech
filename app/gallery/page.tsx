import { BackLink } from "@/components/BackLink";
import { ArcGalleryHero } from "@/components/ui/arc-gallery-hero-component";
import InteractiveSelector from "@/components/ui/interactive-selector";
import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery";
import { galleryArcImages, galleryMediaItems } from "@/lib/gallery";

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-paper dark:bg-paper-dark text-ink dark:text-ink-dark">
      <div className="container mx-auto max-w-5xl py-12 px-4">
        <BackLink />
        <h1 className="text-3xl md:text-4xl font-bold mb-4">调研剪影</h1>
        <p className="text-foreground/80 mb-12">
          调研图片与视频记录：实地走访、访谈、智慧医养产品体验等影像资料。
        </p>
      </div>

      <ArcGalleryHero images={galleryArcImages} />

      <section className="py-16">
        <InteractiveSelector />
      </section>

      <section className="py-16">
        <InteractiveBentoGallery
          mediaItems={galleryMediaItems}
          title="影像集锦"
          description="拖拽查看、点击浏览，回顾调研现场与共创时刻。"
        />
      </section>
    </main>
  );
}
