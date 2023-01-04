import { createAsyncThunk } from '@reduxjs/toolkit';
import {httpHelper} from "../../helpers/httpHelper";

const url = "http://localhost:5000/users";
const CompanyUrl = "http://localhost:5000/companies"
const api = httpHelper();


export const getAllCompanies = createAsyncThunk('get/companies', async (thunkAPI) => {
    try {
        const data = await  api.get(`${CompanyUrl}`)
            .then(res => {
                return res;
            })
            .catch(err => console.log(err));
        return  [{ id: 0, name: "Select Company" },...data];
    } catch (err) {
        return thunkAPI.rejectWithValue({ error: err.message });
    }
});


export const getAllUsers = createAsyncThunk('get/getUser', async (thunkAPI) => {
    try {
        const data = await  api.get(`${url}?_expand=companies`)
            .then(res => {
               return res;
            })
            .catch(err => console.log(err));
            return  data;
    } catch (err) {
        return thunkAPI.rejectWithValue({ error: err.message });
    }
});


// Handle POST request to create a new post
export const addUser = createAsyncThunk(
    'post/adduser',
    async (postData, thunkAPI) => {
        try {
          const ResData =  await api.post(`${url}`, { body: postData }).then(res =>{
              return res
           }).catch(err => console.log(err));
          console.log("ResData",ResData)
          return  ResData
        } catch (err) {
            return thunkAPI.rejectWithValue({ error: err.message });
        }
    }
);

export const updateUser = createAsyncThunk(
    'post/UpdateUser',
    async (updateData, thunkAPI) => {
        try {
            const ResData =  await api.put(`${url}/${updateData?.id}`, { body: updateData?.data}).then(res =>{
                return res
            }).catch(err => console.log(err));

            return  ResData
        } catch (err) {
            return thunkAPI.rejectWithValue({ error: err.message })
        }
    }
)