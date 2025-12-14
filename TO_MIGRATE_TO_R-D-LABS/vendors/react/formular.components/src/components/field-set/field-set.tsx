import { useCenterElementTrigger } from '@adapters/react/hooks/screen/use-center-element'
import { Button, IButtonVariant } from '@components/button/button'
import { CenterElementDebug } from '@components/context/debug/center-element-debug'
import { DrawerSlot } from '@components/drawer/components/drawer-slot'
import { DrawerToggle } from '@components/drawer/components/drawer.toggle'
import { Drawer } from '@components/drawer/drawer'
import { PasswordToggle } from '@components/password/password.toggle'
import { cx } from 'formular.design.system'
import { IFieldStateFlags } from 'formular.dev.lib'

import useAppContext from '@components/context/app-context/app-context.context'
import { MdClose } from 'react-icons/md'

/**
 * Props for the FieldSet component.
 *
 * @template TType - The type of the input field
 */
interface IFieldSetProps<TType> {
    /** Unique identifier for the input field */
    id: number
    /** Unique identifier for the input field, used for accessibility */
    name: string
    /** Optional label text for the field */
    label?: string
    /** The type of input field (text, password, select, etc.) */
    type: TType
    /** Whether password is visible (for password fields) */
    isPasswordVisible?: boolean
    /** Field state flags (valid, dirty, focus, etc.) */
    flags: IFieldStateFlags
    /** The main input element(s) to render */
    children: React.ReactNode
    /** Optional content for items drawer (e.g., select options) */
    itemsChildren?: React.ReactNode
    /** Width of the items drawer */
    itemsDrawerWidth?: string
    /** Height of the items drawer */
    itemsDrawerHeight?: string
    /** Validation feedback components */
    validationChildren?: React.ReactNode
    /** Additional CSS classes */
    className?: string
    /** Whether the field has a focus indicator */
    hasFocusIndicator?: boolean
    /** Callback when field receives focus */
    onSetFocus?: () => void
    /** Callback when field is cleared */
    onClear?: () => void
    /** Callback when item is selected (for select fields) */
    onSelectItem?: () => void
    /** Callback when field is clicked */
    onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

/**
 * A comprehensive field wrapper component that provides a unified interface for all FORMULAR input fields.
 *
 * This component serves as the foundation for all form inputs in the FORMULAR system, providing:
 * - Consistent visual layout and styling for all field types
 * - Label management and accessibility features
 * - Validation state visualization (valid, invalid, dirty, pristine)
 * - Focus management and visual feedback
 * - Clear button functionality for resetting field values
 * - Drawer integration for complex inputs (select, date picker)
 * - Password visibility toggle support
 * - Debug information and development tools
 * - Responsive design and mobile-friendly interactions
 *
 * The FieldSet component is used internally by all FORMULAR input components
 * and provides a consistent foundation for field behavior and appearance.
 *
 * @template TType - The type of the input field being wrapped
 *
 * @param props - The component props
 * @param props.inputId - Unique identifier for the input field, used for accessibility
 * @param props.label - Optional label text displayed above the field
 * @param props.type - The type of input field (affects styling and behavior)
 * @param props.flags - Field state flags that control visual appearance and behavior
 * @param props.children - The actual input element(s) to render inside the fieldset
 * @param props.validationChildren - Validation feedback components (errors, warnings)
 * @param props.itemsChildren - Content for dropdown/selection drawers
 * @param props.onClick - Callback when the field area is clicked
 * @param props.onClear - Callback when the clear button is pressed
 *
 * @returns A rendered fieldset with consistent styling and behavior
 *
 * @example
 * ```tsx
 * // Basic usage (typically used internally by input components)
 * <FieldSet
 *   inputId="username"
 *   label="Username"
 *   type="text"
 *   flags={fieldFlags}
 *   onClick={() => field.focus()}
 *   onClear={() => field.clear()}
 *   validationChildren={<ValidationErrors errors={field.errors} />}
 * >
 *   <input {...field.register()} />
 * </FieldSet>
 * ```
 *
 * @example
 * ```tsx
 * // With select items drawer
 * <FieldSet
 *   inputId="country"
 *   label="Select Country"
 *   type="select"
 *   flags={fieldFlags}
 *   itemsChildren={<CountryOptions />}
 *   itemsDrawerWidth="300px"
 *   itemsDrawerHeight="400px"
 * >
 *   <input {...field.register()} readOnly />
 * </FieldSet>
 * ```
 *
 * @example
 * ```tsx
 * // Password field with visibility toggle
 * <FieldSet
 *   inputId="password"
 *   label="Password"
 *   type="password"
 *   flags={fieldFlags}
 *   isPasswordVisible={showPassword}
 * >
 *   <input type={showPassword ? 'text' : 'password'} {...field.register()} />
 * </FieldSet>
 * ```
 *
 * @remarks
 * - This component is primarily used internally by FORMULAR input components
 * - Provides consistent styling based on field state flags
 * - Handles accessibility attributes and label associations
 * - Integrates with the drawer system for complex input interactions
 * - Supports debug mode for development and troubleshooting
 * - Responsive design adapts to different screen sizes
 * - All visual feedback is driven by the flags prop from the field state
 */
const FieldSet = <TType,>({
    id,
    name,
    label,
    type,
    isPasswordVisible,
    flags,
    children,
    itemsChildren,
    validationChildren,
    onSetFocus,
    className,
    hasFocusIndicator = true,
    onClear,
    onClick,
    itemsDrawerWidth,
    itemsDrawerHeight
}: IFieldSetProps<TType>) => {
    const { scrollPosition, elementRef, elementPositionRefs, toggle } =
        useCenterElementTrigger<HTMLFieldSetElement>()

    const { getConfiguration } = useAppContext()
    const basicConfig = getConfiguration<Partial<IButtonVariant> | undefined>(
        'rendering',
        'commands',
        'primary'
    )
    const labelIdSuffix = getConfiguration<string | undefined>('rendering', 'suffixes', 'labelId')

    // Fix for configuration returning object instead of string
    const safeLabelIdSuffix = typeof labelIdSuffix === 'string' ? labelIdSuffix : '-label'

    console.log('FieldSet rendered with flags:', flags)

    return (
        <>
            {/** Debugging information for development purposes */}
            <fieldset
                ref={elementRef}
                id={`${id}-fieldset`}
                className={cx(
                    'border rounded p-3',
                    flags.valid ? 'border-success-600' : 'border-error-600',
                    className
                )}
                data-type={type}
                data-testid={`test-${id}`}
                onClick={onClick}
            >
                <div className={cx('relative flex w-full h-full', 'flex-col lg:flex-row')}>
                    <div className={cx('flex items-center justify-start lg:w-[10em]')}>
                        <label
                            /**
                             * ARIA Notice:
                             * For label ID is important to keep it as it is because we do use
                             * the ID of the input suffixed with labelIdSuffix so it matches
                             * ARIA Labelledby whitin FieldInput setup method
                             * @see FieldInput
                             * @see labelIdSuffix
                             * */
                            id={`${id}${safeLabelIdSuffix}`}
                            htmlFor={`${id}`}
                            className={cx(
                                'inline-block mr-2',
                                flags.valid ? 'text-secondary-700' : 'text-error-600 text-ellipsis'
                            )}
                        >
                            {label}
                            {flags.busy ? (
                                <span className={cx('inline-block ml-2')}>
                                    <div
                                        className={cx(
                                            'animate-spin w-4 h-4 border-2 border-primary-600 border-t-transparent rounded-full'
                                        )}
                                    ></div>
                                </span>
                            ) : (
                                ''
                            )}
                        </label>
                    </div>
                    <div className={cx('flex flex-row w-full')}>
                        <div className={cx('flex flex-col mr-2 w-full')}>
                            <DrawerSlot
                                id={`${id}`}
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
                                id={`${id}-drawer`}
                                position={toggle}
                                width={itemsDrawerWidth}
                                height={itemsDrawerHeight}
                            >
                                <> {itemsChildren}</>
                            </Drawer>
                            {children}
                            <DrawerSlot
                                id={`${id}`}
                                slotName={'drawer-slot'}
                                opensToThe="top"
                                conditionalShow={!!itemsChildren}
                            />
                        </div>

                        <div className={cx('flex flex-row')}>
                            {onClear && (
                                <Button
                                    id={`${id}-clear-field-btn`}
                                    title={'Clear'}
                                    variantProperties={basicConfig}
                                    onClickCallback={() => onClear?.()}
                                >
                                    {<MdClose />}
                                </Button>
                            )}
                            <DrawerToggle id={`${id}-drawer`} conditionnalShow={!!itemsChildren} />
                            <PasswordToggle id={`${id}`} conditionnalShow={type === 'password'} />
                        </div>
                    </div>

                    {hasFocusIndicator && (
                        <div
                            className={cx(
                                'focus-indicator absolute bottom-0 left-0 right-0 h-0.5 ',
                                flags.focus ? 'bg-primary-600' : 'bg-transparent'
                            )}
                        />
                    )}
                    {flags.required && (
                        <div
                            className={cx(
                                'required-flag absolute top-0 right-0 w-2 h-2 bg-error-600 rounded-full'
                            )}
                        />
                    )}
                </div>

                {validationChildren && (
                    <div className={cx('validations-flag relative flex flex-col mt-1 ')}>
                        <div className={cx(flags.focus ? 'text-success-600' : 'text-error-600')}>
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
        </>
    )
}

export default FieldSet
