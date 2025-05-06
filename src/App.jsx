import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Layout/Navbar";
import Sidebar from "./components/Layout/Sidebar";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./components/AdminComponents/Dashbord/Dashbord";
import Inductions from "./components/AdminComponents/Inductions/Inductions";
import AddnewInduction from "./components/AdminComponents/Inductions/AddnewInduction";
import SWMS from "./components/AdminComponents/SWMS/SWMS";
import AddnewSms from "./components/AdminComponents/SWMS/AddnewSms";
import IncidentReports from "./components/AdminComponents/IncidentReports/IncidentReports";
import AddIncidentReports from "./components/AdminComponents/IncidentReports/AddIncidentReports";
import NEW from "./components/AdminComponents/SWMS/NEW";
import SiteReview from "./components/AdminComponents/SiteReview/SiteReview";
import AddSiteReview from "./components/AdminComponents/SiteReview/AddSiteReview";
import ITPs from "./components/AdminComponents/ITPs/ITPs";
import AddITPs from "./components/AdminComponents/ITPs/AddITPs";
import Checklists from "./components/AdminComponents/checklists/Checklists";
import AddChecklists from "./components/AdminComponents/checklists/AddChecklists";
import DefectList from "./components/AdminComponents/DefectList/DefectList";
import AddDefectList from "./components/AdminComponents/DefectList/AddDefectList";
import PlantMachinery from "./components/AdminComponents/PlantMachinery/PlantMachinery";
import AddToolRegistry from "./components/AdminComponents/PlantMachinery/AddToolRegistry";
import AddEquipment from "./components/AdminComponents/PlantMachinery/AddEquipment";
import ViewServicePage from "./components/AdminComponents/PlantMachinery/ViewServicePage";
import Messenger from "./components/AdminComponents/messenger/Messenger";
import Announcements from "./components/AdminComponents/announcements/Announcements";
import AddAnnouncements from "./components/AdminComponents/announcements/AddAnnouncements";
import AddRFIs from "./components/AdminComponents/RFIs/AddRFIs";
import ToolboxTalks from "./components/AdminComponents/ToolboxTalks/ToolboxTalks";
import AddToolboxTalks from "./components/AdminComponents/ToolboxTalks/AddToolboxTalks";
import Calendar from "./components/AdminComponents/Calendar/Calendar";
import Calendar_createnewtask from "./components/AdminComponents/Calendar/Calendar_createnewtask";
import DiariesTimesheets from "./components/AdminComponents/Diaries_timesheets/Diaries_timesheets";
import AddDiaries_timesheets from "./components/AdminComponents/Diaries_timesheets/AddDiaries_timesheets";
import Documents from "./components/AdminComponents/Documents/Documents";
import DrawingRegister from "./components/AdminComponents/DrawingRegister/DrawingRegister";
import Doc3DBeamModeling from "./components/AdminComponents/Doc3DBeamModeling/Doc3DBeamModeling";
import AIConstructionAssistant from "./components/AdminComponents/AIConstructionAssistant/AIConstructionAssistant";
import ClientPortal from "./components/AdminComponents/ClientPortal/ClientPortal";
import ReportAnalytics from "./components/AdminComponents/ReportAnalytics/ReportAnalytics";
import UserManagement from "./components/AdminComponents/UserManagement/UserManagement";
import AddUserManagement from "./components/AdminComponents/UserManagement/AddUserManagement";
import Settings from "./components/AdminComponents/Settings/Settings";
import TaskManagement from "./components/AdminComponents/TaskManagement/TaskDashboard";
import SafetyComplianceDashboard from "./components/AdminComponents/SafetyComplianceDashboard/SafetyComplianceDashboard";
import Template from "./components/AdminComponents/SWMS/Template";
import Equipment from "./components/AdminComponents/SWMS/Equipment";
import AuditEquipment from "./components/AdminComponents/AuditEquipment/AuditEquipment";
import SafetyEquipment from "./components/AdminComponents/SafetyEquipment/SafetyEquipment";
import EquipmentDetailsPage from "./components/AdminComponents/PlantMachinery/EquipmentDetailsPage";
import SubmitReport from "./components/AdminComponents/AuditEquipment/SubmitReport";
import UploadNew from "./components/AdminComponents/DrawingRegister/UploadNew";
import Architure from "./components/AdminComponents/DrawingRegister/Architure";
import AddDocumentFrom from "./components/AdminComponents/DrawingRegister/AddDocumentFrom";
import AddNewTask from "./components/AdminComponents/TaskManagement/AddNewTask";
import HelpSupport from "./components/AdminComponents/Help_Support/HelpSupport";
import ProjectDashboard from "./components/AdminComponents/ProjectDashboard/ProjectDashboard";
import AddProject from "./components/AdminComponents/ProjectDashboard/AddProject";
import OpenBim from "./components/AdminComponents/Doc3DBeamModeling/OpenBim";
import ViewSmws from "./components/AdminComponents/SWMS/ViewSmws";
import ViewInductions from "./components/AdminComponents/Inductions/ViewInductions";
import ComplianceDashboard from "./components/AdminComponents/ComplianceDashboard/ComplianceDashboard";
import AddNewWorker from "./components/AdminComponents/ComplianceDashboard/AddNewWorker";
import SiteEntry from "./components/AdminComponents/SiteEntry/SiteEntry";
import SiteEntryTable from "./components/AdminComponents/SiteEntry/SiteEntryTable";
import FullSiteMap from "./components/AdminComponents/Dashbord/FullSiteMap";
// import Dashboard from "./components/SuperAdmin/SuperAdminDashboard";
import PlanPackage from "./components/SuperAdmin/PlanPackage";
import PlanRequest from "./components/SuperAdmin/PlanRequest";
import UserInfo from "./components/SuperAdmin/UserInfo";
import SuperadminSetting from "./components/SuperAdmin/SuperadminSetting";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SafetyEquipmentList from "./components/AdminComponents/SafetyEquipment/SafetyEquipmentList";
import SafetyEquipmentDetails from "./components/AdminComponents/SafetyEquipment/SafetyEquipmentDetails";
import EditToolboxTalk from "./components/AdminComponents/ToolboxTalks/EditToolboxTalk";
import AuditReports from "./components/AdminComponents/AuditEquipment/AuditReports";
import RFIs from "./components/AdminComponents/RFIs/RFIs";
import EditUser from "./components/AdminComponents/UserManagement/EditUser";
import ViewUser from "./components/AdminComponents/UserManagement/ViewUser";
import AuditEquipmentView from "./components/AdminComponents/AuditEquipment/AuditEquipmentView";

