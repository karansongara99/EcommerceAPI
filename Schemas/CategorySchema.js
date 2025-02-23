import mongoose from 'mongoose';

const schema = mongoose.Schema({
    CategoryID: Number,
    CategoryName: String,
})

export default mongoose.model("categories",schema);