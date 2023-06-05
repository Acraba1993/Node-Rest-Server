const {Router} = require ('express');
const {check} = require ('express-validator')
const Role = require ('../models/role')
const { 
    clienteGet, 
    clientePut, 
    clientePost, 
    clienteDelete, 
    clientePatch 
} = require('../controllers/cliente');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();

router.get('/', clienteGet );

router.put('/:id', clientePut);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('apellido','El apellido es obligatorio').not().isEmpty(),
    check('correo','El correo no es valido').isEmail(),
    check('telefono','El telefono no es valido').isLength(10),
    check('password','la contraseña debe tener mas de 6 caracteres').isLength({min:6}),
    check('rol').custom( async (rol = '') => {
        const existeRol = await Role.findOne({rol});
        if(!existeRol){
            throw new Error(`El Rol ${rol} no esta registrado en la BD`);
        }
    }),
    validarCampos
], clientePost);

router.delete('/', clienteDelete);

router.patch('/', clientePatch);






module.exports = router;