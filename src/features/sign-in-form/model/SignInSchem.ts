import { z } from 'zod';

export const signInSchema = z.object({
    email: z.string().email('The email must match the format example@example.com'),
    password: z.string()
        .min(6, {message: 'Minimum number of characters 6'})
        .max(20, {message: 'Maximum number of characters 20'}),
});

export type SignInData = z.infer<typeof signInSchema>;