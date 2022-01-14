const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    vehicleName: {
        type: String,
        required: true,
    },
    vehicleNumber: {
        type: String,
        unique: true,
        required: true,
    },
    entryDate: {
        type: Date,
        default: Date.now(),
    },
    exitDate: {
        type: Date,
        default: null
    },
    status: {
        type: String,
        required: true,
        default: 'UN_KNOWN',
    }
}, { timestamps: true }, );

const Car = mongoose.model('Car', carSchema);

module.exports = Car;