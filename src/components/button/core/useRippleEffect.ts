import React, { useRef, useState } from 'react'

const useRippleEffect = (
    id: string,
    // buttonRef: React.RefObject<HTMLButtonElement>,
    onClickCallback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    disabled: boolean
) => {
    const buttonRef = useRef(null)
    const [classRef, setClassRef] = useState<string>('')
    const [rippleStyle, setRippleStyle] = useState<string>('')

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (disabled) return
        e.stopPropagation()
        e.preventDefault()

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

        const _style = `
            #${id} .btn-base span.ripple {
                left:${left};
                top:${top};
                width:${width};
                height:${height};
             }        
        `

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
