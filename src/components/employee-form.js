import React from "react";
import { Button, DatePicker, Form, Input } from "antd";
import { getEmployee, postEmployee, putEmployee } from "../server/server";
import { useSelector, useDispatch } from "react-redux";
import { toggleSubmitted, selectedKey } from "./employeeReducer";
import moment from "moment";

export function EmployeeForm({ form }) {
  const dispatch = useDispatch();
  const selectedActionKey = useSelector(
    (state) => state.employeeData.actionKey
  );
  const selectedEmployeeData = useSelector(
    (state) => state.employeeData.employeeDetails
  );


  if (selectedActionKey === "edit") {
    form?.setFieldsValue({
      empName: selectedEmployeeData?.empName,
      empDob: moment(selectedEmployeeData?.empDob, "DD-MM-YYYY"),
      empEmailId: selectedEmployeeData?.empEmailId,
      empID: selectedEmployeeData?.empID,
      empDesignation: selectedEmployeeData?.empDesignation,
    });
  }

  const onFinish = (values) => {
    values.empDob = values.empDob.format("DD-MM-YYYY");
    selectedActionKey === "edit"
      ? putEmployee(selectedEmployeeData.id, values)
          .then(() => {
            form.resetFields();
            dispatch(toggleSubmitted());
            dispatch(selectedKey(""));
          })
          .catch((error) => {
            console.error("Error:", error);
          })
      : getEmployee()
          .then((response) => {
            const emailExists = response?.data.some(
              (employee) => employee.empEmailId === values.empEmailId
            );
            const empIdExists = response?.data.some(
              (employee) => employee.empID === values.empID
            );
            if (!emailExists && !empIdExists) {
              postEmployee(values)
                .then(() => {
                  form.resetFields();
                  dispatch(toggleSubmitted());
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            } else {
              alert(
                emailExists
                  ? "Email already exists"
                  : "Employee Id already exists"
              );
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
  };
  const handleClear = () => {
    form.resetFields();
    dispatch(selectedKey(""));
  };
  return (
    <Form form={form} onFinish={onFinish}>
      <Form.Item
        name="empName"
        label="Name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="empDob"
        label="DOB"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <DatePicker format="DD-MM-YYYY" />
      </Form.Item>
      <Form.Item
        name="empDesignation"
        label="Designation"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="empEmailId"
        label="Email ID"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input disabled={selectedActionKey === "edit"} />
      </Form.Item>
      <Form.Item
        name="empID"
        label="Employee ID"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input disabled={selectedActionKey === "edit"} />
      </Form.Item>
      <div className="flex justify-around">
        <Form.Item>
          <Button htmlType="submit" className="bg-blue-500">
            {selectedActionKey === "edit" ? "Update" : "Submit"}
          </Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={handleClear}>Clear</Button>
        </Form.Item>
      </div>
    </Form>
  );
}
