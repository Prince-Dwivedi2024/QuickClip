import { createSlice } from '@reduxjs/toolkit'
import toast, { Toaster } from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("my pastes") ? JSON.parse() : [], //if data found, convert back to JSON, else return an empty array
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addPasstes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast("Paste Created Successfully")
    },
    updateToPastes: (state, action) => {
      
    },
    resetAllPastes: (state, action) => {

    },
    removeFromPastes: (state, action) => {
        
    },
  },
})

// Action creators are generated for each case reducer function
export const { addPasstes, updateToPastes, esetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer