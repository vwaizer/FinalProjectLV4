import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./ThankYouPage.css";

const ThankYouPage = () => {
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
        <div className="contact-info">
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
