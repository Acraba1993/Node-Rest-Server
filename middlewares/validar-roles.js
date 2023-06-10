const { response, request } = require("express");

const esAdminRole = (req = request, res = response, next) =>{
    
    if(!req.cliente){
        return res.status(500).json({
            msg: 'verificacion sin token'
        })
    }

    const {rol, nombre} = req.cliente;
    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${nombre} no es administrador `
        })
    }

    next ();
}

const tieneRole = (...roles) =>{
    return (req, res, next) =>{
        if(!req.cliente){
            return res.status(500).json({
                msg : 'Se requiere validar el Token'
            });
        }
        if(!roles.includes(req.cliente.rol)){
            return res.status(401).json({
                msg:`El servicio requiere unos de estos roles: ${roles}`
            })
        }
        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole

}
