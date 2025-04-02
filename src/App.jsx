/*
  TODO : Add Date & Time 
*/

import { useState } from "react";
import styled from "styled-components";
import { AddTask } from "./components/AddTask";
import { Tasks } from "./components/Tasks";

const HomeScreen = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  margin-top: 3rem;

  li{
    list-style-type: none;
  }
`;

function App() {
  
  let [tasks, setTask] = useState(["Task 1", "Task 2", "Task 3"])
  
  return (
    <>
      <HomeScreen>
        <h1>Todo App</h1>
        <h2>Date: To be displayed</h2>
        <AddTask tasks={tasks} setTask={setTask}/>
        <ul>
          {tasks.map((task, index) => {
            return (<Tasks index={index} task={task} tasks={tasks} setTask={setTask}/>)
          })}
        </ul>
      </HomeScreen>
    </>
  );
}

export default App;