import { RteCommandType, trackFormatingByTagName } from '../../rti-engine.types'
import { IFormatManager } from '../format-manager.types'

export const updateActiveFormat = function (
    this: IFormatManager,
    tagName: string,
    active: boolean
) {
    this.activeFormat = trackFormatingByTagName(
        this.activeFormat,
        tagName as RteCommandType,
        active
    )
}
