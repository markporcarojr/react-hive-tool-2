import { Table } from "react-bootstrap";

const formatDate = (dateString) => {
  const utcDate = new Date(dateString);
  const options = { timeZone: "UTC" };
  return utcDate.toLocaleDateString("en-US", options);
};

const HiveTable = ({ userInspections, userFeeds, userTreatments }) => {
  // Extract the Hive Number from the inspection
  const hiveNumber =
    userInspections.length > 0 ? userInspections[0].hiveNumber : null;

  const compareDates = (a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateB - dateA; // Sort in descending order (newest to oldest)
  };

  // Sort user data by date before rendering
  const sortedInspections = userInspections.sort((a, b) =>
    compareDates(a.inspectionDate, b.inspectionDate)
  );
  const sortedFeeds = userFeeds.sort((a, b) =>
    compareDates(a.feedDate, b.feedDate)
  );
  const sortedTreatments = userTreatments.sort((a, b) =>
    compareDates(a.treatmentDate, b.treatmentDate)
  );

  return (
    <div className="text-michgold text-center m-3">
      <h1>Hive #{hiveNumber}</h1>
      <Table
        bordered
        striped
        hover
        responsive
        variant="dark"
        className="text-michgold"
      >
        <thead className="fs-5">
          <tr>
            <th>Date</th>
            <th>Feeding</th>
            <th>Treatment</th>
            <th>Inspection</th>
          </tr>
        </thead>
        <tbody>
          {sortedInspections.map((inspection) => (
            <tr key={inspection._id}>
              <td>{formatDate(inspection.inspectionDate)}</td>
              <td></td>
              <td></td>
              <td>
                {inspection.temperament} - %{inspection.hiveStrength}
              </td>
            </tr>
          ))}
          {sortedFeeds.map((feed) => (
            <tr key={feed._id}>
              <td>{formatDate(feed.feedDate)}</td>
              <td>{feed.feed}</td>
              <td></td>
              <td></td>
            </tr>
          ))}
          {sortedTreatments.map((treatment) => (
            <tr key={treatment._id}>
              <td>{formatDate(treatment.treatmentDate)}</td>
              <td></td>
              <td>{treatment.treatmentType}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default HiveTable;

const tableData = [
  {
    date: 11212,
    feed: "sugar",
    treatment: "Oxalic acid",
    Inspection: "Active",
  },
  {
    date: 11212,
    feed: "sugar",
    treatment: "Oxalic acid",
    Inspection: "Active",
  },
];
