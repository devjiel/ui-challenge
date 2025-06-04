import { seederManager } from "@/lib/services/seeder-manager";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await seederManager.initialize()
        return NextResponse.json({ message: "Seeders initialized" })
    } catch (error) {
        return NextResponse.json({ message: "Failed to initialize seeders" }, { status: 500 })
    }
}