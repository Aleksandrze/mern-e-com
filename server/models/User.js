const mongoose = require("mongoose");

module.exports =
    mongoose.models.User ||
    mongoose.model(
        "User",
        new mongoose.Schema(
            {
                username: {
                    type: String,
                    required: true,
                },
                email: {
                    type: String,
                    required: true,
                    unique: true,
                },
                password: String,
                role: {
                    type: Number,
                    default: 0,
                    //    admin - 2, mod - 1, user - 0
                },
                saved: [
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Product",
                    },
                ],
            },
            {
                timestamps: {
                    createdAt: "created_at",
                    updatedAt: "updated_at",
                },
            }
        )
    );
