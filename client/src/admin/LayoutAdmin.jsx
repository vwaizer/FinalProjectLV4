import React from "react";
import "./layoutadmin.css";
import { Link } from "react-router-dom";
const listMenu = [
  {
    title: "Overview",
    href: "/admin/overview",
  },
  {
    title: "Bill",
    href: "/admin/bill",
  },
  {
    title: "Import and Browse",
    href: "/admin/IaB",
  },
  {
    title: "Staf and User",
    href: "/admin/SaU",
  },
  {
    title: "Statistics",
    href: "/admin/statistic",
  },
  {
    title: "Book Rental Management",
    href: "/admin/BRM",
  },
];
const LayoutAdmin = (prop) => {
  return (
    <div className="layout">
      <div className="title">
        {listMenu.map((item, index) => {
          return (
            <div className="link" key={index}>
              <Link to={item.href}>{item.title}</Link>
            </div>
          );
        })}
        <div>{prop.children}</div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
