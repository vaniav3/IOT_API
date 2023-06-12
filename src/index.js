import express from 'express'
import logger from 'morgan'
import locationRouter from './routes/location.routes.js'

const app = express()
app.use(logger('dev'));
app.use(express.json());

app.listen(4000, () => {
    console.log('Escuchando en el puerto 4000!')
})

app.use('location/', locationRouter)