import { IFieldInput } from '../fieldInput.types'

export const registerOption = function (this: IFieldInput) {
    const updateUI = () => {
        this.observers.trigger()
    }
    const onClick = (e: MouseEvent | React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        this.value = (e.currentTarget as HTMLInputElement)?.value ?? ''
        // console.log('onClick', this.value, (e.currentTarget as HTMLInputElement)?.value)

        this.fieldStateStyle.update('dirty', this.originalValue !== this.value)

        this._notify('clicked', this.name, 'onChange')

        updateUI()

        e?.stopPropagation?.()
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

    return {
        onClick,
        onBlur,
        onFocus
    }
}
