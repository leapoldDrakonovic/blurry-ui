import { STYLE } from "@/style";
import type { BaseProps, Variant } from "@/type";
import { cn } from "@/utils";



interface SwitcherProps extends BaseProps {
    active: boolean,
    onActive: () => void
}

type SwitcherComponent = React.FC<SwitcherProps>

const BASE_SWITCHER = "py-2 px-4 cursor-pointer relative"

const VARIANT: Record<Variant, string> = {
    default: cn(STYLE.default),
    outlined: "",
    darker: cn(STYLE.darker)

}

export const Switcher: SwitcherComponent = ({
    className,
    variant = "default",
    active,
    onActive
}) => {

    return (
        <button onClick={onActive} className={cn(VARIANT[variant], BASE_SWITCHER, className, "relative overflow-hidden  transition-all duration-200", 
                active && "bg-blue-100/50"
        )}>
            <div 
                className={cn(
                    STYLE[variant],
                    "w-1/2 h-full absolute transition-all duration-300 left-0 top-0",
                    !active 
                        ? "translate-x-none"
                        : "translate-x-full"
                )}
            />
        </button>
    )
}