import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance';
import { apiUrl } from '../../utils/config';



export const createsitereview = createAsyncThunk(
    'sitereview/createsitereview',
    async (sitereviewData, thunkAPI) => {
      try {
      
  
        const response = await axiosInstance.post(
          `https://hrb5wx2v-8000.inc1.devtunnels.ms/api/sitereview`,
          sitereviewData,
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

  export const fetchsitereview = createAsyncThunk(
    'sitereview/fetchsitereview',
    async (_, thunkAPI) => {
      try {
        const response = await axiosInstance.get(`https://hrb5wx2v-8000.inc1.devtunnels.ms/api/sitereview`);
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data || error.message || "error fetching sitereview"
        );
      }
    }
  );


  export const deletesitereview = createAsyncThunk(
    'sitereview/deletesitereview',
    async (id, thunkAPI) => {
      try {
        const response = await axiosInstance.delete(`https://hrb5wx2v-8000.inc1.devtunnels.ms/api/sitereview/${id}`);
        return response.data;
      } catch (error) {         
        return thunkAPI.rejectWithValue(
            
          error.response?.data || error.message || "error deleting sitereview"
      )
    }}
  )

  export const updatesitereview = createAsyncThunk('sitereview/updatesitereview',
    async({id,updatedEntry}, thunkAPI) => {
   try{
      const response = await axiosInstance.patch(
        `${apiUrl}/sitereview/${id}`,
        updatedEntry,
        {
          headers: { "Content-Type": "multipart/form-data" }
        }
      )
      return response.data;
    }
    catch(error){
      return thunkAPI.rejectWithValue(
        error.response?.data || error.message || "error updating sitereview"
      );
    }


    }
  )
  


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
      .addCase(fetchsitereview.pending, (state) => {
        state.loading = true;        
        state.error = null;
      }
      )
      .addCase(fetchsitereview.fulfilled, (state, action) => {
        state.loading = false;
        state.sitereview = action.payload;
      })
      .addCase(fetchsitereview.rejected, (state, action) => {
        state.loading = false;        
        state.error = action.payload;
      })
      .addCase(updatesitereview.pending, (state) => {
        state.loading = false;
        state.error = null;
      } )
      .addCase(updatesitereview.fulfilled , (state, action) => {
        state.loading = false;
        const updatedItem = action.payload;
        const index = state.sitereview.findIndex(item => item._id === updatedItem._id);
        if (index !== -1) {
          state.sitereview[index] = updatedItem;
        }
      })
      
      .addCase(updatesitereview.rejected , (state,action) => {
        state.loading = false;
        state.error =action.payload;
      })                   
                   

 }

})

export default sitereviewSlice.reducer;