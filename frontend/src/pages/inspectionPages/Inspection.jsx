import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Modal, Button, Table, Form } from "react-bootstrap";
import { IconContext } from "react-icons";
import { IoInformationCircleOutline } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import UserContext from "../../context/UserContext";
import LoadSpinner from "../../components/Spinner";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import ImageDisplay from "../../components/ImageDisplay";
import CustomModal from "../../components/Modal";
import { Helmet } from "react-helmet";

const formatDate = (dateString) => {
  const utcDate = new Date(dateString);
  // const options = { timeZone: "UTC" };
  return utcDate.toLocaleDateString("en-US");
};

const InspectionPage = () => {
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedHive, setSelectedHive] = useState("");
  const { user } = useContext(UserContext);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/inspections?userId=${user._id}`)
      .then((response) => {
        setInspections(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching inspection data:", error);
        setLoading(false);
      });
  }, []);

  const handleShowModal = (inspection) => {
    setSelectedInspection(inspection);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedInspection(null);
  };

  const handleSort = (columnKey) => {
    let direction = "ascending";
    if (sortConfig.key === columnKey && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key: columnKey, direction });
  };

  const handleHiveChange = (e) => {
    setSelectedHive(e.target.value);
  };

  const sortedInspections = [...inspections].sort((a, b) => {
    if (sortConfig.key === "inspectionDate") {
      const dateA = new Date(formatDate(a.inspectionDate));
      const dateB = new Date(formatDate(b.inspectionDate));
      if (dateA < dateB) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (dateA > dateB) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    } else {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  const filteredInspections = sortedInspections.filter((inspection) => {
    if (selectedHive) {
      return inspection.hiveNumber.toString() === selectedHive;
    }
    return true;
  });

  const uniqueHives = [
    ...new Set(
      inspections.map((inspection) => inspection.hiveNumber.toString())
    ),
  ];

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Conduct thorough hive inspections with ease. Monitor hive health, identify issues early, and take proactive measures to ensure strong and productive colonies."
        />

        <title>Inspections</title>
      </Helmet>
      <CustomNavbar />
      <div className="p-4 text-center">
        <div className="d-flex justify-content-around mb-4 sticky-button">
          <Link
            to="/inspections/create"
            className="btn btn-michgold rounded-pill fw-bold"
          >
            ADD INSPECTION
          </Link>
        </div>

        {loading ? (
          <LoadSpinner />
        ) : (
          <>
            <div className="d-flex justify-content-around mb-4">
              <Form.Select
                aria-label="Select Hive"
                onChange={handleHiveChange}
                className="mb-1 btn btn-michgold rounded-pill fw-bold"
                value={selectedHive}
                style={{ maxWidth: "200px" }}
              >
                <option value="">All Hives</option>
                {uniqueHives.map((hive, index) => (
                  <option key={index} value={hive}>
                    Hive {hive}
                  </option>
                ))}
              </Form.Select>
            </div>
            <Table
              bordered
              striped
              hover
              responsive
              variant="dark"
              className="text-michgold table-responsive inspection-table"
            >
              <thead className="fs-4 fw-bold text-center">
                <tr>
                  <th>Image</th>
                  <th onClick={() => handleSort("inspectionDate")}>
                    Date
                    {sortConfig.key === "inspectionDate" &&
                      (sortConfig.direction === "ascending" ? " ↑" : " ↓")}
                    {sortConfig.key !== "inspectionDate" && " ↕"}
                  </th>
                  <th onClick={() => handleSort("hiveNumber")}>
                    Hive Number
                    {sortConfig.key === "hiveNumber" &&
                      (sortConfig.direction === "ascending" ? " ↑" : " ↓")}
                    {sortConfig.key !== "hiveNumber" && " ↕"}
                  </th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {filteredInspections.map((inspection) => (
                  <tr key={inspection._id} className="text-center align-middle">
                    <td onClick={() => handleShowModal(inspection)}>
                      <ImageDisplay
                        imageUrl={inspection.inspectionImage}
                        maxHeight={"10rem"}
                        maxWidth={"10rem"}
                        alt={"Inspection Image"}
                      />
                    </td>
                    <td>{formatDate(inspection.inspectionDate)}</td>
                    <td>{inspection.hiveNumber}</td>
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
                            onClick={() => handleShowModal(inspection)}
                          />
                        </IconContext.Provider>
                        <IconContext.Provider
                          value={{
                            color: "green",
                            size: "1.5em",
                            className: "darken-on-hover m-2",
                          }}
                        >
                          <Link to={`/inspections/edit/${inspection._id}`}>
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
                          <Link to={`/inspections/delete/${inspection._id}`}>
                            <FaTrashAlt />
                          </Link>
                        </IconContext.Provider>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <CustomModal
              show={showModal}
              onHide={handleCloseModal}
              selectedItem={selectedInspection}
              cardType="inspection"
            />
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default InspectionPage;
