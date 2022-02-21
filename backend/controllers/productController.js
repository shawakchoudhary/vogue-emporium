const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

//Create  Product --Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {

  let images = [];
  if(typeof req.body.images === "string"){
      images.push(req.body.images)
  }else{
     images = req.body.images;
  }
   
  const imagesLink = [];

  for(let i = 0; i < images.length;i++){
    const result  = await cloudinary.v2.uploader.upload(images[i],{
      folder: "products",
    });
    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imagesLink;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

//GET ALL PRODUCTS
exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();
    let products = await apiFeature.query.clone();
    let filteredProductsCount = products.length;

    apiFeature.pagination(resultPerPage);

  //for showing products on different pages 

     products = await apiFeature.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

//GET ALL PRODUCTS(Admin)
exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products =  await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

//Get single product or get product details

exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

//UPDATE PRODUCT --ADMIN

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }
   
  let images = [];
  if(typeof req.body.images === "string"){
      images.push(req.body.images)
  }else{
     images = req.body.images;
  }

  if(images !== undefined){

     //Deleting Images from Cloudinary
  for(let i = 0; i < product.images.length;i++){
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
   }

   const imagesLink = [];

  for(let i = 0; i < images.length;i++){
    const result  = await cloudinary.v2.uploader.upload(images[i],{
      folder: "products",
    });
    imagesLink.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLink;

  }


  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//delete Product

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  //Deleting Images from Cloudinary
  for(let i = 0; i < product.images.length;i++){
   await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }



  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product delete Successfully",
  });
});

//Get all reviews of a single product

exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete Product reviews

exports.deleteProductReview = catchAsyncError(async (req, res, next) => {
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

  if(reviews.length === 0){
     ratings = 0;
  }else{
    ratings = avg / reviews.length;
  }
  

  const numberOfReviews = reviews.length;
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numberOfReviews,
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
