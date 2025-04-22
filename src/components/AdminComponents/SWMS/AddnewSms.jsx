import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddnewSms() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    title: '',
  siteAddress: '',
  companyName: '',
  responsiblePerson: '',
  principalContractor: '',
  reviewPerson: '',
  dateCreated: '',
  dateReviewed: '',
  abn: '',
    hazards: [{
      description: '',
      riskLevel: 'Low',
      controlMeasures: ''
    }],
    ppe: {
      hardHat: false,
      safetyBoots: false,
      highVisVest: false,
      safetyGlasses: false
    },
    permits: {
      workingAtHeights: false,
      hotWork: false,
      confinedSpace: false,
      excavation: false
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
      const newHazards = [...prev.hazards]
      newHazards[index] = {
        ...newHazards[index],
        [field]: value
      }
      return {
        ...prev,
        hazards: newHazards
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
      hazards: [...prev.hazards, { description: '', riskLevel: 'Low', controlMeasures: '' }]
    }))
  }

  const handleSubmit = (e, isDraft = false) => {
    e.preventDefault()
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData)
  }

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
    <label htmlFor="siteAddress" className="form-label">Project</label>
    <select
                      className="form-select"
                      
                     
                    >
                      <option value="Low">Select Project</option>
                      <option value="Medium"></option>
                      <option value="High"></option>
                    </select>
    
  </div>

  <div className="mb-3 col-md-6">
    <label htmlFor="companyName" className="form-label">Work Area</label>
    <input
      type="text"
      className="form-control"
      id="companyName"
      name="companyName"
      value={formData.companyName}
      onChange={handleInputChange}
      placeholder="Specify work area"
    />
  </div>
</div>
<div className="row">
  <div className="mb-3 col-md-12">
    <label htmlFor="responsiblePerson" className="form-label">Work Descripation</label>
    {/* <input  type="textarea"
      className="form-control"
      id="responsiblePerson"
      name="responsiblePerson"
      value={formData.responsiblePerson}
      onChange={handleInputChange}
      placeholder="e.g., Marc El-Sabbagh"
    /> */}
    <textarea className="form-control" placeholder='Descripation the work to be  performed'>  </textarea>
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
          {formData.hazards.map((hazard, index) => (
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
                      value={hazard.description}
                      onChange={(e) => handleHazardChange(index, 'description', e.target.value)}
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
                id="hardHat"
                checked={formData.ppe.hardHat}
                onChange={() => handleCheckboxChange('ppe', 'hardHat')}
              />
              <label className="form-check-label" htmlFor="hardHat">Hard Hat</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="safetyBoots"
                checked={formData.ppe.safetyBoots}
                onChange={() => handleCheckboxChange('ppe', 'safetyBoots')}
              />
              <label className="form-check-label" htmlFor="safetyBoots">Safety Boots</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="highVisVest"
                checked={formData.ppe.highVisVest}
                onChange={() => handleCheckboxChange('ppe', 'highVisVest')}
              />
              <label className="form-check-label" htmlFor="highVisVest">High Vis Vest</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="safetyGlasses"
                checked={formData.ppe.safetyGlasses}
                onChange={() => handleCheckboxChange('ppe', 'safetyGlasses')}
              />
              <label className="form-check-label" htmlFor="safetyGlasses">Safety Glasses</label>
            </div>
          </div>

          <div className="col-md-6">
            <h5>Required Permits</h5>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="workingAtHeights"
                checked={formData.permits.workingAtHeights}
                onChange={() => handleCheckboxChange('permits', 'workingAtHeights')}
              />
              <label className="form-check-label" htmlFor="workingAtHeights">Working at Heights</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="hotWork"
                checked={formData.permits.hotWork}
                onChange={() => handleCheckboxChange('permits', 'hotWork')}
              />
              <label className="form-check-label" htmlFor="hotWork">Hot Work</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="confinedSpace"
                checked={formData.permits.confinedSpace}
                onChange={() => handleCheckboxChange('permits', 'confinedSpace')}
              />
              <label className="form-check-label" htmlFor="confinedSpace">Confined Space</label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="excavation"
                checked={formData.permits.excavation}
                onChange={() => handleCheckboxChange('permits', 'excavation')}
              />
              <label className="form-check-label" htmlFor="excavation">Excavation</label>
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