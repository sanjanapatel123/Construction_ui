import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../utils/axiosInstance.jsx' 
import { apiUrl } from '../../../utils/config.js';
import { toast } from 'react-toastify';


export const fetchplanRequests = createAsyncThunk(
  'planRequests/fetchplanRequests',
  async () => {
    const response = await axiosInstance.get(`${apiUrl}/planRequest`);
    return response.data; 
  }
);

// Add a new planRequests
export const addplanRequests = createAsyncThunk(
  "planRequest/addplanRequests",
  async (payload, thunkAPI) => {
    console.log(payload, "planRequestsData");
    try {
     const response = await axiosInstance.post(`${apiUrl}/planRequest`, payload, {
  headers: { "Content-Type": "multipart/form-data" },
});

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Error adding planRequests"
      );
    }
  }
);

export const fetchplanRequestDetails = createAsyncThunk(
  'planRequest/fetchplanRequestDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/planRequestPackage/${id}`);
      return response.data;
    } catch (error) {
      toast.error(" details");
      return rejectWithValue(error?.response?.data?.message || "Failed to fetch ITP details");
    }
  }
);

export const updateplanRequest = createAsyncThunk(
    'planRequests/updateplanRequest',
    async ({ id, updatedForm }, thunkAPI) => {
        console.log(updatedForm);
        
      try {
        const response = await axiosInstance.patch(`${apiUrl}/planRequestPackage/${id}`,updatedForm, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message || "Error updating drawing");
      }
    });


export const deleteplanRequest = createAsyncThunk('planRequest/deleteplanRequest', async (_id, { dispatch, rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`${apiUrl}/planRequest/${_id}`);
    toast.success("Itps deleted successfully!");
    dispatch(fetchplanRequests());
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to delete planRequestPackage!");
    return rejectWithValue(error?.response?.data?.message || "Delete failed");
  }
});

export const superadmindashboard = createAsyncThunk(
    'planRequests/superadmindashboard',
    async (_, thunkAPI) => {
      try {
        const response = await axiosInstance.get(`${apiUrl}/superadmindashboard`);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data || "Dashboard fetch failed");
      }
    }
  );
  
  export const PlanRequestApproveStatus = createAsyncThunk(
    'planRequests/approveStatus',
    async ({ _id, approve }, thunkAPI) => {
      try {
        const response = await axiosInstance.patch(
          `${apiUrl}/planRequest/StatusUpdate/${_id}`, 
          { approve } 
        );
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error?.response?.data || "Approval failed");
      }
    }
  );
  
  

const planRequestSlice = createSlice({
  name: 'planRequest',
  initialState: {
    planRequests: [],
    dashboardData:[],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers:(builder) => {
    builder
      .addCase(fetchplanRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchplanRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.planRequests = action.payload;
      })
      .addCase(fetchplanRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchplanRequestDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchplanRequestDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.planRequestDetails = action.payload;
      })
      .addCase(fetchplanRequestDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
    //    .addCase(deleteplanRequest.pending, (state) => {
    //           state.loading = true;
    //           state.error = null;
    //           state.deleteSuccessMsg = '';
    //         })
    //         .addCase(deleteplanRequest.fulfilled, (state, action) => {
    //           state.loading = false;
    //           state.data = state.data.filter((itp) => itp._id !== action.payload.id);
    //           state.deleteSuccessMsg = action.payload.message;
    //         })
    //         .addCase(deleteplanRequest.rejected, (state, action) => {
    //           state.loading = false;
    //           state.error = action.payload;
    //         })
     .addCase(superadmindashboard.pending, (state) => {
        state.loading = true;
     })
     .addCase(superadmindashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardData = action.payload; 
      })
      
      .addCase(superadmindashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default planRequestSlice.reducer;
