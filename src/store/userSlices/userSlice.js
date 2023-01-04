import { createSlice } from '@reduxjs/toolkit';
import {getAllUsers, addUser, updateUser, getAllCompanies} from '../userApi';
export const userSlice = createSlice({

    name: 'users',
    initialState: {
        value: 0,
        usersList: [],
        companyList: [],
        status: 'idle',
        error: null
    },
    extraReducers: {
        [getAllUsers.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getAllUsers.fulfilled]: (state, action) => {
            state.status = 'successful'
            state.usersList = action.payload
        },
        [getAllUsers.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [getAllCompanies.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getAllCompanies.fulfilled]: (state, action) => {
            state.status = 'successful'
            state.companyList = action.payload
        },
        [getAllCompanies.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [addUser.fulfilled]: (state, action) => {
            state.usersList.push(action.payload);
        },
        [updateUser.fulfilled]: (state, action) => {
            const payload = action.payload;
            const userList = state.usersList;
            const updatedList = userList.map((item)=>item?.id === payload?.id ? {...payload}: {...item});
            state.usersList = updatedList
        },
    }
});

export const {} = userSlice.actions;
export const selectCount = (state) => state.users.value

export default userSlice.reducer