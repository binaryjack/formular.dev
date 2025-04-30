import { useScrollingContext } from '@components/context/scrolling/scrolling.context'
import { useCallback, useEffect, useState } from 'react'

export interface IElementRef {
    height: number
    width: number
    top: number
    left: number
    right: number
    x: number
    y: number
}

export const useElementRef = <T extends HTMLElement>(inputRef: React.RefObject<T>) => {
    const [elementPositionRefs, setElementPositionRefs] = useState<IElementRef>({} as IElementRef)

    const { screenProperties } = useScrollingContext()

    const computePosition = useCallback(() => {
        const _el = inputRef?.current as unknown as T
        if (!_el) return

        const elBC = _el.getBoundingClientRect?.()

        const output: IElementRef = {
            height: elBC?.height ?? 0,
            width: elBC?.width ?? 0,
            top: elBC?.top ?? 0,
            left: elBC?.left ?? 0,
            right: elBC?.right ?? 0,
            x: elBC?.x ?? 0,
            y: elBC?.y ?? 0
        }

        setElementPositionRefs(output)
    }, [inputRef])

    useEffect(() => {
        computePosition()
    }, [screenProperties.scrollY])

    return { elementPositionRefs, scrollY }
}
