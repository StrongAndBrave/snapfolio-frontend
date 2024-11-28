import { z } from 'zod';

export const newPasswordSchema = z.object({
    password: z.string()
        .min(6, {message: 'Minimum number of characters 6'})
        .max(20, {message: 'Maximum number of characters 20'})
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/,
            { message: 'Password must contain a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~' }
        ),
    passwordConfirmation: z.string()
        .min(6, {message: 'Minimum number of characters 6'})
        .max(20, {message: 'Maximum number of characters 20'})
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/,
            { message: 'Password must contain a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~' }
        ),
}).refine((data) => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'Passwords do not match',
});

export type NewPasswordData = z.infer<typeof newPasswordSchema>;

