import { clx, genericStyle } from 'formular.design.system'
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
    const classStyle = genericStyle({
        componentTypes: ['accordion', 'typography'],
        ...variants
    })

    const clbackGround = classStyle.backGround
    const cltext = classStyle.text
    const clborders = classStyle.borders
    const clstates = Object.values(classStyle.states).filter((o) => !!o)

    return (
        <div
            id={`accordion-${id}-frame`}
            className={clx(...clbackGround, ...clborders, ...clstates)}
        >
            <Toggleable
                id={`accordion-${id}`}
                initialState={initialState}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative'
                }}
                className={'flex-1'}
            >
                <div className={`relative flex w-full items-center justify-between gap-2 `}>
                    <Label
                        htmlFor={`${id}-chevron-toggle`}
                        text={title}
                        className={clx(...cltext)}
                        variants={variants}
                    />
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
