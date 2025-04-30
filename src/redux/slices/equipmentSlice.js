


// redux/slices/equipmentSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUrl } from "../../utils/config";
import axiosInstance from "../../utils/axiosInstance";

// Add Equipment
export const addEquipment = createAsyncThunk(
  'equipment/addEquipment',
  async (formData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`${apiUrl}/equipment`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message || "Error creating equipment");
    }
  }
);

// Fetch Equipment
export const fetchEquipment = createAsyncThunk(
  'equipment/fetchEquipment',
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/equipment`);
      console.log("Response from API:", response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message || "Unauthorized access");
    }
  }
);

// Update Equipment
export const updateEquipment = createAsyncThunk(
  'equipment/updateEquipment',
  async ({ id, equipmentData }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`${apiUrl}/equipment/${id}`, equipmentData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message || "Error updating equipment");
    }
  }
);

export const getequipmentById = createAsyncThunk( 
  'equipment/getequipmentById',
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/equipment/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message || "Error fetching equipment");
    }
  })
  


// Delete Equipment
export const deleteEquipment = createAsyncThunk(
  'equipment/deleteEquipment',
  async (id, thunkAPI) => {
    try {
      await axiosInstance.delete(`${apiUrl}/equipment/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message || "Error deleting equipment");
    }
  }
);

// Slice
const equipmentSlice = createSlice({
  name: 'equipments',
  initialState: {
    equipments: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addEquipment.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addEquipment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.equipments.push(action.payload);
      })
      .addCase(addEquipment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(fetchEquipment.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEquipment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.equipments = action.payload;
      })
      .addCase(fetchEquipment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(updateEquipment.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateEquipment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.equipments.findIndex(eq => eq._id === action.payload._id);
        if (index !== -1) {
          state.equipments[index] = action.payload;
        }
      })
      .addCase(updateEquipment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(deleteEquipment.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteEquipment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.equipments = state.equipments.filter(eq => eq._id !== action.payload);
      })
      .addCase(deleteEquipment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getequipmentById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getequipmentById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.equipments = action.payload;
      })
      .addCase(getequipmentById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export default equipmentSlice.reducer;


