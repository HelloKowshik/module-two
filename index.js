const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4141;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const uri = "mongodb+srv://mongoAdminOne:admin123@cluster0.e0fhg.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})




client.connect(err => {
    const productCollection = client.db("organicdb").collection("products");
    app.post('/addProduct', (req, res) => {
        const product = req.body;
        console.log(product);
        productCollection.insertOne(product)
            .then(result => {
                // console.log('Insert Success!');
                // res.send('Insert Success!');
                res.redirect('/');
        })
    })
    app.get('/products', (req, res) => {
        productCollection.find({})
            .toArray((err, document) => {
                res.send(document);
        })
    })

    app.delete('/delete/:id', (req, res) => {
        productCollection.deleteOne({ _id: ObjectId(req.params.id) })
            .then(result => {
                // console.log(result);
                res.send(result.deletedCount > 0);
        })
    })

    app.get('/product/:id', (req, res) => {
        productCollection.find({ _id: ObjectId(req.params.id) })
            .toArray((err, documents) => {
                res.send(documents[0]);
            })
    })

    app.patch('/update/:id', (req, res) => {
        productCollection.updateOne({ _id: ObjectId(req.params.id) }, {
            $set: {price: req.body.price, quantity: req.body.quantity}
        })
            .then(result => {
                // console.log(result);
                res.send(result.modifiedCount > 0);
        })
    })

    console.log('Connection Successful');
    // client.close();
});


app.listen(PORT, () => {
    console.log(`SERVER is running on ${PORT}`);
})
