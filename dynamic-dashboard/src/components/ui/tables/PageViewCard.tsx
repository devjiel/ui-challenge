import { Card, CardDescription, CardTitle } from "../card";
import { CardContent } from "../card";
import { CardHeader } from "../card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table";

const values = [
    {
        id: 1,
        pageUrl: "/",
        pageTitle: "Home Page",
        referrer: "https://www.google.com",
        viewedAt: "2025-04-10 17:32:00",
    },
    {
        id: 2,
        pageUrl: "/contact",
        pageTitle: "Contact Page",
        referrer: "https://www.facebook.com",
        viewedAt: "2025-04-10 17:32:00",
    },
    {
        id: 3,
        pageUrl: "/about",
        pageTitle: "About Us",
        referrer: "https://www.linkedin.com",
        viewedAt: "2025-04-10 17:32:00",
    },
    {
        id: 4,
        pageUrl: "/about",
        pageTitle: "About Us",
        referrer: "Direct",
        viewedAt: "2025-04-10 17:32:00",
    },
    {
        id: 5,
        pageUrl: "/blog",
        pageTitle: "Blog Articles",
        referrer: "https://www.twitter.com",
        viewedAt: "2025-04-10 17:32:00",
    },
    {
        id: 6,
        pageUrl: "/blog",
        pageTitle: "Blog Articles",
        referrer: "https://www.twitter.com",
        viewedAt: "2025-04-10 17:32:00",
    },
    {
        id: 7,
        pageUrl: "/pricing",
        pageTitle: "Pricing Plans",
        referrer: "https://www.instagram.com",
        viewedAt: "2025-04-10 17:32:00",
    },
    {
        id: 8,
        pageUrl: "/pricing",
        pageTitle: "Pricing Plans",
        referrer: "https://www.google.com",
        viewedAt: "2025-04-10 17:32:00",
    },
    {
        id: 9,
        pageUrl: "/",
        pageTitle: "Home Page",
        referrer: "Direct",
        viewedAt: "2025-04-10 17:32:00",
    },
    {
        id: 10,
        pageUrl: "/contact",
        pageTitle: "Contact Page",
        referrer: "Direct",
        viewedAt: "2025-04-10 17:32:00",
    },
    {
        id: 11,
        pageUrl: "/about",
        pageTitle: "About Us",
        referrer: "https://www.facebook.com",
        viewedAt: "2025-04-10 17:32:00",
    },
]

export default function PageViewTable() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Page Views</CardTitle>
                <CardDescription>
                    <p>
                        <span className="text-muted-foreground">The most recent page views on your website.</span>
                    </p>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Page URL</TableHead>
                            <TableHead>Page Title</TableHead>
                            <TableHead>Referrer</TableHead>
                            <TableHead>Viewed At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {values.map((value) => (
                            <TableRow key={value.id}>
                                <TableCell>{value.pageUrl}</TableCell>
                                <TableCell>{value.pageTitle}</TableCell>
                                <TableCell>{value.referrer}</TableCell>
                                <TableCell>{value.viewedAt}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
            </CardContent>
        </Card>
    )
}