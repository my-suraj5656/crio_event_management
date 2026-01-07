export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET attendees by eventId
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("eventId");

  if (!eventId) {
    return NextResponse.json(
      { message: "eventId is required" },
      { status: 400 }
    );
  }

  try {
    const attendees = await prisma.attendee.findMany({
      where: { eventId },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(attendees);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch attendees" },
      { status: 500 }
    );
  }
}

// CREATE attendee
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, eventId } = body;

    if (!name || !email || !eventId) {
      return NextResponse.json({ message: "Invalid input" }, { status: 400 });
    }

    // Fetch event attendee count
    const event = await prisma.event.findUnique({
      where: { id: eventId },
      include: { attendees: true },
    });

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    // Capacity check (BUSINESS RULE)
    if (event.attendees.length >= event.capacity) {
      return NextResponse.json({ message: "Event is full" }, { status: 400 });
    }

    //  Create attendee
    const attendee = await prisma.attendee.create({
      data: {
        name,
        email,
        eventId,
      },
    });

    return NextResponse.json(attendee, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to register attendee" },
      { status: 500 }
    );
  }
}
