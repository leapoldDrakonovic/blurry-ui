import type { Variant } from "./type"

// Base react props for component
export interface BaseProps {
    className?: string,
    children?: React.ReactNode
    variant?: Variant
}

export interface BaseDivProps extends React.HTMLAttributes<HTMLDivElement> {}