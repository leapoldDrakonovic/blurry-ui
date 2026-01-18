import { cn } from "@/utils";
import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./index.module.css";
import { Button } from "@/components/button";
import { X } from "lucide-react";

interface IDialogContextState {
    open: boolean;
    set_open: (state: boolean) => void;
    close: () => void
} 

const DialogContext = createContext<IDialogContextState | undefined>(undefined)
const useDialogContext = () => {
    const context = useContext(DialogContext)
    if (!context) throw new Error ("[ERROR]: Missing dialog context")
    return context
}

export interface IDialogComponentProps {
    children: React.ReactNode
}
type TDialogComponentAdditional = {
    Trigger: TDialogTriggerComponent;
    Content: TDialogContentComponent;
}
export type TDialogComponent = React.FC<IDialogComponentProps> & TDialogComponentAdditional
export const Dialog: TDialogComponent = ({children}) => {
    const [open, set_open] = useState<boolean>(false)
    const close = () => set_open(false)
    const value = {open, set_open, close}
    return (
        <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
    )
}



export interface IDialogTriggerProps {
    children: React.ReactNode,
    className?: string
}
export type TDialogTriggerComponent = React.FC<IDialogTriggerProps>
const DialogTrigger: TDialogTriggerComponent = ({children, className}) => {
    const {set_open} = useDialogContext()
    return (
        <Button className={cn(className)} onClick={() => set_open(true)}>
            {children}
        </Button>
    )
}



export interface IDialogContentProps {
    children: React.ReactNode
}
export type TDialogContentComponent = React.FC<IDialogContentProps>
const DialogContent: TDialogContentComponent = ({children}) => {
    const {open, close} = useDialogContext()
    useEffect(() => {
       if (open) document.body.style.overflowY = "hidden"
       return () => {document.body.style.overflowY = "scroll"}
    }, [open])

    if (!open) return null
    const Base = () => (
        <>
            <DialogBackground/>
            <div className={cn(`fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 
                                bg-white/10 backdrop-blur-xl rounded-xl text-white borderborder-white/30 z-10 
                                  min-w-[300px] min-h-[100px] flex flex-col justify-center items-center`,
                                 styles["modal-content-animation"])}>
                <button onClick={close} className="absolute right-2 top-2 cursor-pointer"><X/></button>
                {children}
            </div>
        </>
    )

    return createPortal(<Base />, document.body)    
}

const DialogBackground: React.FC = () => {
    const {close} = useDialogContext()
    return <div onClick={close} className="w-full h-svh fixed bg-black/70 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-9"/>
}


Dialog.Trigger = DialogTrigger
Dialog.Content = DialogContent