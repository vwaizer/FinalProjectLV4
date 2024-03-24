import { ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Space, Statistic } from "antd";
import React from "react";

const OverviewCustom = ({title, value, icon}) => {
  return (
    <Card>
      <Space style={{width: 200, height: 150}}>
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
};

export default OverviewCustom;
