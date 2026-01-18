export interface ILinkProps {
    children: React.ReactNode;
    path: string
}
export type TLinkComponent = React.FC<ILinkProps>
export const Link: TLinkComponent = ({children, path}) => {
    const handleRedirect = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        window.location.replace(path)
    }
    return (
        <a onClick={(e) => handleRedirect(e)}>{children}</a>
    )
}