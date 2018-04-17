const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
    email: String,
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

// Turn the schema you created into a "Model".
// mongoose.model("ModelNameSingular", modelSchema);
// "ModelNameSingular" will automatically be pluralized for you, and that pluralized version of the model name will also become the name of the MongoDB collection.

module.exports = mongoose.model("People", peopleSchema);