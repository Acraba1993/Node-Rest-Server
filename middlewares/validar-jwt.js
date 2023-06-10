const { request, response } = require('express')
const jwt = require('jsonwebtoken')

const Cliente = require ('../models/cliente');

const validarJWT = async (req = request, res = response, next ) =>{
    const token = req.header('x-apikey');
    if(!token){
        return res.status(401).json({
            msg:'No hay token en la peticion'
        });
    }
    try{
        const {uid} = jwt.verify (token,process.env.SECRETORPRIVATEKEY)

        const cliente = await Cliente.findById(uid);

        if(!cliente) {
            return res.status(401).json({
                msg:"Usuario no existe"
            })
        }

        if(!cliente.estado){
            return res.status(401).json({
                msg:"Token no Valido"
            })
        }
        
        req.cliente = cliente;

        next();
    }catch(error){
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
    }


}

module.exports = {
    validarJWT
}