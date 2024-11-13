import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { LucidePlane, LucideHome, LucideUser, LucideFacebook, LucideTwitter, LucideInstagram } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import DestinationsSearchInput from "./Destinations/DestinationsSearchInput";
import useSession from "../../hooks/useSession";

const NavBar = ({ setShowApproved, onSearch, showApproved }) => {
  const session = useSession();  
  const userId = session ? session.userId : null;
  const role = session ? session.role : null;
  const location = useLocation()

  const handleLogOut = () => {
    localStorage.removeItem("Authorization");
    window.location.href = "/";
  };

  const isAdmin = role ? role === "admin" : false;

  return (
    <Navbar bg="light" variant="light" expand="lg" sticky="top" className="shadow-sm">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center text-primary">
          <LucidePlane size={28} className="me-2" /> TravelDest
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto d-flex align-items-center justify-content-center">
            <Nav.Link as={Link} to="/" className="text-dark">
              <LucideHome size={20} className="me-1" /> Home
            </Nav.Link>

            {!isAdmin && (
             <NavDropdown title={<span><LucidePlane size={20} className="me-1" /> Destinazioni</span>} id="destinations-dropdown">
             <NavDropdown.Item as={Link} to="/create-new-destination"> Crea una nuova destinazione</NavDropdown.Item>              
           </NavDropdown>
            )}
            
            {isAdmin && (
              <NavDropdown title={<span><LucidePlane size={20} className="me-1" /> Destinazioni</span>} id="destinations-dropdown">
                <NavDropdown.Item as={Link} to="/destinations" onClick={() => setShowApproved(true)}>Destinazioni approvate</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/destinations" onClick={() => setShowApproved(false)}>Destinazioni non approvate</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/create-new-destination"> Crea una nuova destinazione</NavDropdown.Item>              
              </NavDropdown>
            )}

            {!session && (
              <Nav.Link as={Link} to="/login" className="text-dark">
                Login
              </Nav.Link>
            )}

            {!isAdmin && (
              <Nav.Link as={Link} to="/contatti" className="text-dark">
                Contatti
              </Nav.Link>
            )}

            {session && !isAdmin && (
              <NavDropdown title={<span><LucideUser size={20} className="me-1 text-dark" /> Profilo</span>} id="profile-dropdown">
                <NavDropdown.Item as={Link} to={`/users/${userId}`}>Il mio profilo</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/reviews-list">Le mie recensioni</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/favourite-destinations">Le mie destinazioni preferite</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogOut}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}

            {session && isAdmin && (
              <NavDropdown title={<span><LucideUser size={20} className="me-1 text-dark" /> Profilo</span>} id="profile-dropdown">
                <NavDropdown.Item as={Link} to={`/users/${userId}`}>Il mio profilo</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogOut}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}

            {!session && (
              <Nav.Link as={Link} to="/create-new-users" className="text-dark">
                Registrati
              </Nav.Link>
            )}

            {(location.pathname === "/" || location.pathname === "/destinations") &&  (<DestinationsSearchInput 
              onSearch={onSearch} 
            />)}
          </Nav>

          <Nav className="ms-3 d-flex align-items-center">
            <Nav.Link href="https://facebook.com" className="text-primary">
              <LucideFacebook size={20} />
            </Nav.Link>
            <Nav.Link href="https://twitter.com" className="text-primary">
              <LucideTwitter size={20} />
            </Nav.Link>
            <Nav.Link href="https://instagram.com" className="text-primary">
              <LucideInstagram size={20} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
