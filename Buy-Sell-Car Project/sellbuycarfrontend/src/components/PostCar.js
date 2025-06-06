import React, { useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import { postCar } from '../service/CustomerService';
import { toast } from 'react-toastify';
import '../style/PostCar.css';
function PostCar() {
    const [formData, setFormData] = useState({ brand: '', name: '', type: '', transmission: '', color: '', year: '', price: 0, description:'', img: null, userId:0});
    const brands = ["BMW", "AUDI", "FERRARI", "TESLA", "VOLVO", "TOYOTA", "HONDA", "FORD"];
    const types = ["Petrol", "Hybrid", "Dissel", "Electric", "CNG"];
    const transmissions = ["Manual", "Automatic"];
    const colors = ["Red", "White", "Blue", "Black","Orange","Grey","Silver"];
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    // const location = useLocation();
    const navigate = useNavigate();

    const handleChange = (e) => {
        // setFormData({...formData, [e.target.name]: e.target.value});
        // console.log("Value from input:", e.target.value);
        if (e.target.name === 'img') {
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
            await postCar(formDataToSend, token);
            toast.success(`Registration successful! You can now login.`, {autoClose: 800,hideProgressBar: true});
            setTimeout(() => navigate('/mycars'), 300);
        } catch (err) {
            toast.success(`Registration failed.`, {autoClose: 800, hideProgressBar: true});
            setError(err.response?.data || 'Registration failed');
        }
    };

    return (
    <>
       <div className="postCar-container">
            <div className="form-container">
                <h2 className="heading"> Post Car </h2>
                <form onSubmit={handleSubmit} className='car-form'> 
                    <div className="input-group">
                        <label htmlFor="image" className="input-label">Upload Image</label>
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
                            <option value="" disabled>Select your Brand Name</option>
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
                            <option value="" disabled>Select your Type</option>
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
                            <option value="" disabled>Select your Car Transmission</option>
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
                            <option value="" disabled>Select your Car Color</option>
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
                    <button type="submit" className="submit-button">Post Car</button>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                </form>
            </div>
        </div>
    </>
    )
}

export default PostCar
