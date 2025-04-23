import React from 'react'

function Settings() {
  return (
    <div>
      <div className="container d-flex justify-content-center py-4">
  <div className="w-100">
    <div className="d-flex flex-column gap-4">

      {/* General Settings */}
      <div className="card shadow-sm border-0 p-4 rounded-4 bg-white-subtle">
        <h5 className="mb-4 fw-semibold d-flex align-items-center text-dark">
          <i className="bi bi-gear me-2 text-secondary"></i> General Settings
        </h5>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="fw-normal">Dark Mode</span>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="darkMode" />
          </div>
        </div>
        <div className="mb-2">
          <label htmlFor="language" className="form-label fw-normal">Language</label>
          <select className="form-select rounded-3" id="language">
            <option>English</option>
          </select>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="card shadow-sm border-0 p-4 rounded-4 bg-white-subtle">
        <h5 className="mb-4 fw-semibold d-flex align-items-center text-dark">
          <i className="bi bi-bell me-2 text-secondary"></i> Notification Settings
        </h5>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="fw-normal">Email Notifications</span>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="emailNotifications" defaultChecked />
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="fw-normal">Push Notifications</span>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="pushNotifications" defaultChecked />
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span className="fw-normal">SMS Alerts</span>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="smsAlerts" />
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="card shadow-sm border-0 p-4 rounded-4 bg-white-subtle">
        <h5 className="mb-4 fw-semibold d-flex align-items-center text-dark">
          <i className="bi bi-shield-lock me-2 text-secondary"></i> Security Settings
        </h5>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="fw-normal">Two-Factor Authentication</span>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="twoFactorAuth" />
          </div>
        </div>
        <div className="mt-4">
          <div className="fw-medium mb-1">Activity Logs</div>
          <div className="text-muted mb-3 small">View recent account activity</div>
          <div className="bg-light rounded-3 p-3 border">
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-box-arrow-in-right me-2 text-primary"></i>
              <div>
                <div className="fw-medium">Login from new device</div>
                <small className="text-muted">Today at 10:45 AM</small>
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-key me-2 text-warning"></i>
              <div>
                <div className="fw-medium">Password changed</div>
                <small className="text-muted">Yesterday at 3:30 PM</small>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <i className="bi bi-envelope-check me-2 text-success"></i>
              <div>
                <div className="fw-medium">Email verification completed</div>
                <small className="text-muted">2 days ago at 2:15 PM</small>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>

    </div>
  )
}

export default Settings
