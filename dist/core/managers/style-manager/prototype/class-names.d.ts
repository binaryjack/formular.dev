import { IStyleManager } from '../style-manager.types';
/** the reason of using data-class instead of className
 *
 * className attribute is mainly used in jsx or tsx context to act as class (html) at the end of the day.
 *
 * Well, as we have a internal mechanism to manage the class names for the input states
 * and we want to keep the initial component class name we use data-class to do so.
 *
 * this exists for two reasons:
 *   1) for more readability and to avoid confusion between the initial class name and the class name.
 *   2) to avoid the need to parse className get the original input class name if the state changes.
 */
export declare const classNames: (this: IStyleManager) => void;
