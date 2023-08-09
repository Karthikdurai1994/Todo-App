const { createSlice } = require("@reduxjs/toolkit");

// Step - 1: Designing how employees data will be saved in store
/*
   [
    {
        id: 1,
        name: "Sam"
    },
    {
        id: 2,
        name: "Ravi"
    }
   ]
*/

// Step-2: Creating initialState for employees
const employeeInitialState = [];
let empID = 0; // For just tracking empployee count after insertion

// Step - 3: Creating actions and reducers using "createSlice" method from redux-toolkit
const employeeSlice = createSlice({
  name: "employees",
  initialState: employeeInitialState,
  reducers: {
    // action: function
    // Add employee
    addEmployee: (state, action) => {
      state.push({
        id: ++empID,
        name: action.payload.name,
      });
    },
  },
});

// Step - 4: Getting actions from employeeSlice
export const { addEmployee } = employeeSlice.actions;

// Step - 5: Getting reducer from employeeSlice
const employeeReducer = employeeSlice.reducer;
export default employeeReducer;
