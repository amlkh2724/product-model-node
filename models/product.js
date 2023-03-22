import mongoose from "mongoose";
import slugify from "slugify";

const buildProduct = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: [true, 'name already exists'],
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    category: {
        type: String,
        required: true

    },
    isActive: {
        type: Boolean,
        default: true
    },
    details: {
        description: {
            type: String,
            required: true,
            minlength: 10
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        discount: {
            type: Number,
            default: 0,
            min: 0
        },
        images: {
            type: [String],
            required: true,
            validate: {
                validator: function (images) {
                    return images.length >= 2;
                },
                message: 'Product must have at least two images'
            }
        },
        phoneNumber: {
            type: String,
            required: true,
            default: 0,
            validate: {
                validator: function (phoneNumber) {
                    const regex = /^0\d([\d]{0,1})([-]{0,1})\d{7}$/;
                    return regex.test(phoneNumber);
                },
                message: 'Invalid Israeli phone number'
            }
        },
        dateAdded: {
            type: Date,
            default: Date.now
        }
    }



})

buildProduct.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

export default mongoose.model('buildproduct', buildProduct);
