import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import LoadSpinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import UserContext from "../../context/UserContext";

const EditHarvest = () => {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:5555/harvest/${id}`)
      .then((res) => {
        setValue({
          harvestAmount: res.data.harvestAmount,
          harvestType: res.data.harvestType,
          harvestDate: res.data.harvestDate,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error fetching data:", error);
        setMessage(error.response.data.message);
      });
  }, [id]);

  const handleEditHarvest = (data) => {
    const formData = {
      ...data,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/harvest/${id}`, formData)
      .then(() => {
        setLoading(false);
        navigate("/harvest");
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
          <h1 className="m-5">ADD HARVEST</h1>
          {/* Include your partial title here */}

          {/* Forms */}
          <h1 className="m-5">EDIT HARVEST</h1>
          <Form onSubmit={handleSubmit(handleEditHarvest)} id="harvest-form">
            <div className="m-3 fs-3 mt-0 fw-semibold">
              <Form.Label htmlFor="harvestAmount">Harvest Amount</Form.Label>
              <Form.Control
                {...register("harvestAmount", { required: true })}
                type="number"
                className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                name="harvestAmount"
                id="harvestAmount"
                aria-describedby="harvestAmount"
              />
              {errors.harvestAmount && (
                <p className="text-danger">Amount is required</p>
              )}
            </div>
            <div className="m-3 mt-0 fs-3 fw-semibold">
              <Form.Label htmlFor="harvestType">Harvest Type</Form.Label>
              <Form.Select
                {...register("harvestType", { required: true })}
                id="harvestType"
                className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                aria-label="select example"
                name="harvestType"
              >
                <option selected>---</option>
                <option value="Honey">Honey</option>
                <option value="Wax">Wax</option>
              </Form.Select>
              {errors.harvestType && (
                <p className="text-danger">Harvest Type is required</p>
              )}
            </div>
            <div className="m-3 fs-3 mt-0 fw-semibold">
              <Form.Label htmlFor="harvestDate">Date</Form.Label>
              <Form.Control
                {...register("harvestDate", { required: true })}
                type="date"
                className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                id="harvestDate"
                name="harvestDate"
              />
              {errors.harvestDate && (
                <p className="text-danger">Date is required</p>
              )}
            </div>
          </Form>
          {/* Form end */}

          <div className="d-flex justify-content-around mb-3">
            <Button
              type="submit"
              form="harvest-form"
              className="btn px-5 btn-michgold  fw-bold rounded-pill"
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

export default EditHarvest;
