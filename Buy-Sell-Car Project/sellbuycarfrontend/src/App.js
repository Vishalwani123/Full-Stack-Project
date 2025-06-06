import RegisterPage from "./components/RegisterPage";
import DashBoard from "./components/DashBoard";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import LoginPage from "./components/LoginPage";
import CustomerDashboard from "./components/CustomerDashboard";
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'react-toastify/dist/ReactToastify.css';
import PostCar from "./components/PostCar";
import MyCars from "./components/MyCars";
import MyBids from "./components/MyBids";
import Search from "./components/Search";
import UpdateCar from "./components/UpdateCar";
import BookCar from "./components/BookCar";
import ManageBids from "./components/ManageBids";


function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
        <Route path="/postCar" element={<PostCar />} />
        <Route path="/mycars" element={<MyCars />} />
        <Route path="/mybids" element={<MyBids />} />
        <Route path="/search" element={<Search />} />
        <Route path="/manageBids/:id" element={<ManageBids />} />
        <Route path="/updateCar/:id" element={<UpdateCar />} />
        <Route path="/customer/car/:id/book" element={<BookCar />} />
      </Routes>
    </Router>
  );
}

export default App;
