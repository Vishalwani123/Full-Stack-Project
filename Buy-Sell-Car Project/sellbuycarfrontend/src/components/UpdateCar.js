import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateACar, getCarById  } from '../service/CustomerService';
import { toast } from 'react-toastify';
import '../style/UpdateCar.css';

function UpdateCar() {
    const [formData, setFormData] = useState({ brand: '', name: '', type: '', transmission: '', color: '', year: '', price: 0, description:'', img: null, userId:0});
    const brands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD"];
    const types = ["Petrol", "Hybrid", "Dissel", "Electric", "CNG"];
    const transmissions = ["Manual", "Automatic"];
    const colors = ["Red", "White", "Blue", "Black","Orange","Grey","Silver"];
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();

     useEffect(() => {
        const fetchCar = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await getCarById(token, id);
                console.log("The data for Update form -  "+ res.brand);
                 console.log("The data for Update form -  "+ res.returnedImg);
                const car = res;
                setFormData({
                    brand: car.brand || '',
                    name: car.name || '',
                    type: car.type || '',
                    transmission: car.transmission || '',
                    color: car.color || '',
                    year: car.year ? car.year.slice(0, 10) : '',
                    price: car.price || 0,
                    description: car.description || '',
                    img: car.returnedImg || '', // Image can't be prefilled in file input
                    // imageUrl: car.returnedImg || '',
                    userId: car.userId || 0
                });
            } catch (err) {
                setError("Failed to fetch car details.");
            }
        };
        fetchCar();
    }, [id]);

    const handleChange = (e) => {
        // setFormData({...formData, [e.target.name]: e.target.value});
        // console.log("Value from input:", e.target.value);
        if (e.target.name === 'img' ) {
            // Save the first file from the input
            setFormData({...formData, img: e.target.files[0] });
        }
        else {
            setFormData({...formData, [e.target.name]: e.target.value});
        }
        
    };

     const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            formData.userId = userId;
            
            const formDataToSend = new FormData();
        
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }
            console.log("The FormData is --------"+formDataToSend);

            const res = await updateACar(id, formDataToSend, token);
            console.log("The response in update api --------"+res);

            toast.success(`Registration successful! You can now login.`, {autoClose: 800,hideProgressBar: true});
            setTimeout(() => navigate('/mycars'), 300);
        } catch (err) {
            toast.success(`Registration failed.`, {autoClose: 800, hideProgressBar: true});
            setError(err.response?.data || 'Registration failed');
        }
    };

    return (
    <>
       <div className="updateCar-container">
            <div className="form-container">
                <h2 className="heading">Update Car Details</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="image" className="input-label">Upload Image</label>
                        {/* <img
                          src={`data:image/jpeg;base64,${formData.img}`}
                          alt="Current car"
                          width="200"
                          style={{ marginBottom: '10px' }}
                        /> */}

                        <input 
                        type="file"
                        accept="image/*"
                        name="img"
                        onChange={handleChange}
                        required
                        className="input-field"
                        />
                    </div>
                    <div className="input-group">
                        <select
                            name="brand"
                            id="brand"
                            placeholder="Select your Brand Name"
                            value={formData.brand}
                            onChange={handleChange}
                            required
                        >
                            {brands.map((brand) => (
                            <option key={brand} value={brand}>
                                {brand.charAt(0) + brand.slice(1).toLowerCase()}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group">
                        <input 
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input-field"
                        />
                    </div>
                    <div className="input-group">
                        <select
                            name="type"
                            id="type"
                            placeholder="Select a Type"
                            value={formData.type}
                            onChange={handleChange}
                            required
                        >
                            {types.map((type) => (
                            <option key={type} value={type}>
                                {type.charAt(0) + type.slice(1).toLowerCase()}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group">
                        <select
                            name="transmission"
                            id="transmission"
                            placeholder="Select a Transmission"
                            value={formData.transmission}
                            onChange={handleChange}
                            required
                        >
                            {transmissions.map((transmission) => (
                            <option key={transmission} value={transmission}>
                                {transmission.charAt(0) + transmission.slice(1).toLowerCase()}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-group">
                        <select
                            name="color"
                            id="color"
                            placeholder="Select a Color"
                            value={formData.color}
                            onChange={handleChange}
                            required
                        >
                            {colors.map((color) => (
                            <option key={color} value={color}>
                                {color.charAt(0) + color.slice(1).toLowerCase()}
                            </option>
                            ))}
                        </select>
                    </div>
                   {/* <div className="input-group">
                        <input
                            type="date"
                            id='year'
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            required
                            className="input-field"
                            lang="en-CA" // forces yyyy-mm-dd display in most browsers
                        />
                    </div> */}
                    <div className="input-group">
                        <input 
                        type="date"
                        name="year"
                        placeholder="Date"
                        value={formData.year}
                        onChange={handleChange}
                        required
                        className="input-field"
                        />
                    </div>
                    <div className="input-group">
                        <input 
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="input-field"
                        />
                    </div>
                    <div className="input-group">
                        <input 
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="input-field"
                        />
                    </div>
                    <button type="submit" className="submit-button">Update Car</button>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                </form>
            </div>
        </div>
    </>
    )
}

export default UpdateCar
