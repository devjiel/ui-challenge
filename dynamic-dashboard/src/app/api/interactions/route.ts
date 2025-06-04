import { getInteractions } from "@/lib/db/queries/interactions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const interactions = await getInteractions()
        return NextResponse.json(interactions)
    } catch (error) {
        return NextResponse.json({ message: "Failed to get interactions" }, { status: 500 })
    }
}