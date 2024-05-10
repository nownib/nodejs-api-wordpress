const axios = require("axios");
const productService = require("../service/productService");
const WooCommerceAPI = require("woocommerce-api");

const testApi = (req, res) => {
  return res.status(200).json({
    message: "ok",
    data: "test api",
  });
};

const handleCreateProduct = async (req, res) => {
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

  // Define the product data to add
  const productData = {
    name: req.body.name,
    type: "simple",
    regular_price: req.body.price,
    description: req.body.description,
    categories: [{ id: 16 }],
    images: [
      {
        src: req.body.image
      }
    ],
    stock_quantity: req.body.quantity
  };

  const createProductPromise = new Promise((resolve, reject) => {
    WooCommerce.post("products", productData, function (err, data, res) {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(res));
      }
    });
  });

  try {
    // Chờ đợi sản phẩm được tạo thành công
    const createdProduct = await createProductPromise;

    console.log("New product added:", createdProduct);

    // Chuyển hướng sau khi sản phẩm được tạo thành công
    res.redirect("/product");
  } catch (error) {
    console.error("Error while creating product:", error);
    // Xử lý lỗi ở đây nếu cần
    res.status(500).send("Failed to create product.");
  }
};

const handleProductPage = async (req, res) => {
    const productList = await productService.getProductList();
    // console.log("check >>>>", productList.length);
    return res.render("interface.ejs", { productList });
};

const handleDeleteProduct = async (req, res) => {
  // console.log(">>>check id", req.params.id); //check xem có lấy đc id ko
  await productService.deleteProduct(req.params.id);
  return res.redirect("/product");
};

const renderInterface = async (req, res) => {
  res.render("interface");
};

const getUpdateProductPage = async (req, res) => {
  let product = await productService.getProductById(req.params.id);
  let productData = {};
  productData = product;
  
  return res.render("update-product.ejs", { productData });
}

const handleUpdateProduct = async (req, res) => {
  let id = req.body.id;
  let name = req.body.name; //name cua input
  let price = req.body.price;
  let description = req.body.description;
  let image = req.body.image;
  await productService.updateProductInfo(id, name, price, description, image);
  return res.redirect("/product");
};


module.exports = {
  renderInterface,
  handleCreateProduct,
  testApi,
  handleProductPage,
  handleDeleteProduct,
  getUpdateProductPage,
  handleUpdateProduct
};
