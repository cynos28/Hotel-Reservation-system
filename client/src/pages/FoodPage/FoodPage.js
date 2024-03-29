import React, { useEffect, useReducer } from 'react'
import { getAll, search } from '../../service/foodService';
import FoodThumbnail from '../../components/FoodThumbnails/FoodThumbnail.js';
import { useParams } from 'react-router-dom';
import Search from '../../components/Search/Search.js';
import Header from '../../components/header/header.js';
import Footer from '../../components/footer/Footer.js';
import FoodTags from '../../components/FoodTags/FoodTags.js';

const initiallState = { foods : []};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FOODS_LOADED':
    return {...state, foods: action.payload};
  
    default:
      return state;
  }
};

export default function FoodPage() {
  const [state, dispatch] = useReducer (reducer, initiallState);
  const {foods} = state;
  const {searchTerm}=useParams();

  useEffect (() => {
    const loadFoods = searchTerm ? search (searchTerm) : getAll();
    loadFoods.then(foods =>dispatch({type:'FOODS_LOADED', payload:foods}));
  },[searchTerm]);

  return <>

      <Header/>
      <Search  />
      <FoodTags/>
      <FoodThumbnail foods = {foods} />
      <Footer/>
  </>;
  
}
