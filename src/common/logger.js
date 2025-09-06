// Tiny logger abstraction; can be swapped later
export function createLogger({ level = 'info' } = {}) {
    const levels = ['error', 'warn', 'info', 'debug']
    const shouldLog = (msgLevel) => levels.indexOf(msgLevel) <= levels.indexOf(level)

    const base = (msgLevel, ...args) => {
        if (!shouldLog(msgLevel)) return
        const ts = new Date().toISOString()
        console[msgLevel === 'debug' ? 'log' : msgLevel](
            `[${ts}] [${msgLevel.toUpperCase()}]`,
            ...args
        )
    }

    return {
        error: (...args) => base('error', ...args),
        warn: (...args) => base('warn', ...args),
        info: (...args) => base('info', ...args),
        debug: (...args) => base('debug', ...args),
    }
}
