
import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../Style/QRCodePage.css';

const QRCodePage = () => {
  const location = useLocation();
  const { qrCodeValues, eventTitles  } = location.state || {};
  console.log("Event Title in QRCode Page ");
  if (!qrCodeValues || qrCodeValues.length === 0) {
    toast.error("Book Ticket First!", { toastId: 'book-ticket-error', hideProgressBar: true, autoClose: 800 });
  }
  toast.info("Booked Ticket", { toastId: 'book-ticket-info', hideProgressBar: true, autoClose: 800 });
  return (

    <div className="qr-code-container">
      <h2 className="qr-code-title">Booked QR Codes</h2>
      <div className="qr-code-list">
        {qrCodeValues.map((item, index) => (
        <div key={index} className="qr-code-item" tabIndex={0}>
            <h3>{eventTitles}</h3>
            <h3>{item.eventTitle}</h3>
            <QRCodeCanvas
              className="qr-code-canvas"
              value={item.qrCode}
              size={160}
              bgColor="#ffffff"
              fgColor="#2a2a72"
              level="H"
              includeMargin={true}
              title={item.qrCode}
            />
        </div>
      ))}
      </div>
    </div>
  );
};

export default QRCodePage;

