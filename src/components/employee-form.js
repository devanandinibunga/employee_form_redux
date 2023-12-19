import React from "react";
import { Button, Form, Input } from "antd";
import { getEmployee, postEmployee, putEmployee } from "../server/server";
import { useSelector, useDispatch } from "react-redux";
import { toggleSubmitted, selectedKey } from "./employeeReducer";

export function EmployeeForm() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const selectedActionKey = useSelector(
    (state) => state.employeeData.actionKey
  );
  const selectedEmployeeData = useSelector(
    (state) => state.employeeData.employeeDetails
  );
  if (selectedActionKey === "edit") {
    form.setFieldsValue({
      empName: selectedEmployeeData[0].empName,
      empDob: selectedEmployeeData[0].empDob,
      empEmailId: selectedEmployeeData[0].empEmailId,
      empID: selectedEmployeeData[0].empID,
      empDesignation: selectedEmployeeData[0].empDesignation,
    });
  }

  const onFinish = (values) => {
    selectedActionKey === "edit"
      ? putEmployee(selectedEmployeeData[0].id, values)
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
            if (!emailExists) {
              postEmployee(values)
                .then(() => {
                  form.resetFields();
                  dispatch(toggleSubmitted());
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            } else {
              alert("Email already exists")
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
  };
  const handleClear = () => {
    form.resetFields();
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
        <Input />
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
      <Form.Item>
        <Button htmlType="submit" type="primary">
          {selectedActionKey === "edit" ? "Update" : "Submit"}
        </Button>
      </Form.Item>
      <Form.Item>
        <Button onClick={handleClear}>Clear</Button>
      </Form.Item>
    </Form>
  );
}
