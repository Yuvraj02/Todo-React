import styled from "styled-components";
import useListTasks from "../hooks/useTasks";
import React, { useEffect, useState } from "react";
import { TasksListItem } from "../components/TasksListItem";
import { AddTaskBar } from "../components/AddTaskBar";

const HomeScreenDiv = styled.div`
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

const TimeDisplay = styled.div`
  font-size: 3rem;
  font-weight: 500;
  margin: 1rem 0;
  font-family: monospace;
`;

export default function HomePage() {
    const { tasks, handleComplete, handleDelete, handleAdd } = useListTasks();
    const [currentDateTime, setCurrentDateTime] = useState("");

    useEffect(() => {
        const updateDateTime = () => {
            const options: Intl.DateTimeFormatOptions = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            };

            setCurrentDateTime(
                new Date().toLocaleString(undefined, options)
            );
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <HomeScreenDiv>
                <h1>Todo App</h1>
                <TimeDisplay>{currentDateTime}</TimeDisplay>
                <AddTaskBar handleAdd={handleAdd} />
                <ul>
                    {tasks.map((task, index) => {
                        return (<TasksListItem task={task} handleComplete={handleComplete} handleDelete={handleDelete} />)
                    })}
                </ul>
            </HomeScreenDiv>
        </>
    );
}