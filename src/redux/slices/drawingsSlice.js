import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { apiUrl } from "../../utils/config";

// Fetch all drawingss
export const fetchDrawings = createAsyncThunk(
  "drawings_arr/fetchDrawings",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/drawings`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Error fetching drawingss"
      );
    }
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


// Fetch Single drawingss
export const fetchSingleDrawings = createAsyncThunk(
  "drawings_arr/fetchSingleDrawings",
  async (_id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/drawings/${_id}`);
      return response.data;
    } catch (error) {
      console.log("getDrawingsbyId Error", error.response)
      return thunkAPI.rejectWithValue(error.response?.data || "No Drawings found for given id")
    }
  }
);

export const updatedrawings = createAsyncThunk(
  'drawings/updateDrawings',
  async ({ id, updatedForm }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`${apiUrl}/drawings/${id}`, updatedForm, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message || "Error updating drawing");
    }
  }
);
// Delete a drawings
export const deleteDrawings = createAsyncThunk(
  "drawingss/deleteDrawings",
  async (id, thunkAPI) => {
    try {
      await axiosInstance.delete(`${apiUrl}/drawings/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Error deleting drawings"
      );
    }
  }
);

// Load initial state from localStorage
const initialState = {
  drawings_arr: JSON.parse(localStorage.getItem("drawings_arr")) || [],
  drawings_Single:JSON.parse(localStorage.getItem("drawings_arr")) || [],
  loading: false,
  error: null,
};


// Slice
const drawingsSlice = createSlice({
  name: "drawings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    // Fetch all
    .addCase(fetchDrawings.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchDrawings.fulfilled, (state, action) => {
      state.loading = false;
      state.drawings_arr = action.payload;
      localStorage.setItem("drawings_arr", JSON.stringify(action.payload));
    })
    .addCase(fetchDrawings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Add
    .addCase(addDrawings.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(addDrawings.fulfilled, (state, action) => {
      state.loading = false;
      state.drawings_arr=action.payload;
      localStorage.setItem("drawings_arr", JSON.stringify(state.drawings_arr));
    })
    .addCase(addDrawings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Fetch Single
    .addCase(fetchSingleDrawings.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchSingleDrawings.fulfilled, (state, action) => {
      state.loading = false;
      state.drawings_Single = action.payload;
      localStorage.setItem("drawings_Single", JSON.stringify(action.payload));
    })
    .addCase(fetchSingleDrawings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
  
    // .addCase(updatedrawings.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(updatedrawings.fulfilled, (state, action) => {
    //   state.loading = false;
    //   const index = state.drawings_arr.findIndex(d => d._id === action.payload._id);
    //   if (index !== -1) {
    //     state.drawings_arr[index] = action.payload;
    //     localStorage.setItem("drawings_arr", JSON.stringify(state.drawings_arr));
    //   }
    // })
    // .addCase(updatedrawings.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // })

    // Delete
    // .addCase(deleteDrawings.pending, (state) => {
    //   state.loading = true;
    //   state.error = null;
    // })
    // .addCase(deleteDrawings.fulfilled, (state, action) => {
    //   state.loading = false;
    //   state.drawings_arr = state.drawings_arr.filter(d => d._id !== action.payload);
    //   localStorage.setItem("drawings_arr", JSON.stringify(state.drawings_arr));
    // })
    // .addCase(deleteDrawings.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload;
    // });
  },
});

export default drawingsSlice.reducer;