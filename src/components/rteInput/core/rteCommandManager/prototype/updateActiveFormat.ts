import { RteCommandType, trackFormatingByTagName } from '../../rteInput.types'
import { IRteCommandManager } from '../rteCommandManager.types'

export const updateActiveFormat = function (
    this: IRteCommandManager,
    tagName: string,
    active: boolean
) {
    this.activeFormat = trackFormatingByTagName(
        this.activeFormat,
        tagName as RteCommandType,
        active
    )
}
