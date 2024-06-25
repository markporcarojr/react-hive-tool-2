import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import LoadSpinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import UserContext from "../../context/UserContext";

const CreateHarvest = () => {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSaveHarvest = (data) => {
    const formData = {
      ...data,
      userId: user._id,
    };
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_API}/harvest`, formData)
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
      <Container
        style={{
          maxWidth: "700px",
          border: "3px solid #ffcb05",
          borderRadius: "1em",
        }}
        className="mt-5"
      >
        <Card className="text-michgold  mt-2 mb-5">
          <h1 className="m-5 fw-bold text-center">ADD HARVEST</h1>

          {/* Forms */}
          <Form onSubmit={handleSubmit(handleSaveHarvest)} id="harvest-form">
            <div className="m-3 fs-3 mt-0 fw-semibold">
              <Form.Label htmlFor="harvestAmount" className="m-3">
                Harvest Amount (lbs)
              </Form.Label>
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
              <Form.Label htmlFor="harvestType" className="m-3">
                Harvest Type
              </Form.Label>
              <Form.Select
                {...register("harvestType", { required: true })}
                id="harvestType"
                className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                name="harvestType"
                defaultValue={""}
              >
                <option value="" disabled>
                  Select an option
                </option>
                <option value="Honey">Honey</option>
                <option value="Wax">Wax</option>
              </Form.Select>
              {errors.harvestType && (
                <p className="text-danger">Harvest Type is required</p>
              )}
            </div>
            <div className="m-3 fs-3 mt-0 fw-semibold">
              <Form.Label htmlFor="harvestDate" className="m-3">
                Date
              </Form.Label>
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

          <div className="d-flex justify-content-around mt-5">
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

export default CreateHarvest;
