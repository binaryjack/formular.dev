import { IStyleManager } from '../style-manager.types'
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

export const classNames = function (this: IStyleManager) {
    const ele = this.input?.domManager?.dmGet(this.input.id.toString())
    if (!ele) {
        // console.log('-----classNames: NO ELEMENT FOUND', this.input.id)
        return
    }

    // console.log('-----classNames', this.input.id, {
    //     element: ele,
    //     currentClassName: ele.className,
    //     dataClass: ele.getAttribute('data-class'),
    //     classesList: Array.from(this.classesList.entries())
    // })
    const userClassName = ele?.attributes.getNamedItem('data-class')?.value

    const flags: string[] = []

    // Add all state flags (only valid keys from InputClassStatesNamesType)
    const pristineFlag = this.classesList.get('pristine') ?? ''
    const dirtyFlag = this.classesList.get('dirty') ?? ''
    const focusFlag = this.classesList.get('focus') ?? ''
    const validFlag = this.classesList.get('valid') ?? ''
    const enabledFlag = this.classesList.get('enabled') ?? ''
    const busyFlag = this.classesList.get('busy') ?? ''

    // console.log('-----classNames FLAGS:', {
    //     pristine: pristineFlag,
    //     dirty: dirtyFlag,
    //     focus: focusFlag,
    //     valid: validFlag,
    //     enabled: enabledFlag,
    //     busy: busyFlag
    // })

    flags.push(pristineFlag)
    flags.push(dirtyFlag)
    flags.push(focusFlag)
    flags.push(validFlag)
    flags.push(enabledFlag)
    flags.push(busyFlag)

    const finalClassName = `${userClassName} ${this.className} ${flags.join(' ')}`.trim()
    // console.log('-----classNames BEFORE setAttribute:', {
    //     currentClassName: ele.className,
    //     finalClassName,
    //     flags: flags.filter((f) => f)
    // })
    ele.setAttribute('class', finalClassName)
    // console.log('-----classNames AFTER setAttribute:', ele.className)
    // return `${userClassName} ${this.className} ${this.get()} `
}
