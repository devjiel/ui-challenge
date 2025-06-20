import { getSessions } from "@/lib/db/queries/sessions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const pageSessions = await getSessions()
        return NextResponse.json(pageSessions)
    } catch (error) {
        return NextResponse.json({ message: "Failed to get page sessions" }, { status: 500 })
    }
}