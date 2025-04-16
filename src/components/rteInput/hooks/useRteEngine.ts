import { useEffect, useRef, useState } from 'react'
import { notify, TNotifierEventsType } from '../../../core/notifications/notifications.types'
import { RteEngine } from '../core/rteEngine/RteEngine'

import { IRteEngine } from '../core/rteEngine/rteEngine.types'
import {
    FormatsEnum,
    IEditorState,
    IEngineState,
    IMouseState,
    newCommand,
    TextEditEnum
} from '../core/rteInput.types'

export const useRteEngine = (editorRef: React.RefObject<HTMLDivElement>) => {
    const rteEngine = useRef<IRteEngine | null>(null)
    const [mouseState, setMouseState] = useState<IMouseState>({
        down: false,
        move: false
    })
    const [editorState, setEditorState] = useState<IEditorState | null>(null)

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
    const handleCommandsRefresh = (state?: IEditorState) => setEditorState(state ?? null)
    const handleEngineRefresh = (state?: IEngineState) =>
        state?.mouseState && setMouseState(state?.mouseState)

    const acceptCommandsNotificationStrategy = (
        localName: string,
        trigger: TNotifierEventsType
    ) => {
        if (!rteEngine.current || !editorRef.current) return
        rteEngine.current.commandManager.accept(
            notify(
                `${editorRef.current.id}_${localName}_${handleCommandsRefresh.name}`,
                handleCommandsRefresh.bind(useRteEngine),
                trigger
            )
        )
    }

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
            if (rteEngine.current.commandManager.editorElement) {
                const newContent = JSON.stringify(editorRef.current.innerHTML)

                // Only if content actually changed
                if (rteEngine?.current?.commandManager?.lastContent !== newContent) {
                    rteEngine.current.commandManager.addToHistory({
                        commandType: TextEditEnum.insertText,
                        timestamp: Date.now(),
                        previousState: rteEngine?.current?.commandManager?.lastContent || '',
                        newState: newContent
                    })

                    // Store last content for next comparison
                    rteEngine.current.commandManager.lastContent = newContent
                }
            }

            // Normalize the HTML structure
            rteEngine.current.commandManager.cleanHtml?.()

            const content = editorRef.current.innerText
            const cnt: IEditorState = editorState
                ? ({ ...editorState, content: content ?? '' } as IEditorState)
                : ({ content: content ?? '' } as IEditorState)

            setEditorState(cnt)
        }
    }

    useEffect(() => {
        const editor = editorRef.current
        if (editor) {
            const commandManager = new RteEngine(editorRef.current)

            rteEngine.current = commandManager

            acceptCommandsNotificationStrategy('command_state_changed', 'formattingStateChanged')
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
        mouseState,
        handleMouseLeave,
        editorState
    }
}
