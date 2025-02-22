import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
// import Navbar from '../components/navbar';

interface Task {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
}

const API_URL = import.meta.env.VITE_API_URL;

const TasksPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [creatingTask, setCreatingTask] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<number>(-1);
  const [editingTitle, setEditingTitle] = useState<string>('');
  const [editingDescription, setEditingDescription] = useState<string>('');

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
};

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
    } finally {
      setCreatingTask(false);
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
    } finally {
      setEditingTitle('');
      setEditingDescription('');
      setEditingTaskId(-1);
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
    <div style={styles.container}>
      {/* <Navbar /> */}
      <header style={styles.header}>
        <h2>Tasks</h2>
        <div style={styles.navbar}>
          <button onClick={() => setCreatingTask(true)}>New Task</button>
          <button onClick={() => handleLogout()}>Logout</button>
        </div>

      </header>

      {/* Form to create a new task */}
      <div>
        {creatingTask && (
          <div style={styles.popup}>
            <form onSubmit={createTask} method="get">
              <h2>Create New Task</h2>
              <div style={styles.keywordsContainer}>
                <input
                  style={styles.input}
                  type="text"
                  placeholder="Title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  required
                />
              </div>
              <div style={styles.keywordsContainer}>
                <input
                  style={styles.input}
                  type="text"
                  placeholder="Description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                />
              </div>
              <button style={styles.button} type="submit">Save</button>
              <button style={styles.button} onClick={() => setCreatingTask(false)}>Cancel</button>
            </form>
          </div>
        )}
      </div>

      {/* List of tasks */}
      <div style={styles.keywordsContainer}>
        <h2>Task List</h2>
        {tasks.slice().reverse().map((task) => (
          editingTaskId === task.id 
            ? <div key={task.id} style={styles.task}>
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

              <div style={styles.tools}>
                {/* Button to save edited task */}
                <button
                  style={styles.toolButton}
                  onClick={() => {
                    updateTask(task.id, { title: editingTitle, description: editingDescription });
                  }}>
                  Save
                </button>

                {/* Button to mark task as complete/incomplete */}
                <button
                  style={styles.toolButton}
                  onClick={() => updateTask(task.id, { isComplete: !task.isComplete })}
                >
                  {task.isComplete ? 'Mark Incomplete' : 'Mark Complete'}
                </button>

                {/* Button to delete task */}
                <button 
                  style={styles.toolButton} 
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            </div>
            : (
              <div key={task.id} style={styles.task}>

              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Status: {task.isComplete ? 'Complete' : 'Incomplete'}</p>

              <div style={styles.tools}>
                {/* Button to edit task */}
                <button
                  style={styles.toolButton}
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
                  style={styles.toolButton}
                  onClick={() => updateTask(task.id, { isComplete: !task.isComplete })}
                >
                  {task.isComplete ? 'Mark Incomplete' : 'Mark Complete'}
                </button>

                {/* Button to delete task */}
                <button
                  style={styles.toolButton} 
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>

              </div>
            </div>
            )
          
        ))}
      </div>
    </div>
  );
};


const styles: { [key: string]: React.CSSProperties } = {
  container: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    top: "0",
    left: "0",
    // transform: "translate(-50%, -50%)",
    width: "100%",
    margin: "0 auto",
    textAlign: "center" as const,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  keywordsContainer: {
    position: "relative",
    display: "inline-block",
    marginBottom: "25px",
  },
  input: {
    padding: "10px 30px 10px 10px",
    fontSize: "16px",
    width: "100%",
    boxSizing: "border-box",
    borderRadius: "50px", // Rounded corners
    border: "2px solid #1DB954",
  },
  button: {
    fontSize: "16px",
    cursor: "pointer",
    margin: "10px 5px",
    width: "40%",
  },
  popup: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    backgroundColor: "#000000",
    zIndex: 9999,
    // backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: "20px",
  },
  navbar: {
    display: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#fff",
    padding: "10px",
  },
  header: {
    // position: "fixed",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "5%",
    marginLeft: "25%",
    // transform: "translate(20%, 50%)",
    width: "70%",
  },
  taskList: {
    width: "400px",
    marginTop: "10%",
    maxWidth: "400px",
    margin: "0 auto",
    textAlign: "center" as const,
    color: "white",
  },
  task: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
    width: "800px",
  },
  tools: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
    width: "25%",
  },
  toolButton: {
    fontSize: "16px",
    cursor: "pointer",
    width: "100%",
  },
}

export default TasksPage;