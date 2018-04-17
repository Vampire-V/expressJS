const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        part1: String,
        part2: String,
        part3: String,
        type: Object,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    dateadd: {
        type: Date,
        default: Date.now
    },
    proType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

// Turn the schema you created into a "Model".
// mongoose.model("ModelNameSingular", modelSchema);
// "ModelNameSingular" will automatically be pluralized for you, and that pluralized version of the model name will also become the name of the MongoDB collection.

module.exports = mongoose.model("Product", productSchema);