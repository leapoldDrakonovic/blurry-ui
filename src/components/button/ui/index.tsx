import React, { useRef, useState } from "react";
import { STYLE } from "@/style"
import type { BaseProps, Variant } from "@/type"
import { cn } from "@/utils"



interface ButtonProps extends BaseProps  {
    variant?: Variant
}

type ButtonComponent = React.FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>>

const VARIANTS: Record<Variant, string> = {
    outlined: "123",
    darker:  cn(STYLE.darker, "px-4 py-2 text-white cursor-pointer linear duration-200"),
    default: cn(STYLE.default, "px-4 py-2 text-white cursor-pointer linear duration-200") ,
} as const 


export const Button: ButtonComponent = ({
    variant = "default",
    className,
    children,
    ...rest
}) => {
    const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
    const [active, setActive] = useState(false);
    const btnRef = useRef<HTMLButtonElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = btnRef.current?.getBoundingClientRect();
        if (rect) {
            setCoords({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    const handleMouseLeave = () => setCoords(null);

    const handleClick = () => {
        setActive(true);
        setTimeout(() => setActive(false), 200); 
    };

    const spotlightStyle = coords
        ? {
            background: `radial-gradient(circle at ${coords.x}px ${coords.y}px, rgba(255,255,255,0.15) 10%, transparent 90%)`,
            transition: "background 0.2s",
        }
        : {};

    const activeStyle = active
        ? {
            backgroundColor: "rgba(255,255,255,0.2)",
            transition: "background 0.2s, background-color 0.2s",
        }
        : {};

    return (
        <button
            ref={btnRef}
            className={cn(VARIANTS[variant], className)}
            style={{ ...spotlightStyle, ...activeStyle }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            {...rest}
        >
            {children}
        </button>
    )
}

