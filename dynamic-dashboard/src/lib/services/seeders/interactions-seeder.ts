import { getInteractionsCount } from "@/lib/db/queries/interactions";
import { createInteraction } from "../../db/mutations/interactions";

class InteractionsSeeder {
    private interval: NodeJS.Timeout | null = null
    private isRunning = false

    private values = [
        {
            elementId: "cta-button",
            elementType: "input",
            interaction: "submit",
            time: new Date(),
        },
        {
            elementId: "newsletter-signup",
            elementType: "button",
            interaction: "hover",
            time: new Date(),
        },
        {
            elementId: "menu-toggle",
            elementType: "button",
            interaction: "submit",
            time: new Date(),
        },
        {
            elementId: "menu_toggle",
            elementType: "button",
            interaction: "submit",
            time: new Date(),
        },
        {
            elementId: "search-input",
            elementType: "input",
            interaction: "submit",
            time: new Date(),
        },
        {
            elementId: "signup-button",
            elementType: "button",
            interaction: "click",
            time: new Date(),
        },
        {
            elementId: "login-button",
            elementType: "button",
            interaction: "click",
            time: new Date(),
        },
        {
            elementId: "newsletter-signup",
            elementType: "button",
            interaction: "hover",
            time: new Date(),
        }
    ]

    start() {
        if (this.isRunning) {
            console.log('🔄 Interactions seeder is already running')
            return
        }

        console.log('🚀 Starting interactions seeder ...')
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
            console.log('🛑 Interactions seeder stopped')
        }
    }

    async seed() {
        try {
            const count = await getInteractionsCount()
            if (count >= 1000) {
                this.stop()
                return
            }

            const randomIndex = Math.floor(Math.random() * this.values.length)
            const value = this.values[randomIndex]
            await createInteraction(value.elementId, value.elementType, value.interaction, value.time)
        } catch (error) {
            console.error('Error seeding interactions:', error)
        }
    }
}

export const interactionsSeeder = new InteractionsSeeder()