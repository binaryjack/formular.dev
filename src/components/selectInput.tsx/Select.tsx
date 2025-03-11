import { DrawerOpenStateType } from '../../core/base/drawer/Drawer.types'
import useKeyBindings from '../../core/hooks/useKeyBindings'
import FieldSet from '../fieldset/FieldSet'
import useFormyContext, { useField } from '../Formy/Formy.context'
import ValidationResultComponent from '../validationResult/ValidationResult'
import SelectDrawer from './Select.drawer'

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
            inputId={field?.name}
            label={field?.label}
            type={field?.type}
            flags={flags}
            onClick={() => {
                field?.focus()
            }}
            itemsChildren={
                <SelectDrawer
                    filterTriggerDelay={500}
                    items={field?.options ?? []}
                    onSetOpenState={handleDrawerOpenState}
                    drawerOpenState={field?.openState}
                    onSelectItem={(value) => field?.onSelectItem(value)}
                />
            }
            validationChildren={
                <ValidationResultComponent validationResults={field?.validationResults ?? []} />
            }
            onClear={() => field?.clear()}
            onSetOpenState={handleDrawerOpenState}
            drawerOpenState={field?.openState}
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
