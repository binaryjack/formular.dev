import { IFormatDefinition } from '../rteInput.types'
import { IRtiEngine } from '../rtiEngine/rtiEngine.types'

export interface IFormatManager {
    new (editorElement: HTMLElement, engine: IRtiEngine): IFormatManager
    editorElement: HTMLElement
    engine: IRtiEngine
    /**Formatting */
    activeFormat: IFormatDefinition[]
    isFormatApplied: (formatOrTagName: string) => boolean
    checkForAnyAppliedFormat: () => void

    applyFormatting: (tagName: string, range: Range, selection: Selection) => void
    applyListFormatting: (range: Range, selection: Selection) => void

    removeFormatting: (formatType: string) => void
    removeListFormatting: (range: Range, selection: Selection) => void

    updateActiveFormat: (tagName: string, active: boolean) => void
    processFragmentFormatting: (fragment: DocumentFragment, tagName: string) => DocumentFragment
    processFragment: (fragment: DocumentFragment, tagName: string) => DocumentFragment
}
