import React, { useEffect, useState } from 'react';
import { Spin, Table, message } from 'antd';
import { fetchMyBids} from '../service/CustomerService';

function MyBids() {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
      const fetchData = async () => {
        try {
          const token = localStorage.getItem('token');
          const userId = localStorage.getItem('userId');
          const response = await fetchMyBids(userId, token);
          console.log('Bids Response:', response.data);
          setBids(response);
        } catch (err) {
          message.error('Failed to load bids');
        } finally {
          setLoading(false);
        }
      };
    
      fetchData();
    }, [userId]);

    console.log("Bids Array value is -> "+bids);

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
  ];

  return (
    <Spin spinning={loading} size="large" tip="Working...">
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

export default MyBids
