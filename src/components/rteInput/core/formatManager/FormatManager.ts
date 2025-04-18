import { formatDefinitionMap } from '../rteInput.types'
import { IRtiEngine } from '../rtiEngine/rtiEngine.types'
import { IFormatManager } from './formatManager.types'
import { applyFormatting } from './prototype/applyFormatting'
import { applyLinkFormatting } from './prototype/applyLinkFormatting'
import { applyListFormatting } from './prototype/applyListFormatting'
import { checkForAnyAppliedFormat } from './prototype/checkForAnyAppliedFormat'
import { isFormatApplied } from './prototype/isFormatApplied'
import { processFragment } from './prototype/processFragment'
import { processFragmentFormatting } from './prototype/processFragmentFormatting'
import { removeFormatting } from './prototype/removeFormatting'
import { removeLinkFormatting } from './prototype/removeLinkFormatting'
import { removeListFormatting } from './prototype/removeListFormatting'
import { updateActiveFormat } from './prototype/updateActiveFormat'

export const FormatManager = function (
    this: IFormatManager,
    editorElement: HTMLElement,
    engine: IRtiEngine
) {
    this.editorElement = editorElement
    this.activeFormat = formatDefinitionMap
    this.engine = engine
} as any as IFormatManager

Object.assign(FormatManager.prototype, {
    isFormatApplied,
    checkForAnyAppliedFormat,
    applyFormatting,
    applyListFormatting,
    removeFormatting,
    removeListFormatting,
    updateActiveFormat,
    processFragmentFormatting,
    processFragment,
    applyLinkFormatting,
    removeLinkFormatting
})
