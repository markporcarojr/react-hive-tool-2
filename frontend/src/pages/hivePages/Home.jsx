// Home.jsx
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { IconContext } from "react-icons";
import { FaTrashAlt } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import ImageDisplay from "../../components/ImageDisplay";
import CustomNavbar from "../../components/layout/CustomNavbar";
import Footer from "../../components/layout/Footer.jsx";
import CustomModal from "../../components/Modal.jsx";
import LoadSpinner from "../../components/Spinner";
import UserContext from "../../context/UserContext";
import fetchWeatherData from "../../utils/fetchWeatherData.js";

const Home = () => {
  const [hives, setHives] = useState([]);
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState("");
  const [location, setLocation] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(null);
  const { user } = useContext(UserContext);
  const { id } = useParams();

  const [selectedHive, setSelectedHive] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      if (user && user.zipcode) {
        const data = await fetchWeatherData(user.zipcode);
        if (data) {
          setWeatherData(data.data);
          setWeatherIcon(data.iconUrl);
          setLocation(data.state);
        }
      }
    };

    fetchWeather();
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/user`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBackgroundImage(response.data.user.apiaryImage);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/new-hive?userId=${user._id}`)
      .then((response) => {
        setHives(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching hive data:", error);
        setLoading(false);
      });
  }, []);

  const handleShowModal = (hive) => {
    setSelectedHive(hive);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedHive(null);
    setShowModal(false);
  };

  return (
    <>
      <Helmet>
        <meta
          name="google-site-verification"
          content="NgFiqtFV37kU5_GpW0LPMGokmR-AITKxzTEtLB0A9P8"
        />
        <meta
          name="description"
          content="Manage your apiary with ease. Track beekeeping tasks, monitor hive health, and optimize honey production. Get started today!"
        />
        <title>Hive Tool</title>
      </Helmet>
      <CustomNavbar />
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%", // Adjust height as needed
          borderBottom: "12px solid #ffcb05",
        }}
      >
        <h1 className="text-center text-white pt-2 outlined-text display-1 fw-bold apiary">
          {user.apiaryName ? user.apiaryName : "Your Apiary"} <br />
        </h1>
        <h5 className="card-title mt-3 fs-2 outlined-text" id="datetime"></h5>

        {weatherData && (
          <div
            id="weather"
            className="d-inline-flex flex-column text-white outlined-text ms-5 fw-bold "
          >
            <span
              className="d-flex card-text fs-3 justify-content-center align-items-center"
              id="city"
            >
              {weatherData.name}, {location}
            </span>
            <div className="d-flex fs-2 justify-content-center align-items-center">
              <span className="card-text mb-0">
                <img src={weatherIcon} alt="Weather Icon" />
              </span>

              <span className="card-text mb-0 ms-1" id="temp">
                {Math.floor(weatherData.main.temp)}℉
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="d-flex justify-content-around mb-4 sticky-button">
          <Link
            to="/hives/create/"
            className="btn btn-michgold rounded-pill fw-bold"
          >
            ADD HIVE
          </Link>
        </div>

        {loading ? (
          <LoadSpinner />
        ) : (
          <>
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
              {hives.map((hive) => (
                <Col key={hive._id}>
                  <Card className="h-100 shadow-sm">
                    <Card.Img
                      variant="top"
                      src={hive.hiveImage}
                      alt="Hive Image"
                      style={{ objectFit: "cover", height: "200px" }}
                      onClick={() => handleShowModal(hive)}
                    />
                    <Card.Body className="d-flex flex-column text-michgold bg-pattern">
                      <Card.Title className="text-center fw-bold">
                        Hive #{hive.hiveNumber}
                      </Card.Title>
                      <div className="mt-2">
                        <p className="mb-1">
                          <strong>Frames:</strong> {hive.frames || "N/A"}
                        </p>
                        <p className="mb-1">
                          <strong>Queen Color:</strong>{" "}
                          {hive.queenColor || "N/A"}
                        </p>
                        <p className="mb-1">
                          <strong>Brood Boxes:</strong> {hive.broodBoxes}
                        </p>
                        <p className="mb-1">
                          <strong>Super Boxes:</strong> {hive.superBoxes}
                        </p>
                        <p className="mb-1">
                          <strong>Queen Excluder:</strong> {hive.queenExcluder}
                        </p>
                      </div>
                      <div className="mt-auto d-flex justify-content-around pt-3">
                        <Link to={`/hives/edit/${hive._id}`}>
                          <Button variant="outline-success" size="sm">
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleShowModal(hive)}
                        >
                          Info
                        </Button>
                        <Link to={`/hives/delete/${hive._id}`}>
                          <Button variant="outline-danger" size="sm">
                            Delete
                          </Button>
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            <CustomModal
              show={showModal}
              onHide={handleCloseModal}
              selectedItem={selectedHive}
              cardType="hive"
            />
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
