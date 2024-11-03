    import db from "@/utils/DBconfig";
    import { NextRequest, NextResponse } from "next/server";
    import { todo } from "@/utils/Schema";

    export async function POST(request: NextRequest) {
        try {
            const reqbody = await request.json();
            const { name, comment } = reqbody;

            // Adjusted to use Drizzle/ORM-specific syntax for inserting data
            const result = await db.insert(todo).values({
                name: name,
                comment: comment,
            }).returning({ insertedId: todo.id });

            return NextResponse.json(result, { status: 201 });
        } catch (error) {
            return NextResponse.json({ error: (error as Error).message }, { status: 500 });
        }
    }
