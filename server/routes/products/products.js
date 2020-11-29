const { Router } = require("express");

const authMiddleware = require("../../middlewares/auth");
const adminMiddleware = require("../../middlewares/admin");

const commentsRouter = require("./comments");

const router = Router();

router.use("/", commentsRouter);

    // get all products here
router.get("/", async (req, res) => {
    res.json(await Product.find());
});

    // get only one product by id here
    // id is stored in req.params.id
router.get("/:id", async (req, res) => {
    res.json(await Product.findOne({ _id: req.params.id }));
});

    // update product's info in db
    // new data is stored in req.body
router.put("/:id", [authMiddleware, adminMiddleware], async (req, res) => {
    product = await Product.updateOne({ _id: req.params.id }, { title: req.body.title });
    if (!product) {
        return res.status(500).json("error:'Something went wrong'");
    }
    res.status(200).json(product);
});

    // delete product from DB
    // is is stored in req.params.id
    // only moderator or admin can delete products
    // no need to check role of user here
router.delete("/:id", [authMiddleware, adminMiddleware], async (req, res) => {
    products = await Product.findByIdAndDelete(req.params.id)
    .exec()
    .then((products) => {
        if (products) {
            return res.status(404).end();
        }
        return res.status(204).end();
    });
});

router.get("/saved", [authMiddleware], async (req, res) => {
    // get all saved products by user
    // use req.user._id as user's id
    // saved products are stored in User model

    // example code
    res.status(200).json(
        (await User.findOne({ _id: req.user._id }, "saved").populate("saved")).saved
    );
});

    // get all products which user bought
    // hint: use Transcation table
    // user's id is stored in req.user._id
router.get("/bought", [authMiddleware], async (req, res) => {
    res.status(200).json((await Transaction.find({ user: req.user._id }).populate("product")));
});

    // delete product from liked list
    // use id as req.params.id and req.user._id
router.delete("/save/:id", async (req, res) => {
    const user = await User.findOne({ _id: req.user._id });
    const product = await Product.findOne({ _id: req.params.id });

    if (!user || !product) {
        return res.status(404).json({ error: "Product or user was not found." });
    }

    user.delete.push(product);
    await user.save();
    res.status(200).json(product)
});

router.get("/save/:id", async (req, res) => {
    // Save product via id to the liked by user
    const user = await User.findOne({ _id: req.user._id });
    const product = await Product.findOne({ _id: req.params.id });

    if (!user || !product) {
        return res.status(404).json({ error: "Product or user was not found." });
    }

    user.saved.push(product);
    await user.save();
    res.status(200).json(product);
});

module.exports = router;
