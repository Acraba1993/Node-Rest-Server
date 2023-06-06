const Role = require ('../models/role')
const Cliente = require ('../models/cliente')

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El Rol ${rol} no esta registrado en la BD`);
    }
}

const emailExiste = async (correo ='') =>{
    const existeEmail = await Cliente.findOne({correo});
    if (existeEmail){
        throw new Error (`El correo ${correo} ya existe en DB`)
    }

}
const existeClientePorId = async (id) =>{
    const existecliente = await Cliente.findById(id);
    if (!existecliente){
        throw new Error (`El usuario con ID: ${id} no existe en DB`)
    }

}

module.exports ={
    esRoleValido,
    emailExiste,
    existeClientePorId
}