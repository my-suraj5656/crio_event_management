import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher, postFetcher } from "@/lib/api";

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => fetcher("/api/events"),
  });
}

type EventInput = {
  title: string;
  description?: string;
  date: string;
  capacity: number;
};

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, EventInput>({
    mutationFn: (data: EventInput) => postFetcher("/api/events", data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}
