import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTask, editTask } from '../features/tasks/taskSlice'
import { v4 as uuid } from 'uuid'
import { useNavigate, useParams } from 'react-router-dom'

export const TaskForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const { tasksList } = useSelector(state => state.tasks)

  const [task, setTask] = useState({
    title: '',
    description: ''
  })

  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value)
    setTask({
      ...task,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log({ task })

    if (id) {
      dispatch(editTask({
        ...task,
        id
      }))
    } else {
      dispatch(addTask({
        ...task,
        id: uuid()
      }))
    }

    navigate('/')
  }

  useEffect(() => {
    console.log(id)
    if (id) {
      const task = tasksList.find(task => task.id === id)
      setTask(task)
    }
  }, [id, tasksList])


  return (
    <form onSubmit={ handleSubmit } className='bg-zinc-800 max-w-sm p-4'>

      <label htmlFor="title" className='block text-sm font-bold mb-2'>Task:</label>
      <input name='title'
        type="text"
        placeholder='title'
        value={ task.title }
        onChange={ handleChange }
        className='w-full p-2 rounded-md bg-zinc-600 mb-2'
      />

      <label htmlFor="description" className='block text-sm font-bold mb-2'>Description</label>
      <textarea
        value={ task.description }
        onChange={ handleChange }
        name="description"
        placeholder='description'
        className='w-full p-2 rounded-md bg-zinc-600 mb-2'
      >
      </textarea>

      <button className='bg-indigo-600 px-2 py-1 rounded-md'>Save</button>
    </form>
  )
}