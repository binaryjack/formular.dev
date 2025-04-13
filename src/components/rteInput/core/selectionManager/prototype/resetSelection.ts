import { ISelectionManager } from '../selectionManager.types'

export const resetSelection = function (this: ISelectionManager) {
    const selection = window.getSelection()

    if (selection === null || selection?.rangeCount === 0) return

    this.currentSelection = null
    if (selection) selection.removeAllRanges()
}
