const {Router} = require ('express');
const {check} = require ('express-validator');

const { validarCampos } = require('../middlewares/validarCampos');
const { esRoleValido, emailExiste, existeClientePorId } = require('../helpers/db-validators');

const { 
    clienteGet, 
    clientePut, 
    clientePost, 
    clienteDelete, 
    clientePatch 
} = require('../controllers/cliente');

const router = Router();

router.get('/', clienteGet ); 

router.put('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeClientePorId),
    check('rol').custom(esRoleValido),
    validarCampos
],clientePut);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('apellido','El apellido es obligatorio').not().isEmpty(),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    check('telefono','El telefono no es valido').isLength(10),
    check('password','la contraseña debe tener mas de 6 caracteres').isLength({min:6}),
    check('rol').custom(esRoleValido),
    validarCampos
], clientePost);

router.delete('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeClientePorId),
    validarCampos
], clienteDelete);

router.patch('/', clientePatch);






module.exports = router;