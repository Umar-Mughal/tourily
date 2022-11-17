const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    console.log("Hello from the middleware!!!");
    next()
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/test-data/data/tour-simple.json`))

const createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body)
    tours.push(newTour)

    fs.writeFile(`${__dirname}/test-data/data/tour-simple.json`, JSON.stringify(tours), (err) => {
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
    const tourId = req.params.id * 1
    const tour = tours.find(el => el.id === tourId);

    if(!tour) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    });
}

const updateTour = (req, res) => {

    if(req.params.id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '(Updated Tour Here)'
        }
    })
}

const deleteTour = (req, res) => {
    if(req.params.id > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }

    res.status(204).json({
        status: 'success',
        data: null
    })
}

app.route('/api/v1/tours').get(getAllTours).post(createTour)
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour)

// Run Server
const port = 3000;
app.listen(port, () => {
    console.log(`App running on port ${port} ...`)
})