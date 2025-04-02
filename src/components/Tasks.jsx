/*
  TODO:-> Add icons for complete task and delete task
       -> Add Strike Through effect on task complete
       -> Add Delete Function for delete task
       -> Display Current Date
*/

import { useState } from "react";
import { IconContext } from "react-icons";
import { MdDone } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import styled from "styled-components"

const ListItem = styled.div`
   display: flex;
   background-color: white;
   margin-right: 120px;
   margin-top: 16px;
   width: 110%;
   height: 4.2rem;
   justify-content: space-between;
   align-items: center;
   color: black;
   border-radius: 15px 15px 15px 15px;

   p{
    padding-left: 20px;
    }

   ul{
    /* background-color: aqua; */
    display: flex;
    padding-right: 16px;
   }

  /* ul li{
    padding: 2px;
    margin: 4px;
    cursor: pointer; */

  .icons{
    display: flex;
    cursor: pointer;
    padding: 4px;
    margin: 4px;
  }

  .complete{
    text-decoration: line-through black 1px;
  }
`
export function Tasks({index, task, tasks, setTask}) {

    const handleDelete = ((index) => {
    setTask(tasks.filter((_,i) => i !== index))
    
  })

  const [taskDone, taskCompleteStatus] = useState(false);

  const handleTaskCompletion = () => {
    taskCompleteStatus(!taskDone);
  }

  return (
    <>
      <li key={index}>
        <ListItem>
            <p className={taskDone ? "complete" : ""}>{task}</p>
            <div className="icons">
              <div onClick={handleTaskCompletion}><TickButton/></div>
              <div onClick={()=>handleDelete(index)}><DeleteTask/></div>
            </div>
        </ListItem>
      </li>
    </>
  );
}

function TickButton(){
  return (<>
    <IconContext.Provider 
    value={{color:'green',size:"2.5em"}}>
        <MdDone/>
    </IconContext.Provider>
    </>
  )
}

function DeleteTask(){
  return (<>
  <IconContext.Provider value = {{color:"red", size:"2.5em"}}>
  
    <MdDelete/>

  </IconContext.Provider>
  </>)
}