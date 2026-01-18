import React, { useEffect, useRef, useState } from "react";
import type { BaseProps, Variant } from "@/type";
import { cn } from "@/utils";
import { STYLE } from "@/style";

interface DrawerProps extends BaseProps {
  open: boolean;
  onClose: () => void;
}

type DrawerComponent = React.FC<DrawerProps>

const VARIANT: Record<Variant, string> = {
    darker: "",
    outlined: "",
    default: cn(STYLE.darker)
}

export const Drawer: DrawerComponent = ({
  open,
  onClose,
  children,
  className,
  variant = "default"
}) => {
  const [dragY, setDragY] = useState(0);
  const startY = useRef<number | null>(null);
  const dragging = useRef(false);

  useEffect(() => {
    if (!open) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, onClose]);


  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    dragging.current = true;
    startY.current = "touches" in e ? e.touches[0].clientY : e.clientY;
    document.body.style.userSelect = "none";
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!dragging.current || startY.current === null) return;
    const clientY = "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
    const delta = clientY - startY.current;
    setDragY(delta > 0 ? delta : 0);
  };

  const handleDragEnd = () => {
    dragging.current = false;
    document.body.style.userSelect = "";
    if (dragY > 80) { 
      onClose();
    } else {
      setDragY(0);
    }
  };

  useEffect(() => {
    if (!open) return;
    const move = (e: MouseEvent | TouchEvent) => handleDragMove(e);
    const up = () => handleDragEnd();
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
    };
    // eslint-disable-next-line
  }, [open, dragY]);

  if (!open) return null;

  return (
    <div
      className="fixed w-full inset-0 z-50 flex items-end justify-center"
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      {/* Drawer */}
      <div
        className={cn(
          VARIANT[variant],
          "relative w-full max-w-lg rounded-t-2xl rounded-b-none py-2 px-4 shadow-lg animate-drawer-in",
          className
        )}
        style={{
          transform: `translateY(${dragY}px)`,
          transition: dragY === 0 ? "transform 0.3s cubic-bezier(.4,0,.2,1)" : "none",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Drag zone */}
        <div
          className="w-full flex justify-center py-2 cursor-grab active:cursor-grabbing touch-none select-none"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        >
          <div className="h-1.5 w-12 rounded-full bg-gray-300" />
        </div>
        {children}
      </div>
      <style>
        {`
          @keyframes drawer-in {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
          }
          .animate-drawer-in {
            animation: drawer-in 0.3s cubic-bezier(.4,0,.2,1);
          }
        `}
      </style>
    </div>
  );
};