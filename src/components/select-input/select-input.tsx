import { Toggleable } from '../toggleable/toggleable'
import { SelectSF } from './select-input.sf'

interface ISelectProps {
    fieldName: string
}

const Select = ({ fieldName }: ISelectProps) => (
    <Toggleable>
        <SelectSF fieldName={fieldName} />
    </Toggleable>
)

export default Select
