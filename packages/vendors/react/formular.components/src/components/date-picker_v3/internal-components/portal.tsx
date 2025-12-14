import React, { createContext, ReactNode, useContext, useState } from 'react'

interface PortalContextType {
    slots: Record<string, ReactNode>
    setSlot: (name: string, content: ReactNode) => void
}

const PortalContext = createContext<PortalContextType | null>(null)

export const PortalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [slots, setSlots] = useState<Record<string, ReactNode>>({})

    const setSlot = (name: string, content: ReactNode) => {
        setSlots((prev) => ({ ...prev, [name]: content }))
    }

    return <PortalContext.Provider value={{ slots, setSlot }}>{children}</PortalContext.Provider>
}

export const usePortal = () => {
    const context = useContext(PortalContext)
    if (!context) {
        throw new Error('usePortal must be used within PortalProvider')
    }
    return context
}

interface PortalProps {
    id: string
    slotName: string
    children: ReactNode
}

export const Portal: React.FC<PortalProps> = ({ slotName, children }) => {
    const { setSlot } = usePortal()

    React.useEffect(() => {
        setSlot(slotName, children)
        return () => setSlot(slotName, null)
    }, [slotName, children, setSlot])

    return null
}

interface PortalSlotProps {
    slotName: string
    className?: string
}

export const PortalSlot: React.FC<PortalSlotProps> = ({ slotName, className }) => {
    const { slots } = usePortal()
    return <div className={className}>{slots[slotName]}</div>
}
