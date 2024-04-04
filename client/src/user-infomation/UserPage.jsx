import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { Radio } from "antd";
import "./userPage.css";
import { http } from "../util/http";
import BoxInfo from "./user-components/BoxInfo.jsx";
import axios from "axios";

const AddressEdit = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState("");
  console.log();
  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
      .then((response) => {
        setCities(response.data);
        console.log("city", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const initAddressSelect = {
    city: "",
    district: "",
    ward: "",
  };
  const [addressSelected, setAddressSelected] = useState(initAddressSelect);
  const handleCityChange = (e) => {
    const selectedCityId = e.target.value;
    setSelectedCity(selectedCityId);

    const selectedCityData = cities.find((city) => city.Id === selectedCityId);
    setDistricts(selectedCityData?.Districts || []);
    setSelectedDistrict("");
    setWards([]);
    const selectedCityName = selectedCityData?.Name;
    setAddressSelected({ ...addressSelected, city: selectedCityName });
    console.log("set address", addressSelected);
  };

  const handleDistrictChange = (e) => {
    const selectedDistrictId = e.target.value;
    setSelectedDistrict(selectedDistrictId);
    const selectedCityData = cities.find((city) => city.Id === selectedCity);
    const selectedDistrictData = selectedCityData?.Districts.find(
      (district) => district.Id === selectedDistrictId
    );
    console.log("district choose", selectedDistrictData);
    const selectedDistrictName = selectedDistrictData?.Name;
    setWards(selectedDistrictData?.Wards || []);
    setAddressSelected({ ...addressSelected, district: selectedDistrictName });
  };
  const handleWardChange = (e) => {
    const selectedWardId = e.target.value;
    const selectedCityData = cities.find((city) => city.Id === selectedCity);
    const selectedDistrictData = selectedCityData?.Districts.find(
      (district) => district.Id === selectedDistrict
    );
    const selectedWardData = selectedDistrictData?.Wards.find(
      (ward) => ward.Id === selectedWardId
    );
    const selectedWardName = selectedWardData?.Name;
    setSelectedWard(selectedWardId);
    setAddressSelected({ ...addressSelected, ward: selectedWardName });
  };
  return (
    <div style={{ width: "100%", border: "1px solid red" }}>
      <div style={{ padding: "30px 15px", backgroundColor: "#fff" }}>
        <h1 style={{ fontSize: "15px", fontWeight: "bolder" }}>
          THÊM ĐỊA CHỈ MỚI
        </h1>
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            width: "100%",
            marginTop: "20px",
          }}
        >
          <div className="select-container">
            <div style={{ flexBasis: "15%" }}>Thành phố</div>
            <select
              className="select-list"
              value={selectedCity}
              onChange={handleCityChange}
            >
              <option value="">Vui lòng chọn</option>
              {cities.map((city) => (
                <option key={city.Id} value={city.Id}>
                  {city.Name}
                </option>
              ))}
            </select>
          </div>

          <div className="select-container">
            <div style={{ flexBasis: "15%" }}> Quận/Huyện</div>
            <select
              className="select-list"
              value={selectedDistrict}
              onChange={handleDistrictChange}
            >
              <option value="">Vui lòng chọn</option>
              {districts.map((district) => (
                <option key={district.Id} value={district.Id}>
                  {district.Name}
                </option>
              ))}
            </select>
          </div>

          <div className="select-container">
            <div style={{ flexBasis: "15%" }}>Phường/Xã</div>
            <select
              className="select-list"
              value={selectedWard}
              onChange={handleWardChange}
            >
              <option value="">Vui lòng chọn</option>
              {wards.map((ward) => (
                <option key={ward.Id} value={ward.Id}>
                  {ward.Name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="select-container">
          <div style={{ flexBasis: "15%" }}>Địa chỉ</div>
          <input className="input-address" type="text"></input>
        </div>
      </div>
    </div>
  );
};

const OrderHistory = () => {
  return (
    <div
      style={{ width: "200px", height: "100%", border: "1px solid blue" }}
    ></div>
  );
};

const UserPage = () => {
  const [getUser, setUser] = useState();
  useEffect(() => {
    http
      .get("/user/detailUser")
      .then((getUser) => {
        setUser(getUser.data);
        console.log("user", getUser);
      })
      .catch((err) => console.log(err));
  }, []);
  const [selectedItem, setSelectedItem] = useState("account-info");
  const handleItemClick = (value) => {
    setSelectedItem(value);
  };

  const renderSelectedComponent = () => {
    switch (selectedItem) {
      case "account-info":
        return <AccountInfo getUser={getUser} />;
      case "address":
        return <AddressEdit />;
      case "order-history":
        return <OrderHistory />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          width: "80%",
          height: "800px",
          margin: "auto",
          gap: "0px 20px",
        }}
      >
        <div
          style={{
            border: "1px solid black",
            flex: "1",
            height: "65%",
            backgroundColor: "#fff",
          }}
        >
          <div>
            <ul style={{ listStyleType: "none" }}>
              <li
                value={"account-info"}
                onClick={() => handleItemClick("account-info")}
              >
                Thông tin toàn khoản
              </li>
              <li value={"address"} onClick={() => handleItemClick("address")}>
                Số địa chỉ
              </li>
              <li
                value={"order-history"}
                onClick={() => handleItemClick("order-history")}
              >
                Lịch sử đơn hàng
              </li>
            </ul>
          </div>
        </div>
        <div
          style={{ border: "1px solid red", flex: "3", height: "fit-content" }}
        >
          {renderSelectedComponent()}
        </div>
      </div>
    </Layout>
  );
};
const AccountInfo = ({ getUser }) => {
  if (!getUser) {
    return <div>Loading...</div>;
  }
  const [value, setValue] = useState(false);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <div style={{ padding: "30px 15px", backgroundColor: "#fff" }}>
      <h1 style={{ fontSize: "15px", fontWeight: "bolder" }}>
        THÔNG TIN TÀI KHOẢN
      </h1>
      <BoxInfo title="Họ" placeholder="Nhập Họ" value="" />
      <BoxInfo title="Tên" placeholder="Nhập Tên" value="" />
      <BoxInfo title="Email" placeholder="Nhập Email" value={getUser.email} />
      <BoxInfo
        title="Số điện thoại"
        placeholder="Nhập Số điện thoại"
        value={getUser.phone || ""}
      />
      <div style={{ display: "flex" }}>
        <div style={{ flexBasis: "20%" }}>Giới Tính</div>
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>Nam</Radio>
          <Radio value={2}>Nữ</Radio>
        </Radio.Group>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flexBasis: "20%" }}>Ngày sinh</div>
        <div style={{ display: "flex", gap: "10px" }}>
          <input className="birth-day-box" type="date"></input>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
