import { useEffect, useState } from "react";
import CustomNavbar from "../../components/CustomNavbar";
import Footer from "../../components/Footer";
import axios from "axios";
import LoadSpinner from "../../components/Spinner";
import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ImageDisplay from "../../components/ImageDisplay";

import logoWebp1x from "../../assets/images/hive_tool@1x.webp";
import logoWebp2x from "../../assets/images/hive_tool@2x.webp";
import logoWebp3x from "../../assets/images/hive_tool@3x.webp";
import logoPng1x from "../../assets/images/hive_tool@1x.png";
import logoPng2x from "../../assets/images/hive_tool@2x.png";
import logoPng3x from "../../assets/images/hive_tool@3x.png";

const HiveDetails = () => {
  const [loading, setLoading] = useState(false);
  const [hive, setHive] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_BACKEND_API}/new-hive/${id}`)
      .then((response) => {
        setHive(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching hive data:", error);
        setLoading(false);
      });
  }, []);
  const {
    breed,
    hiveDate,
    hiveImage,
    hiveNumber,
    hiveSource,
    hiveStrength,
    queenColor,
    queenAge,
    queenExcluder,
    superBoxes,
    broodBoxes,
    frames,
  } = hive;

  const textStyle = { color: "#ffcb05" };
  const utcDate = new Date(hiveDate);
  const options = { timeZone: "UTC" };
  const formattedDate = utcDate.toLocaleDateString("en-US", options);

  return (
    <>
      <CustomNavbar />
      {loading && <LoadSpinner />}
      <div className="d-flex justify-content-between">
        <picture className="rotateY my-auto" id="logo">
          <source
            type="image/webp"
            srcSet={`${logoWebp1x} 1x, ${logoWebp2x} 2x, ${logoWebp3x} 3x`}
          />
          <img
            className="pop"
            src={logoPng1x}
            alt=""
            srcSet={`${logoPng1x} 1x, ${logoPng2x} 2x, ${logoPng3x} 3x`}
          />
        </picture>
        <Container
          style={{
            maxWidth: "600px",
            border: "3px solid #ffcb05",
            borderRadius: "1em",
          }}
          className="bg-card mx-auto m-5"
        >
          <div className={`col g-4 m-3`}>
            <div className="">
              <Card
                className={`${hiveStrength === 0 ? "bg-danger" : "bg-card"}`}
              >
                {/* <div style={{ maxHeight: "400px", maxWidth: "400px" }}> */}
                <Card.Img variant="top" src={hiveImage}></Card.Img>
                {/* </div> */}
                <Card.Body
                  className="pb-2 pt-1 mt-0 m-1 mb-2 fw-semibold fs-5"
                  style={textStyle}
                >
                  <Card.Title
                    className="fs-1 fw-bold text-center pb-0 mb-3"
                    style={textStyle}
                  >
                    Hive #{hiveNumber}
                  </Card.Title>
                  <div className="row">
                    <div className="col-6">
                      <p className="mb-1 text-nowrap">Added:</p>
                      <p className="mb-1 text-nowrap">Source:</p>
                      <p className="mb-1 text-nowrap">Breed:</p>
                      <p className="mb-1 text-nowrap">Queen Color:</p>
                      <p className="mb-1 text-nowrap">Queen Age:</p>
                      <p className="mb-1 text-nowrap">Strength:</p>
                      <p className="mb-1 text-nowrap">Queen Excluder:</p>
                      <p className="mb-1 text-nowrap">Frames:</p>
                      <p className="mb-1 text-nowrap">Super Boxes:</p>
                      <p className="mb-1 text-nowrap">Brood Boxes:</p>
                    </div>
                    <div className="col-6 text-end">
                      <p className="mb-1 ">{formattedDate || "N/A"}</p>
                      <p className="mb-1 ">{hiveSource || "N/A"}</p>
                      <p className="mb-1 ">{breed || "N/A"}</p>
                      <p className="mb-1 ">{queenColor || "N/A"}</p>
                      <p className="mb-1 ">{queenAge || "N/A"}</p>
                      <p className="mb-1 ">{hiveStrength || "N/A"}%</p>
                      <p className="mb-1 ">{queenExcluder || "N/A"}</p>
                      <p className="mb-1 ">{frames || "10"}</p>
                      <p className="mb-1 ">{superBoxes || "N/A"}</p>
                      <p className="mb-1 ">{broodBoxes || "N/A"}</p>
                    </div>
                  </div>
                  <hr className="border-bottom" />
                </Card.Body>
              </Card>
            </div>
          </div>
        </Container>
        <picture className="rotateY my-auto" id="logo">
          <source
            type="image/webp"
            srcSet={`${logoWebp1x} 1x, ${logoWebp2x} 2x, ${logoWebp3x} 3x`}
          />
          <img
            className="pop"
            src={logoPng1x}
            alt=""
            srcSet={`${logoPng1x} 1x, ${logoPng2x} 2x, ${logoPng3x} 3x`}
          />
        </picture>
      </div>

      <Footer />
    </>
  );
};

export default HiveDetails;
