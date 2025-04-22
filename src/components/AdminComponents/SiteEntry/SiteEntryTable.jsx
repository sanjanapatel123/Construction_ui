import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SiteEntryTable() {
  const siteEntries = [
    {
      fullName: "Rahul Sharma",
      workerId: "W12345",
      phoneNumber: "9876543210",
      emailAddress: "rahul@example.com",
      siteName: "Site A",
      siteSupervisor: "Mr. Verma",
      inductionDate: "2025-04-18",
      siteLocation: "Delhi"
    },
    {
      fullName: "Priya Patel",
      workerId: "W12346",
      phoneNumber: "9123456789",
      emailAddress: "priya@example.com",
      siteName: "Site B",
      siteSupervisor: "Ms. Sharma",
      inductionDate: "2025-04-17",
      siteLocation: "Mumbai"
    },
    // Add more entries here if needed
  ];

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(siteEntries.length / itemsPerPage);

  const paginatedEntries = siteEntries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="container ">
      {/* Header */}
      <div className="d-flex justify-content-between mb-3 ">
        <h4>Site Entry</h4>
        <Link to="/siteEntry">
          <button className="btn btn-primary">
            <i className="fa-solid fa-plus me-2"></i>Site Entry
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="table-responsive shadow-sm bg-white rounded p-2">
        <Table className="mb-0 table-bordered table-striped align-middle">
          <thead className="table-light p-2">
            <tr>
              <th className="ps-4">Full Name</th>
              <th>Worker ID</th>
              <th>Phone Number</th>
              <th>Email Address</th>
              <th>Site Name</th>
              <th>Site Supervisor</th>
              <th>Induction Date</th>
              <th>Site Location</th>
              <th className="pe-4">Action</th>
            </tr>
          </thead>
          <tbody className="p-2">
            {paginatedEntries.map((entry, index) => (
              <tr key={index}>
                <td className="ps-4">{entry.fullName}</td>
                <td>{entry.workerId}</td>
                <td>{entry.phoneNumber}</td>
                <td>{entry.emailAddress}</td>
                <td>{entry.siteName}</td>
                <td>{entry.siteSupervisor}</td>
                <td>{entry.inductionDate}</td>
                <td>{entry.siteLocation}</td>
                <td className="pe-4">
                  <div className="d-flex gap-2">
                    <button className="btn text-primary p-0">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button className="btn text-danger p-0">
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-end my-3 ">
          <Button
            size="sm"
            variant="outline-secondary"
            className="me-2"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i + 1}
              size="sm"
              variant={currentPage === i + 1 ? "primary" : "outline-secondary"}
              className="ms-1"
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            size="sm"
            variant="outline-secondary"
            className="ms-2"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SiteEntryTable;
