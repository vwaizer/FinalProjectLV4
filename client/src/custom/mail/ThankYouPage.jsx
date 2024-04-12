import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import "./ThankYouPage.css";
import { http } from "../../util/http";

const ThankYouPage = () => {
  const userID=useParams().id;
  console.log(userID);
  const verifyEmail=async()=>{
    try {
      const result=await http.get(`/verified/${userID}`)
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    if(userID.length>0){
      verifyEmail()
    }
  },[userID])
  return (
    <div className="thank-you-page">
      <div className="thank-you-content">
        <FaCheckCircle className="check-icon" />
        <h1>Thank You!</h1>
        <p>
          Thank you for confirming your email. You can now access your account
          and start using our services.
        </p>
        <div className="cta-container">
          <Link to="/" className="cta-button">
            Go Back to Home
          </Link>
        </div>
        <div className="contact-thanks-info">
          <p>
            If you have any questions or need assistance, please don't hesitate
            to contact us:
          </p>
          <p>Email: group1mindx@gmail.com</p>
          <p>Phone: 0123456789</p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
