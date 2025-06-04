import { Card, CardDescription, CardTitle } from "../card";
import { CardContent } from "../card";
import { CardHeader } from "../card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table";

const values = [
    {
        id: 1,
        elementId: "cta-button",
        elementType: "input",
        interaction: "submit",
        time: "2025-04-10 17:32:00",
    },
    {
        id: 2,
        elementId: "newsletter-signup",
        elementType: "button",
        interaction: "hover",
        time: "2025-04-10 17:32:01",
    },
    {
        id: 3,
        elementId: "menu-toggle",
        elementType: "button",
        interaction: "submit",
        time: "2025-04-10 17:32:02",
    },
    {
        id: 4,
        elementId: "menu_toggle",
        elementType: "button",
        interaction: "submit",
        time: "2025-04-10 17:32:03",
    },
    {
        id: 5,
        elementId: "search-input",
        elementType: "input",
        interaction: "submit",
        time: "2025-04-10 17:32:04",
    },
    {
        id: 6,
        elementId: "signup-button",
        elementType: "button",
        interaction: "click",
        time: "2025-04-10 17:32:05",
    },
    {
        id: 7,
        elementId: "login-button",
        elementType: "button",
        interaction: "click",
        time: "2025-04-10 17:32:06",
    },
    {
        id: 8,
        elementId: "newsletter-signup",
        elementType: "button",
        interaction: "hover",
        time: "2025-04-10 17:32:07",
    }
]

export default function PageInteractionsCard() {
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
                        {values.map((value) => (
                            <TableRow key={value.id}>
                                <TableCell>{value.elementId}</TableCell>
                                <TableCell>{value.elementType}</TableCell>
                                <TableCell>{value.interaction}</TableCell>
                                <TableCell>{value.time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
            </CardContent>
        </Card>
    )
}