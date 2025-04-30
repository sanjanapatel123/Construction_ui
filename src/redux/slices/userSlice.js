// redux/slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { apiUrl } from "../../utils/config";
import { toast } from "react-toastify";

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get(`${apiUrl}/users`);
    console.log("Users response:", response.data.data); // Log the response data
    return response.data.data.users;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch users");
  }
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (projectId, { dispatch, rejectWithValue }) => {
  try {
    const response = await axiosInstance.delete(`${apiUrl}/users/${projectId}`);
    toast.success("Itps deleted successfully!");
    dispatch(fetchUsers()); // re-fetch list
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to delete Itps!");
    return rejectWithValue(error?.response?.data?.message || "Delete failed");
  }
});


const userSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) .addCase(deleteUser.pending, (state) => {
              state.loading = true;
              state.error = null;
              state.deleteSuccessMsg = '';
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
              state.loading = false;
              state.data = state.data.filter((itp) => itp._id !== action.payload.id);
              state.deleteSuccessMsg = action.payload.message;
            })
            .addCase(deleteUser.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            })
  },
});

export default userSlice.reducer;
