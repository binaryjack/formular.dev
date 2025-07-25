import useAppContext from '@components/context/app-context/app-context.context'
import { cx } from 'formular.design.system'
import { ICulture } from 'formular.dev.lib'
import React from 'react'

/**
 * Test component to verify configuration retrieval works correctly
 */
export const ConfigTest: React.FC = () => {
    const { getConfiguration } = useAppContext()

    // Test retrieving the culture object
    const culture = getConfiguration<ICulture | undefined>('cultures', 'defaultCulture')

    // Test retrieving the entire cultures object
    const cultures = getConfiguration<any>('cultures')

    return (
        <div className={cx('p-5 font-mono')}>
            <h2 className="text-xl font-bold mb-4">Configuration Test Results</h2>

            <div className={cx('mb-5')}>
                <h3 className="text-lg font-semibold mb-2">
                    Culture Object (cultures.defaultCulture):
                </h3>
                <pre className={cx('bg-gray-100 p-3 rounded border text-sm overflow-auto')}>
                    {culture ? JSON.stringify(culture, null, 2) : 'undefined'}
                </pre>
                <p className="mt-2">
                    <strong>Type:</strong> {typeof culture}
                </p>
                <p>
                    <strong>Is null/undefined:</strong> {culture == null ? 'YES' : 'NO'}
                </p>
            </div>

            <div className={cx('mb-5')}>
                <h3 className="text-lg font-semibold mb-2">Date Separator (culture?.separator):</h3>
                <pre className={cx('bg-gray-100 p-3 rounded border text-sm overflow-auto')}>
                    {culture?.separator ?? 'undefined'}
                </pre>
                <p className="mt-2">
                    <strong>Type:</strong> {typeof culture?.separator}
                </p>
            </div>

            <div className={cx('mb-5')}>
                <h3 className="text-lg font-semibold mb-2">Entire Cultures Object:</h3>
                <pre className={cx('bg-gray-100 p-3 rounded border text-sm overflow-auto')}>
                    {cultures ? JSON.stringify(cultures, null, 2) : 'undefined'}
                </pre>
            </div>

            <div className={cx('mb-5')}>
                <h3 className="text-lg font-semibold mb-2">Test Results:</h3>
                <ul className="list-disc list-inside space-y-1">
                    <li>✅ Culture has name: {culture?.name ?? 'MISSING'}</li>
                    <li>✅ Culture has dateFormat: {culture?.dateFormat ?? 'MISSING'}</li>
                    <li>✅ Culture has currencySymbol: {culture?.currencySymbol ?? 'MISSING'}</li>
                    <li>✅ Separator value: {culture?.separator ?? 'MISSING'}</li>
                </ul>
            </div>
        </div>
    )
}

export default ConfigTest
