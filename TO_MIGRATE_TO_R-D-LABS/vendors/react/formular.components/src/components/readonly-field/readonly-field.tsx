import { useField } from '@adapters/react/fields/hooks/use-field'

import { isMissing, MissingPropEnum } from 'formular.dev.lib'
import FieldSet from '../field-set/field-set'
import useFormularContext from '../formular-form/formular-form.context'
// filepath: e:/Sources/SignalsPatternsReact/src/components/id-field/id-field.tsx

interface IReadOnlyFieldProps {
    fieldName: string
}

export const ReadOnlyField = ({ fieldName }: IReadOnlyFieldProps) => {
    const { formInstance } = useFormularContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))

    return (
        <FieldSet
            id={instance?.input?.id ?? isMissing(MissingPropEnum.ID, ReadOnlyField.name)}
            name={instance?.input?.name ?? isMissing(MissingPropEnum.NAME, ReadOnlyField.name)}
            label={instance?.input?.label}
            type={instance?.input?.type}
            flags={flags}
            onClick={() => {
                instance?.input?.focus()
            }}
        >
            <input
                tabIndex={-1}
                data-class="base-input read-only-input"
                {...instance?.register()}
                ref={(r) => instance?.ref(r)}
                value={instance?.input?.valueManager?.getAsString?.(instance) ?? ''}
                readOnly
                autoComplete="off"
                type="text"
                className="read-only-input"
            />
        </FieldSet>
    )
}
