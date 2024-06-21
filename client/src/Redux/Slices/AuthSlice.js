import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance"
import axios from "axios";
const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') || {}
};

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        const res = axiosInstance.post("user/register", data);
        toast.promise(res, {
            loading: "Wait! creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create account"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

export const Login = createAsyncThunk("/auth/login", async (data) => {
    try {
        const res = axiosInstance.post("user/login", data);
        toast.promise(res, {
            loading: "Wait! authentication in progress",
            success : (data) => {
                return data?.data?.message;
            },
            error: "Failed to Login"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})


export const Logout = createAsyncThunk("/auth/logout", async (req, res) => {
    try{
        const res = axiosInstance.post("user/logout");
        toast.promise(res, {
            loading : 'Wait! Logout in progress..',
            success : (data) => {
                return data?.data?.message;
            },
            error:'Failed to log out'
        })
        return (await res).data;
    }catch(err){
        toast.error(err?.response?.data?.message);
    }
})




const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers : (builder) => {
        builder.addCase(Login.fulfilled, (state, action) => {
            localStorage.setItem('data', JSON.stringify(action?.payload?.user));
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('role', action?.payload?.user?.role);
            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload.user?.role;
        })
        .addCase(Logout.fulfilled, (state) => {
            localStorage.clear();
            state.data = {};
            state.isLoggedIn = false;
            state.role = " ";
        })
    }
});

// export const {} = authSlice.actions;
export default authSlice.reducer;