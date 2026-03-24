import { useRef } from "react";
import { motion, useMotionValue, animate } from "motion/react";
import "./TiltedCard.css";

interface TiltedCardProps {
  children: React.ReactNode;
  containerHeight?: React.CSSProperties["height"];
  containerWidth?: React.CSSProperties["width"];
  scaleOnHover?: number;
  rotateAmplitude?: number;
}

export default function TiltedCard({
  children,
  containerHeight = "auto",
  containerWidth = "auto",
  scaleOnHover = 1.10,
  rotateAmplitude = 25,
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale = useMotionValue(1);

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current; 
    if (!el) return; 
    
    const rect = el.getBoundingClientRect(); 
    const offsetX = (e.clientX - rect.left) / rect.width; 
    const offsetY = (e.clientY - rect.top) / rect.height; 
    
    const rotationX = (offsetY - 0.5) * rotateAmplitude; 
    const rotationY = (offsetX - 0.5) * -rotateAmplitude;

    // Short smooth transition so tilt doesn’t “snap” when moving to corners
    animate(rotateX, rotationX, { type: "tween", duration: 0.06 });
    animate(rotateY, rotationY, { type: "tween", duration: 0.06 });
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
  }

  function handleMouseLeave() {
    animate(rotateX, 0, { type: "spring", stiffness: 500, damping: 20 });
    animate(rotateY, 0, { type: "spring", stiffness: 500, damping: 20 });
    animate(scale, 1, { type: "spring", stiffness: 500, damping: 20 });
  }

  return (
    <div
      ref={ref}
      style={{
        height: containerHeight,
        width: containerWidth,
        perspective: "1200px",
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}