import type { BaseProps } from "@/type"
import { cn } from "@/utils"
import React from "react"

interface GridProps extends BaseProps {
    columns?: number
    gap?: number | string
    style?: React.CSSProperties
}

interface RowProps extends BaseProps {
    row?: number
    style?: React.CSSProperties
}

interface ColProps extends BaseProps {
    col?: number
    style?: React.CSSProperties
}

type RowComponent = React.FC<RowProps>
type ColCompoent = React.FC<ColProps>
type GridComponent = React.FC<GridProps> & {
    Row: RowComponent,
    Col: ColCompoent
}

export const Row: RowComponent = ({
    row = 1,
    className,
    style,
    children,
    ...rest
}) => {
    return (
        <div
            className={cn(className)}
            style={{ gridRow: row, ...style }}
            {...rest}
        >
            {children}
        </div>
    )
}
export const Col: ColCompoent = ({
    col = 1,
    className,
    style,
    children,
    ...rest
}) => {
    return (
        <div
            className={cn(className)}
            style={{ gridColumn: col, ...style }}
            {...rest}
        >
            {children}
        </div>
    )
}

export const Grid: GridComponent = ({
    className,
    style,
    columns = 12,
    gap = 16,
    children,
    ...rest
}) => {
    return (
        <div
            className={cn(className)}
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, 1fr)` ,
                gap,
                ...style
            }}
            {...rest}
        >
            {children}
        </div>
    )
}

Grid.Col = Col
Grid.Row = Row





