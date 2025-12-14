/**
 * FORMULAR - Typography Component Demo
 * Copyright (c) 2025 Piana Tadeo
 * Licensed under MIT License
 */

import { Typography } from './typography.ui'

export const TypographyDemo = () => {
    return (
        <div className="typography-demo p-4 space-y-8">
            <h2 className="text-2xl font-bold text-primary"> Typography Component Demo</h2>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Text Sizes</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg space-y-4">
                    <Typography as="h1" variants={{ typography: { size: '2xl' } }}>
                        Extra Large Heading
                    </Typography>
                    <Typography as="h2" variants={{ typography: { size: 'xl' } }}>
                        Large Heading
                    </Typography>
                    <Typography as="h3" variants={{ typography: { size: 'lg' } }}>
                        Medium Heading
                    </Typography>
                    <Typography as="p" variants={{ typography: { size: 'md' } }}>
                        Regular paragraph text for body content.
                    </Typography>
                    <Typography as="span" variants={{ typography: { size: 'sm' } }}>
                        Small text for captions and notes.
                    </Typography>
                    <Typography as="span" variants={{ typography: { size: 'xs' } }}>
                        Extra small text for fine print.
                    </Typography>
                </div>
            </section>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Color Variants</h3>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg space-y-3">
                    <Typography variants={{ variant: 'primary' }}>Primary text color</Typography>
                    <Typography variants={{ variant: 'secondary' }}>
                        Secondary text color
                    </Typography>
                    <Typography variants={{ variant: 'success' }}>Success text color</Typography>
                    <Typography variants={{ variant: 'warning' }}>Warning text color</Typography>
                    <Typography variants={{ variant: 'danger' }}>Danger text color</Typography>
                    <Typography variants={{ variant: 'info' }}>Info text color</Typography>
                </div>
            </section>

            <section className="demo-section">
                <h3 className="text-xl font-semibold mb-4 text-secondary">Usage</h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <p className="text-sm">
                        Typography component provides consistent text styling with semantic HTML
                        elements and theme-aware colors.
                    </p>
                </div>
            </section>
        </div>
    )
}
