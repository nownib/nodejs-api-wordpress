const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const apiController = require('./controller/apiController');
const port = 8000;

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', apiController.renderInterface);
app.post('/api', apiController.handleCreateProduct);
app.get('/product', apiController.handleProductPage);
app.post("/delete/:id", apiController.handleDeleteProduct);
app.get("/update/:id", apiController.getUpdateProductPage);
app.post("/product/update-product", apiController.handleUpdateProduct);
app.get('/coupon', apiController.handleCouponPage);
app.post('/coupon/create', apiController.handleCreateCoupon);
    
app.listen(port, () => {
    console.log('Interface API is running at the port : ' + port);
})