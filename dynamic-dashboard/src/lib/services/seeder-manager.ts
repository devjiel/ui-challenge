import { interactionsSeeder } from "./seeders/interactions-seeder";
import { pageViewSeeder } from "./seeders/page-views-seeder";
import { sessionsSeeder } from "./seeders/sessions-seeder";

class SeederManager {
    private seeders = new Map<string, any>()
    private initialized = false

    async initialize() {
        if (this.initialized) {
            console.log('⚠️ Seeder manager is already initialized')
            return
        }

        console.log('🔧 Initializing seeders...')

        this.seeders.set('page-views', pageViewSeeder)
        this.seeders.set('sessions', sessionsSeeder)
        this.seeders.set('interactions', interactionsSeeder)

        this.startAllSeeders()
        
        this.initialized = true
        console.log('✅ Seeder manager initialized')
    }

    startAllSeeders() {
        console.log('🎯 Starting all seeders...')
        this.seeders.forEach((seeder, name) => {
            try {
                seeder.start()
                console.log(`✅ ${name} seeder started`)
            } catch (error) {
                console.error(`❌ Failed to start ${name} seeder:`, error)
            }
        })
    }

    stopAllSeeders() {
        console.log('🛑 Stopping all seeders...')

        this.seeders.forEach((seeder, name) => {
            try {
                seeder.stop()
                console.log(`✅ ${name} seeder stopped`)
            } catch (error) {
                console.error(`❌ Failed to stop ${name} seeder:`, error)
            }
        })
    }
}

export const seederManager = new SeederManager()