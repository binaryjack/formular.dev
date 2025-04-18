import React, { useEffect, useRef, useState } from 'react'

interface LinkDialogProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: (url: string, text: string) => void
    initialUrl?: string
    initialText?: string
}

export const LinkDialog: React.FC<LinkDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    initialUrl = '',
    initialText = ''
}) => {
    const [url, setUrl] = useState(initialUrl)
    const [text, setText] = useState(initialText)
    const urlInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isOpen && urlInputRef.current) {
            urlInputRef.current.focus()
        }
    }, [isOpen])

    useEffect(() => {
        setUrl(initialUrl)
        setText(initialText)
    }, [initialUrl, initialText])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Add http:// if no protocol is specified
        let processedUrl = url.trim()
        if (processedUrl && !/^https?:\/\//i.test(processedUrl)) {
            processedUrl = 'http://' + processedUrl
        }
        onConfirm(processedUrl, text)
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-4 rounded-md shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-4">Insert Link</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label
                            htmlFor="in-urlInputRef"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            URL
                        </label>
                        <input
                            id={`in-urlInputRef`}
                            ref={urlInputRef}
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="https://example.com"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="in-text"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Text
                        </label>
                        <input
                            id={`in-text`}
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Link text"
                        />
                    </div>
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={!url.trim()}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                            Insert
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
