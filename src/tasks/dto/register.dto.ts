import { z } from 'zod';
import { createZodDto } from "nestjs-zod";

export const registerSchema = z.object({
	name: z.string().min(1, "Le nom est obligatoire"),
	email: z.string().email("Email invalide"),
	password: z.string().min(1, "Le mot de passe est obligatoire"),
});

export class RegisterDto extends createZodDto(registerSchema) {}