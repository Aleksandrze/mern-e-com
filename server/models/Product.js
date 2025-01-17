const mongoose = require("mongoose");

module.exports =
    mongoose.models.Product ||
    mongoose.model(
        "Product",
        new mongoose.Schema(
            {
                title: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                    required: true,
                },
                images: [String],
                price: {
                    type: Number,
                    required: true,
                },
                category: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Category",
                },
                // 	TODO: Add added_by: Moderator_id
                //  TODO: Add product characteristics
            },
            {
                timestamps: {
                    createdAt: "created_at",
                    updatedAt: "updated_at",
                },
            }
        )
    );
