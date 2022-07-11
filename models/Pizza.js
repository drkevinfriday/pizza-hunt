const { Schema, model } = require('mongoose')

// pizza schema

const PizzaSchema = new Schema({

    pizzaName: {
        type: String
    }, 

    createdby: {
        type: String
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    size: {
        type: String,

        default: 'Large'
    },

    toppings:[]

});
// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema)


// Export module
module.exports = Pizza;