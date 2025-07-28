
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { CreateAccessToken } from '../libs/jwt.js';

export const register = async (req, res) => {
    const { email, username, password } = req.body;
    try {

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            username,
            password: passwordHash,
        });

        const userSaved = await newUser.save();
        const token = await CreateAccessToken({ id: userSaved._id });

        res.cookie('token', token);
        res.json({
             id: userSaved._id,
             email: userSaved.email,
             username: userSaved.username
        });

    }catch (error) {
        res.status(500).json({
            message: 'Error registering user',
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        const userFund = await User.findOne({ email });

        if (!userFund) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const isMatch = await bcrypt.compare(password, userFund.password); // Compare the password with the user on the database

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const token = await CreateAccessToken({ id: userFund._id });

        // TODO: encapsular esta funcion "actualizar estado" en un lugar mas adecuado
        userFund.estado = true;
        const updated = await userFund.save();
        if (!updated) {
            return res.status(500).json({
                message: 'Error updating user status'
            });
        }
        res.cookie('token', token);
        res.json({
             id: userFund._id,
             email: userFund.email,
             username: userFund.username,
             subUsuarios: userFund.subUsuarios
             
        });

    }catch (error) {
        res.status(500).json({
            message: 'Error registering user',
            error: error.message
        });
    }
};

