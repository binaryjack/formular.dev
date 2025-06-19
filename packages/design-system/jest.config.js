module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setup-tests.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@tokens/(.*)$': '<rootDir>/src/tokens/$1',
        '^@utilities/(.*)$': '<rootDir>/src/utilities/$1',
        '^@types/(.*)$': '<rootDir>/src/types/$1',
        '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/**/*.stories.{ts,tsx}',
        '!src/**/*.test.{ts,tsx}',
        '!src/**/*.spec.{ts,tsx}',
        '!src/index.ts'
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
        }
    },
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{ts,tsx}',
        '<rootDir>/src/**/*.{test,spec}.{ts,tsx}'
    ],
    transform: {
        '^.+\\.(ts|tsx)$': [
            'ts-jest',
            {
                tsconfig: 'tsconfig.json'
            }
        ]
    }
}
