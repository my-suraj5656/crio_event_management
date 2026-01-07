"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateAttendee } from "@/hooks/userAttenddee";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const attendeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
});

type AttendeeFormValues = z.infer<typeof attendeeSchema>;

export default function AttendeeForm({
  eventId,
  disabled,
}: {
  eventId: string;
  disabled: boolean;
}) {
  const form = useForm<AttendeeFormValues>({
    resolver: zodResolver(attendeeSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const { mutate, isPending } = useCreateAttendee(eventId);

  function onSubmit(values: AttendeeFormValues) {
    mutate(values, {
      onSuccess: () => {
        toast.success("Attendee added", {
          description: "Registration successful.",
        });

        form.reset();
      },
      onError: (error) => {
        toast.error("Failed to register", {
          description: error.message,
        });
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Attendee name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={disabled || isPending}>
          {disabled ? "Event Full" : isPending ? "Adding..." : "Add Attendee"}
        </Button>
      </form>
    </Form>
  );
}
