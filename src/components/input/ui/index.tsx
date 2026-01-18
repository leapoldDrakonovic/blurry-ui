import { STYLE } from "@/style";
import type { BaseProps, Variant } from "@/type";
import { cn } from "@/utils";




interface InputProps extends BaseProps{
    mask?: string
}

type InputComponent = React.FC<InputProps & React.InputHTMLAttributes<HTMLInputElement>>


const VARIANTS: Record<Variant, string> = {
    outlined: "",
    default: cn(STYLE.default, "px-4 py-2 outline-none focus:bg-white/10 linear duration-100"),
    darker: cn(STYLE.darker, "px-4 py-2 outline-none focus:bg-white/10 linear duration-100"),
}

export const Input: InputComponent = ({
    variant = "default",
    className,
     ...rest
}) => {

    return <input className={cn(VARIANTS[variant], className)} {...rest}/>
}