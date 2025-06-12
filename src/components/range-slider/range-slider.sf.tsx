import { useField } from '@adapters/react/fields/hooks/use-field'
import { useFieldDefaultValue } from '@adapters/react/hooks/use-field-default-value'
import useKeyBindings from '@adapters/react/hooks/use-key-bindings'
import { useCallback } from 'react'
import { conventions, MissingPropEnum } from '../context/conventions/conventions'
import FieldSet from '../field-set/field-set'
import useFormularContext from '../formular-form/formular-form.context'
import ValidationResultComponent from '../validation-result/validation-result'
import { RangeSliderRaw } from './components/range-slider.raw'
import { RangeSlideBehavior, RangeSliderHandleStyle } from './components/range-slider.types'

interface RangeSliderSFProps {
    fieldName: string
    min?: number
    max?: number
    step?: number
    behavior?: RangeSlideBehavior
    rangeFillColor?: string
    handleFillColor?: string
    handleStyle?: RangeSliderHandleStyle
    handleStylePercentAdjust?: number
    handlerStyleWidth?: number
    handlerStyleHeight?: number
    slideBarHeight?: number
    debug?: boolean
}

export const RangeSliderSF = ({
    fieldName,
    min = 0,
    max = 100,
    step = 1,
    behavior = 'snap',
    rangeFillColor = 'red',
    handleFillColor = 'red',
    handleStyle = 'circle',
    handleStylePercentAdjust = 1,
    handlerStyleWidth = 7,
    handlerStyleHeight = 7,
    slideBarHeight = 3,
    debug = false
}: RangeSliderSFProps) => {
    const { formInstance } = useFormularContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))

    const { handleKeyDown } = useKeyBindings({
        onDeleteCallback: () => {
            instance?.input?.clear()
        }
    })

    useFieldDefaultValue(instance)

    const defaultValue = () => {
        if (instance?.input?.value) {
            return Number(instance?.input?.value)
        }
        return Number(instance?.input?.defaultValue)
    }

    const handleChange = useCallback(
        (value: number) => {
            instance?.input?.valueManager?.setValue(instance, value.toString())
        },
        [instance]
    )

    return (
        <FieldSet
            inputId={
                instance?.input?.name ??
                conventions.IsMissing(MissingPropEnum.ID, RangeSliderSF.name)
            }
            label={instance?.input?.label}
            type={instance?.input?.type}
            flags={flags}
            validationChildren={
                <ValidationResultComponent
                    validationResults={instance?.input?.validationResults ?? []}
                    isFocus={flags.focus}
                />
            }
            onClear={() => {
                instance?.input?.clear()
            }}
        >
            <div className="flex w-full min-h-[37px]" onKeyDown={handleKeyDown}>
                <RangeSliderRaw
                    id={`${instance?.input?.name ?? 'range'}-slider`}
                    value={defaultValue()}
                    min={min}
                    max={max}
                    step={step}
                    onChange={handleChange}
                    behavior={behavior}
                    rangeFillColor={rangeFillColor}
                    handleFillColor={handleFillColor}
                    handleStyle={handleStyle}
                    handleStylePercentAdjust={handleStylePercentAdjust}
                    handlerStyleWidth={handlerStyleWidth}
                    handlerStyleHeight={handlerStyleHeight}
                    slideBarHeight={slideBarHeight}
                    debug={debug}
                />
            </div>
        </FieldSet>
    )
}
