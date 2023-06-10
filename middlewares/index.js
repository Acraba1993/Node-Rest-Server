
const { validarCampos } = require('../middlewares/validarCampos');
const {validarJWT} = require('../middlewares/validar-jwt');
const {esAdminRole, tieneRole} = require('../middlewares/validar-roles');

module.exports = {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
}