import { useService } from '@adapters/react'
import { Button } from '@components/button/button'
import FormularForm from '@components/formular-form/formular-form'
import Select from '@components/select-input/select-input'
import { ComponentSizeType, ComponentVariantType } from 'formular.design.system'
import {
    FieldSchemaBuilder,
    FieldSchemaFactory,
    IFormular,
    IFormularManager,
    IOptionItem,
    IValidationOptions,
    OptionBuilder,
    OptionsBuilder,
    SFormularManager
} from 'formular.dev.lib'
import { useEffect, useState } from 'react'

interface IButtonDemo {
    buttonVariants: string
    buttonSizes: string
    buttonText: string
    buttonDisabled: boolean
    buttonLoading: boolean
    buttonRounded: boolean
}

// Convert to arrays for the demo
const ComponentSizeArray: ComponentSizeType[] = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']
const VariantNameArray: ComponentVariantType[] = [
    'primary',
    'secondary',
    'info',
    'danger',
    'success',
    'warning'
]

const componentSizeOptions: IOptionItem[] = new OptionsBuilder()
    .setOptions(
        ...ComponentSizeArray.map((size, i) =>
            new OptionBuilder(size).setSequenceId(i).setText(size.toUpperCase())
        )
    )
    .build()

const variantNamesOptions: IOptionItem[] = new OptionsBuilder()
    .setOptions(
        ...VariantNameArray.map((size, i) =>
            new OptionBuilder(size).setSequenceId(i).setText(size.toUpperCase())
        )
    )
    .build()

const validationOptionsMock: IValidationOptions = {}

const entityScheme = new FieldSchemaFactory('buttons-demo')
    .addBuilders(
        ...[
            new FieldSchemaBuilder()
                .setId(0)
                .setName(`buttonVariants`)
                .setTypeInput(`select`)
                .setOptionData(`buttonVariants`, variantNamesOptions),
            new FieldSchemaBuilder()
                .setId(1)
                .setName(`buttonSizes`)
                .setTypeInput(`select`)
                .setOptionData(`buttonSizes`, componentSizeOptions),
            new FieldSchemaBuilder().setId(2).setName(`buttonText`).setTypeInput(`text`),
            new FieldSchemaBuilder().setId(3).setName(`buttonDisabled`).setTypeInput(`boolean`),
            new FieldSchemaBuilder().setId(4).setName(`buttonLoading`).setTypeInput(`boolean`),
            new FieldSchemaBuilder().setId(5).setName(`buttonRounded`).setTypeInput(`boolean`)
        ]
    )
    .build()

export const ButtonsDemo = () => {
    const { getService } = useService()
    const formularManager = getService<IFormularManager>(SFormularManager)

    // Debug logging
    console.log('ButtonsDemo Debug:', {
        formularManager,
        hasFormularManager: !!formularManager,
        notificationManager: formularManager?.notificationManager,
        hasNotificationManager: !!formularManager?.notificationManager,
        debounceNotify: formularManager?.notificationManager?.debounceNotify,
        hasDebounceNotify:
            typeof formularManager?.notificationManager?.debounceNotify === 'function'
    })

    const [formular, setFormular] = useState<IFormular<IButtonDemo> | null>(null)

    useEffect(() => {
        if (formularManager) {
            try {
                const newFormular = formularManager.createFromSchema(
                    entityScheme
                ) as IFormular<IButtonDemo>
                setFormular(newFormular)
            } catch (error) {
                console.error('Error creating formular:', error)
            }
        }
    }, [formularManager])

    const [clickedInfo, setClickedInfo] = useState<string[]>([])
    const [selectedVariant, setSelectedVariant] = useState<ComponentVariantType>('primary')
    const [selectedSize, setSelectedSize] = useState<ComponentSizeType>('md')
    const [isDisabled, setIsDisabled] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isRounded, setIsRounded] = useState(false)
    const [buttonText, setButtonText] = useState('Action')

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        e.preventDefault()

        if (!e.currentTarget) return
        const timestamp = new Date().toLocaleTimeString()
        const newMessage = `Button clicked at ${timestamp}!`
        setClickedInfo((prev) => [...prev.slice(-4), newMessage]) // Keep only last 5 messages
    }
    const handleSubmit = (data: any) => {}
    const clearMessages = () => {
        setClickedInfo([])
    }

    return (
        <div className={`p-6 flex flex-1 flex-row w-full h-full bg-slate-50 gap-6`}>
            {formular && (
                <FormularForm formular={formular} onSubmit={handleSubmit} isloading={false}>
                    <Select fieldName="buttonVariants" />
                    {/* <Select fieldName="buttonSizes" />
                    <InputText fieldName="buttonText" />
                    <SwitchButtonInput
                        fieldName="buttonDisabled"
                        options={{ orientation: 'horizontal' }}
                    />
                    <SwitchButtonInput
                        fieldName="buttonLoading"
                        options={{ orientation: 'horizontal' }}
                    />
                    <SwitchButtonInput
                        fieldName="buttonRounded"
                        options={{ orientation: 'horizontal' }}
                    /> */}
                </FormularForm>
            )}

            <div className={`flex flex-col w-2/3 h-full bg-white rounded-lg shadow-sm p-6`}>
                <div className="flex-1 flex items-center justify-center">
                    <Button
                        id="demo-button"
                        title="Demo button with current configuration"
                        onClickCallback={handleClick}
                        disabled={isDisabled}
                        loading={isLoading}
                        variantProperties={{
                            size: selectedSize,
                            variant: selectedVariant,
                            rounded: isRounded,
                            className: 'transition-all duration-200'
                        }}
                    >
                        {buttonText || 'Action'}
                    </Button>
                </div>
            </div>
        </div>
    )
}
