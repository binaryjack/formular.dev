import { IFlexLayoutProps } from './flex-layout.types'

export const FlexCol = ({ id, children }: IFlexLayoutProps) => {
    return (
        <div id={id} className={`flex flex-col bg-slate-600 w-full h-auto`}>
            {children}
        </div>
    )
}
