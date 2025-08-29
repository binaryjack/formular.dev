import { useAccordionContext } from './accordion-context'
import { IAccordionContent } from './accordion.types'

export const AccordionContent = ({ as: Tag = 'p', children }: IAccordionContent) => {
    const { id, tabIndex } = useAccordionContext()
    return (
        <Tag id={`content-${id}`} tabIndex={tabIndex}>
            {children}
        </Tag>
    )
}
