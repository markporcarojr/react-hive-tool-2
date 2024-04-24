// Home.jsx
import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Modal, Button, Table } from "react-bootstrap";
import { IconContext } from "react-icons";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import UserContext from "../../context/UserContext";
import LoadSpinner from "../../components/Spinner";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import HiveCard from "../../components/HiveCard";
import ImageDisplay from "../../components/ImageDisplay";
import fetchWeatherData from "../../utils/fetchWeatherData.js";

const formatDate = (dateString) => {
  const utcDate = new Date(dateString);
  const options = { timeZone: "UTC" };

  return utcDate.toLocaleDateString("en-US", options);
};

const Home = () => {
  const [hives, setHives] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedHive, setSelectedHive] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(UserContext);
  const [weatherData, setWeatherData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const { id } = useParams();
  const imageUrl =
    "https://firebasestorage.googleapis.com/v0/b/react-hive-tool-73d34.appspot.com/o/images%2FapiaryImages%2FIMG_0891.jpeg9c4ba8d0-734d-436d-8115-68d4778bc18e?alt=media&token=82a3bc7b-8ce1-4ff5-8931-ab12e30ed872";

  useEffect(() => {
    const fetchWeather = async () => {
      if (user && user.zipcode) {
        const data = await fetchWeatherData(user.zipcode);
        if (data) {
          setWeatherData(data.data);
          setWeatherIcon(data.iconUrl);
        }
      }
    };

    fetchWeather();
  }, [user]);

  useEffect(() => {
    setLoading(true);
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:5555/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setBackgroundImage(response.data.user.apiaryImage);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, [id]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/new-hive?userId=${user._id}`)
      .then((response) => {
        setHives(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching hive data:", error);
        setLoading(false);
      });
  }, [user]);

  const handleShowModal = (hive) => {
    setSelectedHive(hive);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedHive(null);
  };

  return (
    <>
      <CustomNavbar />
      <div
        id="title"
        // className=" title"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          // backgroundPositionY: "60%",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%", // Adjust height as needed
        }}
      >
        <h1 className="text-center text-white pt-2 outlined-text display-1 fw-bold apiary">
          {user.apiaryName ? user.apiaryName : "Your Apiary"} <br />
        </h1>
        <h5 className="card-title mt-3 fs-2 outlined-text" id="datetime"></h5>

        {weatherData && (
          <div className="d-flex justify-content-between text-white align-items-center outlined-text fs-3 fw-bold my-1 me-2">
            <span className="card-text mb-0 ms-2 mt-" id="city">
              {weatherData.name}
            </span>
            <div>
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
        <div className="d-flex justify-content-around mb-4">
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
            <Table
              bordered
              striped
              hover
              responsive
              variant="dark"
              className="text-michgold table-responsive hive-table"
            >
              <thead className="fs-4 fw-bold text-center">
                <tr>
                  <th>Hive Image</th>
                  <th>Hive ID</th>
                  <th>Date Added</th>
                  <th>Queen Color</th>
                  <th>Queen Age</th>
                  <th>Hive Source</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {/* .sort(
                    (a, b) =>
                      new Date(b.inspectionDate) - new Date(a.inspectionDate)
                  ) */}
                {hives.map((hive) => (
                  <tr key={hive._id} className="text-center align-middle">
                    <td className="text-center">
                      <ImageDisplay
                        imageUrl={hive.hiveImage}
                        maxHeight={"100px"}
                        maxWidth={"100px"}
                        alt={"Hive Image"}
                      />
                    </td>
                    <td className="text-center fs-3">#{hive.hiveNumber}</td>
                    <td className="text-center">{formatDate(hive.hiveDate)}</td>
                    <td className="text-center">{hive.queenColor}</td>
                    <td className="text-center">{hive.queenAge}</td>
                    <td className="text-center">{hive.hiveSource}</td>
                    <td>
                      <div className="d-flex justify-content-around">
                        <IconContext.Provider
                          value={{
                            color: "fccb05",
                            size: "2em",
                            className: "darken-on-hover",
                          }}
                        >
                          <IoInformationCircleOutline
                            onClick={() => handleShowModal(hive)}
                          />
                        </IconContext.Provider>
                        <IconContext.Provider
                          value={{
                            color: "green",
                            size: "2em",
                            className: "darken-on-hover",
                          }}
                        >
                          <Link to={`/hives/edit/${hive._id}`}>
                            <MdModeEditOutline />
                          </Link>
                        </IconContext.Provider>
                        <IconContext.Provider
                          value={{
                            color: "red",
                            size: "2em",
                            className: "darken-on-hover",
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

            <Modal show={showModal} onHide={handleCloseModal}>
              <div
                style={{ borderColor: "#ffcb05" }}
                className="modal-border bg-card"
              >
                <Modal.Header className="d-flex justify-content-around">
                  <div className="container d-flex justify-content-center align-items-center">
                    {selectedHive && (
                      <ImageDisplay
                        imageUrl={selectedHive.hiveImage}
                        maxHeight={"400px"}
                        maxWidth={"400px"}
                        style={{
                          objectFit: "scale-down",
                        }}
                      />
                    )}
                  </div>
                </Modal.Header>
                <Modal.Body>
                  {selectedHive && <HiveCard hive={selectedHive} />}
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-center">
                  <div className="d-grid gap-2">
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={handleCloseModal}
                      as="block"
                    >
                      Close
                    </Button>
                  </div>
                </Modal.Footer>
              </div>
            </Modal>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Home;
