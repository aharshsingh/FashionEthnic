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
        let document;
        try {
            document = await product.findOne({_id : req.params.id});
        } catch (error) {
            return next(CustomErrorHandler.notFound("Product not found!"));
        }
        return res.json(document);
    },
    
    async getImage(req,res,next){
        const {id} = req.params;
        try {
            const result = await product.findById(id).select('image');
            return res.status(200).json(result);
        } catch (error) {
            return next(error);
        }
    }, 
    async getProductImage(req,res,next){
        const idArray = req.body.idArray;
        let result = [];
        try {
            for(let id of idArray){
                const image = await product.findById(id).select('image');
                result.push({id,image});
            }
            return res.status(200).json({result});
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = productController;