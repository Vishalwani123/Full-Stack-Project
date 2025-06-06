import React, { useEffect, useState } from 'react';
import { Spin, Table, message, Button } from 'antd';
import { useParams } from 'react-router-dom';
import { getBidsByCarId, updateBidStatus } from '../service/CustomerService';

function ManageBids() {
  const [bids, setBids] = useState([]);
  // const [loading, setLoading] = useState(false);
   const [isSpinning, setIsSpinning] = useState(false);
  // const [status, setStatus] = useState('PENDING');
  const { id } = useParams();

  useEffect(() => {
      const token = localStorage.getItem('token');
      fetchCar(token,id);
    },[id]);
  
    const fetchCar = async (token,id) => {
      try {
        console.log("The CarId is  "+ id);
        const response = await getBidsByCarId(token,id);
        console.log("The response inside api is "+ response);
        setBids(response);
        console.log("Response of getCarById"+response);
      } catch (err) {
        message.error('Failed to load car details');
      }
      finally {
          setIsSpinning(false);
      }
    };

    const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'green';
      case 'REJECTED':
        return 'blue';
      default:
        return 'red'; // for PENDING or unknown
    }
  };

const changeBookingStatus = async (bidId, status) => {
    setIsSpinning(true);
    try {
      const token = localStorage.getItem('token');
      await updateBidStatus(bidId, status, token);
      // setStatus(status1);
      message.success('Bid status changed successfully!');
      fetchCar(token,id);
    } catch (err) {
      message.error('Something went wrong');
    } finally {
      setIsSpinning(false);
    }
  };
  
  const columns = [
    {
      title: <span style={{ fontWeight: 'bolder', color: '#003973' }}>Car Name</span>,
      dataIndex: 'carName',
      key: 'carName',
    },
    {
      title: <span style={{ fontWeight: 'bolder', color: '#003973' }}>Car Brand</span>,
      dataIndex: 'carBrand',
      key: 'carBrand',
    },
    {
      title: <span style={{ fontWeight: 'bolder', color: '#003973' }}>Seller Name</span>,
      dataIndex: 'sellerName',
      key: 'sellerName',
    },
    {
      title: <span style={{ fontWeight: 'bolder', color: '#003973' }}>Buyer Name</span>,
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: <span style={{ fontWeight: 'bolder', color: '#003973' }}>Price</span>,
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: <span style={{ fontWeight: 'bolder', color: '#003973' }}>Status</span>,
      key: 'bidStatus',
       render: (_, record) => (
        <div>
          <td>
            {/* <strong style={{ color: getStatusColor(status) }}>
              {status}
            </strong> */}
            <strong style={{ color: getStatusColor(record.bidStatus) }}>
              {record.bidStatus}
            </strong>
          </td>
        </div>
        ),
    },
      {
      title: 'Action',
      key: 'action',
      render: (_, record) =>
        record.bidStatus === 'PENDING' && (
          <>
            <Button
              size="small"
              type="primary"
              onClick={() => changeBookingStatus(record.id, 'APPROVED')}
              style={{ marginRight: 10 }}
            >
              Approve
            </Button>
            <Button
              size="small"
              type="primary"
              danger
              onClick={() => changeBookingStatus(record.id, 'REJECTED')}
            >
              Reject
            </Button>
          </>
        ),
    },
  ];

  return (
    <Spin spinning={isSpinning} size="large" tip="Working...">
      <div style={{ padding: 20 }}>
        <Table
          dataSource={bids}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </div>
    </Spin>
  )
}

export default ManageBids 
