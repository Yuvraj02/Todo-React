import React from "react";
import { useState } from "react"
import styled from "styled-components"

const StyledAddTaskBarDiv = styled.div`
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
const ErrorStyleDiv = styled.div`
    color: red;
    font-size: 10px;
`

type AddTaskBarProps = {
    handleAdd: (title: string) => Promise<void>;
}

export function AddTaskBar({ handleAdd }: AddTaskBarProps) {

    const [addLoading, setAddLoading] = useState(false);
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState<string>();
    const handleInputChange = (event) => {
        setInputValue(event.target.value)
    }

    const handleOnClick = async () => {
        if (!inputValue) {
            setError("please enter a title")
            return;
        }
        setError(undefined);
        setAddLoading(true);
        await handleAdd(inputValue)
        setAddLoading(false);
    }

    return (<>
        <StyledAddTaskBarDiv>
            <input type="text" value={inputValue} placeholder="Add your Task" onChange={handleInputChange} />
            {addLoading ? <>Loading...</> : <button onClick={handleOnClick}>Add Task</button>}
        </StyledAddTaskBarDiv>
        {error && <ErrorStyleDiv>{error}</ErrorStyleDiv>}
    </>)
}