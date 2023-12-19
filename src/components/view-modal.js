import React, { useState } from "react";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { selectedKey } from "./employeeReducer";
// import { toggleSubmitted } from "./employeeReducer";

const ViewDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const dispatch = useDispatch();
  const selectedEmployeeData = useSelector(
    (state) => state.employeeData.employeeDetails
  );

  const handleCancel = () => {
    setIsModalOpen(false);
    dispatch(selectedKey(""));
  };
  return (
    <>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
        // closable={false}
      >
        <div className="flex flex-col gap-y-3">
          <h1 className="font-bold text-2xl underline text-center">
            Employee Details
          </h1>
          <p className="font-bold text-xl">
            Employee Name:{" "}
            <span className="font-medium text-base">
              {selectedEmployeeData.empName}
            </span>
          </p>
          <p className="font-bold text-xl">
            Employee DOB:{" "}
            <span className="font-medium text-base">
              {selectedEmployeeData.empDob}
            </span>
          </p>
          <p className="font-bold text-xl">
            Employee Designation:
            <span className="font-medium text-base">
              {" "}
              {selectedEmployeeData.empDesignation}
            </span>
          </p>
          <p className="font-bold text-xl">
            Employee Email ID:
            <span className="font-medium text-base">
              {selectedEmployeeData.empEmailId}
            </span>
          </p>
          <p className="font-bold text-xl">
            Employee ID:
            <span className="font-medium text-base">
              {selectedEmployeeData.empID}
            </span>
          </p>
        </div>
      </Modal>
    </>
  );
};

export default ViewDetails;
