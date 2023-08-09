// This component is used to add task to server

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTaskToServer } from "../store/tasks/taskReducer";

const AddTaskComponent = () => {
  // state variable for storing form input (task) data
  const [taskData, setTaskData] = useState("");

  // Handling form input (task) onchange event
  const taskDataOnChangeEvent = (e) => {
    setTaskData(e.target.value);
  };

  // useDispatch hook
  const dispatch = useDispatch();

  // Handling Form submit event
  const handleFormSubmit = (e) => {
    e.preventDefault(); // preventing webpage from loading after click form submit button
    const taskDataToServer = {
      task: taskData,
    };
    dispatch(addTaskToServer(taskDataToServer)); // Dispatching "addTaskToServer" action
    document.getElementById("taskEle").value = ""; // Clearing form input
  };

  // UI
  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        name="task"
        value={taskData}
        onChange={taskDataOnChangeEvent}
        id="taskEle"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskComponent;
