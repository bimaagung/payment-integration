require('dotenv').config()

const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const core = require('./midtrans/config');

const port = process.env.PORT
const host = process.env.HOST

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/payment_bank_transfer', async (req, res) => {
    
    const {  amount, order_id, bank_transfer } = req.body

    try {
        const charge = await core.charge({
            "payment_type": "bank_transfer",
            "transaction_details": {
                "gross_amount": amount,
                "order_id": order_id,
            },
            "bank_transfer":{
                "bank": bank_transfer
            }
        })   

        res.json({
            status: 'ok',
            message: 'success',
            data: charge
        })

    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: 'fail',
            message: error.message  
        })
    }
     
})

app.get('/transaction_status/:transaction_id', async (req, res) => {
    
    const transactionId = req.params['transaction_id']

    try {
        
        const status = await core.transaction.status(transactionId)

        let orderId = status.order_id;
        let transactionStatus = status.transaction_status;

        res.json({
            status: 'ok',
            message: 'success',
            data: {
                order_id: orderId,
                transaction_status: transactionStatus
            }
        })

    } catch (error) {
        console.log(error.message)
        res.status(400).json({
            status: 'fail',
            message: error.message  
        })
    }
     
})



app.listen(port, host, () => {
    console.log(`listening on server http://${host}:${port}`);
})