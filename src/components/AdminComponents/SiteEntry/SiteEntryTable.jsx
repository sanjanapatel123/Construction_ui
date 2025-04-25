import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { deleteSiteEntry, fetchSiteEntries } from '../../../redux/slices/siteEntrySlice';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
function SiteEntryTable() {
  const dispatch= useDispatch()
  const {entries}= useSelector((state)=>state.entries)
  console.log(entries)
  useEffect(()=>{
    dispatch(fetchSiteEntries())
  } ,[])
 
  const HandleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSiteEntry  (id))
          .then(() => {
            Swal.fire(
              'Deleted!',
              'The site entry has been deleted.',
              'success'
            );
            dispatch(fetchSiteEntries());  // Refresh the table after delete
          })
          .catch((error) => {
            Swal.fire(
              'Error!',
              'Something went wrong.',
              'error'
            );
          });
      }
    });
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
  {entries && entries.length > 0 ? (
    entries.map((entry, index) => (
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
          <Link to={`/siteEntry/${entry._id}`}><button className="btn text-primary p-0">
              <i className="fa-solid fa-pen-to-square"></i>
            </button></Link>
            <button className="btn text-danger p-0" onClick={()=>HandleDelete(entry._id)}>
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
        <div className="d-flex justify-content-end mt-2">
          <Button size="sm" variant="outline-secondary" className="me-2">
            Previous
          </Button>
          <Button size="sm" variant="primary" className="ms-2">
            1
          </Button>
          <Button size="sm" variant="outline-secondary" className="ms-2">
            2
          </Button>
          <Button size="sm" variant="outline-secondary" className="ms-2">
            Next
          </Button>
        </div>
    </div>
  );
}

export default SiteEntryTable;
