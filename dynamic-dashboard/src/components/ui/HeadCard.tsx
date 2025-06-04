import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HeadCard({ title, footer, cardAction, value }: { title: string, footer: string, cardAction?: React.ReactNode, value?: string }) {

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle>{title}</CardTitle>
                {cardAction && (
                    <CardAction className="text-muted-foreground">
                        {cardAction}
                    </CardAction>
                )}
            </CardHeader>
            <CardContent className="">
                <p className="text-2xl font-bold">{value || "..."}</p>
                <p className="text-sm text-muted-foreground">{footer}</p>
            </CardContent>
        </Card>
    )
}