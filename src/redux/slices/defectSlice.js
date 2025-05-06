// src/redux/slices/defectSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../utils/config";
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

export const fetchDefects = createAsyncThunk(
  "defects/fetchDefects",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/defectlists`)
      console.log("Defects response:", response.data); // Log the response data
      return response.data.defects; // Adjust this based on your API response structure
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || "Error fetching defects");
    }
  }
);



export const fetchDefectDetails = createAsyncThunk(
  "defects/fetchDefectDetails",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/defectlists/${id}`);
      console.log("Defect details response:", response.data); // Log the response data
      return response.data.defect;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data || "Error fetching defect details");
    }
  }
);


export const deleteDefectList = createAsyncThunk('DefectList/deleteDefect', async (projectId, { dispatch, rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`${apiUrl}/defectlists/${projectId}`);
    toast.success("DefectList deleted successfully!");
    dispatch(fetchDefects()); // re-fetch list
    
    return response.data.defects;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to delete DefectList!");
    return rejectWithValue(error?.response?.data?.message || "Delete failed");
  }
});

export const updateDefectList = createAsyncThunk('DefectList/updateDefect', async ({ id, updatedDefect }, thunkAPI) => {
  try { 
    const response = await axiosInstance.patch(`${apiUrl}/defectlists/${id}`, updatedDefect);  
    toast.success("DefectList updated successfully!");
    return response.data.defects;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to update DefectList!");
    return thunkAPI.rejectWithValue(error?.response?.data?.message || "Update failed");
  }
});



const defectSlice = createSlice({
  name: "defects",
  initialState: {
    defects: [],
     defectDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDefects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDefects.fulfilled, (state, action) => {
        state.defects = action.payload;
        state.loading = false;
      })
      .addCase(fetchDefects.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })  .addCase(deleteDefectList.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                    state.deleteSuccessMsg = '';
                  })
                  .addCase(deleteDefectList.fulfilled, (state, action) => {
                    state.loading = false;
                    state.data = state.data.filter((itp) => itp._id !== action.payload.id);
                    state.deleteSuccessMsg = action.payload.message;
                  })
                  .addCase(deleteDefectList.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                  }).addCase(fetchDefectDetails.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(fetchDefectDetails.fulfilled, (state, action) => {
  state.loading = false;
  state.defectDetails = action.payload; // yeh single defect ki detail
})
.addCase(fetchDefectDetails.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})
.addCase(updateDefectList.pending, (state) => {
  state.loading = true; 
  state.error = null;
})
.addCase(updateDefectList.fulfilled, (state, action) => {
  state.loading = false;
  const updatedItem = action.payload;

  const index = state.defects.findIndex(defect => defect._id === updatedItem._id);
  if (index !== -1) {
    state.defects[index] = updatedItem;
  }

  state.defectDetails = updatedItem; // Update detailed view if needed
})

.addCase(updateDefectList.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

  },
});

export default defectSlice.reducer;
