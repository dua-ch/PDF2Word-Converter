module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
    transform: {
        '^.+\\.tsx?$': 'babel-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/client/src/$1',
        '^@shared/(.*)$': '<rootDir>/shared/$1',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
