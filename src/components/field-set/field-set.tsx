import { Button } from '@components/button/button'
import { conventions } from '@components/context/conventions/conventions'
import { CenterElementDebug } from '@components/context/debug/center-element-debug'
import { DrawerSlot } from '@components/drawer/components/drawer-slot'
import { DrawerToggle } from '@components/drawer/components/drawer.toggle'
import { Drawer } from '@components/drawer/drawer'
import { PasswordToggle } from '@components/password/password.toggle'
import { useCenterElementTrigger } from '@core/framework/react/hooks/screen/use-center-element'
import { IFieldStateFlags } from '@core/managers/style-manager/style-manager.types'
import { MdClose } from 'react-icons/md'

interface IFieldSetProps<TType> {
    inputId: string
    label?: string
    type: TType
    isPasswordVisible?: boolean
    flags: IFieldStateFlags
    children: React.ReactNode
    itemsChildren?: React.ReactNode
    itemsDrawerWidth?: string
    itemsDrawerHeight?: string
    validationChildren?: React.ReactNode
    className?: string
    onSetFocus?: () => void
    onClear?: () => void
    onSelectItem?: () => void

    onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const FieldSet = <TType,>({
    inputId,
    label,
    type,
    isPasswordVisible,
    flags,
    children,
    itemsChildren,
    validationChildren,
    onSetFocus,
    className,
    onClear,
    onClick,
    itemsDrawerWidth,
    itemsDrawerHeight
}: IFieldSetProps<TType>) => {
    const { scrollPosition, elementRef, elementPositionRefs, toggle } =
        useCenterElementTrigger<HTMLFieldSetElement>()

    console.log('FieldSet rendered with flags:', flags)

    return (
        <fieldset
            ref={elementRef}
            id={`${inputId}-fieldset`}
            className={`fieldset fieldset-container  ${flags.valid ? 'valid border-green-800' : 'invalid border-red-800'} ${className}`}
            data-type={type}
            data-testid={`test-${inputId}`}
            onClick={onClick}
        >
            <div
                className={`relative flex  w-full h-full
                flex-col               
                lg:flex-row
               `}
            >
                <div className={`flex items-center justify-start  lg:w-[10em]`}>
                    <label
                        /**
                         * ARIA Notice:
                         * For label ID is important to keep it as it is because we do use
                         * the ID of the input suffixed with conventions.suffix.labelId so it matches
                         * ARIA Labelledby whitin FieldInput setup method
                         * @see FieldInput
                         * @see conventions.suffix.labelId
                         * */
                        id={`${inputId}${conventions.suffix.labelId}`}
                        htmlFor={inputId}
                        className={`label inline-block mr-2 ${flags.valid ? '' : 'label-error text-ellipsis'}`}
                    >
                        {label}
                        {flags.busy ? (
                            <span className="loading loading-spinner loading-sm">
                                {' '}
                                {flags.busy}{' '}
                            </span>
                        ) : (
                            ''
                        )}
                    </label>
                </div>
                <div className={`input-container flex flex-row w-full`}>
                    <div className={`input-content flex flex-col mr-2 w-full`}>
                        <DrawerSlot
                            id={inputId}
                            slotName={'drawer-slot'}
                            opensToThe="bottom"
                            conditionalShow={!!itemsChildren}
                        />
                        {/** drawer depends always on a DrawerSlot which is the place where it will be rendered
                         * it uses portal concept
                         *
                         * In order to decide from which origin it appears I use an association of hooks and contexts
                         * useMedia
                         */}
                        <Drawer
                            id={`${inputId}`}
                            position={toggle}
                            width={itemsDrawerWidth}
                            height={itemsDrawerHeight}
                        >
                            <> {itemsChildren}</>
                        </Drawer>
                        {children}
                        <DrawerSlot
                            id={inputId}
                            slotName={'drawer-slot'}
                            opensToThe="top"
                            conditionalShow={!!itemsChildren}
                        />
                    </div>

                    <div className={`input-commands flex flex-row `}>
                        {onClear && (
                            <Button
                                id={`${inputId}-clear-field-btn`}
                                title={'Clear'}
                                variantProperties={conventions.commands.basic}
                                onClickCallback={() => onClear?.()}
                            >
                                {<MdClose />}
                            </Button>
                        )}
                        <DrawerToggle id={inputId} conditionnalShow={!!itemsChildren} />
                        <PasswordToggle id={inputId} conditionnalShow={type === 'password'} />
                    </div>
                </div>

                <div
                    className={`input-container-focus-indicator flex ${flags.focus ? 'focus' : ''}`}
                />
                {flags.required && <div className={`input-container-required-indicator flex`} />}
            </div>

            {validationChildren && (
                <div className={`relative bottom-0 left-0 flex flex-col mt-1`}>
                    <div className={`${flags.focus ? 'validation-success' : 'validation-error'}`}>
                        {validationChildren}
                    </div>
                </div>
            )}
            <CenterElementDebug
                centerScreen={scrollPosition.centerScreen}
                parentHeight={elementPositionRefs.height}
                screenTop={scrollPosition.screenTop}
            />
        </fieldset>
    )
}

export default FieldSet
