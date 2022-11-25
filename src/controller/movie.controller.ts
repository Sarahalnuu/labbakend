import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { NextFunction, Request, Response } from "express";
import { prisma } from "../config/db";
import { movieSchemaType } from "../zod_schema/movieSchema";

let movie: movieSchemaType[] = [];

export const getMovieHandller = async(
    req: Request, 
    res: Response, 
    next: NextFunction
    ) => {
        try {
const movies = await prisma.movie.findMany()
    return res.status(200).json(movies);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Server Error !' });
        }
};

export const addMovieHandller = async(
    req: Request, 
    res: Response, 
    next: NextFunction
    ) => {
        try {

       
        const newMovie = req.body as movieSchemaType;
        await prisma.movie.create({
            data: newMovie,
        // movie.push(newMovie);
    });
        return res.status(201).json({ message: ' New Movie Added !' });
    } catch (error) {
        const prismaError = error as PrismaClientKnownRequestError;
        if (prismaError.code == 'P2002') {
          return res.status(400).json({
            message: 'rating have been used before',
          });
    }
    return res.status(500).json({
        message: 'Server Error !',
      });
    }
  };
export const updateMovieHandller = async(
    req: Request, 
    res: Response, 
    next: NextFunction
    ) => {
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
            };

            export const deleteMovieHandller = (
                req: Request, 
                res: Response, 
                next: NextFunction
                ) => {
                    const deletedride = req.body as movieSchemaType;
                    const { id } = req.params;
                    const deletedmovieList = movie.filter((Dmovie:any) => {
                        return Dmovie.id !== id;
                    });
                    movie = deletedmovieList;
                    res.json({
                        message: "Movie Delete",
                    });
                    };

                    export const getBynameMovieHandller = (
                    req: Request, 
                    res: Response, 
                    next: NextFunction
                    ) => {
                        let { name }  = req.params;
                        let searchArr = movie.filter((item)=>{
                            return item.name.toLowerCase().includes(name);
                        })
                        return res.json(searchArr);
                        };
                    
                        export const getByidMovieHandller = (
                            req: Request, 
                            res: Response, 
                            next: NextFunction
                            ) =>{
                        let { genre }  = req.params;
                        let searchArr = movie.filter((item)=>{
                            return item.name.toLowerCase().includes(genre);
                        })
                        return res.json(searchArr);
                        };