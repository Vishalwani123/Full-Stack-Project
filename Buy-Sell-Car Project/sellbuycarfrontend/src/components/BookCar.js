import React, { useEffect, useState } from 'react';
import { InputNumber, Spin, Button, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById, bidACar } from '../service/CustomerService'; // Adjust path
import { toast } from 'react-toastify';
import '../style/BookCar.css'; // External CSS same as your SCSS

function BookCar() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [price, setPrice] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetchCar(token,id);
  },[id]);

  const fetchCar = async (token,id) => {
    try {
      const res = await getCarById(token,id);
      console.log("Response of getCarById"+res);
      setCar(res);
    } catch (err) {
      message.error('Failed to load car details');
    }
  };

  const handleBid = async () => {
    if (!price) {
      message.error('Please enter a bid price');
      return;
    }

    setIsSpinning(true);
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    const obj = {
      price,
      userId,
      carId: id,
    };

    try {
      const res = await bidACar(token, obj);
      console.log("Response of bidACar "+res);
      toast.success(`Bid Successfull`, {autoClose: 800, hideProgressBar: true});
      navigate('/dashboard');
    } catch (err) {
      toast.error(`Bid Cancel`, {autoClose: 800, hideProgressBar: true});
    } finally {
      setIsSpinning(false);
    }
  };

  return (
    
     <div style={{ backgroundColor: '#F8F8F8', minHeight: '91vh' }}>
      <div style={{ paddingTop: '10px' }}></div>

      {car && (
        <div style={{ marginTop: '10px' }} className="child">
          <div className="row" style={{ display: 'flex', gap: '20px' }}>
            <div style={{ flex: 1 }}>
              <img
                className="profile"
                style={{ height: '130px', width: '200px', borderRadius: '10px' }}
                src={`data:image/jpeg;base64,${car.returnedImg}`}
                alt="car"
              />
            </div>
            <div style={{ flex: 2 }}>
              <h2 style={{ cursor: 'pointer', color: '#108ee9' }}>
                {car.brand} {car.name}
              </h2>
              <p>{car.description}</p>
              <hr />
              <h5>
                Price: <b>${car.price}</b> Color: <b>{car.color}</b> - Transmission:{' '}
                <b>{car.transmission}</b> Type: <b>{car.type}</b> - Year:{' '}
                <b>{new Date(car.year).getFullYear()}</b>
              </h5>
              <hr />
            </div>
          </div>
        </div>
      )}

      <Spin spinning={isSpinning} size="large" tip="Working..." style={{ marginTop: '50px' }}>
        <div className="child" style={{ textAlign: 'center' }}>
          <div>
            <label style={{ fontWeight: 'bold' }}>Your Bid</label>
            <InputNumber
              style={{ width: '100%' }}
              min={1}
              step={1}
              value={price}
              onChange={(value) => setPrice(value)}
            />
            <div style={{ marginTop: '15px' }}>
              <Button type="primary" className="filterBtn" onClick={handleBid}>
                Bid on Car
              </Button>
            </div>
          </div>
        </div>
      </Spin>
    </div>
  )
}

export default BookCar
