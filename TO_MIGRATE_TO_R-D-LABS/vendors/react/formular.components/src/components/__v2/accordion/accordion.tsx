import { Toggleable } from '../toggleable/toggleable'
import { IAccordionProps } from './accordion.types'
import { AccordionUI } from './accordion.ui'

export const Accordion = (props: IAccordionProps) => {
    return (
        <Toggleable
            id={`accordion-${props.id}`}
            initialState={props.initialState}
            style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
            }}
            className={'flex-1'}
        >
            <AccordionUI {...props} />
        </Toggleable>
    )
}
