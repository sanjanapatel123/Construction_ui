import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { jsPDF } from "jspdf";

const checklists = {
  'Working at Heights': {
    "🧍‍♂️ Personal Protective Equipment (PPE)": [
      " Full Body Safety Harness",
      " Shock-absorbing Lanyard or Self-Retracting Lifeline (SRL)",
      " Helmet with chin strap (Hard Hat)",
      " Non-slip, steel-toe safety boots",
      " High-visibility clothing (Hi-vis vest/jacket)",
      " Gloves with good grip"
    ],
    "🪜 Access Equipment": [
      " Industrial Ladders (extension or step ladders)",
      " Mobile or Fixed Scaffolding",
      " Elevated Work Platforms (EWP) – Boom lift, Scissor lift, etc.",
      " Stair Towers or Temporary Work Platforms"
    ],
    "🛠️ Fall Protection Systems": [
      " Fall Arrest System (harness + anchor + connector)",
      " Guardrails and Toe Boards (for scaffolding)",
      " Safety Nets or Catch Platforms",
      " Anchorage points (certified and rated)",
      " Inertia reels or fall arrest blocks"
    ],
    "🧯 Inspection & Monitoring Tools": [
      " Equipment Inspection Tags",
      " Torque wrench or spanner (for scaffolding bolts)",
      " Safety Checklists and Forms",
      " Wind speed meter (anemometer for EWP work)",
      " First Aid Kit",
      " Fire Extinguisher (in case of electrical work at height)"
    ],
    "🗂️ Documentation & Communication": [
      " SWMS (Safe Work Method Statement)",
      " Work Permits (if required)",
      " Risk Assessment Sheet",
      " Emergency Rescue Plan",
      " Two-way Radios or Mobile Phones for Communication"
    ]
  },

  'Electrical Work': {
    "🧍‍♂️ Personal Protective Equipment (PPE)": [
      " Insulated Gloves",
      " Face Shield or Safety Glasses",
      " Flame-resistant clothing",
      " Rubber Insulating Boots"
    ],
    "⚡ Electrical Equipment": [
      " Insulated Tools",
      " Circuit Testers",
      " Lockout/Tagout Kits",
      " Voltage Detectors",
      " Cable Splicing Tools"
    ],
    "🧯 Safety & Monitoring Tools": [
      " Ground Fault Circuit Interrupter (GFCI)",
      " Portable Fire Extinguisher",
      " First Aid Kit",
      " Emergency Shut-off Switch"
    ],
    "🗂️ Documentation & Communication": [
      " Lockout/Tagout Procedure Documentation",
      " Work Permits (if required)",
      " Risk Assessment Sheet",
      " Emergency Response Plan",
      " Two-way Radios or Mobile Phones for Communication"
    ]
  },'Heavy Machinery Operation': {
    "🧍‍♂️ Personal Protective Equipment (PPE)": [
      " Safety Helmet",
      " High-Visibility Clothing",
      " Steel-toed Boots",
      " Hearing Protection",
      " Gloves with good grip"
    ],
    "🛠️ Equipment & Tools": [
      " Excavator",
      " Crane",
      " Bulldozer",
      " Forklift",
      " Forklift attachments"
    ],
    "🧯 Safety & Monitoring Tools": [
      " Emergency Stop Button",
      " Seatbelts for Operators",
      " Backup Alarms",
      " Fire Extinguisher",
      " Hydraulic Fluid Inspection Tools"
    ],
    "🗂️ Documentation & Communication": [
      " Maintenance Logs",
      " Operator's Manual",
      " Daily Inspection Checklists",
      " Two-way Radios or Mobile Phones for Communication"
    ]
  },
  
  'Confined Space Entry': {
    "🧍‍♂️ Personal Protective Equipment (PPE)": [
      " Full Body Harness",
      " Gas Detection Equipment",
      " Respiratory Protection (if required)",
      " Gloves",
      " Safety Boots"
    ],
    "🛠️ Entry & Rescue Equipment": [
      " Tripod with Winch",
      " Entry Ladders",
      " Confined Space Ventilation Equipment",
      " Lifeline System"
    ],
    "🧯 Safety & Monitoring Tools": [
      " Continuous Atmosphere Monitoring",
      " First Aid Kit",
      " Emergency Rescue Plan",
      " Fire Extinguisher"
    ],
    "🗂️ Documentation & Communication": [
      " Confined Space Entry Permit",
      " SWMS (Safe Work Method Statement)",
      " Risk Assessment Sheet",
      " Two-way Radios or Mobile Phones for Communication"
    ]
  },
  
  'Excavation and Trenching': {
    "🧍‍♂️ Personal Protective Equipment (PPE)": [
      " High-Visibility Clothing",
      " Safety Helmet",
      " Steel-Toed Boots",
      " Gloves",
      " Hearing Protection"
    ],
    "🛠️ Equipment & Tools": [
      " Excavators",
      " Shovels and Spades",
      " Backhoes",
      " Dump Trucks"
    ],
    "🧯 Safety & Monitoring Tools": [
      " Shoring and Trenching Boxes",
      " Slope Indicators",
      " First Aid Kit",
      " Fire Extinguisher",
      " Rescue Hoists"
    ],
    "🗂️ Documentation & Communication": [
      " Excavation Permit",
      " SWMS (Safe Work Method Statement)",
      " Daily Inspection Log",
      " Two-way Radios or Mobile Phones for Communication"
    ]
  },
  
  'Hot Work (Welding & Cutting)': {
    "🧍‍♂️ Personal Protective Equipment (PPE)": [
      " Welding Helmet",
      " Fire-Resistant Clothing",
      " Gloves",
      " Respiratory Protection",
      " Hearing Protection"
    ],
    "🛠️ Equipment & Tools": [
      " Welding Machine",
      " Cutting Torch",
      " Portable Grinder",
      " Clamps and Pliers"
    ],
    "🧯 Safety & Monitoring Tools": [
      " Fire Extinguisher",
      " Fire Watch Equipment",
      " Fume Extractor",
      " Flame Retardant Blankets",
      " Sparks Containment"
    ],
    "🗂️ Documentation & Communication": [
      " Hot Work Permit",
      " SWMS (Safe Work Method Statement)",
      " Fire Watch Logs",
      " Two-way Radios or Mobile Phones for Communication"
    ]
  },
  'Scaffolding Erection': {
  "🧍‍♂️ Personal Protective Equipment (PPE)": [
    " Hard Hat",
    " High-visibility Vest or Clothing",
    " Steel-toe Boots",
    " Safety Harness with Lanyard (for mobile scaffold)",
    " Safety Gloves"
  ],
  "🛠️ Scaffolding Materials & Tools": [
    " Scaffold Frames, Planks, and Braces",
    " Base Plates and Sole Boards",
    " Toe Boards and Guardrails",
    " Adjustable Screw Jacks",
    " Access Ladders",
    " Scaffold Couplers (Right Angle, Swivel, Putlog)",
    " Scaffold Tag System",
    " Scaffolding Wrench / Ratchet Spanner"
  ],
  "📋 Safety & Inspection": [
    " Scaffold Level and Plumb Checked",
    " Weight Limit Signage Displayed",
    " Daily Inspection Log Maintained",
    " Bracing and Ties Properly Installed",
    " Tagged and Approved Before Use",
    " No Gaps Between Planks",
    " Debris Cleared from Platform"
  ],
  "🗂️ Documentation & Compliance": [
    " Work Permit (if required)",
    " Erection Plan / SWMS Document",
    " Licenses Verified for Scaffolders",
    " Emergency Procedures Communicated",
    " Toolbox Talk Conducted"
  ]
}
,
  'Demolition Work': {
    "🧍‍♂️ Personal Protective Equipment (PPE)": [
      " Safety Helmet",
      " High-Visibility Clothing",
      " Steel-Toed Boots",
      " Gloves",
      " Hearing Protection"
    ],
    "🛠️ Equipment & Tools": [
      " Demolition Hammer",
      " Power Saws",
      " Hydraulic Breakers",
      " Oxy-acetylene Torch"
    ],
    "🧯 Safety & Monitoring Tools": [
      " Air Quality Monitoring Equipment",
      " Fire Extinguisher",
      " First Aid Kit",
      " Emergency Escape Breathing Apparatus"
    ],
    "🗂️ Documentation & Communication": [
      " Demolition Plan",
      " Risk Assessment Sheet",
      " Emergency Evacuation Plan",
      " Two-way Radios or Mobile Phones for Communication"
    ]
  },
  'Manual Handling': {
  "🧍‍♂️ Personal Protective Equipment (PPE)": [
    " Gloves for Grip and Protection",
    " Back Support Belt (if required)",
    " Non-slip Footwear"
  ],
  "🛠️ Equipment & Tools": [
    " Trolleys or Dollies (in Good Condition)",
    " Mechanical Aids (e.g., hoists, pallet jacks)"
  ],
  "📋 Safety & Handling Procedures": [
    " Load Assessed Before Lifting",
    " Proper Lifting Technique Used",
    " Path Cleared of Obstacles",
    " Team Lifting Applied Where Needed",
    " Heavy Items Stored at Waist Height",
    " Breaks Taken During Repetitive Tasks",
    " Stretching or Warm-up Performed"
  ],
  "🎓 Training & Awareness": [
    " Manual Handling Training Completed",
    " Staff Aware of Load Limits and Proper Techniques"
  ]
}

};

