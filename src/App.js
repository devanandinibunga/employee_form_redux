import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { EmployeeDetails } from "./components/employee-details";
import { EmployeeForm } from "./components/employee-form";

function App() {
  return (
    <Provider store={store}>
      <div className="flex">
        <EmployeeForm />
        <EmployeeDetails />
      </div>
    </Provider>
  );
}

export default App;
