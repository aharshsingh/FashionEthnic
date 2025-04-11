const Order = require('../models/order');
const User = require('../models/user');
const multer = require('multer');
const productSchema = require('../validators/productValidator');
const path = require('path');
const Product  = require('../models/product')

const storage = multer.diskStorage({
    destination : (req,file, cb) => cb(null, 'uploads/'),
    filename: (req,file,cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.round()*1E9)}${path.extname(file.originalname)}`;
        cb(null,uniqueName)
    }
})
const handleMultipartData = multer({ storage, limits:{fileSize: 1000000*5}}).single('image')

const adminController = {
    async getAllUser(req,res,next){
        try {
            const result = await User.find();
            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).json({"error": "Internal server error"});
        }
    },

    async getAllOrder(req,res,next){
        try {
            const result = await Order.find();
            return res.status(200).send(result);
        } catch (error) {
            return res.status(500).json({"error": "Internal server error"});
        }
    },

        addProducts(req,res,next) {
            handleMultipartData(req,res,async (err) => {
                if(err){
                    console.error(err);
                    return next(CustomErrorHandler.serverError(err.message));
                }
                else{
                    const filePath = req.file.path;
                    const { name,price,about,material,care,colour,gender,fit,size,rating,discount } = req.body;
                    const product = new Product({
                    name,
                    price,
                    about,
                    material,
                    care,
                    colour,
                    gender,
                    fit,
                    size,
                    rating,
                    discount,
                    image: filePath
                    });
                    let result
                    try {
                        result = await product.save();
                    } catch (err) {
                        return next(err);
                    }
                    console.log(result);
                    res.json('product uploaded successfully');
                }
            });
            // // Validating the client
            // const { error } = productSchema.validate(req.body);
            // if (error) {
            //     return next(error);
            // }
            // If user already exists in the database
            // try {
            //     const exist = await Product.exists({ pid: req.body.pid });
            //     if (exist) {
            //         return next(CustomErrorHandler.alreadyExists('Product already exists in database'));
            //     }
            // } catch (err) {
            //     return next(err);
            // }
         },

          async updateProducts(req,res,next) {
                 let product;
                 handleMultipartData(req,res,async(err)=>{
                     if(err)
                         return next(CustomErrorHandler.serverError(err.message))
                     let filePath;
                     if(req.file)
                         filePath = req.file.path;
                     const {error} = productSchema.validate(req.body);
                     if(error)
                         return next(error);
                     else{
                         const { name,price,about,material,care,colour,gender,fit,size,rating,discount } = req.body;
                         product = await Product.findOneAndUpdate({_id: req.params.id},{
                         name,
                         price,
                         about,
                         material,
                         care,
                         colour,
                         gender,
                         fit,
                         size,
                         rating,
                         discount,
                         ...(req.file && {image: filePath })
                         });
                     }
                 })
                 res.json(product);
             }
}

module.exports = adminController;