"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface MediaSurfaceProps {
  mediaType: "video" | "image";
  mediaSrc: string;
  posterSrc?: string;
  title?: string;
  scrollProgress: number;
}

export function MediaSurface({
  mediaType,
  mediaSrc,
  posterSrc,
  title,
  scrollProgress,
}: MediaSurfaceProps) {
  if (mediaType === "video") {
    if (mediaSrc.includes("youtube.com")) {
      return (
        <div className="relative w-full h-full pointer-events-none">
          <iframe
            width="100%"
            height="100%"
            src={
              mediaSrc.includes("embed")
                ?
                    mediaSrc +
                    (mediaSrc.includes("?") ? "&" : "?") +
                    "autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1"
                :
                    mediaSrc.replace("watch?v=", "embed/") +
                    "?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=" +
                    mediaSrc.split("v=")[1]
            }
            className="w-full h-full rounded-xl"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="absolute inset-0 z-10" style={{ pointerEvents: "none" }} />
          <motion.div
            className="absolute inset-0 bg-black/30 rounded-xl"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
            transition={{ duration: 0.2 }}
          />
        </div>
      );
    }

    return (
      <div className="relative w-full h-full pointer-events-none">
        <video
          src={mediaSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover rounded-xl"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
        />
        <div className="absolute inset-0 z-10" style={{ pointerEvents: "none" }} />
        <motion.div
          className="absolute inset-0 bg-black/30 rounded-xl"
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
          transition={{ duration: 0.2 }}
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <Image
        src={mediaSrc}
        alt={title || "Media content"}
        width={1280}
        height={720}
        className="w-full h-full object-cover rounded-xl"
        unoptimized
      />

      <motion.div
        className="absolute inset-0 bg-black/50 rounded-xl"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
