const { Schema, model, default: mongoose } = require('mongoose');

const contactSchema = new Schema({
  username: { type: String, require: true },
  email: { type: String, require: true },
  message: { type: String, require: true },
});

//create a collections
const Contact = new model('Contact', contactSchema);
module.exports = Contact;
