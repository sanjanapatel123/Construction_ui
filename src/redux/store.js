// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './slices/projectSlice';
import diaryReducer from './slices/diarySlice';
import timesheetReducer from "./slices/timesheetSlice"; 
import swmsReducer from "./slices/swmsSlice";
import itpReducer from './slices/itpSlice'
import checklistReducer from './slices/checklistSlice';

export const store = configureStore({
  reducer: {
    projects: projectReducer,
     diaries: diaryReducer,
      timesheets: timesheetReducer,
      swms : swmsReducer,
       itps: itpReducer,
        checklists: checklistReducer,
  }
});
