import React,{useState} from 'react'
import './App.css'
import styled from 'styled-components'
import Table from './components/Table';


function App() {
  const [month,setMonth] = useState('March');
  return (
    <Main>
          <Heading>
               Transaction <br />Dashboard
            </Heading>  
            <Mid>
               <Button1> Search Transaction</Button1>
               <DropDown>
                   <SelectM>
                    Select Month
                   </SelectM>
                        
                  <select name="month" id="month">
                <option value="January">January</option>
                <option value="Febuary">Febuary</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
                  </select>

               </DropDown>
            </Mid>

            

             <Table/>

    </Main>
  )
}

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; 
  background-color:#f0f4f4;
  flex-direction: column;
`;

const Heading = styled.div`
     background-color: white;
     font-size: 22px;
     color: #020;
     font-weight: 600;
    padding: 2%;
    border-radius: 50%;
    height: 12vh;
    width: 8vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Mid = styled.div`
margin-top: 5%;
 display: flex;
  justify-content: center;
  align-items: center;
     gap:100px;
`;

const Button1 = styled.button`
     background-color: #ffdc8c;
     border: none;
     padding: 2%;
     border-radius: 15px;
     width: 12vw;
     font-size: 15px;
     font-weight: 500;
`;

const DropDown = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const SelectM = styled.div`
 background-color: #f0bc44;
 padding: 5px 25px;
 border-radius: 8px;
 
`;


export default App