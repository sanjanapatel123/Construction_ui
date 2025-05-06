// // src/slices/authSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { apiUrl } from '../../utils/config';
// import axios from 'axios';

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../utils/config";

// const initialState = {
//   user: JSON.parse(localStorage.getItem('user')) || null,
//   token: localStorage.getItem('token') || null,
//   loading: false,
//   error: null,
// };

// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${apiUrl}/users/login`, credentials, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       // console.log("login response ", response)
//       if (response.status !== 200) {
//         // If the response status is not OK (200), reject with a custom message
//         return rejectWithValue(response.data.message || 'Login failed');
//       }
//    // Store the user data and token in localStorage
//    localStorage.setItem('user', JSON.stringify(response.data.user));  // Store user data
//    localStorage.setItem('token', response.data.token);  // Store token
//       return response.data;  // Return the user data and token
//     } catch (err) {
//       console.error(err)
//       return rejectWithValue(err.response?.data?.message || 'Login failed');
//     }
//   }
// );

// // Async thunk for registration using axios
// export const registerUser = createAsyncThunk(
//   'auth/registerUser',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${apiUrl}/register`, userData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.status !== 200) {
//         // If the response status is not OK (200), reject with a custom message
//         return rejectWithValue(response.data.message || 'Registration failed');
//       }

//       return response.data;  // Return the registered user data and token
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || 'Registration failed');
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       localStorage.removeItem('user');
//       localStorage.removeItem('token');
//       state.user = null;
//       state.token = null;
//     },
//     clearMessages: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         state.error = null;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer; // Default export


export const  loginUser = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiUrl}/login`, credentials, {
            headers: {
                'Content-Type': 'application/json',
            },
            });
            if (response.status !== 200) {
            return rejectWithValue(response.data.message || 'Login failed');
            }
            console.log("login response ", response)

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));
            // localStorage.setItem('user', JSON.stringify(response.data.data.user?.id));
            localStorage.setItem('role', JSON.stringify(response.data.data.user?.role));
            localStorage.setItem('permissions', JSON.stringify(response.data.data.user?.permissions));
            
           
           
            return response.data;  // Return the user data and token
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    })



    const initialState= {
        user: JSON.parse(localStorage.getItem('user')) || null,
        token: localStorage.getItem('token') || null,
        role: localStorage.getItem('role') || null,
        permissions: JSON.parse(localStorage.getItem('permissions')) || null,
        loading: false,
        error: null,
    }


    const authSlice = createSlice({
        name: 'auth',
        initialState,
        reducers: {
            logout: (state) => {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                localStorage.removeItem('permissions');
                state.user = null;
                state.token = null;
                state.role = null;
                state.permissions = null;
            },
            clearMessages: (state) => {
                state.error = null;
            },
        },
        extraReducers: (builder) => {
            builder
                .addCase(loginUser.pending, (state) => {
                    state.loading = true;
                })
                .addCase(loginUser.fulfilled, (state, action) => {
                    state.loading = false;
                    state.user = action.payload.user;
                    state.token = action.payload.token;
                    state.role = action.payload.role; // Assuming role is part of the response
                    state.permissions = action.payload.permissions; // Assuming permissions is part of the response
                    state.error = null;
                })
                .addCase(loginUser.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                });
        },



    })


    export const { logout, clearMessages } = authSlice.actions;
    export default authSlice.reducer; // Default export

