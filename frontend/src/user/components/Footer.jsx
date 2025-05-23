import React from 'react';
import { assets } from '../assets/assets';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="md:mx-10 font-light">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

        {/* Đoạn trái */}
        <div className='flex flex-row items-start gap-4'>
          <img className="items-start flex flex-col mb-5 w-32" src={assets.logo} alt="Logo" />
          <p className="text-blue-950 leading-7 text-lg max-w-md space-y-2 flex flex-col items-start gap-4">
            123 Đường Lê Duẩn, Phường Cầu Kho, Quận 1, TP.HCM <br />

            {/* Bản đồ */}
          <iframe className="w-full h-60 rounded-md border border-blue-950"
                  src="https://byvn.net/krfn"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bản đồ địa chỉ"></iframe>
          </p>
        </div>

        {/* Đoạn giữa */}
        <div>
          <p className="text-xl font-medium mb-5 text-blue-950 gap-2">LIÊN HỆ</p>
          <ul className="flex flex-col gap-2 text-xl text-blue-950 items-start">
            <li>0909-567-777</li>
            <li>peacecare@gmail.com</li>
            <li className="flex gap-4 justify-center sm:justify-start mt-3">
              <FaFacebookF className="hover:text-black cursor-pointer" />
              <FaInstagram className="hover:text-black cursor-pointer" />
              <FaTwitter className="hover:text-black cursor-pointer" />
              <FaYoutube className="hover:text-black cursor-pointer" />
              <FaLinkedinIn className="hover:text-black cursor-pointer" />
            </li>
          </ul>
        </div>

        {/* Đoạn phải */}
        <div>
          <p className="text-xl font-medium mb-5 text-blue-950 gap-2">CHÍNH SÁCH</p>
          <ul className="flex flex-col gap-2 text-blue-950 items-start">
            <li className="sm:text-xl hover:text-primary underline cursor-pointer">Chính sách bảo mật</li>
            <li className="sm:text-xl hover:text-primary underline cursor-pointer">Điều khoản dịch vụ</li>
            {/* <li className="sm:text-xl hover:text-primary underline cursor-pointer">Chính sách hoàn tiền</li> */}
            {/* <li className="sm:text-xl hover:text-primary underline cursor-pointer">Chính sách bảo mật</li> */}
          </ul>
        </div>
      </div>

      {/* Bản quyền */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">Copyright ©2025 PeaceCare - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
