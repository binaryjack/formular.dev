import { ISmartLayoutProps } from './smart-layout.types'

export const SmartCol = ({ id, children }: ISmartLayoutProps) => {
    return (
        <div id={id} className={`flex flex-col w-full h-auto`}>
            {children}
        </div>
    )
}
