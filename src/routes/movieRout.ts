import express from 'express';
import { addMovieHandller, deleteMovieHandller, 
    getByidMovieHandller, getBynameMovieHandller,
    getMovieHandller, updateMovieHandller } from '../controller/movie.controller';
import validate from '../middleware/validate';
import {movieSchema,movieSchemaType,} from '../zod_schema/movieSchema';

const router = express.Router();


router.get('/', getMovieHandller);

router.post('/', validate(movieSchema), addMovieHandller);

router.put('/:id', validate(movieSchema), updateMovieHandller);

    router.delete(`/:id`,validate(movieSchema),deleteMovieHandller);

    router.get('/:name', getBynameMovieHandller);

    router.get('/:genre', getByidMovieHandller);

export default router;