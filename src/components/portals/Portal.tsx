import { createPortal } from 'react-dom'

// declare an interface props
interface IPortalProps {
    id: string
    slotName: string
    children: React.ReactNode
}

const Portal = ({ id, slotName, children }: IPortalProps) => {
    const elementDiv = document?.getElementById(
        `${id}-${slotName}-container`
    ) as unknown as HTMLElement
    if (!elementDiv) return <></>
    return createPortal(children, elementDiv)
}

export default Portal
