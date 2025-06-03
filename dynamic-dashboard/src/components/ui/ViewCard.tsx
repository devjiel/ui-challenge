import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye } from "lucide-react"

export default function ViewCard({ title, value }: { title: string, value?: string }) {

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>{title}</CardTitle>
                <CardAction>
                    <Eye className="w-4 h-4 text-muted-foreground" />
                </CardAction>
            </CardHeader>
            <CardContent className="">
                <p className="text-2xl font-bold">{value || "..."}</p>
                <p className="text-sm text-muted-foreground">Updated in real-time</p>
            </CardContent>
        </Card>
    )
}