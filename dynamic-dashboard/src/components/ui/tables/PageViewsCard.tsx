import { Card, CardDescription, CardTitle } from "../card";
import { CardContent } from "../card";
import { CardHeader } from "../card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../table";
import { useEffect, useState } from "react";
import { PageView } from "@prisma/client";

export default function PageViewTable() {
    const [pageViews, setPageViews] = useState<PageView[]>([])

    useEffect(() => {
        fetch('/api/page-views')
            .then(response => response.json())
            .then(data => setPageViews(data))
            .catch(error => console.error('Error fetching page views:', error))
    }, [])
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
                        {pageViews.map((pageView) => (
                            <TableRow key={pageView.id}>
                                <TableCell>{pageView.pageUrl}</TableCell>
                                <TableCell>{pageView.pageTitle}</TableCell>
                                <TableCell>{pageView.referrer}</TableCell>
                                <TableCell>{pageView.viewedAt.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    </Table>
            </CardContent>
        </Card>
    )
}