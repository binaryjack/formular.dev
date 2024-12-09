import { IFieldDescriptor } from '../../../../../dependency/schema/descriptor/field.descriptor'
import { INotifiableEntity } from '../../../../notifiableEntity/notifiableEntityBase.types'
import { IFieldInputBase } from '../../../fieldInputBase/fieldInput.types'
import { IFlagsObject } from '../../../fieldStateStyle/fieldStateStyle.types'
import FieldSet from '../../fieldset/FieldSet'
import ValidationResultComponent from '../../validation/ValidationResult'

interface IInputTextProps {
    field: (IFieldInputBase & IFieldDescriptor & INotifiableEntity) | undefined
    flags: IFlagsObject
}

const InputText = ({ field, flags }: IInputTextProps) => {
    return (
        <div>
            <FieldSet
                inputId={field?.name}
                label={field?.label}
                type={field?.type}
                flags={flags}
                validationChildren={
                    <ValidationResultComponent validationResults={field?.validationResults ?? []} />
                }
                onClear={() => field?.clear()}
            >
                <input data-class="base-input" {...field?.register()} ref={field?.ref()} />
            </FieldSet>

            <button onClick={() => field?.setFocus()}>focus Field</button>
            <button onClick={() => field?.enable(true)}>enable</button>
            <button onClick={() => field?.enable(false)}>disable</button>
            <button onClick={() => field?.clear()}>clear</button>
        </div>
    )
}
export default InputText
