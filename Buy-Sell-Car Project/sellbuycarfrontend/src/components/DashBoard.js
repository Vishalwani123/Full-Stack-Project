import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { getAllCars } from '../service/CustomerService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../style/DashBoard.css'; 

function DashBoard() {

  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const cars = await getAllCars();
      console.log("The Cars Object getting from Normal DashBoard---"+cars)
      setCars(cars);

      if (token) {
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error('Error fetching data', err);
    }
  };

  fetchData();
}, []);

const handleView = (id) => {
    if (isAuthenticated) {
      navigate(`/customer/car/${id}/book`); 
    } else {
      toast.success(`Login to continue`, {autoClose: 800,});
      setTimeout(() => navigate('/login'), 300);
    }
  };
  return (

    <>
      <div className='dashboardcontainer'>

        <div style={{ marginTop: '10px' }}>
          {cars.map((car) => (
            <div className="child" key={car.id}>
              <Row>
                <Col span={8}>
                  <img
                    className="dashprofile"
                    src={`data:image/jpeg;base64,${car.returnedImg}`}
                    alt="profile"
                  />
                </Col>
                <Col span={16}>
                  <h2 style={{ cursor: 'pointer', color: '#108ee9' }}>
                    {car.brand} {car.name}
                  </h2>
                  <p>{car.description}</p>
                  <hr />
                  {/* <h5>
                    Price: ₹ {car.price} | Color: {car.color} | Transmission:{' '}
                    {car.transmission} | Type: {car.type} | Year:{' '} 
                    {new Date(car.year).getFullYear()}
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
                  <div style={{ float: 'right' }}>
                    {!car.sold ? (
                      <Button size="small" type="primary" onClick={() => handleView(car.id)}>
                        Bid
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        danger
                        type="primary"
                        style={{ marginLeft: '5px' }}
                        icon={<CheckCircleOutlined />}
                      >
                        Sold
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          ))}
        </div>
      </div>
    </>

  )
}

export default DashBoard
