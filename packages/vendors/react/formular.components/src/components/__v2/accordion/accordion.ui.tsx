import { genericStyle } from 'formular.design.system'
import { ChevronToggle } from '../chevron-toggle/chevron-toggle.ui'
import { ExpandableDrawer } from '../drawer/variants/expandable-drawer.ui'
import { Label } from '../label/label.ui'
import { Toggleable } from '../toggleable/toggleable'
import { IAccordionProps } from './accordion.types'

export const Accordion = ({
    id,
    title,
    children,
    initialState,
    variants = {}
}: IAccordionProps) => {
    const accordionClasses = genericStyle({
        componentType: 'accordion',
        ...variants
    })

    return (
        <div className={accordionClasses}>
            <Toggleable
                id={`accordion-${id}`}
                initialState={initialState}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    width: 'auto'
                }}
            >
                <div className="relative flex  w-full items-center justify-between gap-2   bg-red-200 ">
                    <Label htmlFor={`${id}-chevron-toggle`} text={title} />
                    <ChevronToggle
                        id={`${id}`}
                        toggleContextId={`accordion-${id}`}
                        initialToggleState={'idle'}
                    />
                </div>
                <ExpandableDrawer
                    id={`accordion-${id}`}
                    toggleContextId={`accordion-${id}`}
                    position={'top'}
                >
                    {children}
                </ExpandableDrawer>
            </Toggleable>
        </div>
    )
}
