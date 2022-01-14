const express = require('express');
const router = express.Router();
const cars = require('../models/car');

const NO_DATA_AVAILABLE = "No data available";
const UNABLE_TO_FIND_CAR = "Unable to find the car";
const CAR_SUCCESSFULLY_REMOVED = "Car successfully removed";

// get all cars
router.get('/', async(req, res) => {
    try {
        const carsList = await cars.find();
        if (carsList.length > 0) {
            res.status(200).json({ data: carsList });
        } else {
            res.status(404).json({ message: NO_DATA_AVAILABLE });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// get car
router.get('/:id', async(req, res) => {
    try {
        const car = await cars.findById(req.params.id);
        if (car != null) {
            res.status(200).json({ data: car });
        } else {
            res.status(404).json({ message: NO_DATA_AVAILABLE });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// add car
router.post('/', async(req, res) => {
    try {
        const carModel = new cars();
        if (req.body.name != null) {
            carModel.name = req.body.name;
        }
        if (req.body.vehicleName != null) {
            carModel.vehicleName = req.body.vehicleName;
        }
        if (req.body.vehicleNumber != null) {
            carModel.vehicleNumber = req.body.vehicleNumber;
        }
        if (req.body.entryDate != null) {
            carModel.entryDate = req.body.entryDate;
        }
        if (req.body.exitDate != null) {
            carModel.exitDate = req.body.exitDate;
        }
        if (req.body.status != null) {
            carModel.status = req.body.status;
        }
        const car = await carModel.save();
        res.status(201).json({ data: car });
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

// update car
router.patch('/:id', async(req, res) => {
    try {
        const car = await cars.findById(req.params.id);
        if (car != null) {
            if (req.body.name != null) {
                car.name = req.body.name;
            }
            if (req.body.vehicleName != null) {
                car.vehicleName = req.body.vehicleName;
            }
            if (req.body.vehicleNumber != null) {
                car.vehicleNumber = req.body.vehicleNumber;
            }
            if (req.body.entryDate != null) {
                car.entryDate = req.body.entryDate;
            }
            if (req.body.exitDate != null) {
                car.exitDate = req.body.exitDate;
            }
            if (req.body.status != null) {
                car.status = req.body.status;
            }
            car.save();
            res.header('Access-Control-Allow-Origin', ['*']).status(200).json({ data: car });
        } else {
            res.status(404).json({ message: UNABLE_TO_FIND_CAR });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

// delete car
router.delete('/:id', async(req, res) => {
    try {
        const car = await cars.findById(req.params.id);
        if (car != null) {
            car.remove();
            res.status(200).json({ data: CAR_SUCCESSFULLY_REMOVED });
        } else {
            res.status(404).json({ message: UNABLE_TO_FIND_CAR });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
});

module.exports = router;