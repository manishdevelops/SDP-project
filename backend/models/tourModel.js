const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema({
    tourName: {
        type: String,
        unique: true,
        required: [true, 'A tour must have a name!']
    },
    slug: String,
    ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'Ratings must be above or equal 1.0'],
        max: [5, 'Ratings must be below or equal to 5'],
        set: val => Math.round(val * 10) / 10 // ex 4.66666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    tourType: {
        type: String,
        required: [true, 'A tour must have a type!']
    },
    location: {
        type: String,
        required: [true, 'A tour must have a location!']
    },
    tourDescription: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a description!']
    },
    tourDuration: {
        type: String,
        required: [true, 'A tour must have a duration!']
    },
    price: {
        type: Number,
        required: [true, 'A tour must jave a price!']
    },
    departureDate: {
        type: Date,
        required: [true, 'A tour must have a departure date!']
    },
    tourGuide: {
        type: String,
        required: [true, 'A tour must have a guide!']
    },
    groupSize: {
        type: Number,
        required: [true, 'A tour must a group size!']
    },
    inclusions: String,
    exclusions: String,
    photos: {
        type: Array,
        required: [true, 'A tour must have atmost 6 images']
    },
    coordinates: {
        type: [Number],
        required: [true, 'A tour must have its coordinates!']
    },
    userRef: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },  // each time that the data is outputted as JSON, we want virtuals to be true. So basically virtuals to be the part of the output.
    toObject: { virtuals: true },
    id: false  // no duplicate id in query op
}
);

tourSchema.index({ coordinates: '2dsphere' });

//Virtual populate
tourSchema.virtual('reviews', {
    ref: 'Review',
    foreignField: 'tour',
    localField: '_id'
});

tourSchema.pre('save', function (next) {
    this.slug = slugify(this.tourName, { lower: true });
    console.log(this.slug)
    next();
});


const tour = mongoose.model('Tour', tourSchema);

module.exports = tour;
