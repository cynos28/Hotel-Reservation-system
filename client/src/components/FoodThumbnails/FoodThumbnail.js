import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from '../FoodStarRating/StarRating';
import classes from './thumbnail.module.css'; // Ensure the path is correct

export default function FoodThumbnail({ foods }) {
  return (
    <ul className={classes.list}>
      {foods.map(food => (
        <li key={food.F_id} className={classes.item}>
          <Link to={`/food/${food.F_id}`} className={classes.link}>
            <img
              className={classes.image}
              src={`/foods/${food.F_imageUrl}`}
              alt={food.F_name}
            />
          </Link>
          <div className={classes.content}>
            <div className={classes.name}>{food.F_name}</div>
         
            <div className={classes.stars}>
              <StarRating stars={food.F_stars} />
            </div>
            <div className={classes.productItemFooter}>
              <div className={classes.origins}>
                {food.F_origins.map(origin => (
                  <span key={origin}>{origin}</span>
                ))}
              </div>
              <div className={classes.cookTime}>
                <span>🕒</span>
                {food.F_cookTime}
              </div>
            </div>
            <div className={classes.price}>
              Rs {food.F_price.toFixed(2)}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
