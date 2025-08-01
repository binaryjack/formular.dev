import { ToggleableStateType } from 'formular.dev.lib/types/formular-dev.es'
import { useEffect, useReducer, useRef } from 'react'

export type AnimationState = 'idle' | 'opening' | 'closing'

interface IAnimationStateSlice {
    animation: AnimationState
    toggle: ToggleableStateType
    showDrawer: boolean
}

const animationStateSlice: IAnimationStateSlice = {
    animation: 'idle',
    toggle: 'idle',
    showDrawer: false
}

// Define action types
type AnimationStateAction = { type: 'update'; payload: IAnimationStateSlice }

const animationStateReducer = (
    state: IAnimationStateSlice,
    action: AnimationStateAction
): IAnimationStateSlice => {
    switch (action.type) {
        case 'update':
        default:
            return { ...state, ...action.payload } as IAnimationStateSlice
    }
}

export const useAnimationState = (toggleState: ToggleableStateType) => {
    const drawerRef = useRef<HTMLDivElement>(null)

    const [animationStates, dispatch] = useReducer(animationStateReducer, animationStateSlice)

    const handleOnAnimationEnds = (e: AnimationEvent) => {
        if (toggleState === 'open' && animationStates.animation === 'opening') {
            dispatch({
                type: 'update',
                payload: { ...animationStates, toggle: toggleState, animation: 'idle' }
            })
        } else if (toggleState === 'closed' && animationStates.animation === 'closing') {
            dispatch({
                type: 'update',
                payload: { toggle: toggleState, animation: 'idle', showDrawer: false }
            })
        }
    }

    useEffect(() => {
        const element = drawerRef.current as unknown as HTMLElement
        if (!element) return

        element.addEventListener('animationend', handleOnAnimationEnds)
        return () => {
            element.removeEventListener('animationend', handleOnAnimationEnds)
        }
    }, [animationStates])

    useEffect(() => {
        const conditionToOpen =
            (toggleState === 'open' && animationStates.animation !== 'opening') ||
            (toggleState === 'open' && animationStates.animation === 'idle')

        if (conditionToOpen) {
            dispatch({
                type: 'update',
                payload: { toggle: toggleState, animation: 'opening', showDrawer: true }
            })
        } else if (toggleState === 'closed' && animationStates.animation !== 'closing') {
            dispatch({
                type: 'update',
                payload: { toggle: toggleState, animation: 'closing', showDrawer: true }
            })
        }
    }, [toggleState])

    return {
        animationStates,
        drawerRef
    }
}
