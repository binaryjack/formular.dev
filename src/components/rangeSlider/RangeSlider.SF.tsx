import { useCallback, useEffect, useState } from 'react'
import useKeyBindings from '../../core/hooks/useKeyBindings'
import { conventions } from '../context/conventions/conventions'
import FieldSet from '../fieldset/FieldSet'
import useFormyContext, { useField } from '../formy/Formy.context'
import ValidationResultComponent from '../validationResult/ValidationResult'
import { RangeSliderRaw } from './components/RangeSlider.raw'
import { RangeSlideBehavior, RangeSliderHandleStyle } from './components/rangeSlider.types'

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
    const { field, flags } = useField(formInstance?.getField(fieldName))
    const [rangeValue, setRangeValue] = useState<number>(0)
    // Handle slider value change
    const handleChange = useCallback(
        (value: number) => {
            field?.setValue(value.toString())
            console.log('handleChange', value, field?.value)
        },
        [field]
    )

    // Key bindings for accessibility
    const { handleKeyDown } = useKeyBindings({
        onDeleteCallback: () => {
            field?.clear()
        }
    })

    useEffect(() => {
        setRangeValue(Number(field?.value))
        console.log('useEffect', field?.value)
    }, [field?.get()])

    useEffect(() => {
        setRangeValue(Number(field?.defaultValue))
        field?.setValue(field?.defaultValue)
        console.log('.defaultValue', field?.defaultValue)
    }, [field?.defaultValue])

    return (
        <FieldSet
            inputId={field?.name ?? conventions.IdIsEmpty()}
            label={field?.label}
            type={field?.type}
            flags={flags}
            validationChildren={
                <ValidationResultComponent validationResults={field?.validationResults ?? []} />
            }
            onClear={() => field?.clear()}
        >
            <div className="w-full" onKeyDown={handleKeyDown}>
                <RangeSliderRaw
                    id={`${field?.name ?? 'range'}-slider`}
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
