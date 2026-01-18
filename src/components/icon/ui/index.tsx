import { STYLE } from "@/style";
import type { BaseProps, Size, Variant } from "@/type";
import { cn } from "@/utils";



interface IconProps extends BaseProps {
    size?: Size
}

type IconComponent = React.FC<IconProps>


const BASE_ICON_STYLE = "inline-flex items-center justify-center rounded-full text-center"

const VARIANT: Record<Variant, string> = {
    default: cn(STYLE.default),
    outlined: "",
    darker: ""
}

const SIZE: Record<Size, string> = {
    S: "w-10 h-10",
    M: "w-14 h-14",
    L: "w-18 h-18",
    XL: "w-24 h-24"

}

export const Icon: IconComponent = ({
    className, 
    variant = "default",
    size ="M",
    children
}) => {


    return (

        <span className={cn(VARIANT[variant], BASE_ICON_STYLE, className, SIZE[size])}>
            {children}
        </span>
    )
}