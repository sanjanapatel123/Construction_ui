import React, { useState } from "react";
import { Button, Form, Table, Container } from "react-bootstrap";
import axios from "axios";
import { jsPDF } from "jspdf";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap"; // Already part of react-bootstrap

const ComplianceReport = () => {
  const [reportText, setReportText] = useState("");
  const [complianceIssues, setComplianceIssues] = useState([]);
  const [loading, setLoading] = useState(false); // Add this line

  const handleReportTextChange = (e) => {
    setReportText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reportText.trim()) {
      alert("Please enter the report text.");
      return;
    }

    setLoading(true); // Set loading to true when submitting
    setComplianceIssues([]);

    try {
      const response = await axios.post(
        "https://constructionaimicroservice-production.up.railway.app/complinces_standards",
        { report_text: reportText }
      );

      const aiIssues = response.data.ai_report.compliance_issues || [];
      setComplianceIssues(aiIssues);
      toast.success("Compliance issues loaded successfully!");
    } catch (error) {
      console.error("Error fetching compliance issues:", error);
      toast.error("Failed to fetch compliance issues.");
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  const generatePDF = () => {
    if (complianceIssues.length === 0) {
      alert("No compliance issues to include in the PDF.");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Compliance Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Report Text: ${reportText}`, 20, 40);

    doc.setFontSize(14);
    doc.text("Compliance Issues:", 20, 60);

    let yPosition = 70;
    complianceIssues.forEach((issue, index) => {
      doc.text(`Issue ${index + 1}:`, 20, yPosition);
      yPosition += 10;
      doc.text(`Description: ${issue.issue}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Rectification: ${issue.rectification}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Section: ${issue.section}`, 20, yPosition);
      yPosition += 10;
      doc.text(`Standard: ${issue.standard}`, 20, yPosition);
      yPosition += 20;
    });

    doc.setFontSize(14);
    doc.text(
      "Issue Summary: Compliance issues identified in site report.",
      20,
      yPosition
    );
    yPosition += 10;
    doc.text("Overall Status: Non-compliant", 20, yPosition);

    doc.save("compliance_report.pdf");
  };

  return (
    <Container className="">
      <h2>Compliance Report Generator</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Report Text</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={reportText}
            onChange={handleReportTextChange}
            placeholder="Enter the report details here..."
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {/* 
      {complianceIssues.length > 0 && (
        <>
          <h4 className="mt-4">Identified Compliance Issues</h4>

          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Issue</th>
                  <th>Rectification</th>
                  <th>Section</th>
                  <th>Standard</th>
                </tr>
              </thead>
              <tbody>
                {complianceIssues.map((issue, index) => (
                  <tr key={index}>
                    <td>{issue.issue}</td>
                    <td>{issue.rectification}</td>
                    <td>{issue.section}</td>
                    <td>{issue.standard}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Button variant="success" onClick={generatePDF} className="mt-3">
            Generate PDF
          </Button>
        </>
      )} */}

      {loading && (
        <div className="mt-4 text-center">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {!loading && complianceIssues.length > 0 && (
        <>
          <h4 className="mt-4">Identified Compliance Issues</h4>
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Issue</th>
                  <th>Rectification</th>
                  <th>Section</th>
                  <th>Standard</th>
                </tr>
              </thead>
              <tbody>
                {complianceIssues.map((issue, index) => (
                  <tr key={index}>
                    <td>{issue.issue}</td>
                    <td>{issue.rectification}</td>
                    <td>{issue.section}</td>
                    <td>{issue.standard}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Button variant="success" onClick={generatePDF} className="mt-3">
            Generate PDF
          </Button>
        </>
      )}
    </Container>
  );
};

export default ComplianceReport;
