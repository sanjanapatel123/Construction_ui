import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { apiUrl } from "../../utils/config";

// ADD
export const addsafetyEquipment = createAsyncThunk(
  "safety/addSafetyEquipment",
  async (formData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`${apiUrl}/safety`, formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message || "error creating safetyEquipment");
    }
  }
);

// FETCH
export const fetchsafetyEquipment = createAsyncThunk(
  "safety/fetchSafetyEquipment",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/safety`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message || "error fetching safetyEquipment");
    }
  }
);

// UPDATE
export const updatesafetyEquipment = createAsyncThunk(
  'safety/updateSafetyEquipment',
  async ({ id, updatedForm }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`${apiUrl}/safety/${id}`, updatedForm, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message || "error updating safetyEquipment");
    }
  }
);

// DELETE
export const deletesafetyEquipment = createAsyncThunk(
  "safety/deleteSafetyEquipment",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`${apiUrl}/safety/${id}`);
      return { id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message || "error deleting safetyEquipment");
    }
  }
);


// ✅ FETCH SINGLE
export const fetchSingleSafetyEquipment = createAsyncThunk(
  "safety/fetchSingleSafetyEquipment",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/safety/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message || "error fetching single safetyEquipment");
    }
  }
);

// SLICE
const safetyEquipmentSlice = createSlice({
  name: "safetyEquipment",
  initialState: {
    safetyequipments: [],
     singleSafetyEquipment: null, 
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ADD
      .addCase(addsafetyEquipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addsafetyEquipment.fulfilled, (state, action) => {
        state.loading = false;
        state.safetyequipments.push(action.payload);
      })
      .addCase(addsafetyEquipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

        // ✅ FETCH SINGLE
      .addCase(fetchSingleSafetyEquipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleSafetyEquipment.fulfilled, (state, action) => {
        state.loading = false;
        state.singleSafetyEquipment = action.payload;
      })
      .addCase(fetchSingleSafetyEquipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // FETCH
      .addCase(fetchsafetyEquipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchsafetyEquipment.fulfilled, (state, action) => {
        state.loading = false;
        state.safetyequipments = action.payload;
      })
      .addCase(fetchsafetyEquipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updatesafetyEquipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatesafetyEquipment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.safetyequipments.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.safetyequipments[index] = action.payload;
        }
      })
      .addCase(updatesafetyEquipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE
      .addCase(deletesafetyEquipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletesafetyEquipment.fulfilled, (state, action) => {
        state.loading = false;
        state.safetyequipments = state.safetyequipments.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(deletesafetyEquipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default safetyEquipmentSlice.reducer;
