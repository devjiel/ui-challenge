import { Card, CardDescription, CardTitle } from "../card";
import { CardContent } from "../card";
import { CardHeader } from "../card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table";
import { useEffect, useState } from "react";
import { Interactions } from "@prisma/client";

export default function PageInteractionsCard() {
    const [interactions, setInteractions] = useState<Interactions[]>([])

    useEffect(() => {
        fetch('/api/interactions')
            .then(response => response.json())
            .then(data => setInteractions(data))
            .catch(error => console.error('Error fetching interactions:', error))
    }, [])
    return (
        <Card>
            <CardHeader>
                <CardTitle>User Interactions</CardTitle>
                <CardDescription>
                    <p>
                        <span className="text-muted-foreground">Recent user interactions on your website.</span>
                    </p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Element ID</TableHead>
                            <TableHead>Element Type</TableHead>
                            <TableHead>Interaction</TableHead>
                            <TableHead>Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {interactions.map((interaction) => (
                            <TableRow key={interaction.id}>
                                <TableCell>{interaction.elementId}</TableCell>
                                <TableCell>{interaction.elementType}</TableCell>
                                <TableCell>{interaction.interaction}</TableCell>
                                <TableCell>{interaction.time.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
            </CardContent>
        </Card>
    )
}