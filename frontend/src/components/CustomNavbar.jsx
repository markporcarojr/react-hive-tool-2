import { Navbar, Container, Nav } from "react-bootstrap";
import logoWebp1x from "../assets/images/hive_tool@1x.webp";
import logoWebp2x from "../assets/images/hive_tool@2x.webp";
import logoWebp3x from "../assets/images/hive_tool@3x.webp";
import logoPng1x from "../assets/images/hive_tool@1x.png";
import logoPng2x from "../assets/images/hive_tool@2x.png";
import logoPng3x from "../assets/images/hive_tool@3x.png";

function CustomNavbar() {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#ffcb05" }} sticky="top">
      <Container fluid>
        <div className="text-center">
          <Navbar.Brand href="/">
            <picture>
              <source
                type="image/webp"
                style={{ width: "60px" }}
                srcSet={`${logoWebp1x} 1x, ${logoWebp2x} 2x, ${logoWebp3x} 3x`}
              />
              <img
                className="ms-3"
                src={logoPng1x}
                style={{ width: "60px" }}
                alt=""
                srcSet={`${logoPng1x} 1x, ${logoPng2x} 2x, ${logoPng3x} 3x`}
              />
            </picture>
          </Navbar.Brand>
          <p className="mb-0 fw-bold">HIVE TOOL</p>
        </div>

        <Navbar.Toggle aria-controls="navbarNavAltMarkup" className="fw-bold" />
        <Navbar.Collapse id="navbarNavAltMarkup">
          <Nav className="d-flex align-items-end navbar-nav ms-lg-auto ms-auto fw-bold">
            <Nav.Link href="/" className="nav-link active">
              Home
            </Nav.Link>
            <Nav.Link href="/inspections" className="nav-link">
              Inspections
            </Nav.Link>
            <Nav.Link href="/inventory" className="nav-link">
              Inventory
            </Nav.Link>
            <Nav.Link href="/treatments" className="nav-link">
              Treatment
            </Nav.Link>
            <Nav.Link href="/harvest" className="nav-link">
              Harvest
            </Nav.Link>
            <Nav.Link href="/swarmtraps" className="nav-link">
              Swarm Traps
            </Nav.Link>
            <Nav.Link href="/feeding" className="nav-link">
              Feeding
            </Nav.Link>
            {/* <Nav.Link href="/settings-form" className="nav-link">
              Settings
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;
