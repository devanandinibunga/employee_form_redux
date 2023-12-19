import React, { useEffect, useState } from "react";
import { getEmployee } from "../server/server";
import { Dropdown, Table } from "antd";
import { IoMdMore } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { selectedKey, selectedEmployee } from "./employeeReducer";
import DeletePopup from "./delete-employee";

export function EmployeeDetails() {
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const dispatch = useDispatch();
  const selectedActionKey = useSelector(
    (state) => state.employeeData.actionKey
  );
  const isSubmitted = useSelector((state) => state.employeeData.submitted);
  useEffect(() => {
    getEmployee()
      .then((response) => {
        setEmployeeDetails(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [isSubmitted]);
  const handleSelectedEmployee = (details) => {
    dispatch(selectedEmployee(details));
    dispatch(selectedKey(""));
  };
  const items = [
    {
      label: <span>Edit</span>,
      key: "edit",
    },
    {
      label: <span>View</span>,
      key: "view",
    },
    {
      label: <span>Delete</span>,
      key: "delete",
    },
  ];
  const onClick = ({ key }) => {
    dispatch(selectedKey(key));
  };
  const columns = [
    {
      title: "Serial No.",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Employee Name",
      dataIndex: "empName",
      key: "empName",
    },
    {
      title: "Designation",
      dataIndex: "empDesignation",
      key: "empDesignation",
    },
    {
      title: "Email ID",
      dataIndex: "empEmailId",
      key: "empEmailId",
    },
    {
      title: "Employee ID",
      dataIndex: "empID",
      key: "empID",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Dropdown
          menu={{
            items,
            onClick,
          }}
          trigger="click"
        >
          <IoMdMore onClick={() => handleSelectedEmployee([record])} />
        </Dropdown>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={employeeDetails} />
      {selectedActionKey === "delete" && <DeletePopup />}
    </>
  );
}
