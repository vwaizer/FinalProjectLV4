import { Cloudinary } from "@cloudinary/url-gen";
import { Button, Card, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { http } from "../util/http";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import './page.css';
const ImportBook = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!localStorage.getItem("accessToken")) {
  //     navigate("/sign-in");
  //   }
  // }, []);
  const [publicId, setPublicId] = useState("");
  // Replace with your own cloud name
  const [cloudName] = useState("dbupj4dev");
  // Replace with your own upload preset
  const [uploadPreset] = useState("mfqqcbks");

  // Upload Widget Configuration
  // Remove the comments from the code below to add
  // additional functionality.
  // Note that these are only a few examples, to see
  // the full list of possible parameters that you
  // can add see:
  //   https://cloudinary.com/documentation/upload_widget_reference

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    // cropping: true, //add a cropping step
    // showAdvancedOptions: true,  //add advanced options (public_id and tag)
     sources: [ "local", "url"], // restrict the upload sources to URL and local files
     multiple: true,  //restrict upload to a single file
    // folder: "user_images", //upload files to the specified folder
    // tags: ["users", "profile"], //add the given tags to the uploaded files
    // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
     clientAllowedFormats: ["jpg"], //restrict uploading to image files only
    // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
    // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
    // theme: "purple", //change to a purple theme
  });

  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });
  const image = cld.image(publicId);
  const [img,setImg]=useState([])
  useEffect(()=>{
    console.log("publicId",publicId);
    if(!img.includes(publicId)){
      const newImg=img.push(publicId)
    setImg([...img])
    }
    
  },[publicId])
  console.log("img",img);
  const submitBook = async (form, myImg, e) => {
    console.log(myImg);

    if (form.getFieldValue("name")?.length<0 || form.getFieldValue("name")?.length>36 ) {
      toast.error("Không đúng format name");
    } else
    if (!form.getFieldValue("type")?.length>0 || form.getFieldValue("type")?.length>36 )  {
      toast.error("Không đúng format type");
    } else
    if (!form.getFieldValue("amount")?.length>0 || form.getFieldValue("amount")?.length>3 ) {
      toast.error("Không đúng format amount");
    }else
    if (!form.getFieldValue("price")?.length>0 || form.getFieldValue("price")?.length>3 ) {
      toast.error("Không đúng format price");
    } else
    if (!form.getFieldValue("author")?.length>0 || form.getFieldValue("name")?.length>36 ) {
      toast.error("Không đúng format author");
    } else
    if (!form.getFieldValue("publisher")?.length>0 || form.getFieldValue("publisher")?.length>36 ) {
      toast.error("Không đúng format publisher");
    }else{
      const item = {
        name: form.getFieldValue("name"),
        type: form.getFieldValue("type"),
        amount: form.getFieldValue("amount"),
        price: form.getFieldValue("price") * 1000,
        author:form.getFieldValue("author"),
        publisher: form.getFieldValue("publisher"),
        images: [...myImg] || [""],
      };
      console.log(item);
      setImg([])
      e.preventDefault()
      try {
        const result = await http.post("/book/", { book: [item] });
        console.log(result);
      
        toast.success("Nhập sách thành công");
        
      } catch (error) {
        console.log(error);
        toast.error(error);
      }
    }
    
  };
  return (
    <>
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
      <div className="import_book">
        <h1>Nhập Sách</h1>
        <div>
        <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between",padding:"5px"}}><h2>Ngày</h2>
          <input
            type="text"
            placeholder="Ngày Nhập Sách"
            value={new Date().toLocaleDateString()}
            disabled
            style={{width:"80%"}}
        
          ></input></div>
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            form={form}
            name="dynamic_form_complex"
            style={{maxWidth:"100%" }}
            autoComplete="off"
            initialValues={{ items: [{}] }}
            onSubmitCapture={(e) => e.preventDefault()}
          >
          
            <Form.List name="items">
            
              {(fields, { add, remove }) => (
                <div
                  key={fields.name }
                  style={{
                    display: "flex",
                    rowGap: 16,
                    flexDirection: "column",
                    
                  }}
                >
                  {/* <Button type="dashed" onClick={() => add()} block>
              + Add Item
            </Button> */}
                  {/* <Button type="dashed" onClick={() => add()} block>
                    + Add Item
                  </Button> */}
                  {fields.map((field) => (
                    <>
                      <Card
                        size="default"
                        title={`Item ${field.name + 1}`}
                        key={field.key}
                      >
                        <Form.Item
                          label="Tên"
                          name={[field.name, "name"]}
                          required
                          style={{width:"100%"}}
                        >
                          <Input
                            onChange={(e) =>
                              form.setFieldValue("name", e.target.value.trim())
                            }
                            maxLength={36}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Type"
                          name={[field.name, "type"]}
                          required
                        >
                          <Input
                            onChange={(e) =>
                              form.setFieldValue("type", e.target.value.trim())
                            }
                            maxLength={36}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Tác giả"
                          name={[field.name, "author"]}
                          required
                        >
                          <Input
                            onChange={(e) =>
                              form.setFieldValue("author", e.target.value.trim())
                            }
                            maxLength={36}
                          />
                        </Form.Item>
                        <Form.Item
                          label="NXB"
                          name={[field.name, "publisher"]}
                          required
                        >
                          <Input
                            onChange={(e) =>
                              form.setFieldValue("publisher", e.target.value.trim())
                            }
                            maxLength={36}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Giá"
                          name={[field.name, "price"]}
                          required
                        >
                          <Input
                            onChange={(e) =>
                              form.setFieldValue("price", e.target.value)
                            }
                            type="number"
                            min={0}
                            maxLength={3}
                          />
                        </Form.Item>
                        <Form.Item
                          label="Số Lượng"
                          name={[field.name, "amount"]}
                          required
                        >
                          <Input
                            onChange={(e) =>
                              form.setFieldValue("amount", e.target.value)
                            }
                            type="number"
                            min={0}
                            maxLength={3}
                          />
                        </Form.Item>
                        <Form.Item label="img" name={[field.name, "img"]}>
                          <CloudinaryUploadWidget
                            uwConfig={uwConfig}
                            setPublicId={setPublicId}
                          />
                        </Form.Item>
                        {/* Nest Form.List */}
                        <Button
                        type="dashed"
                        onClick={(e) => {
                          submitBook(form, img, e);
                         
                          setTimeout(() => {
                            
                            form.resetFields();
                            

                          }, 1000);
                        }}
                        block
                      >
                        submit
                      </Button>
                      </Card>
                    
                    </>
                  ))}
                </div>
              )}
            </Form.List>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ImportBook;
