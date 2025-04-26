import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import { apiUrl } from '../../utils/config';

// 📌 GET all annotations
export const fetchAnnotations = createAsyncThunk(
  'annotation/fetchAnnotations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/annotation`);
      return response.data;  // Ensure that this returns the correct structure
      
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 📌 POST new annotation
export const createAnnotation = createAsyncThunk(
  'annotation/createAnnotation',
  async (submissionData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`${apiUrl}/annotation`, submissionData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;  // Ensure response contains the created annotation
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 📌 DELETE an annotation
export const deleteAnnotation = createAsyncThunk(
  'annotation/deleteAnnotation',
  async (id, { rejectWithValue }) => {
    try {
       await axiosInstance.delete(`${apiUrl}/annotation/${id}`);
      return id; // Returning the id to delete it from the state
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const annotationSlice = createSlice({
  name: 'annotation',
  initialState: {
    annotations: [],
    status: 'idle', // Default status
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 📌 Fetch Annotations
      .addCase(fetchAnnotations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAnnotations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.annotations = action.payload;
      })
      .addCase(fetchAnnotations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      
      // 📌 Create Annotation
      .addCase(createAnnotation.fulfilled, (state, action) => {
        // If not already present, add the new annotation
        state.annotations.push(action.payload);
      })
      .addCase(createAnnotation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // 📌 Delete Annotation
      .addCase(deleteAnnotation.fulfilled, (state, action) => {
        state.annotations = state.annotations.filter(
          (annotation) => annotation.id !== action.payload  // Ensure using the correct field
        );
      })
      .addCase(deleteAnnotation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default annotationSlice.reducer;
