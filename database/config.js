const mongoose = require ('mongoose')


const dbConnection = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_ATLAS);
        console.log('Base de datos en linea');

    }catch (error){
        console.log(error);
        throw new Error ('ERROR: no se logro iniciar la conexion a DB.')
    }
}

module.exports = {
    dbConnection
}