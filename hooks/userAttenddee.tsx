import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher, postFetcher } from "@/lib/api";

type AttendeeInput = {
  name: string;
  email: string;
};

export function useAttendees(eventId: string) {
  return useQuery({
    queryKey: ["attendees", eventId],
    queryFn: () => fetcher(`/api/attendees?eventId=${eventId}`),
    enabled: !!eventId,
  });
}

export function useCreateAttendee(eventId: string) {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, AttendeeInput>({
    mutationFn: (data: AttendeeInput) =>
      postFetcher("/api/attendees", { ...data, eventId }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["attendees", eventId],
      });
    },
  });
}
