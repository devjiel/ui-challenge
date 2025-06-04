import { getPageViews } from "@/lib/db/queries/page-views";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const pageViews = await getPageViews()
        return NextResponse.json(pageViews)
    } catch (error) {
        return NextResponse.json({ message: "Failed to get page views" }, { status: 500 })
    }
}