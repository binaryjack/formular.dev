import { useEffect, useReducer, useRef, useState } from 'react'
import { notify, TNotifierEventsType } from '../../../core/notifications/notifications.types'
import { RteEngine } from '../core/rteEngine/RteEngine'
import { IRteEngine } from '../core/rteEngine/rteEngine.types'
import { IEditorState, ISelection } from '../core/rteInput.types'

export const useRteEngine = (editorRef: React.RefObject<HTMLDivElement>) => {
    const [, forceUpdate] = useReducer((x) => x + 1, 0)

    const rteEngine = useRef<IRteEngine | null>(null)

    const [selection, setSelection] = useState<ISelection | null>(null)
    const [htmlContent, setHtmlContent] = useState<string | null>(null)
    const [textContent, setTextContent] = useState<string | null>(null)
    const [jsonResult, setJsonResult] = useState<{ text: string }>({ text: '' })

    const handleResetSelectionOnMouseUp = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent
    ) => {
        if (!rteEngine.current || !editorRef.current) return
        rteEngine.current.handleResetSelection(editorRef.current)
    }

    const handleMouseDown = () => {
        if (!rteEngine.current || !editorRef.current) return
        rteEngine.current.handleMouseDownState(true)
    }
    const handleMouseMove = () => {
        if (!rteEngine.current || !editorRef.current) return
        rteEngine.current.handleMouseMoveState(true)
    }

    // Handle text selection
    const handleSelectionChangeOnClick = () => {
        if (!rteEngine.current || !editorRef.current) return
        rteEngine.current.handleSelectionChanged()
    }
    const handleRefresh = (state?: IEditorState) => {
        if (state) {
            setHtmlContent(state.html)
            setTextContent(state.text)
            setSelection(state.selection)
        }
        forceUpdate()
    }

    const acceptNotificationStrategy = (localName: string, trigger: TNotifierEventsType) => {
        if (!rteEngine.current || !editorRef.current) return
        rteEngine.current.commandManager.accept(
            notify(
                `${editorRef.current.id}_${localName}_${handleRefresh.name}`,
                handleRefresh.bind(useRteEngine),
                trigger
            )
        )
    }

    const handleInput = () => {
        if (editorRef?.current) {
            const content = editorRef.current.innerText
            setTextContent(content)
            setJsonResult({ text: content })
        }
    }

    useEffect(() => {
        const editor = editorRef.current
        if (editor) {
            const commandManager = new RteEngine(editorRef.current)

            rteEngine.current = commandManager

            acceptNotificationStrategy('changed_hook_field', 'formattingStateChanged')

            editor.addEventListener('input', handleInput)
            editor.addEventListener('click', handleSelectionChangeOnClick)
            editor.addEventListener('mouseup', handleResetSelectionOnMouseUp)
            editor.addEventListener('mousedown', handleMouseDown)
            editor.addEventListener('mousemove', handleMouseMove)
            // document.addEventListener('selectionchange', handleSelectionChange)
        }
        return () => {
            if (editor) {
                editor.removeEventListener('input', handleInput)
                editor.removeEventListener('click', handleSelectionChangeOnClick)
                editor.removeEventListener('mouseup', handleResetSelectionOnMouseUp)
                editor.removeEventListener('mousedown', handleMouseDown)
                editor.removeEventListener('mousemove', handleMouseMove)
                // document.removeEventListener('selectionchange', handleSelectionChange)
            }
        }
    }, [])

    return {
        handleMouseDown,
        handleMouseMove,
        handleResetSelectionOnMouseUp,
        handleSelectionChangeOnClick,
        handleInput,
        textContent,
        htmlContent,
        jsonResult,
        selection
    }
}
