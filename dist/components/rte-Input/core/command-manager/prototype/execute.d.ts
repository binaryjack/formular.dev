import { IRteCommand } from '../../rti-engine.types';
import { ICommandManager } from '../command-manager.types';
export declare const execute: (this: ICommandManager, command: Omit<IRteCommand, "timestamp">) => boolean;
