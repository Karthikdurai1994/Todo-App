import logo from "./logo.svg";
import "./App.css";
import TaskComponent from "./components/TaskComponent";
import AddTaskComponent from "./components/AddTaskComponent";
import HeaderComponent from "./components/HeaderComponent";

function App() {
  return (
    <div className="App">
      <HeaderComponent /> {/* Header Component*/}
      <AddTaskComponent /> {/* Add Task Component*/}
      <TaskComponent /> {/* Display Task Component*/}
    </div>
  );
}

export default App;
