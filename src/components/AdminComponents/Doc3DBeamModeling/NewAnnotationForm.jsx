import React, { useState } from 'react';
import './NewAnnotationForm.css';
import { useDispatch } from 'react-redux';
import { createAnnotation, fetchAnnotations, updateAnnotation } from '../../../redux/slices/annotationSlice';

const NewAnnotationForm = ({ closeModal, editData }) => {
  const [title, setTitle] = useState(editData?.title || '');
  const [description, setDescription] = useState(editData?.description || '');
  const [author, setAuthor] = useState(editData?.author || '');

  const dispatch = useDispatch();

  const handleSubmit =  (event) => {
    event.preventDefault();

    const newAnnotation = {
      title,
      description,
      author: author || 'Unknown',
    };

    if (editData) {
      // If editing, dispatch update
      dispatch(updateAnnotation({ id: editData._id, updatedData: newAnnotation }));
    } else {
      // If adding new, dispatch create
       dispatch(createAnnotation(newAnnotation));
    }

    // Refresh list after action
       dispatch(fetchAnnotations());

    // Clear form (optional)
    setTitle('');
    setDescription('');
    setAuthor('');

    // Close the modal
    closeModal();
  };

  return (
    <div className="modal1">
      <div className="modal-content1">
        <h3>{editData ? 'Edit Annotation' : 'Add a New Annotation'}</h3>
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

          <button type="submit" className='btn1'>
            {editData ? 'Update Annotation' : 'Save Annotation'}
          </button>
          <button type="button" className='btn1' onClick={closeModal}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default NewAnnotationForm;
