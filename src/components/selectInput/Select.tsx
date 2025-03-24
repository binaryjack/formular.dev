import useKeyBindings from '../../core/hooks/useKeyBindings'
import { conventions } from '../context/conventions/conventions'
import { DrawerOpenStateType } from '../drawer/Drawer.types'
import FieldSet from '../fieldset/FieldSet'
import useFormyContext, { useField } from '../Formy/Formy.context'
import ValidationResultComponent from '../validationResult/ValidationResult'
import SelectDrawerContent from './Select.drawer.content'

interface ISelectProps {
    fieldName: string
}

const Select = ({ fieldName }: ISelectProps) => {
    const { formInstance } = useFormyContext()
    const { field, flags } = useField(formInstance?.getField(fieldName))

    const handleDrawerOpenState = (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        state: DrawerOpenStateType
    ) => {
        e?.stopPropagation?.()
        e?.preventDefault?.()
        field?.setOpenState(state)
    }

    const { handleKeyDown } = useKeyBindings({
        onArrowDownCallback: () => {
            handleDrawerOpenState({} as any, 'open')
        },
        onDeleteCallback: () => {
            field?.clear()
        }
    })

    return (
        <FieldSet
            inputId={field?.name ?? conventions.IdIsEmpty()}
            label={field?.label}
            type={field?.type}
            flags={flags}
            onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                field?.focus()
            }}
            itemsChildren={
                <SelectDrawerContent
                    filterTriggerDelay={500}
                    items={field?.options ?? []}
                    onSelectItem={(value) => field?.onSelectItem(value)}
                />
            }
            validationChildren={
                <ValidationResultComponent validationResults={field?.validationResults ?? []} />
            }
            onClear={() => field?.clear()}
        >
            <input
                data-class="base-input"
                {...field?.register()}
                ref={field?.ref()}
                onKeyDown={handleKeyDown}
                autoComplete="off"
            />
        </FieldSet>
    )
}
export default Select
