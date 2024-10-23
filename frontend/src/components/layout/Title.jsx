const Title = () => {
  return (
    <div id="title" className="container title">
      <h1 className="text-center text-white mt-2 outlined-text display-1 fw-bold apiary"></h1>
      <h5 className="card-title mt-3 fs-2 outlined-text" id="datetime"></h5>
      <div className="d-flex justify-content-between text-white align-items-center outlined-text fs-3 fw-bold my-1 me-2">
        <span className="card-text mb-0 ms-2 mt-" id="city"></span>

        <div>
          <span className="card-text mb-0">
            <img id="clouds" src="" alt="" />
          </span>
          <span className="card-text mb-0" id="temp"></span>
        </div>
      </div>
    </div>
  );
};

export default Title;
