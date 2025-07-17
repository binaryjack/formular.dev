/**
 * FORMULAR - Forms Page Component
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 */

import { BoundaryErrorCatcher } from '@components/error-boundary-catcher/error-boundary-catcher'

const FormDemo = () => (
    <>
        <h1>Forms Inputs using event driven design classes</h1>
        <h3>Patterns used: builder, strategy, observer, factory</h3>
        {/* <FormDemo /> */}
    </>
)

export const FormsPage = () => {
    return (
        <div className="app flex flex-col items-center justify-center min-w-[200px]">
            <h1 className="text-3xl font-bold mb-8">Form Components</h1>

            <BoundaryErrorCatcher>
                <FormDemo />
            </BoundaryErrorCatcher>
        </div>
    )
}
