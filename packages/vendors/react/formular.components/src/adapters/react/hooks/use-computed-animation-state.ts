import {
    DrawerAnimationController,
    IDrawerAnimationController
} from '@components/__v2/drawer/controller'
import { DrawerType } from '@components/__v2/drawer/types/drawer.types'
import { ToggleableStateType } from 'formular.dev.lib/types/formular-dev.es'
import { useEffect, useRef, useState } from 'react'

export type AnimationStateType = 'closed' | 'opening' | 'open' | 'closing'

export const useComputedAnimationState = (
    toggleState: ToggleableStateType,
    drawerType: DrawerType
) => {
    const controllerRef = useRef<IDrawerAnimationController | null>(null)
    const drawerRef = useRef<HTMLDivElement>(null)

    const [animationState, setAnimationState] = useState<AnimationStateType>('closed')

    // Initialize animation controller
    useEffect(() => {
        if (drawerRef.current && !controllerRef.current) {
            controllerRef.current = new DrawerAnimationController(drawerRef.current, drawerType)
        }

        return () => {
            controllerRef.current = null
        }
    }, [])

    // Update content height when the drawer is about to open for expandable drawers
    useEffect(() => {
        if (!controllerRef.current || drawerType !== 'expandable') return

        // Update content height before opening
        if (toggleState === 'open' && animationState === 'closed') {
            controllerRef.current.updateContentHeight()
        }
    }, [toggleState, animationState, drawerType])

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
