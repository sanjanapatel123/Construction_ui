import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance';
import { apiUrl } from '../../utils/config';



export const createsitereview = createAsyncThunk(
    'sitereview/createsitereview',
    async (sitereviewData, thunkAPI) => {
      try {
        const formData = new FormData();
        
        Object.keys(sitereviewData).forEach((key) => {
          if (key === "attachments") {
            sitereviewData.attachments.forEach((file) => {
              formData.append('attachments', file);
            });
          } else {
            formData.append(key, sitereviewData[key]);
          }
        });
  
        const response = await axiosInstance.post(
          `${apiUrl}/sitereview`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" }
          }
        );
  
        console.log("Response from API:", response);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data || error.message || "error creating sitereview"
        );
      }
    }
  );
  


const initialState = {
    sitereview: [],
    loading: false,
    error: null
}

const sitereviewSlice = createSlice ({
    name: 'sitereview',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
     builder
      .addCase(createsitereview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createsitereview.fulfilled, (state, action) => {
        state.loading = false;
        state.sitereview.push(action.payload);
      })
      .addCase(createsitereview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

 }

})

export default sitereviewSlice.reducer;