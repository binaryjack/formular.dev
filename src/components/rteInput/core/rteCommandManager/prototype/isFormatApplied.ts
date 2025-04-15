import { IRteCommandManager } from '../rteCommandManager.types'
export const isFormatApplied = function (
    this: IRteCommandManager,
    formatOrTagName: string
): boolean {
    const format = this.activeFormat.find(
        (o) => o.formatName === formatOrTagName || o.tagName === formatOrTagName
    )
    return format?.active ?? false
}
