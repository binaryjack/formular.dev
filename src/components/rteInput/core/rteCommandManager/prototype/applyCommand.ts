import { formatDefinitionMap, FormatsEnum, IRteCommand } from '../../rteInput.types'
import { IRteCommandManager } from '../rteCommandManager.types'

export const applyCommand = function (this: IRteCommandManager, command: IRteCommand) {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)

    const tagName = formatDefinitionMap.find((o) => o.formatName === command.type)?.tagName
    if (!tagName) return

    switch (command.type) {
        case FormatsEnum.bold:
        case FormatsEnum.italic:
        case FormatsEnum.underline:
            // Inline formatting
            this.applyFormatting(tagName, range, selection)
            break

        case FormatsEnum.unorderedList:
            // List formatting - needs special handling
            this.applyListFormatting(range, selection)
            break

        default:
            console.warn(`Unhandled command type: ${command.type}`)
            break
    }

    // Notify observers about the change
    this.notifyStateChanges()
}
