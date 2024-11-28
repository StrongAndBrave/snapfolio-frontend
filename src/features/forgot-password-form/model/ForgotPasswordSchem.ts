import { z } from 'zod';

export const forgotPasswordSchema = z.object({
    email: z.string().email('The email must match the format example@example.com'),
});

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;