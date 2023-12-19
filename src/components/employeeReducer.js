import { createSlice } from "@reduxjs/toolkit";

export const employee = createSlice({
  name: "employeeData",
  initialState: {
    employeeDetails: [],
    actionKey: "",
    submitted: false,
  },
  reducers: {
    selectedKey: (state, action) => {
      state.actionKey = action.payload;
    },
    selectedEmployee: (state, action) => {
      state.employeeDetails = action.payload;
    },
    toggleSubmitted: (state) => {
      state.submitted = !state.submitted;
    },
  },
});

export const { selectedKey, selectedEmployee, toggleSubmitted } =
  employee.actions;
export default employee.reducer;

// const employeeReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "ADD_TO_CART":
//       return {
//         ...state,
//         items: [...state.items, action.payload],
//         totalPrice: state.totalPrice + action.payload.price,
//       };
//     case "REMOVE_FROM_CART":
//       const updatedItems = state.items.filter(
//         (item) => item.id !== action.payload.id
//       );
//       const updatedTotalPrice = state.totalPrice - action.payload.price;
//       return {
//         ...state,
//         items: updatedItems,
//         totalPrice: updatedTotalPrice >= 0 ? updatedTotalPrice : 0,
//       };
//     case "CLEAR_CART":
//       return initialState;
//     default:
//       return state;
//   }
// };

// export default employeeReducer;
