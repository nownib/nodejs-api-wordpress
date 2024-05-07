const axios = require('axios');

// Enter your WooCommerce API credentials and the URL of your store
const consumerKey = 'ck_45bb462004400530d0582cba87f44f11a02b2938';
const consumerSecret = "cs_c14a083651f7c5949376abdcc35ff97fb573a2b4";
const storeUrl = 'http://localhost/wordpress';

// Define the product data to add
const productData = {
    name: 'Monkey D. Luffy',
    type: 'simple',
    regular_price: '3000000000',
    description: 'Đây là Tứ Hoàng',
    categories: [
        { id: 98} 
    ],
    images: [
        {
            src: 'https://i.pinimg.com/originals/50/08/ef/5008efb9df96969624d2674645027a3a.png',
        }
    ],
    stock_quantity: 10
};

// Define the authentication headers
const headers = {
    Authorization: `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`,
    'Content-Type': 'application/json'
};

// Send a POST request to add the product
axios.post(`${storeUrl}/wp-json/wc/v3/products`, productData, { headers })
    .then(response => {
        // If the request was successful, display the product ID that was added
        console.log(`Product added with ID: ${response.data.id}`);
    })
    .catch(error => {
        // If there was an error, display the error message
        console.error('Failed to add product:', error.response.data);
    });
