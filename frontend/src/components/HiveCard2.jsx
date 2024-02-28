const HiveCard2 = ({ data }) => {
  return (
    <div className="container text-center text-michgold">
      <div className="row row-cols-1 row-cols-lg-3 g-2">
        {/* Map over data to render cards */}
        {data.map((hive) => (
          <div className="col gy-4" key={hive.id}>
            <div className="container px-2 pop" style={{ maxWidth: "500px" }}>
              <div
                className={`card text-michgold border-michgold rounded-5 border-3 ${
                  hive.hiveStrength === 0 ? "bg-danger" : ""
                }`}
              >
                <div className="card-header fs-4 fw-bold text-center pb-0">
                  Hive # {hive.hiveNumber}
                </div>
                <div className="card-header fs-6 fw-bold text-center pb-0">
                  {hive.breed}
                </div>
                <div className="card-body pb-2 pt-1 mt-0 m-1 mb-2 d-flex fw-semibold fs-5 justify-content-between align-items-baseline">
                  <div>Added: </div>
                  <div>{hive.hiveDate}</div>
                  <div>{hive.hiveStrength}%</div>
                </div>
                <div className="d-flex justify-content-between mx-3 mb-2">
                  <form
                    action={`/hive/delete/${hive.id}?_method=DELETE`}
                    method="post"
                  >
                    <input type="hidden" name="_method" value="DELETE" />
                    <button
                      type="submit"
                      className={`btn btn-rounded ${
                        hive.hiveStrength === 0 ? "btn-warning" : "btn-danger"
                      }`}
                    >
                      DELETE
                    </button>
                  </form>
                  <a
                    href={`/hive/edit/${hive.id}`}
                    className="btn btn-warning rounded-5 px-4"
                    style={{ maxWidth: "30vw" }}
                  >
                    EDIT
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixedBtn">
        <a
          href="hive-form"
          type="button"
          className="btn btn-lg px-4 btn-michgold btn-gold rounded-pill"
          style={{ position: "fixed", left: "40%", top: "78%" }}
        >
          ADD
        </a>
      </div>
    </div>
  );
};

export default HiveCard2;
