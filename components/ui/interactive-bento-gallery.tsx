"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react';

// MediaItemType defines the structure of a media item
export interface MediaItemType {
    id: number;
    type: string;
    title: string;
    desc: string;
    url: string;
    span: string;
}

// MediaItem component renders either a video or image based on item.type
const MediaItem = ({ item, className, onClick }: { item: MediaItemType, className?: string, onClick?: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [isBuffering, setIsBuffering] = useState(true);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setIsInView(entry.isIntersecting);
            });
        }, options);

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    useEffect(() => {
        let mounted = true;

        const handleVideoPlay = async () => {
            if (!videoRef.current || !isInView || !mounted) return;

            try {
                if (videoRef.current.readyState >= 3) {
                    setIsBuffering(false);
                    await videoRef.current.play();
                } else {
                    setIsBuffering(true);
                    await new Promise((resolve) => {
                        if (videoRef.current) {
                            videoRef.current.oncanplay = resolve;
                        }
                    });
                    if (mounted) {
                        setIsBuffering(false);
                        await videoRef.current.play();
                    }
                }
            } catch (error) {
                console.warn("Video playback failed:", error);
            }
        };

        if (isInView) {
            handleVideoPlay();
        } else if (videoRef.current) {
            videoRef.current.pause();
        }

        return () => {
            mounted = false;
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.removeAttribute('src');
                videoRef.current.load();
            }
        };
    }, [isInView]);

    if (item.type === 'video') {
        return (
            <div className={`${className} relative overflow-hidden`}>
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    onClick={onClick}
                    playsInline
                    muted
                    loop
                    preload="auto"
                    style={{
                        opacity: isBuffering ? 0.8 : 1,
                        transition: 'opacity 0.2s',
                        transform: 'translateZ(0)',
                        willChange: 'transform',
                    }}
                >
                    <source src={item.url} type="video/mp4" />
                </video>
                {isBuffering && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                )}
            </div>
        );
    }

    return (
        <img
            src={item.url}
            alt={item.title}
            className={`${className} object-cover cursor-pointer`}
            onClick={onClick}
            loading="lazy"
            decoding="async"
        />
    );
};

interface GalleryModalProps {
    selectedItem: MediaItemType;
    isOpen: boolean;
    onClose: () => void;
    setSelectedItem: (item: MediaItemType | null) => void;
    mediaItems: MediaItemType[];
}

const GalleryModal = ({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems }: GalleryModalProps) => {
    const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });

    if (!isOpen) return null;

    return (
        <>
            <motion.div
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.98 }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                }}
                className="fixed inset-0 w-full min-h-screen sm:h-[90vh] md:h-[600px] backdrop-blur-lg 
                          rounded-none sm:rounded-lg md:rounded-xl overflow-hidden z-50"
            >
                <div className="h-full flex flex-col">
                    <div className="flex-1 p-2 sm:p-3 md:p-4 flex items-center justify-center bg-gray-50/50 dark:bg-black/50">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedItem.id}
                                className="relative w-full aspect-[16/9] max-w-[95%] sm:max-w-[85%] md:max-w-3xl 
                                         h-auto max-h-[70vh] rounded-lg overflow-hidden shadow-md"
                                initial={{ y: 20, scale: 0.97 }}
                                animate={{
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30,
                                        mass: 0.5
                                    }
                                }}
                                exit={{
                                    y: 20,
                                    scale: 0.97,
                                    transition: { duration: 0.15 }
                                }}
                                onClick={onClose}
                            >
                                <MediaItem item={selectedItem} className="w-full h-full object-contain bg-gray-900/20" onClick={onClose} />
                                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 
                                              bg-gradient-to-t from-black/50 to-transparent">
                                    <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold">
                                        {selectedItem.title}
                                    </h3>
                                    <p className="text-white/80 text-xs sm:text-sm mt-1">
                                        {selectedItem.desc}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <motion.button
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 
                              p-2 rounded-full bg-gray-200/80 text-gray-700 hover:bg-gray-300/80 
                              text-xs sm:text-sm backdrop-blur-sm z-50 shadow-md"
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <X className='w-5 h-5' />
                </motion.button>
            </motion.div>

            {/* Full-width scrollable dock at the bottom */}
            <motion.div
                className="fixed z-[60] left-0 bottom-0 w-full hidden md:block"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <div
                    className="relative w-full bg-white/60 dark:bg-black/60 backdrop-blur-2xl 
                             border-t border-black/10 dark:border-white/10 shadow-[0_-8px_30px_rgb(0,0,0,0.12)] py-3 px-4 sm:px-8"
                >
                    <div
                        className="flex items-center justify-start gap-3 sm:gap-4 overflow-x-auto 
                                  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                        onWheel={(e) => {
                            const container = e.currentTarget;
                            if (e.deltaY !== 0) {
                                e.preventDefault(); // Prevent vertical scroll to make wheel horizontally scroll inside this area
                                container.scrollBy({ left: e.deltaY < 0 ? -200 : 200, behavior: 'auto' });
                            }
                        }}
                    >
                        {mediaItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedItem(item);
                                }}
                                style={{
                                    zIndex: selectedItem.id === item.id ? 30 : mediaItems.length - index,
                                }}
                                className={`
                                    relative group
                                    w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 
                                    rounded-xl overflow-hidden 
                                    cursor-pointer hover:z-20
                                    transition-all duration-300
                                    ${selectedItem.id === item.id
                                        ? 'ring-4 ring-rose-500 shadow-2xl scale-110 -translate-y-2'
                                        : 'hover:ring-4 hover:ring-rose-500/50 hover:-translate-y-1 shadow-md opacity-60 hover:opacity-100'}
                                `}
                            >
                                <MediaItem item={item} className="w-full h-full" onClick={() => setSelectedItem(item)} />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/20" />
                                {selectedItem.id === item.id && (
                                    <motion.div
                                        layoutId="activeGlow"
                                        className="absolute -inset-2 bg-rose-500/20 blur-xl"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </>
    );
};

