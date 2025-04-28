import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import { apiUrl } from '../../utils/config';

// 📌 GET all annotations
export const fetchAnnotations = createAsyncThunk(
  'annotation/fetchAnnotations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/annotation`);
      return response.data;
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
      return response.data;
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
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 📌 UPDATE an annotation
export const updateAnnotation = createAsyncThunk(
  'annotation/updateAnnotation',
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`${apiUrl}/annotation/${id}`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data; // return updated annotation
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const annotationSlice = createSlice({
  name: 'annotation',
  initialState: {
    annotations: [],
    status: 'idle',
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
        state.annotations.push(action.payload);
      })
      .addCase(createAnnotation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // 📌 Delete Annotation
      .addCase(deleteAnnotation.fulfilled, (state, action) => {
        state.annotations = state.annotations.filter(
          (annotation) => annotation.id !== action.payload
        );
      })
      .addCase(deleteAnnotation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // 📌 Update Annotation
      .addCase(updateAnnotation.fulfilled, (state, action) => {
        const index = state.annotations.findIndex(
          (annotation) => annotation.id === action.payload.id
        );
        if (index !== -1) {
          state.annotations[index] = action.payload; // Replace with updated one
        }
      })
      .addCase(updateAnnotation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default annotationSlice.reducer;
