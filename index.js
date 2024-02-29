const express = require('express')
const {connection} = require('./db')
const app = express()
const fs = require('fs')
const {dataModel} = require('./models/data.modal')
const cors = require('cors')
require('dotenv').config()
app.use(cors())
app.use(express.json())

const allData = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))

async function storeData(){
    try {
        const count = await dataModel.countDocuments();
        if(count==0){
            await dataModel.insertMany(allData)
        console.log('data has been inserted');
        }
        else{
            console.log('data has already been added');
        }
    } catch (error) {
        console.log(error);
    }
}
storeData()

app.get('/datas', async(req, res)=> {
    try {
        const allData = await dataModel.find()
        res.send(JSON.stringify(allData))
        console.log('data fetched successfuly');
    } catch (error) {
        res.send({"err": error})
    }
})

app.listen(process.env.PORT, async()=> {
    try {
        await connection
        console.log('connected to the db');
        console.log(`server running on port ${process.env.PORT}`);
    } catch (error) {
        console.log(error);
    }
})