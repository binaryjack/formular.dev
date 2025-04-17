import { IFormatManager } from '../formatManager.types'
export const isFormatApplied = function (this: IFormatManager, formatOrTagName: string): boolean {
    const format = this.activeFormat.find(
        (o) => o.formatName === formatOrTagName || o.tagName === formatOrTagName
    )
    return format?.active ?? false
}
