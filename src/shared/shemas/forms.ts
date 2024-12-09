import { z } from 'zod';

export const passwordSchema = z
    .string()
    .min(6, { message: 'Minimum number of characters 6' })
    .max(20, { message: 'Maximum number of characters 20' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!"#$%&'()*+,\-.:;<=>?@[\\\]^_`{|}~]).{6,20}$/, {
        // message: 'Password must contain a-z, A-Z, and special characters ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _ ` { | } ~'
        message: 'Password must contain lowercase letters, uppercase letters, and special characters',
    });

export const emailSchema = z.object({
    email: z.string().email({ message: 'The email must match the format example@example.com' }),
});

export const defaulFieldsSchema = z.object({
    userName: z
        .string()
        .min(6, { message: 'Minimum number of characters 6' })
        .max(30, 'Maximum number of characters 30')
        .regex(/^[0-9A-Za-z_-]+$/, { message: 'Username can only contain 0-9, A-Z, a-z, _, -' }),
    email: z.string().email({ message: 'The email must match the format example@example.com' }),
});

export const loginFieldsSchema = z.object({
    email: z.string().email({ message: 'The email must match the format example@example.com' }),
    password: passwordSchema,
});

export const formRegisterSchema = defaulFieldsSchema
    .merge(
        z.object({
            password: passwordSchema,
            confirm_password: z.string(),
            agreement: z.boolean().refine(value => value, {
                message: 'You must agree to the terms of service and privacy policy',
            }),
        }),
    )
    .refine(data => data.password === data.confirm_password, {
        message: 'The passwords must match',
        path: ['confirm_password'],
    });


export type TDefauldFields = z.infer<typeof defaulFieldsSchema>;
export type TFormRegisterSchema = z.infer<typeof formRegisterSchema>;
export type TLoginFieldsSchema = z.infer<typeof loginFieldsSchema>;
export type TEmailSchema = z.infer<typeof emailSchema>;
