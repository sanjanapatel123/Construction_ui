import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { apiUrl } from '../../utils/config'; // Adjust the import path as necessary
import axiosInstance from '../../utils/axiosInstance';

// Thunk to fetch all ITPs
export const fetchITPs = createAsyncThunk('itps/fetchITPs', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`${apiUrl}/itps/`)
    return response.data.data;
    // Log the response data
  } catch (error) {
   
    return rejectWithValue(error?.response?.data?.message || "Failed to fetch ITPs");
  }
});


export const fetchITPById = createAsyncThunk(
  'itps/fetchITPById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/itps/${id}`);
      return response.data; // return full object
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || "Failed to fetch ITP details");
    }
  }
);

// export const updateITP = createAsyncThunk('itps/updateITP' , async ({id , updatedITP}, thunkAPI) => 
//    {
//     try {
//       const reposnse = await axiosInstance.patch(`${apiUrl}/itps/${id}`, updatedITP, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });
//       return reposnse.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error?.response?.data?.message || "Failed to update ITP");
//     }
//    }
// )

export const updateITP = createAsyncThunk(
  'itps/updateITP',
  async ({id, updatedITP}, thunkAPI) => {
    try {
      // Log the form data for debugging
      for (let pair of updatedITP.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await axiosInstance.patch(
        `${apiUrl}/itps/${id}`,
        updatedITP,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        }
      );
      
      if (!response.data.success) {
        throw new Error(response.data.message || 'Update failed');
      }
      
      return response.data.itp;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Failed to update ITP"
      );
    }
  }
);

export const deleteITP = createAsyncThunk('itps/deleteITP', async (projectId, { dispatch, rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`${apiUrl}/itps/${projectId}`);
    toast.success("Itps deleted successfully!");
    dispatch(fetchITPs()); // re-fetch list
    return response.data.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to delete Itps!");
    return rejectWithValue(error?.response?.data?.message || "Delete failed");
  }
});

const itpSlice = createSlice({
  name: 'itps',
  initialState: {
    data: [],
    loading: false,
    error: null,
     selectedITP: null
  },
  reducers: {
      clearSelectedITP: (state) => {
      state.selectedITP = null;
    },
      
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchITPs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchITPs.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchITPs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(deleteITP.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.deleteSuccessMsg = '';
      })
      .addCase(deleteITP.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((itp) => itp._id !== action.payload.id);
        state.deleteSuccessMsg = action.payload.message;
      })
      .addCase(deleteITP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchITPById.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(fetchITPById.fulfilled, (state, action) => {
  state.loading = false;
  state.selectedITP = action.payload;
})
.addCase(fetchITPById.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})
.addCase(updateITP.pending, (state) => {  
  state.loading = true;
  state.error = null;
})
.addCase(updateITP.fulfilled, (state, action) => {
  state.loading = false;
  const updatedITP = action.payload;
  const index = state.data.findIndex((itp) => itp._id === updatedITP._id);
  if (index !== -1) {
    state.data[index] = updatedITP;
  }

})
.addCase(updateITP.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

     
  }
});

export const { clearSelectedITP,openEditModal } = itpSlice.actions;
export default itpSlice.reducer;
