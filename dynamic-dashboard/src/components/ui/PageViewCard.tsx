'use client'
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { Eye } from "lucide-react"

export default function PageViewCard() {
    const [pageViews, setPageViews] = useState<any>(null)

    useEffect(() => {
        const eventSource = new EventSource("/api/sse")

        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data)
            setPageViews(data.pageViews)
        }

        return () => {
            eventSource.close()
        }
    }, [])

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>Total Page Views</CardTitle>
                <CardAction className="text-muted-foreground">
                    <Eye className="w-4 h-4" />
                </CardAction>
            </CardHeader>
            <CardContent className="">
                <p className="text-2xl font-bold">{pageViews || "..."}</p>
                <p className="text-sm text-muted-foreground">Updated in real-time</p>
            </CardContent>
        </Card>
    )
}