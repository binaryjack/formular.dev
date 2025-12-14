import { TextEditEnum } from '../../rti-engine.types'
import { IRtiEngine } from '../rti-engine.types'

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
