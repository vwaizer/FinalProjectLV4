<<<<<<< HEAD

import Layout from "../layout/Layout";
import { Menu } from "antd";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

import React, { useState } from 'react';
=======
import Layout from "../layout/Layout";
import { Menu } from "antd";
import "./page.css";

import React, { useState } from "react";
>>>>>>> 483d4e0e24942b3ceb7084994b67297922ca4dde
function Products() {
  
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
  ]),
  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),
  getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
];
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <Layout>
      <div className="bookstore_wrap">
        <div className="leftbox">
          <div className="leftbox_collection">
<<<<<<< HEAD
          <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{
        width: 256,
      }}
      items={items}
    />
=======
            <div className="product">
              <h2>Product Category</h2>
              {/* 'map tu database' */}
            </div>
            <div className="author">
              <h2>Author</h2>
              {/* 'map tu database' */}
            </div>
            <div>
              <h2>Publisher</h2>
              {/* 'map tu database' */}
            </div>
          </div>
        </div>
        <div className="rigtbox">
          <div className="rightbox_collection">
            <div className="sort">
              <p className="sort-name">
                Sort by:
                <select className="selection">
                  <option>Name</option>
                  <option>date</option>
                </select>
              </p>
            </div>
            <div className="product_info">
              <h1>hello, this space uses for product information</h1>
            {/* 'map tu database hình ảnh, tên spham, gia tien' */}
            </div>
>>>>>>> 483d4e0e24942b3ceb7084994b67297922ca4dde
          </div>
        </div>
      </div>


    </Layout>
  );
}

export default Products;
