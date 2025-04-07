import { Toggleable } from '../toggleable/Toggleable'
import { SelectSF } from './Select.SF'

interface ISelectProps {
    fieldName: string
}

const Select = ({ fieldName }: ISelectProps) => (
    <Toggleable>
        <SelectSF fieldName={fieldName} />
    </Toggleable>
)

export default Select
