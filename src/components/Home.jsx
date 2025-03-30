import React from 'react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addPasstes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {

const [title, setTitle] = useState(''); //for title
const [value, setValue] = useState(''); //for text area
const [searchParams, setSearchParams] = useSearchParams(); // searchParams to generate random ids. setSearchParams to fix a particular id from our side
const pasteId = searchParams.get("pasteId");  

const dispatch = useDispatch();   //dispatcher to dispatch reducer functions from slice

// logic of to what will happen if we clicks in "Create my Paste" vutton.Finally we want to create entire data of our paste and to send it to slice
//and then slice will verify the data and will save that in local storage
      function createPaste(){
        //create
        const paste = {
        titte: title,
        content: value,
         _id: pasteId || Date.now().toString(36), //if already we have then use that or create according to date 
         createdAt: new Date().toISOString(),
      }

      //sent data to slice
       if(pasteId){  //if pasteId is available means paste was already created, we are updating it. Means we need to dispath updateToPastes reducer function from slice. to dispatch, we need a dispatcher
         //update
         dispatch(updateToPastes(paste));  //paste as a payload
       }
       else{
           dispatch(addPasstes(paste));
       }

       //after creation or updation, move to blank home page again
       setTitle('');
       setValue('');
       setSearchParams({});
    }

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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

           {/* now a button.Work of button will depend upon whether we are in home page(creating paste) or editing paste 
       If we would have normal / means create button. But if there is a pasteId in url, means edit button need to have
       Now, which paste we are editing specifically? UI will be same but content while editing will be differ acoording to different pastes
       Means we should create pasteIds for all different pastes. TO create that we can use useSearchParams hook. */}
          <button
            onClick={createPaste}
            className="px-4 py-3 bg-[#3b3055] text-white rounded-sm shadow-md hover:bg-[#4c3c70] hover:text-gray-200 transition duration-200"
          >
            {pasteId ? "Update My Paste" : "Create My Paste"}
          </button>
        </div>

       {/* now an text area to write content */}
        <div className="relative">
          <textarea
            className="w-full h-96 p-3 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#634a9d] bg-[#FFFFFF]"
            placeholder="Paste your content here...."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Home