import { FormatsArray } from '../../rteInput.types'
import { IRteCommandManager } from '../rteCommandManager.types'

export const checkIfAnyAppliedFormat = function (this: IRteCommandManager) {
    FormatsArray.forEach((format) => {
        const isApplied = this.isFormatApplied(format)
        this.updateActiveFormat(format, isApplied)
    })
}
