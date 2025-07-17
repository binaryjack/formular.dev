/**
 * FORMULAR - Validation Page Component
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 */

import { BoundaryErrorCatcher } from '@components/error-boundary-catcher/error-boundary-catcher'
import ValidationDemoCheckInput from '@demo/validation-demos/validation-demo-check-input'

export const ValidationPage = () => {
    return (
        <div className="app flex flex-col w-full flex-1 items-center justify-center">
            <h1 className="text-3xl font-bold mb-8">Validation Demos</h1>

            <BoundaryErrorCatcher>
                {/* <ValidationDemoSelectInput /> */}
                {/* <ValidationDemoRadioInput /> */}
                <ValidationDemoCheckInput />
                {/* <ValidationDemoTextInput /> */}
            </BoundaryErrorCatcher>
        </div>
    )
}
