import { IRteCommandManager } from '../rteCommandManager.types'

export const insertText = function (
    this: IRteCommandManager,
    text: string,
    range: Range,
    selection: Selection
) {
    const textNode = document.createTextNode(text)
    range.insertNode(textNode)

    // Position cursor after inserted text
    range.setStartAfter(textNode)
    range.setEndAfter(textNode)
    selection.removeAllRanges()
    selection.addRange(range)
}
