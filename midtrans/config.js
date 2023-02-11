require('dotenv').config()

const midtransClient = require('midtrans-client');

let coreApi = new midtransClient.CoreApi({
        isProduction : false,
        serverKey : process.env.SERVER_KEY,
        clientKey : process.env.CLIENT_KEY
    });

module.exports = coreApi;