import React, { CSSProperties, useRef, useState } from 'react'

const useRippleEffect = <E extends React.MouseEvent<HTMLButtonElement, MouseEvent>>(
    // buttonRef: React.RefObject<HTMLButtonElement>,
    onClickCallback: (e: E) => void,
    disabled: boolean
) => {
    const buttonRef = useRef(null)
    const [classRef, setClassRef] = useState<string>('')
    const [rippleStyle, setRippleStyle] = useState<CSSProperties>({} as CSSProperties)

    const onClick = (e: E) => {
        if (disabled) return

        if (!buttonRef?.current) return
        const btn = buttonRef?.current as unknown as HTMLButtonElement
        if (!btn) return

        const btnClientWidth = btn.getBoundingClientRect().width
        const btnClientHeight = btn.getBoundingClientRect().height

        const diameter = Math.max(btnClientWidth, btnClientHeight)

        const btnOffsetTop = btn.getBoundingClientRect().top
        const btnOffsetLeft = btn.getBoundingClientRect().left

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

        onClickCallback(e)
        const to = setTimeout(() => {
            setClassRef('')
            clearTimeout(to)
        }, 300)
    }

    return {
        buttonRef,
        onClick,
        classRef,
        rippleStyle
    }
}

export default useRippleEffect
