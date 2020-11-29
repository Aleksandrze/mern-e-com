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

/**
* @method  PUT
* @route   /categories/:id
*
*/
router.put("/:id", [authMiddleware, adminMiddleware], async (req, res) => {
	if(req.category._id ===req.params.id){
		const category = await Category.findOneAndUpdate(
		{_id: req.params.id},
			{
				name: req.body.name || req.category.name,
				description: req.body.description || req.category.description,
			}
		);
		return res.status(200).json(category);
	}
	res.status(500).json({error: "You do not have permissions."})
});
/** 
 * add new categoryall 
 * data is stored in req.body
 */
router.post("/create", [authMiddleware, adminMiddleware], async (req, res) => {
	const category = await Category.findOne({name: req.body.name});
	if(category){
		return res.status(403).json({error: "Category already exits" });
	}
	const newCategory =await new Category({
		name: req.body.name,
		description: req.body.description,
	}).save();


});

/**
* Remove unique Category from DB via id.
* @method  DELETE
* @route   /categories/:id
*
*/
router.delete("/:id", [authMiddleware, adminMiddleware], async (req, res) => {
	const category = await Category.findOneAndDelete({_id: req.params.id});
	if(category){
		return res.status(200).json(category);
	}
	res.status(500).json({error: "Category was not found"});
});

module.exports = router;