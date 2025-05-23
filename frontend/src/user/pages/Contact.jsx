import React from 'react'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>LIÊN HỆ <span className='text-blue-950 font-semibold'>CHÚNG TÔI</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row justify-center items-center gap-8 mb-28 text-lg px-4'>

        <div className='w-full md:w-auto'>
          <img className='w-full md:max-w-[360px] rounded-lg' src="/image/contact.jpg" alt="Caregivers with elder" />
        </div>

        <div className='flex flex-col justify-center items-start gap-4 max-w-[600px]'>
          <p className='font-semibold text-lg text-blue-950'>VĂN PHÒNG CHÍNH</p>
          <p className='text-gray-600'>123 Đường Lê Duẩn, Phường Cầu Kho, Quận 1, Thành phố Hồ Chí Minh</p>
          <p className='text-gray-600'>Hotline: 0909-567-777 <br /> Email: peacecare@gmail.com</p>
          <p className='font-semibold text-lg text-blue-950'>Việc làm ở PeaceCare</p>
          <p className='text-gray-600'>Tìm hiểu thêm về đội ngũ của chúng tôi và công việc đang mở</p>
          <button className= 'border border-black px-8 py-4 text-sm rounded-md hover:bg-black hover:text-white transition-all duration-500'>
            Khám phá công việc
          </button>
        </div>
      </div>
    </div>
  )
}

export default Contact