import ComplianceReport from "./components/AdminComponents/ComplianceReport/ComplianceReport";
import ProtectedRoute from "./routes/ProtectedRoutes";
import SuperAdminDashboard from "./components/SuperAdmin/SuperAdminDashboard";
import DefectDetails from "./components/AdminComponents/DefectList/DefectDetails";
import ViewITPDetails from "./components/AdminComponents/ITPs/ViewITPDetails";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const location = useLocation();

  const hideLayout =
    location.pathname === "/" || location.pathname === "/signup";

  return (
    <div className="Main-App">
      <ToastContainer position="top-right" autoClose={2000} />
      {!hideLayout && <Navbar toggleSidebar={toggleSidebar} />}
      <div className={`Main-App-container ${hideLayout ? "no-sidebar" : ""}`}>
        {!hideLayout && (
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        )}
        <div className="Main-App-Content">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Signup" element={<Register />} />

            {/* AdminComponents */}
            <Route path="/dashboard" element={
          <Dashboard />
       } />
            <Route
              path="/safety-compliance-dashboard"
              element={<SafetyComplianceDashboard />}
            />
            <Route path="/inductions" element={<Inductions />} />
            <Route path="/AddnewInduction" element={<AddnewInduction />} />
            <Route path="/swms" element={<SWMS />} />
            <Route path="/audit-equipment" element={<AuditEquipment />} />
            <Route path="/safety-equipment" element={<SafetyEquipmentList />} />
            <Route path="/submit-report" element={<SubmitReport />} />
            <Route
              path="/ComplianceDashboard"
              element={<ComplianceDashboard></ComplianceDashboard>}
            ></Route>
              <Route
              path="/AddNewWorker"
              element={<AddNewWorker></AddNewWorker>}
            ></Route>
            <Route path="/AddnewSms" element={<AddnewSms />} />
            <Route path="/editnewSwms/:id" element={<AddnewSms />} />

            <Route path="/template" element={<Template />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/n" element={<NEW />} />
            <Route path="/IncidentReports" element={<IncidentReports />} />
            <Route
              path="/AddIncidentReports"
              element={<AddIncidentReports />}
            />
            <Route path="/siteEntry" element={<SiteEntry />} />
            <Route path="/siteEntry/:id" element={<SiteEntry />} />
            <Route path="/siteEntryTable" element={<SiteEntryTable />} />
            <Route path="/siteReview" element={<SiteReview />} />
            <Route path="/addSiteReview" element={<AddSiteReview />} />
            <Route path="/addSiteReview/:id" element={<AddSiteReview />} />
            <Route path="/ITPs" element={<ITPs />} />

            <Route
              path="/ProjectDashboard"
              element={<ProjectDashboard></ProjectDashboard>}
            ></Route>
            <Route path="/add-project" element={<AddProject />} />
            <Route path="/AddITPs" element={<AddITPs />} />
            <Route path="/edititp/:id" element={<AddITPs />} />
            <Route path="/checklists" element={<Checklists />} />
            <Route path="/AddChecklists" element={<AddChecklists />} />
            <Route path="/defects" element={<DefectList />} />
            <Route path="/AddDefectList" element={<AddDefectList />} />
            <Route path="/edit-defect/:id" element={<AddDefectList />} />
            <Route path="/PlantMachinery" element={<PlantMachinery />} />
            <Route path="/AddToolRegistry" element={<AddToolRegistry />} />
            <Route path="/AddToolRegistry/:id" element={<AddToolRegistry />} />
            <Route path="/AddEquipment" element={<AddEquipment />} />
            <Route path="/AddEquipment/:id" element={<AddEquipment />} />

            <Route
              path="/equipment-details/:id"
              element={<EquipmentDetailsPage />}
            />

            {/* <Route path="/AddServices" element={<AddServices/>} /> */}
            <Route path="/messenger" element={<Messenger />} />
            <Route path="/helpSupport" element={<HelpSupport></HelpSupport>} />
            <Route path="/TaskDashboard" element={<TaskManagement />} />
            <Route path="/create-task" element={<AddNewTask />} />
            <Route path="/updatetask/:id" element={<AddNewTask />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/AddAnnouncements" element={<AddAnnouncements />} />
            <Route path="/rfis" element={<RFIs />} />
            <Route path="/AddRFIs" element={<AddRFIs />} />
            <Route path="/toolbox" element={<ToolboxTalks />} />
            <Route path="/AddToolboxTalks" element={<AddToolboxTalks />} />
            <Route path="/Calendar" element={<Calendar />} />
            <Route
              path="/Calendar_createnewtask"
              element={<Calendar_createnewtask />}
            />
            <Route path="/DiariesTimesheets" element={<DiariesTimesheets />} />
            <Route
              path="/AddDiaries_timesheets"
              element={<AddDiaries_timesheets />}
            />
            <Route path="/Documents" element={<Documents />} />
            <Route path="/upload-new" element={<UploadNew />} />
            <Route path="/architure" element={<Architure />} />
            <Route path="/add-document-from" element={<AddDocumentFrom />} />
            <Route path="/DrawingRegister" element={<DrawingRegister />} />
            <Route path="/Doc3DBeamModeling" element={<Doc3DBeamModeling />} />
            <Route
              path="/AIConstructionAssistant"
              element={<AIConstructionAssistant />}
            />
            <Route path="/ClientPortal" element={<ClientPortal />} />
            <Route path="/ReportAnalytics" element={<ReportAnalytics />} />
            <Route path="/UserManagement" element={<UserManagement />} />
            <Route path="/AddUserManagement" element={<AddUserManagement />} />
            <Route path="/Settings" element={<Settings />} />
            {/* AdminComponents */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/safety-compliance-dashboard"
              element={<SafetyComplianceDashboard />}
            />
            <Route path="/inductions" element={<Inductions />} />
            <Route path="/AddnewInduction" element={<AddnewInduction />} />
            <Route path="/swms" element={<SWMS />} />
            <Route path="/audit-equipment" element={<AuditEquipment />} />
            <Route
              path="/edit-audit-equipment/:id"
              element={<AuditEquipment />}
            />
            <Route
              path="/audit-equipmentview/:id"
              element={<AuditEquipmentView />}
            />
            <Route path="/auditreport" element={<AuditReports />} />
            <Route path="/safety-equipment" element={<SafetyEquipment />} />
            <Route path="/submit-report" element={<SubmitReport />} />
            <Route path="/AddnewSms" element={<AddnewSms />} />
            <Route path="/template" element={<Template />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/n" element={<NEW />} />
            <Route path="/IncidentReports" element={<IncidentReports />} />
            <Route
              path="/AddIncidentReports"
              element={<AddIncidentReports />}
            />
            <Route path="/siteReview" element={<SiteReview />} />
            <Route path="/addSiteReview" element={<AddSiteReview />} />
            <Route path="/ITPs" element={<ITPs />} />
            <Route path="/AddITPs" element={<AddITPs />} />
            <Route path="/checklists" element={<Checklists />} />
            <Route path="/AddChecklists" element={<AddChecklists />} />
            <Route path="/editchecklist/:id" element={<AddChecklists />} />
            <Route path="/defects" element={<DefectList />} />
            <Route path="/AddDefectList" element={<AddDefectList />} />
            <Route path="/PlantMachinery" element={<PlantMachinery />} />
            <Route path="/AddToolRegistry" element={<AddToolRegistry />} />
            <Route path="/AddEquipment" element={<AddEquipment />} />
            {/* <Route path="/AddServices" element={<AddServices/>} /> */}
            <Route path="/messenger" element={<Messenger />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/AddAnnouncements" element={<AddAnnouncements />} />
            <Route path="/rfis" element={<RFIs />} />
            <Route path="/AddRFIs" element={<AddRFIs />} />
            <Route path="/toolbox" element={<ToolboxTalks />} />
            <Route path="/AddToolboxTalks" element={<AddToolboxTalks />} />
            <Route path="/Calendar" element={<Calendar />} />
            <Route path="/edit-toolbox/:id" element={<EditToolboxTalk />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
            <Route path="/users/view/:id" element={<ViewUser />} />
            <Route
              path="/ComplianceReport"
              element={<ComplianceReport></ComplianceReport>}
            ></Route>

            <Route
              path="/Calendar_createnewtask"
              element={<Calendar_createnewtask />}
            />
            <Route path="/DiariesTimesheets" element={<DiariesTimesheets />} />
            <Route
              path="/AddDiaries_timesheets"
              element={<AddDiaries_timesheets />}
            />
            <Route path="/Documents" element={<Documents />} />
            <Route path="/upload-new" element={<UploadNew />} />
            <Route path="/architure" element={<Architure />} />
            <Route path="/open-bim" element={<OpenBim />} />
            <Route path="/view-swms/:id" element={<ViewSmws />} />
            <Route path="/View-Inductions/:id" element={<ViewInductions />} />
            <Route path="/add-document-from" element={<AddDocumentFrom />} />
            <Route path="/DrawingRegister" element={<DrawingRegister />} />
            <Route path="/Doc3DBeamModeling" element={<Doc3DBeamModeling />} />
            <Route
              path="/AIConstructionAssistant"
              element={<AIConstructionAssistant />}
            />
            <Route path="/ClientPortal" element={<ClientPortal />} />
            <Route path="/ReportAnalytics" element={<ReportAnalytics />} />
            <Route path="/UserManagement" element={<UserManagement />} />
            <Route path="/AddUserManagement" element={<AddUserManagement />} />
            <Route path="/Settings" element={<Settings />} />
            {/* AdminComponents */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/safety-compliance-dashboard"
              element={<SafetyComplianceDashboard />}
            />
            <Route path="/inductions" element={<Inductions />} />
            <Route path="/AddnewInduction" element={<AddnewInduction />} />
            <Route path="/swms" element={<SWMS />} />
            <Route path="/AddnewSms" element={<AddnewSms />} />
            <Route path="/n" element={<NEW />} />
            <Route path="/IncidentReports" element={<IncidentReports />} />
            <Route
              path="/AddIncidentReports"
              element={<AddIncidentReports />}
            />
            <Route path="/siteReview" element={<SiteReview />} />
            <Route path="/addSiteReview" element={<AddSiteReview />} />
            <Route path="/ITPs" element={<ITPs />} />
            <Route path="/AddITPs" element={<AddITPs />} />
            <Route path="/checklists" element={<Checklists />} />
            <Route path="/AddChecklists" element={<AddChecklists />} />
            <Route path="/defects" element={<DefectList />} />
            <Route path="/AddDefectList" element={<AddDefectList />} />
            <Route path="/PlantMachinery" element={<PlantMachinery />} />
            <Route path="/AddToolRegistry" element={<AddToolRegistry />} />
            <Route path="/AddSafety" element={<SafetyEquipment />} />
            <Route path="/AddSafety/:id" element={<SafetyEquipment />} />
            <Route path="/view-service" element={<ViewServicePage />} />
            <Route path="/defects/:id" element={<DefectDetails />} />
            <Route path="/itps/view/:id" element={<ViewITPDetails />} />
            <Route
              path="/safety-equipment/:id"
              element={<SafetyEquipmentDetails />}
            />
            {/* <Route
              path="/equipment-details"
              element={<EquipmentDetailsPage />}
            /> */}
            <Route
              path="/addEquipment"
              element={<SafetyEquipment></SafetyEquipment>}
            ></Route>
            <Route
              path="/FullSiteMap"
              element={<FullSiteMap></FullSiteMap>}
            ></Route>
            <Route path="/messenger" element={<Messenger />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/AddAnnouncements" element={<AddAnnouncements />} />
            <Route
              path="/EditAnnouncements/:id"
              element={<AddAnnouncements />}
            />

            <Route path="/rfis" element={<RFIs />} />
            <Route path="/AddRFIs" element={<AddRFIs />} />
            <Route path="/toolbox" element={<ToolboxTalks />} />
            <Route path="/AddToolboxTalks" element={<AddToolboxTalks />} />
            <Route path="/Calendar" element={<Calendar />} />
            <Route
              path="/Calendar_createnewtask"
              element={<Calendar_createnewtask />}
            />
            <Route path="/DiariesTimesheets" element={<DiariesTimesheets />} />
            <Route
              path="/AddDiaries_timesheets"
              element={<AddDiaries_timesheets />}
            />
            <Route path="/Documents" element={<Documents />} />
            <Route path="/DrawingRegister" element={<DrawingRegister />} />
            <Route path="/Doc3DBeamModeling" element={<Doc3DBeamModeling />} />
            <Route
              path="/AIConstructionAssistant"
              element={<AIConstructionAssistant />}
            />
            <Route path="/ClientPortal" element={<ClientPortal />} />
            <Route path="/ReportAnalytics" element={<ReportAnalytics />} />
            <Route path="/UserManagement" element={<UserManagement />} />
            <Route path="/AddUserManagement" element={<AddUserManagement />} />
            <Route path="/Settings" element={<Settings />} />
            {/* super-admin */}
            <Route path="/super-admin-dashboard" element={<SuperAdminDashboard />} />
            <Route path="/Plan-Package" element={<PlanPackage />} />
            <Route path="/Plan-request" element={<PlanRequest />} />
            <Route path="/user-info" element={<UserInfo />} />
            <Route
              path="/super-admin-setting"
              element={<SuperadminSetting />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
