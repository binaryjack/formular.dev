/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './stories/**/*.{js,jsx,ts,tsx}',
        '../vendors/react/formular.components/src/**/*.{js,jsx,ts,tsx}'
    ],
    safelist: [
        // All button variant classes that genericStyle generates
        'btn-primary-500',
        'btn-primary-0',
        'btn-primary-50',
        'btn-secondary-500',
        'btn-secondary-0',
        'btn-secondary-50',
        'btn-success-500',
        'btn-warning-500',
        'btn-danger-500',
        'btn-info-500',
        // Button size classes
        'btn-2xs',
        'btn-xs',
        'btn-sm',
        'btn-md',
        'btn-lg',
        'btn-xl',
        'btn-2xl',
        // Text color classes that genericStyle generates
        'text-primary-50',
        'text-primary-500',
        'text-secondary-50',
        'text-secondary-500',
        'text-success-50',
        'text-warning-50',
        'text-danger-50',
        'text-info-50',
        // Background color classes that genericStyle generates
        'bg-primary-50',
        'bg-primary-100',
        'bg-primary-200',
        'bg-primary-300',
        'bg-primary-400',
        'bg-primary-500',
        'bg-primary-600',
        'bg-primary-700',
        'bg-primary-800',
        'bg-primary-900',
        'bg-secondary-50',
        'bg-secondary-100',
        'bg-secondary-200',
        'bg-secondary-300',
        'bg-secondary-400',
        'bg-secondary-500',
        'bg-secondary-600',
        'bg-secondary-700',
        'bg-secondary-800',
        'bg-secondary-900',
        'bg-success-50',
        'bg-success-100',
        'bg-success-200',
        'bg-success-300',
        'bg-success-400',
        'bg-success-500',
        'bg-success-600',
        'bg-success-700',
        'bg-success-800',
        'bg-success-900',
        'bg-warning-50',
        'bg-warning-100',
        'bg-warning-200',
        'bg-warning-300',
        'bg-warning-400',
        'bg-warning-500',
        'bg-warning-600',
        'bg-warning-700',
        'bg-warning-800',
        'bg-warning-900',
        'bg-danger-50',
        'bg-danger-100',
        'bg-danger-200',
        'bg-danger-300',
        'bg-danger-400',
        'bg-danger-500',
        'bg-danger-600',
        'bg-danger-700',
        'bg-danger-800',
        'bg-danger-900',
        'bg-info-50',
        'bg-info-100',
        'bg-info-200',
        'bg-info-300',
        'bg-info-400',
        'bg-info-500',
        'bg-info-600',
        'bg-info-700',
        'bg-info-800',
        'bg-info-900',
        'bg-neutral-50',
        'bg-neutral-100',
        'bg-neutral-200',
        'bg-neutral-300',
        'bg-neutral-400',
        'bg-neutral-500',
        'bg-neutral-600',
        'bg-neutral-700',
        'bg-neutral-800',
        'bg-neutral-900',
        // Border color classes that genericStyle generates
        'border-primary-50',
        'border-primary-100',
        'border-primary-200',
        'border-primary-300',
        'border-primary-400',
        'border-primary-500',
        'border-primary-600',
        'border-primary-700',
        'border-primary-800',
        'border-primary-900',
        'border-secondary-50',
        'border-secondary-100',
        'border-secondary-200',
        'border-secondary-300',
        'border-secondary-400',
        'border-secondary-500',
        'border-secondary-600',
        'border-secondary-700',
        'border-secondary-800',
        'border-secondary-900',
        'border-success-50',
        'border-success-100',
        'border-success-200',
        'border-success-300',
        'border-success-400',
        'border-success-500',
        'border-success-600',
        'border-success-700',
        'border-success-800',
        'border-success-900',
        'border-warning-50',
        'border-warning-100',
        'border-warning-200',
        'border-warning-300',
        'border-warning-400',
        'border-warning-500',
        'border-warning-600',
        'border-warning-700',
        'border-warning-800',
        'border-warning-900',
        'border-danger-50',
        'border-danger-100',
        'border-danger-200',
        'border-danger-300',
        'border-danger-400',
        'border-danger-500',
        'border-danger-600',
        'border-danger-700',
        'border-danger-800',
        'border-danger-900',
        'border-info-50',
        'border-info-100',
        'border-info-200',
        'border-info-300',
        'border-info-400',
        'border-info-500',
        'border-info-600',
        'border-info-700',
        'border-info-800',
        'border-info-900',
        'border-neutral-50',
        'border-neutral-100',
        'border-neutral-200',
        'border-neutral-300',
        'border-neutral-400',
        'border-neutral-500',
        'border-neutral-600',
        'border-neutral-700',
        'border-neutral-800',
        'border-neutral-900',
        // Text color classes (extended)
        'text-primary-100',
        'text-primary-200',
        'text-primary-300',
        'text-primary-400',
        'text-primary-600',
        'text-primary-700',
        'text-primary-800',
        'text-primary-900',
        'text-secondary-100',
        'text-secondary-200',
        'text-secondary-300',
        'text-secondary-400',
        'text-secondary-600',
        'text-secondary-700',
        'text-secondary-800',
        'text-secondary-900',
        'text-success-100',
        'text-success-200',
        'text-success-300',
        'text-success-400',
        'text-success-500',
        'text-success-600',
        'text-success-700',
        'text-success-800',
        'text-success-900',
        'text-warning-100',
        'text-warning-200',
        'text-warning-300',
        'text-warning-400',
        'text-warning-500',
        'text-warning-600',
        'text-warning-700',
        'text-warning-800',
        'text-warning-900',
        'text-danger-100',
        'text-danger-200',
        'text-danger-300',
        'text-danger-400',
        'text-danger-500',
        'text-danger-600',
        'text-danger-700',
        'text-danger-800',
        'text-danger-900',
        'text-info-100',
        'text-info-200',
        'text-info-300',
        'text-info-400',
        'text-info-500',
        'text-info-600',
        'text-info-700',
        'text-info-800',
        'text-info-900',
        'text-neutral-100',
        'text-neutral-200',
        'text-neutral-300',
        'text-neutral-400',
        'text-neutral-500',
        'text-neutral-600',
        'text-neutral-700',
        'text-neutral-800',
        'text-neutral-900',
        // Text size classes
        'text-2xs',
        'text-xs',
        'text-sm',
        'text-md',
        'text-lg',
        'text-xl',
        'text-2xl'
    ],
    theme: {
        extend: {
            // Custom screen sizes based on existing formular.components config
            screens: {
                '2xs': '0px',
                xs: '480px',
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px'
            },

            // Custom font sizes
            fontSize: {
                '2xs': '0.55rem',
                xs: '0.75rem',
                sm: '0.875rem',
                base: '1rem',
                lg: '1.125rem',
                xl: '1.25rem',
                '2xl': '1.5rem',
                '3xl': '1.875rem',
                '4xl': '2.25rem',
                '5xl': '3rem',
                '6xl': '3.75rem'
            },

            // Design system colors
            colors: {
                // Primary brand colors
                primary: {
                    50: '#eff6ff',
                    100: '#dbeafe',
                    200: '#bfdbfe',
                    300: '#93c5fd',
                    400: '#60a5fa',
                    500: '#3b82f6', // Default primary
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                    950: '#172554'
                },

                // Secondary colors
                secondary: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b', // Default secondary
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                    950: '#020617'
                },

                // Success colors
                success: {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    200: '#bbf7d0',
                    300: '#86efac',
                    400: '#4ade80',
                    500: '#22c55e', // Default success
                    600: '#16a34a',
                    700: '#15803d',
                    800: '#166534',
                    900: '#14532d',
                    950: '#052e16'
                },

                // Warning colors
                warning: {
                    50: '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#f59e0b', // Default warning
                    600: '#d97706',
                    700: '#b45309',
                    800: '#92400e',
                    900: '#78350f',
                    950: '#451a03'
                },

                // Danger/Error colors
                danger: {
                    50: '#fef2f2',
                    100: '#fee2e2',
                    200: '#fecaca',
                    300: '#fca5a5',
                    400: '#f87171',
                    500: '#ef4444', // Default danger
                    600: '#dc2626',
                    700: '#b91c1c',
                    800: '#991b1b',
                    900: '#7f1d1d',
                    950: '#450a0a'
                },

                // Info colors
                info: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9', // Default info
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                    950: '#082f49'
                },

                // Neutral/Gray colors (extended)
                neutral: {
                    50: '#fafafa',
                    100: '#f5f5f5',
                    200: '#e5e5e5',
                    300: '#d4d4d4',
                    400: '#a3a3a3',
                    500: '#737373',
                    600: '#525252',
                    700: '#404040',
                    800: '#262626',
                    900: '#171717',
                    950: '#0a0a0a'
                }
            },

            // Spacing scale
            spacing: {
                0.5: '0.125rem',
                1.5: '0.375rem',
                2.5: '0.625rem',
                3.5: '0.875rem',
                18: '4.5rem',
                88: '22rem',
                100: '25rem',
                112: '28rem',
                128: '32rem'
            },

            // Border radius
            borderRadius: {
                none: '0',
                sm: '0.125rem',
                DEFAULT: '0.25rem',
                md: '0.375rem',
                lg: '0.5rem',
                xl: '0.75rem',
                '2xl': '1rem',
                '3xl': '1.5rem',
                full: '9999px'
            },

            // Box shadows
            boxShadow: {
                xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
                '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
                inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
                field: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                'field-focus': '0 0 0 3px rgb(59 130 246 / 0.1)',
                'field-error': '0 0 0 3px rgb(239 68 68 / 0.1)'
            },

            // Animation and transitions
            animation: {
                'fade-in': 'fadeIn 0.2s ease-in-out',
                'fade-out': 'fadeOut 0.2s ease-in-out',
                'slide-up': 'slideUp 0.3s ease-out',
                'slide-down': 'slideDown 0.3s ease-out',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                spinner: 'spin 1s linear infinite'
            },

            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                fadeOut: {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' }
                },
                slideUp: {
                    '0%': { transform: 'translateY(10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                },
                slideDown: {
                    '0%': { transform: 'translateY(-10px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                }
            },

            // Typography
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                serif: ['ui-serif', 'Georgia', 'serif'],
                mono: ['ui-monospace', 'SFMono-Regular', 'Monaco', 'Consolas', 'monospace']
            },

            // Z-index scale
            zIndex: {
                1: '1',
                2: '2',
                3: '3',
                4: '4',
                5: '5',
                dropdown: '1000',
                overlay: '1010',
                modal: '1020',
                popover: '1030',
                tooltip: '1040',
                notification: '1050'
            }
        }
    },
    plugins: [require('@tailwindcss/typography')]
}
