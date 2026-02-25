"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDimensions } from "@/hooks";
import { OrbitalNode } from "@/components/ui/radial-orbital/OrbitalNode";
import type { TimelineItem } from "@/components/ui/radial-orbital/types";

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const rotationRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const tweenRef = useRef<number | null>(null);
  const isVisibleRef = useRef(true);

  const orbitSize = useDimensions(orbitRef);
  const radius = useMemo(() => {
    const minSide = Math.min(orbitSize.width || 0, orbitSize.height || 0);
    return Math.max(110, Math.floor(minSide / 2) - 72);
  }, [orbitSize.height, orbitSize.width]);
  const baseAngles = useMemo(
    () =>
      timelineData.map((_, index) =>
        timelineData.length === 0 ? 0 : (index / timelineData.length) * 360
      ),
    [timelineData]
  );

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  const centerViewOnNode = (nodeId: number) => {
    if (!nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    const targetRotation = (270 - targetAngle + 360) % 360;
    const startRotation = rotationRef.current;
    const delta = ((targetRotation - startRotation + 540) % 360) - 180;
    const duration = 600;
    const startTime = performance.now();

    if (tweenRef.current) {
      cancelAnimationFrame(tweenRef.current);
      tweenRef.current = null;
    }

    const animateTween = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = (startRotation + delta * eased + 360) % 360;
      rotationRef.current = current;
      setRotationAngle(current);
      updateNodePositions(current);

      if (t < 1) {
        tweenRef.current = requestAnimationFrame(animateTween);
      }
    };

    tweenRef.current = requestAnimationFrame(animateTween);
  };

  const calculateNodePosition = (angle: number) => {
    const radian = (angle * Math.PI) / 180;

    const rawX = radius * Math.cos(radian) + centerOffset.x;
    const rawY = radius * Math.sin(radian) + centerOffset.y;

    const x = Number(rawX.toFixed(4));
    const y = Number(rawY.toFixed(4));

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacityRaw = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );
    const opacity = Number(opacityRaw.toFixed(4));

    return { x, y, zIndex, opacity };
  };

  const updateNodePositions = useCallback(
    (rotation: number) => {
      timelineData.forEach((item, index) => {
        const nodeEl = nodeRefs.current[item.id];
        if (!nodeEl) return;

        const baseAngle = baseAngles[index] ?? 0;
        const position = calculateNodePosition(baseAngle + rotation);

        nodeEl.style.transform = `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`;
        nodeEl.style.opacity = `${position.opacity}`;
        nodeEl.style.zIndex = `${position.zIndex}`;
      });
    },
    [baseAngles, calculateNodePosition, timelineData]
  );

  // IntersectionObserver for visibility-based pause
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoRotate) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    rotationRef.current = rotationAngle;
    const step = () => {
      // Skip computation when not visible, but keep the loop alive
      if (isVisibleRef.current) {
        rotationRef.current = (rotationRef.current + 0.12) % 360;
        updateNodePositions(rotationRef.current);
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [autoRotate, rotationAngle, updateNodePositions]);

  useEffect(() => {
    return () => {
      if (tweenRef.current) {
        cancelAnimationFrame(tweenRef.current);
        tweenRef.current = null;
      }
    };
  }, []);

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  return (
    <div
      className="w-full h-[70vh] md:h-[80vh] flex flex-col items-center justify-center bg-transparent overflow-hidden"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          <div className="absolute inset-0">
            <div className="absolute w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 animate-pulse flex items-center justify-center z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="absolute w-20 h-20 rounded-full border border-ink/20 dark:border-ink-dark/20 animate-ping opacity-70"></div>
              <div
                className="absolute w-24 h-24 rounded-full border border-ink/10 dark:border-ink-dark/10 animate-ping opacity-50"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-md"></div>
            </div>

            <div
              className="absolute rounded-full border border-ink/10 dark:border-ink-dark/10"
              style={{ width: radius * 2, height: radius * 2, left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
            ></div>

            {timelineData.map((item, index) => {
              const angle = baseAngles[index] ?? 0;
              const position = calculateNodePosition(angle + rotationAngle);
              const isExpanded = expandedItems[item.id];
              const isRelated = isRelatedToActive(item.id);
              const isPulsing = pulseEffect[item.id];
              const relatedItems = item.relatedIds
                .map((id) => timelineData.find((t) => t.id === id))
                .filter(Boolean) as TimelineItem[];

              return (
                <OrbitalNode
                  key={item.id}
                  nodeRef={(el) => (nodeRefs.current[item.id] = el)}
                  item={item}
                  position={position}
                  isExpanded={!!isExpanded}
                  isRelated={isRelated}
                  isPulsing={!!isPulsing}
                  relatedItems={relatedItems}
                  onToggle={toggleItem}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
