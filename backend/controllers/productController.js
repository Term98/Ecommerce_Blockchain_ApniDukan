const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/productModel");
const ApiFeatures = require("../util/ApiFeatures");
const ErrorHandler = require("../util/ErrorHandler");
const cloudinary = require("cloudinary");

// getting all products from database
const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 8;

  const productsCount = await Product.countDocuments();
  // console.log("productCount: ", productsCount);

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();
  let products = await apiFeature.query;
  let filteredProductsCount = products.length;
  apiFeature.pagination(resultPerPage);
  products = await apiFeature.query.clone();
  res.status(200).json({
    success: true,
    message: "Route is Working Fine",
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// Get All Product (Admin)
const getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// creating a new product -- admin
const createProduct = catchAsyncErrors(async (req, res) => {
  // console.log(`body : ${req.body}`);

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);
  console.log(product);
  res.status(201).json({
    success: true,
    product,
  });
});

// update Product --admin
const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    // finding the product details and updating it in the db
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    // // console.log("updated :>> ", updatedProduct);
    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      updatedProduct,
    });
  } catch (error) {
    // console.log(`error is: ${error}`);
    res.status(500).json({
      error: "couldn't update product details !!",
    });
  }
};

// delete product -admin
const deleteProduct = async (req, res, next) => {
  try {
    // finding the product to be deleted from the products db
    // console.log("inside delete route", req.body, req.params);
    let product = await Product.findById(req.params.id); // deleting the product using the mongoose delete() method
    try {
      await product.delete();
    } catch (error) {
      // console.log(`error deleting: ${error}`);
      res
        .status(500)
        .json({ error: "product Couldn't be deleted, Try Again." });
    }
    res.status(200).json({
      success: true,
      message: "Product has been deleted Successfully!",
    });
  } catch (err) {
    res.status(500).json({ error: "couldn't find product" });
  }
};

// getting a single product details
const getProductDetails = catchAsyncErrors(async (req, res, next) => {
  // finding the product from the products db
  // console.log("inside route", req.body, req.params);

  let product = await Product.findById(req.params.id);
  // console.log(`product: ${product}`);
  if (!product) next(new ErrorHandler("couldn't find product", 404));
  res.status(200).json({
    success: true,
    message: "Product Details: ",
    product,
  });
});

// Create New Review or Update the review
const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => `${rev.user}` === `${req.user._id}`
  );
  // console.log(isReviewed);
  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (`${rev.user}` === `${req.user._id}`)
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
};
