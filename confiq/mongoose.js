const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contact_list_db');  //connect db
const db = mongoose.connection;  //acquire the connection

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Success db');
});