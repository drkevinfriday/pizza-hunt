const { Schema, model } = require('mongoose')

// pizza schema

const PizzaSchema = new Schema({

    pizzaNAme: {
        type: string
    }, 

    createdby: {
        type: string
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    size: {
        type: string,

        default: 'Large'
    },

    toppings:[]

});
// create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema)


// Export module
module.exports = Pizza;