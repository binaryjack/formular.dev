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
                'flex h-full w-full flex-1',
                mode === LayoutModeEnum.VERTICAL && 'flex-row bg-blue-300',
                mode === LayoutModeEnum.HORIZONTAL && 'flex-col bg-green-200',
                mode === LayoutModeEnum.MOBILE && 'flex-col bg-red-200'
            )}
        >
            {mode && (
                <>
                    <div
                        className={cx(
                            'flex fixed h-full overflow-y-auto',
                            mode === LayoutModeEnum.VERTICAL &&
                                'flex-none min-w-1/5 h-auto bg-gray-200',
                            mode === LayoutModeEnum.HORIZONTAL &&
                                'flex-none w-full h-auto bg-gray-200',
                            mode === LayoutModeEnum.MOBILE && 'flex-none w-full h-10 bg-gray-200'
                        )}
                    >
                        {menu}
                    </div>
                    <div className={cx('flex h-screen w-screen overflow-y-auto')}>{body}</div>
                </>
            )}
        </div>
    )
}
