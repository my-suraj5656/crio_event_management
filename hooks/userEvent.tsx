import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher, postFetcher } from "@/lib/api";


export interface Event {
  id: string;
  title: string;
  description?: string | null;
  date: string;
  capacity: number;
  _count?: {
    attendees: number;
  };
}

type EventInput = {
  title: string;
  description?: string;
  date: string;
  capacity: number;
};


export function useEvents() {
  return useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: () => fetcher<Event[]>("/api/events"),
  });
}


export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation<Event, Error, EventInput>({
    mutationFn: (data) =>
      postFetcher<Event, EventInput>("/api/events", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}
