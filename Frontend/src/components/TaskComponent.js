// This component is used to display all tasks from server

import { useDispatch, useSelector } from "react-redux";
import { getTasksFromServer } from "../store/tasks/taskReducer";
import { useEffect } from "react";

const TaskComponent = () => {
  // Getting store data using useSelector hook and destructuring them. Also the data we get from store automatically updated without using "subscribe" method because it handled by "react-redux" library itself
  const { tasks, loading, error } = useSelector((state) => {
    return state.tasks;
  });
  // useDispatch hook for dispatching action
  const disptach = useDispatch();
  // Fetching Task from server using useEffect hook
  useEffect(() => {
    disptach(getTasksFromServer()); // Calling "getTasksFromServer" action
  }, []);

  // UI
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {tasks.length === 0 ? (
            <p>No Task available</p>
          ) : (
            tasks.map((task) => {
              return (
                <p key={task.id}>
                  {task.id}. {task.task}
                </p>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default TaskComponent;
