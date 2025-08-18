import { IFlexLayoutProps } from './flex-layout.types'

export const FlexCol = ({ id, children }: IFlexLayoutProps) => {
    return (
        <div id={id} className={`flex flex-col w-full h-auto`}>
            {children}
        </div>
    )
}
