import { useMemo } from 'react'
import { IEngineState } from '../../core/rteInput.types'

interface IRteDebugProps {
    editorRef: React.RefObject<HTMLDivElement>
    engineState: IEngineState | null
}

const prettifyHTML = (html: string): string => {
    const formatted = html
        .replace(/></g, '>\n<') // Add newlines between tags
        .replace(/\s{2,}/g, ' ') // Remove extra spaces
        .replace(/^\s+|\s+$/g, '') // Trim leading/trailing spaces
    return formatted
}

const RteDebug = (props: IRteDebugProps) => {
    const { engineState, editorRef } = props

    const htmlOutput = useMemo(() => {
        const prettified = prettifyHTML(editorRef?.current?.innerHTML ?? '')
        return prettified ///Prism.highlight(prettified, Prism.languages.html, 'html')
    }, [editorRef?.current?.innerHTML ?? ''])
    return (
        <div>
            <h3>RTE Debugger</h3>
            <div className=" flex flex-col  w-[700px]  h-full  text-wrap overflow-auto border-2 border-solid border-slate-300 m-1 p-1n">
                <strong>Structure:</strong>
                <pre>{JSON.stringify(engineState?.content, null, 2)}</pre>
            </div>

            <div className=" flex flex-row  max-w-[700px] max-h-[300px] text-wrap overflow-hidden">
                <div className=" flex flex-col w-[300px]  h-auto text-wrap overflow-auto border-2 border-solid border-slate-300 m-1 p-1">
                    <strong>format:</strong>
                    {engineState?.selection && (
                        <table>
                            <thead>
                                <tr>
                                    <th>format</th>
                                    <th>format</th>
                                </tr>
                            </thead>
                            <tbody>
                                {engineState?.activeFormatState?.map((af, i) => {
                                    return (
                                        <tr
                                            key={`${af.formatName}-${i}`}
                                            className={`${af.active ? 'bg-green-600' : ''}`}
                                        >
                                            <td>{af.formatName}</td>
                                            <td>{af.tagName}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    )}
                </div>

                <div className=" flex flex-col w-[300px]  h-auto  text-wrap overflow-auto border-2 border-solid border-slate-300 m-1 p-1">
                    <strong>Selection:</strong>
                    {engineState?.selection && (
                        <pre lang="">
                            <div>{JSON.stringify(engineState?.selection, null, 2)}</div>
                        </pre>
                    )}
                </div>
                <div className=" flex flex-col  w-full  h-auto  text-wrap overflow-auto border-2 border-solid border-slate-300 m-1 p-1">
                    <strong>HTML</strong>
                    <pre lang="hmtl">{htmlOutput}</pre>
                </div>
            </div>
        </div>
    )
}

export default RteDebug
