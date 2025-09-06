export class HealthController {
    constructor(service) {
        this.service = service
    }

    check() {
        return { status: 'ok', uptime: this.service.uptime() }
    }
}
