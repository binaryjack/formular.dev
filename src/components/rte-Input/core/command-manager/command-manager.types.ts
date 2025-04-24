import { IRteCommand } from '../rti-engine.types'
import { IRtiEngine } from '../rti-engine/rti-engine.types'

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
