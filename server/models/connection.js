const mongoose = require('mongoose');

const connection = mongoose.connect('mongodb://localhost:27017/todoApp', { useUnifiedTopology: true, useNewUrlParser: true }).then(data => {
}).catch(error => {
    console.log(error);
});

if (connection) {
    console.log('Database connected!');
}

else {
    console.log('Database connection error');
}

module.exports = connection;