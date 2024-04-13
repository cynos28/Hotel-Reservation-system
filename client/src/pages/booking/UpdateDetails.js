import React, { useEffect, useState , } from 'react'
import '../../components/bookingcomponent/StyleB.css';
import axios from 'axios';
import { useParams, } from "react-router-dom";


function UpdateDetails() {
    const {_id} = useParams()
    const[name,setName] = useState ()
    const[NIC,setNIC] = useState ()
    const[email,setEmail] = useState ()
    const[phonenumber,setPhonenumber] = useState ()
    const[country,setCountry] = useState ()
    const[adults,setAdults] = useState ()
    const[kids,setKids] = useState ()

    useEffect (()=>{
        const fetch =async () =>{
            try{

                const details = await axios.get(`http://localhost:4000/get/${_id}`);
                console.log(details);
                setName (details.data.name)
                setNIC (details.data.NIC)
                setEmail (details.data.email)
                setPhonenumber (details.data.phonenumber)
                setCountry (details.data.country)
                setAdults (details.data.adults)
                setKids (details.data.kids)
            }catch (err){
                console.log(err)
            }
        }
        fetch();
    },[])

    

  return (
    <div>
        <h1 className='updatetitle'>Reservation Details Update ! </h1>
        <div className="container1">
        <div className="booking-form1">
            <div class = "form-col-1" className='form1'>
            <form  className='style' >
                <br/>
            <br/>
            <br/>
                    <h1>  Personal Details  </h1>
                    <h7>We'll use this information to send you confirmation and updates about your booking.</h7><br/>
                    <br/>
                <div class = "form-colo"  >
                    <div class= "form-group col-md-4" className='field'>
                        <label htmlFor='' className="font">Name :  </label>
                        <input placeholder  = "name" type = "text" class="form-control"   value={name} onChange={(e)=>setName(e.target.value)} ></input>
                    </div><br/>
                        
                    <div class= "form-group col-md-4" className='field' >
                    <label htmlFor  = '' className="font">NIC : </label>
                    <input  placeholder  = "NIC" type = "text" class="form-control"  value={NIC} onChange={(e)=>setNIC(e.target.value)} ></input>
                    
                    </div><br/>
                    <div class= "form-group col-md-4" className='field'>
                    <label  htmlFor='' className="font" > Email : </label>
                    <input  placeholder  = "email" type = "text" class="form-control"  value={email} onChange={(e)=>setEmail(e.target.value)}  ></input>
                    
                    </div><br/>
                    <div  class= "form-group col-md-4" className='field'  >
                    <label htmlFor = '' className="font">Phonenumber : </label>
                    <input  placeholder  = "phonenumber " type = "text" class="form-control"  name ="Phonenumber" value={phonenumber} onChange={(e)=>setPhonenumber(e.target.value)}></input>
                    
                    </div>
                    
                    
                    <br/>
                    <div class= "form-group col-md-4" className='field' >
                    <label htmlFor  = '' className="font"> Country: </label>
                    <input   placeholder  = "country " type = "text" class="form-control"  value={country} onChange={(e)=>setCountry(e.target.value)} ></input>
                    
                    </div><br/>
                     </div>
                    </form>
                    </div>
                    </div>
                        {/* Second Form  */}
                    <div className="booking-form2">
        
                    <div className = "form-row">
                    <div className = "form-col-1">
                    <form  className="BookingForm" >
                    <button type  = "submit" className='button'  >Sumbit</button> 
                    <br/>
                    <br/>
                    <br/>
                    
                
                    
                    <h1> Reservation Detials </h1>
                    <div class = "form-colo"  >
                    <div class= "form-group col-md-6" >
                        <label htmlFor  = '' className="font"> No Of Adults  </label>
                        <input placeholder  = "adults " type = "text" class="form-control"  value={adults} onChange={(e)=>setAdults(e.target.value)} ></input>
                    </div> 
                    <br/>
                    
                    <div class= "form-group col-md-6">
                        <label htmlFor  = '' className="font">No Of Kids  </label>
                        <input  placeholder  = "kids " type = "text" class="form-control"  value={kids} onChange={(e)=>setKids(e.target.value)} ></input>
                    </div> 
                    
                    <br/>
                  
                        


                        

                        </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
      
    </div>
  )
}

export default UpdateDetails;
