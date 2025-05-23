import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-16 min-h-[450px] md:min-h-[500px] relative'>

        {/* bên trái */}
        <div className='mid:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
            <p className='text-5xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
                PeaceCare <br /> Dịch vụ chăm sóc tại nhà 
            </p>
            <div className='flex flex-col md:flex-row items-center gap-3 text-white text-base font-light'>
                <img className='w-28' src={assets.group_profiles} alt="Group" />
                <p>
                    Dễ dàng tìm kiếm sự chăm sóc chu đáo, tận tâm <br className='hidden sm:block' />
                    Đặt lịch dịch vụ tại nhà nhanh chóng, tiện lợi và tiết kiệm thời gian
                </p>
            </div>
            <a href="#speciality" className='flex items-center gap-2 bg-white px-7 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
                Đặt dịch vụ ngay <img className='w-3' src={assets.arrow_icon} alt="Arrow" />
            </a>
        </div>

        {/* bên phải */}
        <div className='md:w-1/2 relative'>
            <img className='w-full md:absolute bottom-0 h-auto rounded-lg sm:block' src={assets.header_img} alt="Header" />
        </div>
    </div>
  )
}

export default Header
