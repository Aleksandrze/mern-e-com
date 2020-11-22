const express = require("express");

const authMiddleware = require("../../middlewares/auth");
const adminMiddleware = require("../../middlewares/admin");

const Category = require("../../models/Category");
const Product = require("../../models/Product");

const router = express.Router();

/**
 * Get all categories from DB.
 *
 * @method  GET
 * @route   /categories
 */
router.get("/", async (req, res) => {
    return res.status(200).json(await Category.find());
});

/**
 * Get one category by id with populated products.
 *
 * @method  GET
 * @route   /categories/:id
 */
router.get("/:id", async (req, res) => {
    return res.status(200).json({
        ...(await Category.findOne({ _id: req.params.id }, {}, { lean: true })),
        products: await Product.find({ category: req.params.id }),
    });
});

router.put("/:id", [authMiddleware, adminMiddleware], async (req, res) => {
    // update category in db
    // new data is located in req.body
    // just override it
});

router.post("/create", [authMiddleware, adminMiddleware], async (req, res) => {
    // add new category
    // all data is stored in req.body
});

router.delete("/:id", [authMiddleware, adminMiddleware], async (req, res) => {
	const category = await Category.findOneAndDelete({_id: req.params.id});
	if(category){
		return res.status(200).json(category);
	}
	res.status(500).json({error: "Category was not found"});
});

module.exports = router;
