import { generateButtonStyles } from 'formular.design.system'

/**
 * Simple test component to verify button styling
 */
export const ButtonStyleTest = () => {
    const testCases = [
        { variant: 'primary', size: 'md' },
        { variant: 'secondary', size: 'md' },
        { variant: 'success', size: 'md' },
        { variant: 'danger', size: 'md' },
        { variant: 'warning', size: 'md' },
        { variant: 'info', size: 'md' }
    ] as const

    return (
        <div className="p-8 space-y-6">
            <h1 className="text-2xl font-bold">Design System Button Test</h1>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Direct CSS Classes</h2>
                <div className="flex gap-4 flex-wrap">
                    <button className="btn btn-md btn-primary">Primary (Direct)</button>
                    <button className="btn btn-md btn-secondary">Secondary (Direct)</button>
                    <button className="btn btn-md btn-success">Success (Direct)</button>
                    <button className="btn btn-md btn-danger">Danger (Direct)</button>
                    <button className="btn btn-md btn-warning">Warning (Direct)</button>
                    <button className="btn btn-md btn-info">Info (Direct)</button>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Generated Classes</h2>
                <div className="flex gap-4 flex-wrap">
                    {testCases.map(({ variant, size }) => {
                        const classes = generateButtonStyles('solid', variant as any, size as any)
                        return (
                            <button key={variant} className={classes}>
                                {variant} (Generated)
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Debug Info</h2>
                <div className="bg-gray-100 p-4 rounded text-sm font-mono">
                    {testCases.map(({ variant, size }) => {
                        const classes = generateButtonStyles('solid', variant as any, size as any)
                        return (
                            <div key={variant}>
                                <strong>{variant}:</strong> {classes}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
