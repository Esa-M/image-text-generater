import React, { useEffect, useState } from 'react'

export default function DisplayPanel({Chat, setChat}) {
  

  useEffect(()=>{},[Chat])
  return (
    <div className='h-full lg:w-4/6 p-1 w-full   hero lg:min-h-screen relative  '>
      <div className='h-40rem p-16 w-full flex flex-col overflow-y-scroll gap-3'>
          {Chat.map((context,id)=>{
            return (<div className='flex flex-col text-left ' key={id}>
              <div className='w-40 h-24 mt-3' style={{backgroundImage:`url(${context.image})`}}></div>
              <div className='w-full mt-1' data-theme="dark">{context.query}</div>
              <div className='w-full p-3'>{context.response}</div>

            </div>)
          })}
      </div>
    </div>
  )
}
