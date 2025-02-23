import mongoose from 'mongoose';

const schema = mongoose.Schema({
    CartID: Number,
    ProductItems: [{
            ProductID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
            },
            ProductQuantity: Number
        }],
    UserID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
})

export default mongoose.model("carts",schema);