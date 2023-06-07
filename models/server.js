const express = require('express');
const cors = require('cors');

const {dbConnection} = require ('../database/config')

class Server{
    constructor(){
        this.app  = express();
        this.port = process.env.PORT
        this.clientePath = '/api/clientes'; 
        this.authPath    = '/api/auth'; 

        // Conectar a base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //cors
        this.app.use( cors())
        
        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio Público
        this.app.use(express.static('public'));
    }
    routes(){
        this.app.use(this.authPath, require('../routers/auth'));
        this.app.use(this.clientePath, require('../routers/clientes'));
    }
    listen(){
        this.app.listen(this.port,() =>{
            console.log('Servidor corriendo en puerto', this.port)
        });
    }
}

module.exports = Server;