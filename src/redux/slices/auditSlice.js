import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUrl } from "../../utils/config";
import axiosInstance from "../../utils/axiosInstance";

 export const fetchAudit = createAsyncThunk(
    "audit/fetchAudit",
    async (_, thunkAPI) => {
        try{
      const response = await axiosInstance.get(`${apiUrl}/audit`);
      console.log(response)
      console.log(response.data)
      return response.data;
        }catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    }
  );



  export const addAudit = createAsyncThunk(
    "audit/addAudit",
    async (auditData, thunkAPI) => {
      try {
        const response = await axiosInstance.post(`${apiUrl}/audit`, auditData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );


  export const deleteAudit = createAsyncThunk(
    "audit/deleteAudit",
    async (id, thunkAPI) => {
      try {
        const response = await axiosInstance.delete(`${apiUrl}/audit/${id}`);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const updateAudit = createAsyncThunk(
    "audit/updateAudit",
    async ({ id, updatedForm }, thunkAPI) => {
      try {
        const response = await axiosInstance.patch(
          `${apiUrl}/audit/${id}`,
          updatedForm,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const fetchAuditById = createAsyncThunk(
    "audit/fetchAuditById",
    async (id, thunkAPI) => {
      try {
        const response = await axiosInstance.get(`${apiUrl}/audit/${id}`);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  )

  



  const auditSlice = createSlice({
    name: "audit",
    initialState: {
      audit: [],
      selectedAudit: null,
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(fetchAudit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
        .addCase(fetchAudit.fulfilled, (state, action) => {
          state.loading = false;
          state.audit = action.payload;
        })
        .addCase(fetchAudit.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(addAudit.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addAudit.fulfilled, (state, action) => {
          state.loading = false;
          state.audit.push(action.payload);
        })
        .addCase(addAudit.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(deleteAudit.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteAudit.fulfilled, (state, action) => {
          state.loading = false;
          state.audit = state.audit.filter((audit) => audit._id !== action.payload);
        })
        .addCase(deleteAudit.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(updateAudit.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateAudit.fulfilled, (state, action) => {
          state.loading = false;
          state.audit = state.audit.map((audit) =>
            audit._id === action.payload._id ? action.payload : audit
          );
        })
        .addCase(updateAudit.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
        .addCase(fetchAuditById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchAuditById.fulfilled, (state, action) => {
          state.loading = false;
          state.selectedAudit = action.payload;
        })
        .addCase(fetchAuditById.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });


  export default auditSlice.reducer;