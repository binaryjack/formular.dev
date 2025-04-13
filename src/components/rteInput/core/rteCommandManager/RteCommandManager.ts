import { NotifiableEntity } from '../../../../core/notifiableEntity/NotifiableEntity'

import { formatDefinitionMap } from '../rteInput.types'
import { applyCommand } from './prototype/applyCommand'
import { applyFormatting } from './prototype/applyFormatting'
import { checkIfAnyAppliedFormat } from './prototype/checkIfAnyAppliedFormat'
import { checkIfSelectionHasAppliedFormats } from './prototype/checkIfSelectionHasAppliedFormats'
import { execute } from './prototype/execute'
import { getHistory } from './prototype/getHistory'
import { getState } from './prototype/getState'
import { insertText } from './prototype/insertText'
import { isFormatApplied } from './prototype/isFormatApplied'
import { notifyStateChanges } from './prototype/notifyStateChanges'
import { redo } from './prototype/redo'
import { removeFormatting } from './prototype/removeFormatting'
import { resetEditor } from './prototype/resetEditor'
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
    undo,
    redo,
    applyCommand,
    getHistory,
    resetEditor,
    applyFormatting,
    insertText,
    notifyStateChanges,
    isFormatApplied,
    removeFormatting,
    unwrapFormatting,
    updateActiveFormat,
    checkIfAnyAppliedFormat,
    checkIfSelectionHasAppliedFormats,
    getState
})
