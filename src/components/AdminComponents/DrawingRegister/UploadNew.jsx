import React from "react";
import { FaDrawPolygon } from "react-icons/fa";
import { FaFolder } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaFileAlt } from "react-icons/fa";
import { FaUpload } from "react-icons/fa";
import { FaCircleQuestion } from "react-icons/fa6";
import { FaRulerCombined, FaHashtag } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { Link } from "react-router-dom";

function UploadNew() {
  return (
    <div className="">
    <div>
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
        <h4 className="fw-semibold mb-2 ">Drawing Register</h4>

        {/* Filters + Search Input */}
        <div className="d-flex flex-wrap gap-2 flex-grow-1 ">
          <select className=" p-2 border rounded text-sm  m-1">
            <option>Project Alpha Construction</option>
            <option>Drawing</option>
          </select>
          <input type="text"
            placeholder="Search documents..."
            className="p-2 border rounded text-sm flex-1 min-w-[100px] m-1" />
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-2">
         
          <button className="btn btn-outline-secondary btn-sm d-flex align-items-center">
            <FaCircleQuestion className="me-1" />
            Create RFI
          </button>
        </div>
      </div>
    </div>

    {/* Top Navbar */}
    <div className="d-flex justify-content-between align-items-center bg-light px-3 py-2 border-bottom">
      <div className="d-flex gap-3">
        <strong>File</strong>
        <strong>Edit</strong>
        <strong>View</strong>
        <strong>Tools</strong>
      </div>
     <Link to="/DrawingRegister"> <button id="btn_itp" className="btn btn-dark btn-sm">
        {/* <FaSave className="me-1" /> */}
        Save Project
      </button></Link>
    </div>

    {/* Main Layout */}
    <div className="row vh-100 mt-2">
      {/* Left Sidebar */}
      <div className="col-md-2 col-12 border-end p-3 bg-white">
        <h6 className="fw-bold mb-3">Measurement Tools</h6>

        <button id="btn_itp" className="btn btn-light w-100 mb-2 d-flex align-items-center gap-1 flex-nowrap">
          < FaRulerCombined />
          Linear Measurement
        </button>

        <button className="btn btn-light w-100 mb-2 d-flex align-items-center gap-1">
          {/* <FaDrawPolygon /> */}
          <FaPlay />
          Area Calculation
        </button>

        <button className="btn btn-light w-100 mb-3 d-flex align-items-center gap-1">
          <FaHashtag /> Count Tool
        </button>

        <label className="form-label mt-4">Scale Settings</label>
        <select className="form-select form-select-sm">
          <option>1:100</option>
          <option>1:50</option>
          <option>1:25</option>
        </select>
      </div>
      {/* .............................................................................. */}

      {/* Center Drawing Area */}

      <div className="col-md-7 col-12 d-flex flex-column align-items-center justify-content-center text-center p-4">
        <div className="border rounded bg-light w-100 h-100 d-flex flex-column justify-content-center align-items-center">
          <FaUpload size={30} className="text-secondary mb-3" />
          <p className="text-muted">
            Drag and drop your construction drawing here <br />
            or click to upload
          </p>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="col-md-3 col-12 border-start p-3 bg-white ">
        <div className="mb-4 gap-2">
          <h6 className="fw-bold mb-2">Current Measurement</h6>
          <div className="bg-light p-2 rounded">
            <div className="bg-light p-2 rounded">
              <div className="d-flex flex-column flex-sm-row justify-content-between gap-3">
                <div className="d-flex flex-column text-start">
                  <span>Length:</span>
                  <strong>0.00 m</strong>
                </div>

                <div className="d-flex flex-column text-start">
                  <span>Area:</span>
                  <strong>0.00 m²</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <h6 className="fw-bold">Markup Properties</h6>
          <p>Color</p>
          <div className="d-flex gap-2 mb-2">
            <span
              className="bg-danger rounded-circle"
              style={{ width: 20, height: 20 }}
            ></span>
            <span
              className="bg-success rounded-circle"
              style={{ width: 20, height: 20 }}
            ></span>
            <span
              className="bg-primary rounded-circle"
              style={{ width: 20, height: 20 }}
            ></span>
            <span
              className="bg-warning rounded-circle"
              style={{ width: 20, height: 20 }}
            ></span>
          </div>
          <p>Line Weight</p>
          <input type="range" className="form-range" />
        </div>

        <div className="mb-4">
          <h6 className="fw-bold">Layers</h6>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultChecked
            />
            <label className="form-check-label">Measurements</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input "
              type="checkbox"
              defaultChecked
            />
            <label className="form-check-label">Annotations</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              defaultChecked
            />
            <label className="form-check-label">Base Drawing</label>
          </div>
        </div>

        <div className="mb-4 ">
          <h6 className="fw-bold">Documents</h6>
          <ul className="list-unstyled">
            <li className="d-flex justify-content-between ">
              <FaFolder className="m-1" />
           <span>Architectural Drawings</span>
              <span className="badge bg-secondary m-1">128</span>
            </li>
            <li className="d-flex justify-content-between">
              <FaFolder className="m-1" />
              <span>Structural Plans</span>
              <span className="badge bg-secondary m-1">86</span>
            </li>
            <li className="d-flex justify-content-between ">
              <FaFolder className="m-1" />
              <span>MEP Documents</span>
              <span className="badge bg-secondary m-1">54</span>
            </li>
          </ul>
        </div>

        <div className="p-1">
          <h6 className="fw-bold mb-3">Integrations</h6>

          <div className="d-grid gap-2">
            <button className="btn btn-outline-secondary btn-sm w-100 d-flex align-items-center justify-content-center gap-2">
              <FaExternalLinkAlt className="mb-1" />
              <span>Open in Bluebeam</span>
            </button>

            <button className="btn btn-outline-secondary btn-sm w-100 d-flex align-items-center justify-content-center gap-2">
              <FaFileAlt className="mb-1 " />
              <span>Cubit Estimation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default UploadNew