const Equipment = () => {
  const location = useLocation();
  const { title } = location.state || {};
  const [checkedItems, setCheckedItems] = useState({});

  // Flatten checklist items
  const checklistItems = [];
  if (checklists[title]) {
    const sections = checklists[title];
    for (const section in sections) {
      checklistItems.push(`--- ${section} ---`);
      checklistItems.push(...sections[section]);
    }
  }

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

      doc.text(`${index + 1}. ${item} ${item.startsWith('---') ? '' : status}`, 10, y);
      y += lineHeight;
    });

    doc.save(`${title}_Checklist.pdf`);
  };

  return (
    <div className="container my-4">
      {/* Button Container */}
      <div className="d-flex justify-content-end mb-3">
        <Link to="/swms">
          <button className="btn btn-primary me-2"><i class="fa-solid fa-arrow-left me-2"></i>Back</button>
        </Link>
        <button className="btn btn-success" onClick={handleDownload}>Download Checklist</button>
      </div>

      {/* Checklist Title */}
      <h4 className="fw-bold mb-3">✅ {title} Equipment</h4>

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
                <td>{item.startsWith('---') ? item.replace(/---/g, '') : item}</td>
                <td className="text-center">
                  {!item.startsWith('---') && (
                    <input
                      type="radio"
                      name={`check-${index}`}
                      value="yes"
                      checked={checkedItems[index] === 'yes'}
                      onChange={() =>
                        setCheckedItems((prev) => ({ ...prev, [index]: 'yes' }))
                      }
                    />
                  )}
                </td>
                <td className="text-center">
                  {!item.startsWith('---') && (
                    <input
                      type="radio"
                      name={`check-${index}`}
                      value="no"
                      checked={checkedItems[index] === 'no'}
                      onChange={() =>
                        setCheckedItems((prev) => ({ ...prev, [index]: 'no' }))
                      }
                    />
                  )}
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

export default Equipment;
