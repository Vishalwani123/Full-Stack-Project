import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getTicket  } from '../services/bookingService';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import '../Style/Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [open , setOpen ] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setUserId(localStorage.getItem('userId'));
    setIsAdmin(false);
    const storedUser  = localStorage.getItem('userName');
    const token  = localStorage.getItem('token');
    console.log("User -- ", storedUser);
    setOpen(false);
    if (storedUser && token) {
      try {
        setUser(storedUser);
        const decodedToken = jwtDecode(token);

        const role = decodedToken.sub.split(":").pop();
        console.log("userRole -- ", decodedToken)
        if (role  && role  === 'ADMIN') {
            console.log("I am in isAdmin true part")
            setIsAdmin(true);
        } else {
            console.log('You do not have permission to create an event.');
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        localStorage.removeItem('user');
      }
    }
    else {
    console.log("Token or user not available yet");
  }
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Logout",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      toast.info("Logout Successful!", { autoClose: 800, hideProgressBar: true });
      window.location.href = "/";
    }
  });
  };

  const handleQRCode = async () => {
      try{
        const responseData = await getTicket();

        const qrCodeArray = responseData.flatMap(booking => 
          booking.qrCodes.map(qr => ({
            qrCode: qr,
            eventTitle: booking.eventTitle
          }))
        );

        if(qrCodeArray.length !== 0){
          navigate('/qrcode', { state: { qrCodeValues: qrCodeArray } });
        }
        else{
          toast.warning("No QR Codes available!", { autoClose: 800, hideProgressBar: true });
        }
        
      }
      catch(error){
        console.log("End ");
        toast.error("You have not booked a Event.", {autoClose: 800});
      }
  }

  return (
    <nav className="customNavbar">
      <div className="customNavbar-container">
        <Link className="brand" to="/" onClick={() => setMenuOpen(false)}>
          <span className='customSymbolDash'><i class="bi bi-house" title='DashBoard'></i> </span>
        </Link>
        <div className="customNavbar-left">
            Event Application
        </div>

        <div className="customNavbar-right">
          <div className={`customNav-links ${menuOpen ? 'open' : ''}`}>
            {user ? (
               <>
               
               <span className="customNav-link">Welcome, {user}</span>

               <div className="menu-container">
                  <div className={`${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
                    <i className="bi bi-menu-down" title='Menu'></i>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                  </div>

                  <div className={`dropdown ${open ? 'show' : ''}`}>
                    <Link 
                        className={`customDrop-link`}
                        onClick={handleQRCode}
                      > 
                      <i className="bi bi-qr-code" title='QRCode'></i> <span> QR-Code</span>
                    </Link>
                    {isAdmin && (
                    <Link
                          to="/MakeEvent"
                          className={`customDrop-link`}
                          onClick={() => setMenuOpen(false)}
                        > <span className='symbol'><i className="bi bi-house-add" title='Create Event'></i> </span> <span> Create-Event</span>
                          
                    </Link>
                      )}
                    {isAdmin && 
                    <Link
                        to={`/yourEvents/${userId}`}
                        className={`customDrop-link`}
                        onClick={() => setMenuOpen(false)}
                      > <i class="bi bi-calendar2-event" title='Your Events'></i> <span> Your Events </span>
                        
                    </Link>
                    }
                    <Link 
                        to="/"
                        className={`customDrop-logout-link`}
                        onClick={handleLogout}
                      > <i className="bi bi-box-arrow-left" title='Logout'></i> <span> Logout</span>
                    </Link>
                  </div>
               </div>
               
            </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`customNav-link ${isActive('/login') ? 'active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`customNav-link ${isActive('/register') ? 'active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          <div
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <div style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></div>
            <div style={{ opacity: menuOpen ? '0' : '1' }}></div>
            <div style={{ transform: menuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none' }}></div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;