const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const port = 1011;

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const apiController = require('./controller/apiController');
// app.get('/', (req, res));
app.get('/api/test', apiController.testApi);
app.get('/api', apiController.handleCreateProduct);


app.listen(port, () => {
    console.log('Interface API is running at the port : ' + port);
})