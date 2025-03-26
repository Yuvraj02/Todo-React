import { useState } from "react"
import styled from "styled-components"

const AddTaskBar = styled.div`
display: flex;
margin: 16px;
input{
height: 3rem;
padding: 1.6rem 1.6rem;
border-radius: 15px 0px 0px 15px;
border: none;
}

button{
    background-color: #5CABDB;
    height: 3.6rem 3.6rem;
    border: none;
    box-shadow: none;
    border-radius: 0 15px 15px 0;
    color: white;
    padding:0 1rem;
    cursor: pointer;
}
` 
export function AddTask({tasks, setTask}){

    const[inputValue, setInputValue] = useState('')

    const handleInputChange = (event) =>{
        setInputValue(event.target.value)
    }

    const handleOnClick = (taskValue)=>{
            /*Concept of Mutability in react : React recommends to create a new array with the new item, 
            instead of mutating the old array
            */
            setTask([...tasks, taskValue])
            setInputValue('')
    }

    return (<>
        <AddTaskBar>
            <input type="text" value= {inputValue} placeholder="Add your Task" onChange={handleInputChange}/>
            <button onClick={()=>{
                handleOnClick(inputValue);
                console.log(tasks)
            }}>Add Task</button>

        </AddTaskBar>
    </>)
}