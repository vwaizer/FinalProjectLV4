import React from "react";
import "./contact-page.css";

import { FaFacebookF, FaTiktok, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  picture1,
  picture2,
  picture3,
  picture4,
  picture5,
  picture6,
} from "../../assets/imageProduct.js";
import Button from "../../common/button/button";
import Logo from "../../custom/productcpn/Logo";
import Layout from "../../layout/Layout";
import ContactProps from "./ContactProps";
import RightContact from "./RightContact";

const Contactpage = () => {
  return (
    <Layout>
      <div className="contact-page">
        <div>
          <div class="C-container_1">
            <p class="C-container_title_1">Trang Thông Tin</p>
            <div class="C-sub-container_1">
              <div class="C-column_1">
                <div class="C-column-title">
                  <p class="C-sub_title">Góp Ý</p>
                  <div class="C-child-box-subtitle_1"></div>
                </div>

                <div class="C-sub-column_1">
                  <div class="C-sub-column_1_1">
                    <div class="C-sub-column_1_1_1">
                      <ContactProps
                        title="Họ Và Tên"
                        Type="text"
                        Placeholder="Nhập"
                      />
                    </div>
                    <div class="C-sub-column_1_1_1">
                      <ContactProps
                        title="Số Điện Thoại"
                        Type="number"
                        Placeholder="+84"
                      />
                    </div>
                  </div>
                  <div class="C-sub-column_1_1">
                    <div class="C-sub-column_1_1_1">
                      <ContactProps
                        title="Email"
                        Type="email"
                        Placeholder="Địa Chỉ Email"
                      />
                    </div>
                    <div class="C-sub-column_1_1_1">
                      <ContactProps
                        title="Tiêu Đề"
                        Type="text"
                        Placeholder="Nhập Tiêu Đề"
                      />
                    </div>
                  </div>
                  <div>
                    <div class="C-sub-column_1_1_1">
                      <div class="C-sub_title_2">
                        <label>Lời Nhắn</label>
                      </div>
                      <div>
                        <input
                          class="C-textbox--big"
                          type="text"
                          placeholder=""
                          maxLength={60}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="C-buton_submit">
                    <Button text="Gửi" btnStyle="auth-btn" />
                  </div>
                </div>
              </div>
              <div class="C-column_2"></div>
              <div class="C-column_3">
                <div class="C-column-title">
                  <p class="C-sub_title">Liên Hệ</p>
                  <div class="C-child-box-subtitle_1"></div>
                </div>

                <div>
                  <RightContact
                    text=" Sản phẩm cuối khóa của nhóm 1_X22, 
                    Cảm ơn Giảng Viên và các bạn đã xem cũng như đóng góp ý kiến cho nhóm 
                    để các thành viên có thêm nhiều kiến thức cũng như kinh nghiệm trong công việc sau này "
                    title1="Nhom1_X22@gmail.com"
                    title2="(000) 000 0000"
                    title3=" TP Hồ Chí Minh"
                  />
                  <div class="C-sub-column_3">
                    <div>
                      <label>Liên hệ qua ứng dụng:</label>
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
            </div>
          </div>
        </div>
        <div className="logo_contact">
          <Logo image={picture1} />
          <Logo image={picture2} />
          <Logo image={picture3} />
          <Logo image={picture4} />
          <Logo image={picture5} />
          <Logo image={picture6} />
        </div>
      </div>
    </Layout>
  );
};

export default Contactpage;
