import { IRteCommand } from '../../rti-engine.types';
import { IRtiEngine } from '../rti-engine.types';
export declare const execute: (this: IRtiEngine, command: Omit<IRteCommand, "timestamp">) => void;
