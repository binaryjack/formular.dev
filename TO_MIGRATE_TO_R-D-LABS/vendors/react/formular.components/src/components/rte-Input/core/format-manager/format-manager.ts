import { formatDefinitionMap } from '../rti-engine.types'
import { IRtiEngine } from '../rti-engine/rti-engine.types'
import { IFormatManager } from './format-manager.types'
import { applyFormatting } from './prototype/apply-formatting'
import { applyLinkFormatting } from './prototype/apply-link-formatting'
import { applyListFormatting } from './prototype/apply-list-formatting'
import { checkForAnyAppliedFormat } from './prototype/check-for-any-applied-format'
import { isFormatApplied } from './prototype/is-format-applied'
import { processFragment } from './prototype/process-fragment'
import { processFragmentFormatting } from './prototype/process-fragment-formatting'
import { removeFormatting } from './prototype/remove-formatting'
import { removeLinkFormatting } from './prototype/remove-link-formatting'
import { removeListFormatting } from './prototype/remove-list-formatting'
import { updateActiveFormat } from './prototype/update-active-format'

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
