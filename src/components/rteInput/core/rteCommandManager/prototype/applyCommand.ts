import { FormatsEnum, IRteCommand, TextEditEnum } from '../../rteInput.types'
import { IRteCommandManager } from '../rteCommandManager.types'

export const applyCommand = function (this: IRteCommandManager, command: IRteCommand) {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)

    switch (command.type) {
        case FormatsEnum.bold:
            this.applyFormatting('strong', range, selection)
            break
        case FormatsEnum.italic:
            this.applyFormatting('em', range, selection)
            break
        case FormatsEnum.underline:
            this.applyFormatting('u', range, selection)
            break
        case FormatsEnum.strikethrough:
            this.applyFormatting('s', range, selection)
            break
        case TextEditEnum.insertText:
            this.insertText(command.payload, range, selection)
            break
        case TextEditEnum.deleteText:
            range.deleteContents()
            break
        default:
            throw new Error(`Unknown command type: ${command.type}`)
    }

    // Notify observers about the change
    this.notifyStateChanges()
}
