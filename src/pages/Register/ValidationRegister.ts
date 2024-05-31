import { z } from "zod"

export const ValidationRegister = z.object({
    name: z.string().nonempty("Nome é obrigatorio"),
    email: z
        .string()
        .nonempty("email é obrigatorio")
        .email("Forneça um email valido"),
    password: z
        .string()
        .nonempty("É obrigatorio")
        .min(8, "E necessario pelo menos 8 digitos")
        .regex(/(?=.*?[A-Z])/, "É necessário pelo menos uma letra maiúscula")
        .regex(/(?=.*?[a-z])/, "É necessário pelo menos uma letra minúscula")
        .regex(/(?=.*?[0-9])/, "É necessário pelo menos um número.")
        .regex(/(?=.*?[#?!@$%^*&-])/, "É necessário pelo menos um caracter especial [*?[#?!@$%^*&-]."),
        password_confirmation: z.string().nonempty("É obrigatorio"),

}).refine(({password, password_confirmation}) => password === password_confirmation,{
    message: "As senhas devem ser identicas",
    path: ["password_confirmation"],
})