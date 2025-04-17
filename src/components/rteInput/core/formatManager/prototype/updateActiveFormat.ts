import { RteCommandType, trackFormatingByTagName } from '../../rteInput.types'
import { IFormatManager } from '../formatManager.types'

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
