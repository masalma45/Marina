import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserModel } from '../models/user.model.js'


// /api/v1/users/signup
const signup =async(req, res) => {
    try {
        const {username, email, password} = req.body

        if(!username || !email || !password ){
            return res.status(400).json({ok:false, msg: "Faltan campos obligatorios: email, contraseña, nombre"})
        }

    

        const user =await UserModel.findOneByEmail(email)
        if(user) {
            return res.status(409).json({ok: false, msg: "El email ya existe"})
        }


        const salt = await bcryptjs.genSalt(10)
        const hashedpassword = await bcryptjs.hash(password, salt)

        const newUser = await UserModel.create({username, email, password: hashedpassword })

        const token = jwt.sign({email: newUser.email},
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        )

        return res.status(201).json({ok: true, msg: token })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}
// /api/v1/users/login
const login =async(req, res) => {
    try { 
        const {email, password} = req.body

        if(!email || !password){
            return res
            .status(400)
            .json({ error:"Faltan campos obligatorios: email, contraseña"});
        }

        const user = await UserModel.findOneByEmail(email)
        if(!user){
            return res.status(404).json({error:"Usuario no encontrado"})
        }
        const isMatch = await bcryptjs.compare(password, user.password)

        if(!isMatch){
            return res.status(401).json({error: "Credenciales incorrectas"});
        }


        const token = jwt.sign({email: user.email},
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        )

        return res.json({ok: true, msg: token })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}


export const UserController = {
    signup,
    login
}