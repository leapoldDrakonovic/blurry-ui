import type { BaseProps, 
    // Variant 
} from "@/type";
import { STYLE } from "@/style";
import { cn } from "@/utils";
import { useEffect } from "react";


interface AsideProps extends BaseProps {
    open: boolean,
    onClose: () => void,
    position?: Position
}


type AsideComponent = React.FC<AsideProps & React.HTMLAttributes<HTMLElement>>

type Position = keyof typeof POSITION

const POSITION: Record<string, string> = {
    left: "",
    right: ""
}

// const VARIANT: Record<Variant, string> = {
//     default: "",
//     outlined: "",
//     darker: ""
// }

export const Aside: AsideComponent = ({
    className,
    variant = "default",
    position = "right",
    open,
    onClose,
    children,
    ...rest
}) => {
    // Overlay click handler
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        onClose();
    };

    // Prevent click inside aside from closing
    const handleAsideClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
    };

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            {/* Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-40 transition-colors duration-300",
                    open ? "bg-black/40 pointer-events-auto" : "bg-transparent pointer-events-none"
                )}
                style={{ transitionProperty: 'background-color, opacity' }}
                onClick={handleOverlayClick}
                aria-hidden={!open}
            />
            {/* Aside */}
            <aside
                {...rest}
                className={cn(
                    "fixed top-0 h-full z-50 shadow-xl transition-transform duration-300 ease-in-out",
                    position === "right" ? "right-0" : "left-0",
                    open
                        ? position === "right"
                            ? "translate-x-0 rounded-br-none rounded-tr-none"
                            : "-translate-x-0 rounded-bl-none rounded-tl-none"
                        : position === "right"
                        ? "translate-x-full"
                        : "-translate-x-full",
                    "w-[350px] max-w-full",
                    STYLE[variant],
                    className
                )}
                onClick={handleAsideClick}
                aria-hidden={!open}
            >
                {children}
            </aside>
        </>
    );
}