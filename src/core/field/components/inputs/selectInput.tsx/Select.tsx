import useFormyContext, { useField } from '../../../../form/components/Formy/Formy.context'
import FieldSet from '../../fieldset/FieldSet'
import ValidationResultComponent from '../../validation/ValidationResult'
import SelectDrawer from './SelectDrawer'

interface ISelectProps {
    fieldName: string
}

const Select = ({ fieldName }: ISelectProps) => {
    const { formInstance } = useFormyContext()
    const { field, flags } = useField(formInstance?.getField(fieldName))

    const handleDrawerOpenState = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        e.preventDefault()
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
