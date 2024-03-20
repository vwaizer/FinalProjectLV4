import React from "react";

const FAQ = ({title, text}) => {
  return (
    <div>
      <div class="C-sub-button_2">
        <button class="C-button-FAQ_1">
          <i class="bi bi-plus-circle"></i>
          <label className="label-FAQ">
            {title}
          </label>
        </button>
        <div class="C-container-FAQ_1">
          <label for="">
            {text}
          </label>
        </div>
        <div class="C-child-box-subtitle_3"></div>
      </div>
    </div>
  );
};

export default FAQ;
