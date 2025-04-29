import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { apiUrl } from "../../utils/config";

// Fetch all documents
export const fetchDocuments = createAsyncThunk(
  "documents/fetchDocuments",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`${apiUrl}/documents`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Error fetching documents"
      );
    }
  }
);

// Add a new document
export const addDocument = createAsyncThunk(
  "documents/addDocument",
  async (documentData, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`${apiUrl}/documents`, documentData, 
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Error adding document"
      );
    }
  }
);

// Update an existing document
export const updateDocument = createAsyncThunk(
  "documents/updateDocument",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axiosInstance.patch(`${apiUrl}/documents/${id}`, updatedData, 
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Error updating document"
      );
    }
  }
);

// Delete a document
export const deleteDocument = createAsyncThunk(
  "documents/deleteDocument",
  async (id, thunkAPI) => {
    try {
      await axiosInstance.delete(`${apiUrl}/documents/${id}`);
      return id; // We return id so we can remove it from the state
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "Error deleting document"
      );
    }
  }
);

// Initial State
const initialState = {
  documents: [],
  loading: false,
  error: null,
};

// Slice
const documentSlice = createSlice({
  name: "document",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Fetch
      .addCase(fetchDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = action.payload;
      })
      .addCase(fetchDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.documents.push(action.payload);
      })
      .addCase(addDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDocument.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.documents.findIndex(doc => doc.id === action.payload.id);
        if (index !== -1) {
          state.documents[index] = action.payload;
        }
      })
      .addCase(updateDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.documents = state.documents.filter(doc => doc.id !== action.payload);
      })
      .addCase(deleteDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default documentSlice.reducer;
