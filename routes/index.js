const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const router = express.Router();

router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false });
});

router.get("/shop", isLoggedIn, async function (req, res) {
  let products = await productModel.find();
  let success = req.flash("success");
  
  // Get io instance from app
  const io = req.app.get("io");
  
  res.render("shop", { products, success, io: io ? true : false });
});

router.get("/cart", isLoggedIn, async function (req, res) {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");

  const bill = user.cart.length > 0 ? (Number(user.cart[0].price) + 20 - Number(user.cart[0].discount)) : 0;

  res.render("cart", { user, bill });
});

router.get("/logout", isLoggedIn, function (req, res) {
  res.render("shop");
});

router.get("/addtocart/:productid", isLoggedIn, async function (req, res) {
  try {
    const io = req.app.get("io");
    let user = await userModel.findOne({ email: req.user.email });
    let product = await productModel.findById(req.params.productid);

    // Check if product is in stock
    if (product.stock <= 0) {
      req.flash("error", "Sorry, this product is out of stock");
      return res.redirect("/shop");
    }

    // Reduce stock quantity
    product.stock -= 1;
    await product.save();

    user.cart.push(req.params.productid);
    await user.save();

    // Emit real-time update for product stock
    if (io) {
      io.to(`product-${req.params.productid}`).emit("product-stock-update", {
        productId: req.params.productid,
        stock: product.stock,
        message: product.stock === 0 ? "Out of Stock" : `Only ${product.stock} left!`
      });
    }

    // Emit cart count update
    if (io) {
      io.emit("cart-count-update", {
        userId: user._id.toString(),
        cartCount: user.cart.length
      });
    }

    req.flash("success", "Added to cart");
    res.redirect("/shop");
  } catch (error) {
    console.error("Error adding to cart:", error);
    req.flash("error", "Something went wrong");
    res.redirect("/shop");
  }
});

module.exports = router;