import { FormCreator } from '../../../../form/formyBase/Formy.creator'
import FieldSet from '../../fieldset/FieldSet'
import ValidationResultComponent from '../../validation/ValidationResult'
import SelectDrawer from './SelectDrawer'

interface ISelectProps {
    formId: string
    fieldName: string
}

const { getFieldHook, getForm } = FormCreator
const useField = getFieldHook()

const Select = ({ formId, fieldName }: ISelectProps) => {
    const currentForm = getForm(formId)
    const { field, flags } = useField(fieldName, currentForm?.fields)

    const handleDrawerOpenState = () => {
        field?.setOpenState(field?.openState === 'open' ? 'closed' : 'open')
    }
    console.log('Select RENDER')
    return (
        <FieldSet
            inputId={field?.name}
            label={field?.label}
            type={field?.type}
            flags={flags}
            itemsChildren={
                <SelectDrawer
                    items={field?.options ?? []}
                    onSetOpenState={handleDrawerOpenState}
                    drawerOpenState={field?.openState}
                />
            }
            validationChildren={
                <ValidationResultComponent validationResults={field?.validationResults ?? []} />
            }
            onClear={() => field?.clear()}
            onSetOpenState={handleDrawerOpenState}
            drawerOpenState={field?.openState}
        >
            <input data-class="base-input" {...field?.register()} ref={field?.ref()} />
        </FieldSet>
    )
}
export default Select
