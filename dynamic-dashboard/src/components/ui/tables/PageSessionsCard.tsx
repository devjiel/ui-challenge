import { Card, CardDescription, CardTitle } from "../card";
import { CardContent } from "../card";
import { CardHeader } from "../card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table";
import { useEffect, useState } from "react";
import { PageSession } from "@prisma/client";

export default function PageSessionsCard() {
    const [pageSessions, setPageSessions] = useState<PageSession[]>([])

    useEffect(() => {
        fetch('/api/sessions')
            .then(response => response.json())
            .then(data => setPageSessions(data))
            .catch(error => console.error('Error fetching page sessions:', error))
    }, [])

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
                        {pageSessions.map((pageSession) => (
                            <TableRow key={pageSession.id}>
                                <TableCell>{pageSession.sessionId}</TableCell>
                                <TableCell>{pageSession.userId}</TableCell>
                                <TableCell>{pageSession.startedAt.toLocaleString()}</TableCell>
                                <TableCell>{pageSession.duration}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
            </CardContent>
        </Card>
    )
}