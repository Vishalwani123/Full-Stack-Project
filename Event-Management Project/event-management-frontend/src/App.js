import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import MakeEvent from './pages/MakeEvent';
import EventDetailsPage from './pages/EventDetailsPage';
import BookTicketPage from './pages/BookTicketPage';
import AdminPanel from './pages/AdminPanel';
import Navbar from './components/Navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UpdateEvent from "./pages/UpdateEvent";
import QRCodePage from "./pages/QRCodePage";
import 'bootstrap-icons/font/bootstrap-icons.css';
import QRScanner from "./components/QRScanner";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/MakeEvent" element={<MakeEvent />} />
        <Route path="/UpdateEvent" element={<UpdateEvent />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/event/:id" element={<EventDetailsPage />} />
        <Route path="/book/:id" element={<BookTicketPage />} />
        <Route path="/qrcode" element={<QRCodePage  />} />
        <Route path="/qrscan" element={<QRScanner  />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;