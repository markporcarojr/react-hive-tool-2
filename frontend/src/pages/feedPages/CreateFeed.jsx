import { useState, useContext, useEffect } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import LoadSpinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import UserContext from "../../components/UserContext";

const CreateFeed = () => {
  const { user } = useContext(UserContext);
  const [hives, setHives] = useState([]);
  const [hiveId, setHiveId] = useState("");
  const [feed, setFeed] = useState("");
  const [feedDate, setFeedDate] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleSaveFeed = (e) => {
    e.preventDefault();

    // Parse the selected hive object back to JSON
    // so we can structure it to be sent to the backend
    const selectedHive = JSON.parse(hiveId);

    const data = {
      hiveNumber: selectedHive.hiveNumber,
      hiveId: selectedHive._id,
      feed,
      feedDate,
      userId: user._id,
    };

    setLoading(true);
    axios
      .post("http://localhost:5555/feed", data)
      .then(() => {
        setLoading(false);
        navigate("/feed");
      })
      .catch((error) => {
        setLoading(false);
        setMessage(error.response.data.message);
        console.log(error);
      });
  };

  return (
    <>
      <CustomNavbar />
      {loading && <LoadSpinner />}
      <Container style={{ maxWidth: "700px" }}>
        <Card className="text-michgold text-center mt-2 mb-5">
          {/* Include your partial title here */}

          {/* Forms */}
          <Form onSubmit={handleSaveFeed} id="treatment-form">
            <div className="m-3 mt-0 fs-3 fw-semibold">
              <Form.Label htmlFor="hiveId">Hive Number</Form.Label>
              <Form.Select
                id="hiveId"
                className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                aria-label="select example"
                name="hiveId"
                value={hiveId}
                onChange={(e) => setHiveId(e.target.value)}
              >
                <option value="" disabled>
                  Select Hive Number
                </option>
                {hives.map((hive) => (
                  // By using JSON.stringify(hive) as the value of the <option>,
                  // we ensure that the entire hive object is associated with each dropdown option,
                  // enabling us to pass comprehensive hive data to the backend when the user makes a selection.
                  <option key={hive._id} value={JSON.stringify(hive)}>
                    {hive.hiveNumber} {/* Display hive number to the user */}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="m-3 mt-0 fs-3 fw-semibold">
              <Form.Label htmlFor="feed">Feeding</Form.Label>
              <Form.Select
                id="feed"
                className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                aria-label="select example"
                name="feed"
                value={feed}
                onChange={(e) => setFeed(e.target.value)}
              >
                <option selected>Select Feeding Type</option>
                <option value="Fondant">Fondant</option>
                <option value="Sugar">Sugar</option>
                <option value="Pollen Patty">Pollen Patty</option>
                <option value="Syrup">Syrup</option>
              </Form.Select>
            </div>
            <div className="m-3 fs-3 mt-0 fw-semibold">
              <Form.Label htmlFor="feedDate">Date</Form.Label>
              <Form.Control
                type="date"
                className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                id="feedDate"
                name="feedDate"
                value={feedDate}
                onChange={(e) => setFeedDate(e.target.value)}
              />
            </div>
          </Form>
          {/* Form end */}

          <div className="d-flex justify-content-around mb-3">
            <Button
              type="submit"
              form="treatment-form"
              className="btn px-5 btn-michgold btn-gold fw-bold rounded-pill"
            >
              ADD
            </Button>
          </div>
          <p style={{ color: "#ab0a0a", textAlign: "center" }}>{message}</p>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default CreateFeed;
