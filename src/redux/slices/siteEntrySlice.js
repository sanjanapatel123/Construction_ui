import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



// POST: Add new site entry
export const addSiteEntry = createAsyncThunk(
  "siteEntry/addSiteEntry",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`https://hrb5wx2v-8000.inc1.devtunnels.ms/api/siteEntry`, formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// GET: Fetch all site entries
export const fetchSiteEntries = createAsyncThunk(
  "siteEntry/fetchSiteEntries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://hrb5wx2v-8000.inc1.devtunnels.ms/api/siteEntry`);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// DELETE: Delete a site entry by ID
export const deleteSiteEntry = createAsyncThunk(
  "siteEntry/deleteSiteEntry",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`https://hrb5wx2v-8000.inc1.devtunnels.ms/api/siteEntry/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const siteEntrySlice = createSlice({
  name: "siteEntry",
  initialState: {
    entries: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add site entry
      .addCase(addSiteEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(addSiteEntry.fulfilled, (state, action) => {
        state.loading = false;
        state.entries.push(action.payload);
      })
      .addCase(addSiteEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch site entries
      .addCase(fetchSiteEntries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSiteEntries.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = action.payload;
      })
      .addCase(fetchSiteEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete site entry
      .addCase(deleteSiteEntry.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteSiteEntry.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = state.entries.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteSiteEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default siteEntrySlice.reducer;
