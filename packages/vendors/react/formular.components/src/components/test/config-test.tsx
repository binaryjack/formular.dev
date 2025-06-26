import useAppContext from '@components/context/app-context/app-context.context'
import { ICulture } from 'formular.dev.lib'
import React from 'react'

/**
 * Test component to verify configuration retrieval works correctly
 */
export const ConfigTest: React.FC = () => {
    const { getConfiguration } = useAppContext()

    // Test retrieving the culture object
    const culture = getConfiguration<ICulture | undefined>('cultures', 'defaultCulture')

    // Test retrieving a simple string
    const separator = getConfiguration<string | undefined>(
        'conventions',
        'dataTypes',
        'date',
        'separator'
    )

    // Test retrieving the entire cultures object
    const cultures = getConfiguration<any>('cultures')

    return (
        <div style={{ padding: '20px', fontFamily: 'monospace' }}>
            <h2>Configuration Test Results</h2>

            <div style={{ marginBottom: '20px' }}>
                <h3>Culture Object (cultures.defaultCulture):</h3>
                <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
                    {culture ? JSON.stringify(culture, null, 2) : 'undefined'}
                </pre>
                <p>
                    <strong>Type:</strong> {typeof culture}
                </p>
                <p>
                    <strong>Is null/undefined:</strong> {culture == null ? 'YES' : 'NO'}
                </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Date Separator (conventions.dataTypes.date.separator):</h3>
                <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
                    {separator ?? 'undefined'}
                </pre>
                <p>
                    <strong>Type:</strong> {typeof separator}
                </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Entire Cultures Object:</h3>
                <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
                    {cultures ? JSON.stringify(cultures, null, 2) : 'undefined'}
                </pre>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h3>Test Results:</h3>
                <ul>
                    <li>✅ Culture has name: {culture?.name ?? 'MISSING'}</li>
                    <li>✅ Culture has dateFormat: {culture?.dateFormat ?? 'MISSING'}</li>
                    <li>✅ Culture has currencySymbol: {culture?.currencySymbol ?? 'MISSING'}</li>
                    <li>✅ Separator value: {separator ?? 'MISSING'}</li>
                </ul>
            </div>
        </div>
    )
}

export default ConfigTest
