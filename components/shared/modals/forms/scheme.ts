import z from "zod/v3";

const passwordSchema = z.string().min(6, { message: 'Введите коректный пороль' })

export const loginSchema = z.object({
    email: z.string().email({ message: 'Введите коректный почтовый адрес' }),
    password: passwordSchema
})

export const registerSchema = loginSchema.merge(z.object({
    fullName: z.string().min(2, { message: 'Введите имя и фамилию' }),
    confirmPassword: passwordSchema
})).refine((data) => data.password === data.confirmPassword, {
    message: 'Пороли не совподают',
    path: ['confirmPassword']
})

export type TLoginSchema = z.infer<typeof loginSchema>
export type TRegisterSchema = z.infer<typeof registerSchema>
