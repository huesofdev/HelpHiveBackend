const mongoose = require('mongoose');
const {NODE_ENV, DB_URL} = require('./server.config')
   
   let instance;

class DBConnection {
    #isConnected;

    constructor(){
        if(instance){
            throw new Error('only one connection can exist')
        }
        instance = this;
        this.#isConnected = false;
    }

    async connect(){
        if(this.#isConnected){
            throw new Error("Already Connected");
        }

        if(NODE_ENV === 'development'){
            await mongoose.connect(DB_URL);
            this.#isConnected = true;
            console.log("connected to db successfully")
        }
    }

    async disconnect() {
        if(!this.#isConnected){
            throw new Error('There is no Active Connections')
        }
        
        await mongoose.disconnect();
        console.log('disconnected from db successfully')
    }
}

const db = Object.freeze(new DBConnection());

module.exports = db;