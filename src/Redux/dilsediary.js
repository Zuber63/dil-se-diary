import { createSlice } from "@reduxjs/toolkit";

export const dilsediarySlice=createSlice({
    name:"dilsediary",
    initialState:{
        loading:false,
        session: localStorage.getItem("loginsession")?JSON.parse(localStorage.getItem("loginsession")):null

    },
    reducers:{
isloading:(state,action)=>{
state.loading=action.payload
},
islogin:(state,action)=>{
state.session=action.payload
},
logout:()=>{
   localStorage.removeItem("loginsession") 
}
    }

})
export const{isloading,islogin,logout}= dilsediarySlice.actions

export default  dilsediarySlice.reducer