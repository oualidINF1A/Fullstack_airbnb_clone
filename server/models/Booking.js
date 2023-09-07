const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookingSchema = new Schema({
    place:{type: Schema.Types.ObjectId, required:true, ref:'Place'},
    user:{type: Schema.Types.ObjectId, required:true, ref:'User'},
    checkIn:{type: Date, required:true},
    checkOut:{type: Date, required:true},
    guests:{type: Number, required:true},
    name:{type: String, required:true},
    phone:{type: String, required:true},
    price:{type: Number, required:true},

});

const BookingModel = mongoose.model('Booking', bookingSchema);
module.exports = BookingModel;