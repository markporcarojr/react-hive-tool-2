import axios from "axios";
import { useContext, useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CustomNavbar from "../../components/layout/CustomNavbar";
import Footer from "../../components/layout/Footer";
import LoadSpinner from "../../components/Spinner";
import UserContext from "../../context/UserContext.jsx";

const CreateInventory = () => {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSaveInventory = (data) => {
    const formData = {
      ...data,
      userId: user._id,
    };
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_API}/inventory`, formData)
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
            <h1 className="m-5 fw-bold text-center">NEW ITEM</h1>
            <p className="text-center mb-4">* Required Fields</p>

            <Form
              id="inventory-form"
              onSubmit={handleSubmit(handleSaveInventory)}
            >
              <div className="m-3 fs-3 mt-0 fw-semibold">
                <Form.Label htmlFor="inventoryType" className="m-3">
                  * Equipment Name
                </Form.Label>
                <Form.Control
                  {...register("inventoryType", { required: true })}
                  type="text"
                  id="inventoryType"
                  name="inventoryType"
                  className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                />
                {errors.inventoryType && (
                  <p className="fs-5 text-danger m-3 text-center">
                    Equipment Name is required
                  </p>
                )}
              </div>

              <div className="m-3 fs-3 mt-0 fw-semibold">
                <Form.Label htmlFor="inventoryAmount" className="m-3">
                  *Quantity
                </Form.Label>
                <Form.Control
                  {...register("inventoryAmount", { required: true })}
                  type="number"
                  className="text-center bg-inputgrey text-white border-3 border-michgold rounded-4 opacity-85 fw-bold"
                  id="inventoryAmount"
                  name="inventoryAmount"
                />
                {errors.inventoryAmount && (
                  <p className="fs-5 text-danger m-3 text-center">
                    Quantity is required
                  </p>
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
                ADD
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

export default CreateInventory;
