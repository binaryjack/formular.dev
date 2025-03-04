import React from 'react'

const useRippleEffect = (
    spanRef: React.RefObject<HTMLSpanElement>,
    buttonRef: React.RefObject<HTMLButtonElement>,
    onClickCallback: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
) => {
    const handleOnMouseDown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!spanRef?.current) return
        const ripple = spanRef?.current as unknown as HTMLSpanElement
        if (!ripple) return
        ripple.classList.add('ripple')
    }

    const handleOnMouseUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!spanRef?.current) return
        const ripple = spanRef?.current as unknown as HTMLSpanElement
        if (!ripple) return
        ripple.classList.remove('ripple')
    }

    const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        e.preventDefault()
        if (!spanRef?.current) return
        if (!buttonRef?.current) return
        const ripple = spanRef?.current as unknown as HTMLSpanElement
        const btn = buttonRef?.current as unknown as HTMLButtonElement
        if (!ripple || !btn) return

        const btnClientWidth = btn.getBoundingClientRect().width
        const btnClientHeight = btn.getBoundingClientRect().height

        const diameter = Math.max(btnClientWidth, btnClientHeight)

        const eventClientX = e.currentTarget.clientTop
        const eventClientY = e.currentTarget.clientLeft

        const btnOffsetTop = btn.offsetTop
        const btnOffsetWidth = btn.offsetLeft

        const radius = diameter / 2
        /** determine initial diameter */
        ripple.style.width = ripple.style.height = `${diameter}px`

        console.log(eventClientX, eventClientY, btnClientWidth, btnClientHeight)

        ripple.style.left = `${eventClientX - btnOffsetWidth + radius}px`
        // ripple.style.left = `${e.clientX - (btn.offsetLeft + radius)}px`
        ripple.style.top = `${eventClientY - btnOffsetTop + radius}px`

        ripple.classList.add('ripple')

        onClickCallback(e)
        const to = setTimeout(() => {
            ripple.classList.remove('ripple')
            clearTimeout(to)
        }, 1000)
    }

    return {
        onClick,
        handleOnMouseUp,
        handleOnMouseDown
    }
}

export default useRippleEffect
