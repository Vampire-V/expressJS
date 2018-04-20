const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// create a schema
const peopleSchema = new Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    tell:{
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female"]
    },
    status: {
        type:Boolean,
        default:false
    },
    address: String,
    createdate: {
        type: Date,
        default: Date.now
    }
});


peopleSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);  
  };
  
  peopleSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);  
  };

module.exports = mongoose.model("People", peopleSchema);