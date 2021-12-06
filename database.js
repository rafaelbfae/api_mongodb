const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://univali:univali@cluster0.7wykt.mongodb.net/univali?retryWrites=true&w=majority')
    .then(result => console.log('Connected', result))
    .catch(error => console.error('Connection Error', error))

mongoose.connection.on('open', () => {});

module.exports = mongoose;