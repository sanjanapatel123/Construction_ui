import React, { useState, useEffect } from 'react';
import { Modal, Button, Dropdown, Form } from 'react-bootstrap';
import { useDispatch , useSelector} from 'react-redux';
import { createElement, fetchElements } from '../../../redux/slices/elementSlice';
import { set } from 'date-fns';

const AddElementModal = ({ closeModal }) => {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [element, setElement] = useState('');
  const [details, setDetails] = useState('');  // Description input by user

  const dispatch = useDispatch();

  // Categories and Elements Data
  const categories = ['Building Elements', 'Structural Elements', 'MEP Systems'];
  const buildingElements = ['Walls', 'Doors', 'Windows'];
  const structuralElements = ['Columns', 'Beams', 'Floors'];
  const mepSystems = ['HVAC', 'Plumbing', 'Electrical'];

  useEffect(() => {
    dispatch(fetchElements());
  }, [dispatch]);
   const state = useSelector((state) => state);
   console.log(state);  
  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    {selectedCategory==="Building Elements"?setCategoryId('68106a34bd60aae582ce4d34'):selectedCategory==="Structural Elements"?setCategoryId('68106a72bd60aae582ce4d38'):setCategoryId("68106a8cbd60aae582ce4d3c")};
    setElement(''); // Reset the element when category changes
    setDetails(''); // Reset the details when category changes
  };

  const handleElementSelect = (selectedElement) => {
    setElement(selectedElement);
  };

  const handleAddElement = () => {
    // Prepare the element data with the user-provided details
    const elementData = {
      parentCategoryId: categoryId,
      name: category,
      subcategories: [{
        name: element,
        description: details
      }],
    };
    console.log("elementdata", elementData);

    // Push the selected element and the manually typed details as description
    // elementData.subcategories.push({
    //   name: element,
    //   description: details,  // Use the user-provided description
    // });

    // Dispatch createElement action
    dispatch(createElement(elementData));

    // Clear form fields after submission
    setCategory('');
    setElement('');
    setDetails('');

    // Close the modal
    closeModal();
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        + Add Element
      </Button>

      <Modal show={show} onHide={handleClose} keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Element</Modal.Title>
        </Modal.Header>
        <Modal.Body onClick={(e) => e.stopPropagation()}>
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
                  {(category === 'Building Elements'
                    ? buildingElements
                    : category === 'Structural Elements'
                    ? structuralElements
                    : mepSystems
                  ).map((el) => (
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
                <Form.Group controlId="formDescription">
                  <Form.Label>Add Details</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Enter Details"
                    as="textarea"
                    rows={5}
                  />
                </Form.Group>
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
