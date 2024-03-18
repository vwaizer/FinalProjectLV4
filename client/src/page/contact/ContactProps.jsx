import React from "react";
import "./contact-page.scss";
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
