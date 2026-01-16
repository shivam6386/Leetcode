import {createAsyncThunk ,createSlice, rejectWithValue} from '@reduxjs/toolkit'
 
 import axiosClient from './utlis/axiosClient';


export const registerUser =createAsyncThunk(
    'auth/register',
    async(userData,{rejectWithValue})=>{
        try{
            const response =await axiosClient.post('/user/register',userData);
            return response.data.user;

        }
        catch(error){
            return rejectWithValue(error);
        }
    }

);


 const authSlice=createSlice({
    name:'auth',
    
    initialState:{
        user:null,
        isAuthenticate:false,
        loading:false,
        error:null
    },
    reducers:{

    },
    extraReducers:(builder) =>{
        builder
        // Register User Cases
        .addCase(registerUser.pending,(state)=>{
            state.loading =true;
            state.error=null;
        })

        .addCase(registerUser.fulfilled,(state,action)=>{
            state.loading =false;
            state.isAuthenticate=!!action.payload;
            state.user=action.payload;
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.loading=false;
            state.error =action.payload?.message || 'Something went wrong';
            state.isAuthenticate=false;
            state.user=null;
        })


    }

 })

export default authSlice.reducer;
