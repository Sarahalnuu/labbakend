import { z, TypeOf } from 'zod'

export const studentSchema = z.object ({
    body: z.object({
        id: z.string({required_error: "ID is required !"})
        .min(4, 'You id must be more than 3'),

        name: z.string({ required_error: 'name is required !' })
        .min(4, 'You name must be more than 3 char'),

        major: z
        .enum(['IT', 'IS', 'CS', 'SWE'], 
        { required_error: 'major is required !' }),

        level: z.number({required_error: ' level is required !'}).gte(1).lte(8),

        gpa: z.number({required_error: ' gpa is required !'}).gte(0).lte(5),

    }),
});

export type studentSchemaType = TypeOf<typeof studentSchema>['body'];