import {
    DrawerAnimationController,
    IDrawerAnimationController
} from '@components/__v2/drawer/controller'
import { ToggleableStateType } from 'formular.dev.lib/types/formular-dev.es'
import { useEffect, useRef, useState } from 'react'

export type AnimationStateType = 'closed' | 'opening' | 'open' | 'closing'

interface IAnimationStateSlice {
    animation: AnimationStateType
    showDrawer: boolean
}

export const useComputedAnimationState = (toggleState: ToggleableStateType) => {
    const controllerRef = useRef<IDrawerAnimationController | null>(null)
    const drawerRef = useRef<HTMLDivElement>(null)

    const [animationState, setAnimationState] = useState<AnimationStateType>('closed')

    // Initialize animation controller
    useEffect(() => {
        if (drawerRef.current && !controllerRef.current) {
            controllerRef.current = new DrawerAnimationController(drawerRef.current)
        }

        return () => {
            controllerRef.current = null
        }
    }, [])

    // Handle toggleState changes and manage transitional states
    useEffect(() => {
        if (!controllerRef.current) return

        const controller = controllerRef.current

        // Determine what animation to trigger based on current state and target state
        if (
            toggleState === 'open' &&
            (animationState === 'closed' || animationState === 'closing')
        ) {
            // Start opening animation
            setAnimationState('opening')
            controller.open().then(() => {
                setAnimationState('open')
            })
        } else if (
            toggleState === 'closed' &&
            (animationState === 'open' || animationState === 'opening')
        ) {
            // Start closing animation
            setAnimationState('closing')
            controller.close().then(() => {
                setAnimationState('closed')
            })
        }
    }, [toggleState, animationState])

    return { drawerRef }
}
