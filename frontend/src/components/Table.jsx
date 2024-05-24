import styled from 'styled-components'
import React,{useEffect, useState} from 'react';
function Table() {
  
    const [tranc,setTranc] = useState();
    const [page,setPage] = useState(1);
    const getTranc = (async()=>{
           
    })

    useEffect(()=>{
        getTranc();
        console.log(tranc);
    })


  return (
    <div style={{display:"flex",flexDirection:"column"}}>
          <Tabl>
  <tr>
    <th>ID</th>
    <th>Title</th>
    <th>Description</th>
    <th>Price</th>
    <th>category</th>
    <th>Sold</th>
    <th>Image</th>      
  </tr>
</Tabl>
    <PageDetail>
          <span>Page No: 1</span>
           <button>Next</button>
            <span>   -   </span>
           <button>Prev</button>
            <span>Per Page: 10</span>
    </PageDetail>
    </div>
  )
}
const Tabl = styled.table`
margin-top: 5%;
border-radius: 15px;

th{
       background-color:#ffdc8c;
        padding: 15px;
   }

`;

const PageDetail = styled.div`
       margin-top: 3%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span{
        font-weight: 600;
      }
`;


export default Table