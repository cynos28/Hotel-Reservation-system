import React, { useState } from 'react';
import classes from './search.module.css';
import { useNavigate, useParams } from 'react-router-dom';

export default function Search() {
    const [term, setTerm] = useState ('');
    const navigate = useNavigate();
    const {searchTerm} = useParams();

    const search = async() => {
        term ? navigate ('/foodpage/search/' + term): navigate ('/foodpage');
    };

  return (
    <div className={classes.container}>
        <input
            type="text"
            placeholder='Search Your Meals'
            onChange={e => setTerm(e.target.value)}
            onKerUp={e => e.key === 'Enter' && search()}
            defaultValue={searchTerm} />

            <button onClick={search}>Search</button>
    </div>
  )
}
