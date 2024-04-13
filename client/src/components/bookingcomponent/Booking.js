import React,{useState} from 'react';

import './StyleB.css';



    function Booking(){

        const [name,setName] = useState("");
        const [NIC,setNIC] = useState("");
        const [email,setemail] = useState("");
        const [phonenumber,setphonenumber] = useState("");
        const [country,setcountry] = useState("");
        const [adults,setadults] = useState("");
        const [kids,setkids] = useState("");
        const [referance,setreferance] = useState("");

       
    
    

      
      
    const collectData = async (e)=>{
      e.preventDefault();
      alert(`${name}'s Reservation Added`);
      let result = await fetch('http://localhost:4000/create',{
        method:'post',
        body:JSON.stringify({name,NIC,email, phonenumber,country,adults,kids,referance}),
        headers : {
          'Content-Type' : 'application/json'
        },
      });
      result = await result.json;
      localStorage.setItem("rooms_details",JSON.stringify(result));
    }

    




    return (<div>
        
        
        <br/>
        <br/>
        <div className="container1">
        <div className="booking-form1">
            <div class = "form-col-1" className='form1'>
            <form  onSubmit={collectData} className='style'  >
                <br/>
            <br/>
            <br/>
                    <h1>  Personal Details  </h1>
                    <h7>We'll use this information to send you confirmation and updates about your booking.</h7><br/>
                    <br/>
                <div class = "form-colo"  >
                    <div class= "form-group col-md-4" className='field'>
                        <label for  = "inputname" className="font">Name :  </label>
                        <input type = "text" class="form-control" id="name " name ="name"  placeholder='' value={name} onChange={(e)=>setName(e.target.value)} ></input>
                    </div><br/>
                        
                    <div class= "form-group col-md-4" className='field' >
                    <label for  = "inputNIC" className="font">NIC : </label>
                    <input type = "text" class="form-control" id="NIC " name ="NIC"  placeholder='' value={NIC} onChange={(e)=>setNIC(e.target.value)} ></input>
                    
                    </div><br/>
                    <div class= "form-group col-md-4" className='field'>
                    <label   className="font" >Email : </label>
                    <input type = "text" class="form-control" id="email " name ="email"  placeholder='' value={email} onChange={(e)=>setemail(e.target.value)} ></input>
                    
                    </div><br/>
                    <div class= "form-group col-md-4" className='field'  >
                    <label for  = "inputphonenumber" className="font">Phonenumber : </label>
                    <input type = "text" class="form-control" id="phonenumber " name ="Phonenumber" placeholder=''value={phonenumber} onChange={(e)=>setphonenumber(e.target.value)}></input>
                    
                    </div>
                    
                    
                    <br/>
                    <div class= "form-group col-md-4" className='field' >
                    <label for  = "inputcountry" className="font"> Country: </label>
                    <input type = "text" class="form-control" id="country" name ="country"  placeholder=''value={country} onChange={(e)=>setcountry(e.target.value)}></input>
                    
                    </div><br/>
                     </div>
                    </form>
                    </div>
                    </div>
                        {/* Second Form  */}
                    <div className="booking-form2">
        
                    <div class = "form-row">
                    <div class = "form-col-1">
                    <form  onSubmit={collectData}  className="BookingForm" >
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <h1> Reservation Detials </h1>
                    <div class = "form-colo"  >
                    <div class= "form-group col-md-6" >
                        <label for  = "inputadults" className="font"> No Of Adults  </label>
                        <input type = "text" class="form-control" id="adults " name ="adults"  placeholder=''  value={adults} onChange={(e)=>setadults(e.target.value)} ></input>
                    </div> 
                    <br/>
                    
                    <div class= "form-group col-md-6">
                        <label for  = "inputname" className="font">No Of Kids  </label>
                        <input type = "text" class="form-control" id="kids " name ="kids"  placeholder=''  value={kids} onChange={(e)=>setkids(e.target.value)}></input>
                    </div> 
                    
                    <br/>
                    <div class= "form-group col-md-6" classname="radio" >
                        <h6>Select Payment Method </h6><br/>
                        <input type="radio" name ='payment' value='Cash' />Cash
                        <input type="radio" name ='payment' value='Paypal' />        <img src="/images/paypal.jpg" weight="20px"height="20px"></img>Paypal 
                    </div><br/>
                        <div class= "form-group col-md-4">
                        <label for  = "inputreferance" className="font">Room Referance  </label>
                        <input type = "text" class="form-control" id="referance " name ="referance"  placeholder=''  value={referance} onChange={(e)=>setreferance(e.target.value)} ></input>
                        </div>


                        <button type  = "submit" className='button' >Sumbit</button> <button type  = "submit" className='button' > <a href="/reservations">Reservations</a></button> 

                        </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
     


    );
}


export default Booking;