import { z } from 'zod';
import { createZodDto } from "nestjs-zod";

export const updateTaskSchema = z.object({
	title: z.string().min(1, "Le titre est obligatoire").optional(),
	description: z.string().optional(),
	priority: z.enum(["low", "medium", "high"]).optional(),
});

export class UpdateTaskDto extends createZodDto(updateTaskSchema) {}