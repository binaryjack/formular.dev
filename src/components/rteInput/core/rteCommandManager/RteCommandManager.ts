import { NotifiableEntity } from '../../../../core/notifiableEntity/NotifiableEntity'

import { formatDefinitionMap } from '../rteInput.types'
import { applyCommand } from './prototype/applyCommand'
import { applyFormatting } from './prototype/applyFormatting'
import { checkForAnyAppliedFormat } from './prototype/checkForAnyAppliedFormat'
import { cleanHtml } from './prototype/cleanHtml'
// import { checkIfSelectionHasAppliedFormats } from './prototype/checkForAnyAppliedFormat'
// import { debouncedFormatCheck } from './prototype/debouncedFormatCheck'
import { execute } from './prototype/execute'
import { getAllNodesInRange } from './prototype/getAllNodesInRange'
import { getHistory } from './prototype/getHistory'
import { getState } from './prototype/getState'
import { insertText } from './prototype/insertText'
import { isFormatApplied } from './prototype/isFormatApplied'
import { normalizeHtml } from './prototype/normalizeHtml'
import { notifyStateChanges } from './prototype/notifyStateChanges'
import { processFragment } from './prototype/processFragment'
import { processFragmentFormatting } from './prototype/processFragmentFormatting'
import { redo } from './prototype/redo'
import { removeFormatting } from './prototype/removeFormatting'
import { resetEditor } from './prototype/resetEditor'
import { sanitizeHtml } from './prototype/sanitizeHtml'
import { setup } from './prototype/setup'
import { undo } from './prototype/undo'
import { unwrapFormatting } from './prototype/unwrapFormatting'
import { updateActiveFormat } from './prototype/updateActiveFormat'
import { IRteCommandManager } from './rteCommandManager.types'

export const RteCommandManager = function (this: IRteCommandManager, editorElement: HTMLElement) {
    this.editorElement = editorElement
    this.history = []
    this.redoStack = []
    this.currentIndex = -1
    this.activeFormat = formatDefinitionMap

    NotifiableEntity.call(this)
    this.setup()
} as any as IRteCommandManager

RteCommandManager.prototype = {
    ...NotifiableEntity.prototype
}

Object.assign(RteCommandManager.prototype, {
    setup,
    execute,
    isFormatApplied,
    checkForAnyAppliedFormat,
    undo,
    redo,
    applyCommand,
    getHistory,
    resetEditor,
    applyFormatting,
    processFragment,
    processFragmentFormatting,
    normalizeHtml,
    sanitizeHtml,
    cleanHtml,
    getAllNodesInRange,
    insertText,
    notifyStateChanges,
    removeFormatting,
    unwrapFormatting,
    updateActiveFormat,
    getState
})
