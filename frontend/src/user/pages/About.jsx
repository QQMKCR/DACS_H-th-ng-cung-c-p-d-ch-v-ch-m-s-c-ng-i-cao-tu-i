import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>VỀ <span className='text-blue-950 font-medium'>CHÚNG TÔI</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[450px]' src={assets.about_image} alt="About" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-base text-gray-700'>
          <p>Chào mừng bạn đến với PeaceCare - đối tác đáng tin cậy trong việc đáp ứng nhu cầu chăm sóc sức khỏe người cao tuổi một cách thuận tiện và hiệu quả. 
             Tại PeaceCare, chúng tôi hiểu rõ những thách thức mà người cao tuổi và gia đình phải đối mặt khi tìm kiếm dịch vụ chăm sóc tại nhà chất lượng và quản lý sức khỏe cho người thân yêu.</p>
          <p>PeaceCare cam kết mang đến sự xuất sắc trong lĩnh vực chăm sóc người cao tuổi. Chúng tôi không ngừng cải tiến dịch vụ, áp dụng những phương pháp tiên tiến nhất để nâng cao trải nghiệm khách hàng và cung cấp dịch vụ vượt trội.
            Dù bạn cần chăm sóc thường xuyên hay hỗ trợ tạm thời, PeaceCare luôn sẵn sàng đồng hành cùng bạn trên mọi chặng đường.</p>
          <b className='text-blue-950'>Tầm nhìn của chúng tôi</b>
          <p>Tầm nhìn của PeaceCare là tạo ra trải nghiệm chăm sóc liền mạch cho mọi khách hàng.
            Chúng tôi mong muốn thu hẹp khoảng cách giữa người cao tuổi và dịch vụ chăm sóc sức khỏe chất lượng, giúp bạn dễ dàng tiếp cận những dịch vụ cần thiết, bất cứ khi nào bạn cần.</p>
        </div>
      </div>

      <div className='text-lg text-gray-600 my-4'>
        <p>LÝ DO <span className='text-blue-950 font-semibold'>NÊN LỰA CHỌN CHÚNG TÔI</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='flex-1 border px-6 md:px-8 py-8 flex flex-col gap-3 text-[15px] hover:bg-blue-950 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-t-lg md:rounded-tr-none md:rounded-l-lg'>
          <b>HIỆU QUẢ</b>
          <p>Hệ thống đặt lịch tối ưu, phù hợp với lịch trình của bạn</p>
        </div>

        <div className='flex-1 border px-6 md:px-8 py-8 flex flex-col gap-3 text-[15px] hover:bg-blue-950 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-t-lg md:rounded-tr-none md:rounded-l-lg'>
          <b>TIẾT KIỆM</b>
          <p>Đặt dịch vụ nhanh chóng, dễ dàng</p>
        </div>

        <div className='flex-1 border px-6 md:px-8 py-8 flex flex-col gap-3 text-[15px] hover:bg-blue-950 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer rounded-t-lg md:rounded-tr-none md:rounded-l-lg'>
          <b>CHẤT LƯỢNG</b>
          <p>Đội ngũ chuyên nghiệp được chứng nhận, chăm sóc với sự tận tâm</p>
        </div>

      </div>
        
    </div>
  )
}

export default About
