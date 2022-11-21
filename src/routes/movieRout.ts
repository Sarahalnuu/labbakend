import express from 'express';
import validate from '../middleware/validate';
import {movieSchema,movieSchemaType,} from '../zod_schema/movieSchema';

const router = express.Router();

    let movie: movieSchemaType[] = [];

router.get('/', (req, res, next) => {
    return res.json(movie);
});

router.post('/', validate(movieSchema), (req, res, next) => {
    const newmovie= req.body as movieSchemaType;

    movie.push(newmovie);
    return res.status(201).json({ message: 'Movie Added !' });
});



router.put('/:id', validate(movieSchema), (req, res, next) => {
    const updatedMovie = req.body as movieSchemaType;
    const { id } = req.params;
    const updatedList = movie.filter((mov) => {
        return mov.id !== id;
    });
    updatedList.push(updatedMovie);
    movie = updatedList;

            return res.json({
                message: 'Movie  information is Updated !'
            })
});
    router.delete(`/:id`,validate(movieSchema), (req, res) => {
    const deletedride = req.body as movieSchemaType;
    const { id } = req.params;
    const deletedmovieList = movie.filter((Dmovie:any) => {
        return Dmovie.id !== id;
    });
    movie = deletedmovieList;
    res.json({
        message: "Movie Delete",
    });
    });

    router.get('/:name', (req, res) => {
    let { name }  = req.params;
    let searchArr = movie.filter((item)=>{
        return item.name.toLowerCase().includes(name);
    })
    return res.json(searchArr);
    });

    router.get('/:genre', (req, res) => {
    let { genre }  = req.params;
    let searchArr = movie.filter((item)=>{
        return item.name.toLowerCase().includes(genre);
    })
    return res.json(searchArr);
    });

export default router;