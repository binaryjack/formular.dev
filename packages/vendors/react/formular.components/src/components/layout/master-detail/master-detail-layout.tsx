import useAppContext from '@components/context/app-context/app-context.context'
import { LayoutModeEnum } from '../enum/layout-mode-enum'
export interface IMasterDetailLayoutProps {
    menu: React.ReactNode
    body: React.ReactNode
    desktopMode: LayoutModeEnum
    mobileMode: LayoutModeEnum
}

export const MasterDetailLayout = ({
    menu,
    body,
    desktopMode,
    mobileMode
}: IMasterDetailLayoutProps) => {
    const { media } = useAppContext()

    const isMobileDevice = ['2xs', 'xs'].includes(media?.media ?? '')
    const isDesktopDevice = ['sm', 'md', 'lg'].includes(media?.media ?? '')

    const mode = isMobileDevice
        ? mobileMode
        : isDesktopDevice
          ? desktopMode
          : LayoutModeEnum.VERTICAL

    return (
        <div className={'flex flex-row w-screen h-screen  overflow-hidden'}>
            <div className={'flex w-[200px]'}>{menu}</div>
            <div className={'flex flex-1 flex-row  overflow-hidden'}>
                <div className={'flex flex-1 flex-row overflow-y-auto'}>{body}</div>
            </div>
        </div>
    )
}
