import React, { useEffect, useState } from 'react'

import UserPanel from './UserPanel'
import DisplayPanel from './DisplayPanel'
import Settingpanels from './Settingpanels'

export default function Panel() {
  const [Chat, setChat] = useState([])

  useEffect(()=>{},[Chat])
  return (
  <>
    <div className='flex flex-row hero min-h-screen '>
      {/* <div className='flex flex-col w-1/4 lg:flex-row hero min-h-screen bg-black/60'></div> */}

    <div className='flex flex-col  lg:flex-row hero min-h-screen'>
        <UserPanel Chat={Chat} setChat={setChat}></UserPanel>
      
       
    </div>
    </div>

   

    
    </>
  )
}
