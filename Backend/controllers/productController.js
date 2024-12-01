const CustomErrorHandler = require('../services/customErrorHandler');
const Product  = require('../models/product')
const multer = require('multer');
const path = require('path');
const productSchema = require('../validators/productValidator');
const product = require('../models/product');

const storage = multer.diskStorage({
    destination : (req,file, cb) => cb(null, 'uploads/'),
    filename: (req,file,cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.round()*1E9)}${path.extname(file.originalname)}`;
        cb(null,uniqueName)
    }
})

const handleMultipartData = multer({ storage, limits:{fileSize: 1000000*5}}).single('image')

const productController = {
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
    async showProducts(req,res,next) {
        let documents;
        try{
            documents = await Product.find().select('-__v');
        }catch(err){
            return next(err);
        }
        return res.json(documents);
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
    },

    async productDetails(req,res,next){
        //console.log('Fetching product details for ID:', req.params.id)
        let document;
        try {
            document = await product.findOne({_id : req.params.id});
        } catch (error) {
            return next(CustomErrorHandler.notFound("Product not found!"));
        }
        return res.json(document);
    }
}

module.exports = productController;