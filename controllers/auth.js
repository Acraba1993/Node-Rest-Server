const { request, response } = require("express");
const Cliente = require ('../models/cliente');
const bcryptjs = require ('bcryptjs');
const {generarJWT} = require("../helpers/generarJWT");

const login = async ( req = request,res = response) =>{
    
    const { correo, password} = req.body; 

    try{
        //verificar si el correo existe
        const cliente = await Cliente.findOne({correo});

        if (!cliente){
            return res.status (400).json({
                msg:'Correo no registrado'
            });
        }

        //si el usuario esta activo
        if (!cliente.estado){
            return res.status(400).json({
                msg:'Correo no registrado'
            });
        }

        //verificar la contraseña
        const validaPassword = bcryptjs.compareSync(password, cliente.password);
        if (!validaPassword){
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            });
        }
        
        //Generar el JWT
        const token = await generarJWT(cliente.id)

        res.json({
            cliente,
            token,
        });

    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg:'Hable con el administrador'
        })
    }
}

module.exports = {
    login
}