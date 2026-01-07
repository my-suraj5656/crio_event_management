export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all events
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        _count: {
          select: { attendees: true },
        },
      },
      orderBy: { date: "asc" },
    });

    return NextResponse.json(events);
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

// CREATE event
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, date, capacity } = body;

    if (!title || !date || capacity <= 0) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(date),
        capacity,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create event" },
      { status: 500 }
    );
  }
}
