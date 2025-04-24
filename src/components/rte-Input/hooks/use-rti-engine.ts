import { useEffect, useRef, useState } from 'react'
import { notify, TNotifierEventsType } from '../../../core/notifications/notifications.types'
import { RtiEngine } from '../core/rti-engine/rti-engine'

import {
    defaultEngineState,
    FormatsEnum,
    IEngineState,
    IStateData,
    newCommand,
    newStateData
} from '../core/rti-engine.types'
import { IRtiEngine } from '../core/rti-engine/rti-engine.types'

export const useRtiEngine = (
    editorRef: React.RefObject<HTMLDivElement>,
    initialState: IStateData,
    onStateChanged?: (state: IStateData) => void
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

    const handleOnBlur = () => {
        if (!state || rteEngine?.current?.lastContent === state?.html) return
        if (onStateChanged && state) {
            onStateChanged(newStateData(state?.html))
        }
    }

    // Add this function to your useRteEngine hook
    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
        // Prevent the default paste behavior
        e.preventDefault()

        if (!editorRef?.current || !rteEngine.current) return

        // Get the clipboard data
        const clipboard = e.clipboardData
        rteEngine?.current?.handlePaste(clipboard)
    }

    /** State Refresh */

    const handleEngineRefresh = (state?: IEngineState) => setState(state ?? defaultEngineState)

    const normalizeStructure = () => rteEngine?.current?.normalizeStructure()

    const acceptEngineNotificationStrategy = (localName: string, trigger: TNotifierEventsType) => {
        if (!rteEngine.current || !editorRef.current) return
        rteEngine.current.accept(
            notify(
                `${editorRef.current.id}_${localName}_${handleEngineRefresh.name}`,
                handleEngineRefresh.bind(useRtiEngine),
                trigger
            )
        )
    }

    const handleInput = () => {
        if (editorRef?.current && rteEngine.current) {
            // Normalize structure first
            rteEngine.current.normalizeStructure()

            // Create a history entry for text input
            if (editorRef?.current) {
                const content = editorRef.current.innerText
                rteEngine?.current?.onExternalStateChanged(content)
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

    // Add this to your useRteEngine hook initialization
    useEffect(() => {
        if (
            editorRef.current &&
            (!editorRef.current.innerHTML || editorRef.current.innerHTML === '<br>')
        ) {
            // Start with an empty paragraph to ensure proper structure
            editorRef.current.innerHTML = '<p><br></p>'
        }
    }, [editorRef])

    // Add effect to apply initialState if provided
    useEffect(() => {
        if (!rteEngine?.current || !editorRef?.current) return

        rteEngine?.current?.onExternalStateChanged(initialState?.data)
        // You'll need to implement this logic
        rteEngine.current.setState?.(initialState?.data)

        const cnt: IEngineState = state
            ? ({ ...state, content: initialState?.data ?? '' } as IEngineState)
            : ({ content: initialState?.data ?? '' } as IEngineState)

        setState(cnt)
    }, [initialState?.ts])

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
        normalizeStructure,
        handleOnBlur,
        handlePaste,
        state
    }
}
