import  React ,{useEffect,useState}  from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import '../../components/bookingcomponent/StyleB.css';
import { useParams } from "react-router-dom";


function Reservations() {
  const [data,setData] = useState([]);
   useEffect(()=>{
    getbooking();
   })
   
   const getbooking =() => {
    fetch('http://localhost:4000/get',{
      method:"GET"
    })
    .then((res)=>res.json())
    .then((data)=>{
      console.log(data,"rooms_details");
      setData(data.data);
    })
    
   }
  const handleDelete = async(id)=>{
    const data = await axios.delete(`http://localhost:4000/delete/${id}`);

    
    if(data.data.success){
      getbooking();
    }
  }
   

  return (
    <div className="w-100 vh-100 d-flex justify-content-center align-items-center">
      <div className="w-50">
        <table className='table' style={{borderCollapse: 'collapse', border: '1px solid black'}} >
          <thead  > 
            <tr  >
            <th  >
                ID
              </th>
              <th >
                Name 
              </th>
              <th >
                NIC
              </th>
              <th  >
                Email
              </th>
              <th >
                No of Adults
              </th>
              <th >
                No of Kids
              </th>
            </tr>
          </thead>
          <tbody  >  
            {data.map((i,id)=>{
              
              return(
              
            <tr key={id}  >
              <td >{id}</td>
              <td  >{i.name}</td> 
              <td >{i.NIC}</td>
              <td >{i.email}</td>
              <td > {i.adults}</td>
              <td >{i.kids} </td>
              <td ><button className='updatebtn2' > <Link to ={`/updatedetails/${id}`}>Update </Link></button></td>
              <td><button className='deletebtn' onClick={() => handleDelete(id)}> Delete </button></td>
              
             </tr>
              )
             
            })}
          </tbody>
        </table>
        </div>
      
    </div>
  )
}

export default Reservations;
