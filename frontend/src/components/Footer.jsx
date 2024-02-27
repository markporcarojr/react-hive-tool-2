import { FaFacebook, FaInstagram } from "react-icons/fa";
import { IconContext } from "react-icons";

function Footer() {
  return (
    <footer className="text-center mt-5 footer">
      <div className="container d-flex flex-column align-items-center">
        {/* Social Media Icons */}
        <div className="d-flex gap-2 mt-1">
          <IconContext.Provider value={{ color: "blue", size: "2em" }}>
            <div>
              <a href="https://www.facebook.com/MarkyJoePorcaro/">
                <FaFacebook />
              </a>
            </div>
          </IconContext.Provider>
          <IconContext.Provider value={{ color: "red", size: "2em" }}>
            <div>
              <a href="https://www.instagram.com/marksbeez/">
                <FaInstagram />
              </a>
            </div>
          </IconContext.Provider>
        </div>

        {/* Copyright */}
        <div className="text-dark">
          <p className="mb-0">
            © 2023 Copyright:
            <a href="https://marks-bees.netlify.app/#/" className="text-dark">
              Porcaro Farms
            </a>
          </p>
          <div>
            <a href="/privacy-policy" className="text-dark">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
