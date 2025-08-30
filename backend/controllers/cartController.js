const Cart = require("../models/Cart");
const Product = require("../models/Product");



const addToCart = async(req , res)=>{
    try{
        const userId = req.body.userId;
        const {productId, quantity} = req.body;

        let cart = await Cart.findOne({userId})

        if(!cart){
            cart = new Cart({userId, items: []})
        }

        const exsitingItem = cart.items.find(
            (item) => item.productId.toString() === productId
        )

        if(exsitingItem){
            exsitingItem.quantity += quantity || 1
        }else{
            cart.items.push({productId, quantity:quantity || 1})
        }

        await cart.save()
        res.json(cart)
    }
    catch(error){
        console.log("Error adding to cart:", error)
        return res.status(500).json({message: "Server Error"})
    }
}

const getCart = async (req, res) => {
  try {
    const userId = req.params.userId;

    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.json({ items: [], total: 0 });
    }

    let total = 0;
    cart.items.forEach((item) => {
      total += item.productId.price * item.quantity;
    });

    res.json({ items: cart.items, total });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const { productId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { addToCart, getCart, removeFromCart };