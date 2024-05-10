const axios = require('axios');

// Nhập thông tin xác thực API của WooCommerce và URL của cửa hàng của bạn
const consumerKey = 'ck_dab1dfa0b126d5689b512f4f133fddcdc2b10a54';
const consumerSecret = 'cs_166ee23b0b4e3573a8b6c12cb133029bc4b41d01';
const storeUrl = 'http://localhost/shop';

// Xác định dữ liệu sản phẩm cần thêm
const productData = {
    name: 'Monkey D. Luffy',
    type: 'simple',
    regular_price: '3000000000',
    description: 'Đây là Tứ Hoàng',
    categories: [{ id: 16 }],
    images: [{ src: 'https://i.pinimg.com/originals/50/08/ef/5008efb9df96969624d2674645027a3a.png' }],
    stock_quantity: 10
};

// Xác định tiêu đề xác thực
const headers = {
    Authorization: `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`,
    'Content-Type': 'application/json'
};

// Gửi yêu cầu POST để thêm sản phẩm
axios.post(`${storeUrl}/wp-json/wc/v3/products`, productData, { headers })
    .then(response => {
        // Xử lý dữ liệu phản hồi
        const productId = response.data.id;
        const productName = response.data.name;
        console.log(`Sản phẩm đã được thêm thành công: ID ${productId}, Tên: ${productName}`);
    })
    .catch(error => {
        // Xử lý lỗi một cách linh hoạt hơn
        console.error('Không thể thêm sản phẩm:', error.response.data);
    });
