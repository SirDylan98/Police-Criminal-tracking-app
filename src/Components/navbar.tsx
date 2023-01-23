import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function NavbarBs() {
  const auth = getAuth();
  const navigate = useNavigate();
  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
        <a className="navbar-brand" href="#">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxNiIe3uPgRuWs_PDnWYxqatTjaK1hKqe5TOqY0M0&s"
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt=""
          />
        <span className="p-2">ZRP CCTV Tracking</span>
        </a>
          
          <Nav className="me-auto">
            <Nav.Link href="/map">Home</Nav.Link>
            <Nav.Link href="/addagents">Agents</Nav.Link>
            <Nav.Link href="/suspects">Suspects</Nav.Link>
            <Nav.Link href="/report">Report</Nav.Link>
            <Nav.Link href="/addadmin">Admins</Nav.Link>
            <Button
              variant="outline-danger"
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    // alert("Log Out Successful");
                    navigate("/")
                    
                  })
                  .catch((error) => {
                    // An error happened.
                  });
              }}
            >
              LogOut
            </Button>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarBs;
