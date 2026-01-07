import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher, postFetcher } from "@/lib/api";

export function useAttendees(eventId) {
  return useQuery({
    queryKey: ["attendees", eventId],
    queryFn: () => fetcher(`/api/attendees?eventId=${eventId}`),
    enabled: !!eventId,
  });
}

export function useCreateAttendee(eventId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      postFetcher("/api/attendees", { ...data, eventId }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["attendees", eventId],
      });
    },
  });
}
