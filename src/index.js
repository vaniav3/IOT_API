const express = require('express')
const logger = require('morgan')
const adminRoutes = require('./routes/admin.routes.js')
const companyRoutes = require('./routes/company.routes.js')
const locationRoutes = require('./routes/location.routes.js')
const sensorRoutes = require('./routes/sensor.routes.js')
const apiRoutes = require('./routes/api.routes.js')
const dataRoutes = require('./routes/data.routes.js')

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