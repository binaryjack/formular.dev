import { useCallback, useEffect, useState } from 'react'
import { useFieldDefaultValue } from '../../core/hooks/use-field-default-value'
import useKeyBindings from '../../core/hooks/use-key-bindings'
import { conventions } from '../context/conventions/conventions'
import FieldSet from '../field-set/field-set'
import useFormyContext, { useField } from '../formy/formy.context'
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
    const { formInstance } = useFormyContext()
    const { instance, flags } = useField(formInstance?.getField(fieldName))
    const [rangeValue, setRangeValue] = useState<number>(0)
    // Handle slider value change
    const handleChange = useCallback(
        (value: number) => {
            instance?.field?.setValue(value.toString())
            console.log('handleChange', value, instance?.field?.value)
        },
        [instance?.field]
    )

    // Key bindings for accessibility
    const { handleKeyDown } = useKeyBindings({
        onDeleteCallback: () => {
            instance?.field?.clear()
        }
    })

    useEffect(() => {
        setRangeValue(Number(instance?.field?.value))
        console.log('useEffect', instance?.field?.value)
    }, [instance?.field?.getValue()])

    useFieldDefaultValue(instance?.field, (value) => {
        setRangeValue(Number(value))
    })

    return (
        <FieldSet
            inputId={instance?.field?.name ?? conventions.IdIsEmpty()}
            label={instance?.field?.label}
            type={instance?.field?.type}
            flags={flags}
            validationChildren={
                <ValidationResultComponent
                    validationResults={instance?.field?.validationResults ?? []}
                />
            }
            onClear={() => instance?.field?.clear()}
        >
            <div className="flex w-full min-h-[37px]" onKeyDown={handleKeyDown}>
                <RangeSliderRaw
                    id={`${instance?.field?.name ?? 'range'}-slider`}
                    value={rangeValue}
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