interface InteractiveBentoGalleryProps {
    mediaItems: MediaItemType[]
    title: string
    description: string
}

const InteractiveBentoGallery: React.FC<InteractiveBentoGalleryProps> = ({ mediaItems, title, description }) => {
    const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);
    const [items, setItems] = useState(mediaItems);
    const [isDragging, setIsDragging] = useState(false);

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="mb-8 text-center">
                <motion.h1
                    className="text-2xl sm:text-3xl md:text-5xl font-bold bg-clip-text text-transparent 
                             bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900
                             dark:from-white dark:via-gray-200 dark:to-white pb-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {title}
                </motion.h1>
                <motion.p
                    className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {description}
                </motion.p>
            </div>

            <AnimatePresence mode="wait">
                {selectedItem && (
                    <GalleryModal
                        selectedItem={selectedItem}
                        isOpen={true}
                        onClose={() => setSelectedItem(null)}
                        setSelectedItem={setSelectedItem}
                        mediaItems={items}
                    />
                )}
            </AnimatePresence>

            <motion.div
                className="grid grid-cols-2 lg:grid-cols-4 grid-flow-row-dense gap-3 sm:gap-4 lg:gap-6 auto-rows-[200px] sm:auto-rows-[240px] lg:auto-rows-[300px]"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.1 }
                    }
                }}
            >
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        layoutId={`media-${item.id}`}
                        className={`relative overflow-hidden rounded-xl cursor-move ${item.span}`}
                        onClick={() => !isDragging && setSelectedItem(item)}
                        variants={{
                            hidden: { y: 50, scale: 0.9, opacity: 0 },
                            visible: {
                                y: 0,
                                scale: 1,
                                opacity: 1,
                                transition: {
                                    type: "spring",
                                    stiffness: 350,
                                    damping: 25,
                                    delay: index * 0.02
                                }
                            }
                        }}
                        whileHover={{ scale: 1.02 }}
                        drag
                        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                        dragElastic={1}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={(e, info) => {
                            setIsDragging(false);
                            const moveDistance = info.offset.x + info.offset.y;
                            if (Math.abs(moveDistance) > 50) {
                                const newItems = [...items];
                                const draggedItem = newItems[index];
                                const targetIndex = moveDistance > 0 ?
                                    Math.min(index + 1, items.length - 1) :
                                    Math.max(index - 1, 0);
                                newItems.splice(index, 1);
                                newItems.splice(targetIndex, 0, draggedItem);
                                setItems(newItems);
                            }
                        }}
                    >
                        <MediaItem
                            item={item}
                            className="absolute inset-0 w-full h-full"
                            onClick={() => !isDragging && setSelectedItem(item)}
                        />
                        <motion.div
                            className="absolute inset-0 flex flex-col justify-end p-2 sm:p-3 md:p-4 opacity-0 transition-opacity"
                            whileHover={{ opacity: 1 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                            <h3 className="relative text-white text-xs sm:text-sm md:text-base font-medium line-clamp-1">
                                {item.title}
                            </h3>
                            <p className="relative text-white/70 text-[10px] sm:text-xs md:text-sm mt-0.5 line-clamp-2">
                                {item.desc}
                            </p>
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default InteractiveBentoGallery;
