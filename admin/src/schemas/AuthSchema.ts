import { z } from "zod";
import type { IFormField } from "../types/IFormField.types";

export const AuthSchema = z.object({
    phone: z.string(),
    password: z.string().min(6, 'Password must contain at least 6 characters')
});

export const AuthMeta:Record<string, IFormField> = {

    phone: {
        type: 'tel',
        placeholder: "+38 (0__) ___-__-__",
        label: 'Phone:'
    },
    
    password: {
        type: 'password',
        placeholder: "Enter password",
        label: "Password:"
    }
}

export type AuthFormData = z.infer<typeof AuthSchema>;