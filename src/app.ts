import express from 'express'
import MovieRouter from './routes/movieRout'
import StudentRouter from './routes/studentRout'
import BankRouter from './routes/bankRout'

const app = express();

app.use(express.json());

app.use('/movie', MovieRouter)
app.use('/student', StudentRouter)
app.use('/bank', BankRouter)

app.listen(5000);