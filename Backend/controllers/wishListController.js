const WishList = require('../models/wishList');
const wishListSchema = require('../validators/wishListValidator.js');

const wishListController = {
  async addProduct(req, res, next) {
    try {
      const { userId, productId } = req.body;

      const { error } = wishListSchema.validate(req.body);
        if (error) {
            return next(error);
        }

      let wishlist = await WishList.findOne({ userId });

      if (!wishlist) {
        wishlist = new WishList({ userId, item: [] });
      }

      const productExists = wishlist.item.find((item) => item.product.toString() === productId);
      if (productExists) {
        return res.status(400).json({ error: 'Product already in wishlist' });
      }

      wishlist.item.push({ product: productId });
      await wishlist.save();

      return res.status(200).json({ message: 'Product added to wishlist', wishlist });
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = wishListController;
