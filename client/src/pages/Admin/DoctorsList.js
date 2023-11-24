import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table } from "antd";
import moment from "moment";

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  const getDoctorsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-doctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setDoctors(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Failed to fetch doctors data');
    }
  };

  const changeDoctorStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/admin/change-doctor-account-status",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getDoctorsData();
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error('Error changing doctor account status');
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text, record) => moment(record.createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="flex">
          {record.status === "pending" && (
            <h1
              className="cursor-pointer text-blue-500 mr-4"
              onClick={() => changeDoctorStatus(record, "approved")}
            >
              Approve
            </h1>
          )}
          {record.status === "approved" && (
            <h1
              className="cursor-pointer text-red-500"
              onClick={() => changeDoctorStatus(record, "blocked")}
            >
              Block
            </h1>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">Doctors List</h1>
      <hr className="my-4" />
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
}

export default DoctorsList;
