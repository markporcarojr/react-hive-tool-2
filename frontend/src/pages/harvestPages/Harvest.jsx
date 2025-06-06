import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { IconContext } from "react-icons";
import { FaTrashAlt } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import CustomNavbar from "../../components/layout/CustomNavbar";
import Footer from "../../components/layout/Footer";
import CustomModal from "../../components/Modal.jsx";
import LoadSpinner from "../../components/Spinner";
import UserContext from "../../context/UserContext";

const formatDate = (dateString) => {
  const utcDate = new Date(dateString);
  const options = { timeZone: "UTC" };
  return utcDate.toLocaleDateString("en-US", options);
};

export default function Harvest() {
  const [harvests, setHarvests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedHarvest, setSelectedHarvest] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/harvest?userId=${user._id}`)
      .then((response) => {
        setHarvests(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching harvest data:", error);
        setLoading(false);
      });
  }, [user]);

  const handleClick = (harvest) => {
    setSelectedHarvest(harvest);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedHarvest(null);
  };

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Efficiently manage and track honey harvests. Record extraction dates, quantities, and quality metrics to optimize your apiary's honey production."
        />

        <title>Harvest</title>
      </Helmet>
      <CustomNavbar />
      <div className="p-4">
        <div className="d-flex justify-content-around mb-3 sticky-button">
          <Link
            to="/harvest/create"
            className="btn btn-michgold rounded-pill fw-bold"
          >
            ADD HARVEST
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
              // responsive
              variant="dark"
              className="text-michgold harvest-table"
            >
              <thead className="fs-4 fw-bold text-center">
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {harvests.map((harvest) => (
                  <tr key={harvest._id} className="text-center align-middle">
                    <td className="text-center">
                      {formatDate(harvest.harvestDate)}
                    </td>
                    <td className="text-center">{harvest.harvestType}</td>
                    <td className="text-center">{harvest.harvestAmount} lbs</td>

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
                            onClick={() => handleClick(harvest)}
                          />
                        </IconContext.Provider>
                        <IconContext.Provider
                          value={{
                            color: "green",
                            size: "1.5em",
                            className: "darken-on-hover m-2",
                          }}
                        >
                          <Link to={`/harvest/edit/${harvest._id}`}>
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
                          <Link to={`/harvest/delete/${harvest._id}`}>
                            <FaTrashAlt />
                          </Link>
                        </IconContext.Provider>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}

        <CustomModal
          show={showModal}
          onHide={handleCloseModal}
          selectedItem={selectedHarvest}
          cardType="harvest"
        />
      </div>

      <Footer />
    </>
  );
}
