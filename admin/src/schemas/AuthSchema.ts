import { z } from "zod";
import type { IFormField } from "../types/IFormField.types";

export const AuthSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'Password must contain at least 6 characters')
});

export const AuthMeta:Record<string, IFormField> = {

    email: {
        type: 'email',
        placeholder: "Enter your e-mail",
        label: 'E-mail:'
    },
    
    password: {
        type: 'password',
        placeholder: "Enter password",
        label: "Password"
    }
}

export type AuthFormData = z.infer<typeof AuthSchema>;