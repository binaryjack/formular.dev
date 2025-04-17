import { IRteCommand } from '../rteInput.types'
import { IRtiEngine } from '../rtiEngine/rtiEngine.types'

export interface ICommandManager {
    new (editorElement: HTMLElement, engine: IRtiEngine): ICommandManager
    /**PRIVATE */
    editorElement: HTMLElement
    engine: IRtiEngine
    /**PUBLIC */

    /**Commands */
    execute: (command: Omit<IRteCommand, 'timestamp'>) => boolean
    applyCommand: (command: IRteCommand) => void

    /**selection */
    setup: () => void
}
