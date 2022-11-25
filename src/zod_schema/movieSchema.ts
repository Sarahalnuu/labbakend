import { z, TypeOf } from 'zod'

export const movieSchema = z.object ({
    body: z.object({
        id: z.string({required_error: "ID is required !"})
        .min(4, 'You id must be more than 3'),
        name: z.string({ required_error: 'name is required !' })
        .min(3, 'You name must be more than 2 char'),
        genre: z
        .enum(['Drama', 'Action', 'Comedy'], 
        { required_error: 'genre of movie is required !' }),
        rating: z.number({required_error: ' rating is required !'}).gte(1).lte(5),
        duration: z.number({required_error: ' duration is required !'}).min(60),

    }),
});
export type movieSchemaType = TypeOf<typeof movieSchema>['body'];