import React, { useState } from "react";
import { Modal, Button } from "antd";
import { deleteEmployee } from "../server/server";
import { useDispatch, useSelector } from "react-redux";
import { toggleSubmitted } from "./employeeReducer";

const DeletePopup = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const dispatch = useDispatch();
  const selectedEmployeeData = useSelector(
    (state) => state.employeeData.employeeDetails
  );
  const handleOk = () => {
    deleteEmployee(selectedEmployeeData[0].id)
      .then((response) => {
        dispatch(toggleSubmitted());
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        closable={false}
      >
        <div>
          <h1>Are you sure you want to delete ?</h1>
          <div>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleOk}>Yes</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeletePopup;
