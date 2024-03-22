import React from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaFacebookF, FaTiktok, FaTwitter } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdPlace } from "react-icons/md";
import { Link } from "react-router-dom";
import "./layout.css";
const siteMap = [
  {
    title: "Chính Sách Vận Chuyển",
    href: "#",
  },
  {
    title: "Chính Sách Đổi Trả",
    href: "#",
  },
  {
    title: "Cho Thuê/Mượn Sách",
    href: "#",
  },
  {
    title: "Phương Thức Thanh Toán",
    href: "#",
  },
];

const bookTypes = [
  {
    title: "Văn Học",
    href: "/product/#literature",
  },
  {
    title: "Tâm Lý - Kỹ Năng Sống",
    href: "#psb",
  },
  {
    title: "Kinh tế",
    href: "#economic",
  },
  {
    title: "Nuôi Dạy Con ",
    href: "#Children",
  },
  {
    title: "Tiểu Sử - Hồi Ký",
    href: "#history",
  },
];

function Footer() {
  return (
    <div className="footer">
      <div className="bookstore_footer">
        <div className="logo_footer">
          <img
            src="https://t4.ftcdn.net/jpg/02/11/07/81/360_F_211078110_mttxEdu3gsSbMKajsy98E4M4E5RUCiuo.jpg"
            width={320}
            alt="logo"
          />
        </div>
        <div className="information_footer">
          <div className="collection">
            <h3>Thể Loại</h3>
            {bookTypes.map((item, index) => {
              return (
                <div className="link" key={index}>
                  <Link to={item.href} >
                    {item.title}
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="site">
            <h3>Hỗ Trợ</h3>
            {siteMap.map((item, index) => {
              return (
                <div className="link" key={index}>
                  <Link to={item.href} >
                    {item.title}
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="contact">
            <h3>Liên Hệ</h3>
            <div className="contact-info">
              <BsFillTelephoneFill className="icon" />
              Tel: 0909888999
            </div>
            <div className="contact-info">
              <IoMdMail className="icon" />
              Email: group1mindx@gmail.com
            </div>
            <div className="contact-info">
              <MdPlace className="icon" />
              Địa Chỉ: TP Hồ Chí Minh
            </div>
            <div className="another-contact">
              <Link to="http://facebook.com">
                <FaFacebookF />
              </Link>
              <Link to="https://twitter.com/i/flow/login">
                <FaTwitter />
              </Link>
              <Link to="https://www.tiktok.com/vi-VN/">
                <FaTiktok />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <p className="under-footer">
        <i>Copy right @Nhom_1_X22 2024</i>
      </p>
    </div>
  );
}

export default Footer;
