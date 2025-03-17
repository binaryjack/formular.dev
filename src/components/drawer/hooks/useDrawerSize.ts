import { useEffect, useRef } from 'react'

import { useDrawerContext } from '../Drawer.context'
import { IDrawerSize } from '../Drawer.types'

export const useDrawerSize = () => {
    const { drawerOpenState, reportDraweSize } = useDrawerContext()

    const drawerWrapperRef = useRef(null)

    const drawerWrapperElementHeight = () =>
        new Promise<IDrawerSize>((resolve) => {
            const _ele = drawerWrapperRef?.current as unknown as HTMLDivElement
            if (!_ele) return 0
            const to = setTimeout(() => {
                resolve({
                    width: _ele.getBoundingClientRect()?.width,
                    height: _ele.getBoundingClientRect()?.height
                })
                clearTimeout(to)
            }, 350)
        })

    useEffect(() => {
        drawerWrapperElementHeight().then((size: IDrawerSize) => {
            reportDraweSize(size)
        })
    }, [drawerOpenState])

    return {
        drawerWrapperRef,
        drawerOpenState
    }
}
