import React, { useEffect, useState } from "react";
import axios from "axios";
import LoadSpinner from "../components/Spinner";
import CustomNavbar from "../components/CustomNavbar";
import Footer from "../components/Footer";
import smokyApiaryImage from "../assets/images/smoky_apiary@3x.jpg";
import { FaCloudShowersHeavy } from "react-icons/fa";
import HiveCard from "../components/HiveCard";

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
            <span className="card-text mb-0 ms-2 mt-" id="city">
              Ortonville
            </span>
            <div>
              <span className="card-text mb-0">
                <FaCloudShowersHeavy />
              </span>
              <span className="card-text mb-0" id="temp">
                42℉
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="container text-center" style={{ color: "#ffcb05" }}>
        <div className="row row-cols-1 row-cols-lg-3 g-2">
          {/* <!-- insert cards here --> */}
          <HiveCard />
          <HiveCard />
          <HiveCard />
          <HiveCard />
          <HiveCard />
          <HiveCard />
          {/* <HiveCard2 /> */}
        </div>
      </div>

      {/* <!-- cards end --> */}

      <Footer />
    </>
  );
}
