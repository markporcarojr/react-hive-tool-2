import React from "react";
import { Link } from "react-router-dom";

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

  const formattedDate = new Date(inspectionDate).toLocaleDateString("en-US");

  return (
    <div className={`col gy-4 `} data-hive-number={hiveNumber}>
      <div
        className={`container text-start px-2 pop `}
        style={{ maxWidth: "500px" }}
      >
        <div
          style={{ borderColor: "#ffcb05" }}
          className={`card border-michgold border-3 rounded-5 mx-auto ${
            temperament === "⚠️ Dead" ? "bg-danger" : "bg-card"
          }`}
        >
          <div className="container text-michgold card-body d-flex justify-content-between border-bottom border-3 border-michgold">
            {/* <svg
              height="50px"
              width="50px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
              xmlSpace="preserve"
              fill="#000000"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />

              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                <g transform="translate(1 1)">
                  <g>
                    <polygon
                      style="fill: #fdcc00"
                      points="17.286,81.286 364.714,81.286 364.714,8.143 17.286,8.143 "
                    />
                    <polygon
                      style="fill: #fdcc00"
                      points="364.714,81.286 492.714,81.286 492.714,8.143 364.714,8.143 "
                    />
                  </g>
                  <g>
                    <polygon
                      style="fill: #ffe100"
                      points="346.429,447 474.429,447 474.429,81.286 346.429,81.286 "
                    />
                    <polygon
                      style="fill: #ffe100"
                      points="35.571,501.857 90.429,501.857 90.429,447 35.571,447 "
                    />
                    <polygon
                      style="fill: #ffe100"
                      points="264.143,501.857 319,501.857 319,447 264.143,447 "
                    />
                    <polygon
                      style="fill: #ffe100"
                      points="419.571,501.857 474.429,501.857 474.429,447 419.571,447 "
                    />
                    <polygon
                      style="fill: #ffe100"
                      points="35.571,447 346.429,447 346.429,81.286 35.571,81.286 "
                    />
                  </g>
                  <polygon
                    style="fill: #ffffff"
                    points="35.571,501.857 63,501.857 63,81.286 35.571,81.286 "
                  />
                  <polygon
                    style="fill: #ffa800"
                    points="447,501.857 474.429,501.857 474.429,81.286 447,81.286 "
                  />
                  <polygon
                    style="fill: #ffffff"
                    points="17.286,81.286 44.714,81.286 44.714,8.143 17.286,8.143 "
                  />
                  <g>
                    <polygon
                      style="fill: #ffa800"
                      points="465.286,81.286 492.714,81.286 492.714,8.143 465.286,8.143 "
                    />
                    <polygon
                      style="fill: #ffa800"
                      points="191,337.286 163.571,319 163.571,291.571 191,273.286 218.429,291.571 218.429,319 "
                    />
                    <polygon
                      style="fill: #ffa800"
                      points="218.429,383 191,364.714 191,337.286 218.429,319 245.857,337.286 245.857,364.714 "
                    />
                    <polygon
                      style="fill: #ffa800"
                      points="163.571,383 136.143,364.714 136.143,337.286 163.571,319 191,337.286 191,364.714 "
                    />
                  </g>
                  <path
                    style="fill: #63d3fd"
                    d="M236.714,209.286h-91.429c-15.543,0-27.429-11.886-27.429-27.429s11.886-27.429,27.429-27.429 h91.429c15.543,0,27.429,11.886,27.429,27.429S252.257,209.286,236.714,209.286"
                  />
                  <path
                    style="fill: #3db9f9"
                    d="M236.714,154.429h-27.429c15.543,0,27.429,11.886,27.429,27.429s-11.886,27.429-27.429,27.429 h27.429c15.543,0,27.429-11.886,27.429-27.429S252.257,154.429,236.714,154.429"
                  />
                  <path d="M373.857,90.429H8.143V-1h365.714V90.429z M26.429,72.143h329.143V17.286H26.429V72.143z" />
                  <path d="M501.857,90.429H355.571V-1h146.286V90.429z M373.857,72.143h109.714V17.286H373.857V72.143z" />
                  <path d="M355.571,456.143H26.429v-384h329.143V456.143z M44.714,437.857h292.571V90.429H44.714V437.857z" />
                  <path d="M483.571,456.143H337.286v-384h146.286V456.143z M355.571,437.857h109.714V90.429H355.571V437.857z" />
                  <path d="M90.429,511H35.571c-5.486,0-9.143-3.657-9.143-9.143V447c0-5.486,3.657-9.143,9.143-9.143h54.857 c5.486,0,9.143,3.657,9.143,9.143v54.857C99.571,507.343,95.914,511,90.429,511z M44.714,492.714h36.571v-36.571H44.714V492.714z" />
                  <path d="M319,511h-54.857c-5.486,0-9.143-3.657-9.143-9.143V447c0-5.486,3.657-9.143,9.143-9.143H319 c5.486,0,9.143,3.657,9.143,9.143v54.857C328.143,507.343,324.486,511,319,511z M273.286,492.714h36.571v-36.571h-36.571V492.714z" />
                  <path d="M474.429,511h-54.857c-5.486,0-9.143-3.657-9.143-9.143V447c0-5.486,3.657-9.143,9.143-9.143h54.857 c5.486,0,9.143,3.657,9.143,9.143v54.857C483.571,507.343,479.914,511,474.429,511z M428.714,492.714h36.571v-36.571h-36.571 V492.714z" />
                  <path d="M474.429,127h-64c-5.486,0-9.143-3.657-9.143-9.143s3.657-9.143,9.143-9.143h64c5.486,0,9.143,3.657,9.143,9.143 S479.914,127,474.429,127z" />
                  <path d="M474.429,163.571h-36.571c-5.486,0-9.143-3.657-9.143-9.143s3.657-9.143,9.143-9.143h36.571 c5.486,0,9.143,3.657,9.143,9.143S479.914,163.571,474.429,163.571z" />
                  <path d="M474.429,200.143h-64c-5.486,0-9.143-3.657-9.143-9.143s3.657-9.143,9.143-9.143h64c5.486,0,9.143,3.657,9.143,9.143 S479.914,200.143,474.429,200.143z" />
                  <path d="M474.429,236.714h-36.571c-5.486,0-9.143-3.657-9.143-9.143s3.657-9.143,9.143-9.143h36.571 c5.486,0,9.143,3.657,9.143,9.143S479.914,236.714,474.429,236.714z" />
                  <path d="M474.429,273.286h-64c-5.486,0-9.143-3.657-9.143-9.143s3.657-9.143,9.143-9.143h64c5.486,0,9.143,3.657,9.143,9.143 S479.914,273.286,474.429,273.286z" />
                  <path d="M474.429,309.857h-36.571c-5.486,0-9.143-3.657-9.143-9.143c0-5.486,3.657-9.143,9.143-9.143h36.571 c5.486,0,9.143,3.657,9.143,9.143S479.914,309.857,474.429,309.857z" />
                  <path d="M474.429,346.429h-64c-5.486,0-9.143-3.657-9.143-9.143c0-5.486,3.657-9.143,9.143-9.143h64 c5.486,0,9.143,3.657,9.143,9.143C483.571,342.771,479.914,346.429,474.429,346.429z" />
                  <path d="M474.429,419.571h-64c-5.486,0-9.143-3.657-9.143-9.143s3.657-9.143,9.143-9.143h64c5.486,0,9.143,3.657,9.143,9.143 S479.914,419.571,474.429,419.571z" />
                  <path d="M474.429,383h-36.571c-5.486,0-9.143-3.657-9.143-9.143c0-5.486,3.657-9.143,9.143-9.143h36.571 c5.486,0,9.143,3.657,9.143,9.143C483.571,379.343,479.914,383,474.429,383z" />
                  <path d="M236.714,218.429h-91.429c-20.114,0-36.571-16.457-36.571-36.571s16.457-36.571,36.571-36.571h91.429 c20.114,0,36.571,16.457,36.571,36.571S256.829,218.429,236.714,218.429z M145.286,163.571c-10.057,0-18.286,8.229-18.286,18.286 s8.229,18.286,18.286,18.286h91.429c10.057,0,18.286-8.229,18.286-18.286s-8.229-18.286-18.286-18.286H145.286z" />
                  <path d="M191,346.429c-1.829,0-3.657-0.914-5.486-1.829l-27.429-18.286c-1.829-1.829-3.657-4.571-3.657-7.314v-27.429 c0-2.743,1.829-5.486,3.657-7.314l27.429-18.286c2.743-1.829,7.314-1.829,10.057,0L223,284.257 c2.743,1.829,3.657,4.571,3.657,7.314V319c0,2.743-1.829,5.486-3.657,7.314L195.571,344.6 C194.657,345.514,192.829,346.429,191,346.429z M172.714,314.429L191,326.314l18.286-11.886v-17.371L191,285.171l-18.286,11.886 V314.429z" />
                  <path d="M218.429,392.143c-1.829,0-3.657-0.914-5.486-1.829l-27.429-18.286c-1.829-1.829-3.657-4.571-3.657-7.314v-27.429 c0-2.743,1.829-5.486,3.657-7.314l27.429-18.286c2.743-1.829,7.314-1.829,10.057,0l27.429,18.286 c2.743,1.829,3.657,4.571,3.657,7.314v27.429c0,2.743-1.829,5.486-3.657,7.314L223,390.314 C222.086,391.229,220.257,392.143,218.429,392.143z M200.143,360.143l18.286,11.886l18.286-11.886v-17.371l-18.286-11.886 l-18.286,11.886V360.143z" />
                  <path d="M163.571,392.143c-1.829,0-3.657-0.914-5.486-1.829l-27.429-18.286c-1.829-1.829-3.657-4.571-3.657-7.314v-27.429 c0-2.743,1.829-5.486,3.657-7.314l27.429-18.286c2.743-1.829,7.314-1.829,10.057,0l27.429,18.286 c2.743,1.829,3.657,4.571,3.657,7.314v27.429c0,2.743-1.829,5.486-3.657,7.314l-27.429,18.286 C167.229,391.229,165.4,392.143,163.571,392.143z M145.286,360.143l18.286,11.886l18.286-11.886v-17.371l-18.286-11.886 l-18.286,11.886V360.143z" />
                </g>
              </g>
            </svg> */}
            <h2 className="mt-1">Hive #{hiveNumber}</h2>
            <div className="text-center mt-2">
              <p className="mb-0">Last Inspected</p>
              <div>{formattedDate}</div>
            </div>
          </div>
          <div className="d-flex justify-content-between text-michgold mx-4 mt-3">
            <div>Hive Strength</div>
            <div>{hiveStrength}％</div>
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
            <Link
              to={`/inspections/delete/${inspection._id}`}
              className="btn btn-outline-danger rounded-pill"
            >
              DELETE
            </Link>
            <Link
              to={`/inspections/edit/${inspection._id}`}
              className="btn btn-outline-warning rounded-pill"
            >
              EDIT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InspectionCard;