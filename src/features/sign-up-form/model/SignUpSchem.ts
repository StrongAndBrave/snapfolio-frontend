import { z } from 'zod';

export const signUpSchema = z.object({
    userName: z.string()
        .regex(/^[0-9A-Za-z_-]+$/, {message: 'Valid characters are 0-9, A-Z, a-z, _ , -'})
        .min(6, { message: 'Minimum number of characters 6' })
        .max(30, {message: 'Maximum number of characters 30'}),
    email: z.string().email('The email must match the format example@example.com'),
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
    checkBox: z.literal(true),
}).refine((data) => data.password === data.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'Passwords do not match',
});

export type SignUpData = z.infer<typeof signUpSchema>;

