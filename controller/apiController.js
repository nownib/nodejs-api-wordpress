// import axios from "axios";
const axios = require("axios");
const productService = require("../service/productService");
const WooCommerceAPI = require("woocommerce-api");
const moment = require("moment-timezone");

const testApi = (req, res) => {
  return res.status(200).json({
    message: "ok",
    data: "test api",
  });
};

const handleCreateProduct = async (req, res) => {
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

  // Define the product data to add
  const productData = {
    name: req.body.name,
    type: "simple",
    regular_price: req.body.price,
    description: req.body.description,
    categories: [{ id: 97 }],
    images: [
      {
        src: req.body.image,
      },
    ],
    stock_quantity: req.body.quantity,
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

const getUpdateProductPage = async (req, res) => {
  let product = await productService.getProductById(req.params.id);
  let productData = {};
  productData = product;

  return res.render("update-product.ejs", { productData });
};

const handleUpdateProduct = async (req, res) => {
  let id = req.body.id;
  let name = req.body.name; //name cua input
  let price = req.body.price;
  let description = req.body.description;
  let image = req.body.image;
  await productService.updateProductInfo(id, name, price, description, image);
  return res.redirect("/product");
};

const renderInterface = async (req, res) => {
  res.render("interface");
};

const handleCouponPage = async (req, res) => {
  // const productList = await productService.getProductList();
  // console.log("check >>>>", productList.length);
  res.render("createCoupon.ejs");
};

const handleCreateCoupon = async (req, res) => {
  const consumerKey = req.body.consumerKey;
  const consumerSecret = req.body.consumerSecret;
  const storeUrl = req.body.url;
  // console.log("check req key:", consumerKey);

  const WooCommerce = new WooCommerceAPI({
    url: storeUrl,
    consumerKey: consumerKey,
    consumerSecret: consumerSecret,
    wpAPI: true,
    version: "wc/v3",
  });
  const startTimeStr = req.body.start_time + ":00";
  const endTimeStr = req.body.end_time + ":00";
  const startTime = new Date(startTimeStr);
  const endTime = new Date(endTimeStr);

  const couponData = {
    code: req.body.code,
    discount_type: "percent",
    amount: req.body.value,
    description: `Giảm ${req.body.value} cho toàn bộ sản phẩm`,
    individual_use: false,
    exclude_sale_items: false,
    usage_limit: req.body.usage_limit,
    usage_limit_per_user: req.body.usage_limit_per_user,
    date_created: startTime,
    date_expires: endTime,
  };

  const code = couponData.code;
  console.log(couponData);

  function createCoupon() {
    WooCommerce.post("coupons", couponData, function (err, data, res) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Coupon published:", JSON.parse(res));
    });
  }

  const currentDate = new Date(); //Thầy vui lòng đợi xiú heheheeeeee

  if (startTime > currentDate) {
    const timeUntilPublish = startTime.getTime() - currentDate.getTime();
    console.log(
      `Coupon will be published in ${timeUntilPublish / 1000} seconds`
    );
    res.render("notifi.ejs", { code, startTime});
    setTimeout(createCoupon, timeUntilPublish);
  } else {
    console.log("Publish date is in the past. Coupon will not be published.");
    // return res.status(400).send("Publish date is in the past. Coupon will not be published.");
  }

  if (couponData.date_created >= couponData.date_expires) {
    return res.status(400).send("Start time must be less than the end time.");
  }
  // res.render("notifi.ejs", { code});
};

module.exports = {
  renderInterface,
  handleCreateProduct,
  testApi,
  handleProductPage,
  handleDeleteProduct,
  getUpdateProductPage,
  handleUpdateProduct,
  handleCreateCoupon,
  handleCouponPage,
};
