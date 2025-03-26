/*
  TODO:-> Add icons for complete task and delete task
       -> Add Strike Through effect on task complete
       -> Add Delete Function for delet task
       -> Display Current Date
*/


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

  ul li{
    padding: 4px;
  }

`

export function Tasks({index, task}) {
  return (
    <>
      <li key={index}>
        <ListItem>
            <p>{task}</p>
            <ul>
                <li style={{color:"green"}}>Tick</li>
                <li style={{color:"red"}}>Delete</li>
            </ul>
        </ListItem>
      </li>
    </>
  );
}
