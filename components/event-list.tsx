"use client";

import { useEvents } from "@/hooks/userEvent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function EventList({
  onSelect,
}: {
  onSelect: (event: Event) => void;
}) {
  const { data, isLoading, isError } = useEvents();

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    );
  }

  // Error state
  if (isError) {
    return <p className="text-red-500">Failed to load events.</p>;
  }

  // Empty state
  if (!data || data.length === 0) {
    return (
      <p className="text-muted-foreground text-center">
        No events yet. Create your first event above.
      </p>
    );
  }

  // Event list
  return (
    <div className="space-y-4">
      {data.map((event: any) => (
        <Card
          key={event.id}
          className="cursor-pointer hover:shadow-md transition"
          onClick={() => onSelect(event)}
        >
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="text-sm text-muted-foreground">
              {new Date(event.date).toDateString()}
            </p>
            <p className="text-sm">{event.description || "No description"}</p>
            <p className="text-sm font-medium">
              Capacity: {event.capacity}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
