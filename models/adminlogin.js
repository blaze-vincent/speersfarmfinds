import mongoose, {Schema} from 'mongoose';

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: Object,
        required: true
    }
}, {
    timestamps: true
});

export default mongoose.models["AdminLogin"] || mongoose.model("AdminLogin", schema, 'adminlogins');