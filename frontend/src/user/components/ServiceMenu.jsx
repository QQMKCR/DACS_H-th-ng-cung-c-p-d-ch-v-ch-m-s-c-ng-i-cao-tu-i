import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const ServiceMenu = () => {
  return (
    <div>
      <div className='flex flex-col items-center gap-4 py-16 text-blue-950' id='service'>
        <h1 className='text-3xl font-medium'>Tìm kiếm theo dịch vụ</h1>
        <p className='sm:w-1/3 text-center text-xl'>Dễ dàng tìm kiếm sự chăm sóc chu đáo, tận tâm</p>
        <div className='flex sm:justify-center gap-10 pt-5 w-full overflow-scroll'>
          {specialityData.map((item,index)=>
            <Link onClick={()=>scrollTo} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' 
                  key={index} to={`/services/${item.speciality}`}>
              <img className='w-16 sm:w-32 mb-2' src={item.image} alt="Image" />
              <p className='text-xl'>{item.speciality}</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default ServiceMenu
