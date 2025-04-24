import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import {fetchProjects} from "../../../redux/projectSlice";
import { createSwms } from "../../../redux/swmsSlice";

function AddnewSms() {
  const navigate = useNavigate();
  const dispatchEvent = useDispatch();

      const projects = useSelector((state) => state.projects.data);

 


  const [formData, setFormData] = useState({
    title: '',
    workArea: '',
  project: '',
  description: '',
  hazardsandControls: [{
    hazardDescription: '',
      riskLevel: 'Low',
      controlMeasures: ''
    }],
    ppeRequirements: {
      HardHat: false,
      SafetyBoots: false,
      HighVisVest: false,
      SafetyGlasses: false
    },
    requiredPermits: {
      WorkingatHeights: false,
      HotWork: false,
      ConfinedSpace: false,
      Excavation: false
    }
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleHazardChange = (index, field, value) => {
    setFormData(prev => {
      const newHazards = [...prev.hazardsandControls]
      newHazards[index] = {
        ...newHazards[index],
        [field]: value
      }
      return {
        ...prev,
        hazardsandControls: newHazards
      }
    })
  }

  const handleCheckboxChange = (category, field) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: !prev[category][field]
      }
    }))
  }

  const addHazard = () => {
    setFormData(prev => ({
      ...prev,
      hazardsandControls: [...prev.hazardsandControls, { description: '', riskLevel: 'Low', controlMeasures: '' }]
    }))
  }

  const handleSubmit = (e, isDraft = false) => {
    e.preventDefault();
    console.log('Form submitted:', formData)
    dispatchEvent(createSwms(formData));
    
    // TODO: Implement form submission logic

  }

  useEffect(() => {
    dispatchEvent(fetchProjects());
  }, [dispatchEvent]);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
      <h3 className="mb-4">Create New SWMS</h3>
        <button onClick={() => navigate(-1)} className="btn " style={{backgroundColor:"#0d6efd" ,color:"white"}}>
        <i class="fa-solid fa-arrow-left me-2"></i> Back to Overview
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{backgroundColor:"white",padding:"20px",borderRadius:"8px"}}>
      <div className="row">
  <div className="mb-3 col-md-12">
    <label htmlFor="title" className="form-label">SWMS Title</label>
    <input type="text" className="form-control" id="title" name="title"
      value={formData.title} onChange={handleInputChange} placeholder="Enter SWMS title"/>
  </div>
</div>
<div className="row">
  <div className="mb-3 col-md-6">
    <label htmlFor="project" className="form-label">Project</label>
    <select
                      className="form-select"
                      value={formData.project}
                      onChange={handleInputChange}
                      name="project"
                    
                    >
                      <option value="">Select Project</option>
                      { projects && projects.map((project) => (
                        <option key={project._id} value={project._id}>
                          { console.log(project._id)}
                          {project.name}
                        </option>
                      ))}
                     
                    </select>
    
  </div>

  <div className="mb-3 col-md-6">
    <label htmlFor="WorkArea" className="form-label">Work Area</label>
    <input
      type="text"
      className="form-control"
      id="workArea"
      name="workArea"
      value={formData.workArea}
      onChange={handleInputChange}
      placeholder="Specify work area"
    />
  </div>
