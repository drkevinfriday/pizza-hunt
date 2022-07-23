

// create varaiable to hold the db connection
 let db;
//  establish a connection to IndexDB database called 'pizza-hut; and set it to verison 1 
const request = indexedDB.open('pizza_hunt',1);

// this event wil; emit if the database verison chagnes (nonexistant to verison1, v1, to v2 etx..)
request.onupgradeeneeded = function (event){
    //  save a reference to the databse;
    const db = event.target.result;
    // create  an object store(table) called `new_pizza` set it to have an austo incrememting primary key
    db.createoObjectStore('new_pizza', { autoIncrement: true });
}

// upon a sucessful
request.onsucess = function(event){
    // when db is sucessfully created with its object  store(from onupgradeneeded event above) or  simply established a connection, save reference to db in global variable
    db = event.target.result;

    // check if app is onlone, if yes run uploadPizza() function to send all local db data to api
    if(navigator.online){
        // we havent created this yet, but we will son, so lets comment it outfor now
        uploadPizza ();

    }
}

request.onerror = function(event){
    //  log error here
    console.log(event.target.errorCode)
}

// this function will be excuted if we attempt to submit a new pizza and there's not internet connection
function saveRecord(record){
    // open a new transaction with the database with read and wrtie premissions
    const transaction = db.transaction(['new-pizza'], 'readwrite');
    
    // access the object store for `new_pizza`

    const pizzaObjectStore = transaction.objectstore('new_pizza')


    //  add record to your store with add method

    pizzaObjectStore.add(record)
}

function uploadPizza() {
    // open a transaction on your db
    const transaction = db.transaction(['new_pizza'], 'readwrite');

    //access your object store

    const pizzaObjectStore = transaction.pizzaObjectStore('new_pizza');

    // get all records from store and set to a variable
    
    const getAll = pizzaObjectStore.getAll()


    // upon a sucessful .getAll() execution, run this function
    getAll.onsucess = function() {

    //  if there was data in indexDB's store, let's send it to the api server
    if(getAll.result.length > 0){
        fetch('api/pizzas', {
            method: 'POST',
            body: JSON.stringify(getAll.result),
            headers: {
                Accpet:' application/json, test/plain, */*',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(serverResponse =>{
            if(serverResponse.message){
                throw new Error(serverResponse);
            }
            //open one more transaction
            const transaction = db.transaction(['new_pizza'], 'readwrite');

            //access your object store
            const pizzaObjectStore = transaction.pizzaObjectStore('new_pizza');

            // clear allitems in yur store
            pizzaObjectStore.clear()

            alert('All saved pizza has been submitted!');
        })
        .catch(err => {
            console.log(err);
        });
    }
    };
}

//  listen for app coming back online

window.addEventListener('online', uploadPizza)