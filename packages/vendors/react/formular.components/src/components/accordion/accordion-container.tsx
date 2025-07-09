import { ChevronToggleButton } from '@components/chevron-toggle-button/chevron-toggle-button'
import { useToggleableContext } from '@components/toggleable/toggleable.context.hook'
import { cx } from 'formular.design.system'
import { ToggleableStateType } from 'formular.dev.lib'

export interface IAccordionContainerProps {
    id: string
    title: string
    children: React.ReactNode
    initialState?: ToggleableStateType
}

export const AccordionContainer = ({
    id,
    title,
    children,
    initialState
}: IAccordionContainerProps) => {
    const { setToggleState, toggleState } = useToggleableContext()

    const handleToggleState = (e: React.MouseEvent, state: ToggleableStateType) => {
        if (state === toggleState) return

        setToggleState(state)

        e?.stopPropagation?.()
        e?.preventDefault?.()
    }

    return (
        <div
            className={cx(
                'relative flex min-h-[20px] w-full flex-col bg-secondary-50 rounded-md shadow-sm transition-all duration-200',
                toggleState === 'closed' && 'min-h-0'
            )}
        >
            <div
                className={cx('relative flex p-3 cursor-pointer')}
                onClick={(e) => handleToggleState(e, toggleState === 'open' ? 'closed' : 'open')}
            >
                <div className={cx('text-lg font-semibold flex items-center h-full w-full')}>
                    {title}
                </div>
                <div className={cx('flex items-center')}>
                    <ChevronToggleButton
                        id={`accordion-${id}`}
                        toggleState={toggleState}
                        handleDrawerOpenState={handleToggleState}
                    />
                </div>
            </div>

            <div
                className={cx('z-[999]', initialState ?? toggleState)}
                style={{
                    transformOrigin: 'top',
                    animation:
                        toggleState === 'open'
                            ? `openAccordionY 0.2s ease-in-out forwards`
                            : toggleState === 'closed'
                              ? `closeAccordionY 0.2s ease-in-out forwards`
                              : 'idleAccordion forwards'
                }}
            >
                {children}
            </div>
        </div>
    )
}
