const CustomErrorHandler = require('../services/customErrorHandler');
const Product  = require('../models/product')

const productController = {
    async showProducts(req,res,next) {
        try {
            const { page, limit, sort, search, gender, price, onSale } = req.query;

            // --- Build filter query ---
            const query = {};
            if (search) {
                query.name = { $regex: search, $options: 'i' };
            }
            if (gender) {
                const genders = String(gender).split(',').map((g) => g.trim()).filter(Boolean);
                if (genders.length) query.gender = { $in: genders };
            }
            if (price) {
                const ranges = {
                    u1000: [0, 999.99],
                    '1to3': [1000, 2999.99],
                    '3to5': [3000, 4999.99],
                    '5plus': [5000, Infinity],
                };
                const range = ranges[price];
                if (range) {
                    query.price = { $gte: range[0] };
                    if (range[1] !== Infinity) query.price.$lte = range[1];
                }
            }
            if (onSale === 'true' || onSale === true) {
                query.discount = { $gt: 0 };
            }

            // --- Sort ---
            let sortObj = {};
            switch (sort) {
                case 'price-asc': sortObj = { price: 1 }; break;
                case 'price-desc': sortObj = { price: -1 }; break;
                case 'rating': sortObj = { rating: -1 }; break;
                case 'discount': sortObj = { discount: -1 }; break;
                default: sortObj = {}; // featured / natural order
            }

            // --- Backward compatible: no pagination requested -> return array ---
            if (page === undefined && limit === undefined) {
                const all = await Product.find(query).select('-__v').sort(sortObj);
                return res.json(all);
            }

            // --- Paginated response ---
            const pageNum = Math.max(parseInt(page, 10) || 1, 1);
            const lim = Math.max(parseInt(limit, 10) || 12, 1);
            const skip = (pageNum - 1) * lim;

            const [documents, total] = await Promise.all([
                Product.find(query).select('-__v').sort(sortObj).skip(skip).limit(lim),
                Product.countDocuments(query),
            ]);

            return res.json({
                products: documents,
                total,
                page: pageNum,
                limit: lim,
                totalPages: Math.max(Math.ceil(total / lim), 1),
            });
        } catch (err) {
            return next(err);
        }
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