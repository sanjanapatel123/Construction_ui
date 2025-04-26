import React, { use, useState } from 'react';
import './NewAnnotationForm.css';
import { useDispatch } from 'react-redux';
import { createAnnotation, fetchAnnotations } from '../../../redux/slices/annotationSlice';

const NewAnnotationForm = ({ closeModal }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');

  const dispatch = useDispatch();
  
  const handleSubmit = (event) => {
    event.preventDefault();

    // Create the new annotation object
    const newAnnotation = {
      title,
      description,
      author :"Unknown",
    };

    // Dispatch the createAnnotation action to the Redux store
    dispatch(createAnnotation(newAnnotation)); // Dispatch thunk here
    dispatch(fetchAnnotations())

    // Clear the form fields after submission
    setTitle('');
    setDescription('');
    setAuthor('');

    // Close the modal after adding the annotation
    closeModal();
  };

  return (
    <div className="modal1">
      <div className="modal-content1 ">
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

          <button type="submit" className='btn1'>Save Annotation</button>
          <button type="button" className='btn1' onClick={closeModal}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default NewAnnotationForm;
