import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addPastes, updateToPastes } from '../redux/pasteSlice';


export const ViewPaste = () => {

//now, at first we should have id of the particular paste that we want to view, to get this from localstorage, we can use useParams
const {id} = useParams()
//now we have to find this particular paste in localstorage, for that at first fetch all pastes(data) from local storage
const allPastes = useSelector((state) => state.paste.pastes); 
//now find out that particular paste, based on its id
const paste = allPastes.find((p) => p._id === id);

  return (
    <div className="bg-[#E7E3E3] h-[90vh] flex justify-center items-center px-4">
      <div className="bg-[#FFFFFF] p-6 rounded-sm shadow-lg w-full max-w-5xl">
         {/* Diary-style circles */}
      <div className="absolute top-[11.5rem] left-64 flex space-x-2">
        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
        <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
      </div>
         {/* create title input field */}
        <div className="flex items-center space-x-2 mb-4 mt-4">
          <input
            className="flex-1 p-3 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#634a9d] bg-[#FFFFFF]"
            type="text"
            placeholder="Enter your title here...."
            value={paste.title}
            disabled
            onChange={(e) => setTitle(e.target.value)}
          />

           {/* now a button.Work of button will depend upon whether we are in home page(creating paste) or editing paste 
       If we would have normal / means create button. But if there is a pasteId in url, means edit button need to have
       Now, which paste we are editing specifically? UI will be same but content while editing will be differ acoording to different pastes
       Means we should create pasteIds for all different pastes. TO create that we can use useSearchParams hook. */}
          {/* <button
            className="px-4 py-3 bg-[#3b3055] text-white rounded-sm shadow-md hover:bg-[#4c3c70] hover:text-gray-200 transition duration-200"
            onClick={() => {
              if (title.trim() && value.trim()) {
                createPaste();
              } else {
                alert("Please Write Something To Create");
              }
            }}
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button> */}
        </div>

       {/* now an text area to write content */}
        <div className="relative">
          <textarea
            className="w-full h-96 p-3 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#634a9d] bg-[#FFFFFF]"
            placeholder="Paste your content here...."
            value={paste.content}
            disabled
            onChange={(e) => setValue(e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  )
}
