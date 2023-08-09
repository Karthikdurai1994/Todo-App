import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Step - 1: Store Data structure. This is for jusr reference on the structure of the data that will be saved in redux store
/*
   store = [
    {
        id: 1.
        task: "Sleep",
        completed: true
    },
    {
        id: 2,
        task: "Walking",
        completed: false
    }

   ]
*/

// Step - 2: Create Initial State
const initialStateData = {
  loading: true,
  tasks: [],
  error: null,
};
let id = 0; // This is just for adding in each task

// API call with "createAsyncThunk" from redux-toolkit
export const getTasksFromServer = createAsyncThunk(
  "FETCH_TASK_FROM_SERVER",
  async (a, { rejectWithValue }) => {
    try {
      const fetchTaskAPIUrl = "http://localhost:5001/api/tasks";
      const serverResponse = await axios.get(fetchTaskAPIUrl);
      const serverResponseData = serverResponse.data;
      return { tasks: serverResponseData }; // Here we are returning server response which will automatically added to action's payload
    } catch (err) {
      return rejectWithValue({ error: err.message }); // Sending error
    }
  }
);

// API Call for adding tasks to backend server
export const addTaskToServer = createAsyncThunk(
  "ADD_TASK_TO_SERVER",
  async (a, { rejectWithValue }) => {
    console.log("ADD Task Running...");
    try {
      const addTaskAPIUrl = "http://localhost:5001/api/tasks";
      const addTaskServerResponse = await axios.post(addTaskAPIUrl, a);
      return { task: addTaskServerResponse.data };
    } catch (err) {
      return rejectWithValue({ error: err.message });
    }
  }
);

// API Call for updating task in backend server
export const updateTaskToServer = createAsyncThunk(
  "UPDATE_TASK_TO_SERVER",
  async (a, { rejectWithValue }) => {
    try {
      const taskID = a.id;
      const updateTaskAPIUrl = `http://localhost:5001/api/tasks/${taskID}`;
      const updateTaskServerResponse = await axios.patch(updateTaskAPIUrl, a);
      return { updatedData: updateTaskServerResponse.data };
    } catch (err) {
      return rejectWithValue({ error: err });
    }
  }
);

// API Call for deleting task in backend server
export const deleteTaskToServer = createAsyncThunk(
  "DELETE_TASK_TO_SERVER",
  async (a, { rejectWithValue }) => {
    try {
      const deleteTaskAPIUrl = `http://localhost:5001/api/tasks/${a.id}`;
      const deleteTaskServerResponse = await axios.delete(deleteTaskAPIUrl);
      return { id: deleteTaskServerResponse.data.id };
    } catch (err) {
      return rejectWithValue({ error: err.message });
    }
  }
);

// Step 3: Creating reducer and actions with "createSlice" method from redux-toolkit. With "createSlice" method we can write both action and reducers together
const taskSlice = createSlice({
  name: "tasks",
  initialState: initialStateData,
  reducers: {
    // action : function
    // Add Task
    addTask: (state, action) => {
      state.tasks.push({
        id: ++id,
        task: action.payload.task,
        completed: false,
      });
    },
    // Remove Task
    removeTask: (state, action) => {
      const removeTaskIndex = state.tasks.findIndex(
        (t) => t.id === action.payload.id
      );
      state.tasks.splice(removeTaskIndex, 1); // Used to remove the array elements with index passed
    },
    // Complete Task
    completeTask: (state, action) => {
      const completeTaskIndex = state.tasks.findIndex(
        (t) => t.id === action.payload.id
      );
      state.tasks[completeTaskIndex].completed = true;
    },
  },
  extraReducers: {
    // extra reducers are used when we write "createAsyncThunk" for API calls
    [getTasksFromServer.pending]: (state, action) => {
      state.loading = true; // Updating pending state while doing API Call
      state.error = null;
    },
    [getTasksFromServer.fulfilled]: (state, action) => {
      state.tasks = action.payload.tasks; // Updating tasks array after getting server response data
      state.loading = false;
    },
    [getTasksFromServer.rejected]: (state, action) => {
      state.error = action.payload ? action.payload.error : "Unknown Error"; // Updating error if there is any error in API call
      state.loading = false;
    },
    [addTaskToServer.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [addTaskToServer.fulfilled]: (state, action) => {
      state.tasks.push(action.payload.task);
      state.loading = false;
    },
    [addTaskToServer.rejected]: (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    },
    [updateTaskToServer.pending]: (state, action) => {
      state.loading = true;
      state.error = false;
    },
    [updateTaskToServer.fulfilled]: (state, action) => {
      state.tasks = state.tasks.map((t) => {
        if (t.id === action.payload.updatedData.id) {
          return {
            ...t,
            completed: action.payload.updatedData.completed,
          };
        } else {
          return t;
        }
      });
      state.loading = false;
    },
    [updateTaskToServer.rejected]: (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    },
    [deleteTaskToServer.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [deleteTaskToServer.fulfilled]: (state, action) => {
      state.tasks = state.tasks.filter((task) => {
        return task.id !== action.payload.id;
      });
      state.loading = false;
    },
    [deleteTaskToServer.rejected]: (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    },
  },
});

// Exporting actions
export const { replaceTask, addTask, removeTask, completeTask } =
  taskSlice.actions;

// Exporting reducer
const taskReducerFun = taskSlice.reducer;
export default taskReducerFun;
