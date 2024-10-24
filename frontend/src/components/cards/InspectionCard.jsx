function InspectionCard({ inspection }) {
  if (!inspection) {
    return <div>No hive data available</div>;
  }
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
    feeding,
    treatments,
    queenCell,
    inspectionNote,
    weatherCondition,
    weatherTemp,
    id,
    userId,
  } = inspection;

  const utcDate = new Date(inspectionDate);
  const options = { timeZone: "UTC" };
  const formattedDate = utcDate.toLocaleDateString("en-US", options);

  return (
    <div data-hive-number={hiveNumber}>
      <div className={`container text-start`}>
        <div
          className={`card   ${
            temperament === "⚠️ Dead" || hiveStrength === 0
              ? "bg-danger"
              : "bg-card"
          }`}
        >
          <h2 className="mt-1 text-michgold text-center mb-0">
            Hive #{hiveNumber}
          </h2>
          <div className="container text-michgold card-body d-flex justify-content-between border-bottom border-3 border-michgold">
            <div className="text-center mt-">
              <p className="mb-0">{weatherCondition}</p>
              <div>{weatherTemp} ℉</div>
            </div>
            <div className="text-center mt-">
              <p className="mb-0">Inspected</p>
              <div>{formattedDate}</div>
            </div>
          </div>
          <div className="d-flex justify-content-between text-michgold mx-4 mt-3">
            <div>Hive Strength</div>
            <div>{hiveStrength}％</div>
          </div>
          <div className="card-body text-michgold">
            <p className="card-text m-0">{temperament}</p>
            <p className="card-text m-0">{eggs}</p>
            <p className="card-text m-0">{queen}</p>
            <p className="card-text m-0">{brood}</p>
            <p className="card-text m-0">{disease}</p>
            <p className="card-text m-0">{pests}</p>
            <p className="card-text m-0">{queenCell}</p>
            <p className="card-text m-0">{feeding}</p>
            <p className="card-text m-0">{treatments}</p>
          </div>
          <div className="text-michgold mx-4 my-2">
            <div>
              <p>Notes: {inspectionNote}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InspectionCard;
