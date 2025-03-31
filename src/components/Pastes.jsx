import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { CiCalendarDate } from "react-icons/ci";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoCopy } from "react-icons/io5";
import { FaShareAlt } from "react-icons/fa";

const Pastes = () => {

  //At first we need to have search bar, and searching means we have to do filtering on entire data. Means I have to fetch entire data stored in localStorage
    //and then we need to filter data based on our search bar parameters
    //to fetch data from state (local storage), we use useSelector

  const pastes = useSelector((state) => state.paste.pastes);  //state.sliceName.sliceValue
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  //filter the data based on searchTerm
  const filteredData = pastes.filter((paste) => 
                       paste.title?.toLowerCase().includes(searchTerm.toLowerCase()));
  const navigate = useNavigate();

  function handleDelete(pasteId) {
     dispatch(removeFromPastes(pasteId))
  }

  return (
  
    <div className="max-w-3xl mx-auto p-4">
  {/* Search Bar */}
  <input 
    type="search"
    className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    placeholder="Search Your Pastes..."
    value={searchTerm} 
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  {/* All Pastes Header */}
  <h2 className="mt-6 text-2xl font-bold">All Pastes</h2>

  {/* Pastes Container */}
  <div className="mt-4 max-h-[70vh] overflow-y-auto space-y-4">
    {filteredData.length > 0 ? (
      filteredData.map((paste) => (
        <div 
          key={paste?._id}
          className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
        >
          {/* Title & Content */}
          <h3 className="text-lg font-semibold">{paste.title}</h3>
          <p className="text-gray-600 mt-1">{paste.content}</p>

          {/* Buttons */}
          <div className="mt-4 flex flex-wrap gap-3">
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              onClick={() => navigate(`/?pasteId=${paste?._id}`)}
            >
              <FaEdit />
            </button>

            <button 
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
              onClick={() => navigate(`/pastes/${paste?._id}`)}
            >
              <FaEye />
            </button>

            <button 
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              onClick={() => handleDelete(paste?._id)}
            >
              <MdDelete />
            </button>

            <button 
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
              onClick={() => {
                navigator.clipboard.writeText(paste?.content);
                toast.success("Text Copied To Clipboard");
              }}
            >
              <IoCopy />
            </button>

            <button className="px-4 py-2 bg-[#42566b] text-white rounded-md hover:bg-[#374a5c] transition"
             onClick={() => {
    navigator.share({
        title: paste.title,
        text: paste.content,
        url: `${window.location.origin}/pastes/${paste?._id}`
    }).catch((error) => console.log('Sharing failed:', error));
}}>
  <FaShareAlt />
</button>


            
          </div>

          {/* Date */}
          <div className="mt-3 flex items-center gap-2 text-gray-500 text-sm">
            <CiCalendarDate className="text-lg" />
            {new Date(paste.createdAt).toLocaleDateString("en-GB", { 
              month: "long", day: "numeric", year: "numeric" 
            })}
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-500 text-center">No pastes found</p>
    )}
  </div>
</div>

  )
}

export default Pastes