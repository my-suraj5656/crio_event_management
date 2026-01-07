"use client";

import { useAttendees } from "@/hooks/userAttenddee";
import { Skeleton } from "@/components/ui/skeleton";

export default function AttendeeList({ eventId }: { eventId: string }) {
  const { data, isLoading, isError } = useAttendees(eventId);

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2].map((i) => (
          <Skeleton key={i} className="h-6 w-full" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500">Failed to load attendees.</p>;
  }

  if (!data || data.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No attendees registered yet.
      </p>
    );
  }

  return (
    <ul className="space-y-1">
      {data.map((attendee: any) => (
        <li
          key={attendee.id}
          className="border rounded px-3 py-1 text-sm"
        >
          {attendee.name} — {attendee.email}
        </li>
      ))}
    </ul>
  );
}
