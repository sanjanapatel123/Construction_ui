import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import { apiUrl } from '../../utils/config';

// CREATE INCIDENT REPORT
export const createIncidentReport = createAsyncThunk(
  'incidentReport/createIncidentReport',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `${apiUrl}/incident`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// GET INCIDENT REPORTS
export const getIncidentReports = createAsyncThunk(
  'incidentReport/getIncidentReports',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `${apiUrl}/incident`
      );
      // console.log(response.data.incidents)
      return response.data.incidents;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// DELETE INCIDENT REPORT
export const deleteIncidentReport = createAsyncThunk(
  'incidentReport/deleteIncidentReport',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(
        `${apiUrl}/incident/${id}`
      );
      return id;  // return id for local state update
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const incidentReportSlice = createSlice({
  name: 'incidentReport',
  initialState: {
    reports: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createIncidentReport.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createIncidentReport.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reports.push(action.payload);
      })
      .addCase(createIncidentReport.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // GET
      .addCase(getIncidentReports.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getIncidentReports.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reports = action.payload;
      })
      .addCase(getIncidentReports.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // DELETE
      .addCase(deleteIncidentReport.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteIncidentReport.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.reports = state.reports.filter(
          (report) => report._id !== action.payload
        );
      })
      .addCase(deleteIncidentReport.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default incidentReportSlice.reducer;
