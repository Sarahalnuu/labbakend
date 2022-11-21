import express from 'express';
import validate from '../middleware/validate';
import {studentSchema, studentSchemaType} from '../zod_schema/studentSchema';

const router = express.Router();

    let student: studentSchemaType[] = [];

router.get('/', (req, res, next) => {
    return res.json(student);
});

router.post('/', validate(studentSchema), (req, res, next) => {
    const newstd= req.body as studentSchemaType;

    student.push(newstd);
    return res.status(201).json({ message: 'Movie Added !' });
});



router.put('/:id', validate(studentSchema), (req, res, next) => {
    const updatedstd = req.body as studentSchemaType;
    const { id } = req.params;
    const updatedList = student.filter((std) => {
        return std.id !== id;
    });
    updatedList.push(updatedstd);
    student = updatedList;

            return res.json({
                message: 'student information is Updated !'
            })
});
    router.delete(`/:id`,validate(studentSchema), (req, res) => {
    const deletedride = req.body as studentSchemaType;
    const { id } = req.params;
    const deletedmovieList = student.filter((Dstd:any) => {
        return Dstd.id !== id;
    });
    student = deletedmovieList;
    res.json({
        message: "std Delete",
    });
    });

    router.get('/:name', (req, res) => {
    let { name }  = req.params;
    let searchArr = student.filter((item)=>{
        return item.name.toLowerCase().includes(name);
    })
    return res.json(searchArr);
    });

    router.get('/:major', (req, res) => {
    let { major }  = req.params;
    let searchArr = student.filter((item)=>{
        return item.name.toLowerCase().includes(major);
    })
    return res.json(searchArr);
    });

export default router;