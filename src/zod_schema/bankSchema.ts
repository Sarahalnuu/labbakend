import { z, TypeOf } from 'zod'

export const bankSchema = z.object ({
    body: z.object({
        id: z.string({required_error: "ID is required !"})
        .min(4, 'You id must be more than 3'),

        username: z.string({ required_error: 'username is required !' })
        .min(4, 'username length more than 6'),

        password: z.string().regex(new RegExp("^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#\$%\^&\*])"), 
        "Passwor must contain at least 1 upper case, lower case, numeric, and special character"),

        balance: z.number({required_error: ' balance is required !'}).gte(0)


    }),
});

export type bankSchemaType = TypeOf<typeof bankSchema>['body'];