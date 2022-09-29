const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let carsMockData = [
    {
        "id": 1,
        "brand": "Hyundai",
        "name": "Ioniq",
        "releaseYear": 2017,
        "color": "blue"
    },
    {
        "id": 2,
        "brand": "Toyota",
        "name": "Prius",
        "releaseYear": 2007,
        "color": "blue"
    },
]

/** Create GET API. API shoudl return  const carsMockData*/

app.get('/list', (req, res) => {
    res.json(carsMockData);
});

/** Create POST API. Get the new car data from react. 
 *      Check if car with id exists. If Yes return 500. With message 'Car already exists'
 *      If there is no car with the id, add the new car to  carsMockData and return carsMockData as response */

app.post('/post', (req, res) => {

    const { id, brand, name, releaseYear, color } = req.body;
    const newCar = { id, brand, name, releaseYear, color };

    for (let i = 0; i < carsMockData.length; i++) {
        if (carsMockData[i].id === id) {
            res.status(500).send("Car already exists");
            return;
        }
    }
    carsMockData = [...carsMockData, newCar];
    res.json(carsMockData);
});

/** Create Delete API. 
 *  Check if car with id exists. If No return 500. With message 'No car with give id exists'
 *  If there is car with the requested id. Delete that car from 'carsMockData' and return 'carsMockData'
*/

app.delete('/delete', (req, res) => {
    let id = req.body.id;
    let updatedCarsMockData = carsMockData.filter((car) => car.id !== id);
    if (updatedCarsMockData.length === carsMockData) {
        res.status(500).send("No car with give id exists")
    } else {
        carsMockData = updatedCarsMockData;
        res.send(carsMockData);
    }
});

/** Create PUT API. 
 *  Check if car with id exists. If No return 500 with error 'No car with given id exist'. 
 *  If there is car with the requested id, update that car's data in 'carsMockData' and return 'carsMockData' */

app.put('/edit', (req, res) => {
    let id = req.body.id;
    let brand = req.body.brand;
    let name = req.body.name;
    let releaseYear = req.body.releaseYear;
    let color = req.body.color;

    for (let i = 0; i < carsMockData.length; i++) {
        if (carsMockData[i].id === id) {

            carsMockData[i].id = id || carsMockData[i].id,
                carsMockData[i].brand = brand || carsMockData[i].brand,
                carsMockData[i].name = name || carsMockData[i].name,
                carsMockData[i].releaseYear = releaseYear || carsMockData[i].releaseYear,
                carsMockData[i].color = color || carsMockData[i].color
        }

    }
    res.json(carsMockData);
});

app.listen(3001)