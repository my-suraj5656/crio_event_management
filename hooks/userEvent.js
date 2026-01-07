import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher, postFetcher } from "@/lib/api";

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => fetcher("/api/events"),
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => postFetcher("/api/events", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}
