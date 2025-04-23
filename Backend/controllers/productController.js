const CustomErrorHandler = require('../services/customErrorHandler');
const Product  = require('../models/product')

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

    async productDetails(req,res,next){
        let document;
        try {
            document = await Product.findOne({_id : req.params.id});
        } catch (error) {
            return next(CustomErrorHandler.notFound("Product not found!"));
        }
        return res.json(document);
    },
    
    async getImage(req,res,next){
        const {id} = req.params;
        try {
            const result = await Product.findById(id).select('image');
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
                const image = await Product.findById(id).select('image');
                result.push({id,image});
            }
            return res.status(200).json({result});
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = productController;