import React, { useEffect, useState } from "react";
import "./button.css";

const Button = ({ text="", onClick = () => {}, type, btnStyle="", customBtnStyle="", disabled, iconL="", iconR="", iconSide="left", textStyle="", frameStyle="" }) => {
    const [defaultFrameStyle, setDefaultFrameStyle] = useState("");
    const [defaultTextStyle, setDefaultTextStyle] = useState("");
    
    useEffect(() => {
        if (btnStyle === "nav-btn") {
            setDefaultFrameStyle("nav-btn-frame");
            setDefaultTextStyle("pre-title");
        } else if (btnStyle === "auth-btn") {
            setDefaultFrameStyle("auth-btn-frame");
            setDefaultTextStyle("btn-text");
        } else if (btnStyle === "icon-nav-btn") {
            setDefaultFrameStyle("icon-nav-frame");
            setDefaultTextStyle("");
        } else if (btnStyle === "prod-detail-btn") {
            setDefaultFrameStyle("prod-detail-frame");
            setDefaultTextStyle("btn-text-lgt");
        } else if (btnStyle === "footer-btn") {
            setDefaultFrameStyle("footer-btn-frame");
            setDefaultTextStyle("body-lgt");
        } else {
            setDefaultFrameStyle("underline-btn-frame");
            setDefaultTextStyle("body-lgt");
        }
    }, [btnStyle]);

    if (btnStyle.includes("icon-nav-btn")) {
        iconL = iconL + " icon-size-20 square-icon";
    }

    let iconStateLeft = iconL ? <i className={iconL}></i> : null;
    let iconStateRight = iconR ? <i className={iconR}></i> : null;

    const textComponent = text !== "" ? <p className={textStyle || defaultTextStyle}>{text}</p> : null;

    if (iconSide === "left") {
        iconStateLeft = <i className={iconL}></i>;
        iconStateRight = null;
    } else if (iconSide === "right") {
        iconStateLeft = null;
        iconStateRight = <i className={iconR}></i>;
    } else if (iconSide === "both") {
        iconStateLeft = <i className={iconL}></i>;
        iconStateRight = <i className={iconR}></i>;
    }

    if (iconL === "") {
        iconStateLeft = null;
    } else if (iconR === "") {
        iconStateRight = null;
    }

    return (
        <button
        className={`${btnStyle} ${customBtnStyle}`}
        onClick={onClick}
        type={type}
        disabled={disabled}
        >
        <div className={`${defaultFrameStyle} ${frameStyle}`}>
            {iconStateLeft}
            {textComponent}
            {iconStateRight}
        </div>
        </button>
    );
}

export default Button;
