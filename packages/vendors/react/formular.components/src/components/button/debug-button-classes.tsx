import { generateButtonStyles } from 'formular.design.system'

/**
 * Debug component to see what classes are being generated
 */
export const DebugButtonClasses = () => {
    const sizes = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const

    return (
        <div className="p-4 bg-gray-100 rounded mb-8">
            <h3 className="font-bold mb-4">Generated Button Classes Debug:</h3>

            {/* Show generated classes */}
            <div className="mb-6">
                {sizes.map((size) => {
                    const classes = generateButtonStyles('solid', 'primary', size)
                    return (
                        <div key={size} className="mb-2">
                            <strong>{size}:</strong>{' '}
                            <code className="bg-white px-2 py-1 rounded">{classes}</code>
                        </div>
                    )
                })}
            </div>

            {/* Show actual buttons with direct CSS classes */}
            <div className="mb-6">
                <h4 className="font-semibold mb-2">Direct CSS Classes Test:</h4>
                <div className="flex gap-2 flex-wrap">
                    {sizes.map((size) => (
                        <button key={`direct-${size}`} className={`btn btn-${size} btn-primary`}>
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Show actual buttons with generated classes */}
            <div className="mb-6">
                <h4 className="font-semibold mb-2">Generated Classes Test:</h4>
                <div className="flex gap-2 flex-wrap">
                    {sizes.map((size) => {
                        const classes = generateButtonStyles('solid', 'primary', size)
                        return (
                            <button key={`generated-${size}`} className={classes}>
                                {size}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Manual Size Test with Inline Styles */}
            <div>
                <h4 className="font-semibold mb-2">Manual Size Test (Inline Styles):</h4>
                <div className="flex gap-2 flex-wrap">
                    <button
                        style={{
                            fontSize: '10px',
                            padding: '2px 4px',
                            minHeight: '20px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px'
                        }}
                    >
                        2xs-manual
                    </button>
                    <button
                        style={{
                            fontSize: '12px',
                            padding: '4px 8px',
                            minHeight: '24px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px'
                        }}
                    >
                        xs-manual
                    </button>
                    <button
                        style={{
                            fontSize: '14px',
                            padding: '8px 16px',
                            minHeight: '32px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px'
                        }}
                    >
                        sm-manual
                    </button>
                    <button
                        style={{
                            fontSize: '16px',
                            padding: '16px 24px',
                            minHeight: '40px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px'
                        }}
                    >
                        md-manual
                    </button>
                    <button
                        style={{
                            fontSize: '18px',
                            padding: '24px 32px',
                            minHeight: '48px',
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px'
                        }}
                    >
                        lg-manual
                    </button>
                </div>
            </div>
        </div>
    )
}
