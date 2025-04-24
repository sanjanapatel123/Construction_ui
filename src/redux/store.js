// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './slices/projectSlice';
import diaryReducer from './slices/diarySlice';
import timesheetReducer from "./slices/timesheetSlice"; 
import swmsReducer from "./slices/swmsSlice";
import inductionReducer from './slices/inductionSlice';
import incidentReportReducer from './slices/incidentReportSlice';
import siteEntrySliceReducer from './slices/siteEntrySlice';
export const store = configureStore({
  reducer: {
      projects: projectReducer,
      diaries: diaryReducer,
      timesheets: timesheetReducer,
      swms : swmsReducer,
      inductions:inductionReducer,
      reports:incidentReportReducer,
      entries:siteEntrySliceReducer
  }
});
