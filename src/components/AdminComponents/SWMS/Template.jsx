import React, { useState } from 'react';
import { useLocation,Link } from 'react-router-dom';
import { jsPDF } from "jspdf";
const checklists = {
  'Working at Heights': [
    "Has a risk assessment been completed for the task?",
    "Has the SWMS (Safe Work Method Statement) been reviewed?",
    "Is the person trained and authorized to work at height?",
    "Is the weather suitable for working at heights?",
    "Ladder is in good condition (no damage, cracks, etc.)",
    "Ladder is stable on a flat, non-slip surface",
    "Ladder is secured to prevent movement",
    "Three points of contact maintained while climbing",
    "Scaffolding erected by a qualified person",
    "Guardrails and toe boards are in place on scaffolding",
    "Scaffolding inspected and tagged",
    "EWP operator trained and licensed",
    "EWP pre-start inspection completed",
    "Harness used and attached to anchor point",
    "Fall arrest systems in place and checked",
    "Emergency rescue procedure available",
    "No overhead hazards (e.g., power lines)",
    "Tools/materials secured to prevent falls",
    "Supervisor reviewed checklist",
    "Toolbox talk completed",
    "Permit to work obtained",
    "Barricades and signage installed",
    "Anchor points certified and rated",
    "Edge protection installed where necessary",
    "Helmet with chin strap worn",
    "High-visibility clothing worn",
    "Non-slip footwear used",
    "Shock-absorbing lanyards inspected",
    "Self-retracting lifelines (SRLs) checked",
    "Rope grab and lifeline used and inspected"
  ],

  'Electrical Work': [
    "Lockout/tagout procedures in place?",
    "Insulated tools being used?",
    "Circuit de-energized before work?",
    "Voltage tested with proper equipment?",
    "Electrical PPE (gloves, face shield) worn?",
    "Work area dry and clear of water?",
    "Qualified electrician present?",
    "Proper signage and barriers in place?",
    "Ground fault protection installed?",
    "All cables properly rated and labeled?",
    "Circuit breakers identified and accessible?",
    "No exposed live wires?",
    "Electrical panels closed and secured?",
    "Emergency shut-off devices accessible?",
    "Test equipment calibrated and functional?",
    "Rubber insulating mats used?",
    "Arc flash protection suit available?",
    "Portable RCD tested and used?",
    "Insulated ladder available?",
    "Fire extinguisher rated for electrical fires present?"
  ],

  'Heavy Machinery Operation': [
    "Operator certified and trained?",
    "Daily machinery inspection done?",
    "Emergency stop buttons functional?",
    "Clear zone established around equipment?",
    "Backup alarms working?",
    "Seatbelts worn by operator?",
    "Communication with spotter established?",
    "Weather suitable for operation?",
    "Load limits not exceeded?",
    "Fuel and oil levels checked?",
    "Machine secured when not in use?",
    "Hydraulic lines checked for leaks?",
    "Brakes and steering operational?",
    "Fire extinguisher on board?",
    "Maintenance records up to date?",
    "Flashing beacons operational?",
    "Mirrors and cameras clean and adjusted?",
    "Operator manual available?",
    "Wheel chocks used when needed?",
    "Warning decals and signage intact?"
  ],

  'Confined Space Entry': [
    "Entry permit issued?",
    "Atmosphere tested for oxygen and gas?",
    "Rescue plan in place?",
    "Ventilation provided?",
    "Attendant present outside entry?",
    "Communication system available?",
    "PPE including harness and lifeline used?",
    "Training and authorization confirmed?",
    "Entry point barriers installed?",
    "Continuous atmospheric monitoring?",
    "Confined space properly labeled?",
    "Lifeline connected and functional?",
    "First aid trained personnel available?",
    "Tripod with winch available?",
    "Explosion-proof lighting used?",
    "Full body harness worn?",
    "Gas detector calibrated and operational?",
    "Breathing apparatus available if required?",
    "Intrinsically safe tools used?",
    "Spare oxygen cylinder available if needed?"
  ],

  'Excavation and Trenching': [
    "Underground services located?",
    "Shoring or trench box used?",
    "Spoil piles kept away from edge?",
    "Entry/exit ladders provided?",
    "Daily inspection by competent person?",
    "Water accumulation controlled?",
    "Fall protection near edges?",
    "Emergency plan established?",
    "Excavation deeper than 1.5m has shoring?",
    "Barricades and warning signs in place?",
    "Access controlled to excavation site?",
    "Equipment parked a safe distance away?",
    "Trench shields inspected?",
    "Steel caps and reflective vests worn?",
    "Hand tools in good condition?",
    "Hard hats worn near excavation?",
    "Ladder extends 1m above trench edge?",
    "Soil type assessed for stability?"
  ],

  'Manual Handling': [
    "Load assessed before lifting?",
    "Use of mechanical aids considered?",
    "Proper lifting technique used?",
    "Path cleared of obstacles?",
    "Team lifting where needed?",
    "Breaks taken during repetitive tasks?",
    "Stretching or warm-up performed?",
    "Heavy items stored at waist height?",
    "Gloves used for grip and protection?",
    "Manual handling training completed?",
    "Trolleys or dollies in good condition?",
    "Back support belt worn if required?",
    "Non-slip footwear worn?"
  ],

  'Scaffolding Erection': [
    "Erected by licensed scaffolder?",
    "Platform fully planked?",
    "Toe boards and guardrails installed?",
    "Tagged and inspected before use?",
    "Access ladders secure?",
    "Weight limit signage visible?",
    "Scaffold tied to structure if required?",
    "Bracing installed and secure?",
    "No gaps between planks?",
    "Debris cleared from scaffold surface?",
    "Inspections logged daily?",
    "Harness used for mobile scaffold work?",
    "Base plates and sole boards in place?",
    "Scaffold level and plumb?"
  ],

  'Hot Work (Welding & Cutting)': [
    "Hot work permit issued?",
    "Fire extinguisher nearby?",
    "Work area cleared of flammables?",
    "Fire watch assigned?",
    "PPE including gloves and helmet used?",
    "Ventilation for fumes ensured?",
    "Flash screen used for protection?",
    "Combustible materials shielded or removed?",
    "Gas cylinders properly secured?",
    "Sparks and slag controlled?",
    "30-minute fire watch after completion?",
    "Welding apron and sleeves used?",
    "Welding mask with proper shade used?",
    "Hoses inspected for leaks?"
  ],

  'Demolition Work': [
    "Demolition plan approved?",
    "Utilities disconnected?",
    "Barriers and signage in place?",
    "Structural integrity assessed?",
    "Dust suppression used?",
    "Debris managed and cleared safely?",
    "Personal protective equipment used?",
    "Fall zones identified and marked?",
    "Noise and vibration controls implemented?",
    "Emergency response plan available?",
    "Hard hats, gloves, goggles worn?",
    "Demolition tools checked for integrity?",
    "Dust masks or respirators used?",
    "Fire extinguishers accessible?"
  ]
};



