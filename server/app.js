require('dotenv').config();
const express = require('express');
const connection = require('./models/connection');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/todo');

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/todoapp', routes);

app.get('/', (req, res) => {
  
    res.end('Hello World!');
})

app.get('/*', (req, res) => {
    res.status(404).end('404 Not Found');
})

if (connection) {
    app.listen(process.env.SERVER_PORT, () => {
        console.log('Server is running...');
    })
}
else {
    app.get('/', (req, res) => {
        res.status(500).end('Internal server error');
    })
}