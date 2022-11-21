import express from 'express';
import validate from '../middleware/validate';
import {bankSchema, bankSchemaType} from '../zod_schema/bankSchema';

const router = express.Router();

    let bank: bankSchemaType[] = [];

router.get('/', (req, res, next) => {
    return res.json(bank);
});

router.post('/', validate(bankSchema), (req, res, next) => {
    const newbank= req.body as bankSchemaType;

    bank.push(newbank);
    return res.status(201).json({ message: ' Added new customers !' });
});



router.put('/:id', validate(bankSchema), (req, res, next) => {
    const updatedcustomer = req.body as bankSchemaType;
    const { id } = req.params;
    const updatedList = bank.filter((bank) => {
        return bank.id !== id;
    });
    updatedList.push(updatedcustomer);
    bank = updatedList;

            return res.json({
                message: 'customer information is Updated !'
            })
});
    router.delete(`/:id`,validate(bankSchema), (req, res) => {
    const deletedride = req.body as bankSchemaType;
    const { id } = req.params;
    const deletedcustomer = bank.filter((Dcust:any) => {
        return Dcust.id !== id;
    });
    bank = deletedcustomer;
    res.json({
        message: " delete customer ! ",
    });
    });

    export default router;