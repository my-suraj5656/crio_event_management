import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher, postFetcher } from "@/lib/api";

export interface Attendee {
  id: string;
  name: string;
  email: string;
  eventId: string;
  createdAt: string;
}


export function useAttendees(eventId: string) {
  return useQuery<Attendee[]>({
    queryKey: ["attendees", eventId],
    queryFn: () =>
      fetcher<Attendee[]>(`/api/attendees?eventId=${eventId}`),
    enabled: !!eventId,
  });
}


type CreateAttendeeInput = {
  name: string;
  email: string;
};

export function useCreateAttendee(eventId: string) {
  const queryClient = useQueryClient();

  return useMutation<Attendee, Error, CreateAttendeeInput>({
    mutationFn: (data) =>
      postFetcher<Attendee, CreateAttendeeInput & { eventId: string }>(
        "/api/attendees",
        {
          ...data,
          eventId,
        }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["attendees", eventId],
      });
    },
  });
}
