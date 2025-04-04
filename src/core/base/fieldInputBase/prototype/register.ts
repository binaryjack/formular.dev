import { conventions } from '../../../../components/context/conventions/conventions'
import { IFieldInput } from '../fieldInput.types'

/**
 * The register function is used to register the event handlers for the field input.
 */
export const register = function <FieldValuesTypes>(this: IFieldInput) {
    const updateUI = () => {
        this.observers.trigger()
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (this.type === 'checkbox' || this.type === 'radio') {
            if (this?.internalHTMLElementRef?.current?.disabled) {
                this.value = this.internalHTMLElementRef.current.checked
                this.checked = this.value as boolean
            }
            this._notify('clicked', this.name, 'onChange')
        } else {
            this.value = e.currentTarget.value
            this._notify('changed', this.name, 'onChange')
        }
        this.isPristine = this.originalValue === this.value
        this.fieldStateStyle.update('pristine', this.isPristine)
        this.isDirty = this.originalValue !== this.value
        this.fieldStateStyle.update('dirty', this.isDirty)

        updateUI()

        e.stopPropagation()
    }

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        this.isFocus = false
        this.fieldStateStyle.update('focus', this.isFocus)

        this._notify('blurred', this.name, 'onBlur')
        updateUI()

        e.stopPropagation()
        e.preventDefault()
    }

    const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        this.isFocus = true
        this.fieldStateStyle.update('focus', this.isFocus)

        this._notify('focused', this.name, 'onFocus')
        updateUI()

        e.stopPropagation()
        e.preventDefault()
    }

    const onClick = (e: MouseEvent | React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        if (!this?.internalHTMLElementRef?.current || this.internalHTMLElementRef.current.disabled)
            return
        if (this.type !== 'checkbox' && this.type !== 'radio') return

        this._notify('clicked', this.name, 'onChange')

        this.value = this.internalHTMLElementRef.current.checked
        this.checked = this.value as boolean

        e?.stopPropagation?.()
    }

    /** ARIA BASICS */
    this.internalHTMLElementRef?.current?.setAttribute(
        'aria-labelledby',
        `${this.id}${conventions.suffix.labelId}`
    )
    this.internalHTMLElementRef?.current?.setAttribute('name', `${this.name}`)

    return {
        id: `${this.id}`,
        type: this.type,
        className: this.classNames(),
        label: this.label,
        onChange,
        onBlur,
        onFocus,
        onClick
    }
}
