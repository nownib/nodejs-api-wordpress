// Import thư viện WooCommerce API
const WooCommerceAPI = require("woocommerce-api");

// Tạo một phiên làm việc với WooCommerce
const woocommerce = new WooCommerceAPI({
  url: "http://localhost/shop",
  consumerKey: "ck_dab1dfa0b126d5689b512f4f133fddcdc2b10a54",
  consumerSecret: "cs_166ee23b0b4e3573a8b6c12cb133029bc4b41d01",
  wpAPI: true,
  version: "wc/v3",
});

const getProductList = () => {
  return new Promise((resolve, reject) => {
    woocommerce.get("products", function (err, data, response) {
      if (err) {
        console.error("Error fetching products from WooCommerce:", err);
        reject({ error: "Error fetching products from WooCommerce" });
      } else {
        const products = JSON.parse(response);
        resolve(products);
      }
    });
  });
};

const deleteProduct = async (productId) => {
  return new Promise((resolve, reject) => {
    woocommerce.delete(`products/${productId}`, function (err, data, response) {
      if (err) {
        console.error("Error deleting product from WooCommerce:", err);
        reject({ error: "Error deleting product from WooCommerce" });
      } else {
        resolve({ message: "Product deleted successfully" });
      }
    });
  });
};

const getProductById = async (productId) => {
  return new Promise((resolve, reject) => {
    woocommerce.get(`products/${productId}`, function (err, data, response) {
      if (err) {
        console.error("Error fetching product from WooCommerce:", err);
        reject({ error: "Error fetching product from WooCommerce" });
      } else {
        const product = JSON.parse(response);
        resolve(product);
      }
    });
  });
};

const updateProductInfo = async (id, name, price, description, image) => {
  const consumerKey = "ck_dab1dfa0b126d5689b512f4f133fddcdc2b10a54";
  const consumerSecret = "cs_166ee23b0b4e3573a8b6c12cb133029bc4b41d01";
  const storeUrl = "http://localhost/shop";

  const WooCommerce = new WooCommerceAPI({
    url: storeUrl,
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    wpAPI: true,
    version: "wc/v3",
  });

  const productDataToUpdate = {
    name: name,
    regular_price: price,
    description: description,
    categories: [{ id: 16 }],
    images: [
      {
        src: image
      }
    ],
    // stock_quantity: req.body.quantity
  };

  const updateProductPromise = new Promise((resolve, reject) => {
    WooCommerce.put(
      `products/${id}`,
      productDataToUpdate,
      function (err, data, res) {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(res));
        }
      }
    );
  });
  
  try {
    const updateProduct = await updateProductPromise;
    console.log("Update thành công", updateProduct);
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
  }
}

module.exports = {
  getProductList,
  deleteProduct,
  getProductById,
  updateProductInfo,
};
