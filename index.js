const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

require('dotenv').config();
//fuck this 
const middlewares = require('./middlewares');
const logs = require('./server/api/logs');
const credentials = require('./server/api/credentials');
const updateDB = require('./server/api/updateDB');
var cookieParser = require('cookie-parser');

const app = express();


mongoose.connect("mongodb+srv://Brewmaster123:primalsplit@wardrobedbsd2.gbx59.mongodb.net/WardrobeDBSD2?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
});

app.use(morgan('common'));
app.use('/uploads',express.static('uploads'));
app.use(helmet());
const corsOptions ={
    origin:'http://localhost:1337', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions
    //origin: process.env.CORS_ORIGIN,
    ));
    app.use(express.json());
    app.use(cookieParser('test'))
    
    app.get('/', (res, req) => {
        res.json({
        message: 'Hello world',
    });
});
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*")
//   }) 
app.use('/api/logs', logs);
app.use('/api/credentials', credentials);
app.use('/api/updateDB', updateDB);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

mongoose.connection.once('open', function() {
    console.log('Connected to the Database.');
});
mongoose.connection.on('error', function(error) {
    console.log('Mongoose Connection Error : ' + error);
});

const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});