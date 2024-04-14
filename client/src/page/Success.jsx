import React from "react";
import success from "../assets/success.png";
import { Link } from "react-router-dom";
import { http } from "../util/http";

const Success = () => {
  const listCheck = JSON.parse(localStorage.getItem("BoughtList"));

  if(listCheck !== "undefined"){
    let newCart;
  newCart = listCheck.map((product) => {
    const { amount, discount, bookID } = product;
    return { amount: amount, discount: discount, bookID: bookID };
  });
  http
    .post("/receipt/setHistory", { cart: newCart })
    .catch((error) => console.log(error));
  }
  return (
    <div
      className="grid place-items-center w-full lg:h-screen h-full
     font-raleway bg-[#F7F7F7]"
    >
      <div className="max-w-5xl rounded flex flex-col">
        <span className="text-green-600 text-5xl">Payment successful</span>
        <span className="text-yellow-600 text-center mt-8 text-2xl font-bold">
          Your order is in our system
        </span>
        <div className="flex justify-end items-center mx-auto my-24 w-60">
          <img src={success} alt="" />
        </div>
        <div className="my-10 mx-auto">
          <Link to="/" className="underline text-xl underline-offset-4">
            Back to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
