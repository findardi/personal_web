import { z } from 'zod';

export const userSchema = z.object({
	username: z.string().nonempty('username is required'),
	password: z
		.string()
		.nonempty('password is required')
		.min(12, 'password is minimum must have 12 characters')
});

export type UserSchema = z.infer<typeof userSchema>;
