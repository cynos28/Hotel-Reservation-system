import React, { useEffect, useReducer } from 'react'
import { getAll, getAllByTag, getAllTags, search } from '../../service/foodService';
import FoodThumbnail from '../../components/FoodThumbnails/FoodThumbnail.js';
import { useParams } from 'react-router-dom';
import Search from '../../components/Search/Search.js';
import Header from '../../components/header/header.js';
import Footer from '../../components/footer/Footer.js';
import FoodTags from '../../components/FoodTags/FoodTags.js';

const initiallState = { foods : [], tags: []};

const reducer = (state, action) => {
  switch (action.type) {
    case 'FOODS_LOADED':
    return {...state, foods: action.payload};
    case 'TAGS_LOADED':
      return {...state, tags: action.payload};
    default:
      return state;
  }
};

export default function FoodPage() {
  const [state, dispatch] = useReducer (reducer, initiallState);
  const {foods, tags} = state;
  const {searchTerm, tag}=useParams();

  useEffect (() => {
    getAllTags().then(tags=> dispatch({type:'TAGS_LOADED',payload:tags}));

  
    const loadFoods =tag
    ? getAllByTag(tag)
    : searchTerm 
    ? search (searchTerm) 
    : getAll();


    loadFoods.then(foods =>dispatch({type:'FOODS_LOADED', payload:foods}));
  },[searchTerm, tag]);

  return <>

      <Header/>
      <Search  />
      <FoodTags tags={tags}/>
      <FoodThumbnail foods = {foods} />
      <Footer/>
  </>;
  
}
