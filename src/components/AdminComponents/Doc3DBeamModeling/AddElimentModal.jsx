import React, { useState } from 'react';
import { Modal, Button, Dropdown, Form } from 'react-bootstrap';

const AddElementModal = ({ closeModal }) => {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState('');
  const [element, setElement] = useState('');
  const [details, setDetails] = useState({
    name: '',
    description: '', 
    dimensions: '',
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Categories and Elements Data
  const categories = ['Building Elements', 'Structural Elements', 'MEP Systems'];
  const buildingElements = ['Walls', 'Doors', 'Windows'];
  const structuralElements = ['Columns', 'Beams', 'Floors'];
  const mepSystems = ['HVAC', 'Plumbing', 'Electrical'];

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    setElement(''); // Reset the element when category changes
  };

  const handleElementSelect = (selectedElement) => {
    setElement(selectedElement);
  };

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setDetails({
      ...details,
      [name]: value,
    });
  };

  const handleAddElement = () => {
    // Handle adding the element here
    console.log('Element added:', category, element, details);
  { closeModal };
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        + Add Element
      </Button>

      <Modal 
        show={show} 
        onHide={handleClose} 
        // backdrop="static"  // Prevent modal close when clicking outside
        keyboard={false}   // Disable closing on ESC key
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Element</Modal.Title>
        </Modal.Header>
        <Modal.Body onClick={(e) => e.stopPropagation()}> {/* Prevent modal close on click */}
          {/* Category Selection */}
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {category || 'Select Category'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {categories.map((cat) => (
                <Dropdown.Item key={cat} onClick={() => handleCategorySelect(cat)}>
                  {cat}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          {/* Element Selection Based on Category */}
          {category && (
            <>
              <hr />
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {element || 'Select Element'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {(category === 'Building Elements' ? buildingElements : category === 'Structural Elements' ? structuralElements : mepSystems).map((el) => (
                    <Dropdown.Item key={el} onClick={() => handleElementSelect(el)}>
                      {el}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </>
          )}

          {/* Details Form */}
          {element && (
            <>
              <hr />
              <Form>
                {/* <Form.Group controlId="formElementName">
                  <Form.Label>Element Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={details.name}
                    onChange={handleDetailChange}
                    placeholder="Enter name"
                  />
                </Form.Group> */}

                <Form.Group controlId="formDescription">
                  <Form.Label>Add Details</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    value={details.description}
                    onChange={handleDetailChange}
                    placeholder="Enter Details"
                    as="textarea"
                    rows={5}
                  />
                </Form.Group>

                {/* <Form.Group controlId="formDimensions">
                  <Form.Label>Dimensions</Form.Label>
                  <Form.Control
                    type="text"
                    name="dimensions"
                    value={details.dimensions}
                    onChange={handleDetailChange}
                    placeholder="Enter dimensions"
                  />
                </Form.Group> */}
              </Form>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddElement}>
            Add Element
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddElementModal;
