const {Cart} = require('../models/cart');
const _ = require('lodash');

module.exports.createCartItem = async (req, res) => {
    try {
        const {product, price} = _.pick(req.body, ["product", "price"]);
        let cartItem = await Cart.findOne({user: req.user._id, product: product});

        if (cartItem) {
            return res.status(400).send({message: "This product already exists in Cart"});
        } else {
            cartItem = new Cart({user: req.user._id, price: price, product: product});
            const result = await cartItem.save();
            return res.status(201).send({
                message: "Added to cart successfully!",
                data: result
            });
        }
    } catch (error) {
        return res.status(400).send({message: "Added to cart failed."});
    }
}

module.exports.getCartItem = async (req, res) => {
    try {
        const cartItems = await Cart.find({user: req.user._id})
            .populate('product', 'name')
            .populate('user', 'name');
        if (cartItems.length > 0) {
            return res.status(200).send(cartItems);
        } else {
            return res.status(400).send({message: "There are no items in this cart."});
        }
    } catch (error) {
        return res.status(400).send({message: "Failed to fetch cart items."});
    }
}

module.exports.updateCartItem = async (req, res) => {
    try {
        const {_id, count} = _.pick(req.body, ["_id", "count"]);
        await Cart.updateOne({user: req.user._id, _id: _id}, {count: count});
        return res.status(200).send({message: "Cart item updated Successfully!"});
    } catch (error) {
        return res.status(400).send({message: "Cart item updated failed."});
    }
}

module.exports.deleteCartItem = async (req, res) => {
    try {
        const _id = req.params.id;
        await Cart.deleteOne({user: req.user._id, _id: _id});
        return res.status(200).send({message: "Cart item removed Successfully!"});
    } catch (error) {
        return res.status(400).send({message: "Cart item deleted successfully."});
    }
}