import { z } from "zod";

export const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  date: z.string().min(1, "Date is required"),
  capacity: z
    .number({ invalid_type_error: "Capacity is required" })
    .int()
    .positive("Capacity must be greater than 0"),
});
