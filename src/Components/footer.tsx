import { Navbar, Nav, Container, Button } from "react-bootstrap";

function Footer() {
  return (<>
    <Navbar bg="dark" variant="dark" sticky="top">
      <Container>
    {/* <Navbar.Brand href="/">ZRP CCTV Tracking</Navbar.Brand> */}
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
      </Container>
      
    </Navbar>
  </> );
}

export default Footer;
