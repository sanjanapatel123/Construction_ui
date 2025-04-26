import React, { useState } from 'react';
import './NewAnnotationForm.css';
const NewAnnotationForm = ({ addAnnotation, closeModal }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newAnnotation = {
      title,
      description,
      author,
      timestamp: new Date().toISOString(),
    };

    // Call the function passed as a prop to add the annotation
    addAnnotation(newAnnotation);

    // Clear the form fields after submission
    setTitle('');
    setDescription('');
    setAuthor('');

    // Close the modal after adding the annotation
    closeModal();
  };

  return (
    <div className="modal">
      <div className="modal-content  flex items-center justify-center">
        <h3>Add a New Annotation</h3>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className='flex flex-col'>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className='flex flex-col'>
            <label>Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>

          <button type="submit" className='btn'>Save Annotation</button>
          <button type="button" className='btn' onClick={closeModal}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default NewAnnotationForm;
