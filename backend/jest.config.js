// jest.config.js

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts', '**/*.spec.ts'],
    coverageThreshold: {
        global: {
            branches: 50,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    reporters: [
        'default',
        [
            'jest-html-reporters',
            {
                publicPath: './coverage',
                filename: 'coverage-report.html',
                expand: true,
            },
        ],
    ],
};
