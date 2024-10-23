import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton.jsx";
import CustomNavbar from "../../components/layout/CustomNavbar";
import Footer from "../../components/layout/Footer";
import LoadSpinner from "../../components/Spinner";

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
      .get(`${import.meta.env.VITE_BACKEND_API}/harvest/${id}`)
      .then((res) => {
        setValue("harvestAmount", res.data.harvestAmount);
        setValue("harvestType", res.data.harvestType);
        setValue("harvestDate", res.data.harvestDate);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error fetching data:", error);
        setMessage(error.res.data.message);
      });
  }, []);

  const handleEditHarvest = (data) => {
    const formData = {
      ...data,
    };
    setLoading(true);
    axios
      .put(`${import.meta.env.VITE_BACKEND_API}/harvest/${id}`, formData)
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
          {/* Forms */}
          <div className="mt-3 text-center">
            <BackButton text={"BACK"} />
          </div>
          <h1 className="m-5 fw-bold text-center">EDIT HARVEST</h1>
          <p className="text-center mb-4">* Required Fields</p>

          <Form onSubmit={handleSubmit(handleEditHarvest)} id="harvest-form">
            <div className="m-3 fs-3 mt-0 fw-semibold">
              <Form.Label htmlFor="harvestAmount" className="m-3">
                * Harvest Amount (lbs)
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
                <p className="fs-5 text-danger m-3 text-center">
                  Amount is required
                </p>
              )}
            </div>
            <div className="m-3 mt-0 fs-3 fw-semibold">
              <Form.Label htmlFor="harvestType" className="m-3">
                * Harvest Type
              </Form.Label>
              <Form.Select
                {...register("harvestType", { required: true })}
                id="harvestType"
                className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                aria-label="select example"
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
                <p className="fs-5 text-danger m-3 text-center">
                  Harvest Type is required
                </p>
              )}
            </div>
            <div className="m-3 fs-3 mt-0 fw-semibold">
              <Form.Label htmlFor="harvestDate" className="m-3">
                * Date
              </Form.Label>
              <Form.Control
                {...register("harvestDate", { required: true })}
                type="date"
                className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                id="harvestDate"
                name="harvestDate"
              />
              {errors.harvestDate && (
                <p className="fs-5 text-danger m-3 text-center">
                  Date is required
                </p>
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
              UPDATE
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
