// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './slices/projectSlice';
import diaryReducer from './slices/diarySlice';
import timesheetReducer from "./slices/timesheetSlice"; 
import swmsReducer from "./slices/swmsSlice";
import sitereviewReducer from "./slices/sitereviewSlice";

export const store = configureStore({
  reducer: {
    projects: projectReducer,
     diaries: diaryReducer,
      timesheets: timesheetReducer,
      swms : swmsReducer,
      sitereview: sitereviewReducer,
  }
});