</div>
<div className="row">
  <div className="mb-3 col-md-12">
    <label htmlFor="description" className="form-label">Work Description</label>
    {/* <input  type="textarea"
      className="form-control"
      id="responsiblePerson"
      name="responsiblePerson"
      value={formData.responsiblePerson}
      onChange={handleInputChange}
      placeholder="e.g., Marc El-Sabbagh"
    /> */}
    <textarea className="form-control" id="responsiblePerson"
      name="description"
      value={formData.description}
      onChange={handleInputChange} placeholder='Description the work to be  performed'>  </textarea>
  </div>
  </div>
  {/* <div className="row">

  <div className="mb-3 col-md-6">
    <label htmlFor="principalContractor" className="form-label">Principal Contractor</label>
    <input
      type="text"
      className="form-control"
      id="principalContractor"
      name="principalContractor"
      value={formData.principalContractor}
      onChange={handleInputChange}
      placeholder="e.g., Marc El-Sabbagh"
    />
  </div>

  <div className="mb-3 col-md-6">
    <label htmlFor="reviewPerson" className="form-label">Person Responsible for Reviewing SWMS</label>
    <input
      type="text"
      className="form-control"
      id="reviewPerson"
      name="reviewPerson"
      value={formData.reviewPerson}
      onChange={handleInputChange}
      placeholder="e.g., Marc El-Sabbagh"
    />
  </div>

  <div className="mb-3 col-md-6">
    <label htmlFor="dateCreated" className="form-label">Date Created</label>
    <input
      type="date"
      className="form-control"
      id="dateCreated"
      name="dateCreated"
      value={formData.dateCreated}
      onChange={handleInputChange}
    />
  </div>

  <div className="mb-3 col-md-6">
    <label htmlFor="dateReviewed" className="form-label">Date Reviewed</label>
    <input
      type="date"
      className="form-control"
      id="dateReviewed"
      name="dateReviewed"
      value={formData.dateReviewed}
      onChange={handleInputChange}
    />
  </div>

  <div className="mb-3 col-md-6">
    <label htmlFor="abn" className="form-label">ABN</label>
    <input
      type="text"
      className="form-control"
      id="abn"
      name="abn"
      value={formData.abn}
      onChange={handleInputChange}
      placeholder="Enter ABN"
    />
  </div>
</div> */}

        <div className="mb-4">
          <h5>Hazards and Controls</h5>
          {formData.hazardsandControls.map((hazard, index) => (
            <div key={index} className="card mb-3">
              <div className="card-body">
                <h6>Hazard {index + 1}</h6>
                <div className="row mb-3">
                  <div className="col-md-8">
                    <label>Hazard Description</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      value={hazard.hazardDescription}
                      onChange={(e) => handleHazardChange(index, 'hazardDescription', e.target.value)}
                    />
                  </div>
                  <div className="col-md-4">
                    <label>Risk Level</label>
                    <select
                      className="form-select"
                      value={hazard.riskLevel}
                      onChange={(e) => handleHazardChange(index, 'riskLevel', e.target.value)}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>
                <label>Control Measures</label>
                <textarea
                  className="form-control"
                  placeholder=""
                  value={hazard.controlMeasures}
                  onChange={(e) => handleHazardChange(index, 'controlMeasures', e.target.value)}
                  rows="3"
                ></textarea>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={addHazard}
          >
            + Add Another Hazard
          </button>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <h5>PPE Requirements</h5>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="HardHat"
                checked={formData.ppeRequirements.HardHat}
                onChange={() => handleCheckboxChange('ppeRequirements', 'HardHat')}
              />
              <label className="form-check-label" htmlFor="HardHat">Hard Hat</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="SafetyBoots"
                checked={formData.ppeRequirements.SafetyBoots}
                onChange={() => handleCheckboxChange('ppeRequirements', 'SafetyBoots')}
              />
              <label className="form-check-label" htmlFor="SafetyBoots">Safety Boots</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="HighVisVest"
                checked={formData.ppeRequirements.HighVisVest}
                onChange={() => handleCheckboxChange('ppeRequirements', 'HighVisVest')}
              />
              <label className="form-check-label" htmlFor="HighVisVest">High Vis Vest</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="SafetyGlasses"
                checked={formData.ppeRequirements.SafetyGlasses}
                onChange={() => handleCheckboxChange('ppeRequirements', 'SafetyGlasses')}
              />
              <label className="form-check-label" htmlFor="SafetyGlasses">Safety Glasses</label>
            </div>
          </div>

          <div className="col-md-6">
            <h5>Required Permits</h5>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="WorkingatHeights"
                checked={formData.requiredPermits.WorkingatHeights}
                onChange={() => handleCheckboxChange('requiredPermits', 'WorkingatHeights')}
              />
              <label className="form-check-label" htmlFor="WorkingatHeights">Working at Heights</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="HotWork"
                checked={formData.requiredPermits.HotWork}
                onChange={() => handleCheckboxChange('requiredPermits', 'HotWork')}
              />
              <label className="form-check-label" htmlFor="HotWork">Hot Work</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="ConfinedSpace"
                checked={formData.requiredPermits.ConfinedSpace}
                onChange={() => handleCheckboxChange('requiredPermits', 'ConfinedSpace')}
              />
              <label className="form-check-label" htmlFor="ConfinedSpace">Confined Space</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="Excavation"
                checked={formData.requiredPermits.Excavation}
                onChange={() => handleCheckboxChange('requiredPermits', 'Excavation')}
              />
              <label className="form-check-label" htmlFor="Excavation">Excavation</label>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={(e) => handleSubmit(e, true)}
          >
            Save as Draft
          </button>
          <button type="submit" className="btn btn-primary">Submit for Approval</button>
        </div>
      </form>
    </div>
  )
}

export default AddnewSms