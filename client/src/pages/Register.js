import { Button, Form, Input } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/register", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4 text-white">Nice To Meet U</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" labelAlign="left" labelCol={{ span: 24 }}>
            <Input className="w-full rounded-md bg-gray-700 text-white border-none p-2 mb-2" placeholder="Name" style={{ color: "white" }} />
          </Form.Item>
          <Form.Item label="Email" name="email" labelAlign="left" labelCol={{ span: 24 }} >
            <Input className="w-full rounded-md bg-gray-700 text-white border-none p-2 mb-2" placeholder="Email" style={{ color: "white" }} />
          </Form.Item>
          <Form.Item label="Password" name="password" labelAlign="left" labelCol={{ span: 24 }} >
            <Input className="w-full rounded-md bg-gray-700 text-white border-none p-2 mb-4" placeholder="Password" type="password" style={{ color: "white" }} />
          </Form.Item>

          <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full mb-2"
           htmlType="submit">
            REGISTER
          </Button>

          <p className="text-white text-center mt-4">Already have an account? <Link to="/login" className="text-blue-300">Click here to login</Link></p>
        </Form>
      </div>
    </div>
  );
}

export default Register;
