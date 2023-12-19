import React, { useEffect, useState } from "react";
import { getEmployee } from "../server/server";
import { Button, Card, Col, Dropdown, Row, Table } from "antd";
import { IoMdMore } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { selectedKey, selectedEmployee } from "./employeeReducer";
import DeletePopup from "./delete-employee";
import ViewDetails from "./view-modal";

export function EmployeeDetails({ form }) {
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
    form.resetFields();
  };
  const handleEdit = (item) => {
    dispatch(selectedKey("edit"));
    dispatch(selectedEmployee(item));
    form.resetFields();
  };
  const handleDelete = (item) => {
    dispatch(selectedKey("delete"));
    dispatch(selectedEmployee(item));
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
          <IoMdMore onClick={() => handleSelectedEmployee(record)} />
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={employeeDetails}
        className="hidden lg:block"
      />
      {employeeDetails.map((item) => (
        <Card key={item.id} className="block lg:hidden w-full">
          <Row span={24} className="flex justify-between gap-y-3">
            <Col span={15}>
              <p className="manager-label truncate">{item.empName}</p>
              <p className="user-name truncate">{item.empDesignation}</p>
              <p className="email truncate">{item.empEmailId}</p>
            </Col>
            <Col span={8}>
              <p className="user-name">{item.empDob}</p>
              <p className="email">{item.empID}</p>
            </Col>
            <Col span={24} className="flex justify-around">
              <Button
                className="bg-orange-300"
                onClick={() => handleEdit(item)}
              >
                Edit
              </Button>
              <Button className="bg-red-500" onClick={() => handleDelete(item)}>
                Delete
              </Button>
            </Col>
          </Row>
        </Card>
      ))}
      {selectedActionKey === "delete" && <DeletePopup />}
      {selectedActionKey === "view" && <ViewDetails />}
    </>
  );
}
