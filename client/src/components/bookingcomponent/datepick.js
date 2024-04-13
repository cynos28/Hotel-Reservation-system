import React, { useState } from 'react';


function DatePick(){

    const[date1,setDate1] = useState ()
    const[date2,setDate2] = useState ()

    console.log("Date",date1);
    console.log("Date",date2);

    return(
        <div style={{display: 'flex', justifyContent: 'space-between', border:'groove ',backgroundColor:'#FFFFF',borderRadius: '10px',boxShadow: "0px 3px 10px rgb(0 0 0 / 0.2) #888888",marginTop:"20px",marginRight:'30px'}} >
        <>
            <h3  className='date'style={{ marginRight: '20px'} }>Arrival Date:{date1}</h3>
            <input type ="date" onChange={e=>setDate1(e.target.value) } className="date-picker-input" style={{ marginRight: '150px'}} />
            <h3  className='Ddate' style={{ marginRight: '20px'}} >Departure Date:{date2} </h3>
            <input type ="date" onChange={e=>setDate2(e.target.value)} className="date-picker-input" style={{ marginRight: '150px'}}/>
        </>
        </div>

    );
}

export default DatePick;
