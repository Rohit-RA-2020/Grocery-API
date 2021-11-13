const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
const port = process.env.port || 3000;

let groceryList = [
    {
        "productid": 1,
        "grocery-name": "carrot",
        "price": "20/kg",
        "quantity": 100
    },
    {
        "productid": 1,
        "grocery-name": "apple",
        "price": "100/kg",
        "quantity": 200
    }
];

let myCart = [];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json('Welcome to the Grocery Store');
});

app.get('/grocery', (req, res) => {
    res.json(groceryList);
})

app.get('/mycart', (req, res) => {
    if(myCart.length == 0)
    {
        res.send('Cart is Empty');
    } else {
        res.json(myCart);
    }   
})

app.get('/grocery/:name', (req, res) => {
    const groceryName = req.params.name;
    console.log(groceryName);

    for(let grocery of groceryList) {
        if(grocery['grocery-name'] == groceryName) {
            res.json(grocery);
            console.log(grocery);
            return;
        }
    }
    return res.json('Item not present in the list')

});

app.post('/grocery/addtocart/:name', (req, res) => {
    const groceryName = req.params.name;
    const newGrocery = req.body;

    for(let grocery of groceryList) {
        if(grocery['grocery-name'] == groceryName) {
            myCart.push(newGrocery);
            return res.send(myCart);
        }
    }

    return res.json('Item not in the list');
})

app.listen(port, () => console.log(`Grocery app listening on port ${port}!`));