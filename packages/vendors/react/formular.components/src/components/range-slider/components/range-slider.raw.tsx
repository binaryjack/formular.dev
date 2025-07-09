/* eslint-disable sonarjs/no-nested-template-literals */
/* eslint-disable sonarjs/cognitive-complexity */
import { cx } from 'formular.design.system'
import { useCallback, useEffect, useRef, useState } from 'react'

import RangeSliderDebug from '../debug/range-slider-debug'
import {
    RangePosition,
    RangeSlideBehavior,
    RangeSliderHandleStyle,
    ReferenceObjects,
    SnapPoint
} from './range-slider.types'
import { addNewSnapPoint, countDecimals } from './range.helper'
import useMouseEvents from './use-mouse-events'

interface RangeSliderRawProps {
    id: string
    value?: number
    min?: number
    max?: number
    step?: number
    onChange: (value: number) => void
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

export const RangeSliderRaw = ({
    id,
    value,
    onChange,
    min,
    max,
    step,
    behavior = 'snap',
    rangeFillColor = 'red',
    handleFillColor = 'red',
    handleStyle = 'circle',
    debug,
    handleStylePercentAdjust = 1,
    handlerStyleWidth = 7,
    handlerStyleHeight = 7,
    slideBarHeight = 3
}: RangeSliderRawProps) => {
    const containerRef = useRef(null)
    const stepDecimals = useRef(0)

    const [error, setError] = useState('')
    const [isMoving, setIsMoving] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [isMouseDown, setIsMouseDown] = useState(false)

    const [position, setPosition] = useState<RangePosition>({
        xPercentage: 0,
        step: 0
    })

    const snapPoints = useRef<SnapPoint[]>([])
    const currentSnap = useRef<SnapPoint>({
        active: true,
        point: 0,
        currentPercentageSnap: 0,
        thresholdLow: 0,
        thresholdHigh: 0
    })

    /** Gets the progress bar box boundary width and left position. It should never change until user resize.
     */
    const getBarReferencesLeftAndWidth = useCallback((): ReferenceObjects | undefined => {
        const container = containerRef.current as unknown as HTMLDivElement
        if (!container) return
        const box = container.getBoundingClientRect()
        return {
            left: box.left,
            width: box.width
        }
    }, [])

    /** gets the current percent progression according the left position of the bar and its width */
    const getProgressByEntry = useCallback((entry: number) => {
        const refObjects = getBarReferencesLeftAndWidth()
        if (!refObjects) return { progressPercent: 0, barClientLeftStartPosition: 0 }
        const barClientLeftStartPosition = Math.round(Math.abs(refObjects.left - entry) * 100) / 100
        const progressPercent = Math.floor((barClientLeftStartPosition * 100.4) / refObjects.width)
        return { progressPercent, barClientLeftStartPosition }
    }, [])

    /** gets the snap points according the low and high threshold predefined for each steps */
    const getSnapPoints = (currentStep: number): SnapPoint | undefined => {
        const newSnaps = [...snapPoints.current]
        // rebuild collection of snaps and define which is the active one
        const activeSnap = newSnaps.map<SnapPoint>((o) => {
            const newCurrentPercentage = o.currentPercentageSnap
            return {
                ...o,
                currentPercentageSnap: newCurrentPercentage,
                active: o.thresholdLow <= currentStep && o.thresholdHigh >= currentStep
            }
        })
        // retrieve the current active snap
        const snap = activeSnap.find((o) => o.active)

        // persist the collection and the snap point
        snapPoints.current = [...activeSnap]
        currentSnap.current = snap ?? {
            active: true,
            point: 0,
            currentPercentageSnap: 0,
            thresholdLow: 0,
            thresholdHigh: 0
        }

        return snap
    }
    /** if we have a decimal based progression or not we should adjust the output progression point */
    const adjustPercentage = useCallback(
        (percentage: number) => (stepDecimals.current === 0 ? percentage : percentage * 100),
        [stepDecimals.current]
    )
    /** As we interact with the slider while dragging or pressing mouse button
     *  we should forward the current mouse position point in the bar as onChange event so the caller can use it */
    const handlePositionResolver = useCallback(
        (currentValue: number, force?: boolean) => {
            /** scape if we do not have any value */
            if (!currentValue) return
            if (!force && (!isDragging || !isMouseDown)) return

            const _max = max ?? 100

            const { progressPercent } = getProgressByEntry(currentValue)

            if (progressPercent <= -0.1 || progressPercent > 100.4) return

            const currentCursorPosition =
                stepDecimals.current === 0 ? progressPercent : (progressPercent * _max) / 100

            getSnapPoints(currentCursorPosition)

            const percentProgressCalc = progressPercent
            const stepProgressCalc = currentCursorPosition

            let currentPosition = behavior === 'slide' ? percentProgressCalc : stepProgressCalc

            if (_max === 1 && currentPosition > 1) currentPosition = 1
            if (_max === 1 && currentPosition <= -0.1) currentPosition = 0

            const sendValue = stepDecimals.current > 0 ? stepProgressCalc : currentPosition

            onChange?.(sendValue)

            const newPosition = { xPercentage: percentProgressCalc, step: stepProgressCalc }

            setPosition(newPosition)
        },
        [isDragging, isMouseDown]
    )
    /** we retrieve the mouse event in order to perform behavior */
    const {
        onMouseUp,
        onMouseDown,
        onMouseMove,
        onMouseLeave,
        handleOnClick,
        onGeneralMouseUp,
        onMouseEnter
    } = useMouseEvents(
        isMoving,
        isMouseDown,
        setIsMoving,
        setIsDragging,
        setIsMouseDown,
        handlePositionResolver
    )

    const isMouseActionsOn = isDragging && isMoving

    /** As we received a value from the caller we need to interpret it as position percentage
     *  according the progress bar box container left screen position and width */
    useEffect(() => {
        if (isMouseActionsOn || value === undefined) return
        const _max = max ?? 100

        const cursorPosition = Math.round(value * 100) / 100
        if (isMouseActionsOn) return

        const referenceObjects = getBarReferencesLeftAndWidth()
        if (!referenceObjects) return

        const currentStep =
            stepDecimals.current === 0 ? cursorPosition : (cursorPosition * _max) / 100

        getSnapPoints(cursorPosition)

        const xPercentage = cursorPosition > 100 ? 100 : cursorPosition
        const step = currentStep > 100 ? 100 : currentStep

        const newPosition = { xPercentage: xPercentage, step: step }

        setPosition(newPosition)
    }, [value])

    /** main configuration
     * the error messages here after are intended only for developers !
     * they don't need to be translated
     */
    useEffect(() => {
        const _min = max ?? 0
        const _max = max ?? 100
        const _step = step ?? 1

        const steps = _max / _step

        if (_max < _min) {
            setError('Wrong configuration! min cannot be greater than max')
            return
        }

        if (![100, 1].includes(_max)) {
            setError('Wrong configuration! max value should be of 100 or 1')
            return
        }

        if (_max === 1 && ![0.1, 0.2, 0.5].includes(_step)) {
            setError(
                'Wrong configuration! Max value is 1, authorized steps should be one of [0.1, 0.2, 0.5]'
            )
            return
        }

        if (_max === 100 && ![1, 2, 4, 5, 10, 20, 50].includes(_step)) {
            setError(
                'Wrong configuration! Max value is 100, authorized steps should be one of [1, 2, 4, 5, 10, 20, 50]'
            )
            return
        }

        /** if we plan use it as !snap mode! here is where we
         *  prepare snap points collection as reference steps.
         *
         *  In order to determine which point should be activated
         *  meaning (visible), we use intermediate high and low thresholds.
         *
         *  As the progression is made by percent 1,2,3...  or 0.1, 0.2, 0.3...
         *  if the step is of 2 and max is of 100 the total of steps will be of 50
         *  and the threshold will be of +0.5 and -0.5 for each steps
         *  if the cursor is less that 1 the snap point is 0 and above 1 will be of 2
         *
         *  Note that for sake of simplicity I wanted to keep it the most simple
         *  so I do not cover all the cases.
         *
         *  You should consider use the slider with the following configurations
         *  min: 0, max: 100, steps [1, 2, 4, 5, 10, 20, 50]  (, = 'OR')
         *  min: 0, max: 1, steps [0.1, 0.2, 0.5]
         *
         *  In the most scenarios you will be using one of the above settings.
         *  I do not recommend to use other configurations so it can result on unexpected behaviors
         *  or make the application crash
         *
         *  Side note: Even if `min` is present is not used.
         *  Concretely it's there just for coherence / readability
         *  but it has no effects at all. As its optional you can omit him.
         */
        const sp = [...Array(steps + 1)]?.map?.((_, i) => {
            // set the current snap point
            const currentSnapPointId = i + 1
            // set the lower snap point
            const low = Math.round(_step * (i - 0.5) * 100) / 100
            // set the higher snap point
            const high = Math.round(_step * (i + 0.5) * 100) / 100
            //
            return addNewSnapPoint(currentSnapPointId, low, high, Math.round(_step * i * 100) / 100)
        })

        stepDecimals.current = countDecimals(step ?? 1)
        snapPoints.current = sp
    }, [max, step, min])

    useEffect(() => {
        window.addEventListener('mouseup', onGeneralMouseUp)
        return () => {
            window.removeEventListener('mouseup', onGeneralMouseUp)
        }
    }, [onGeneralMouseUp])

    return (
        <div
            className={cx('relative flex items-center justify-center w-full h-full')}
            onMouseLeave={onMouseLeave}
            onMouseEnter={onMouseEnter}
        >
            {error ? (
                <div
                    className={cx(
                        'bg-yellow-100 text-error-600 w-full h-full flex items-center justify-center'
                    )}
                >
                    {error}
                </div>
            ) : (
                <div className={cx('relative flex items-center justify-center h-full w-full')}>
                    <div
                        draggable={false}
                        className={cx(
                            'relative flex flex-row items-center justify-start w-full h-full cursor-pointer'
                        )}
                        ref={containerRef}
                        onMouseMove={onMouseMove}
                        onMouseUp={onMouseUp}
                        onClick={handleOnClick}
                        onMouseDown={onMouseDown}
                    >
                        {debug && (
                            <>
                                {
                                    <RangeSliderDebug
                                        currentSnap={currentSnap}
                                        isDragging
                                        isMouseDown
                                        isMoving
                                        position={position}
                                        snapPoints={snapPoints}
                                        stepDecimals={stepDecimals.current}
                                    />
                                }
                            </>
                        )}
                        <div
                            className={cx(
                                'relative flex flex-row items-center justify-start w-full h-2',
                                isMouseDown ? 'bg-secondary-300' : 'bg-secondary-200'
                            )}
                            onMouseUp={onMouseUp}
                        />
                        <div
                            className={cx('absolute flex items-center justify-center')}
                            style={{
                                height: `${slideBarHeight}px`,
                                width: `${
                                    behavior === 'slide'
                                        ? position.xPercentage
                                        : adjustPercentage(
                                              currentSnap.current.currentPercentageSnap
                                          )
                                }%`,
                                transition: `${behavior === 'slide' ? '' : `width 0.01s ease-in-out`}`,
                                background: rangeFillColor
                            }}
                        />
                        <div
                            draggable={false}
                            className={cx(
                                'absolute flex items-center justify-center z-10',
                                handleStyle === 'circle' ? 'rounded-full' : ''
                            )}
                            onMouseDown={onMouseDown}
                            onMouseUp={onMouseUp}
                            style={{
                                marginLeft: `${
                                    behavior === 'slide'
                                        ? position.xPercentage - handleStylePercentAdjust
                                        : adjustPercentage(
                                              currentSnap.current.currentPercentageSnap
                                          ) - handleStylePercentAdjust
                                }%`,
                                transition: `${behavior === 'slide' ? '' : `margin-left 0.01s ease-in-out`}`,
                                background: handleFillColor,
                                width: `${handlerStyleWidth}px`,
                                height: `${handlerStyleHeight}px`
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
