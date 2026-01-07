import AttendeeForm from "./attendee-form";
import AttendeeList from "./attendee-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EventDetail({ event }: { event: any }) {
  const isFull = event._count.attendees >= event.capacity;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Attendees ({event._count.attendees}/{event.capacity})
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {isFull && (
          <p className="text-red-500 font-medium">
            This event is full. No more registrations allowed.
          </p>
        )}

        <AttendeeForm eventId={event.id} disabled={isFull} />
        <AttendeeList eventId={event.id} />
      </CardContent>
    </Card>
  );
}
