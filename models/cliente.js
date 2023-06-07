const {Schema, model} = require ('mongoose');

const ClienteSchema = Schema({
    nombre: {
        type: String,
        require: [true,'El nombre es obligatorio']
    },
    apellido: {
        type: String,
        require: [true,'El apellido es obligatorio']
    },
    correo: {
        type: String,
        require: [true,'El correo es obligatorio'],
        unique: true
    },
    telefono: {
        type: String,
        require: [true,'El telefono es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        require: [true,'La contraseña es obligatoria'],
    },
    img: {
        type: String,
        default:''
    },
    rol: {
        type: String,
        require: true,
        emun:['ADMIN_ROLE','USER_ROLE']    
    },
    estado: {
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    },
});

ClienteSchema.methods.toJSON = function () {
    const {__v, password,_id, ...cliente} = this.toObject ();
    cliente.uid = _id;
    return cliente;
}

module.exports = model('Cliente',ClienteSchema);