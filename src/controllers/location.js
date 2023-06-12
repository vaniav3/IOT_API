import { connectToDatabase } from './init-mongo.js';

const connection = await connectToDatabase();

export const getLocations = async (req, res) => {
    try {
        const locations = await connection.models.Location.find();
        res.json(locations);
    } catch (error) {
        console.error('Error al obtener los lugares:', error);
        res.status(500).json({ error: error.message });
    }
}

export const getLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const location = await connection.models.Location.findById(id);
        res.json(location);
    } catch (error) {
        console.error('Error al obtener el lugar:', error);
        res.status(500).json({ error: error.message });
    }
}

export const editLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, country, city, meta } = req.body;
        const location = await connection.models.Location.findById(id);
        if (!location) {
            res.status(404).json({ error: 'El lugar no existe.' });
            return;
        }
        location.name = name;
        location.country = country;
        location.city = city;
        location.meta = meta;
        await location.save();
        res.json(location);
    }
    catch (error) {
        console.error('Error al editar el lugar:', error);
        res.status(500).json({ error: error.message });
    }
}

export const deleteLocation = async (req, res) => {
    try {
        const { id } = req.params;
        const location = await connection.models.Location.findById(id);
        if (!location) {
            res.status(404).json({ error: 'El lugar no existe.' });
            return;
        }
        await location.remove();
        res.json({ message: 'Lugar eliminado exitosamente.' });
    } catch (error) {
        console.error('Error al eliminar el lugar:', error);
        res.status(500).json({ error: error.message });
    }
}