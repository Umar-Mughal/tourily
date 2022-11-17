const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/test-data/data/tour-simple.json`))

// Create Tour
app.post('/api/v1/tours', (req, res) => {
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
})

// Get All Tours
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
})

// Get Tour
app.get('/api/v1/tours/:id', (req, res) => {
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
});


// Update Tour
app.patch('/api/v1/tours/:id', (req, res) => {

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
})
const port = 3000;

app.listen(port, () => {
    console.log(`App running on port ${port} ...`)
})