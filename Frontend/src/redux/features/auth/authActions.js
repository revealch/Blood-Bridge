import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "./../../../services/API";
import { toast } from "react-toastify";

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await API.post("/auth/login", { role, email, password });
      if (data.success) {
        localStorage.setItem("token", data.token);
        window.location.href = "/";
        toast.success(data.message);
        
      }
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//Register
export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      email,
      password,
      role,
      name,
      organizationName,
      hospitalName,
      address,
      phone,
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await API.post("/auth/register", {
        email,
        password,
        role,
        name,
        organizationName,
        hospitalName,
        address,
        phone,
      });
      if(data.success){
        toast.success(data.message);
        window.location.href = "/login";
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//get-current-user
export const getCurrentUser = createAsyncThunk(
  "/auth/getCurrentUser",
  async ({ rejectWithValue }) => {
    try {
      const res = await API.get("/auth/current-user");
      if (res?.data) {
        return res?.data;
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);