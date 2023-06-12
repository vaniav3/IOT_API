import express from 'express'
import logger from 'morgan'
import adminRoutes from './routes/admin.routes.js'
import companyRoutes from './routes/company.routes.js'
import locationRoutes from './routes/location.routes.js'
import sensorRoutes from './routes/sensor.routes.js'
import apiRoutes from './routes/api.routes.js'
import dataRoutes from './routes/data.routes.js'

const app = express()
app.use(logger('dev'));
app.use(express.json());

app.listen(4000, () => {
    console.log('Escuchando en el puerto 4000!')
})

app.use('/admin', adminRoutes)
app.use('/company', companyRoutes)
app.use('/location', locationRoutes)
app.use('/sensor', sensorRoutes)
app.use('/api/v1/', apiRoutes)
app.use('/data', dataRoutes)