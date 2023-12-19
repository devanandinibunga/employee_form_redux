import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { EmployeeDetails } from "./components/employee-details";
import { EmployeeForm } from "./components/employee-form";
import { Form } from "antd";

function App() {
  const [form] = Form.useForm();
  return (
    <div className="flex flex-col items-center min-h-full">
      <div className="text-3xl font-bold underline">Employee Form</div>
      <Provider store={store}>
        <div className="flex flex-col lg:flex-row w-full justify-around items-center">
          <EmployeeForm form={form} />
          <EmployeeDetails form={form} />
        </div>
      </Provider>
    </div>
  );
}

export default App;
