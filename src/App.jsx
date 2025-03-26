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
  let [tasks, setTask] = useState([])

  return (
    <>
      <HomeScreen>
        <h1>Todo App</h1>
        <h2>Date: To be displayed</h2>
        <AddTask tasks={tasks} setTask={setTask}/>
        <ul>
          {tasks.map((task, index) => {
            return (<Tasks key={index} task={task}/>)
          })}
        </ul>
      </HomeScreen>
    </>
  );
}

export default App;