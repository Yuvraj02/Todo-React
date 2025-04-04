import { useEffect, useState } from "react";
import { Task, TASK_STATUS_COMPLETE, TASK_STATUS_ONGOING } from "../types/tasks";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios"

const LOCAL_STORAGE_KEY = 'tasks';

export default function useListTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [tasksLoading, setTasksLoading] = useState(false);
    const [error, setError] = useState(null);

    const persistTasks = (newTasks: Task[]) => {
        try {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
        } catch (error) {
            console.error('Error saving tasks to localStorage:', error);
        }
    };

    const getTasks = async () => {
        setTasksLoading(true);
        setError(null);
    
        try {
          const response = await axios.get('http://localhost:3000/api/todos');
          setTasks(response.data.data);
          setTasksLoading(false);
        } catch (err) {
          setError(err);
          setTasksLoading(false);
        }
        
        // handle logic for getting tasks from localstorage/backend and update 
        // try {
        //     const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
        //     if (storedTasks) {
        //         const parsedTasks: Task[] = JSON.parse(storedTasks);
        //         // Validate and sanitize stored tasks
        //         const validTasks = parsedTasks.filter(task =>
        //             task.id && task.title && task.status && task.created_at
        //         );
        //         setTasks(validTasks);
        //     }
        // } catch (error) {
        //     console.error('Error loading tasks from localStorage:', error);
        //     localStorage.removeItem(LOCAL_STORAGE_KEY); // Clear corrupt data
        // } finally {
        //     setTasksLoading(false);
        // }
    }

    const handleAdd = async (title: string) => {
        const newTask: Task = {
            title,
            status: TASK_STATUS_ONGOING,
            id: uuidv4(),
            created_at: (new Date()).toISOString(),
        };


        //NEW TASK TO BE ADDED HERE
    setTasksLoading(true);
    setError(null);

    try {
      const result = await axios.post('http://localhost:3000/api/todos', newTask); // Replace with your API endpoint
      //setResponse(result.data.data);
      setTasksLoading(false);
    } catch (err) {
      setError(err);
      setTasksLoading(false);
    }
    getTasks();
        // const newTasks = [...tasks, newTask];
        // setTasks(newTasks);
        
        //
        // persistTasks(newTasks);
        // handle backend/localstorage update
    };

    const handleComplete = async (task: Task) => {
        const updatedTask = { ...task, status: TASK_STATUS_COMPLETE };
        const newTasks = tasks.map((t) => {
            return task.id === t.id ? updatedTask : t;
        })
            console.log(updatedTask)
        setTasks(newTasks);
        try {
            const result = await axios.put(`http://localhost:3000/api/todos/${task.id}`, updatedTask); // Replace with your API endpoint
            //setTasks(result.data);
            setTasksLoading(false);
          } catch (err) {
            console.log("Error here");
            setError(err);
            setTasksLoading(false);
          }

        //persistTasks(newTasks);
        // handle backend/localstorage update
    }

    const handleDelete = async (task: Task) => {
        const newTasks = tasks.filter((t) => {
            return t.id === task.id ? false : true;
        })

    setTasksLoading(true);
    setError(null);

    try {
      const result = await axios.delete(`http://localhost:3000/api/todos/${task.id}`); 
      setTasks(result.data.data);
      setTasksLoading(false);
    } catch (err) {
      setError(err);
      setTasksLoading(false);
    }
        setTasks(newTasks);   
        //persistTasks(newTasks);
        // handle backend/localstorage update
    }

    useEffect(() => {
        getTasks()
    }, [])

    return { tasks, setTasks, getTasks, tasksLoading, handleAdd, handleComplete, handleDelete }
}   