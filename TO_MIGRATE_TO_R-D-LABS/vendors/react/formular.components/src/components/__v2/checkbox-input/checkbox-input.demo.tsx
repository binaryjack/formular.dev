/**
 * FORMULAR - Checkbox Input Component Demo
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 */

import { clx } from 'formular.design.system'
import { onlyOneOption } from '../../../demo-data'
import { FieldSet } from '../field-set/field-set.ui'
import { Label } from '../label/label.ui'
import { CheckboxInput } from './checkbox-input.ui'

export const CheckboxInputDemo = () => {
    return (
        <div className="checkbox-input-demo p-4 space-y-8">
            <h2 className="text-2xl font-bold text-primary"> Checkbox Input Component Demo</h2>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Basic Usage</h3>
                <div className="space-y-4">
                    <FieldSet
                        label={
                            <Label
                                id="checkbox-label-basic"
                                htmlFor="checkbox-label-basic"
                                text="Basic Checkbox"
                                variants={{ typography: { variant: 'primary' } }}
                                className={clx('cursor-pointer', 'select-none')}
                            />
                        }
                        input={
                            <CheckboxInput
                                option={onlyOneOption}
                                tabIndex={0}
                                size={1}
                                autoComplete="off"
                                initialState={undefined}
                            />
                        }
                        buttons={null}
                    />
                </div>
            </section>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Label Variants</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Color Variants</h4>
                        <div className="space-y-4">
                            <FieldSet
                                label={
                                    <Label
                                        id="checkbox-label-primary"
                                        htmlFor="checkbox-label-primary"
                                        text="Primary Variant"
                                        variants={{ typography: { variant: 'primary' } }}
                                        className={clx('cursor-pointer', 'select-none')}
                                    />
                                }
                                input={
                                    <CheckboxInput option={onlyOneOption} tabIndex={0} size={1} />
                                }
                                buttons={null}
                            />

                            <FieldSet
                                label={
                                    <Label
                                        id="checkbox-label-secondary"
                                        htmlFor="checkbox-label-secondary"
                                        text="Secondary Variant"
                                        variants={{ typography: { variant: 'secondary' } }}
                                        className={clx('cursor-pointer', 'select-none')}
                                    />
                                }
                                input={
                                    <CheckboxInput option={onlyOneOption} tabIndex={0} size={1} />
                                }
                                buttons={null}
                            />

                            <FieldSet
                                label={
                                    <Label
                                        id="checkbox-label-success"
                                        htmlFor="checkbox-label-success"
                                        text="Success Variant"
                                        variants={{ typography: { variant: 'success' } }}
                                        className={clx('cursor-pointer', 'select-none')}
                                    />
                                }
                                input={
                                    <CheckboxInput option={onlyOneOption} tabIndex={0} size={1} />
                                }
                                buttons={null}
                            />

                            <FieldSet
                                label={
                                    <Label
                                        id="checkbox-label-info"
                                        htmlFor="checkbox-label-info"
                                        text="Info Variant"
                                        variants={{ typography: { variant: 'info' } }}
                                        className={clx('cursor-pointer', 'select-none')}
                                    />
                                }
                                input={
                                    <CheckboxInput option={onlyOneOption} tabIndex={0} size={1} />
                                }
                                buttons={null}
                            />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Size Variants</h4>
                        <div className="space-y-4">
                            <FieldSet
                                label={
                                    <Label
                                        id="checkbox-label-warning"
                                        htmlFor="checkbox-label-warning"
                                        text="Warning Variant"
                                        variants={{ typography: { variant: 'warning' } }}
                                        className={clx('cursor-pointer', 'select-none')}
                                    />
                                }
                                input={
                                    <CheckboxInput option={onlyOneOption} tabIndex={0} size={1} />
                                }
                                buttons={null}
                            />

                            <FieldSet
                                label={
                                    <Label
                                        id="checkbox-label-neutral"
                                        htmlFor="checkbox-label-neutral"
                                        text="Neutral Variant"
                                        variants={{ typography: { variant: 'neutral' } }}
                                        className={clx('cursor-pointer', 'select-none')}
                                    />
                                }
                                input={
                                    <CheckboxInput option={onlyOneOption} tabIndex={0} size={1} />
                                }
                                buttons={null}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Interactive Examples</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Form Agreement</h4>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                            <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
                                Please confirm your agreement:
                            </p>
                            <FieldSet
                                label={
                                    <Label
                                        id="checkbox-agreement"
                                        htmlFor="checkbox-agreement"
                                        text="I agree to the terms and conditions"
                                        variants={{ typography: { variant: 'info', size: 'sm' } }}
                                        className={clx('cursor-pointer', 'select-none')}
                                    />
                                }
                                input={
                                    <CheckboxInput option={onlyOneOption} tabIndex={0} size={1} />
                                }
                                buttons={null}
                            />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-medium mb-3 text-primary">Settings Option</h4>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                Configure your preferences:
                            </p>
                            <div className="space-y-3">
                                <FieldSet
                                    label={
                                        <Label
                                            id="checkbox-notifications"
                                            htmlFor="checkbox-notifications"
                                            text="Enable notifications"
                                            variants={{
                                                typography: { variant: 'neutral', size: 'sm' }
                                            }}
                                            className={clx('cursor-pointer', 'select-none')}
                                        />
                                    }
                                    input={
                                        <CheckboxInput
                                            option={onlyOneOption}
                                            tabIndex={0}
                                            size={1}
                                        />
                                    }
                                    buttons={null}
                                />

                                <FieldSet
                                    label={
                                        <Label
                                            id="checkbox-updates"
                                            htmlFor="checkbox-updates"
                                            text="Auto-update enabled"
                                            variants={{
                                                typography: { variant: 'neutral', size: 'sm' }
                                            }}
                                            className={clx('cursor-pointer', 'select-none')}
                                        />
                                    }
                                    input={
                                        <CheckboxInput
                                            option={onlyOneOption}
                                            tabIndex={0}
                                            size={1}
                                        />
                                    }
                                    buttons={null}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Features</h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <ul className="text-sm space-y-1">
                        <li> Accessible checkbox input with proper labeling</li>
                        <li> Keyboard navigation and focus management</li>
                        <li> Customizable label variants and colors</li>
                        <li> Proper form integration and validation</li>
                        <li> Dark mode support</li>
                    </ul>
                </div>
            </section>
        </div>
    )
}
