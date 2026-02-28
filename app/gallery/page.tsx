import { BackLink } from "@/components/layout/back-link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { PhotoGallery } from "@/components/ui/gallery";
import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery";
import { galleryMediaItems } from "@/lib/gallery";
import { FooterSection } from "@/components/home/FooterSection";

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-paper dark:bg-paper-dark text-ink dark:text-ink-dark overflow-x-hidden">
      <div className="absolute top-12 left-4 z-50">
        <BackLink />
      </div>
      <div className="absolute top-12 right-4 z-50">
        <ThemeToggle />
      </div>

      <section className="mb-16">
        <PhotoGallery />
      </section>

      <section className="py-16">
        <InteractiveBentoGallery
          mediaItems={galleryMediaItems}
          title="调研影像纪实"
          description="拖拽查看、点击浏览，回顾实地走访、访谈、共创时刻。"
        />
      </section>

      <FooterSection compact />
    </main>
  );
}
