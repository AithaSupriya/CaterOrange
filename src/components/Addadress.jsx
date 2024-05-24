import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddAddress = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");

  const onFinish = async () => {
    try {

      let id = await localStorage.getItem('id');

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/userAdress/${id}`, {
        street,
        city,
        state,
        pincode,
        landmark,
      });

      
      setStreet("");
      setCity("");
      setState("");
      setPincode("");
      setLandmark("");
  

      // Close the modal
      setVisible(false);

      console.log(response);
      navigate("/cart"); // Example redirect to profile page
    } catch (error) {
      console.error("Error while adding address:", error);
      // Handle error here
    }
  };
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={showModal}>Add Address</Button>
      <Modal
        title="Add Address"
        open={visible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={onFinish}>
            Add Address
          </Button>,
        ]}
      >
        <Form>
          <div>
            <Form.Item
              name="street"
              rules={[
                {
                  required: true,
                  message: "Please input your street address!",
                },
              ]}
            >
              <Input
                placeholder="Full Address"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="city"
              rules={[
                {
                  required: true,
                  message: "Please input your city!",
                },
              ]}
            >
              <Input
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="state"
              rules={[
                {
                  required: true,
                  message: "Please input your state!",
                },
              ]}
            >
              <Input
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="pincode"
              rules={[
                {
                  required: true,
                  message: "Please input your pincode!",
                },
              ]}
            >
              <Input
                placeholder="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item
              name="landmark"
              rules={[
                {
                  required: true,
                  message: "Please input a landmark!",
                },
              ]}
            >
              <Input
                placeholder="Landmark"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
              />
            </Form.Item>
          </div>
          {/* <Button type="primary" htmlType="submit">
            Add Address
          </Button> */}
        </Form>
      </Modal>
    </div>
  );
};

export default AddAddress;
