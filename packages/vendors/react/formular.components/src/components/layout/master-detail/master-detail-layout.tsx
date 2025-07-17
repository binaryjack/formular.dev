import useAppContext from '@components/context/app-context/app-context.context'
import { cx } from 'formular.design.system'
import { LayoutModeEnum } from '../enum/layout-mode-enum'
export interface IMasterDetailLayoutProps {
    menu: React.ReactNode
    body: React.ReactNode
}

export const MasterDetailLayout = ({ menu, body }: IMasterDetailLayoutProps) => {
    const { media } = useAppContext()
    const mode = ['sm', 'md'].includes(media?.media ?? '')
        ? LayoutModeEnum.VERTICAL
        : ['2xs', 'xs'].includes(media?.media ?? '')
          ? LayoutModeEnum.MOBILE
          : LayoutModeEnum.HORIZONTAL

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
                            'flex',
                            mode === LayoutModeEnum.VERTICAL &&
                                'flex-none w-1/4 h-auto bg-gray-200',
                            mode === LayoutModeEnum.HORIZONTAL &&
                                'flex-none w-full h-auto bg-gray-200',
                            mode === LayoutModeEnum.MOBILE && 'flex-none w-full h-10 bg-gray-200'
                        )}
                    >
                        {menu}
                    </div>
                    <div className={cx('flex h-auto w-screen overflow-y-auto')}>{body}</div>
                </>
            )}
        </div>
    )
}
