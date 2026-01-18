import type { Variant } from "./type"


export interface BaseProps {
    className?: string,
    children?: React.ReactNode
    variant?: Variant
}

export interface BaseDivProps extends React.HTMLAttributes<HTMLDivElement> {}