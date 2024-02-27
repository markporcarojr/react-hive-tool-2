import CustomNavbar from "../components/CustomNavbar";
import Footer from "../components/Footer";
import smokyApiaryImage from "../assets/images/smoky_apiary@3x.jpg";

export default function Home() {
  return (
    <>
      <CustomNavbar />
      <div
        className="text-center"
        style={{
          color: "#ffcb05",
          borderColor: "#ffcb05",
          backgroundImage: `url(${smokyApiaryImage})`,
        }}
      >
        <div id="title" className="container ">
          <h1 className="text-center text-white pt-2 outlined-text display-1 fw-bold apiary">
            Marks Apiary
          </h1>
          <h5 className="card-title mt-3 fs-2 outlined-text" id="datetime">
            February 9 2024
          </h5>
          <div className="d-flex justify-content-between text-white align-items-center outlined-text fs-3 fw-bold my-1 me-2">
            {/* <span className="card-text mb-0 ms-2 mt-" id="city"></span> */}
            {/* <div>             
              <span className="card-text mb-0 text-white"><img id="clouds" src="" alt="" /></span>
              <span className="card-text mb-0" id="temp"></span>
            </div> */}
          </div>
        </div>
      </div>
      <div className="container text-center" style={{ color: "#ffcb05" }}>
        <div className="row row-cols-1 row-cols-lg-3 g-2">
          {/* <!-- insert cards here --> */}

          <div className="col gy-4">
            <div className="container px-2 pop" style={{ maxWidth: "500px" }}>
              <div
                className="card rounded-5 border-3"
                style={{ borderColor: "#ffcb05" }}
              >
                <div className="card-header fs-4 fw-bold text-center pb-0">
                  Hive #
                </div>
                <div className="card-header fs-6 fw-bold text-center pb-0">
                  1
                </div>
                <div
                  className="card-body pb-2 pt-1 mt-0 m-1 mb-2 d-flex fw-semibold fs-5 
                      justify-content-between align-items-baseline"
                >
                  <div>Added: </div>
                  <div>2/10/24</div>
                </div>

                <div>100%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- cards end --> */}

      <Footer />
    </>
  );
}
