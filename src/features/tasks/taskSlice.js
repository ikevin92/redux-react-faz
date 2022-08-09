import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasksList: [
    {
      id: '1',
      title: 'Task 1',
      description: 'Task 1 description',
      completed: false
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Task 2 description',
      completed: false
    },
  ],
}

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasksList.push(action.payload)
    },
    deleteTask: (state, action) => {
      state.tasksList = state.tasksList.filter(task => task.id !== action.payload)
    },
    editTask: (state, action) => {
      state.tasksList = state.tasksList.map(task => {
        if (task.id === action.payload.id) {
          return action.payload
        }
        return task
      })
    }
  }
})

export const { addTask, deleteTask, editTask } = taskSlice.actions
export default taskSlice.reducer