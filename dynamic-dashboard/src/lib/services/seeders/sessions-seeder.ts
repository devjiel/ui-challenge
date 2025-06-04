import { createSession } from "../../db/mutations/sessions";
import { getPageSessionsCount } from "../../db/queries/sessions";

class SessionsSeeder {
    private interval: NodeJS.Timeout | null = null
    private isRunning = false

    private values = [
        {
            sessionId: "1234567890",
            userId: "Anonymous",
            startedAt: new Date(),
            duration: "0m",
        },
        {
            sessionId: "1f234567890",
            userId: "user_1234567890",
            startedAt: new Date(),
            duration: "1m",
        },
        {
            sessionId: "1fdg234567890",
            userId: "user_1234567890",
            startedAt: new Date(),
            duration: "2m",
        },
        {
            sessionId: "1fdg234567890",
            userId: "user_1234567890",
            startedAt: new Date(),
            duration: "3m",
        },
        {
            sessionId: "1fal12lmlds123",
            userId: "user_001",
            startedAt: new Date(),
            duration: "4m",
        },
        {
            sessionId: "1fdg234567891",
            userId: "user_0000000001",
            startedAt: new Date(),
            duration: "5m",
        },
        {
            sessionId: "1fdg234573190",
            userId: "user_0000000000",
            startedAt: new Date(),
            duration: "6m",
        },
        {
            sessionId: "1fdg234573190",
            userId: "user_0000000000",
            startedAt: new Date(),
            duration: "6m",
        },
        {
            sessionId: "1fdg234573190",
            userId: "user_0000000000",
            startedAt: new Date(),
            duration: "6m",
        },
        {
            sessionId: "1fdg234573190",
            userId: "user_0000000000",
            startedAt: new Date(),
            duration: "6m",
        },
    ]

    start() {
        if (this.isRunning) {
            console.log('🔄 Sessions seeder is already running')
            return
        }

        console.log('🚀 Starting sessions seeder ...')
        this.isRunning = true
        this.seed()

        this.interval = setInterval(() => {
            this.seed()
        }, 3000)
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval)
            this.isRunning = false
            this.interval = null
            console.log('🛑 Sessions seeder stopped')
        }
    }

    async seed() {
        try {
            const count = await getPageSessionsCount()
            if (count >= 1000) {
                this.stop()
                return
            }

            const randomIndex = Math.floor(Math.random() * this.values.length)
            const value = this.values[randomIndex]
            await createSession(value.sessionId, value.userId, value.startedAt, value.duration)
        } catch (error) {
            console.error('Error seeding sessions:', error)
        }
    }
}

export const sessionsSeeder = new SessionsSeeder()