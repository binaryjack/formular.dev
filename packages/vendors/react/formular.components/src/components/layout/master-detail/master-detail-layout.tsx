import useAppContext from '@components/context/app-context/app-context.context'
import { useEffect, useState } from 'react'
import { LayoutModeEnum } from '../enum/layout-mode-enum'
import './master-detail-layout.css'
export interface IMasterDetailLayoutProps {
    menu: React.ReactNode
    body: React.ReactNode
}

export const MasterDetailLayout = ({ menu, body }: IMasterDetailLayoutProps) => {
    const { media } = useAppContext()
    const [mode, setMode] = useState<LayoutModeEnum | undefined>()
    useEffect(() => {
        if (media?.media === undefined) return
        const mode = ['sm', 'md'].includes(media.media)
            ? LayoutModeEnum.VERTICAL
            : ['2xs', 'xs'].includes(media.media)
              ? LayoutModeEnum.MOBILE
              : LayoutModeEnum.HORIZONTAL

        setMode(mode)
    }, [media?.media])

    return (
        <div className={`master-detail-layout ${mode}`}>
            {mode && (
                <>
                    <div className={`master-detail-menu`}>{menu}</div>
                    <div className={`master-detail-body`}>{body}</div>
                </>
            )}
        </div>
    )
}
