import User from "../models/usuario.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from "../utils/erros.js";

export const cadastro = async(req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });
    try {
        await newUser.save();
        res.status(201).json('Usuario criado com sucesso!');
    } catch (error) {
        next(errorHandler(500, 'Erro ao criar o usuário'));
    }

};
export const signin = async(req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Invalid Password or email"));
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = validUser._doc;
        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
};
export const google = async(req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = user._doc;
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: req.body.hashedPassword,
                avatar: req.body.photo
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = newUser._doc;
            res
                .cookie('access_token', token, { httpOnly: true })
                .status(200)
                .json(rest);
        }
    } catch (error) {
        next(error)
    }
}

export const forgotPassword = async(req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.json({ message: "User not found" })
        }
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'webdesign.aejl@gmail.com',
                pass: 'gzgrzmtfjodkqxht'
            }
        });

        var mailOptions = {
            from: 'webdesign.aejl@gmail.com',
            to: email,
            subject: 'Reset password',
            text: `/api/resetPassWord/${token}`
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                return res.json({ message: "Error sending email" })
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (error) {
        next(error)
    }
}