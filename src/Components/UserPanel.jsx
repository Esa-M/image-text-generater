import React, { useRef, useState } from 'react'

import { RiSendPlaneLine, RiSendPlaneFill  } from "react-icons/ri";
import { IoMdArrowDropdown } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import {FileUploader} from "react-drag-drop-files"


import Replicate from 'replicate';


import axios from 'axios';



export default function UserPanel() {

    const replicate = new Replicate({auth: import.meta.env.VITE_AUTH})

    const [load, setLoad] =  useState(false)
    const fileTypes = ["JPG", "PNG"]
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null)
  
    const [Chat, setChat] = useState([])
  
    const [RequestKwargs, setRequestKwargs] = useState({file:null, query:"", tokens:512, temperature:0.7})

    const [AdditionalParameters, setAdditionalParameters] = useState(false)
    const [model, setModel] = useState({state:false, option:""})
    const models = ["llava-1.5-7b", "llava-1.5-13b", "vip-llava-7b", ]

    // Parameters
    const modelRef = useRef(null)
 
    const handleChange = (file) => {
      setFile(file);

      if(file){
        const reader = new FileReader()

        reader.onload =()=>{
            const imageUrl = reader.result
            setImage(imageUrl)

        }
        reader.readAsDataURL(file)
      }


     
    };

    
    const GenerateResponse = async() =>{

      

 

                const formData = new FormData()
                formData.append("file", file)
                formData.append("prompt_query",RequestKwargs.query)
                formData.append("tokens",parseInt(RequestKwargs.tokens))
                formData.append("temperature",parseFloat(RequestKwargs.temperature))
               
                const config = {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                    },
                  };
            

        const res = await axios.post(`http://localhost:8000/llava-1.5-7b`, formData, config)

        console.log(res.data.response)
        const chatResponse = {imageUrl: image, query:RequestKwargs.query, response: res.data.response}
        setChat([...Chat, chatResponse])
        setLoad(false)

    }

   
    
  return (

    <div className="hero min-h-screen bg-base-200 flex flex-row ">
    <div className='hero min-h-screen bg-base-200 w-2/5' data-theme="dark">
    <div className='hero min-h-screen bg-base-200 w-full h-40rem overflow-y-auto p-10 flex flex-col justify-center align-middle'>
     
      {/* drag & drop here */}

      {image != null ? (<div className='w-96 h-72 bg-cover bg-center rounded-lg relative' style={{backgroundImage:`url(${image})`}}>  <RxCross2 onClick={()=>{setImage(null)}} className='absolute top-2 right-2  cursor-pointer z-40 text-white bg-black/50 rounded-full p-1 h-25px w-25px '></RxCross2> </div>) : 
      
      (<FileUploader type={fileTypes} handleChange={handleChange} name='file' className>
      <div className='w-96 h-72 rounded-lg transition duration-150 ease-in-out  outline outline-offset-2  outline-white/40 hover:outline-dashed hover:outline-white/60  bg-gray-600/40 flex justify-center align-middle flex-col' data-theme="" >
        <div className='self-center font-semibold '>Drag & Drop  here </div>
        <div className='w-3/5 mt-3 flex flex-row justify-center gap-2 align-middle self-center'>
          <div className='h-2px p-1px rounded-full bg-slate-500 w-1/2 self-center'></div>
          <div className='self-center '>or</div>
          <div className='h-2px p-1px rounded-full bg-slate-500 w-1/2 self-center'></div>
        </div>
        <div className='mt-3 self-center font-semibold'>Click to upload </div>
      </div>
      </FileUploader>)}
      

      <div className='w-96 p-3 self-center rounded-sm text-white/80 cursor-pointer text-center mt-16   bg-gray-800 relative flex flex-row justify-between align-middle ' >Additional Parameters <IoMdArrowDropdown className={`absolute right-3 transition ease-in-out duration-150 self-center`}></IoMdArrowDropdown> </div>
       
      
       <div className='w-96 p-4 self-center flex flex-col gap-2 justify-center align-middle  bg-gray-600/40 mt-3 rounded-sm   overflex-y-sroll'>
          <div className='w-full flex flex-col'>
          <span className='font-semibold p-2 pl-1 flex flex-row relative'>Max tokens  <div className='absolute right-1'>{RequestKwargs.tokens}</div> </span>
          <input value={RequestKwargs.tokens} onChange={(e)=>{setRequestKwargs({...RequestKwargs, tokens: parseInt(e.target.value)})}} className='outline-none border-none focus:outline-none' type='range' min={128} max={2048}/>
          </div>
             </div>
      
      <div  className={`${load ? "skeleton" : ''} w-96 h-16 mt-3 bg-gray-600/40 rounded-md border border-white/30 hover:border-white/50 focus:border-white/50 flex flex-row`}>
        <textarea value={RequestKwargs.query} onChange={(e)=>{setRequestKwargs({...RequestKwargs, query: e.target.value})}} className='w-full h-full p-1 bg-transparent focus:outline-none'></textarea>
        <button onClick={()=> {GenerateResponse();setLoad(true)}} className='bg-transparent w-24 text-sm font-semibold'> Generate </button>
        
      
      </div>
      <div role="alert" className="alert self-center">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <span>Try to use image types like PNG and JPG, and also make sure the file size less than 3MB </span>
      </div>
    </div>
    
    </div>
    <div className='hero min-h-screen bg-base-200 w-3/5' data-theme="dim">
    <div className={`h-40rem p-16 w-4/5 flex flex-col overflow-y-auto gap-3 ${ load ? 'skeleton' : ''} `}>
    {Chat.map((context,id)=>{
      return (<div className='flex flex-col text-left justify-center align-middle  mt-3 ' key={id}>
        <div className='flex flex-col w-full p-2 rounded-br-3xl rounded-sm relative' data-theme="sunset">
            <div className='p-3 pt-1 pb-1'>{context.model}</div>
        <MdDelete onClick={()=>{const updateChat = Chat.filter((c,idx)=> id != idx); setChat(updateChat)}} className='absolute top-3 right-3 opacity-70 hover:opacity-100 cursor-pointer'></MdDelete>
        <div className='w-40 h-24 mt-3 bg-cover bg-center rounded-sm ml-3 mb-3  '  style={{ backgroundImage: `url(${context.imageUrl})`}}></div>
        <div className='w-full pt-1 p-3 font-semibold' >{context.query}</div>
        </div>
        <pre className='w-full p-3 whitespace-pre-wrap text-justify'>{context.response}</pre>

      </div>)
    })}

    </div>
    </div>
   
    
  </div>

  )
}
