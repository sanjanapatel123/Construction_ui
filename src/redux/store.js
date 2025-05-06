// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './slices/projectSlice';
import diaryReducer from './slices/diarySlice';
import timesheetReducer from "./slices/timesheetSlice"; 
import swmsReducer from "./slices/swmsSlice";
import itpReducer from './slices/itpSlice'
import checklistReducer from './slices/checklistSlice';
import sitereviewReducer from "./slices/sitereviewSlice";

import inductionReducer from './slices/inductionSlice';
import incidentReportReducer from './slices/incidentReportSlice';
import siteEntrySliceReducer from './slices/siteEntrySlice';
import toolSliceReducer from './slices/toolSlice';
import equipmentSliceReducer from './slices/equipmentSlice';

import announcementReducer from './slices/announcementSlice';
import rfiSliceReducer from './slices/rfiSlice.js'

import defectReducer from "./slices/defectSlice";
import annotationReducer from "./slices/annotationSlice";
import elementReducer from "./slices/elementSlice";

import safetyEquipmentSlice from "./slices/safetyEquipmentSlice";
import documentSlice from "./slices/documentSlice"
import toolboxTalkReducer from "./slices/toolboxTalkSlice";
import taskManagementSlice from "./slices/taskManagement"
import calendarReducer from "./slices/calendarSlice";

import auditReducer from "./slices/auditSlice";
import userReducer from "./slices/userSlice";
import drawingsReducer from "./slices/drawingsSlice";

import planPackageReducer from './slices/Superadmin/planPackageSlice.js';
import PlanRequestReducer from './slices/Superadmin/planRequestSlice.js';

import authReducer from './slices/authSlice.js';



export const store = configureStore({
  reducer: {
      auth: authReducer,
      projects: projectReducer,
      diaries: diaryReducer,
      timesheets: timesheetReducer,
      swms : swmsReducer,
       itps: itpReducer,
        checklists: checklistReducer,
      sitereview: sitereviewReducer,
      inductions:inductionReducer,
      reports:incidentReportReducer,
      entries:siteEntrySliceReducer,
      tools: toolSliceReducer,
      equipments: equipmentSliceReducer,
      announcements:announcementReducer,
      rfi:rfiSliceReducer,
       defects: defectReducer,
      annotations: annotationReducer,
      elements: elementReducer,
       safetyequipments: safetyEquipmentSlice,
      // annotations: annotationReducer,
      document: documentSlice,
        toolboxTalks: toolboxTalkReducer,
      task : taskManagementSlice,
      calendar : calendarReducer,
      audit : auditReducer,
        users: userReducer,
        drawings: drawingsReducer,
        Plan:planPackageReducer,
        planRequest:PlanRequestReducer
      }

});
