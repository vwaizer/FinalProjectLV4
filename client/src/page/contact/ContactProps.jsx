import React from "react";
import "./contact-page.css";
const ContactProps = ({ title, Type, Placeholder }) => {
  return (
    <div class="C-sub_title_2">
      <label>{title}</label>
      <div>
        <input
          class="C-textbox--simple"
          type={Type}
          placeholder={Placeholder}
        />
      </div>
    </div>
  );
};

export default ContactProps;
