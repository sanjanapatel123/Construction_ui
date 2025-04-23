import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching timesheets
export const fetchTimesheets = createAsyncThunk(
  "timesheets/fetchTimesheets",
  async () => {
    const response = await axios.get("https://contructionbackend.onrender.com/api/timesheet");
    return response.data;
  }
);

const timesheetSlice = createSlice({
  name: "timesheets",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTimesheets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTimesheets.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTimesheets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default timesheetSlice.reducer;
