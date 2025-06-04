import { getPageViewsCount } from "@/lib/db/queries/page-views";
import { createPageView } from "../../db/mutations/page-views";

class PageViewsSeeder {
    private interval: NodeJS.Timeout | null = null
    private isRunning = false

    private values = [
        {
            pageUrl: "/",
            pageTitle: "Home Page",
            referrer: "https://www.google.com",
            viewedAt: new Date(),
        },
        {
            pageUrl: "/contact",
            pageTitle: "Contact Page",
            referrer: "https://www.facebook.com",
            viewedAt: new Date(),
        },
        {
            pageUrl: "/about",
            pageTitle: "About Us",
            referrer: "https://www.linkedin.com",
            viewedAt: new Date(),
        },
        {
            pageUrl: "/about",
            pageTitle: "About Us",
            referrer: "Direct",
            viewedAt: new Date(),
        },
        {
            pageUrl: "/blog",
            pageTitle: "Blog Articles",
            referrer: "https://www.twitter.com",
            viewedAt: new Date(),
        },
        {
            pageUrl: "/blog",
            pageTitle: "Blog Articles",
            referrer: "https://www.twitter.com",
            viewedAt: new Date(),
        },
        {
            pageUrl: "/pricing",
            pageTitle: "Pricing Plans",
            referrer: "https://www.instagram.com",
            viewedAt: new Date(),
        },
        {
            pageUrl: "/pricing",
            pageTitle: "Pricing Plans",
            referrer: "https://www.google.com",
            viewedAt: new Date(),
        },
        {
            pageUrl: "/",
            pageTitle: "Home Page",
            referrer: "Direct",
            viewedAt: new Date(),
        },
        {
            pageUrl: "/contact",
            pageTitle: "Contact Page",
            referrer: "Direct",
            viewedAt: new Date(),
        },
        {
            pageUrl: "/about",
            pageTitle: "About Us",
            referrer: "https://www.facebook.com",
            viewedAt: new Date(),
        },
    ]

    start() {
        if (this.isRunning) {
            console.log('🔄 Page views seeder is already running')
            return
        }

        console.log('🚀 Starting page views seeder ...')
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
            console.log('🛑 Page views seeder stopped')
        }
    }

    async seed() {
        try {
            const count = await getPageViewsCount()
            if (count >= 100) {
                this.stop()
                return
            }

            const randomIndex = Math.floor(Math.random() * this.values.length)
            const value = this.values[randomIndex]
            await createPageView(value.pageUrl, value.pageTitle, value.referrer, value.viewedAt)
        } catch (error) {
            console.error('Error seeding page views:', error)
        }
    }
}

export const pageViewSeeder = new PageViewsSeeder()