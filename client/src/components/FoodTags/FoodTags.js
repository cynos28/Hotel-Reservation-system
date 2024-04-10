import React from 'react';
import classes from './foodtags.module.css';
import { Link } from 'react-router-dom';


export default function FoodTags({tags, forFoodPage}) {
  return (
    <div className={classes.container}
    style={{
        justifyContent: forFoodPage? 'start' : 'center',
    }}
    >
        {tags.map (tag => (
            <Link key = {tag.mame} to = {`/foodpage/tag/${tag.name}`}>
                {tag.name}
                
            </Link>
        ))}
        
    </div>
  );
}
