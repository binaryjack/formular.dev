/**
 * Example React Component using Smart Contrast System
 * 
 * This example demonstrates how to use both the CSS approach and the
 * enhanced generic style system together.
 */

import { genericStyle, semanticStyle } from 'formular.design.system'
import React from 'react'

interface SmartButtonProps {
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
    visualVariant?: 'solid' | 'outline' | 'ghost'
    children: React.ReactNode
    useCustomColors?: boolean
    customShades?: {
        background?: number
        text?: number
    }
    className?: string
    onClick?: () => void
}

/**
 * Smart Button Component that demonstrates the hybrid approach:
 * 1. Uses semantic tokens by default for auto-contrast
 * 2. Falls back to traditional genericStyle when custom shades needed
 * 3. Also supports direct CSS class usage
 */
export const SmartButton = ({ 
    variant = 'primary', 
    visualVariant = 'solid',
    children,
    useCustomColors = false,
    customShades,
    className = '',
    onClick,
    ...props 
}: SmartButtonProps) => {
    
    // Approach 1: Direct CSS classes (simplest, auto-adapting)
    if (!useCustomColors && !customShades) {
        const cssClass = visualVariant === 'outline' 
            ? `btn-smart-outline-${variant}` 
            : `btn-smart-${variant}`
        
        return (
            <button 
                className={`btn btn-md ${cssClass} ${className}`}
                onClick={onClick}
                {...props}
            >
                {children}
            </button>
        )
    }
    
    // Approach 2: Enhanced generic style system with semantic tokens
    if (!customShades) {
        const smartClasses = semanticStyle({
            componentTypes: ['button'],
            variant,
            visualVariant,
            aspect: { size: 'md' }
        })
        
        const combinedClasses = [
            'btn',
            ...smartClasses.backGround,
            ...smartClasses.text,
            ...smartClasses.borders,
            className
        ].filter(Boolean).join(' ')
        
        return (
            <button 
                className={combinedClasses}
                onClick={onClick}
                {...props}
            >
                {children}
            </button>
        )
    }
    
    // Approach 3: Traditional generic style system with custom shades
    const customClasses = genericStyle({
        componentTypes: ['button'],
        variant,
        visualVariant,
        aspect: { size: 'md' }
    })
    
    const combinedClasses = [
        'btn',
        ...customClasses.backGround,
        ...customClasses.text,
        ...customClasses.borders,
        className
    ].filter(Boolean).join(' ')
    
    return (
        <button 
            className={combinedClasses}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    )
}

/**
 * Theme Provider Component
 * Handles dark mode switching for the entire application
 */
interface ThemeProviderProps {
    children: React.ReactNode
    defaultTheme?: 'light' | 'dark'
}

export const ThemeProvider = ({ children, defaultTheme = 'light' }: ThemeProviderProps) => {
    const [theme, setTheme] = React.useState<'light' | 'dark'>(defaultTheme)
    
    React.useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark')
        } else {
            document.documentElement.removeAttribute('data-theme')
        }
    }, [theme])
    
    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light')
    }
    
    const contextValue = {
        theme,
        toggleTheme,
        isDark: theme === 'dark'
    }
    
    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    )
}

const ThemeContext = React.createContext<{
    theme: 'light' | 'dark'
    toggleTheme: () => void
    isDark: boolean
}>({
    theme: 'light',
    toggleTheme: () => {},
    isDark: false
})

export const useTheme = () => React.useContext(ThemeContext)

/**
 * Demo Component showing all approaches
 */
export const SmartContrastDemo = () => {
    const { toggleTheme, isDark } = useTheme()
    
    return (
        <div className="p-8 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Smart Contrast Demo</h1>
                <SmartButton 
                    variant="secondary" 
                    visualVariant="outline"
                    onClick={toggleTheme}
                >
                    {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </SmartButton>
            </div>
            
            <section>
                <h2 className="text-xl font-semibold mb-4">CSS Classes (Simplest)</h2>
                <div className="flex flex-wrap gap-4">
                    <SmartButton variant="primary">Primary</SmartButton>
                    <SmartButton variant="secondary">Secondary</SmartButton>
                    <SmartButton variant="success">Success</SmartButton>
                    <SmartButton variant="warning">Warning</SmartButton>
                    <SmartButton variant="danger">Danger</SmartButton>
                </div>
            </section>
            
            <section>
                <h2 className="text-xl font-semibold mb-4">Outline Variants</h2>
                <div className="flex flex-wrap gap-4">
                    <SmartButton variant="primary" visualVariant="outline">Primary Outline</SmartButton>
                    <SmartButton variant="secondary" visualVariant="outline">Secondary Outline</SmartButton>
                    <SmartButton variant="success" visualVariant="outline">Success Outline</SmartButton>
                </div>
            </section>
            
            <section>
                <h2 className="text-xl font-semibold mb-4">Semantic Style System</h2>
                <div className="flex flex-wrap gap-4">
                    <SmartButton variant="primary" useCustomColors={true}>Semantic Primary</SmartButton>
                    <SmartButton variant="info" useCustomColors={true}>Semantic Info</SmartButton>
                    <SmartButton variant="danger" visualVariant="ghost" useCustomColors={true}>Semantic Ghost</SmartButton>
                </div>
            </section>
            
            <section>
                <h2 className="text-xl font-semibold mb-4">Custom Utility Classes</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="surface-variant-primary text-on-variant-primary p-4 rounded">
                        <h3 className="font-semibold">Primary Surface</h3>
                        <p className="text-sm opacity-90">Auto-contrasting text</p>
                    </div>
                    <div className="surface-variant-success text-on-variant-success p-4 rounded">
                        <h3 className="font-semibold">Success Surface</h3>
                        <p className="text-sm opacity-90">Auto-contrasting text</p>
                    </div>
                    <div className="surface-variant-warning text-on-variant-warning p-4 rounded">
                        <h3 className="font-semibold">Warning Surface</h3>
                        <p className="text-sm opacity-90">Auto-contrasting text</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

/**
 * Usage in your app:
 * 
 * ```tsx
 * import { ThemeProvider, SmartContrastDemo } from './components/SmartContrastDemo'
 * 
 * function App() {
 *   return (
 *     <ThemeProvider>
 *       <SmartContrastDemo />
 *     </ThemeProvider>
 *   )
 * }
 * ```
 */
