import React, { useEffect, useState } from "react";
import { Table, Button, InputGroup, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  deleteSiteEntry,
  fetchSiteEntries,
} from "../../../redux/slices/siteEntrySlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

function SiteEntryTable() {
  const dispatch = useDispatch();
  const { entries } = useSelector((state) => state.entries);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSite, setSelectedSite] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  // console.log(entries);

  useEffect(() => {
    dispatch(fetchSiteEntries());
  }, [dispatch]);

  const HandleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSiteEntry(id))
          .then(() => {
            Swal.fire(
              "Deleted!",
              "The site entry has been deleted.",
              "success"
            );
            dispatch(fetchSiteEntries()); // Refresh the table after delete
          })
          .catch((error) => {
            Swal.fire("Error!", "Something went wrong.", "error");
          });
      }
    });
  };

  const uniqueSites = [...new Set(entries.map((entry) => entry.siteName))];

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.workerId?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSite =
      selectedSite === "All" || entry.siteName === selectedSite;

    return matchesSearch && matchesSite;
  });

  const totalPages = Math.ceil(filteredEntries.length / itemsPerPage);
  const paginatedEntries = filteredEntries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedSite]);

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

      <div className="d-flex flex-wrap gap-3 mb-3">
        <InputGroup style={{ maxWidth: "300px" }}>
          <Form.Control
            placeholder="Search by name or ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>

        <Form.Select
          style={{ maxWidth: "200px" }}
          value={selectedSite}
          onChange={(e) => setSelectedSite(e.target.value)}
        >
          <option value="All">All Sites</option>
          {uniqueSites.map((site, i) => (
            <option key={i} value={site}>
              {site}
            </option>
          ))}
        </Form.Select>
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
            {paginatedEntries.length > 0 ? (
              paginatedEntries?.map((entry, index) => (
                <tr key={index}>
                  <td className="ps-4">{entry.fullName}</td>
                  <td>{entry.workerId}</td>
                  <td>{entry.phoneNumber}</td>
                  <td>{entry.emailAddress}</td>
                  <td>{entry.siteName}</td>
                  <td>{entry.siteSupervisor}</td>
                  <td>{new Date(entry.inductionDate).toLocaleDateString()}</td>
                  <td>{entry.siteLocation}</td>
                  <td className="pe-4">
                    <div className="d-flex gap-2">
                      <Link to={`/siteEntry/${entry._id}`}>
                        <button className="btn text-primary p-0">
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                      </Link>
                      <button
                        className="btn text-danger p-0"
                        onClick={() => HandleDelete(entry._id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-3">
                  No site entries found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-end mt-3">
          <Button
            size="sm"
            variant="outline-secondary"
            className="me-2"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              size="sm"
              variant={currentPage === i + 1 ? "primary" : "outline-secondary"}
              className="mx-1"
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            size="sm"
            variant="outline-secondary"
            className="ms-2"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default SiteEntryTable;

