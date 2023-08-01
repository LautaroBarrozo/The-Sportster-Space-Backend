import {z} from "zod"

export const registerValidationSchema = z.object({
    userName: z.string({
        required_error: 'USER NAME IS REQUIRED'
    }),
    userEmail: z.string({
        required_error: 'EMAIL IS REQUIRED'
    }).email({
        message: "INVALID EMAIL"
    }),
    userPassword: z.string({
        required_error: 'PASSWORD IS REQUIRED'
    }).min(6, {
        message: "PASSWORD MUST BE AT LEAST 6 CHARACTERS"
    })
})

export const loginValidationSchema = z.object({
    userEmail: z.string({
        required_error: 'EMAIL IS REQUIRED'
    }).email({
        message: "INVALID EMAIL"
    }),
    userPassword: z.string({
        required_error: 'PASSWORD IS REQUIRED'
    }).min(6, {
        message: "PASSWORD MUST BE AT LEAST 6 CHARACTERS"
    })
})

export const commentValidationSchema = z.object({
    comment: z.string({
        required_error: 'COMMENT IS REQUIRED'
    })
})