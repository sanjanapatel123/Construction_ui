// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './projectSlice';
import diaryReducer from './diarySlice';
import timesheetReducer from "./timesheetSlice"; 

export const store = configureStore({
  reducer: {
    projects: projectReducer,
     diaries: diaryReducer,
      timesheets: timesheetReducer,
  }
});
