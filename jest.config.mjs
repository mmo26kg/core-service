/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    moduleFileExtensions: ['js', 'json'],
    transform: {}, // ESM native, no transform
    setupFiles: ['dotenv/config'],
    // Collect coverage later if needed
    collectCoverageFrom: ['src/**/*.js'],
}

export default config
