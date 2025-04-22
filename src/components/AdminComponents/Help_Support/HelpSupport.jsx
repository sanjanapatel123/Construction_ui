import React from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";

const HelpSupport = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <Container>
            <Row className="my-4">
              <h2>Help Center</h2>
              <p>
                Find answers to common questions and get the support you need.
              </p>
            </Row>
            <Row className="my-4">
              <Col sm={12} md={4}>
                <Card className="text-center shadow-sm border-light">
                  <Card.Body>
                    <Card.Title className="h4">
                      Frequently Asked Questions
                    </Card.Title>
                    <p>
                      Browse through our comprehensive FAQ section for quick
                      answers.
                    </p>
                    <Button variant="outline-primary" href="#">
                      View FAQs →
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={12} md={4}>
                <Card className="text-center shadow-sm border-light">
                  <Card.Body>
                    <Card.Title className="h4">Submit a Ticket</Card.Title>
                    <p>
                      Create a support ticket for technical issues or specific
                      inquiries.
                    </p>
                    <Button variant="outline-primary" href="#">
                      Create Ticket →
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={12} md={4}>
                <Card className="text-center shadow-sm border-light">
                  <Card.Body>
                    <Card.Title className="h4">
                      Troubleshooting Guides
                    </Card.Title>
                    <p>
                      Step-by-step guides to resolve common technical issues.
                    </p>
                    <Button variant="outline-primary" href="#">
                      View Guides →
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="my-4">
              <Col sm={12}>
                <div className="alert alert-info">
                  <p>
                    <strong>Need Additional Help?</strong>
                  </p>
                  <p>
                    Our support team is available Monday through Friday, 9:00 AM
                    - 6:00 PM EST.
                  </p>
                  <Button variant="primary" className="me-3">
                    Contact Support
                  </Button>
                  <Button variant="secondary">Schedule a Call</Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;
