import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosInstance.jsx' 
import { apiUrl } from '../../../utils/config.js';
import { toast } from 'react-toastify';


export const fetchPlans = createAsyncThunk(
  'Plans/fetchPlans',
  async () => {
    const response = await axiosInstance.get(`${apiUrl}/planRequest`);
    return response.data; 
  }
);


// Add a new drawings
export const addDrawings = createAsyncThunk(
  "drawingss/adddrawings",
  async (drawingsData, thunkAPI) => {
    console.log(drawingsData, "drawingsData");
    try {
      const response = await axiosInstance.post(`${apiUrl}/drawings`, drawingsData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Error adding drawings"
      );
    }
  }
);


export const fetchPlanDetails = createAsyncThunk(
  'Plan/fetchPlanDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/Plans/${id}`);
      return response.data;
    } catch (error) {
      toast.error(" details");
      return rejectWithValue(error?.response?.data?.message || "Failed to fetch ITP details");
    }
  }
);

export const updatePlan = createAsyncThunk(
  'Plans/updatePlan',
  async ({ id, PlanData }) => {
    const response = await axiosInstance.put(`${apiUrl}/Plans/${id}`, PlanData);
    return response.data;
  }
);

export const deletePlan = createAsyncThunk('Plan/deletePlan', async (projectId, { dispatch, rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`${apiUrl}/itps/${projectId}`);
    toast.success("Itps deleted successfully!");
    dispatch(fetchPlans());
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to delete Itps!");
    return rejectWithValue(error?.response?.data?.message || "Delete failed");
  }
});

const PlanSlice = createSlice({
  name: 'Plan',
  initialState: {
    Plans: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlans.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.Plans = action.payload;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPlanDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlanDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.PlanDetails = action.payload;
      })
      .addCase(fetchPlanDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
       .addCase(deletePlan.pending, (state) => {
              state.loading = true;
              state.error = null;
              state.deleteSuccessMsg = '';
            })
            .addCase(deletePlan.fulfilled, (state, action) => {
              state.loading = false;
              state.data = state.data.filter((itp) => itp._id !== action.payload.id);
              state.deleteSuccessMsg = action.payload.message;
            })
            .addCase(deletePlan.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            })
  },
});

export default PlanSlice.reducer;
