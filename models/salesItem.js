import mongoose, {Schema} from 'mongoose';

const schema = new Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    price: String,
    description: String,
}, {
    timestamps: true
});

export default mongoose.models["SalesItem"] || mongoose.model("SalesItem", schema, 'salesitems');