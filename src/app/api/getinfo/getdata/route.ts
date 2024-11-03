import db from "@/utils/DBconfig";
import { todo } from "@/utils/Schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        // Fetch all records from the 'todo' table
        const result = await db.select().from(todo);

        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
