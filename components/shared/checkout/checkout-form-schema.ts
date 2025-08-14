import z from "zod/v3";

export const CheckoutSchema = z.object({
    firstName: z.string().min(2, {message: 'Имя должно содержать не менее 2-х символов'}),
    lastName: z.string().min(2, {message: 'Фамилия должна содержать не менее 2-х символов'}),
    email: z.string().email({message:'Введите коректную почту'}),
    phone: z.string().min(10, {message: 'Введите коректный номер телефона'}),
    address: z.string().min(5, {message: 'Введите коректный адресс'}),
    comment: z.string().optional()
})

export type CheckoutFormTypes = z.infer<typeof CheckoutSchema>