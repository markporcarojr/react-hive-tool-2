// Home.jsx
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
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
            <div
              // className="table-responsive"
              style={{ maxHeight: "500px", overflowY: "auto" }}
            >
              <Table
                bordered
                striped
                hover
                // responsive
                variant="dark"
                className="text-michgold hive-table"
              >
                <thead className="fs-4 fw-bold text-center sticky-header">
                  <tr>
                    <th scope="col">Hive ID</th>
                    <th scope="col">Hive Image</th>
                    <th scope="col">Frames</th>
                    <th scope="col">Queen Color</th>
                    <th scope="col">Brood Boxes</th>
                    <th scope="col">Super Boxes</th>
                    <th scope="col">Queen Excluder</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {hives.map((hive) => (
                    <tr key={hive._id} className="text-center align-middle">
                      <td className="text-center fs-3">#{hive.hiveNumber}</td>
                      <td
                        className="text-center"
                        onClick={() => handleShowModal(hive)}
                      >
                        <ImageDisplay
                          imageUrl={hive.hiveImage}
                          maxHeight={"10rem"}
                          maxWidth={"10rem"}
                          alt={"Hive Image"}
                        />
                      </td>
                      <td className="text-center">{hive.frames || "N/A"}</td>
                      <td className="text-center">
                        {hive.queenColor || "N/A"}
                      </td>
                      <td className="text-center">{hive.broodBoxes}</td>
                      <td className="text-center">{hive.superBoxes}</td>
                      <td className="text-center">{hive.queenExcluder}</td>
                      <td>
                        <div className="d-flex justify-content-around">
                          <IconContext.Provider
                            value={{
                              color: "fccb05",
                              size: "1.5em",
                              className: "darken-on-hover m-2",
                            }}
                          >
                            <IoInformationCircleOutline
                              onClick={() => handleShowModal(hive)}
                            />
                          </IconContext.Provider>
                          <IconContext.Provider
                            value={{
                              color: "green",
                              size: "1.5em",
                              className: "darken-on-hover m-2",
                            }}
                          >
                            <Link to={`/hives/edit/${hive._id}`}>
                              <MdModeEditOutline />
                            </Link>
                          </IconContext.Provider>
                          <IconContext.Provider
                            value={{
                              color: "red",
                              size: "1.5em",
                              className: "darken-on-hover m-2",
                            }}
                          >
                            <Link to={`/hives/delete/${hive._id}`}>
                              <FaTrashAlt />
                            </Link>
                          </IconContext.Provider>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

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
