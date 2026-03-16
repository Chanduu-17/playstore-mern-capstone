import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaBell, FaUserCircle, FaMoon, FaSun } from "react-icons/fa";
import { useState } from "react";

export default function NavbarMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(true);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = darkMode ? "#d2d2d2" : "#121212";
    document.body.style.color = darkMode ? "#000000" : "#d2d2d2";
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>

        <Navbar.Brand
          as={Link}
          to="/"
          style={{ fontWeight: 'bold', color: '#dacf09', fontSize: '22px' }}
        >
          Play Store
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            {user?.role === 'owner' && (
              <>
                <Nav.Link as={NavLink} to="/owner">Owner Dashboard</Nav.Link>
                <Nav.Link as={NavLink} to="/admin/users">Manage Users</Nav.Link>
              </>
            )}
          </Nav>

          <Nav className="align-items-start align-items-lg-center gap-3">

            {/* Notification */}
            {user && (
              <Nav.Link as={NavLink} to="/notifications">
                <FaBell size={26} color="#dacf09" />
              </Nav.Link>
            )}

            {/* Theme Toggle */}
            <Nav.Link onClick={toggleTheme} style={{ cursor: "pointer" }}>
              {darkMode ? <FaSun size={24} color="#dacf09" /> : <FaMoon size={24} />}
            </Nav.Link>

            {user ? (
              <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-2 text-white">
                <Nav.Link as={NavLink} to="/profile" className="d-flex align-items-center gap-2 px-0">
                  <FaUserCircle size={30} />
                  <span>{user.name} </span>
                </Nav.Link>
                <Button size="sm" variant="outline-light" onClick={handleLogout} className="ms-lg-3 mt-2 mt-lg-0">
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
              </>
            )}

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}




