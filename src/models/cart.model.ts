import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
    {
        productId: {type: String, required: true},
        productName: {type: String, required: true},
        productImage: {type: String, required: true},
        userId: {type: String, required: true},
    },
    {
        timestamps: true
    }
)

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema)
