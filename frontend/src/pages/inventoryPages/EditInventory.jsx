import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import LoadSpinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";

const EditInventory = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://react-hive-tool-backend.onrender.com/inventory/${id}`)
      .then((res) => {
        setValue("inventoryType", res.data.inventoryType);
        setValue("inventoryAmount", res.data.inventoryAmount);
        setValue("inventoryLocation", res.data.inventoryLocation);

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setMessage(error.response.data.message);
        console.log("Error fetching data:", error);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEditInventory = (data) => {
    const formData = {
      ...data,
    };
    setLoading(true);
    axios
      .put(
        `https://react-hive-tool-backend.onrender.com/inventory/${id}`,
        formData
      )
      .then(() => {
        setLoading(false);
        navigate("/inventory");
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
      {loading ? (
        <LoadSpinner />
      ) : (
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
            <h1 className="m-5 fw-bold text-center">EDIT ITEM</h1>

            <Form
              id="inventory-form"
              onSubmit={handleSubmit(handleEditInventory)}
            >
              <div className="m-3 fs-3 mt-0 fw-semibold">
                <Form.Label htmlFor="inventoryType" className="m-3">
                  Equipment Name
                </Form.Label>
                <Form.Control
                  {...register("inventoryType", { required: true })}
                  type="text"
                  id="inventoryType"
                  name="inventoryType"
                  className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                />
                {errors.inventoryType && (
                  <p className="text-danger">Inventory Type is required</p>
                )}
              </div>

              <div className="m-3 fs-3 mt-0 fw-semibold">
                <Form.Label htmlFor="inventoryAmount" className="m-3">
                  Quantity
                </Form.Label>
                <Form.Control
                  {...register("inventoryAmount", { required: true })}
                  type="number"
                  className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                  id="inventoryAmount"
                  name="inventoryAmount"
                />
                {errors.inventoryAmount && (
                  <p className="text-danger">Quantity is required</p>
                )}
              </div>
              <div className="m-3 fs-3 mt-0 fw-semibold">
                <Form.Label htmlFor="inventoryLocation" className="m-3">
                  Location
                </Form.Label>
                <Form.Control
                  {...register("inventoryLocation")}
                  type="text"
                  className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                  id="inventoryLocation"
                  name="inventoryLocation"
                />
              </div>
            </Form>
            {/* Form end */}

            <div className="d-flex justify-content-around mt-5">
              <Button
                type="submit"
                form="inventory-form"
                className="btn px-5 btn-michgold fw-bold rounded-pill"
              >
                UPDATE
              </Button>
            </div>
            <p style={{ color: "#ab0a0a", textAlign: "center" }}>{message}</p>
          </Card>
        </Container>
      )}
      <Footer />
    </>
  );
};

export default EditInventory;
