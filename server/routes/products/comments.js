const { Router } = require("express");

const Product = require("../../models/Product");
const Comment = require("../../models/Comment");

const router = Router();

    // get all comments which belong to Product with id req.params.productId
router.get("/:productId/comments", async (req, res) => {
    res.json(await Comment.find({ _id: req.params.productId }));
});

    // get comment for product with id req.params.productId
router.get("/:productId/comments/:commentId", async (req, res) => {
    res.json(await Comment.findOne({ _id: req.params.productId }));
});

    // add comment for product with id req.params.productId
router.post("/:productId/comments", async (req, res) => {
    const product = await Product.findOne({_id: req.params.id});
    const user = await User.findOne({_id: req.params.id});
    if (!product) {
        return res.status(404).json({ error: "Product or user was not found." });
    }

    if (!user) {
        return res.status(404).json({ error: "Product or user was not found." });
    }

    const newComment  = await new Comment({
        user: user._id,
        product: product._id,
        text: req.body.text,
    }).save();

    res.status(500).json({ error: "Something went wrong" });
});

        // update comment
router.put("/:productId/comments/:commentId", async (req, res) => {
    comment = await Comment.updateOne({ _id: req.params.id }, { text: req.body.text });
    if (!comment) {
        return res.status(500).json("error:'Something went wrong'");
    }
    res.status(200).json(comment);
});

module.exports = router;
