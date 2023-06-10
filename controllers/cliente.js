const {request,response} = require('express');
const bcryptjs = require ('bcryptjs');


const Cliente = require ('../models/cliente');

const clienteGet = async (req = request, res = response) => {
    // const {q,nombre = 'No Name',apiKey} = req.query;
    const {limite = 5, desde = 0} = req.query; 
    const query = {estado:true}

    const [total,clientes] = await Promise.all([
        Cliente.countDocuments(query),
        Cliente.find(query)
            .skip ( Number (desde))
            .limit( Number (limite)),
    ]);
    res.json({
        total,
        clientes
    })
}

const clientePut = async (req, res) => {

    const {id} = req.params;
    const {_id, password, google, ...resto} = req.body;

    //validar contraseña
    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }
    
    const cliente = await Cliente.findByIdAndUpdate(id, resto);

    res.json(cliente);
}

const clientePost = async (req, res) => {
    
    const {nombre,apellido,correo,telefono,password,rol} = req.body;
    const cliente = new Cliente({nombre,apellido,correo,telefono,password,rol});

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

const clienteDelete = async (req, res) => {

    const {id} = req.params;

    const cliente = await Cliente.findByIdAndUpdate(id,{estado:false});
    const usuarioAutenticado = req.cliente;

    res.json({cliente, usuarioAutenticado});
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