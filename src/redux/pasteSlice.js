import { createSlice } from '@reduxjs/toolkit'
import toast, { Toaster } from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes") ? JSON.parse(localStorage.getItem("pastes")) : [],  //if data found, convert back to JSON, else return an empty array
}
 
export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {

    addPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);  //add paste in the state
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Created Successfully")
    },

    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);  //get the index of paste need to updated
      if(index >= 0){
       state.pastes[index] = paste;                                    //update paste in the state
       localStorage.setItem("pastes", JSON.stringify(state.pastes)); 
      toast.success("Paste Updated Successfully")
      }
    },

    resetAllPastes: (state, action) => {
      state.pastes = [];   //make the paste empty
      localStorage.removeItem("pastes");
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload; //get the paste
      console.log(pasteId) ;
      const index = state.pastes.findIndex((item) => item._id === pasteId);  //get index of paste
      if (index >= 0) {
       state.pastes.splice(index, 1);  //using location of paste(index), delete it from localstorage
       localStorage.setItem("pastes", JSON.stringify(state.pastes)); 
      toast.success("Paste deleted"); 
    }
  },
},
})

// Action creators are generated for each case reducer function
export const { addPastes, updateToPastes, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer