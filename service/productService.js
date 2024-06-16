// Import thư viện WooCommerce API
const WooCommerceAPI = require("woocommerce-api");

// Tạo một phiên làm việc với WooCommerce
const woocommerce = new WooCommerceAPI({
  consumerKey: "ck_4b0a4bb171a129b188248047d30e17691681b2d0",
  consumerSecret: "cs_73da654c83fffde5884b591a0baabd9b9c28cac6",
  url: "https://bootech.store",
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
  const consumerKey = "ck_4b0a4bb171a129b188248047d30e17691681b2d0";
  const consumerSecret = "cs_73da654c83fffde5884b591a0baabd9b9c28cac6";
  const storeUrl = "https://bootech.store";

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
    categories: [{ id: 97 }],
    images: [
      {
        src: image,
      },
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
};

module.exports = {
  getProductList,
  deleteProduct,
  getProductById,
  updateProductInfo,
};
