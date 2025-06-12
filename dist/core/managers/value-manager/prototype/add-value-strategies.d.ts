import { IParserStrategy, IValueManager } from '../value-manager.types';
/**
 * Adds one or more parser strategies to the ValueStrategy instance.
 * Ensures no duplicate strategies are added.
 * @param parsers - Array of parser strategies to add.
 */
export declare function addValueStrategies(this: IValueManager, ...parsers: IParserStrategy<any>[]): void;
