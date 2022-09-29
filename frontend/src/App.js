import React, { useState, useEffect } from 'react';
import './App.css';

function Cars() {

  const carFormInitialData = {
    id: "",
    brand: "",
    name: "",
    releaseYear: "",
    color: ""
  };

  const [carFormData, setCarFormData] = useState(carFormInitialData);
  const [carsData, setCarsData] = useState([]);

  const getCarsData = async () => {
    const response = await fetch("http://localhost:3001/list").then((res) => res.json());
    setCarsData(response);
  };
  useEffect(() => {
    getCarsData()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarFormData({
      ...carFormData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {

    event.preventDefault();

    const response = await fetch("http://localhost:3001/post", {
      method: "POST",
      body: JSON.stringify({
        id: event.target.id.value,
        brand: event.target.brand.value,
        name: event.target.name.value,
        releaseYear: event.target.releaseYear.value,
        color: event.target.color.value,
      }),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      return res.json()
    });
    setCarsData(response);
    setCarFormData(carFormInitialData);
  };

  // const handleDelete = (id) => {

  //   const result = carsData.filter((car) => car.id !== id);
  //   setCarsData(result);
  // }

  const handleDelete = async (event) => {
    event.preventDefault();

    let response = await fetch("http://localhost:3001/delete", {
      method: "DELETE",
      body: JSON.stringify({
        id: event.target.parentElement.id,
      }),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
    setCarsData(response);
  };

  /** 🥳🥳🥳🥳🥳🥳 DOUBLE BONUS POINTS 🥳🥳🥳🥳🥳🥳 */
  // const handleEdit = () => {
  /**
   * When clicked on a edit button figure out a way to edit the car data.
   * Once edited send the updated data to NodeJS.
   * Then use javascript fetch to send DELETE request to NodeJS
   * https://openjavascript.info/2022/01/03/using-fetch-to-make-get-post-put-and-delete-requests/
   */
  // }

  return (
    <div className='cars-from-wrapper'>

      <form id="cars-form" onSubmit={handleSubmit} autoComplete="off">
        <label>
          ID:
          <input name='id' type="text" value={carFormData.id} onChange={handleInputChange} />
        </label>

        <label>
          Brand:
          <input name='brand' type="text" value={carFormData.brand} onChange={handleInputChange} />
        </label>

        <label>
          Name:
          <input name='name' type="text" value={carFormData.name} onChange={handleInputChange} />
        </label>

        <label>
          Release Year:
          <input name='releaseYear' type="text" value={carFormData.releaseYear} onChange={handleInputChange} />
        </label>

        <label>
          Color:
          <input name='color' type="text" value={carFormData.color} onChange={handleInputChange} />
        </label>

        <input type="submit" value="Submit" />
      </form>

      <p>ID:{carFormData.id},
        Brand:{carFormData.brand},
        Name:{carFormData.name},
        Release Year:{carFormData.releaseYear},
        Color:{carFormData.color}</p>

      <h2>Cars Data</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Brand</th>
            <th>Name</th>
            <th>Release Year</th>
            <th>Color</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>

          {carsData.map((car) => {
            return (
              <>
                <tr>
                  <td>{car.id}</td>
                  <td>{car.brand}</td>
                  <td>{car.name}</td>
                  <td>{car.releaseYear}</td>
                  <td>{car.color}</td>
                  <td id={car.id}><button onClick={handleDelete}>🗑</button></td>
                  <td>✎</td>
                </tr>
              </>);
          })}

        </tbody>
      </table>
    </div>
  );
}

export default Cars;