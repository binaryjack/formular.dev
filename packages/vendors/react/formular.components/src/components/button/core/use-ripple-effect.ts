import { useObjectRef } from '@adapters/react/hooks/use-object-ref'
import React, { CSSProperties, useCallback, useState } from 'react'

interface RippleData {
    id: number
    style: CSSProperties
    scale: number
    opacity: number
}

const useRippleEffect = <E extends React.MouseEvent<HTMLButtonElement, MouseEvent>>(
    onClickCallback: (e: E) => void,
    disabled: boolean
) => {
    const [ripples, setRipples] = useState<RippleData[]>([])

    const { castedRefObject, mainRef } = useObjectRef<HTMLButtonElement>()

    const onClick = useCallback(
        (e: E) => {
            if (disabled) return

            if (!mainRef?.current) return
            const btn = mainRef.current

            // Ensure the click is within the button boundaries
            const rect = btn.getBoundingClientRect()
            const isWithinBounds =
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom

            if (!isWithinBounds) return

            // Calculate position relative to the button element
            const relativeX = e.clientX - rect.left
            const relativeY = e.clientY - rect.top

            // Calculate diameter to cover the entire button from click point
            const btnWidth = rect.width
            const btnHeight = rect.height

            const distanceToCorners = [
                Math.sqrt(Math.pow(relativeX, 2) + Math.pow(relativeY, 2)),
                Math.sqrt(Math.pow(btnWidth - relativeX, 2) + Math.pow(relativeY, 2)),
                Math.sqrt(Math.pow(relativeX, 2) + Math.pow(btnHeight - relativeY, 2)),
                Math.sqrt(Math.pow(btnWidth - relativeX, 2) + Math.pow(btnHeight - relativeY, 2))
            ]

            const maxDistance = Math.max(...distanceToCorners)
            const diameter = maxDistance * 2

            // Create new ripple
            const newRipple: RippleData = {
                id: Date.now(),
                style: {
                    left: `${relativeX - diameter / 2}px`,
                    top: `${relativeY - diameter / 2}px`,
                    width: `${diameter}px`,
                    height: `${diameter}px`
                },
                scale: 0,
                opacity: 0.5
            }

            // Add new ripple to the list
            setRipples((prev) => [...prev, newRipple])

            // Animate the ripple manually using requestAnimationFrame
            const startTime = Date.now()
            const animationDuration = 300

            const animate = () => {
                const elapsed = Date.now() - startTime
                const progress = Math.min(elapsed / animationDuration, 1)

                setRipples((prev) =>
                    prev.map((ripple) =>
                        ripple.id === newRipple.id
                            ? {
                                  ...ripple,
                                  scale: progress * 2,
                                  opacity: 0.5 * (1 - progress)
                              }
                            : ripple
                    )
                )

                if (progress < 1) {
                    requestAnimationFrame(animate)
                } else {
                    // Remove ripple after animation completes
                    setTimeout(() => {
                        setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
                    }, 50)
                }
            }

            requestAnimationFrame(animate)

            // Call the original callback
            try {
                onClickCallback(e)
            } catch (error) {
                console.error('Error in button click callback:', error)
            }
        },
        [disabled, mainRef, onClickCallback]
    )

    return {
        mainRef,
        castedRefObject,
        onClick,
        ripples
    }
}

export default useRippleEffect
