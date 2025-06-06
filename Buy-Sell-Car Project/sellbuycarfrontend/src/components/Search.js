import React, { useState  } from 'react';
import { toast } from 'react-toastify';
import { searchCar } from '../service/CustomerService';
import '../style/search.css';

function Search() {
  const [formData, setFormData] = useState({ brand: '', type: '', transmission: '', color: ''});
  const brands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD"];
  const types = ["Petrol", "Hybrid", "Dissel", "Electric", "CNG"];
  const transmissions = ["Manual", "Automatic"];
  const colors = ["Red", "White", "Blue", "Black","Orange","Grey","Silver"];
  const [cars, setCars] = useState([]);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
          e.preventDefault();
          try {
              const token = localStorage.getItem('token');
              
              const cars = await searchCar(formData, token);
              
              if(!cars || cars.length === 0){
                throw new Error("No Result found");
              }
              console.log("The Search Data "+cars);
              setCars(cars);
              toast.success(`Result found .`, {autoClose: 800,hideProgressBar: true});
          } catch (err) {
              toast.error(`No Result found.`, {autoClose: 800, hideProgressBar: true});
          }
      };

  return (
    <>
    
        <form onSubmit={handleSubmit} className="search-bar">
          <div className="search-field">
            <label htmlFor="brand" className="label">Brand</label>
            <select
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="select-input"
            >
              <option value="" disabled>Choose brand</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="search-field">
            <label htmlFor="type" className="label">Type</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="select-input"
            >
              <option value="" disabled>Choose type</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="search-field">
            <label htmlFor="transmission" className="label">Transmission</label>
            <select
              id="transmission"
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              className="select-input"
            >
              <option value="" disabled>Choose transmission</option>
              {transmissions.map((trans) => (
                <option key={trans} value={trans}>
                  {trans.charAt(0).toUpperCase() + trans.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="search-field">
            <label htmlFor="color" className="label">Color</label>
            <select
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="select-input"
            >
              <option value="" disabled>Choose color</option>
              {colors.map((color) => (
                <option key={color} value={color}>
                  {color.charAt(0).toUpperCase() + color.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="search-button">Search</button>
    </form>

      <div className="my-cars-container">
            {cars.map((car) => (
              <div className="searchcar-card" key={car.id}>
                <div className="car-image">
                  <img
                    src={`data:image/jpeg;base64,${car.returnedImg}`}
                    alt="Car"
                    className="car-thumbnail"
                  />
                </div>
                <div className="car-details">
                  <h2 className="car-title" >
                    {car.brand} {car.name}
                  </h2>
                  <p>{car.description}</p>
                  <hr />
                  {/* <h5>
                    Price: <b>₹ {car.price}</b> &nbsp;
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
                  {/* <div className="car-actions">
                    {car.sold && (
                      <button className="btn btn-danger btn-sm">Sold</button>
                    )}
                    <button
                      className="btn btn-primary btn-sm"
                    >
                      Manage Bids
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteCar(car.id)}
                    >
                      Delete
                    </button>
                  </div> */}
                </div>
              </div>
            ))}
          </div>
    </>
     
  )
}

export default Search



