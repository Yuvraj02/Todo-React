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
import { VscLoading } from "react-icons/vsc";
import styled, { keyframes } from "styled-components"
import { Task, TASK_STATUS_COMPLETE } from "../types/tasks";
import React from "react";

const StyledListItem = styled.div`
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

type TaskListItemProps = {
  task: Task;
  handleComplete: (task: Task) => Promise<void>;
  handleDelete: (task: Task) => Promise<void>;
}
export function TasksListItem({ task, handleComplete, handleDelete }: TaskListItemProps) {

  const [deleteLoading, setDeleteLoading] = useState(false);
  const [completeLoading, setCompleteLoading] = useState(false);

  return (
    <>
      <li>
        <StyledListItem>
          <p className={task.status === TASK_STATUS_COMPLETE ? "complete" : ""}>{task.title}</p>
          <div className="icons">
            <div onClick={async () => {
              setCompleteLoading(true);
              await handleComplete(task)
              setCompleteLoading(false);
            }}>{completeLoading ? <LoadingIcon /> : <TickButton />}</div>
            <div onClick={async () => {
              setDeleteLoading(true);
              await handleDelete(task);
              setDeleteLoading(false);
            }}>{deleteLoading ? <LoadingIcon /> : <DeleteButton />}</div>
          </div>
        </StyledListItem>
      </li>
    </>
  );
}

function TickButton() {
  return (<>
    <IconContext.Provider
      value={{ color: 'green', size: "2.5em" }}>
      <MdDone />
    </IconContext.Provider>
  </>
  )
}

function DeleteButton() {
  return (<>
    <IconContext.Provider value={{ color: "red", size: "2.5em" }}>

      <MdDelete />

    </IconContext.Provider>
  </>)
}

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Create styled component with animation
const SpinningLoader = styled(VscLoading)`
  animation: ${spin} 1s linear infinite;
  display: inline-block;
  transform-origin: center center;
  
  /* Optional size customization */
  font-size: 1.5rem;
  color: #64748b; /* slate-500 */
`;

// Usage component
function LoadingIcon() {
  return <SpinningLoader />;
}