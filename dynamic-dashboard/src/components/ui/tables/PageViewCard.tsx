import { Card, CardDescription, CardTitle } from "../card";
import { CardContent } from "../card";
import { CardHeader } from "../card";
import { Table, TableHead, TableHeader, TableRow } from "../table";

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
                </Table>
            </CardContent>
        </Card>
    )
}