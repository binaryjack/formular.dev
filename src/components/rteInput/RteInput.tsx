import { useEffect, useRef, useState } from 'react'

export interface IRteInputProps {
    id: string
}

export const RteInput = ({ id }: IRteInputProps) => {
    const editorRef = useRef<HTMLDivElement>(null)
    const [jsonResult, setJsonResult] = useState<{ text: string }>({ text: '' })
    const [content, setContent] = useState('')
    const handleInput = () => {
        const content = editorRef.current?.innerText ?? ''
        setContent(content)
        setJsonResult({ text: content })
    }

    useEffect(() => {
        const editor = editorRef.current
        if (editor) {
            editor.contentEditable = 'true'

            editor.addEventListener('input', handleInput)
        }
        return () => {
            if (editor) {
                editor.removeEventListener('input', handleInput)
            }
        }
    }, [])

    return (
        <div id={id} className={`flex flex-row`}>
            <div
                contentEditable={true}
                suppressContentEditableWarning={true}
                ref={editorRef}
                // onInput={handleInput}
                // onChange={handleInput}
                // dangerouslySetInnerHTML={{ __html: content }}
                className={`flex w-[500px] h-full mr-3 cursor-text min-h-[100px] p-[8px] border-2 border-slate-400`}
            />
            <div style={{ marginTop: '16px' }}>
                <strong>Structure:</strong>
                <pre>{JSON.stringify(jsonResult, null, 2)}</pre>
            </div>
        </div>
    )
}
