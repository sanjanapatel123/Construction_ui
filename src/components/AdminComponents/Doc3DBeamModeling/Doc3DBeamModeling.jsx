import React, { useEffect } from "react";
import { IoIosRocket } from "react-icons/io";
import { RiAdminFill } from "react-icons/ri";
import { IoNotificationsSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

function Doc3DBeamModeling() {
    useEffect(() => {
        // Attach click event on action links (using class "text-primary")
        const actionLinks = document.querySelectorAll(".text-primary");
    
        const handleClick = (e) => {
          e.preventDefault();
          console.log("Action clicked:", e.target.textContent);
          // Add action functionality here
        };
    
        actionLinks.forEach((link) => {
          link.addEventListener("click", handleClick);
        });
    
        return () => {
          actionLinks.forEach((link) => {
            link.removeEventListener("click", handleClick);
          });
        };
      }, []);
    
  return (
    <div>
       <div className="container-fluid">
      {/* Top Navigation */}
      <div className="row  py-3  align-items-center">
        <div className="col ps-3 d-flex align-items-center">
          <h2 className="h4 fw-semibold mb-0">Documents</h2>
        </div>
        <div className="col-auto pe-3 d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-1">
            <IoNotificationsSharp style={{ width: "20px", height: "20px", color:"#0041a8"}} />
            <RiAdminFill
            
              className="rounded-circle me-2"
              style={{ width: "30px", height: "30px", color:"#0041a8" }}
            />
            <div>
              <span className="small fw-medium">John Smith</span>
              <p className="small text-secondary mb-0">Project Manager</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4">
        {/* 3D BIM Models Section */}
        <div className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="h5 fw-semibold mb-0">3D BIM Models</h3>
         <Link to="/open-bim"><button className="btn btn-light">
              <i className="fas fa-eye me-2"></i> Open BIM Viewer
            </button></Link>
          </div>
          <div className="row g-3">
            {/* BIM Building Model */}
            <div className="col-12 col-md-4 mb-3">
              <div className="card h-100 shadow-sm border-0">
                {/* Gray placeholder like in the image */}
                <div className="d-flex justify-content-center align-items-center bg-secondary-subtle m-2"
                  style={{ height: "220px", borderRadius: "0.5rem" }} >
                  <span className="text-secondary fs-4 fw-semibold">
                    BIM Building Model
                  </span>
                </div>

                {/* Title and buttons */}
                <div className="card-body px-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="card-title  fw-semibold text-dark text-truncate ">
                      BIM Building Model v1.3
                    </h6>
                    <div className="d-flex justify-content-end gap-2">
                      <button className="btn btn-link text-primary p-0">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="btn btn-link text-primary p-0">
                        <i className="fas fa-download"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MEP Systems Model */}

            <div className="col-12 col-md-4 mb-3">
              <div className="card h-100 shadow-sm border-0">
                {/* Gray placeholder like in the image */}
                <div
                  className="d-flex justify-content-center align-items-center bg-secondary-subtle m-2"
                  style={{ height: "220px", borderRadius: "0.5rem" }}
                >
                  <span className="text-secondary fs-4 fw-semibold">
                    MEP Systems
                  </span>
                </div>

                {/* Title and buttons */}
                <div className="card-body px-2 py-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="card-title mb-2 fw-semibold text-dark text-truncate">
                      MEP Systems Model v2.1
                    </h6>
                    <div className="d-flex justify-content-end gap-2">
                      <button className="btn btn-link text-primary p-0">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="btn btn-link text-primary p-0">
                        <i className="fas fa-download"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Structural Model */}

            <div className="col-12 col-md-4 mb-3">
              <div className="card h-100 shadow-sm border-0">
                {/* Gray placeholder like in the image */}
                <div
                  className="d-flex justify-content-center align-items-center bg-secondary-subtle m-2"
                  style={{ height: "220px", borderRadius: "0.5rem" }}
                >
                  <span className="text-secondary fs-4 fw-semibold">
                    Structural
                  </span>
                </div>

                {/* Title and buttons */}
                <div className="card-body px-2 py-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="card-title mb-2 fw-semibold text-dark text-truncate">
                      Structural Model v1.5
                    </h6>
                    <div className="d-flex justify-content-end gap-2">
                      <button className="btn btn-link text-primary p-0">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="btn btn-link text-primary p-0">
                        <i className="fas fa-download"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3D BIM Modeling & Drawing Markup Features Section */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h3 className="h5 fw-semibold mb-4">
              3D BIM Modeling &amp; Drawing Markup Features
            </h3>
            <div className="row">
              {/* Features */}
              <div className="col-12 col-md-6">
                <h4 className="h6 fw-medium mb-3 d-flex align-items-center">
                  <i className="fas fa-star text-warning me-2"></i> Features:
                </h4>
                <ul className="list-unstyled text-secondary">
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    Interactive 3D Viewer (Zoom, Rotate, Layers)
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    Markup &amp; Annotation (Highlight, Draw, Add notes)
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    Attach RFIs to Markup (Direct issue reporting)
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    Approval Workflow (Accept/Reject markup changes)
                  </li>
                </ul>
              </div>
              {/* Actions */}
              <div className="col-12 col-md-6">
                <h4 className="h6 fw-medium mb-3 d-flex align-items-center">
                  {/* <i className="fas fa-plan text-warning me-2"></i> */}
                  <IoIosRocket />
                  Actions:
                </h4>
                <ul className="list-unstyled textDecoration: 'none'.">
                  <li className="mb-2">
                    <a
                      href="#"
                      className="text-dark "
                      style={{ textDecoration: "none" }}
                    >
                      Add Markup to Drawings
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="text-dark"
                      style={{ textDecoration: "none" }}
                    >
                      Generate RFI from Markup
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="text-dark"
                      style={{ textDecoration: "none" }}
                    >
                      Approve or Request Revision
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Doc3DBeamModeling
