// import models
const { Pizza } = require('../models');

const pizzaController = {
    // the functions will go in here as methods

// **** Pizza Methods ****
    // get all pizzas

    getAllPizzas(req, res) {
        Pizza.find({})
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    
    // get one pizza by id 

    getPizzaById({ params }, res) {
        Pizza.findOne({_id: params.id})
            .then(dbPizzaData => {
                // If no pizza is found , send a 404
                if(!dbPizzaData){
                    res.status(404).json({message: 'No pizza with this id!' });
                    return;
                }
                // Runs if dbPizzaData exist
                res.json(dbPizzaData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // create pizza method
    createPizza({body},res) {
        Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
    },

    // updating a pizza by id 
    updatePizzaById({ params , body}, res) {
        Pizza.findOneAndUpdate({_id: params.id})
            .then(dbPizzaData => {
                // If no pizza is found , send a 404
                if(!dbPizzaData) {
                    res.status(404).json({message: 'No pizza with this id!' });
                    return;
                }
                // Runs if dbPizzaData exist
                res.json(dbPizzaData)
            })
            .catch(err => res.status(400).json(err));
    },

    // delete a pizza by id 
    deletePizzaById({ params , body}, res) {
        Pizza.findOneAndDelete({_id: params.id})
            .then(dbPizzaData => {
                // If no pizza is found , send a 404
                if(!dbPizzaData) {
                    res.status(404).json({message: 'No pizza with this id!' });
                    return;
                }
                // Runs if dbPizzaData exist
                res.json(dbPizzaData)
            })
            .catch(err => res.status(400).json(err));
    }

};

module.exports = pizzaController;