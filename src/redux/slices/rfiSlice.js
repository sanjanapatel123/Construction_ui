import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'
import { apiUrl } from '../../utils/config'

export const createRFI = createAsyncThunk(
  'rfi/createRFI',
  async (submitData, thunkAPI) => {
    console.log(submitData)
    try {
      const response = await axiosInstance.post(
        `${apiUrl}/rfi`,
        submitData,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Error creating RFI"
      );
    }
  }
);


// ✅ Fetch RFIs
export const fetchRFI = createAsyncThunk(
  'rfi/fetchRFI',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/rfi`)
      return response.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "error fetching RFIs"
      )
    }
  }
)

// ✅ Delete RFI
export const deleteRFI = createAsyncThunk(
  'rfi/deleteRFI',
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`${apiUrl}/rfi/${id}`)
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "error deleting RFI"
      )
    }
  }
)

// ✅ Update RFI
export const updateRFI = createAsyncThunk(
  'rfi/updateRFI',
  async ({ id, updatedEntry }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(
        `${apiUrl}/rfi/${id}`,
        updatedEntry,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      )
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "error updating RFI"
      )
    }
  }
)

// ✅ Initial State
const initialState = {
  rfi: [],
  loading: false,
  error: null
}

// ✅ RFI Slice
const rfiSlice = createSlice({
  name: 'rfi',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRFI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRFI.fulfilled, (state, action) => {
        state.loading = false;
        state.rfi.push(action.payload);
      })
      .addCase(createRFI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchRFI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRFI.fulfilled, (state, action) => {
        state.loading = false;
        state.rfi = action.payload;
      })
      .addCase(fetchRFI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateRFI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRFI.fulfilled, (state, action) => {
        state.loading = false;
        const updatedItem = action.payload;
        const index = state.rfi.findIndex(item => item._id === updatedItem._id);
        if (index !== -1) {
          state.rfi[index] = updatedItem;
        }
      })
      .addCase(updateRFI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteRFI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRFI.fulfilled, (state, action) => {
        state.loading = false;
        state.rfi = state.rfi.filter(item => item._id !== action.payload);
      })
      .addCase(deleteRFI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
})

export default rfiSlice.reducer
