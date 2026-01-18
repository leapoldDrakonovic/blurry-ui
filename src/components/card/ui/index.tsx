import { STYLE, TEXT_STYLE } from "@/style"
import type { BaseDivProps, BaseProps, Variant } from "@/type"
import { cn } from "@/utils"



const VARIANT: Record<Variant, string> = {
    default: cn(STYLE.default, "p-4"),
    outlined: "",
    darker: cn(STYLE.darker, "p-4")
}

const BASE_CARD_STYLE: string = `flex flex-col gap-2`

interface CardProps extends BaseProps {}

type CardComponent = React.FC<CardProps & BaseDivProps> & {
    Header: CardHeaderComponent,
    Content: CardContentComponent
}

export const Card: CardComponent = ({
    className,
    variant = "default",
    children,
    ...rest
}) => {


    return <div className={cn(VARIANT[variant], BASE_CARD_STYLE, className)} {...rest}>{children}</div>
}

interface CardContentProps extends BaseProps {}

type CardContentComponent = React.FC<CardContentProps & BaseDivProps>

export const CardContent: CardContentComponent = ({
    className,
    variant = "default",
    children,
    ...rest
}) => {
    
    return <div className={cn(VARIANT[variant], className)} {...rest}>{children}</div>
}

interface CardHeaderProps extends BaseProps {}

type CardHeaderComponent = React.FC<CardHeaderProps & React.HTMLAttributes<HTMLHeadingElement>>

export const CardHeader: CardHeaderComponent = ({
    className,
    children,
    ...rest
}) => {

    return <h3 className={cn(TEXT_STYLE.headings.h3 ,className)} {...rest}>{children}</h3>
}


Card.Header = CardHeader
Card.Content = CardContent