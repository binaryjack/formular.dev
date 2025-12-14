import { IRtiEngine } from '../rti-engine/rti-engine.types'
import { ICommandManager } from './command-manager.types'
import { applyCommand } from './prototype/apply-command'
import { execute } from './prototype/execute'
import { setup } from './prototype/setup'

export const CommandManager = function (
    this: ICommandManager,
    editorElement: HTMLElement,
    engine: IRtiEngine
) {
    this.editorElement = editorElement
    this.engine = engine
    this.setup()
} as any as ICommandManager

Object.assign(CommandManager.prototype, {
    setup,
    execute,
    applyCommand
})