const Template = () => {
  const location = useLocation();
  const { title } = location.state || {};
  const [checkedItems, setCheckedItems] = useState({});

  const checklistItems = checklists[title] || [];
  const handleDownload = () => {
    const doc = new jsPDF();
    const lineHeight = 10;
    let y = 20;
  
    doc.setFontSize(16);
    doc.text(`${title} Checklist`, 10, 10);
  
    doc.setFontSize(12);
    checklistItems.forEach((item, index) => {
      const status = checkedItems[index] === 'yes' ? '✅' : 
                     checkedItems[index] === 'no' ? '❌' : '⬜';
  
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
  
      doc.text(`${index + 1}. ${item} ${status}`, 10, y);
      y += lineHeight;
    });
  
    doc.save(`${title}_Checklist.pdf`);
  };
  
  
  return (
    <div className="container my-4">
      {/* Button Container */}
      <div className="d-flex justify-content-end mb-3">
     <Link to="/swms">   <button className="btn btn-primary me-2" ><i class="fa-solid fa-arrow-left me-2"></i>Back</button></Link>
        <button className="btn btn-success" onClick={handleDownload}>Download Checklist</button>
      </div>

      {/* Checklist Title */}
      <h4 className="fw-bold mb-3">✅ {title} Checklist</h4>
      {checklistItems.length > 0 ? (
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Checklist Item</th>
              <th className="text-center">Yes</th>
              <th className="text-center">No</th>
            </tr>
          </thead>
          <tbody>
            {checklistItems.map((item, index) => (
              <tr key={index}>
                <td>{item}</td>
                <td className="text-center">
                <input
  type="radio"
  name={`check-${index}`}
  value="yes"
  checked={checkedItems[index] === 'yes'}
  onChange={() => setCheckedItems(prev => ({ ...prev, [index]: 'yes' }))}
/>

                </td>
                <td className="text-center">
                <input
  type="radio"
  name={`check-${index}`}
  value="no"
  checked={checkedItems[index] === 'no'}
  onChange={() => setCheckedItems(prev => ({ ...prev, [index]: 'no' }))}
/>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No checklist found for this template.</p>
      )}
    </div>
  );
};

export default Template;
