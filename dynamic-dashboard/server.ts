import { createServer } from "http";
import { parse as parseUrl } from "url";
import next from "next";
import { getPageViewsCount } from "@/lib/db/queries/page-views";
import { getSessionsCount } from "@/lib/db/queries/sessions";
import { seederManager } from "@/lib/services/seeder-manager";

const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(async () => {
    await seederManager.initialize()

    createServer((req, res) => {
        const parsedUrl = parseUrl(req.url || "", true)

        // Handle SSE endpoint inline
        if (parsedUrl.pathname === "/api/sse") {
            res.writeHead(200, {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "Access-Control-Allow-Origin": "*",
            })

            const interval = setInterval(async () => {
                const data = await getData()
                res.write(`data: ${JSON.stringify(data)}\n\n`)
            }, 3000)

            req.on("close", () => {
                clearInterval(interval)
            })
        } else {
            return handle(req, res)
        }
    }).listen(3000, (err?: Error) => {
        if (err) throw err
        console.log("Server is running on port 3000")
    });

    process.on("SIGTERM", () => {
        console.log("SIGTERM signal received: closing HTTP server")
        process.exit(0)
    })

    process.on("SIGINT", () => {
        console.log("SIGINT signal received: closing HTTP server")
        process.exit(0)
    })
})

process.on("uncaughtException", (err) => {
    console.error("Uncaught exception:", err)
})

async function getData() {

    const pageViewsCount = await getPageViewsCount()
    const sessionsCount = await getSessionsCount()

    const data = {
        pageViews: pageViewsCount,
        sessions: sessionsCount,
        timestamp: new Date().toISOString()
    }
    return data
}