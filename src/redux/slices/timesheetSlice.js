import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../utils/config";

// Async thunk for fetching timesheets
export const fetchTimesheets = createAsyncThunk(
  "timesheets/fetchTimesheets",
  async () => {
    const response = await axios.get(`${apiUrl}/timesheet`);
    return response.data;
  }
);

export const deleteTimesheet = createAsyncThunk(
  "timesheets/deleteTimesheet",
  async (id, { rejectWithValue }) => {  
    try {
      await axios.delete(`https://contructionbackend.onrender.com/api/timesheet/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
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
      })
        .addCase(deleteTimesheet.fulfilled, (state, action) => {
        state.data = state.data.filter((entry) => entry._id !== action.payload);
      });
  },
});

export default timesheetSlice.reducer;
