import express, { application } from 'express'
import logger from 'morgan'
import { connectToDatabase } from './init-mongo.js';
import { createAdmin, createCompany, createLocation, createSensor, DatosSensor } from './consultas.js';

const app = express()
app.use(logger('dev'));
app.use(express.json());

connectToDatabase();

app.listen(4000, () => {
    console.log('Escuchando en el puerto 4000!')
})

app.post('/create-admin', (req, res) => {
    const { username, password } = req.body;
    try {
        createAdmin(username, password);
        res.send('Administrador creado exitosamente.');
    }
    catch (error) {
        res.status(500).send('Error al crear el administrador.');
    }
})

app.get('/admin', async (req, res) => {
    const connection = await connectToDatabase();
    const admins = await connection.collection('Admin').find().toArray();
    res.send(admins);
})