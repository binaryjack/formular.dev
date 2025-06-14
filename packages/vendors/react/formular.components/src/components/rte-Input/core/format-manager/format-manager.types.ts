import { IFormatDefinition } from '../rti-engine.types'
import { IRtiEngine } from '../rti-engine/rti-engine.types'

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
    applyLinkFormatting: (url: string, text?: string) => void

    removeFormatting: (formatType: string) => void
    removeListFormatting: (range: Range, selection: Selection) => void
    removeLinkFormatting: () => void

    updateActiveFormat: (tagName: string, active: boolean) => void
    processFragmentFormatting: (fragment: DocumentFragment, tagName: string) => DocumentFragment
    processFragment: (fragment: DocumentFragment, tagName: string) => DocumentFragment
}
