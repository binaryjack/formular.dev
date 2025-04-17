import { useEffect, useRef, useState } from 'react'
import { notify, TNotifierEventsType } from '../../../core/notifications/notifications.types'
import { RtiEngine } from '../core/rtiEngine/RtiEngine'

import {
    defaultEngineState,
    FormatsEnum,
    IEngineState,
    newCommand,
    TextEditEnum
} from '../core/rteInput.types'
import { IRtiEngine } from '../core/rtiEngine/rtiEngine.types'

export const useRteEngine = (
    editorRef: React.RefObject<HTMLDivElement>,
    initialState?: Partial<IEngineState>,
    onStateChanged?: (state: IEngineState) => void
) => {
    const rteEngine = useRef<IRtiEngine | null>(null)

    const [state, setState] = useState<IEngineState>(defaultEngineState)

    const handleUndo = () => rteEngine?.current?.undo?.()
    const handleRedo = () => rteEngine?.current?.redo?.()

    const handleCommand = (command: FormatsEnum) =>
        rteEngine?.current?.execute?.(newCommand(command))

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent) => {
        // Check if it's a React synthetic event or a native MouseEvent
        const nativeEvent = 'nativeEvent' in e ? e.nativeEvent : e

        rteEngine?.current?.mouseUp?.(nativeEvent)

        // Stop event propagation to prevent onClick from firing
        e.stopPropagation()
        e.preventDefault()
    }

    const handleMouseDown = () => rteEngine?.current?.mouseDown?.()
    const handleMouseMove = () => rteEngine?.current?.mouseMove?.()
    const handleMouseLeave = () => rteEngine?.current?.mouseLeave?.()
    // Handle text selection
    const handleSelectionChangeOnClick = () => rteEngine?.current?.mouseClick?.()

    /** State Refresh */

    const handleEngineRefresh = (state?: IEngineState) => setState(state ?? defaultEngineState)

    const acceptEngineNotificationStrategy = (localName: string, trigger: TNotifierEventsType) => {
        if (!rteEngine.current || !editorRef.current) return
        rteEngine.current.accept(
            notify(
                `${editorRef.current.id}_${localName}_${handleEngineRefresh.name}`,
                handleEngineRefresh.bind(useRteEngine),
                trigger
            )
        )
    }

    const handleInput = () => {
        if (editorRef?.current && rteEngine.current) {
            // Create a history entry for text input
            if (editorRef?.current) {
                const newContent = JSON.stringify(editorRef.current.innerHTML)

                // Only if content actually changed
                if (rteEngine?.current?.lastContent !== newContent) {
                    rteEngine.current.historyManager.addToHistory({
                        commandType: TextEditEnum.insertText,
                        timestamp: Date.now(),
                        previousState: rteEngine?.current?.lastContent || '',
                        newState: newContent
                    })

                    // Store last content for next comparison
                    rteEngine.current.lastContent = newContent
                }
            }

            // Normalize the HTML structure
            rteEngine.current.cleanHtml?.()

            const content = editorRef.current.innerText
            const cnt: IEngineState = state
                ? ({ ...state, content: content ?? '' } as IEngineState)
                : ({ content: content ?? '' } as IEngineState)

            setState(cnt)
        }
    }

    // Add effect to call onStateChange when state changes
    useEffect(() => {
        if (onStateChanged && state) {
            onStateChanged(state)
        }
    }, [state, onStateChanged])

    // Add effect to apply initialState if provided
    useEffect(() => {
        if (initialState && rteEngine?.current) {
            // Apply the initial state to the editor
            // You'll need to implement this logic
        }
    }, [initialState])

    useEffect(() => {
        const editor = editorRef.current
        if (editor) {
            const commandManager = new RtiEngine(editorRef.current)

            rteEngine.current = commandManager

            acceptEngineNotificationStrategy('engine_state_changed', 'engineStateChanged')

            editor.addEventListener('input', handleInput)
            editor.addEventListener('click', handleSelectionChangeOnClick)
            editor.addEventListener('mouseup', handleMouseUp)
            editor.addEventListener('mousedown', handleMouseDown)
            editor.addEventListener('mousemove', handleMouseMove)
            editor.addEventListener('mouseleave', handleMouseLeave)
        }
        return () => {
            if (editor) {
                editor.removeEventListener('input', handleInput)
                editor.removeEventListener('click', handleSelectionChangeOnClick)
                editor.removeEventListener('mouseup', handleMouseUp)
                editor.removeEventListener('mousedown', handleMouseDown)
                editor.removeEventListener('mousemove', handleMouseMove)
                editor.removeEventListener('mouseleave', handleMouseLeave)
            }
        }
    }, [])

    return {
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleSelectionChangeOnClick,
        handleCommand,
        handleInput,
        handleUndo,
        handleRedo,
        mouseState: state.mouseState,
        handleMouseLeave,
        state
    }
}
