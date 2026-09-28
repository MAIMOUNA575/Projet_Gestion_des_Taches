import{z} from 'zod';
import { createZodDto } from "nestjs-zod";
export const createTaskSchema = z.object({
	title: z.string().min(1, "Le titre est obligatoire"),
	description: z.string().optional(),
	priority: z.enum(["low", "medium", "high"]),
});
export class CreateTaskDto extends createZodDto(createTaskSchema) {}
