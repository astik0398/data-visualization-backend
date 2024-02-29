const express = require('express')
const {connection} = require('./db')
const app = express()
const fs = require('fs')
const {dataModel} = require('./models/data.modal')
const cors = require('cors')

const allData = JSON.parse(fs.readFileSync('./data.json', 'utf-8'))
app.use(cors())

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

app.listen(9090, async()=> {
    try {
        await connection
        console.log('connected to the db');
        console.log('server running on port 9090');
    } catch (error) {
        console.log(error);
    }
})