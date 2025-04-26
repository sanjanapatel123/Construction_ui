import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../utils/config";

// Get all announcements
export const fetchAnnouncements = createAsyncThunk(
  "announcements/fetchAnnouncements",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${apiUrl}/announement`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Something went wrong!");
    }
  }
);

// Add a new announcement
export const addAnnouncement = createAsyncThunk(
  "announcements/addAnnouncement",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${apiUrl}/announement`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Something went wrong!");
    }
  }
);

// Delete announcement by ID
export const deleteAnnouncement = createAsyncThunk(
  "announcements/deleteAnnouncement",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${apiUrl}/announement/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data || "Something went wrong!");
    }
  }
);
// Update announcement by ID
export const updateAnnouncement = createAsyncThunk(
  "announcements/updateAnnouncement",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${apiUrl}/announement/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Something went wrong!");
    }
  }
);

// Announcement slice
const announcementSlice = createSlice({
  name: "announcements",
  initialState: {
    announcements: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchAnnouncements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnnouncements.fulfilled, (state, action) => {
        state.loading = false;
        state.announcements = action.payload;
      })
      .addCase(fetchAnnouncements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        state.announcements.push(action.payload);
      })
      .addCase(addAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteAnnouncement.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAnnouncement.fulfilled, (state, action) => {
        state.loading = false;
        state.announcements = state.announcements.filter(
          (item) => item._id !== action.payload
        );
      })
      .addCase(deleteAnnouncement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
.addCase(updateAnnouncement.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(updateAnnouncement.fulfilled, (state, action) => {
  state.loading = false;
  const index = state.announcements.findIndex(
    (item) => item._id === action.payload._id
  );
  if (index !== -1) {
    state.announcements[index] = action.payload;
  }
})
.addCase(updateAnnouncement.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});

  },
});

export default announcementSlice.reducer;
