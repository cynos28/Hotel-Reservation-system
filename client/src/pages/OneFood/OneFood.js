import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import classes from './onefood.module.css';
import { getById } from '../../service/foodService.js';
import StarRating from '../../components/FoodStarRating/StarRating.js';
import FoodTags from '../../components/FoodTags/FoodTags.js';




export default function OneFood() {
    const [food, setFood] = useState({});
    const {id} = useParams();

    useEffect(() =>{
        getById(id).then(setFood);
    },[id]);

  return (
    <>
      {food && (
        <div className = {classes.container}>
          <img
          className = {classes.image}
          src ={`/foods/${food.F_imageUrl}`}
          alt = {food.F_name}
          />

          <div className={classes.container}>
            <div className = {classes.container}>
              <span className = {classes.name}>{food.F_name}</span>
              <span className = {`${classes.favourite} ${food.F_favourite? '': classes.not}`}>
              ❤︎
                </span>
          </div>
            <div className = {classes.rating}>
              <StarRating stars={food.F_stars} size={25} />
            </div>

            <div className = {classes.origins}>
              {food.F_origins?.map(origin => (
                <span key={origin}>{origin}</span>
              ))}
            </div>

            <div className={classes.tags}>
              {food.F_tags && (
                <FoodTags
                tags={food.F_tags.map(tag => ({name:tag}))}
                forFoodPage ={true} />
              )}

            </div>

            <div className = {classes.cook_time}>
              <span>
                Time to cook about <strong>{food.cook_time}</strong> minutes
              </span>
            </div>
        </div>
        </div>
      )}
    </>
  )
}
