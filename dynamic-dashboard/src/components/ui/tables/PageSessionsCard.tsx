import { Card, CardDescription, CardTitle } from "../card";
import { CardContent } from "../card";
import { CardHeader } from "../card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table";

const values = [
    {
        id: 1,
        sessionId: "1234567890",
        userId: "Anonymous",
        startedAt: "2025-04-10 17:32:00",
        duration: "0m",
    },
    {
        id: 2,
        sessionId: "1f234567890",
        userId: "user_1234567890",
        startedAt: "2025-04-10 17:32:00",
        duration: "1m",
    },
    {
        id: 3,
        sessionId: "1fdg234567890",
        userId: "user_1234567890",
        startedAt: "2025-04-10 17:32:00",
        duration: "2m",
    },
    {
        id: 4,
        sessionId: "1fdg234567890",
        userId: "user_1234567890",
        startedAt: "2025-04-10 17:32:00",
        duration: "3m",
    },
    {
        id: 5,
        sessionId: "1fal12lmlds123",
        userId: "user_001",
        startedAt: "2025-04-10 17:32:00",
        duration: "4m",
    },
    {
        id: 6,
        sessionId: "1fdg234567891",
        userId: "user_0000000001",
        startedAt: "2025-04-10 17:32:00",
        duration: "5m",
    },
    {
        id: 7,
        sessionId: "1fdg234573190",
        userId: "user_0000000000",
        startedAt: "2025-04-10 17:32:00",
        duration: "6m",
    },
    {
        id: 8,
        sessionId: "1fdg234573190",
        userId: "user_0000000000",
        startedAt: "2025-04-10 17:32:00",
        duration: "6m",
    },
    {
        id: 9,
        sessionId: "1fdg234573190",
        userId: "user_0000000000",
        startedAt: "2025-04-10 17:32:00",
        duration: "6m",
    },
    {
        id: 10,
        sessionId: "1fdg234573190",
        userId: "user_0000000000",
        startedAt: "2025-04-10 17:32:00",
        duration: "6m",
    },
]

export default function PageSessionsCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>
                    <p>
                        <span className="text-muted-foreground">Currently active user sessions.</span>
                    </p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Session ID</TableHead>
                            <TableHead>User ID</TableHead>
                            <TableHead>Started At</TableHead>
                            <TableHead>Duration</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {values.map((value) => (
                            <TableRow key={value.id}>
                                <TableCell>{value.sessionId}</TableCell>
                                <TableCell>{value.userId}</TableCell>
                                <TableCell>{value.startedAt}</TableCell>
                                <TableCell>{value.duration}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
            </CardContent>
        </Card>
    )
}