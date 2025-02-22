import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';

interface Task {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
}

const API_URL = import.meta.env.VITE_API_URL;

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<number>(-1);
  const [editingTitle, setEditingTitle] = useState<string>('');
  const [editingDescription, setEditingDescription] = useState<string>('');
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Create a new task
  const createTask = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/tasks`, newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks(); // Refresh the task list
      setNewTask({ title: '', description: '' }); // Clear the form
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // Update a task
  const updateTask = async (id: number, updatedTask: Partial<Task>) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/tasks/${id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Delete a task
  const deleteTask = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Fetch tasks when the component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Tasks</h1>

      {/* Form to create a new task */}
      <div>
        <h2>Create New Task</h2>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <button onClick={createTask}>Create Task</button>
      </div>

      {/* List of tasks */}
      <div>
        <h2>Task List</h2>
        {tasks.slice().reverse().map((task) => (
          editingTaskId === task.id 
            ? <div key={task.id}>
              <textarea 
                name="" 
                id=""
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
              />
              <br />
              <textarea 
                name="" 
                id=""
                value={editingDescription} 
                onChange={(e) => setEditingDescription(e.target.value)}
              /> 
              <p>Status: {task.isComplete ? 'Complete' : 'Incomplete'}</p>

              {/* Button to save edited task */}
              <button onClick={() => {
                updateTask(task.id, { title: editingTitle, description: editingDescription });
                setEditingTitle('');
                setEditingDescription('');
                setEditingTaskId(-1);
                }}>
                Save
              </button>

              {/* Button to mark task as complete/incomplete */}
              <button
                onClick={() => updateTask(task.id, { isComplete: !task.isComplete })}
              >
                {task.isComplete ? 'Mark Incomplete' : 'Mark Complete'}
              </button>

              {/* Button to delete task */}
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
            : (
              <div key={task.id}>

              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.isComplete ? 'Complete' : 'Incomplete'}</p>

              {/* Button to edit task */}
              <button
                onClick={() => {
                  setEditingTaskId(task.id);
                  setEditingTitle(task.title || '');
                  setEditingDescription(task.description || '');
                }}
              >
                Edit
              </button>
              

              {/* Button to mark task as complete/incomplete */}
              <button
                onClick={() => updateTask(task.id, { isComplete: !task.isComplete })}
              >
                {task.isComplete ? 'Mark Incomplete' : 'Mark Complete'}
              </button>

              {/* Button to delete task */}
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
            )
          
        ))}
      </div>
    </div>
  );
};

export default TasksPage;