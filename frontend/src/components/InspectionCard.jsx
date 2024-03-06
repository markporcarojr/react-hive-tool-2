import React from "react";

function InspectionCard({ inspection }) {
  const {
    hiveNumber,
    inspectionDate,
    hiveStrength,
    temperament,
    queen,
    brood,
    eggs,
    disease,
    pests,
    queenCell,
    inspectionNote,
    id,
  } = inspection;

  return (
    <div
      className={`col gy-4 ${temperament === "⚠️ Dead" ? "bg-danger" : ""}`}
      data-hive-number={hiveNumber}
    >
      <div
        className="container text-start px-2 pop"
        style={{ maxWidth: "500px" }}
      >
        <div className="card border-michgold border-3 rounded-5 m- mx-auto">
          <div className="container text-michgold card-body d-flex justify-content-between border-bottom border-3 border-michgold">
            <svg
              height="50px"
              width="50px"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              fill="#000000"
            >
              {/* SVG Paths */}
            </svg>
            <h2 className="mt-1">Hive # {hiveNumber}</h2>
            <div className="text-center mt-2">
              <div>{inspectionDate}</div>
            </div>
          </div>
          <div className="d-flex justify-content-between text-michgold mx-4 mt-3">
            <div>Hive Strength</div>
            <div>% {hiveStrength}</div>
          </div>
          <div className="card-body text-michgold">
            <p className="card-text m-0">{temperament}</p>
            <p className="card-text m-0">{queen}</p>
            <p className="card-text m-0">{brood}</p>
            <p className="card-text m-0">{eggs}</p>
            <p className="card-text m-0">{disease}</p>
            <p className="card-text m-0">{pests}</p>
            <p className="card-text m-0">{queenCell}</p>
          </div>
          <div className="d-flex justify-content-between text-michgold mx-4 my-2">
            <div>
              <p>{inspectionNote}</p>
            </div>
          </div>
          <div className="d-flex justify-content-between mx-3 mb-2">
            <form
              action={`/inspection/delete/${id}?_method=DELETE`}
              method="post"
            >
              <input type="hidden" name="_method" value="DELETE" />
              <input
                type="submit"
                value="DELETE"
                className={`btn rounded-5 ${
                  temperament === "⚠️ Dead"
                    ? "btn-outline-warning"
                    : "btn-outline-danger"
                }`}
              />
            </form>
            <a
              href={`/inspection/edit/${id}`}
              className="btn btn-outline-warning rounded-5 px-4"
              style={{ maxWidth: "30vw" }}
            >
              EDIT
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InspectionCard;
