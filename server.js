require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

// Handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1)
})

const app = express()
app.use(express.json({limit: '8000mb'}))
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true,
    limits: { fileSize: 50 * 1024 * 1024 }
}))


app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/petRouter'))
app.use('/api', require('./routes/productRouter'))
app.use('/api', require('./routes/statusRouter'))
app.use('/api', require('./routes/typePetRouter'))
app.use('/api', require('./routes/postRouter'))
app.use('/api', require('./routes/topicRouter'))
app.use('/api', require('./routes/paymentRouter'))
app.use('/api', require('./routes/typePageRouter'))

//Middleware to handle errors
app.use(require('./middleware/errors'))

//socketio
const http = require('http').createServer(app)
const io = require('socket.io')(http)

io.on('connection', socket =>{
    console.log(socket.id + 'connected.')

    socket.on('disconnect', () =>{
        console.log(socket.id + 'connected.')
    })
})



//connect mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log("Connected to mongodb")
})

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

//

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})

// Handle Unhandled Promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1)
    })
})