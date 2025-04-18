import { TextEditEnum } from '../../rteInput.types'
import { IRtiEngine } from '../rtiEngine.types'

export const onExternalStateChanged = function (this: IRtiEngine, htmlContent: string | null) {
    // Only if content actually changed
    if (this.lastContent !== (htmlContent ?? '')) {
        this.historyManager.addToHistory({
            commandType: TextEditEnum.insertText,
            timestamp: Date.now(),
            previousState: this.lastContent,
            newState: htmlContent
        })

        // Store last content for next comparison
        this.lastContent = htmlContent
    }
}
