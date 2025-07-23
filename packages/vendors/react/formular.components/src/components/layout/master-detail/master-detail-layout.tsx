import useAppContext from '@components/context/app-context/app-context.context'
import { cx } from 'formular.design.system'
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
        <div
            className={cx(
                'flex ',
                mode === LayoutModeEnum.VERTICAL && 'flex-row bg-blue-300',
                mode === LayoutModeEnum.HORIZONTAL && 'flex-col bg-green-200',
                mode === LayoutModeEnum.MOBILE && 'flex-col bg-red-200'
            )}
        >
            {mode && (
                <div className={'flex overflow-hidden'}>
                    <div className={'flex overflow-hidden'}>{menu}</div>
                    <div className={'flex flex-row flex-1 overflow-hidden'}>
                        <div className={'flex flex-row overflow-y-auto'}>{body}</div>
                    </div>
                </div>
            )}
        </div>
    )
}
