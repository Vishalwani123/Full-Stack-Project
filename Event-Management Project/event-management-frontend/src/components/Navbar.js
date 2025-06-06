// import React, { useState  } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import '../components_Style/Navbar.css';

// function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const location = useLocation();

//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen);
//   };

//   const isActive = (path) => location.pathname === path;

//   return (
//     <nav className="navbar" role="navigation" aria-label="main navigation">
//       <div className="navbar-container">
//         <div className="navbar-left">
//           <Link className="brand" to="/" onClick={() => setMenuOpen(false)}>
//             EventManager
//           </Link>
//         </div>

//         <div className="navbar-right">
//           <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
//             <Link
//               to="/login"
//               className={`nav-link ${isActive('/login') ? 'active' : ''}`}
//               onClick={() => setMenuOpen(false)}
//             >
//               Login
//             </Link>
//             <Link
//               to="/register"
//               className={`nav-link ${isActive('/register') ? 'active' : ''}`}
//               onClick={() => setMenuOpen(false)}
//             >
//               Register
//             </Link>
//           </div>

//           <div
//             className="menu-toggle"
//             onClick={toggleMenu}
//             aria-label="Toggle menu"
//             aria-expanded={menuOpen}
//           >
//             <div style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></div>
//             <div style={{ opacity: menuOpen ? '0' : '1' }}></div>
//             <div style={{ transform: menuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none' }}></div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

//  export default Navbar;

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getTicket  } from '../services/bookingService';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import '../Style/Navbar.css';
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(false);
    const storedUser  = localStorage.getItem('user');
    const token  = localStorage.getItem('token');
    if (storedUser && token) {
      try {
        setUser (JSON.parse(storedUser ));
        const decodedToken = jwtDecode(token);
        console.log("Token is available --------------------------", decodedToken);
        if (decodedToken.userRole   && decodedToken.userRole  === 'ADMIN') {
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
    if (window.confirm("Are you sure you want to logout?")) {
      toast.info("Logout Successfull!", { autoClose: 500, hideProgressBar: true });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
      window.location.href = "/";
    }
  };

  const handleQRCode = async () => {
      try{

        const responseData = await getTicket();
        console.log("Response Data inside Navbar contain qrcode "+responseData);

        const qrCodeArray = responseData.flatMap(booking => 
          booking.qrCodes.map(qr => ({
            qrCode: qr,
            eventTitle: booking.eventTitle
          }))
        );

        navigate('/qrcode', { state: { qrCodeValues: qrCodeArray } });
      }
      catch(error){
        console.error("Error QRCode Getting :", error);
        alert("You don't Have Booked Ticket QRCode ");
      }
  } 

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="brand" to="/" onClick={() => setMenuOpen(false)}>
        <span className='SymbolDash'><i class="bi bi-house" title='DashBoard'></i> </span>
        </Link>
        <div className="navbar-left">
            Event Manager
        </div>

        <div className="navbar-right">
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {user ? (
               <>
               
               <span className="nav-link">Welcome, {user.username}</span>
              <Link 
                  
                  className={`navbarlogout''}`}
                  onClick={handleQRCode}
                > <span className='Symbol'><i class="bi bi-qr-code" title='QRCode'></i></span>
                  
                </Link>
                {isAdmin && (
                  <Link
                    to="/MakeEvent"
                    className={`nav-link ${isActive('/MakeEvent') ? 'active' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  > <span className='Symbol'> <i className="bi bi-house-add" title='Create Event'></i></span>
                    
                  </Link>
                )}
                <Link 
                  to="/"
                  className={`navbarlogout''}`}
                  onClick={handleLogout}
                > <span className='Symbol'><i class="bi bi-box-arrow-left" title='Logout'></i></span>
                  
                </Link>
               </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`nav-link ${isActive('/register') ? 'active' : ''}`}
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


