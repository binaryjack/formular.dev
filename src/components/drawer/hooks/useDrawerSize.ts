import { useEffect, useRef } from 'react'

import { useDrawerContext } from '../Drawer.context'

export const useDrawerSize = () => {
    const { drawerOpenState, reportDraweSize } = useDrawerContext()

    const drawerWrapperRef = useRef(null)

    const drawerWrapperElementHeight = () =>
        new Promise<number>((resolve) => {
            const _ele = drawerWrapperRef?.current as unknown as HTMLDivElement
            if (!_ele) return 0
            const to = setTimeout(() => {
                resolve(_ele.getBoundingClientRect()?.height)
                clearTimeout(to)
            }, 350)
        })

    useEffect(() => {
        drawerWrapperElementHeight().then((size: number) => {
            reportDraweSize(size)
        })
    }, [drawerOpenState])

    return {
        drawerWrapperRef,
        drawerOpenState
    }
}
