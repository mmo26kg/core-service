export class HealthService {
    constructor() {
        this.startTime = process.hrtime.bigint()
    }

    uptime() {
        const now = process.hrtime.bigint()
        const diffNs = Number(now - this.startTime)
        return Math.round(diffNs / 1e9)
    }
}
