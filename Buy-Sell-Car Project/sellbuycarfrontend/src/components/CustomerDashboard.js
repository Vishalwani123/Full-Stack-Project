import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { getAllCars, getAnalytics } from '../service/CustomerService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../style/CustomerDashboard.css';
function CustomerDashboard() {

  // const { id } = useParams();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [cars, setCars] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const cars = await getAllCars();
      setCars(cars);
      const analytics = await getAnalytics(userId, token);
      setAnalytics(analytics);

      if (token) {
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error('Error fetching data', err);
    }
  };

  fetchData();
}, [userId]);

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
      <div className='custdbcontainer'>
        <div style={{ paddingTop: '10px' }}></div>

        {analytics && (
          <Card className='custCard'>
             <div className="cust-data-wrapper">
                <Card.Grid className='custDataCard'>
                  <h3>Total Posted Cars</h3>
                  <h1>{analytics.totalCars}</h1>
                </Card.Grid>
                <Card.Grid className='custDataCard'>
                  <h3>Total Sold Cars</h3>
                  <h1>{analytics.soldCars}</h1>
                </Card.Grid>
             </div>
          </Card>
        )}

        <div style={{ marginTop: '10px' }}>
          {cars.map((car) => (
            <div className="child" key={car.id}>
              <Row>
                <Col span={8}>
                  <img
                    className="profile"
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
                    Price: ₹ {car.price} Color: {car.color} - Transmission:{' '}
                    {car.transmission} Type: {car.type} - Year:{' '}
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

export default CustomerDashboard
