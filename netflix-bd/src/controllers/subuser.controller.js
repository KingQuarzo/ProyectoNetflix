import SubUser from '../models/subuser.model.js';
import User from '../models/user.model.js';

export const getSubUsers = async (req, res) => {
    try {
        const subUsers = await SubUser.find({ fatherId: req.user.id });
        res.status(200).json(subUsers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subusers', error });
    }
};

export const createSubUser = async (req, res) => {
    const { username, ubicacion } = req.body;
    const fatherId = req.user.id; // Captura el id del usuario de sesión

    // Validación de campos obligatorios
    if (!username || username.trim() === '' || !ubicacion || ubicacion.trim() === '') {
        return res.status(400).json({ message: 'Username and ubicacion are required and cannot be empty.' });
    }

    try {
        // Buscar el usuario padre y agregar el subusuario
        const fatherUser = await User.findById(fatherId);
        if (!fatherUser) {
            return res.status(404).json({ message: 'Father user not found' });
        }
        const newSubUser = new SubUser({
            fatherId,
            username,
            ubicacion
        });
        const savedSubUser = await newSubUser.save();

        fatherUser.subUsuarios.push(savedSubUser._id);
        await fatherUser.save();
        res.status(201).json(savedSubUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating subuser', error });
    }
};

export const getSubUser = async (req, res) => {
    try {
        const subUser = await SubUser.findById(req.params.id);
        if (!subUser) return res.status(404).json({ message: 'Subuser not found' });
        res.status(200).json(subUser);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching subuser', error });
    }
};

export const deleteSubUser = async (req, res) => {
    try {

        const subUser = await SubUser.findByIdAndDelete(req.params.id);
        if (!subUser) return res.status(404).json({ message: 'Subuser not found' });

        // Eliminar el subuser del array subUsuarios del padre
        const fatherUser = await User.findById(subUser.fatherId);
        if (fatherUser) {
            fatherUser.subUsuarios = fatherUser.subUsuarios.filter(
                id => id.toString() !== subUser._id.toString()
            );
            await fatherUser.save();
        }

        res.status(200).json(subUser);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting subuser', error });
    }
};

export const updateSubUser = async (req, res) => {
    try {
        const { username, ubicacion } = req.body;
        
        // Validación de campos obligatorios
        if (!username || username.trim() === '' || !ubicacion || ubicacion.trim() === '') {
            return res.status(400).json({ message: 'Username and ubicacion are required and cannot be empty.' });
        }
        const subUser = await SubUser.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!subUser) return res.status(404).json({ message: 'Subuser not found' });
        res.status(200).json(subUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating subuser', error });
    }
};