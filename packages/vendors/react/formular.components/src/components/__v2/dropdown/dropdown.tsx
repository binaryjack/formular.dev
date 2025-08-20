import { Toggleable } from '../toggleable/toggleable'
import { IDropdownProps } from './dropdown.types'
import { DropdownUI } from './dropdown.ui'

export const Dropdown = (props: IDropdownProps) => {
    return (
        <Toggleable
            id={`dropdown-${props.id}`}
            initialState={props.initialState}
            style={{
                width: 'auto',
                height: 'auto'
            }}
        >
            <DropdownUI {...props} />
        </Toggleable>
    )
}
