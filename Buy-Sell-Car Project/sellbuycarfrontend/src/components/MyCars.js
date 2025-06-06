import React, { useEffect, useState } from 'react';
import { getMyCars, deleteCar } from '../service/CustomerService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../style/myCars.css';

function MyCars() {
  const [cars, setCars] = useState([]);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const cars = await getMyCars(userId,token);
        setCars(cars);
      } catch (err) {
        console.error('Error fetching data', err);
      }
    };
  
    fetchData();
  }, [userId]);

  const handleManageBids =  (id) => {
    navigate(`/manageBids/${id}`)
  };
  const handleUpdateBids =  (id) => {
    navigate(`/updateCar/${id}`)
  };

  const deleteACar = async (id) => {
    const token = localStorage.getItem('token');
    if (window.confirm("Are you sure you want to delete this car?")) {
      try {
          await deleteCar(token, id);
          setCars((prevCars) => prevCars.filter((car) => car.id !== id));
          toast.info("Delete successful!", { autoClose: 500, hideProgressBar: true });
        } 
        catch (err) {
          console.error("Delete failed", err);
          toast.error("Delete failed!", { autoClose: 500, hideProgressBar: true });
        }
    }
  };

  return (

    <div className="my-cars-container">
      {cars.map((car) => (
        <div className="mycar-card" key={car.id}>
          <div className="car-image">
            <img
              src={`data:image/jpeg;base64,${car.returnedImg}`}
              alt="Car"
              className="mycar-thumbnail"
            />
          </div>
          <div className="car-details">
            <h2 className="car-title" >
              {car.brand} {car.name}
            </h2>
            <p>{car.description}</p>
            <hr />
            {/* <h5>
              Price: <b>${car.price}</b> &nbsp;
              Color: <b>{car.color}</b> - Transmission:
              <b> {car.transmission}</b> - Type: <b>{car.type}</b> - Year:{' '}
              <b>{new Date(car.year).getFullYear()}</b>
            </h5> */}
            <h5>
              <span className="car-key">Price:</span>{' '}
              <span className="car-value">₹ {car.price}</span> |{' '}
              <span className="car-key">Color:</span>{' '}
              <span className="car-value">{car.color}</span> |{' '}
              <span className="car-key">Transmission:</span>{' '}
              <span className="car-value">{car.transmission}</span> |{' '}
              <span className="car-key">Type:</span>{' '}
              <span className="car-value">{car.type}</span> |{' '}
              <span className="car-key">Year:</span>{' '}
              <span className="car-value">{new Date(car.year).getFullYear()}</span>
            </h5>
            <hr />
            <div className="car-actions">
              {car.sold && (
                <button className="danger">Sold</button>
              )}
              <button
                className="primary" onClick={() => handleManageBids(car.id)}
              >
                Manage Bids
              </button>
              <button
                className="primary" onClick={() => handleUpdateBids((car.id))}
              >
                Update
              </button>
              <button
                className="danger" 
                onClick={() => deleteACar(car.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyCars
