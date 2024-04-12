import { Form } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { http } from "../util/http";
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import { ToastContainer, toast } from "react-toastify";
const AddressEdit = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState("");
  const [getUser, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleted,setIsDeleted]=useState(false)
  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
      .then((response) => {
        setCities(response.data);
        // console.log("city", response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    http
      .get("/user/detailUser")
      .then((getUser) => {
        console.log(getUser.data);
        setUser(getUser.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [isDeleted]);
  console.log("thong tin user", getUser);
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
    formAddress.setFieldsValue({
      city: selectedCityName,
      district: "",
      ward: "",
    });
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
    formAddress.setFieldsValue({ district: selectedDistrictName, ward: "" });
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
    formAddress.setFieldsValue({ ward: selectedWardName });
    console.log(addressSelected);
  };
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 9,
      },
    },
  };
  const inputUser = {
    fullName: "",
    phone: "",
  };
  const [inputInforUser, setInputValue] = useState(inputUser);
  const [fillAddress, setFillAddress] = useState(" ");
  const handleChange = (key, event) => {
    const value = event.target.value;
    setInputValue({ ...inputInforUser, [key]: value });
  };
  const handleFillAddress = (event) => {
    const value = event.target.value;
    setFillAddress(value);
    setAddressSelected({ ...addressSelected, address: value });
  };
  const [formAddress] = Form.useForm(); // Đối tượng form thứ nhất
  const [formUser] = Form.useForm(); // Đối tượng form thứ hai
  const onClick = async () => {
    try {
      await Promise.all([
        formAddress.validateFields(),
        formUser.validateFields(),
      ]);

      // push lên api

      // thông tin địa chỉ
      console.log("result", addressSelected);
      console.log("user", inputInforUser);

      http
        .put("/user/changeAddress", {
          address: {
            address: addressSelected.address,
            district: addressSelected.district,
            city: addressSelected.city,
            ward: addressSelected.ward,
            phone: inputInforUser.phone,
            fullName: inputInforUser.fullName,
          },
        })
        .then(() => {
          // console.log("Thêm địa chỉ thành công ");
          toast.success("Thêm địa chỉ thành công");
          http
            .get("/user/detailUser")
            .then((response) => {
              setUser(response.data);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));

      // setTimeout(() => (window.location.href = "/"), 2000);

      // thông tin sdt và họ tên của user
      console.log(inputInforUser);
    } catch (error) {
      console.log("Validation error:", error);
    }
  };
  const deleteAddress = async (index) => {
    try {
      const result =await http.delete(`/user/deleteAddress/${index}`);
      setIsDeleted(!isDeleted)
      const defaultAddress = JSON.parse(localStorage.getItem("defaultAddress"));
  
      if (JSON.stringify(getUser.address[index]) === JSON.stringify(defaultAddress)) {
        localStorage.removeItem("defaultAddress");
        console.log('đã xóa')
      }
      await http.post(`/user/deleteAddress/${index}`);
    } catch (err) {
      console.log(err);
    }
  };
  const setDefaultAddress = (index) => {
    const defaultAddress = getUser.address[index];
    localStorage.setItem("defaultAddress", JSON.stringify(defaultAddress));
  };
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div style={{ width: "100%", backgroundColor: "#fff" }}>
        <div className="page-title">
          <h1>THÊM ĐỊA CHỈ MỚI</h1>
          <div className="line"></div>
          <div className="address-edit-container">
            <div>
              <Form form={formUser} {...formItemLayout}>
                <Form.Item
                  label="Họ và Tên"
                  name="fullName"
                  rules={[
                    {
                      required: true,
                      message: "Thông tin này không được để trống",
                    },
                  ]}
                >
                  <input
                    value={inputInforUser.fullName}
                    onChange={(e) => handleChange("fullName", e)}
                    className="input-info-changed"
                    type="text"
                    maxLength={40}
                  ></input>
                </Form.Item>

                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Thông tin này không được để trống",
                    },
                  ]}
                >
                  <input
                    value={inputInforUser.phone}
                    onChange={(e) => handleChange("phone", e)}
                    className="input-info-changed"
                    type="text"
                    maxLength={10}
                    
                  ></input>
                </Form.Item>
              </Form>
            </div>
            <div>
              <Form form={formAddress} {...formItemLayout}>
                <Form.Item
                  label="Thành phố"
                  name="city"
                  rules={[
                    {
                      required: true,
                      message: "Thông tin này không được để trống",
                    },
                  ]}
                >
                  <div>
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
                </Form.Item>

                <Form.Item
                  label="Quận/huyện"
                  name="district"
                  rules={[
                    {
                      required: true,
                      message: "Thông tin này không được để trống",
                    },
                  ]}
                >
                  <div>
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
                </Form.Item>

                <Form.Item
                  label="Phường/Xã"
                  name="ward"
                  rules={[
                    {
                      required: true,
                      message: "Thông tin này không được để trống",
                    },
                  ]}
                >
                  <div>
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
                </Form.Item>

                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Thông tin này không được để trống",
                    },
                  ]}
                >
                  <input
                    value={fillAddress}
                    onChange={(event) => handleFillAddress(event)}
                    className="input-info-changed"
                    type="text"
                    maxLength={40}
                  ></input>
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className="line"></div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button onClick={onClick} className="add-address-info">
              Thêm địa chỉ
            </button>
          </div>
        </div>
      </div>

      <div
        style={{ width: "100%", backgroundColor: "#fff", marginTop: "20px" }}
      >
        <div className="page-title">
          <h1>ĐỊA CHỈ CỦA TÔI</h1>
          <div className="line"></div>
        </div>
        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              {getUser.address.length ? (
                <div>
                  {getUser.address.map((userAddress, index) => {
                    const { address, district, city, phone, fullName } =
                      userAddress;
                    return (
                      <div className="list-address" key={userAddress.id}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div style={{ marginBottom: "15px" }}>
                            <div
                              style={{
                                alignItems: "center",
                                lineHeight: "1.2",
                              }}
                            >
                              <span
                                style={{ fontSize: "18px", color: "black" }}
                              >
                                {fullName}{" "}
                              </span>{" "}
                              | <span style={{}}>{phone}</span>
                            </div>
                            <div>{address}</div>
                            <div>{`${district}, ${city}`}</div>
                          </div>
                          <div
                            className="delete-default-address"
                          >
                            <div className="delete-address" onClick={() => deleteAddress(index)}>
                              {" "}
                              <u>Xóa địa chỉ</u>
                            </div>
                            <div className="default-address" onClick={() => setDefaultAddress(index)}>
                              <u>Đặt làm địa chỉ mặc định</u>
                            </div>
                          </div>
                        </div>
                        <div className="line"></div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ margin: "50px" }}>
                    <div style={{ textAlign: "center" }}>
                      <AddLocationAltRoundedIcon
                        style={{ fontSize: "100px", color: "#d7d7d7" }}
                      ></AddLocationAltRoundedIcon>
                    </div>
                    <div className="unAddress">Bạn chưa có địa chỉ.</div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default AddressEdit;
