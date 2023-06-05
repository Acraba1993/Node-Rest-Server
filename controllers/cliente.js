const {request,response} = require('express');
const bcryptjs = require ('bcryptjs');


const Cliente = require ('../models/cliente');

const clienteGet = (req = request, res = response) => {
    const {q,nombre = 'No Name',apiKey} = req.query;
    res.json({
        msg:'get API - controlador',
        q,
        nombre,
        apiKey
    })
}

const clientePut = (req, res) => {

    const {id} = req.params;

    res.json({
        msg:'put API',
        id
    })
}

const clientePost = async (req, res) => {
    
    const {nombre,apellido,correo,telefono,password,rol} = req.body;
    const cliente = new Cliente({nombre,apellido,correo,telefono,password,rol});

    //Verificar si el correo existe 
    const existeEmail = await Cliente.findOne({correo});
    if (existeEmail){
        return res.status(400).json({
            msg:"El correo ya existe"
        });
    }
    
    //Verificar si el telefono existe 
    const existeTelefono = await Cliente.findOne({telefono});
    if (existeTelefono){
        return res.status(400).json({
            msg:"El telefono ya existe"
        });
    }

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    cliente.password = bcryptjs.hashSync(password,salt);

    //Guardar en BD
    await cliente.save();

    res.status(201).json({
        cliente
    })
}

const clienteDelete = (req, res) => {
    res.json({
        msg:'delete API'
    })
}

const clientePatch = (req, res) => {
    res.json({
        msg:'patch API'
    })
}

module.exports = {
    clienteGet,
    clientePut,
    clientePost,
    clienteDelete,
    clientePatch    
}