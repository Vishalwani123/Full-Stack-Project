import { useState } from 'react';
import { checkInWithQR } from '../services/qrCheckinService';

function QRScanner() {
  const [result, setResult] = useState('');

  const handleScan = async (e) => {
    const code = prompt("Simulate QR Code Input:"); // Simulate scan input
    if (code) {
      try {
        const response = await checkInWithQR(code);
        console.log("Check-in done");
        setResult(response.message);
      } catch (err) {
        console.log("Check-in Failed");
        setResult("Check-in failed");
      }
    }
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-dark mb-3" onClick={handleScan}>Scan QR Code</button>
      <p>{result}</p>
    </div>
  );
}

export default QRScanner;