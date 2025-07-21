/**
 * FORMULAR - Demos Page Component
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 */

import { BoundaryErrorCatcher } from '@components/error-boundary-catcher/error-boundary-catcher'

const TextInputDemo = () => (
    <>
        <br />
        <h1>Signals Text Input</h1>
        <h3>Patterns used: signals, observer </h3>
        {/* <TextInput /> */}
    </>
)

const CounterDemo = () => (
    <>
        <br />
        <h1>Signals Counter</h1>
        <h3>Patterns used: signals, observer </h3>
        {/* <Counter /> */}
    </>
)

const PositioningDemo = () => (
    <>
        <br />
        {/* <Positionning /> */}
    </>
)

export const DemosPage = () => {
    return (
        <div className="app flex flex-col items-center justify-center min-w-[200px]">
            <h1 className="text-3xl font-bold mb-8">Component Demos</h1>

            <BoundaryErrorCatcher>
                <TextInputDemo />
                <CounterDemo />
                <PositioningDemo />
            </BoundaryErrorCatcher>
        </div>
    )
}
