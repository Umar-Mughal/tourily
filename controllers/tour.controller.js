const fs = require('fs')

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../test-data/tour/all-tours.json`))

// Handlers
const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body)
    tours.push(newTour)

    fs.writeFile(`${__dirname}/test-data/tour/all-tours.json`, JSON.stringify(tours), (err) => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        });
    })
}

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
}

const getTour = (req, res) => {
    const { tour } = req
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
}

const updateTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '(Updated Tour Here)'
        }
    })
}

const deleteTour = (req, res) => {
    res.status(204).json({
        status: 'success',
        data: null
    })
}

// Middlewares
const checkIDMiddleware = (req, res, next) => {
    const tourId = req.params.id * 1
    const tour = tours.find(el => el.id === tourId);
    if(!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    req.tour = tour
    next();
}

const checkBodyMiddleware = (req, res, next) => {
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price'
        })
    }
    next();
}

module.exports = {
    createTour,
    getAllTours,
    getTour,
    updateTour,
    deleteTour,
    checkIDMiddleware,
    checkBodyMiddleware
}