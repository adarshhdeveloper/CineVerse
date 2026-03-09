require('dotenv').config()
const app = require('./src/app')
const connectToDb = require('./src/config/dataBase')


connectToDb()

app.listen(3000,()=>{
    console.log('server is running on post 3000 ')
})