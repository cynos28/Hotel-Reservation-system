import React,{useState} from 'react';

import '../../components/bookingcomponent/StyleB.css';


function BookingForm2(){

    const [adults,setadults] = useState("");
    const [kids,setkids] = useState("");
    const [referance,setreferance] = useState("");

    const collectData = async (e)=>{
        e.preventDefault();
        let result = await fetch('http://localhost:4000/create',{
          method:'post',
          body:JSON.stringify({adults,kids,referance}),
          headers : {
            'Content-Type' : 'application/json'
          },
        });
        result = await result.json;
        localStorage.setItem("rooms_details",JSON.stringify(result));
      }

    return (
        <>
        <br/>
        <br/>
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
                        <input type="radio" name ='payment' value='Paypal' /><img src="/images/paypal.jpg" weight="20px"height="20px"></img>Paypal 
                    </div><br/>
                    <div class= "form-group col-md-4">
                        <label for  = "inputreferance" className="font">Room Referance  </label>
                        <input type = "text" class="form-control" id="referance " name ="referance"  placeholder=''  value={referance} onChange={(e)=>setreferance(e.target.value)} ></input>
                    </div> 



                    
                    
                    

                </div>
            </form>
            </div>
            </div>
        </>


    );
}


export default BookingForm2;