import {useEffect, useState } from "react"
import { createPortal } from "react-dom"
import type { Toast, ToastType, ToastOptions } from "../type"
import { cn } from "@/utils"
import { STYLE } from "@/style"

// Глобальное состояние для уведомлений
let globalToasts: Toast[] = []
let listeners: Array<() => void> = []

const notifyListeners = () => {
    listeners.forEach(listener => listener())
}

const addToast = (toast: Toast) => {
    globalToasts = [...globalToasts, toast]
    notifyListeners()
}

const removeToast = (id: string) => {
    globalToasts = globalToasts.filter(toast => toast.id !== id)
    notifyListeners()
}

// Глобальные методы для уведомлений
const toast = (type: ToastType, options: ToastOptions) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: Toast = {
        id,
        type,
        message: options.message,
        duration: options.duration || 5000,
        createdAt: Date.now()
    }
    
    addToast(newToast)

    // Автоматическое удаление
    if (newToast.duration && newToast.duration > 0) {
        setTimeout(() => removeToast(id), newToast.duration)
    }
}

export const success = (options: ToastOptions) => toast('success', options)
export const error = (options: ToastOptions) => toast('error', options)
export const warning = (options: ToastOptions) => toast('warning', options)
export const info = (options: ToastOptions) => toast('info', options)

// Хук для подписки на изменения
const useToasts = () => {
    const [toasts, setToasts] = useState<Toast[]>(globalToasts)

    useEffect(() => {
        const listener = () => setToasts([...globalToasts])
        listeners.push(listener)
        
        return () => {
            listeners = listeners.filter(l => l !== listener)
        }
    }, [])

    return toasts
}

const ToastItem = ({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) => {
    const getIcon = () => {
        switch (toast.type) {
            case 'success': return '✓'
            case 'error': return '✕'
            case 'warning': return '⚠'
            case 'info': return 'ℹ'
        }
    }

    const getStyles = () => {
        switch (toast.type) {
            case 'success': return STYLE.default + ' border-green-300 bg-green-200/30'
            case 'error': return STYLE.default + ' border-red-300 bg-red-400/30'
            case 'warning': return STYLE.default + ' border-yellow-300 bg-yellow-400/30'
            case 'info': return STYLE.default
        }
    }

    return (
        <div className={cn(
            "flex items-center gap-3 p-4 rounded-lg shadow-lg min-w-[300px] max-w-[400px]",
            getStyles()
        )}>
            <span className="text-lg font-bold">{getIcon()}</span>
            <span className="flex-1">{toast.message}</span>
            <button 
                onClick={() => onRemove(toast.id)}
                className="text-lg hover:opacity-70 transition-opacity"
            >
                ×
            </button>
        </div>
    )
}

export const NotificationContainer = () => {
    const toasts = useToasts()

    // Создаем портал для рендера уведомлений
    if (typeof document === 'undefined') return null

    return createPortal(
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {toasts.map(toast => (
                <ToastItem 
                    key={toast.id} 
                    toast={toast} 
                    onRemove={removeToast}
                />
            ))}
        </div>,
        document.body
    )
}