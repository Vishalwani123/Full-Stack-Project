import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../style/Navbar.css';


function Navbar() {
  // const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated , setIsAuthenticated ] = useState(false);
  const [open , setOpen ] = useState(false);
  const [username, setUsername] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    setUsername(userName);

    if(token){
      const userId = localStorage.getItem('userId');
      setUser(JSON.parse(userId));
      setIsAuthenticated(true);
    }
    else{
      setUser(null);
    }
    
  }, [location]);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      toast.info("Logout Successfull!", { autoClose: 500, hideProgressBar: true });
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      setUser(null);
      navigate('/')
    }
  };

  const handleLinkClick = () => {
    setOpen(false); 
  };

  return (
     <nav className="custom-navbar">
        <div className="nav-left">
          {/* <Link to="/" className="icon-link" title="Home">
            <span className='SymbolDash'><i class="bi bi-house" title='DashBoard'></i> </span>
          </Link> */}
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="icon-link" onClick={handleLinkClick} title="Home">
            <span className="SymbolDash">
              <i className="bi bi-house" title="Dashboard"></i>
            </span>
          </Link>
        </div>  

        <div className="nav-center">
          <span className="app-name">Buy-Sell Car Service</span>
        </div>

        <div className="nav-right">
          {/* <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Signup</Link> */}

            <div className={`nav-links`}>
            {user ? (
                <>
                
                <span className="navbar-link">Welcome,  <span className="username">{username}</span></span>
                
                    <div className="menu-container">
                      <div className={`${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
                        <i className="bi bi-menu-down" title='Menu'></i>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                      </div>

                      <div className={`dropdown ${open ? 'show' : ''}`}>

                        <Link
                          to="/postCar"
                          className={`nav-link`}
                          onClick={handleLinkClick}
                        > 
                        <i className="bi bi-file-earmark-plus me-2"></i> <span className='dropdownSymbol'> Post Car </span>
                        </Link>

                        <Link
                          to="/mycars"
                          className={`nav-link`}
                          onClick={handleLinkClick}
                        > 
                        <i class="bi bi-car-front"></i> <span className='dropdownSymbol'> My Cars </span>
                        </Link>

                        <Link
                          to="/mybids"
                          className={`nav-link`}
                          onClick={handleLinkClick}
                        > 
                        <i class="bi bi-cart3"></i> <span className='dropdownSymbol'> My Bids </span>
                        </Link>

                        <Link
                          to="/search"
                          className={`nav-link`}
                          onClick={handleLinkClick}
                        > 
                        <i class="bi bi-search"></i> <span className='dropdownSymbol'> Search Car </span>
                        </Link>

                      </div>
                    </div>
                
                  <Link 
                    to="/"
                    className={`navbarlogout''}`}
                    onClick={handleLogout}
                  > <span className='Symbol'><i class="bi bi-box-arrow-left" title='Logout'></i></span>
                    
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className={`nav-link ${isActive('/login') ? "active" : ""}`} >
                    Login
                  </Link>
                  <Link to="/register" className={`nav-link ${isActive('/login') ? "active" : ""}'}`} >
                    Register
                  </Link>
                </>
              )}
            </div>
        </div>
    </nav>
  )
}

export default Navbar;
