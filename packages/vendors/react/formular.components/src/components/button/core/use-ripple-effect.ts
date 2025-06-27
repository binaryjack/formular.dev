import { useObjectRef } from '@adapters/react/hooks/use-object-ref'
import React, { CSSProperties, useState } from 'react'

const useRippleEffect = <E extends React.MouseEvent<HTMLButtonElement, MouseEvent>>(
    // buttonRef: React.RefObject<HTMLButtonElement>,
    onClickCallback: (e: E) => void,
    disabled: boolean
) => {
    const [classRef, setClassRef] = useState<string>('')
    const [rippleStyle, setRippleStyle] = useState<CSSProperties>({} as CSSProperties)

    const { castedRefObject, mainRef } = useObjectRef<HTMLButtonElement>()

    const onClick = (e: E) => {
        if (disabled) return

        if (!mainRef?.current) return
        const btn = mainRef?.current as unknown as HTMLButtonElement
        if (!btn) return

        // Ensure the click is within the button boundaries
        const rect = btn.getBoundingClientRect()
        const isWithinBounds =
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom

        if (!isWithinBounds) return

        const btnClientWidth = rect.width
        const btnClientHeight = rect.height

        const diameter = Math.max(btnClientWidth, btnClientHeight)

        const btnOffsetTop = rect.top
        const btnOffsetLeft = rect.left

        const radius = diameter / 2
        /** determine initial diameter */
        const width = `${diameter}px`
        const height = `${diameter}px`

        const left = `${e.clientX - (btnOffsetLeft + radius)}px`
        const top = `${e.clientY - (btnOffsetTop + radius)}px`

        const _style: CSSProperties = {
            left: `${left}`,
            top: `${top}`,
            width: `${width}`,
            height: `${height}`
        }

        setRippleStyle(_style)

        setClassRef('animate')

        // Call the callback after setting up the ripple effect
        try {
            onClickCallback(e)
        } catch (error) {
            console.error('Error in button click callback:', error)
        }

        const to = setTimeout(() => {
            setClassRef('')
            clearTimeout(to)
        }, 300)
    }

    return {
        mainRef,
        castedRefObject,
        onClick,
        classRef,
        rippleStyle
    }
}

export default useRippleEffect
