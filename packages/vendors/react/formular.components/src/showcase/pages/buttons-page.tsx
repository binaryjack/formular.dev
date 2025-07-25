/**
 * FORMULAR - Buttons Page Component
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 */

import { ButtonStyleTest } from '@components/button/button-style-test'
import { DebugButtonClasses } from '@components/button/debug-button-classes'
import { BoundaryErrorCatcher } from '@components/error-boundary-catcher/error-boundary-catcher'
import { ButtonsDemo } from '@demo/buttons/buttons-demo'

export const ButtonsPage = () => {
    return (
        <div className="app flex flex-col items-center justify-center min-w-[200px]">
            <h1 className="text-3xl font-bold mb-8">Button Components</h1>

            <BoundaryErrorCatcher>
                <DebugButtonClasses />
                <ButtonStyleTest />
                <div className="mt-8">
                    <ButtonsDemo />
                </div>
            </BoundaryErrorCatcher>
        </div>
    )
}
