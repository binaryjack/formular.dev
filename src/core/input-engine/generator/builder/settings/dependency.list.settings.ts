/**  */

import { IInputBase } from '@core/input-engine/core/input-base/input-base.types'
import { IInitializableDependency } from '@core/managers/initialization-manager/initialization-manager.types'

/**
 * these dependencies reprensents all the composite classes that the base field needs
 * - fieldBaseInput: represents the base field input
 * Note: do not pass the fieldBaseInput twice.
 *
 * The dependencies that are passed by default and which are part of the FieldBaseInput
 * are:
 * - dom: represents the dom dependency
 * - tracker: represents the tracker dependency
 * - drawer: represents the drawer dependency
 * - styler: represents the styler dependency
 * - notifier: represents the notifier dependency
 * - validationStrategy: represents the validation strategy dependency
 * - valueStrategy: represents the value strategy dependency
 *
 * rest: represents the rest of the dependencies that should be initialized
 * afterwards.
 *
 * Note: the order of the dependencies matters. The dependencies that are passed
 * in the rest parameter will be initialized after the base dependencies.
 */
export const baseDependencyList = (
    fieldBaseInput: IInputBase,
    ...rest: IInitializableDependency[]
): IInitializableDependency[] => [
    /** these are the basic dependencies that all base field inputs needs in
     * order to work properly
     */
    fieldBaseInput.domManager,
    fieldBaseInput.trackingManager,
    fieldBaseInput.drawer,
    fieldBaseInput.styleManager,
    fieldBaseInput.notificationManager,
    fieldBaseInput.validationManager,
    fieldBaseInput.vlaueManager,
    fieldBaseInput,
    ...rest
]
